import { Router } from "express"
import passport from "passport"
// local imports
import "../passport"
import controller from "../controller"

const RootRouter = Router()
RootRouter.use(passport.initialize())

RootRouter.post("/login", controller.login)
RootRouter.use(passport.authenticate("jwt", { session: false }))
RootRouter.get("/check-balance", controller.checkBalance)
RootRouter.post("/send-msg", controller.sendMsg)
RootRouter.get("/schedule-msgs", controller.fetchScheduleMsgs)
RootRouter.post("/schedule-msgs", controller.createScheduleMsgs)
RootRouter.get("/sent-msgs", controller.fetchSentMsgs)

export default RootRouter
export { RootRouter }
