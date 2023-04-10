import { AxiosResponse, AxiosInstance } from "axios";

export const findIssueDeveloper = async function (
  jira: AxiosInstance,
  issue_key: string
): Promise<UserJiraId> {
  const jira_issue = await jira({
    method: "GET",
    url: `issue/${issue_key}`,
  });
  const candidates: Map<UserJiraId, number> = new Map();
  candidates.set(jira_issue.data.fields.assignee.accountId as UserJiraId, 0);

  const changelog = await jira({
    method: "GET",
    url: `issue/${issue_key}/changelog`,
  });
  const dev_in_progress: JiraIssueStateDevInProgress = "10008";
  let values = changelog.data.values;
  values = values
    .filter((v: any) => {
      const i = v.items.filter(
        (item: any) => item.fieldId === "status" && item.to === dev_in_progress
      );
      if (i.length) return true;
      return false;
    })
    .map((v: any) => v.author.accountId)
    .filter((v: string) => v !== "62de605dd60022fc0a788967");

  
  if (values.length) {
    values.forEach((v: UserJiraId) => {
      let c = candidates.get(v);
      if (c === undefined) {
        c = 0;
      }
      candidates.set(v, ++c);
    });
  }
  
  
  const result: [UserJiraId, number][] = Array.from(
    candidates.entries() as Iterable<[UserJiraId, number]>
  );
  
  result.sort((a: any, b: any): number => {
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    } else {
      return 0;
    }
  });
  if (!result[0] || !result[0][0]) {
    throw new Error("Unable to find assignee");
  }
  return result[0][0] as UserJiraId;
};

export const commentIssue = async function (
  jira: AxiosInstance,
  issue_key: string,
  comment: string
): Promise<boolean | AxiosResponse<any>> {
  const data: any = {
    body: comment,
  };
  try {
    const result = await jira({
      method: "POST",
      url: `issue/${issue_key}/comment`,
      data,
    });
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const transitionIssue = async function (
  jira: AxiosInstance,
  issue_key: string,
  transition: JiraIssueTransition,
  comment: string | null = null,
  actor_id: UserJiraId | null = null
): Promise<boolean | AxiosResponse<any>> {
  const data: any = {
    transition: {
      id: transition.id,
    },
    historyMetadata: {
      description: "Auto Transition from Github Actions",
    },
  };
  if (comment !== null) {
    data.update = {
      comment: [
        {
          add: {
            body: comment,
          },
        },
      ],
    };
  }
  if (actor_id !== null) {
    data.historyMetadata.actor = {
      id: actor_id,
    };
  }
  try {
    const result = await jira({
      method: "POST",
      url: `issue/${issue_key}/transitions`,
      data,
    });
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};


export const assignIssue = async function (
  jira: AxiosInstance,
  issue_key: string,
  jira_user_id: UserJiraId
): Promise<boolean | AxiosResponse<any>> {
  const data: any = {
    accountId: jira_user_id
  };

  try {
    const result = await jira({
      method: "POST",
      url: `issue/${issue_key}/assignee`,
      data,
    });
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};
