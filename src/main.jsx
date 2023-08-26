import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createContext } from 'react';

export const server="http://localhost:4000/api/v1";

export const Context=createContext({isAuthenticated:false, setLoading: () => {}, setUser: () => {},setIsAuthenticated: () => {},userMobile:0,setUserMobile:()=>{},cartItems:[], setCartItems:()=>{},});

const AppWrapper = () =>{

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading]=useState(false);
const [user,setUser]=useState({});
const [userMobile, setUserMobile] = useState(localStorage.getItem('userMobile') || '');
const [cartItems, setCartItems] =  useState([]);
useEffect(() => {
  const storedCartItems = localStorage.getItem('cartItems');
  if (storedCartItems) {
    setCartItems(JSON.parse(storedCartItems)); // Corrected this line
  }
}, []);

useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

// const addCartItem = (newCartItem) => {
//   setCartItems((prevCartItems) => [...prevCartItems, newCartItem]); // Corrected this line
//   localStorage.setItem('cartItems', JSON.stringify([...cartItems, newCartItem])); // Corrected this line
// };


// const updateCartItems = (newCartItems) => {
//   setCartItems(newCartItems);
// };

useEffect(() => {
  localStorage.setItem('userMobile', userMobile);
}, [userMobile]);

return (
    <Context.Provider
    value={{
      isAuthenticated,
      setIsAuthenticated,
      loading,
      setLoading,
      user,
      setUser,
      userMobile,
      setUserMobile,
      cartItems,
      setCartItems,
      // addCartItem,
      // updateCartItems,
    }}
    >
    <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AppWrapper />
  </React.StrictMode>,
)
