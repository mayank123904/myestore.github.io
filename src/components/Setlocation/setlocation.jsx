import React, { useState } from 'react'
// import { AiOutlineSearch } from 'react-icons/ai';
import "./setlocation.css"
import { AiOutlineSearch } from 'react-icons/ai';
import {CiGps} from 'react-icons/ci';
// const Setlocation = ({ onClose }) => {
//   return (
//     <div className="setlocation">
//     <span style={{display:"flex"}}>
//     <h3>Check if we deliever to your location</h3>
//     <button style={{marginLeft:"auto"}} onClick={onClose}>X</button>
//     </span>
//     <hr />
//     <span style={{display:"flex"}}>
//       <AiOutlineSearch />
//     <input type="text" required  placeholder='Enter Pincode'/>
//     </span>
//     <div>
//       <h2>Current Location</h2>
//       <h3>Using GPS</h3>
//     </div>
//     <div className="savedaddress">
//     <p>Saved Adresses</p>
//     </div>
//   </div>
//   )
// }

// export default Setlocation;

const Popup = ({ onClose }) => {

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
      <span className="popupc1">
        <h3>Check if we deliever to your location</h3>
        <button style={{marginLeft:"auto"}} onClick={onClose}>X</button>    
      </span>
          <hr />
          <h3>Area Name or Pin Code *</h3>
        <span className="searchspan" style={{display:"flex"}}>
       <span><AiOutlineSearch /></span> 
       <input type="text" required  placeholder='Enter Pincode' 
        onClick={handleClick}/>
       {/* <input type="text" required  placeholder='Enter Pincode' 
       className={isClicked ? 'pincode1' : ''}
       onClick={handleClick}/> */}
       </span>
       <div className='gpslocation'>
        <span><CiGps /></span>
        <span><h3>Current Location</h3>
         <p>Using GPS</p>
        </span>
         
       </div>
        <div className="savedaddress">
       <p>Saved Adresses</p>
       </div>
      </div>
    </div>
  );
};

export default Popup;