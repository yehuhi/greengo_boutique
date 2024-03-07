import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrum.css'

const Breadcrum = (props) => {
  // console.log("SECTION > ", props);
  return (
    <div className='bread-cont'>
    <span style={{cursor:"pointer"}}>
    <Link to={`/${props.page.value ? props.page.value : props.page}`} style={{ textDecoration: "none", color: "black" }}>{`${(props.page.value ? props.page.value : props.page).toUpperCase()}`}</Link></span>&nbsp;/&nbsp;
     <span style={{cursor:"pointer"}}>
     {`${(props.page.brand?props.page.brand:'').toUpperCase()}`}</span>&nbsp;{`${props.page.brand?"/":''}`}&nbsp;
     <span style={{cursor:"pointer"}}>
     {`${(props.page.category?props.page.category:'').toUpperCase()}`}</span>
  </div>
  )
}

export default Breadcrum
