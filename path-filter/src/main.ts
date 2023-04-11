import * as core from "@actions/core";
import * as github from "@actions/github";
import { privateValidator, publicValidator } from "./functions";

export default async function (): Promise<string> {
  let result = false;

  const context = github.context;

  try {
    core.info(`eventName is ${context.eventName}`)

    switch ( context.eventName ) {
      case "release": {
        core.startGroup(`privateValidator() function is fired`);
        
        result = await privateValidator();
        
        core.endGroup();
      } break;
      
      case "pull_request": case "push": {
        core.startGroup(`publicValidator() function is fired`);

        result = await publicValidator();

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