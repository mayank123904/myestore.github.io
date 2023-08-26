import React from 'react'
import "./home.css"
// import product1 from './images/product1.png';

import {AiOutlineHeart,AiOutlineSearch } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
// import Featureproductcard from '../../components/Featureproduct/featureproductcard';
// import ProductImage from '../../components/productimage';
import ProductList from '../../components/allproducts';
import Allproducts from '../../components/allproductslist';
import Categories from '../../components/Categories/categories';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <>
    <div className="topcontainer">
      <p>Rs. 100 Delivery Charge. Free Delievery above Rs. 999</p>
    </div>
    <div className="middlecontainer">
      <img src="https://smartpos.amazon.in/images/6358/51536e48-0e36-4ec9-bffa-afb75ebf0a58_1681454877617.jpg" alt="Logo" />
      <h1>Cheeni Mitti</h1>
      <div className="midd1cont">
        <div>
        <span><AiOutlineHeart /></span>
        <p>10 Love this</p>
        </div>
       <div>
        <span><IoLogoWhatsapp /></span>
       <p>Chat on WhatsApp</p>
       </div>
      </div>
      <div className="description">
        <p>We bring to you premium, handcrafted pieces of Home Dècor, Tableware & Kitchenware that will not only elevate your homes but also ancient pottery & its artisans. Change begins here</p>
      </div>
      <div className="searchproductbar">
        <input type="text" placeholder='Search Categories or Products' />
        <span><AiOutlineSearch /></span> 
      </div>
    </div>
    <div className="featureproducts">
      <span>
      <h2>Featured Products</h2>
      <h3><Link to="/best-sellers" style={{textDecoration:"none",color:'red'}}>See All</Link></h3>
      </span>
      <hr style={{width:"88%",marginTop:"-.5rem",marginBottom:"1rem"}}></hr>
      {/* <div className='fpouter'> */}
      <div className="fp">
      {/* <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off"/>
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off"/>
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off"/>
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off"/>
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off"/>
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off"/>
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off"/>
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off"/> */}
       <ProductList />
      </div>
      {/* </div> */}
    </div>
    <div className="allproducts">
      <span>
      <h2>All Products</h2>
      <h3> <Link to="/all-products" style={{textDecoration:"none",color:'red'}}>See All</Link></h3>
      </span>
      <hr style={{width:"88%",marginTop:"-.5rem",marginBottom:"1rem"}}></hr>
      {/* <div className="ap">
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off" />
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off" />
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off" />
      <Featureproductcard productimage={product1} productalt="Bowl" productname="Endless Sunshine Big Pink Salad Bowl" productdiscountprice="$8" productactualprice="$11" productdiscountpercent="33% Off" />
      </div> */}
      <Allproducts />
    </div>
    <div className="allproducts">
      <span>
      <h2>Shop By Category</h2>
      {/* <h3>See All</h3> */}
      </span>
      <hr style={{width:"88%",marginTop:"-.5rem",marginBottom:"1rem"}}></hr>
      {/* <ProductImage /> */}
     
      <Categories />
    </div>
    </>
  )
}

export default Home;