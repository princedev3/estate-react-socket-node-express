import express from "express"
import { Login,Register,Logout,Notifications } from "../controllers/authController.js"
import { VerifyToken } from "../middleware/VerifyToken.js"

const router = express.Router()


router.post("/register",Register)
router.post("/login",Login)
router.post("/logout",Logout)
router.get("/notification",VerifyToken, Notifications)


export default router