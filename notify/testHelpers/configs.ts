export const mockConfig = function (): void {
  const TG_MESSAGE_MAX_LENGTH = 15;

  jest.mock("../src/configs/index", function () {
    return {
      TG_MESSAGE_MAX_LENGTH
    };
  });
}