import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrum.css'

const Breadcrum = (props) => {
  // console.log("SECTION > ", props);
  return (
    <div className='bread-cont'>
    <span style={{cursor:"pointer"}}>
      <Link to={`/${props.page.value?props.page.value:props.page}`} style={{textDecoration:"none", color:"black"}}>{`${props.page.value?props.page.value:props.page}`}</Link></span>&nbsp;/&nbsp;
     <span style={{cursor:"pointer"}}>
     {`${props.page.brand?props.page.brand:''}`}</span>&nbsp;{`${props.page.brand?"/":''}`}&nbsp;
     <span style={{cursor:"pointer"}}>
     {`${props.page.category?props.page.category:''}`}</span>&nbsp;{`${props.page.category?"/":''}`}&nbsp;
  </div>
  )
}

export default Breadcrum
