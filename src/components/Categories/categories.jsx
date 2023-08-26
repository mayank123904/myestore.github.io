import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./categories.css";
import { Link } from 'react-router-dom';
function Categories(){
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // Fetch the products from the server
        axios
          .get('http://localhost:4000/api/v1/products/allproducts')
          .then((response) => {
            const uniqueCategories = [...new Set(response.data.map(item => item.category))];
            setCategories(uniqueCategories);
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
          });
      }, []);

  return (
    <div className='categorycontainer'>
        {categories.map(cat => (
          <div key={cat}>
          <Link to={`/category/${cat}`} style={{textDecoration:"none",color:"white"}}><h3>{cat}</h3></Link>  
          </div>
        ))}
    </div>
  )
}

export default Categories;