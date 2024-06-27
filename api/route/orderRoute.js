import express from "express"
import { VerifyToken } from "../middleware/VerifyToken.js"
import prisma from "../libs/prismadb.js"


const router = express.Router()



router.post("/",VerifyToken,async(req,res)=>{
    const userId = await req.userId
   
    const body = await req.body
    
try {
    const data = await prisma.order.create({
        data:body
        
    })
    return res.status(200).json(data)
} catch (error) {
    console.log(error)
     return res.status(500).json({message:"can not create order"})
}
})






export default router