// local imports
import app from "./app"
import { PORT } from "./config"

app.listen(PORT, (): void => {
  console.log("Server started on port " + PORT)
})
