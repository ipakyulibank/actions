/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ErrorTypes } from "./reference/errors";
import { TG_MESSAGE_MAX_LENGTH } from "./configs/"
import { HttpsProxyAgent } from 'https-proxy-agent';

export const send_notification = async function ( 
  url: string, 
  options: TelegramSendMessageOptions 
) {

  if ( options.text.length > TG_MESSAGE_MAX_LENGTH ) {
    throw new Error( ErrorTypes.message_length_too_long )
  }
  const axiosOptions: AxiosRequestConfig = {};
  if ( process.env.HTTPS_PROXY ) {
    axiosOptions.proxy = false;
    axiosOptions.httpsAgent = new HttpsProxyAgent(process.env.HTTPS_PROXY);
  }

  return axios.post( url, options, axiosOptions );
}

export const stringify = ( data: any ) => JSON.stringify( data )