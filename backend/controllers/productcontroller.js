import product from "../models/product.js";
// ADD OR CREATE A PRODUCT//

 
import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("PRODUCT ERROR:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};


 

// GET ALL  PRODUCTS//
export const getProduct = async (req,res)=>{
    try{
            const products = await product.find().sort({createdAt:-1})
            res.json(products);
    }catch(error){
        res.status(500).json({message: "server error",error});
    }
}

//DELETE A PARTICULAR PRODUCT//
export  const deleteProduct = async(req,res)=>{
    try{
        await product.findByIdAndDelete(req.params.id);
         res.json({message:"Delete product successfully"});
    }catch(error){
        res.status(500).json({message:"server error", error});
    }
}

//UPDATE A PARTICULAR PRODUCT//
export const updateProduct = async(req,res)=>{
    try{
        const updation = await product.findByIdAndUpdate(req.params.id,req.body,{new : true});
        res.json({message: "product update successfully", updation});
    }catch(error){
        res.status(500).json({message: "server error", error});
    }
}