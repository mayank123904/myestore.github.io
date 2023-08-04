import React, { useState,useContext } from 'react';
import { Link,Navigate} from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { Context,server } from '../../main';


const Register = () => {

    const [name,setName]=useState("");
    const [mobile,setContact]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {isAuthenticated,setIsAuthenticated,setLoading} = useContext(Context);
    const submitHandler=async(e) =>{
        e.preventDefault();
        setLoading(true);
       try {
        console.log(name,mobile, email, password);
        const {data} = await axios.post(`${server}/users/new`,{
            name,
            mobile,
            email,
            password,
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

    if(isAuthenticated) return <Navigate to={"/"} /> 
    return (
    <div className="login">
        <section>
            <form onSubmit={submitHandler}>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required placeholder='Name' /> <br />
                <input type="number" value={mobile} onChange={(e)=>setContact(e.target.value)} required placeholder='Mobile No.' /> <br />
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder='Email' /> <br />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder='Password' /> <br />
                <button type="submit">Sign up</button>
                <h4>Or</h4>
                <Link to="/login">Log in</Link>
            </form>
        </section>
    </div>
  )
}

export default Register