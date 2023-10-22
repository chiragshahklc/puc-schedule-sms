import cron from "node-cron"
import dayjs from "dayjs"
// local imports
import prisma from "./prisma"
import { springedge, telegram, delay } from "./helper"

// send scheduled msgs at 00:01 IST
cron.schedule(
  "1 0 * * *",
  async () => {
    try {
      const startDate = dayjs().add(1, "d").set("hour", 0).set("minute", 0)
      console.log(startDate.toISOString(), startDate.add(2, "d").toISOString())
      const scheduledMsgs = await prisma.schedule_msg.findMany({
        select: {
          expiryDate: true,
          customer: {
            select: {
              id: true,
              contactNo: true,
              vehicleNo: true,
            },
          },
        },
        where: {
          expiryDate: {
            gte: startDate.toISOString(),
            lte: startDate.add(2, "d").toISOString(),
          },
        },
      })
      if (scheduledMsgs.length) {
        for (const msg of scheduledMsgs) {
          await delay(100)
          const response = await springedge.sendMessage(
            msg.customer?.contactNo || "",
            msg.customer?.vehicleNo || "",
            msg.expiryDate ? dayjs(msg.expiryDate).format("YYYY-MM-DD") : ""
          )
          if (response.status) {
            await prisma.sent_msg.create({
              data: {
                customerId: msg.customer?.id,
                msgId: response.msgId,
                sentTime: dayjs().toISOString(),
                msgStatus: "AWAITED-DLR",
              },
            })
          }
        }

        await telegram.sendMessage(
          "PUC Scheduled messages sent.\n\nTotal message tried sent: " +
            scheduledMsgs.length
        )
      }
      console.log("Send scheduled msgs cron job done")
    } catch (error) {
      console.log(error)
    }
  },
  {
    timezone: "Asia/Kolkata",
  }
)

// update sent message status 05:01 IST
cron.schedule(
  "1 5 * * *",
  async () => {
    try {
      const awaitedMsgs = await prisma.sent_msg.findMany({
        where: {
          msgStatus: "AWAITED-DLR",
        },
      })
      for (const msg of awaitedMsgs) {
        if (msg.msgId) {
          await delay(100)
          const status = await springedge.checkMsgStatus(msg.msgId)
          await prisma.sent_msg.update({
            where: {
              id: msg.id,
            },
            data: {
              msgStatus: status,
            },
          })
        }
      }

      const todayMsgs = await prisma.sent_msg.findMany({
        where: {
          sentTime: {
            gte: dayjs().add(-24, "h").toISOString(),
          },
        },
      })
      const msgCount = todayMsgs.reduce((prev, curr) => {
        const msgStatus = curr.msgStatus || "other"
        return {
          ...prev,
          [msgStatus]: prev[msgStatus] ? prev[msgStatus] + 1 : 1,
        }
      }, {} as any)
      const msgCountString = Object.entries(msgCount)
        .map((entry) => entry.join(" : "))
        .join("\n")

      await telegram.sendMessage(
        "PUC Scheduled messages status updated.\n\n" + msgCountString
      )
      console.log("Update sent msg status cron job done")
    } catch (error) {
      console.log(error)
    }
  },
  {
    timezone: "Asia/Kolkata",
  }
)
