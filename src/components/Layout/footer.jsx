import React from 'react'
import {HiOutlineOfficeBuilding} from "react-icons/hi";
import "./footer.css";
import { Link } from 'react-router-dom';
function Footer(){
  return (
    <div className="footer">
        <div>
        <p>Reach out to us</p>
        <p><HiOutlineOfficeBuilding /></p>
        <p>Chenni Mitti,</p>
        <p>Mathura, Uttar Pradesh, 281003</p>
        <p>9873155397</p>
        </div>
        <div className="tempbar"></div>
        <div className="footerbottom">
            <div>
               <p>Help</p>
               <p>Terms & Conditions</p>
               <p>Store Policies</p> 
            </div>
            <div>
                <p>Powered by SmartBiz</p>
                <p> <Link to="/addproduct" style={{color:"white",textDecoration:"none"}}>Build Your Store Now</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Footer