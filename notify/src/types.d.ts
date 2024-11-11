interface TelegramSendMessageOptions {
  chat_id: string,
  parse_mode: string,
  text: string,
  message_thread_id?: string
}