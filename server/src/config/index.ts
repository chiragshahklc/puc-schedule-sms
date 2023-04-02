export const PORT: number = parseInt(process.env.PORT || "8080")
export const JWT_SECRET: string = process.env.JWT_SECRET || "JWT_SECRET"
export const SMS_API_KEY: string = process.env.SMS_API_KEY || "SMS_API_KEY"
export const SMS_SENDER: string = process.env.SMS_SENDER || "SMS_SENDER"
export const TELEGRAM_BOT_TOKEN: string =
  process.env.TELEGRAM_BOT_TOKEN || "TELEGRAM_BOT_TOKEN"

export default {
  PORT,
  JWT_SECRET,
  SMS_API_KEY,
  SMS_SENDER,
  TELEGRAM_BOT_TOKEN,
}
