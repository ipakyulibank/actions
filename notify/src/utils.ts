import axios from "axios";

export const send_notification = async function ( 
  url: string, 
  options: TelegramSendMessageOptions 
) {
  let result;

  if ( options.text.length > 3900 ) {
    let full_text = options.text;

    while( full_text.length > 0 ){
      const text = full_text.substring(0, 3900)
      full_text = full_text.slice(3900)

      result = await request( url, {
        chat_id: options.chat_id,
        parse_mode: options.parse_mode,
        text
      } )
    }
  } else {
    result = await request( url, options )
  }

  return result;
}

export const request = function ( url: string, options: TelegramSendMessageOptions ) {
  return axios.post( url, options );
}