import express from "express"
import { VerifyToken } from "../middleware/VerifyToken.js"
import Stripe from "stripe"
import prisma from "../libs/prismadb.js"

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


const router = express.Router()




router.post("/create-intent/:id",VerifyToken,async(req,res)=>{
    const id = req.params.id
    
    try {
        const findOrder =  await prisma.order.findUnique({
            where:{id}
        })

        if(findOrder){
            const paymentIntent = await stripe.paymentIntents.create({
                amount:findOrder.price * 100,
                currency: "usd",
               
                automatic_payment_methods: {
                  enabled: true,
                },
              });

              await prisma.order.update({
                where:{id},
                data:{
                    intent_id:paymentIntent.id,
                    
                }
              })
              return res.status(200).json({clientSecrete:paymentIntent.client_secret})
        }else{
            return res.status(500).json({message:"order not found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"can not create intent"})
    }
})


router.put("/update-order/:id",VerifyToken,async(req,res)=>{
    const id = req.params.id
  
    try {
        const findOrder =  await prisma .order.update({
            where:{
                intent_id: id},
            data:{
                status:"PAID/PROCESSING-ORDER"
            }
        })

     
       
            return res.status(200).json({message:"order updated"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"can not create intent"})
    }
})

  


export default router