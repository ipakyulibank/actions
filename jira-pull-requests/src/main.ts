/* eslint-disable @typescript-eslint/no-explicit-any */
import * as core from "@actions/core";
import * as github from "@actions/github";
import getJira from "./jira";
import {
  getGraph,
  getStates,
  getTransition,
} from "./reference/jira-issue-states";
import {
  isNeeded,
  isEventValid,
  extractJiraIssues,
  getJiraIssueMode,
} from "./functions";
import { PullRequestReviewEvent } from "@octokit/webhooks-definitions/schema";
import {
  commentIssue,
  findIssueDeveloper,
  transitionIssue,
  assignIssue,
} from "./jira/functions";
import getUser from "./reference/user-mapping";

export default async function (): Promise<string[]> {
  const action_result: string[] = [];
  const touchIssue = (issue_key: string):void => {
    if(!action_result.includes(issue_key)) {
      action_result.push(issue_key);
    }
  }
  const github_token = core.getInput("github_token", { required: true });
  const jira_url = core.getInput("jira_url", { required: true });
  const jira_user = core.getInput("jira_user", { required: true });
  const jira_token = core.getInput("jira_token", { required: true });
  
  const jira_project_key = core.getInput("jira_project_key", {
    required: true,
  });


  const user_mappings = JSON.parse(
    core.getInput("user_mappings", { required: true })
  ) as UserMappingDbRow[];

  const octokit = github.getOctokit(github_token);
  const jira = getJira(jira_url, jira_user, jira_token);

  const context = github.context;
  const payload = context.payload as PullRequestReviewEvent;
  core.startGroup("Check if event is valid");
  try {
    if (!isEventValid(context)) {
      throw new Error("Event is not valid");
    }
  } catch (e: any) {
    core.setFailed(e.message);
    return action_result;
  } finally {
    core.endGroup();
  }

  core.startGroup("Check if action is needed to proceed");
  try {
    if (!isNeeded(context)) {
      throw new Error("Action is not needed");
    }
  } catch (e: any) {
    core.notice(e.message);
    return action_result;
  } finally {
    core.endGroup();
  }

  /**
   * - Extract Jira Issue keys
   * - Skip if no Jira Issue keys found
   * - Skip if jira issues are not in review status
   *   code review or test statuses
   */
  core.startGroup("Extract Jira Issues from pull request body, title, branch");
  let jira_issue_keys: string[];
  let jira_issues;
  try {
    jira_issue_keys = extractJiraIssues(context, jira_project_key);
    core.debug(`Jira Issue Keys extracted: ${jira_issue_keys.join(", ")}`);
    if (!jira_issue_keys.length) {
      core.warning("No jira issue keys found, skipping");
      return action_result;
    }
    jira_issues = await Promise.allSettled(
      jira_issue_keys.map((issue_key) => {
        return jira({
          method: "GET",
          url: `issue/${issue_key}`,
        });
      })
    );
    jira_issues = jira_issues
      .filter((v) => v.status === "fulfilled")
      .map((v) => (v as PromiseFulfilledResult<any>).value.data)
      .filter((issue) => {
        return getStates().includes(issue.fields.status.name.toLowerCase());
      });
    if (!jira_issues.length) {
      core.warning("No valid jira issues");
      return action_result;
    }
  } catch (e: any) {
    core.setFailed(e.message);
    return action_result;
  } finally {
    core.endGroup();
  }

  core.startGroup("Get review mode by Github team");
  let review_mode: ReviewType | null = null;
  try {
    /**
     * Check if author of review is in github team codereveiwers
     */
    let found = false;
    for await (const response of octokit.paginate.iterator(
      octokit.rest.teams.listMembersInOrg,
      {
        org: "ipakyulibank",
        team_slug: "codereviewers",
      }
    )) {
      for (let i = 0, to = response.data.length; i < to; i++) {
        if (payload.review.user.login == response.data[i].login) {
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    if (found) {
      review_mode = "code_review";
    }
    if (review_mode === null) {
      let found = false;
      for await (const response of octokit.paginate.iterator(
        octokit.rest.teams.listMembersInOrg,
        {
          org: "ipakyulibank",
          team_slug: "qa",
        }
      )) {
        for (let i = 0, to = response.data.length; i < to; i++) {
          if (payload.review.user.login == response.data[i].login) {
            found = true;
            break;
          }
        }
        if (found) {
          break;
        }
      }
      if (found) {
        review_mode = "test";
      }
    }
    if (review_mode === null) {
      review_mode = "other";
    }
    core.debug(`Determined review_mode: ${review_mode}`);
  } catch (e: any) {
    core.setFailed(e.message);
    return action_result;
  } finally {
    core.endGroup();
  }
  if (review_mode === "other") {
    core.info("Review is not by tester and code reviewer, no actions needed");
    return action_result;
  }

  const resolution = payload.review.state as ReviewResolution;
  core.debug(`Pull Request resolution is: ${resolution}`);

  core.startGroup("Decide what to do for each Jira Issue and do");
  try {
    for (let i = 0, to = jira_issues.length; i < to; i++) {
      const jira_issue = jira_issues[i];
      core.debug(
        `Starting working with ${jira_issue.key} - ${jira_issue.fields.summary}`
      );
      const jira_issue_mode = getJiraIssueMode(jira_issue);
      core.debug(`Jira issue mode is ${jira_issue_mode}`);
      core.debug(`Current review mode is ${review_mode}`);
      if (jira_issue_mode == review_mode) {
        if (resolution == "approved") {
          const to_test_mode: JiraIssueStateToTest = "10004";
          const dev_completed_mode: JiraIssueStateDevCompleted = "10006";
          const route = getGraph().path(
            jira_issue.fields.status.id as JiraIssueState,
            review_mode === "code_review" ? to_test_mode : dev_completed_mode
          ) as JiraIssueState[];
          if (!route || !route?.length || route.length <= 1) {
            core.debug(`No route found, skipping`);
            continue;
          }

          const [user_name, jira_user_id] = [
            getUser(user_mappings, "name", "by_github_login", payload.review.user.login),
            getUser(user_mappings, "jira_id", "by_github_login", payload.review.user.login),
          ];
          if (jira_user_id == null) {
            core.warning("Unable to find user in mapping");
            throw new Error(
              `Github User ID: ${payload.review.user.login} not found in mapping`
            );
          }
          const comment = `Pull Request review by ${user_name}`;
          for (let j = 1, to = route.length; j < to; j++) {
            const t = getTransition(route[j - 1], route[j]);
            if (t === null) {
              core.warning("Unable to find proper transition");
              throw new Error(
                `Github User ID: ${payload.review.user.login} not found in mapping`
              );
            }
            await transitionIssue(
              jira,
              jira_issue.key,
              t,
              comment,
              jira_user_id as UserJiraId
            );
            touchIssue(jira_issue.key);
          }
          await commentIssue(jira, jira_issue.key, comment);
          touchIssue(jira_issue.key);
        } else {
          const to_do_status: JiraIssueStateToDo = "10000";

          const route = getGraph().path(
            jira_issue.fields.status.id as JiraIssueState,
            to_do_status
          ) as JiraIssueState[];
          if (!route || !route?.length || route.length <= 1) {
            core.debug(`No route found, skipping`);
            continue;
          }

          const [user_name, jira_user_id] = [
            getUser(user_mappings, "name", "by_github_login", payload.review.user.login),
            getUser(user_mappings, "jira_id", "by_github_login", payload.review.user.login),
          ];
          if (jira_user_id == null) {
            core.warning("Unable to find user in mapping");
            throw new Error(
              `Github User ID: ${payload.review.user.login} not found in mapping`
            );
          }
          const comment = `Pull Request not approved by ${user_name}\n${
            payload.review.body ?? ""
          }`;
          const dev_assignee = await findIssueDeveloper(jira, jira_issue.key);
          for (let j = 1, to = route.length; j < to; j++) {
            const t = getTransition(route[j - 1], route[j]);
            if (t === null) {
              core.warning("Unable to find proper transition");
              throw new Error(
                `Github User ID: ${payload.review.user.login} not found in mapping`
              );
            }
            await transitionIssue(
              jira,
              jira_issue.key,
              t,
              comment,
              jira_user_id as UserJiraId
            );
            touchIssue(jira_issue.key);
          }
          await commentIssue(jira, jira_issue.key, comment);
          touchIssue(jira_issue.key);
          await assignIssue(jira, jira_issue.key, dev_assignee);
        }
      } else {
        core.info("Skipping since jira issue and review type are different");
      }
    }
  } catch (e: any) {
    core.setFailed(e.message);
    return action_result;
  } finally {
    core.endGroup();
  }
  return action_result;
}
