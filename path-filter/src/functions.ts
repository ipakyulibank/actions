import * as core from "@actions/core";
import * as github from "@actions/github";
import { exec, spawn } from "child_process";
import { minimatch } from "minimatch";

export async function localComparison (): Promise<boolean> {
  const github_token = core.getInput("github_token", { required: true });
  const filter = core.getInput("filter_string", { required: true });

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

  if(context.eventName !== 'release') {
    throw new Error('Only releases accepted');
  } else if (context.payload.action !== 'released') {
    throw new Error('Only released type of release is accepted');
  } else if (context.payload.release.prerelease === true) {
    throw new Error('Prerelease is not accepted in this step');
  } else if (!filter) {
    throw new Error('ENV var FILTER is mandatory');
  }
  core.debug("base validations completed");

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

  core.debug(`Files of compared commits: ${ JSON.stringify( git_diff_result ) }`);

  const result = git_diff_result.some((v) => minimatch(v, filter, { matchBase: true }))

  core.debug(`git difference of multiple tags is ${result}`);

  return result;
}

export async function githubComparison (): Promise<boolean> {
  const github_token = core.getInput("github_token", { required: true });
  const filter = core.getInput("filter_string", { required: true });

  const octokit = github.getOctokit(github_token);
  const context = github.context;

  const owner = context.repo.owner;
  const repo = context.repo.repo;
  
  let base, head;
    
  switch (context.eventName) {
    case 'pull_request':
      base = context.payload.pull_request?.base?.sha
      head = context.payload.pull_request?.head?.sha
      break
    case 'push':
      base = context.payload.before
      head = context.payload.after
      break
    default:
      core.setFailed(
        `This action only supports pull requests and pushes, ${context.eventName} events are not supported. ` +
          "Please submit an issue."
      )
  }

  // Log the base and head commits
  core.info(`Base commit: ${base}`)
  core.info(`Head commit: ${head}`)

  /** Validation */

  if (!filter) {
    core.setFailed('ENV var FILTER is mandatory');
  }
      // Ensure that the base and head properties are set on the payload.
  if (!base || !head) {
    core.setFailed(
      `The base and head commits are missing from the payload for this ${context.eventName} event. ` +
        "Please submit an issue."
    )
  }

  const compare_opts = octokit.rest.repos.compareCommits.endpoint.merge({
    base,
    head,
    owner,
    repo
  })
  const diffs: any = await octokit.paginate(compare_opts);
  const files = new Set();
  for await (const diff of diffs) {
    for (const file of diff.files) {
      files.add(file.filename);
    }
  }

  core.debug(`Files of compared commits: ${ Array.from( files ) }`);
  
  const result = Array.from(files).some((v: any) => minimatch(v, filter, { matchBase: true }))

  core.debug(`at least 1 file matching 'filter_string' is ${result}`);

  return result;
}