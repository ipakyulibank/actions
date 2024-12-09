import main from './src/main';
import * as core from '@actions/core';

(async () => {
  try {
    core.debug("Process started...");

    const result = await main();
    core.setOutput('result', result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(String(error));
    }
  } finally {
    core.debug("Process finished...");
  }
})();