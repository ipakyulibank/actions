import * as core from "@actions/core";
import { send_notification, stringify } from "./utils";

export default async function (): Promise<void> {
  const bot_token = core.getInput("BOT_TOKEN", { required: true });
  const chat_id = core.getInput("CHAT_ID", { required: true });
  const body = core.getInput("BODY", { required: true });
  const parse_mode = core.getInput("PARSE_MODE", { required: true });
  const url = 'https://api.telegram.org/bot';

  if ( core.isDebug() ) {
    core.debug(
      stringify({
        bot_token,
        chat_id,
        body,
        parse_mode
      })
    )
  }

  try {
    const r = await send_notification(
      `${url}${bot_token}/sendMessage`,
      {
        chat_id,
        parse_mode,
        text: body
      }
    );

    core.debug(
      stringify({
        message: "axios_response",
        response_body: r?.data,
        status: r?.status
      })
    )
    
    core.setOutput('result', '1');

  } catch (error: any) {
    core.setFailed({
      name: "axios_response_error",
      cause: error?.response?.data,
      message: error?.message
    });
  }
}