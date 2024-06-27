import jwt from "jsonwebtoken"



// export const VerifyToken = async (req,res,next)=>{
//     try {
//         const token = req.cookies.token
//  console.log("token "+token)
//         if(!token){
//             return res.status(500).json({message:"not allowed"})
//         }
//         jwt.verify(token,process.env.JWTSECRETE,async(error,payload)=>{
//             if(error){
//                 return res.status(500).json({message:"not allowed"})
//             }
//             req.userId = payload.id
           
//             next()
//         })
      
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({message:"can not verify token"})
//     }
// }    



export const VerifyToken = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
 
    if (!token) {
      return res.status(500).json({ message: "not allowed" });
    }
    
    jwt.verify(  token, process.env.JWTSECRETE,async(error, payload) => {
        if (error) {
          return res.status(500).json({ message: "not allowed" });
        }
        req.userId = payload.id;
    
        next()
      })
    ;
  } catch (error) {
    console.log(error);
  }
};