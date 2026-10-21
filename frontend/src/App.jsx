import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import SignUP from "./pages/SignUP";
import AddProduct from "./Admin/AddProduct";
import EditProduct from "./Admin/editproduct";
import ProductList from "./Admin/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/product/:Id" element={<ProductDetails />} />

        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/add" element={<AddProduct />} />

        <Route path="/admin/products/update/:id" element={<EditProduct />} />
       </Routes>
    </BrowserRouter>
  );
}
export default App;
