import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Featureproductcard from './Featureproduct/featureproductcard';
import productpic from './images/product1.png';
const ProductList = () => {
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
    <div>
      <ul style={{display:"flex",marginTop:"4rem"}}>
        {filteredProducts.map((product) => (
          <li key={product._id} >
         <Featureproductcard productimage={productpic} productalt={product.productname} productname={product.productname} productdiscountprice={"$"+(product.actualprice-(product.actualprice*product.discountpercent)/100)} productactualprice={"$"+product.actualprice} productdiscountpercent={product.discountpercent+"%"}/> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

//  {/* <img src={product.imageFile} alt='Product pic' /> */}
//             {/* <h3>{product.productname}</h3>
//             <p>Category: {product.category}</p>
//             <p>Description: {product.description}</p>
//             <p>Quntity: {product.quantity}</p>
//             <p>Price: ${product.actualprice}</p>
//             <p>Discount: {product.discountpercent}</p> */}
//             {/* Add other product details as needed */}