import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./allproducts.css"
import productpic from './images/product1.png';
import Featureproductcard from '../../components/Featureproduct/featureproductcard';
import { AiOutlineSearch } from 'react-icons/ai';
const Allproductspage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the products from the server
    axios
      .get('http://localhost:4000/api/v1/products/allproducts')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

//   const filteredProducts = products.filter((product) => product.tag === 1);

  return (
    <div className='allproductscontainer'>
      <h1>All Products</h1>
      <p>Browse products by Cheeni Mitti</p>
      <div className="searchproductbar">
        <input type="text" placeholder='Search Categories or Products' />
        <span><AiOutlineSearch /></span> 
      </div>
      <ul style={{display:"flex",marginTop:"4rem"}}>
        {products.map((product) => (
          <li key={product._id} >
                 <Featureproductcard styleType="type1" productimage={productpic} productalt={product.productname} productname={product.productname} productdiscountprice={"$"+(product.actualprice-(product.actualprice*product.discountpercent)/100)} productactualprice={"$"+product.actualprice} productdiscountpercent={product.discountpercent+"%"} producttag={product.tag}/> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allproductspage;