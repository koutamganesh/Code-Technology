// frontend/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`/api/products?search=${search}`).then(res => setProducts(res.data));
  }, [search]);

  return (
    <div>
      <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
      <div>
        {products.map(product => (
          <div key={product._id}>
            <img src={product.image} alt={product.name}/>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <span>${product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
