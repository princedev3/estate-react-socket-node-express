import prisma from "../libs/prismadb.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const Register = async(req,res)=>{
    try {
       const {password,...body} =await  req.body

       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(password, salt);

       
         const user = await prisma.user.create({
            data:{...body,password:hash}
         })
         return res.status(200).json(user) 
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"can not create user"})
    }
}
export const Login = async (req,res)=>{
    try {
        const {username,password} = req.body
        const findUser =  await prisma.user.findUnique({
             where:{
                username
             }
        })

        if(!findUser) {
            return res.status(500).json({message:"not allowed"})
        }

        const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);

        if(!isPasswordCorrect){
            return res.status(500).json({message:"not allowed"})
        }
        const age = 1000*60*60*24*7
        const token = jwt.sign({
            id:findUser.id,
           
        },process.env.JWTSECRETE,{expiresIn:age})

        const{password:findUserPassword,...rest}= findUser
        res.cookie("token",token,{httpOnly:"true",maxAge:age}).status(200).json(rest)

    } catch (error) {
        console.log(error)
    }
}
export const Logout = async (req,res)=>{
    try {
        res.clearCookie("token").status(200).json({message:'loggout out'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"cant logged out"})
    }
}   
export const Notifications = async (req,res)=>{
    try {
        const tokenUserId = req.userId

        const ress = await prisma.chat.findMany({
            where: {
                userIds: {
                  hasSome: [tokenUserId],
                },
                NOT: {
                  seenBy: {
                    hasSome: [tokenUserId],
                  },
                },
              },
        })
        res.status(200).json(ress.length)
    } catch (error) {
        console.log(error)
        console.log("faile")
        res.status(500).json({message:"cant get count"})
    }
}   


