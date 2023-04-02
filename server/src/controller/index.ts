import { Request, Response, NextFunction } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import axios from "axios"
import dayjs from "dayjs"
// local imports
import config from "../config"
import { httpStatus, springedge } from "../helper"
import prisma from "../prisma"
import { scheduleMsg } from "../handler"

const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) {
      console.log(err)
      return res.status(httpStatus.Bad_Request).send({ message: info.message })
    }
    if (!user) {
      return res.status(httpStatus.Bad_Request).send({ message: info.message })
    }
    req.login(user.id, (err) => {
      const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
        expiresIn: "1d",
      })
      res.status(httpStatus.OK).json({
        auth: true,
        token,
        message: "User logged in successfully",
      })
    })
  })(req, res, next)
}

const checkBalance = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://instantalerts.co/api/status/credit?apikey=766toi4i3t3ro7ry8frx16b25gl79w6l40&format=json"
    )
    res.status(httpStatus.OK).send({ auth: true, data: response.data })
  } catch (error) {
    res.status(httpStatus.Bad_Request).send({ auth: true, error })
  }
}

const sendMsg = async (req: Request, res: Response) => {
  try {
    let data: Array<{
      ind: number
      contact: string
      vehicle: string
      date: string
    }> = req.body

    for (const d of data) {
      await springedge.sendMessage(d.contact, d.vehicle, d.date)
    }
    res.status(httpStatus.OK).send("Message sent successfully")
  } catch (error) {
    res.status(400).send(error)
  }
}

const fetchScheduleMsgs = async (req: Request, res: Response) => {
  try {
    const response = await prisma.schedule_msg.findMany({
      select: {
        id: true,
        expiryDate: true,
        createdDate: true,
        customer: {
          select: {
            id: true,
            contactNo: true,
            vehicleNo: true,
          },
        },
      },
      orderBy: {
        createdDate: "desc",
      },
    })
    const result = response.map((item) => ({
      contactNo: item.customer?.contactNo,
      vehicleNo: item.customer?.vehicleNo,
      expiryDate: item.expiryDate,
      createdDate: item.createdDate,
      id: item.id,
      customerId: item.customer?.id,
    }))

    res.status(httpStatus.OK).send(result)
  } catch (error) {
    res.status(httpStatus.Bad_Request).send("Fetch schedule msgs failed.")
  }
}

const createScheduleMsgs = async (req: Request, res: Response) => {
  try {
    const { contactNo, vehicleNo, expiryDate, bulk } = req.body
    let countMsg = ""
    if (bulk) {
      for (const [i, contact] of contactNo.entries()) {
        await scheduleMsg.createScheduleMsg(
          contact,
          vehicleNo[i],
          dayjs(expiryDate).toDate(),
          dayjs().toDate()
        )
      }
      countMsg = ` ${contactNo.length} msgs.`
    } else {
      await scheduleMsg.createScheduleMsg(
        contactNo,
        vehicleNo,
        dayjs(expiryDate).toDate(),
        dayjs().toDate()
      )
    }

    res.status(httpStatus.Created).send("Schedule msg added." + countMsg)
  } catch (error) {
    console.error(error)
    res.status(httpStatus.Bad_Request).send("Add schedule msg failed")
  }
}

const fetchSentMsgs = async (req: Request, res: Response) => {
  try {
    const msgs = await prisma.sent_msg.findMany({
      select: {
        customer: {
          select: {
            contactNo: true,
            vehicleNo: true,
          },
        },
        msgStatus: true,
        sentTime: true,
      },
    })
    res.status(httpStatus.OK).json(msgs)
  } catch (error) {
    console.error(error)
    res.status(httpStatus.Bad_Request).send("fetch sent msgs failed")
  }
}

export {
  login,
  checkBalance,
  sendMsg,
  fetchScheduleMsgs,
  createScheduleMsgs,
  fetchSentMsgs,
}
export default {
  login,
  checkBalance,
  sendMsg,
  fetchScheduleMsgs,
  createScheduleMsgs,
  fetchSentMsgs,
}
