import { useEffect,useState } from "react";
import api from "../api/axios";
import {useParams} from "react-router-dom";

function ProductDetails(){
  const{id} = useParams();
  const [product,setProduct] = useState(null);
    const loadProduct = async()=>{
        const res = await api.get("/products");
        const match = res.data.find((item)=>item._id === id);
        setProduct(match)
    }
    useEffect(()=>{
        loadProduct();
    },[])
        const addToCart = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please log in to add items to your cart.");
            return;
        }
        try {
            const res = await api.post("/cart/add", { userId, productId: product._id });
            const count = res.data.cart.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            localStorage.setItem("cartCount", count);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
            alert(err.response?.data?.message || "Could not add to cart");
        }
    };
if(!product){
  return<div>Loading.....</div>
}
  return (
    <div className="p-6 max-w-3xl mx-auto">
        <img src={product.image} alt={product.title} className="  mb-4 rounded" />
        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-grey-700 mt-2">{product.description}</p>
        <p className="text-xl font-semifold mt-4">${product.price}</p>
        <button onClick={addToCart} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add to Cart
          </button>
    </div>
  )
}

export default ProductDetails;
