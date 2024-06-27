import express from "express"
import { addProduct,getAllProduct ,getSingleProduct} from "../controllers/productcontroller.js"
import { VerifyToken } from "../middleware/VerifyToken.js"

const router = express.Router()

router.get("/single/:id",VerifyToken, getSingleProduct)
router.get("/getallproduct",VerifyToken,getAllProduct)
router.post("/add",VerifyToken, addProduct)
 

export default router 