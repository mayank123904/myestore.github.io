import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./featureproductspage.css";
// import ProductList from '../../components/allproducts';
import productpic from './images/product1.png';
import Featureproductcard from '../../components/Featureproduct/featureproductcard';
const Featureproductpage = () => {
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

  const filteredProducts = products.filter((product) => product.tag === 1);

  return (
    <div className='bestsellercontainer'>
      <h1>Featured Products</h1>
      <p>Best products by Cheeni Mitti</p>
      <ul style={{display:"flex",marginTop:"4rem"}}>
        {filteredProducts.map((product) => (
          <li key={product._id} >
         <Featureproductcard  styleType="type1" productimage={productpic} productalt={product.productname} productname={product.productname} productdiscountprice={"$"+(product.actualprice-(product.actualprice*product.discountpercent)/100)} productactualprice={"$"+product.actualprice} productdiscountpercent={product.discountpercent+"%"} producttag={product.tag}/> 
          </li>
        ))}
      </ul>
      {/* <div className="featuredproducts">
        <ProductList />
      </div> */}
    </div>
  );
};

export default Featureproductpage;