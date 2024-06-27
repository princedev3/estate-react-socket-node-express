import prisma from "../libs/prismadb.js"

export const addProduct = async (req,res)=>{
    try {
        const TokenUserId = req.userId
        const body = await req.body


        if(TokenUserId !==body.userId){
            return res.status(500).json({message:"can not create product"})
        }
       const product = await prisma.product.create({
        data:body
       })

       return res.status(200).json({message:"product created"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"can not create product"})
    }
}



export const getAllProduct = async (req,res)=>{
    try {
    const query = req.query
    const products = await prisma.product.findMany({
       where:{
        price:{
            gte:parseInt(query.minPrice)||undefined,
            lte:parseInt(query.maxPrice)||undefined
        },
        type:query.type|| undefined,
        city:query.city || undefined
       }
    })

       return res.status(200).json(products)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"can not get all product"})
    }
}

  


export const getSingleProduct = async (req,res)=>{
    try {
        const id = req.params.id
      const product = await prisma.product.findUnique({
        where:{
            id
        }  
      })
   
       return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"can not get all product"})
    }
}

