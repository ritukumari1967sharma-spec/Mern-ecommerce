import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";


function ProductList() {
    const [product, setProduct] = useState([

    ])

    const loadProduct = async(e)=>{
        const response = await api.get("/products");
        setProduct(response.data);
    }

    const deletedProduct = async(id)=>{
        try{
        await api.delete(`/products/delete/${id}`);
        alert("Product deleted successfully");
        loadProduct();
        }catch(error){
            console.error("Error in deleting product",error);
        }
    }

    useEffect(() => {
        loadProduct();
    }, [])
    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        <Link to="/admin/products/add" className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-5 py-3 rounded-lg transition duration-200">
                            Add new product
                        </Link>
                    </h1>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                <th className="px-6 py-4 font-semibold rounded-tl-lg">Title</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                                <th className="px-6 py-4 font-semibold rounded-tr-lg">Action</th>

                            </tr>
                        </thead>


                        <tbody className="divide-y divide-gray-200">
                            {product.map((product)=>(
                                <tr key ={product._id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 text-gray-800 font-medium">{product.title}</td>
                                    <td className="px-6 py-4 text-gray-600">${product.price}</td>
                                    <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Link to = {`/admin/products/update/${product._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                                Edit
                                            </Link>
                                            <button onClick={ ()=>deletedProduct(product._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 

export default ProductList;