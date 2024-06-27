import express from "express"
import {getChat,getChats,deleteChat,createChat,updateChat} from "../controllers/chatController.js"
const router = express.Router()
import { VerifyToken } from "../middleware/VerifyToken.js" 


router.get("/",VerifyToken,getChats)
router.get("/:id",VerifyToken,getChat)
router.put("/:id",updateChat)
router.delete("/:id",deleteChat)
router.post("/",VerifyToken,createChat)

 

export default router 