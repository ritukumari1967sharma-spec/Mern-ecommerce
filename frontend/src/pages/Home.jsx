import {useEffect,useState} from 'react'
import api from "../api/axios";
import {Link} from "react-router-dom";

function Home(){
  const [products,setProducts] = useState([]);
  const [search , setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProduct = async()=>{
      const response = await api.get(`/products?search=${search}&category=${category}`);
      setProducts(response.data);
  }

  useEffect(()=>{
    loadProduct();
  } ,[search,category]
  );
  return (
    <div  className = "p-6">

          {/*search*/}
        <div className='mb-4 flex gap-3'>
            <input placeholder='Search Products...'
            value = {search}
            onChange={(e) => setSearch(e.target.value)}
            className='border px-3 py-2 round w-1/2'
            /> 
        {/*category*/}
        <select value={category} onChange={(e) => setCategory(e.target.value)}  className='border px-3 py-2 rounded'>
          <option value="">All Category</option>
           <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
        </select>

          </div>
          {/*products grid*/}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
            {products.map((product)=>
            (
              <Link
              key= {product._id}
              to = {`/products/${product._id}`}
              className = 'border p-3 border shadow  hover:shadow-lg transition'>
                <img src={product.image} alt = {product.title}/> 
                <h2 className='mt-2 font-semibold text-lg'>{product.title}</h2>
                <p className="text-black-800">${product.price}</p>
              </Link>
            ))}
          </div>
    </div>
  )
}

export default Home;
