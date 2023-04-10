import {
  extractIssueIdFromLine,
  isIssueKeyValid,
  isNeeded,
  isEventValid,
} from "./functions";
import push_context from "./tests/stub/push_context";
describe("Test extractIssueIdFromLine function", function () {
  const key = "IYM";
  it("should extract from long PR title", function () {
    const expected = `${key}-461`;
    const line = `${expected} Visa Direct: Добавляет параметр в quote`;
    const result = extractIssueIdFromLine(key, line);
    expect(result).toEqual(expected);
  });
  it("should extract from branch name", function () {
    const expected = `${key}-461`;
    const line = `${expected}-vd-add-param-to-quote`;
    const result = extractIssueIdFromLine(key, line);
    expect(result).toEqual(expected);
  });
  it("should extract from a line consisting only jira key", function () {
    const expected = `${key}-66681`;
    const line = `${expected}`;
    const result = extractIssueIdFromLine(key, line);
    expect(result).toEqual(expected);
  });
  it("should return null on wrong line", function () {
    expect(extractIssueIdFromLine(key, "SOMESHIT-2134")).toBeNull;
  });
});

describe("Test isIssueKeyValid", function () {
  const key = "IYM";
  const test_cases: [string, boolean][] = [
    [`${key}-123`, true],
    [`${key}-123-branch-name`, false],
    [`${key}123`, false],
    [`${key}-0`, false],
    [`${key}-2155125`, true],
    [`${key}A-123`, false],
    [`123-${key}`, false],
    [`WRONGKEY-123`, false],
    ["", false],
  ];
  test_cases.forEach(function (row) {
    const input_key: string = row[0];
    const result: boolean = row[1];
    it(`Key ${
      input_key || "with empty string in it "
    } should ${result ? "successfully" : "not be"} resolved`, function () {
      expect(isIssueKeyValid(key, input_key)).toBe(result);
    });
  });
});

describe("Test isNeeded function", function () {
  it("Should fail when pull request rejected review event is passed", function () {
    const old = push_context.payload.action;
    push_context.payload.action = "rejected";
    expect(isNeeded(push_context)).toBeFalsy();
    push_context.payload.action = old;
  });

  it("Should return true when good PUSH event is passed", function () {
    expect(isNeeded(push_context)).toBeTruthy();
  });
});

describe("Test isEventValid function", function () {
  it("Should fail when event name other than pull_request_review", function () {
    const old = push_context.eventName;
    push_context.eventName = 'push'
    expect(isEventValid(push_context)).toBeFalsy();
    push_context.eventName = old;
  });

  it("Should return true when proper event is passed", function () {
    expect(isEventValid(push_context)).toBeTruthy();
  });
});
