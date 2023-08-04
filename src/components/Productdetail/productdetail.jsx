import React, { useContext, useState } from 'react'
import "./productdetail.css";
import product from './images/product.png';
import { Context } from '../../main';
import { Navigate } from 'react-router-dom';

function Productdetail(props){

  const {isAuthenticated} = useContext(Context);
  const [selectitem, setSelectitem]=useState(false);
  let [itemquantity,setItemquantity] = useState(0);

  const onitemclick = () =>{
  setSelectitem(!selectitem)
  setItemquantity(itemquantity=itemquantity+1);
  }
 
  const itemqunatityminus =() =>{
    setItemquantity(itemquantity=itemquantity-1);
    if(itemquantity===0){
      setSelectitem(!selectitem);
    }
  }

  const itemqunatityplus =() =>{
    setItemquantity(itemquantity=itemquantity+1);
  }
  // if (!isAuthenticated) return <Navigate to={"/login"} />
  return (
    <div className="productdetailmaindiv">
        <div className="innerproductdetailmaindiv1">
         <img src={product} alt="productpic" /> <br />
          {
           !selectitem ? (
            <button onClick={onitemclick} >Add to Cart</button>
           ):(
            <>
            {
              !isAuthenticated ? (<Navigate to ={"/login"} />):
              (
              <div className="quantity">
              <p>Select Quantity</p>
              <button className='itemminus' onClick={itemqunatityminus}><h2>-</h2></button>
              <span>{itemquantity}</span>
              <button className='itemplus' onClick={itemqunatityplus}><h2>+</h2></button>
              </div>
              )
            }
            
            </>
           )

          }
        
        </div>
        <div className="innerproductdetailmaindiv2">
         <h1>Product Name{props.productname}</h1>
         <p>{props.quantity} piece</p>
         <h1>{props.discountprice}</h1>
         <del>{props.actualprice}</del>
         <p>Select Size:</p>
         <p>Select Color:Black</p>
         <p>Usually shipped in 7-12 Days</p>
         <h1>No exchange/returns</h1>
          <p>Product opening video required for any claim on borken/defected/wrong product</p>
        </div>
    </div>
  )
}

export default Productdetail