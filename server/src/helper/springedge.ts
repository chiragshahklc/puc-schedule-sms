import axios from "axios"
//@ts-ignore
import springedge from "springedge"
import util from "util"
// local imports
import config from "../config"
import { formatMsg, httpStatus } from "../helper"

const send = util.promisify(springedge.messages.send)

interface ISuccessMessage {
  groupID: number
  MessageIDs: string
  status: string
}
interface IErrorMessage {
  error: string
}
interface ISendMessageResponse {
  status: boolean
  msgId: string | null
}

const sendMessage = async (
  contact: string,
  vehicle: string,
  date: string
): Promise<ISendMessageResponse> => {
  let params = {
    sender: config.SMS_SENDER,
    apikey: config.SMS_API_KEY,
    to: [`91${contact}`],
    message: formatMsg(date, vehicle),
    // message: "Hi,How are you?",
    format: "json",
  }
  try {
    const response: ISuccessMessage | IErrorMessage = await send(params, 5000)
    console.log(response)
    if ((response as ISuccessMessage).MessageIDs) {
      return {
        status: true,
        msgId: (response as ISuccessMessage).MessageIDs,
      }
    }
    return {
      status: false,
      msgId: (response as IErrorMessage).error,
    }
    /*
            response
            { groupID: 19001602,
              MessageIDs: '19001602-1',
              status: 'AWAITED-DLR' }
              */
  } catch (error) {
    console.log({ error })
    return {
      status: false,
      msgId: error.message,
    }
  }
}

interface IMessageStatus {
  id: string
  Recipient: string
  status: "DELIVRD" | "AWAITED-DLR"
  UpdatedTime: Date
}
const checkMsgStatus = async (
  msgId: string
): Promise<
  "DELIVRD" | "AWAITED-DLR" | "UNDELIV" | "EXPIRED" | "REJECTD" | null
> => {
  try {
    const url = `http://web.springedge.com/api/status/message?apikey=${config.SMS_API_KEY}&messageid=${msgId}&format=json`
    const response = await axios.get(url)
    const data: IMessageStatus = response.data
    return data.status
  } catch (error) {
    console.log(error)
    return null
  }
}

export default {
  sendMessage,
  checkMsgStatus,
}
export { sendMessage, checkMsgStatus }
