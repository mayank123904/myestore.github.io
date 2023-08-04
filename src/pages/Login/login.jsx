import axios from 'axios';
import React, {useState,useContext } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate, Navigate} from 'react-router-dom'
import "./login.css";
import { Context, server } from '../../main';
const Login = () => {
    const {isAuthenticated, setIsAuthenticated,loading,setLoading, setUserMobile} = useContext(Context);
    const [mobile,setContact]=useState("");
    const navigate = useNavigate();
    const submitHandler=async(e) =>{
        e.preventDefault();
        setLoading(true);
       try {
        const {data} = await axios.post(`${server}/users/login`,{
            mobile,
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
         setUserMobile(mobile);
         setLoading(false);
         // Redirect to home page after successful login
         navigate("/");;
       } catch (error) {
        toast.error(error.response.data.message);
          setIsAuthenticated(false);
          setLoading(false);
       }
    };
    if (isAuthenticated) return <Navigate to={"/"} />
  return (
    <div className="login">
        <section>
            <form onSubmit={submitHandler} >
                <label>Enter Your Phone Number</label>
                <br />
                <input type="text" value={mobile} onChange={(e)=>setContact(e.target.value)} required placeholder='Enter Phone Number' />
                <br />
                <button  disabled={loading}  type="submit">Login</button>
                <h4>Or</h4>
                <Link to="/register">Sign up</Link>
            </form>
        </section>
    </div>
  );
};

export default Login;