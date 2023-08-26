import './App.css';
import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Nav from './components/Layout/Navbar/navbar';
import Footer from './components/Layout/footer';
import { Context,server } from './main.jsx';
import Productdetail from './components/Productdetail/productdetail';
import Addproduct from './components/Addproduct/addproduct';
import Setlocation from './components/Setlocation/setlocation';
import Cart from './components/Cart/cart';
// import ProductList from './components/allproducts';
// import Allproducts from './components/allproductslist';
import Featureproductpage from './pages/Featuredproducts/featureproductspage';
import Allproductspage from './pages/Allproducts/allproducts';
import CategoryPage from './pages/Category/categorypage';
import Address from './pages/Address/address';
function App() {
  const {setUser,setIsAuthenticated,setLoading} = useContext(Context);

  useEffect(() => {
    console.log("Before axios call - setLoading(true)");
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Axios success - setLoading(false)");
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Axios error - setLoading(false)");
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  },[setUser,setIsAuthenticated,setLoading]);
    
  return (<Router>
    <Nav />
     <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/login" element={<Login/>} />
    <Route exact path="/register" element={<Register />} />
    <Route exact path="/productdetail" element={<Productdetail />} />
    <Route exact path="/addproduct" element={<Addproduct/>}/>
    <Route exact path="/addlocation" element={<Setlocation/>}/>
    <Route exact path="/cart" element={<Cart/>}/>
    <Route exact path="/best-sellers" element={<Featureproductpage/>} />
    <Route exact path="/all-products" element={<Allproductspage/>} />
    <Route exact path="/category/:categoryName"  element={<CategoryPage/>}  />
    <Route exact path="/address"  element={<Address/>}  />
    </Routes>
    <Footer />
    <Toaster />
  </Router>
  );
}

export default App;