/* eslint-disable @typescript-eslint/no-explicit-any */
import * as core from "@actions/core";
import * as github from "@actions/github";
import { localComparison, githubComparison } from "./functions";
import { GithubEventTypes } from "./reference/constants";

export default async function (): Promise<string> {
  let result = false;

  const context = github.context;

  try {
    core.info(`eventName is ${context.eventName}`)

    switch ( context.eventName ) {
      case GithubEventTypes.release: {
        core.startGroup(`localComparison() function is fired`);

        result = await localComparison();

        core.endGroup();
      } break;

      case GithubEventTypes.pull_request: case GithubEventTypes.push: {
        core.startGroup(`githubComparison() function is fired`);

        result = await githubComparison();

        core.endGroup();
      } break;

      default: {
        throw new Error(`This eventName (${context.eventName}) is not handled`)
      }
    }


  } catch (error: any) {
    core.setFailed(error.message)
  }

  core.info(`The result is ${result ? "TRUE" : "FALSE"}`);

  return result ? "1" : "0";
}