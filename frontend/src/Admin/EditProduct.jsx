import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const allowedFields =["title",
    "description",
    "price",
    "category",
    "image",
    "stock",]

    const loadProduct = async()=>{
        const res = await api.get(`/products`);
        const product = res.data.find((p)=>p._id === parseInt(id));
        setForm(product);
    }
    useEffect(()=>{
        loadProduct();
    },[]);

    const handleChange = (e)=>{
        setForm({ 
            ...form,[e.target.name]:e.target.value
        })
    }
    const handleSubmit = async()=>{
        e.preventDefault();
        try{
            await api.put(`/products/update${id}`,form)
               alert("Product updated successfully");
               navigate("/admin/products");
        }
        catch(error){
            console.log("error in updating",error);
        }
    }
    return(
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
             <h2 className="mb-6 text-3xl font-bold text-gray-800">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
            {allowedFields.map((key)=>(
                allowedFields.includes(key)&&
                
                <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          ))}
          <button type="submit" className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Update Product
          </button>
        </form>
        </div>
        </div>
    );
}
export default EditProduct;
