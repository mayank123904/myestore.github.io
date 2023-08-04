// import React, { useState,useEffect} from 'react';
// import './sidebar.css';

// function Sidebar() {
//   const [isCollapsed, setIsCollapsed] = useState(true);
 
//   useEffect(() => {
//     const storedCollapsedState = localStorage.getItem('sidebarCollapsed');
//     setIsCollapsed(storedCollapsedState === 'true');
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
//   }, [isCollapsed]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1280) {
//         setIsCollapsed(true);
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);


//   function handleSidebarToggle() {
//     setIsCollapsed(!isCollapsed);
//   }

//   return (
//     <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
//       {!isCollapsed ? (
//         <button className="close-button" onClick={handleSidebarToggle}>
//           X
//         </button>
//       ) : (
//         <button className="toggle-button" onClick={handleSidebarToggle}>
//           <div></div>
//           <div></div>
//           <div></div>
//         </button>
//       )}
//     </div>
//   );
// }

// export default Sidebar;


import React, { useContext, useState } from 'react';
import './sidebar.css';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai';

function Sidepanel(props){
  const [isOpen, setIsOpen] = useState(false);
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // const [isopenlocation,setIsopenlocation] = useState("false");
  // const locationPanel = () => {
  //   setIsopenlocation(!isopenlocation);
  // }
  const {isAuthenticated} = useContext(Context);
  return (
    <>
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>

{!isOpen ? 
      (
      <button className="toggle-button" onClick={togglePanel}>
        <div>
        <div></div>
        <div></div>
        <div></div>
        </div>
        
      </button>
      // <div className="panel-content">This is the panel content.</div>
      ):(
          <div className='close-button'>
          <div className='sidepanelheader'>
          <img src={props.image} alt='mypic' />
          <h3>{props.title}</h3>
          <button onClick={togglePanel}>
          X
        </button>
          </div> 
          <div className='sidecatalog'>
            <div>
              <div></div>
              <Link to="/addlocation"><h3>Set Location</h3></Link>
            </div>
            {
           isAuthenticated ? (<div>
            <div></div>
             <h3>My Orders</h3>
            </div>):
             (
               <p></p>
               )
             }
            <div>
              <div></div>
              <h3>Feature Products</h3>
            </div>
            <div>
              <div></div>
              <h3>All Products</h3>
            </div>
            <div>
              <div></div>
              <h3>Categories</h3>
            </div>
           
          </div>
        </div>
        )
      
      }
      </div>
      
      </>
  );
};

export default Sidepanel;