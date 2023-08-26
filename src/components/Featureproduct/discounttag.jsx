import React from 'react'
import "./discounttag.css"
function Discounttag(props){
  return (
   <div className="discounttagcont">
    <p className='sparkle'>{props.discountpercent}</p>
   </div>
  )
}

export default Discounttag;