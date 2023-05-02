export const mockGithubCore = function () {
  let tg_message = "some text";
  const tg_message_update = (msg: string) => {
    tg_message = msg;  
  } 

  const github_core_spy = {
    getInput: jest.fn(function (param) {
      if ( param === "BODY" )
        return tg_message
      return "mock_value"
    }),
    isDebug: jest.fn(function () {
      return true
    }),
    debug: jest.fn(),
    setOutput: jest.fn(),
    setFailed: jest.fn()
  }
  
  jest.mock("@actions/core", function () {
    return github_core_spy;
  });

  return {
    github_core_spy,
    tg_message_update
  };
}