import React, { useContext, useState } from 'react'
import "./productdetail.css";
import product from './images/product.png';
import { Context, server } from '../../main';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Productdetail(props){

  const {isAuthenticated,userMobile,setLoading} = useContext(Context);
  const location = useLocation();
  const [selectitem, setSelectitem]=useState(false);
  // const [productquantity, setProductQuantity] = useState(0);

  let [itemquantity,setItemquantity] = useState(0);
 


  const onitemclick = () =>{
  setSelectitem(!selectitem)
  setItemquantity(prevQuantity => prevQuantity + 1);
  } 
  const itemqunatityminus =() =>{
    setItemquantity(prevQuantity => prevQuantity - 1);
    if(itemquantity===0){
      setSelectitem(!selectitem);
    }
  }


  const itemqunatityplus =() =>{
    setItemquantity(prevQuantity => prevQuantity + 1);
  }
  // useEffect(() => {
  //   if (productname){
  //   axios.get(`${server}/products/productquantity/${productname}`).then((response) => {
  //     setProductQuantity(response.data);
  //     console.log(productquantity);
  //   });
  // }
  // },[productname]);

  if (!location.state) {
    return <Navigate to="/" />;
  }
  const { productname, actualprice, discountprice, discountpercent } = location.state;
  const discountPriceAsNumber = parseFloat(discountprice.replace('$', ''));
  const actualpriceAsNumber = parseFloat(actualprice.replace('$', ''));
  const discountpercentAsNumber = parseFloat(discountpercent.replace('%', ''));

  const addtocart =async(e) =>{
    console.log(1);
    e.preventDefault()
    setLoading(true);
    try {
    console.log(2);
    const {data} = await axios.post(`${server}/carts/newproduct`,{
     userMobile,
     productname,
     itemquantity,
     discountprice: discountPriceAsNumber,
     actualprice: actualpriceAsNumber,
     discountpercent: discountpercentAsNumber,
    }
    ,{
        headers:{
         "Content-Type":"application/json",
        },
        withCredentials:true,
      }
   );
    toast.success(data.message);  
    setLoading(false);
    console.log(3);
    // setCartItems((prevCartItems) => [...prevCartItems, product]);
  } catch (error) {
    console.log("Error:", error);
     toast.error(error.response.data.message);
      setLoading(false);
      console.log(4);

   }
};
  // setCartItems((prevCartItems) => [...prevCartItems, product]);
  if (!isAuthenticated) return <Navigate to={"/login"} />
  return (
    <div className="productdetailmaindiv">
        <div className="innerproductdetailmaindiv1">
         <img src={product} alt="productpic" /> <br />
          {
                !selectitem  ? (
                  <button onClick={onitemclick} >Add to Cart</button>
                 ):(
                  <>
                  {
                    !isAuthenticated ? (<Navigate to ={"/login"} />):
                    (
                    <> 
                      <div className="quantity">
                    <p>Select Quantity</p>
                    <button className='itemminus' onClick={itemqunatityminus}><h2>-</h2></button>
                    <span>{itemquantity}</span>
                    <button className='itemplus' onClick={itemqunatityplus}><h2>+</h2></button>
                    </div>
                    <button onClick={addtocart}>Continue</button>
                    
                    </>
                    )
                  }
                  </>
                 )
               }
        </div>
        <div className="innerproductdetailmaindiv2">
         <h1>{productname}</h1>
         {/* <p>{props.quantity} piece</p> */}
         <h1>{discountprice}</h1>
         <del>{actualprice}</del>
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