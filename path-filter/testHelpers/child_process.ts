export const mockChildProcess = function () {
  jest.mock("child_process", function () {
    const originalModule = jest.requireActual("child_process");
    return {
      ...originalModule,
      spawn: jest.fn(function (v,v2,options: any) {
        options.signal("README.md")
        options.signal("package.json")
        options.signal("src/index.js")
      })
    };
  });
}