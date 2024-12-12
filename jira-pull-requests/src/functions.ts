/* eslint-disable @typescript-eslint/no-explicit-any */
import * as core from "@actions/core";
import { Context } from "@actions/github/lib/context";
import { getStates } from "./reference/jira-issue-states";
import {
  PullRequestReviewEvent,
  WebhookEventName,
} from "@octokit/webhooks-definitions/schema";

export function isIssueKeyValid(
  jira_project_key: string,
  issue_key: string
): boolean {
  const rule = new RegExp(`^${jira_project_key}-(\\d+)$`);

  const matches = issue_key.match(rule);
  if (!matches) {
    return false;
  }
  const issue_number = Number(matches[1]);
  if (issue_number < 1) {
    return false;
  }
  return true;
}

export function extractIssueIdFromLine(
  jira_project_key: string,
  line: string
): string | null {
  const rule = new RegExp(`^${jira_project_key}-(\\d+)`);
  let issue_key = null;

  line = line.trim();
  if (line.startsWith(jira_project_key)) {
    const match = line.match(rule);
    if (match && match[0]) {
      issue_key = match[0];
    }
  }
  if (issue_key !== null) {
    if (isIssueKeyValid(jira_project_key, issue_key)) {
      return issue_key;
    }
  }
  return null;
}

export function isNeeded(context: Context): boolean {
  const payload = context.payload as PullRequestReviewEvent;
  core.debug(`payload.action is ${payload.action}`);
  if (payload.action !== "submitted") {
    core.info("PR Review is not submitted type, not needed");
    return false;
  }
  core.debug(`pr is draft? ${payload.pull_request.draft ? "true" : "false"}`);
  if (payload.pull_request.draft) {
    core.info("Pull is draft, not needed");
    return false;
  }
  core.info("Everything looks fine");
  return true;
}

export function isEventValid(context: Context): boolean {
  const eventName: WebhookEventName = context.eventName as WebhookEventName;
  core.debug(`eventName is ${eventName}`);
  if (eventName !== "pull_request_review") {
    core.warning("Event is not pull request review");
    return false;
  }
  return true;
}

export function extractJiraIssues(
  context: Context,
  jira_project_key: string
): string[] {
  const payload = context.payload as PullRequestReviewEvent;

  const sources: string[] = [];
  sources.push(payload.pull_request.title);
  sources.push(payload.pull_request.head.ref);
  const body = (payload.pull_request.body ?? "").split("\n");
  if (body) {
    sources.push(...body);
  }
  core.debug(`We have multiple sources: ${sources.join("\n")}`);

  const jira_issues: Set<string> = new Set();
  sources
    .map((line) => extractIssueIdFromLine(jira_project_key, line))
    .forEach((v) => {
      if (v !== null) {
        jira_issues.add(v);
      }
    });
  return Array.from(jira_issues);
}

export function isPullRequestReviewApproved(context: Context): boolean {
  const payload = context.payload as PullRequestReviewEvent;
  if (payload.review.state === "approved") {
    return true;
  }
  return false;
}

export function getJiraIssueMode(jira_issue: any): ReviewType {
  if (jira_issue?.fields?.status?.name ?? "") {
    if (
      getStates("code_review").includes(
        jira_issue.fields.status.name.toLowerCase()
      )
    ) {
      return "code_review";
    } else if (
      getStates("test").includes(jira_issue.fields.status.name.toLowerCase())
    ) {
      return "test";
    }
  }
  return "other";
}
