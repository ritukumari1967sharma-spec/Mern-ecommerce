 
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
     category: "",
    image: "",
    stock: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/products/add", form);
        alert("Product added successfully");
        navigate("/admin/products");
    } 
catch (error) {
  console.log("Full error:", error);
  console.log("Backend response:", error.response?.data);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Failed to add product"
  );
}

};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {Object.keys(form).map((key) => (
              <input
                key={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={key}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Add Product
            </button>
          </form>
        </h1>
      </div>
    </div>
  );
}

export default AddProduct;
