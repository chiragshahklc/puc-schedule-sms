import dayjs from "dayjs"
// local imports
import springedge from "./springedge"
import telegram from "./telegram"

const httpStatus = {
  OK: 200,
  Created: 201,
  No_Content: 204,
  Bad_Request: 400,
  Unauthorized: 401,
  Forbidden: 403,
  Not_Found: 404,
  Conflict: 409,
  Payload_Too_large: 413,
  Internal_Server_Error: 500,
}

const formatMsg = (date: string, vehicleNo: string) => {
  try {
    // `Your PUC expires on 13 Mar 2020. Your PUC vehicle no is GJ AA 1111. Please renew your vehicle PUC before due date. From - Unnati PUC, Bardoli. MO-9427673606`
    // Your PUC expires on {#var#}. Your PUC vehicle no is {#var#}. Please renew your vehicle PUC before due date. From - Unnati PUC, Bardoli. MO-9427673606
    const expiryDate = dayjs(date).format("DD MMM YYYY")

    const str = `Your PUC expires on ${expiryDate}. Your PUC vehicle no is ${vehicleNo}. Please renew your vehicle PUC before due date. From - Unnati PUC, Bardoli. MO-9427673606`
    return str
  } catch (error) {
    console.error(error)
  }
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export { httpStatus, formatMsg, springedge, telegram, delay }
export default { httpStatus, formatMsg, springedge, telegram, delay }
