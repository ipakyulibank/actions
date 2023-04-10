import * as core from "@actions/core";
import * as github from "@actions/github";
import { exec, spawn } from "child_process";
import { minimatch } from "minimatch";

export default async function (): Promise<string> {
  const github_token = core.getInput("github_token", { required: true });
  const filter = core.getInput("filter", { required: true });
  let result;

  const octokit = github.getOctokit(github_token);
  const context = github.context;

  const owner = context.repo.owner;
  const repo = context.repo.repo;
    
  
  /** Validation */
  /**
   * 1. Is release?
   * 2. Is not pre_release?
   * 3. Has previous releases
   * 4. has ENV FILTER var
   */

  try {
    if(context.eventName !== 'release') {
      throw new Error('Only releases accepted');
    } else if (context.payload.action !== 'released') {
      throw new Error('Only released type of release is accepted');
    } else if (context.payload.release.prerelease === true) {
      throw new Error('Prerelease is not accepted in this step');
    } else if (!filter) {
      throw new Error('ENV var FILTER is mandatory');
    }
  
    
  
  
    const current_release_tag = context.payload.release.tag_name;
  
    const releases_opts = octokit.rest.repos.listReleases.endpoint.merge({
      owner,
      repo,
    });
    
    const releases: any = await octokit.paginate(releases_opts);
  
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
      throw new Error('Could not find previous release');
    }
  
    await exec(`git fetch --tags`)
  
    await exec(`git status`)
  
    const git_diff_result: string[] = [];
  
    let options = {};
    options = {
      signal: (data: string) => {
        git_diff_result.push(data.trim());
      }
    };
  
    core.info(`Searching in diff between ${found_prev} ${current_release_tag} using filter: ${filter}`);
  
    await spawn('git',['diff', '--name-only', `tags/${found_prev}`, `tags/${current_release_tag}`], options)
    result = git_diff_result.some((v) => minimatch(v, filter))

  } catch (error: any) {
    core.setFailed(error.message)
  }

  core.info(`The result is ${result ? "TRUE" : "FALSE"}`);

  return result ? "1" : "0";
}