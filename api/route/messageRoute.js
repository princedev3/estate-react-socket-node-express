import express from "express"
import { VerifyToken } from "../middleware/VerifyToken.js"
import { addMessage } from "../controllers/messageController.js"

const router = express.Router()


router.post("/:chatId",VerifyToken,addMessage)


export default router 