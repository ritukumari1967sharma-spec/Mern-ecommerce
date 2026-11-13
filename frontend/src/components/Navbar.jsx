import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
      return setCartCount(0);
         
      }
      try {
        const res = await api.get(`/cart/${userId}`);
        const total = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-4 shadow">
      <Link to="/" className="font-bold text-xl">Cartopia</Link>

      <div className="flex gap-4 items-center">
        <Link to="/cart" className="relative text-lg">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
        </Link>

        {!userId ? (
          <>
            <Link to="/login" className="text-lg">Login</Link>
            <Link to="/signup" className="text-lg">SignUp</Link>
          </>
        ) : (
          <button onClick={logout} className="text-lg">Logout</button>
        )}
      </div>
    </nav>
  );
}