type UserName = string;
type UserJiraId = string;
type UserGithubId = number;
type UserGithubLogin = string;


type UserMappingDbKeys = "name" | "jira_id" | "github_id" | "github_login";
type UserMappingDbByKeys = `by_${UserMappingDbKeys}`;

const keys: UserMappingDbKeys[] = [
  "name",
  "jira_id",
  "github_id",
  "github_login",
];
type UserMappingDbRow = [UserName, UserJiraId, UserGithubId, UserGithubLogin];

type ReviewType = "code_review" | "test" | "other";
type ReviewResolution = "approved" | "changes_requested" | "commented";

type JiraIssueStateToDo = "10000";
type JiraIssueStateReadyForReview = "10002";
type JiraIssueStateReviewInProgress = "10003";
type JiraIssueStateToTest = "10004";
type JiraIssueStateTesting = "10005";
type JiraIssueStateDevCompleted = "10006";
type JiraIssueStateOnHold = "10007";
type JiraIssueStateDevInProgress = "10008";

type JiraIssueState =
  | JiraIssueStateToDo
  | JiraIssueStateReadyForReview
  | JiraIssueStateReviewInProgress
  | JiraIssueStateToTest
  | JiraIssueStateTesting
  | JiraIssueStateDevCompleted
  | JiraIssueStateOnHold
  | JiraIssueStateDevInProgress;

interface JiraIssueTransition {
  id: string;
  toState: JiraIssueState;
  name: string;
}

// interface JiraIssueTransitionList {
//   [index:string]: JiraIssueTransition
// }

type JiraIssueTransitionList = Record<string, JiraIssueTransition>;

type JiraIssueTransitionRoutes = Record<JiraIssueState, JiraIssueTransition[]>;

type JiraIssueFields = (JiraIssueField | any)[];
interface JiraIssue {
  key: string;
  fields: JiraIssueFields;
}
