import express from "express";
import {createProduct,getProduct,deleteProduct,updateProduct} from "../controllers/productController.js";


const router = express.Router();

router.post('/add',createProduct)
router.get('/',getProduct)
router.delete('/delete/:id', deleteProduct )
router.put('/update/:id',updateProduct)

export default router;  