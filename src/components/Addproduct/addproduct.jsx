import React, { useState,useContext } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { Context,server } from '../../main';


const Addproduct = () => {
    const [productname,setProductname]=useState("");
    const [actualprice,setActualprice]=useState("");
    const [discountpercent,setDiscountprice]=useState("");
    const [category,setCategory]=useState("");
    const [quantity,setQuantity]=useState("");
    const [description,setDescription]=useState("");
    const [imageFile, setImageFile] = useState(null);
    const [tag,setTag]=useState("");
    const {isAuthenticated,setIsAuthenticated,setLoading} = useContext(Context);
    const submitHandler=async(e) =>{
        e.preventDefault();
        setLoading(true);
       try {
        console.log(productname);
        console.log(imageFile)
        const {data} = await axios.post(`${server}/products/newproduct`,{
            productname,
            actualprice,
            discountpercent,
            category,
            quantity,
            description,
            imageFile,
            tag,
          }
          ,{
              headers:{
               "Content-Type":"application/json",
              },
              withCredentials:true,
            }
         );
         toast.success(data.message);
         setIsAuthenticated(true);
         setLoading(false);
       } catch (error) {
        toast.error(error.response.data.message);
          setIsAuthenticated(false);
          setLoading(false);
       }
    };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };


    return (
    <div className="login">
        <section>
            <form onSubmit={submitHandler}>
               <input type="file" onChange={handleImageChange} required accept="image/*" /> <br />
                <input type="text" value={productname} onChange={(e)=>setProductname(e.target.value)} required placeholder='Enter Produt Name' /> <br />
                <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} required placeholder='Enter Product Category' /> <br />
                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required placeholder='Enter Product Description' /> <br />
                <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} required placeholder='Enter Produt Quantity' /> <br />
                <input type="number" value={actualprice} onChange={(e)=>setActualprice(e.target.value)} required placeholder='Enter Produt Actual Price' /> <br />
                <input type="number" value={discountpercent} onChange={(e)=>setDiscountprice(e.target.value)} required placeholder='Enter Produt Discount Percent' /> <br />
                <input type="number" value={tag} onChange={(e)=>setTag(e.target.value)} required placeholder='Select (1)bestseller,(2)featured,(3)No' /> <br />
                <button type="submit">Add</button>
            </form>
        </section>
    </div>
  )
}

export default Addproduct