import Cart from '../models/Cart.js';

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });

        ////This creates a new cart for the user///
        if (!cart) {
            cart = new Cart({
                userId,
                items: [
                    {
                        productId,
                        quantity: 1
                    }
                ]
            });

        } else {
            ////If the cart already exists///
            const item = cart.items.find(
                i => i.productId.toString() === productId
                ////This checks whether the product is already present in the cart.///
            );
        

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({
                    productId,
                    quantity: 1
                });
            }
        }

        await cart.save();

        res.json({
            message: 'item added to cart',
            cart
        });

    } catch (err) {
        res.status(500).json({
            message: "error occurred",
            error: err.message
        });
    }
};

///remove item from cart//

export const removeItem = async(req,res)=>{
    try{
        const {userId , productId} = req.body;
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404). json({message:"CART NOT FOUND"});
        }

        cart.items = cart.items.filter(
                i => i.productId.toString() !== productId
                ////This checks whether the product is already present in the cart.///
            );
             await cart.save();

        res.json({
            message: 'item removed from cart',
            cart
        });

    }catch(err){
        res.status(500).json({message:"err",
             error: err.message});
    }
}

////update an item//
export  const updateQuantity = async(req,res)=>{
    try{
            const {userId, productId, quantity} = req.body;

            //Check whether the user already has a cart//
            const cart = await Cart.findOne({userId});
            if(!cart){
                return res.status(404).json({message:"cart not found"})
            }
            const item = cart.items.find(i=>i.productId.toString() === productId)
            if(!item){
                   return res.status(404).json({message:"item not found in the cart"})
            }
            item.quantity = quantity;
            await cart.save();
            res.json({message: "item update successfully",cart})
    }
 catch(err){
    res.status(500).json({message: "error" , error: err});
 }
}
//get cart by user id//

export const getCart = async(req,res)=>{
    try{
        const {userId} = req.params;
         const cart = await Cart.findOne({ userId }).populate('items.productId');
             if (!cart) {
             return res.json({ items: [] });
        }

        res.json(cart);

    }catch(err){
        res.status(500).json({message: "error" , error: err});
    }
}

