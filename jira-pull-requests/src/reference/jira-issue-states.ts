/* eslint-disable @typescript-eslint/no-explicit-any */
import Graph from "node-dijkstra";

const ref = {
  code_review: ["ready for review", "review in progress"],
  test: ["to test", "testing"],
  other: [],
};

const state_map: JiraIssueState[] = [
  "10000",
  "10002",
  "10003",
  "10004",
  "10005",
  "10006",
  "10007",
  "10008",
];

const ts: JiraIssueTransitionList = {
  put_on_hold: { toState: "10007", id: "141", name: "Put On Hold" },
  dev_in_progress: { toState: "10008", id: "61", name: "Dev In Progress" },
  reopen: { toState: "10000", id: "151", name: "Reopen" },
  ready_for_review: { toState: "10002", id: "71", name: "Ready For Review" },
  start_code_review: { toState: "10003", id: "81", name: "Start Code Review" },
  to_test: { toState: "10004", id: "91", name: "To Test" },
  start_testing: { toState: "10005", id: "101", name: "Start Testing" },
  dev_completed: { toState: "10006", id: "111", name: "Dev Completed" },
};

const routes: JiraIssueTransitionRoutes = {
  "10000": [ts.dev_in_progress],
  "10008": [ts.reopen, ts.ready_for_review],
  "10002": [ts.reopen, ts.start_code_review],
  "10003": [ts.reopen, ts.to_test],
  "10004": [ts.reopen, ts.start_testing],
  "10005": [ts.reopen, ts.dev_completed],
  "10006": [ts.reopen],
  "10007": [ts.reopen, ts.dev_in_progress, ts.to_test, ts.ready_for_review],
};

export const getGraph = function (): Graph {
  const graph = new Graph();
  for (const [state_id, possible_transitions] of Object.entries(routes)) {
    const options: any = {};
    possible_transitions.forEach((t: JiraIssueTransition) => {
      options[t.toState] = 1;
    });
    graph.addNode(state_id, options);
  }
  return graph;
};

export const getTransition = (
  from: JiraIssueState,
  to: JiraIssueState
): JiraIssueTransition | null => {
  const result = Object.entries(routes)
    .filter(([k, v]) => k === from)
    .map(([k, v]) =>
      v.filter((t: JiraIssueTransition): boolean => t.toState === to)
    );
  if (result.length && result[0].length) {
    return result[0][0];
  }
  return null;
};

export const getStates = function (type: ReviewType | null = null): string[] {
  const ret: string[] = [];
  if (type === null) {
    Object.values(ref).forEach((values: string[]) => {
      if(values?.length) {
        ret.push(...values);
      }
    });
  } else if (ref[type]) {
    ret.push(...ref[type]);
  } else {
    return ref["other"];
  }
  return ret;
};
