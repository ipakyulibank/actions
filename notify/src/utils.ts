import axios from "axios";
import { ErrorTypes } from "./reference/errors";
import { TG_MESSAGE_MAX_LENGTH } from "./configs/"

export const send_notification = async function ( 
  url: string, 
  options: TelegramSendMessageOptions 
) {

  if ( options.text.length > TG_MESSAGE_MAX_LENGTH ) {
    throw new Error( ErrorTypes.message_length_too_long )
  }

  return axios.post( url, options );;
}

export const stringify = ( data: any ) => JSON.stringify( data )