/* eslint-disable @typescript-eslint/no-explicit-any */
import main from './src/main';
import * as core from '@actions/core';
(async () => {
  try {
    core.debug("Process started...")

    const result = await main();
    core.setOutput('result', result);
  } catch (error: any) {
    core.setFailed(error?.message);
  } finally {
    core.debug("Process finished...")
  }
})();
