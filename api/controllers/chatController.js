import prisma from "../libs/prismadb.js"






export const getChats = async(req,res)=>{
  try {
    const TokenUserId = await req.userId
  
    const chats = await prisma.chat.findMany({
        where:{
            userIds :{
                hasSome:[TokenUserId]
            }
        }
    })

    for(let chat of chats){
      
        const recieverId = chat.userIds.find(id => id !==TokenUserId)
        const reciever = await prisma.user.findUnique({
            where:{
                id:recieverId
            },
            select:{
                username:true,
                createdAt: true,
                username :true,
                email:true,
                img :true,
                id:true  
            }
        })

        chat.reciever = reciever
    }
    
    return res.status(200).json(chats)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"can not get all chat"})
  }
}


export const getChat = async(req,res)=>{
    try {
        const TokenUserId = req.userId
        const id = req.params.id

        const singleChat = await prisma.chat.findUnique({
            where:{
                id,
                userIds:{
                    hasSome:[TokenUserId]
                }
            },
            include:{
                message:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })
        await prisma.chat.update({
            where:{
                id,
                userIds:{
                    hasSome:[TokenUserId]
                }
            },
            data:{
                seenBy:{
                    set:[TokenUserId]
                }
            }
        }) 

        
            const recieverId = singleChat.userIds.find(id => id !==TokenUserId)

            const reciever = await prisma.user.findUnique({
                where:{
                    id:recieverId
                },
                select:{
                    username:true,
                    createdAt: true,
                    username :true,
                    email:true,
                    img :true,
                    id:true
                }
            })
        
        return res.status(200).json({...singleChat,reciever})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"can not get single chat"})
    }
}



export const deleteChat = async(req,res)=>{

}



export const updateChat = async(req,res)=>{
const id = await req.params.id
const TokenUserId = req.userId
    try {  
        const updatedChat = await prisma.chat.update({
            where:{
            id,
            userIds:{
                set:[TokenUserId]
            }
            }
        })
        return res.status(200).json(updatedChat)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"can not update chat"})
    }
}



export const createChat = async(req,res)=>{
try {
    const TokenUserId = await req.userId
    const recieverId = await req.body.recieverId

 const existingChat = await prisma.chat.findFirst({
    where:{  
        AND: [
            { userIds: { has: TokenUserId } },
            { userIds: { has: recieverId } },
          ],
    
    }
 })

 if(!existingChat){

     const createChat = await prisma.chat.create({
            data:{
                userIds:[TokenUserId,recieverId]
            }
        })
        return res.status(200).json(createChat)
 }else{
    return res.status(200).json(existingChat);
 }



   


} catch (error) {
    console.log(error)
    return res.status(500).json({message:"can not create chat"})
}
} 