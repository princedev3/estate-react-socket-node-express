import  express from "express"
import authRoute from "./route/authRoute.js"
import postRoute from "./route/prouductRoute.js"
import chatRoute from "./route/chatRoute.js"
import messageRoute from "./route/messageRoute.js"
import payRoute from "./route/payRoute.js"
import orderRoute from "./route/orderRoute.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { VerifyToken } from "./middleware/VerifyToken.js"
const app = express()


app.use(express.json())
app.use(cookieParser())  
app.use(cors({
    origin:process.env.CLIENTURL,credentials:true
}))
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)
app.use("/api/chat",chatRoute)
app.use("/api/message",messageRoute)  
app.use("/api/pay",payRoute)  
app.use("/api/order",orderRoute)  



app.listen(5000,()=>console.log("server is up"))   