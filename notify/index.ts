import main from './src/main';
import * as core from '@actions/core';
(async () => {
  core.debug("Process started...")
  await main();
  core.debug("Process finished...")
})();
