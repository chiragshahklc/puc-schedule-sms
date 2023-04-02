/**
 * Custom Component Import
 * Axios Instance Is Import So We Can Re-use In API's Calling Section.
 */
import axios from "./axios-handler"

/**
 * This Is Main Method Of This Funtional Component.
 */
export const scheduleMsg = {
  // This Method Is Used To Fetch Scheduled Messages.
  getScheduleMsgs: async () => {
    try {
      let scheduleMsgs = await axios.get("/schedule-msgs").catch(console.error)
      return scheduleMsgs.data
    } catch (error) {
      console.error(error)
    }
  },

  // This Method Is Used To Add New Messages In Scheduling System
  addScheduleMsg: async ({ contactNo, vehicleNo, expiryDate, bulk }) => {
    try {
      let scheduleMsgs = await axios
        .post("/schedule-msgs", {
          contactNo,
          vehicleNo,
          expiryDate,
          bulk,
        })
        .catch(console.error)
      return scheduleMsgs.data
    } catch (error) {
      console.error(error)
    }
  },
}
