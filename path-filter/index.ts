import main from './src/main';
import * as core from '@actions/core';
(async () => {
  try {
    const result = await main();
    core.setOutput('result', result);
  } catch (error: any) {
    core.setFailed(error?.message);
  }
})();
