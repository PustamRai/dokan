import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is listening at PORT ${PORT}`)
    })
})
.catch((error) => {
    console.error("connection to mongodDB failed...", error.message)
    process.exit(1) // process code 1 means exit with failure, 0 means success
})

// middlewares
app.use(cors())
app.use(express.json())

// api endpoints
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
    res.send("welcome to dokan")
})