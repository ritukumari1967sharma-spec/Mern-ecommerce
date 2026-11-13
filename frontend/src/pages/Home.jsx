import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProduct = async () => {
    const response = await api.get("/products", {
      params: { search, category },
    });
    setProducts(response.data);
  };

  useEffect(() => {
    loadProduct();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const res = await api.post(`/cart/add`, { userId, productId });

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

  return (
    <div className="p-6">
      {/* search */}
      <div className="mb-4 flex gap-3">
        <input
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />

        {/* category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Category</option>
          <option value="Fashion">Fashion</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>

      {/* products grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <div key={product._id} className="border p-3 rounded shadow">
            <Link
              to={`/products/${product._id}`}
              className="block hover:shadow-lg transition"
            >
              <img src={product.image} alt={product.title} />
              <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-800">${product.price}</p>
            </Link>
            <button
              onClick={() => addToCart(product._id)}
              className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
