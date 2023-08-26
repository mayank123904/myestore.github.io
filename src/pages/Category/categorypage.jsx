import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Featureproductcard from '../../components/Featureproduct/featureproductcard';
import productpic from './images/product1.png';
import "./categorypage.css";
function CategoryPage() {
    const [products, setProducts] = useState([]);
    const { categoryName } = useParams();
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
    const filteredProducts = products.filter((product) => product.category === `${categoryName}`);
  return (
    <div className='bestsellercontainer'>
      <h2>Products in {categoryName} category:</h2>
      <ul style={{display:"flex",marginTop:"4rem"}}>
        {filteredProducts.map((product) => (
          <li key={product._id} >
         <Featureproductcard styleType="type1" productimage={productpic} productalt={product.productname} productname={product.productname} productdiscountprice={"$"+(product.actualprice-(product.actualprice*product.discountpercent)/100)} productactualprice={"$"+product.actualprice} productdiscountpercent={product.discountpercent+"%"} producttag={product.tag}/> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;