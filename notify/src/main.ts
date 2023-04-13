import * as core from "@actions/core";
import { send_notification } from "./utils";

export default async function (): Promise<boolean> {
  const bot_token = core.getInput("BOT_TOKEN", { required: true });
  const chat_id = core.getInput("CHAT_ID", { required: true });
  const body = core.getInput("BODY", { required: true });
  const parse_mode = core.getInput("PARSE_MODE", { required: true });
  const url = 'https://api.telegram.org/bot';
  let result = false;

  try {
    const r = await send_notification(
      `${url}${bot_token}/sendMessage`,
      {
        chat_id,
        parse_mode,
        text: body
      }
    );
    result = true

    core.debug(
      JSON.stringify({
        message: "axios_response",
        response_body: r?.data,
        status: r?.status
      })
    )
  } catch (error: any) {
    core.setFailed(error?.message);
    result = false
  }
  return result;
}