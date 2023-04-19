export const mockActionCore = function () {
  let FILTER_STRING = "";
  const action_core_spy = {
    getInput: jest.fn(function ( key ) {
      if ( key === "filter_string" )
        return FILTER_STRING;
      return "mock_value"
    }),
    isDebug: jest.fn(function () {
      return true
    }),
    debug: jest.fn(),
    info: jest.fn(),
    startGroup: jest.fn(),
    endGroup: jest.fn(),
    setOutput: jest.fn(),
    setFailed: jest.fn()
  }
  const filter_str_update = (str: string) => FILTER_STRING = str;
  
  jest.mock("@actions/core", function () {
    return action_core_spy;
  });

  return {
    action_core_spy,
    filter_str_update
  };
}