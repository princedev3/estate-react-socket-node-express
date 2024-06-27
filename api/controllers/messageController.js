import prisma from "../libs/prismadb.js"



export const addMessage = async(req,res)=>{
    const chatId = req.params.chatId
     const text = req.body.text
     const TokenUserId = req.userId
    try { 
        const existingChat = await prisma.chat.findUnique({
           where:{
            id:chatId,
            userIds:{
                hasSome:[TokenUserId]
            }
            
           }
        })

        if(!existingChat){
            return  res.status(500).json({message:"can not create message"})
        }

        const createMessage = await prisma.message.create({
            data:{
                text,userId:TokenUserId,chatId
            }
        })

        await prisma.chat.update({
            where:{
                id:chatId,
                userIds:{
                    hasSome:[TokenUserId]
                }
            },
            data:{
                seenBy:[TokenUserId],
                lastMessage:text
            }
        })

        return res.status(200).json(createMessage)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"can not create message"})
    }
}