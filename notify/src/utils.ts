import axios from "axios";
import { ErrorTypes } from "./reference/errors";

export const send_notification = async function ( 
  url: string, 
  options: TelegramSendMessageOptions 
) {

  if ( options.text.length > 3990 ) {
    throw new Error( ErrorTypes.message_length_too_long )
  }

  return axios.post( url, options );;
}

export const stringify = ( data: any ) => JSON.stringify( data )