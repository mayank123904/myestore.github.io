import React, { useState,useContext, useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { Context,server } from '../../main';
import { IoTrashOutline } from 'react-icons/io5';
import {FaPlus } from 'react-icons/fa6';
import "./address.css"
function Address(){
    const [customerName,setCustomerName]=useState("");
    const [contactNo,setContactNo]=useState();
    const [pincode,setPincode]=useState();
    const [house,setHouse]=useState("");
    const [area,setArea]=useState("");
    const [landmark,setLandmark]=useState("");
    const [townCity, setTownCity]=useState("");
    const [state, setState]=useState("");
    const [addressType, setAddressType]=useState("");
    const {isAuthenticated,setLoading,userMobile} = useContext(Context);
    const [localAddresses, setLocalAddresses] = useState([]);
    const submitHandler=async(e) =>{
        e.preventDefault();
        setLoading(true);

        const newaddress = pincode + "," + house + "," + area + "," + landmark + "," + townCity + "," + state + "," + addressType;
        const isAddressDuplicate = localAddresses.some(item => item.address === newaddress);

         
     if(!isAddressDuplicate){

       try {
        const {data} = await axios.post(`${server}/addresses/newaddress`,{
           userMobile,
           customerName,
           contactNo,
           address:newaddress,
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
       } catch (error) {
        toast.error(error.response.data.message);
          setLoading(false);
       }
    };
};
    useEffect(() => {
        axios.get(`${server}/addresses/getaddress/` + userMobile).then((response) => {
          setLocalAddresses(response.data);
        });
      }, [userMobile]);
    const handleRemoveAddress = async (itemId) => {
        try {
          await axios.delete(`${server}/addresses/removeaddress/${itemId}`);
          const updatedAddresses = localAddresses.filter(
            (item) => item._id !== itemId
          );
          setLocalAddresses(updatedAddresses);
        } catch (error) {
          console.error("Error removing address:", error);
        }
      };
    if (!isAuthenticated) return <Navigate to={"/login"} />
  return (
   <div className="addresscont">
    <span><h1>Add Address</h1></span>
    <form className="addressform">
        <p>Customer Name *</p>
        <input type="text" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} required placeholder='Name' /> <br />
        <p>Mobile Number *</p>
        <input type="number" value={contactNo} onChange={(e)=>setContactNo(e.target.value)} required placeholder='Mobile Number' /> <br />
        <p>Pincode *</p>
        <input type="number" value={pincode} onChange={(e)=>setPincode(e.target.value)} required placeholder='E.g. 410055' /> <br />
        <p>Flat, House no, Building, Company, Apartment *</p>
        <input type="text" value={house} onChange={(e)=>setHouse(e.target.value)} required placeholder='House / Flat / Flat No.' /> <br />
        <p>Area, Street, Sector, Village *</p>
        <input type="text" value={area} onChange={(e)=>setArea(e.target.value)} required placeholder='Apartment / Road / Area' /> <br />
        <p>Landmark</p>
        <input type="text" value={landmark} onChange={(e)=>setLandmark(e.target.value)} placeholder='Near WTP' /> <br />
        <p>Town/City *</p>
        <input type="text" value={townCity} onChange={(e)=>setTownCity(e.target.value)} required /> <br />
        <p>State *</p>
        <input type="text" value={state} onChange={(e)=>setState(e.target.value)} required /> <br />
        <p>Address Type</p>
        <input type="text" value={addressType} onChange={(e)=>setAddressType(e.target.value)} placeholder='Other' /> <br />
        <button onClick={submitHandler}>Add Address</button>
    </form>
    <h3>Saved addresses</h3>
    <div className="savedaddress">
    
    {localAddresses.map((item) => (
            <div className="savedaddresscont" key={item.address} style={{marginTop:".5rem"}}>
                <div className="savedaddressinnercont">
                <span><p>{item.address}</p></span>
                <button className='removeaddress' onClick={() => handleRemoveAddress(item._id)}>
                  <span>
                    <IoTrashOutline />
                  </span>
                  {/* Remove */}
                </button>
                <button className='selectaddress' onClick={() => handleRemoveAddress(item._id)}>
                  <span>
                    <FaPlus />
                  </span>
                  {/* Select */}
                </button>
                </div>
            </div>
          ))}
    </div>
   </div>
  )
}

export default Address;