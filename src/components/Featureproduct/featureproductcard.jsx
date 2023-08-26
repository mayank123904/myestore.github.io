import React, { useState } from 'react'
import "./featureproductcard.css"
import Bestseller from './producttag';
// import { Link } from 'react-router-dom';
import Discounttag from './discounttag';
import Productdetail from '../Productdetail/productdetail';
import {useNavigate} from 'react-router-dom';

function Featureproductcard(props){
  const cardStyleType1 = {
    width: "11rem",
    height: "11rem",
    border: "1px solid red",
    borderRadius:"20px",
    cursor: "pointer",
  };
  const cardStyleType2 = {
    width: "20rem",
    height: "22rem",
    border: "1px solid red",
    borderRadius:"20px",
    cursor: "pointer",
  };
  const des1 = {
    width: "12rem",
    height:"3rem",
    fontSize:"1.24rem",
  }
  const des2 = {
    width : "20rem",
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleProfileClick = (product) => {
    setSelectedProduct(product);
    navigate('/productdetail', {
      state: {
        productname: product.productname,
        actualprice: product.productactualprice,
        discountprice: product.productdiscountprice,
        discountpercent: product.productdiscountpercent,
      },
    });
  };

  if (selectedProduct){
    return (
         <div>
         {/* <button onClick={handleGoBackClick}>Go Back</button> */}
        <Productdetail productname={selectedProduct.productname} actualprice={selectedProduct.productactualprice}  discountprice={selectedProduct.productdiscountprice}/>
      </div>
    );
  }
return(
<div className="productcontainer">
{
    props.producttag===1 ? (
        <div className="bestseller-overlay">
        <Bestseller />
        </div>
    ) : (
        <>
      {
        props.producttag===2 ?(
        <div className="bestseller-overlay">
         <Discounttag discountpercent={props.productdiscountpercent}/>
        </div>
       
        ):(
            <span></span>
        )
      }
      </>
    )
}

<img src={props.productimage} alt={props.productalt} style={props.styleType === "type1" ? cardStyleType1 : cardStyleType2}/>
<div>
<p style={props.styleType === "type1" ? des1 : des2}>{props.productname}</p>

<div className="productpricecont">
<p>{props.productdiscountprice}</p>
<del>{props.productactualprice}</del>
<p>{props.productdiscountpercent}</p>
</div>
</div>

<button onClick={() => handleProfileClick(props)}>View product</button>
{/* <Link to="/productdetail" style={{textDecoration:"none",color:"white"}}>View product</Link> */}
</div>
)
}

export default Featureproductcard;