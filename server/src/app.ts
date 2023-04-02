import express, { Express, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import path from "path"
// local imports
import { httpStatus } from "./helper"
import { RootRouter } from "./routes"
import "./cron"

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        "script-src-attr": ["'self'"],
      },
    },
  })
)

app.get("/api", (req: Request, res: Response) => {
  res.status(httpStatus.OK).send("API Working Successfully")
})

app.use("/api/v1", RootRouter)

// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
}
app.use(express.static(path.join(__dirname, "../../client/build")))

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"))
})

export default app
