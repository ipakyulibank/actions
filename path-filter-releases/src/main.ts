import minimatch from "minimatch"
import * as core from "@actions/core";
import * as github from "@actions/github";

export default async function ({
  context,
  github,
  core,
  exec
}) {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
    
  
  /** Validation */
  /**
   * 1. Is release?
   * 2. Is not pre_release?
   * 3. Has previous releases
   * 4. has ENV FILTER var
   */

  if(context.eventName !== 'release') {
    return core.setFailed('Only releases accepted');
  } else if (context.payload.action !== 'released') {
    return core.setFailed('Only released type of release is accepted');
  } else if (context.payload.release.prerelease === true) {
    return core.setFailed('Prerelease is not accepted in this step');
  } else if (!process.env.FILTER) {
    return core.setFailed('ENV var FILTER is mandatory');
  }
  const filter = process.env.FILTER;

  


  const current_release_tag = context.payload.release.tag_name;

  const releases_opts = github.rest.repos.listReleases.endpoint.merge({
    owner,
    repo,
  });
  
  const releases = await github.paginate(releases_opts);

  let found_current = false;
  let found_prev = false;
  for await (const release of releases) {
    if(release.draft || release.prerelease) {
      continue;
    }
    if(release.tag_name === current_release_tag) {
      found_current = true;
    } else if(found_current) {
      found_prev = release.tag_name;
      break;
    }
  }
  if(found_prev === false) {
    return core.setFailed('Could not find previous release');
  }

  await exec.exec(`git fetch --tags`)

  await exec.exec(`git status`)

  let git_diff_result = [];

  const options = {};
  options.listeners = {
    stdline: (data) => {
      git_diff_result.push(data.trim());
    }
  };

  core.info(`Searching in diff between ${found_prev} ${current_release_tag} using filter: ${filter}`);

  await exec.exec('git', ['diff', '--name-only', `tags/${found_prev}`, `tags/${current_release_tag}`], options)
  const result = git_diff_result.some((v) => minimatch(v, filter))

  core.info(`The result is ${result ? "TRUE" : "FALSE"}`);

  return result ? "1" : "0";
}