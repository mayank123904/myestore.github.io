import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import "./cart.css";
import { Context, server } from "../../main";
import { IoTrashOutline } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa6";
function Cart() {
  const { userMobile,isAuthenticated} = useContext(Context);
  const [localCartItems, setLocalCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    axios.get(`${server}/carts/getproduct/` + userMobile).then((response) => {
      setLocalCartItems(response.data);
    });
  }, [userMobile]);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`${server}/carts/remove/${itemId}`);
      const updatedCartItems = localCartItems.filter(
        (item) => item._id !== itemId
      );
      setLocalCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
 

  const handleIncreaseQuantity = async (item) => {
    try {
      const response = await axios.put(`${server}/carts/increase/${item._id}`);
      const updatedItems = localCartItems.map((cartItem) =>
        cartItem._id === item._id ? response.data : cartItem
      );
      setLocalCartItems(updatedItems);
      setTotalQuantity(prevQuantity => prevQuantity + 1);
      setTotalAmount(prevAmount => prevAmount + item.discountprice);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (item) => {
    try {
      const response = await axios.put(`${server}/carts/decrease/${item._id}`);
      if (response.data.message === "Cart item removed") {
        // If the quantity becomes 0, remove the item from the localCartItems
        const updatedItems = localCartItems.filter(
          (cartItem) => cartItem._id !== item._id
        );
        setLocalCartItems(updatedItems);
      } else {
        // If quantity is greater than 0, update localCartItems
        const updatedItems = localCartItems.map((cartItem) =>
          cartItem._id === item._id ? response.data : cartItem
        );
        setLocalCartItems(updatedItems);
        setTotalQuantity(prevQuantity => prevQuantity - 1);
        setTotalAmount(prevAmount => prevAmount - item.discountprice);
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };
  
  

  useEffect(() => {
    axios.get(`${server}/carts/getproduct/` + userMobile).then((response) => {
      setLocalCartItems(response.data);
  
      // Calculate total quantity and total amount
      let quantity = 0;
      let amount = 0;
      response.data.forEach((item) => {
        quantity += item.quantity;
        amount += item.quantity*item.discountprice;
      });
      setTotalQuantity(quantity);
      setTotalAmount(amount);
    });
  }, [userMobile]);
  const removeAllItems = async () => {
    try {
      await axios.delete(`${server}/carts/removeall`);
    } catch (error) {
      console.error("Error removing all items:", error);
    }
  };
  
  const emptycart = () => {
    removeAllItems();
    setLocalCartItems([]);
  };
  console.log("localCartItems:", localCartItems);
  const iscartempty = localCartItems.length === 0;
  if (!isAuthenticated) return <Navigate to={"/login"} />
  return (
    <div className="cartmaincontainer">
      {!iscartempty  ? (
        <div className="cartcontainer">
         <span >
         <h1>Your cart</h1>
         <button onClick={emptycart}>Remove all items</button>
         </span>
          
          <p>Verify the items and the shipping address</p>
          <h3 style={{display:"flex"}}>Order Items: <p style={{marginTop:"0rem",marginLeft:"18rem"}}>{totalQuantity}</p></h3>
          <hr style={{width:"26rem",marginLeft:"0rem",marginTop:"-2rem"}}></hr>
          
          {localCartItems.map((item) => (
            <div key={item.name} className="cartitem">
              <div className="cartitemcont">
                <button onClick={() => handleRemoveItem(item._id)}>
                  <span>
                    <IoTrashOutline />
                  </span>
                  {/* Remove */}
                </button>
              </div>
              <div className="cartitemdetailcont">
                <h2 className="itemname">{item.productname}</h2>
                <p>1 set</p>
                <span className="cartitempricecont">
                  <span className="discountprice">${item.discountprice}</span>
                  <del>${item.actualprice}</del>
                  <span className="discountpercent">{item.discountpercent}% off</span>
                </span>
                <div className="productquantitycont">
                  <button className="decreaseitem" onClick={() => handleDecreaseQuantity(item)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span> <br />
                  <button className="increaseitem" onClick={() => handleIncreaseQuantity(item)}>
                  <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="billdetails">
            <h3>Bill Details</h3>
            <hr style={{width:"15rem",marginLeft:"0rem",marginTop:"-1rem"}}></hr>
            <span>
              <p style={{border:"1px solid black",width:"fit-content",padding:".3rem"}}>Item Total<span style={{marginLeft:"5rem"}}>${totalAmount}</span></p>
            </span>
            <span >
              <h4 style={{border:"1px solid black",width:"fit-content",padding:".3rem"}}>Order Total: <span style={{marginLeft:"3.5rem"}}>${totalAmount}</span>
              </h4>
            </span>
            <button><Link to="/address" style={{textDecoration:"none",color:"white"}}>Proceed to Buy</Link></button>
          </div>
        </div>
      ) : (
        <div className="emptycartcontainer">
          <span>
            <AiOutlineShoppingCart />
          </span>
          <h1>Why so light! :( Your cart is empty</h1>
          <Link to="/">
            <button className="discoverproductbutton">
              {" "}
              Discover Products{" "}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
