import React, { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import "./cart.css";
function Cart(){

    const [iscartempty, setIscartempty] = useState(false)


return (
<>
{
!iscartempty ? (

<div className="emptycartcontainer">
    <span><AiOutlineShoppingCart /></span>
    <h1>Why so light! :( Your cart is empty</h1>
    <button><Link to="/"> <span className='discoverproductbutton'>Discover Products</span></Link> </button>
</div>

):(
 <p></p>
)
}
</>
)
}

export default Cart;