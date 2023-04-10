import main from './src/main';
import * as core from '@actions/core';
(async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const result = await main();
    core.setOutput('affected_issues', JSON.stringify(result));
  } catch (error: any) {
    core.setFailed(error?.message);
  }
})();
