import axios from "axios"
import { TELEGRAM_BOT_TOKEN } from "../config"

const url = () => {
  return `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`
}

const sendMessage = async (message: string) => {
  try {
    const msg = message
      .split("-")
      .join("\\-")
      .split(".")
      .join("\\.")
      .split("(")
      .join("\\(")
      .split(")")
      .join("\\)")
    const response = await axios.post(`${url()}/sendMessage`, {
      chat_id: "-1001587750202",
      text: "*CRON Job Successful*\n" + msg,
      parse_mode: "MarkdownV2",
    })
  } catch (error) {
    console.log(error)
  }
}

export { sendMessage }
export default { sendMessage }
