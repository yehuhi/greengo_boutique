import React, { useEffect, useState } from 'react';
import "./Filter.css"
import data from "../Assets/filters"
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { HiMinusSm } from "react-icons/hi";

import { ShopState } from '../../Context/ShopProvider';


console.log("DATA FROM CATEGORIES >> ", data);
const Filter = () => {
    const {filtered, setFiltered } = ShopState();
    const [openMenuCat, setOpenMenuCat] = useState(false);
    const [openMenuBran, setOpenMenuBran] = useState(false);
    const [openMenuPric, setOpenMenuPric] = useState(false);
    const [openMenuColo, setOpenMenuColo] = useState(false);
    const [openMenuSiz, setOpenMenuSiz] = useState(false);
    // const [filtered, setFiltered] = useState({ categories: [], brands: [], sizes: [], prices: [] });

    const handleCheckboxChange = (checkboxType, data) => {
        // const { value, checked } = e.target;

        if (data.checked) {
            if(checkboxType === "category"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    categories: [...prevFiltered.categories, data.value]
                }));
            }
            if(checkboxType === "brand"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    brands: [...prevFiltered.brands, data.value]
                }));
            }
            if(checkboxType === "price"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    prices: [...prevFiltered.prices, data.value]
                }));
            }
            if(checkboxType === "color"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    colors: [...prevFiltered.colors, data.value]
                }));
            }
            if(checkboxType === "size"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    sizes: [...prevFiltered.sizes, data.value]
                }));
            }
            
        } else {
            // If the checkbox is unchecked, remove the value from the filtered state
           if(checkboxType === "category"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    categories: prevFiltered.categories.filter((category) => category !== data.value)
                }));
            }
           if(checkboxType === "brand"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    brands: prevFiltered.brands.filter((brand) => brand !== data.value)
                }));
            }
           if(checkboxType === "price"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    prices: prevFiltered.prices.filter((price) => price !== data.value)
                }));
            }
           if(checkboxType === "color"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    colors: prevFiltered.colors.filter((color) => color !== data.value)
                }));
            }
           if(checkboxType === "size"){
                // If the checkbox is checked, add the value to the filtered state
                setFiltered((prevFiltered) => ({
                    ...prevFiltered,
                    sizes: prevFiltered.sizes.filter((size) => size !== data.value)
                }));
            }
        }
        // // SAVE THE FILTER ITEMS
        // localStorage.setItem('filter', JSON.stringify([...filtered]));
    };

    useEffect(()=>{
        // console.log('FILTERED >>> ',filtered);
    },[filtered]);


  return (
    <div style={{width:"450px", height:"100%"}}>
        <div className='div-ul'>
            <ul className='ul-filter'>
            <li className='li-filter-up'>
                <div className='cate-plus' onClick={()=> setOpenMenuCat(!openMenuCat)}>
                    <span style={{fontWeight:"600"}} >CATEGORIAS</span>
                    {
                        !openMenuCat?
                    <HiOutlinePlusSmall  style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>
                        :
                    <HiMinusSm onClick={()=> setOpenMenuCat(!openMenuCat)} style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>    
                    }
                </div>
                {
                openMenuCat?
                <div className='open-menu'>
                    {
                       Array.isArray(data[0].categories) && data[0].categories.map((item, index) => (
                            <div className='prevent-select' style={{display:"flex"}} key={index}>
                            <input value={item} name={item} type="checkbox" onChange={(e)=> handleCheckboxChange("category", e.target)}/>
                            <span  className='label-input'>{item}</span>
                            </div>
                        ))
                    }
                </div>
                :""
               }
                </li>
                <li className='li-filter-up'>
                <div className='cate-plus' onClick={()=> setOpenMenuBran(!openMenuBran)}>
                    <span style={{fontWeight:"600"}} >MARCAS</span>
                    {
                        !openMenuBran?
                    <HiOutlinePlusSmall  style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>
                        :
                    <HiMinusSm onClick={()=> setOpenMenuBran(!openMenuBran)} style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>    
                    }
                </div>
                {
                openMenuBran?
                <div className='open-menu'>
                    {
                       Array.isArray(data[0].brands) && data[0].brands.map((item, index) => (
                            <div className='prevent-select' style={{display:"flex"}} key={index}>
                            <input value={item} name={item} type="checkbox" onChange={(e)=> handleCheckboxChange("brand", e.target)}/>
                            <span  className='label-input'>{item}</span>
                            </div>
                        ))
                    }
                </div>
                :""
               }
                </li>
                <li className='li-filter-up'>
                <div className='cate-plus' onClick={()=> setOpenMenuPric(!openMenuPric)}>
                    <span style={{fontWeight:"600"}}>PRECIOS</span>
                    {
                        !openMenuPric?
                    <HiOutlinePlusSmall  style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>
                        :
                    <HiMinusSm onClick={()=> setOpenMenuPric(!openMenuPric)} style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>    
                    }
                </div>
                {
                openMenuPric?
                <div className='open-menu'>
                    {
                       Array.isArray(data[0].prices) && data[0].prices.map((item, index) => (
                            <div className='prevent-select' style={{display:"flex"}} key={index}>
                            <input value={item} name={item} type="checkbox" onChange={(e)=> handleCheckboxChange("price", e.target)}/>
                            <span  className='label-input'>{item}</span>
                            </div>
                        ))
                    }
                </div>
                :""
               }
                </li>
                <li className='li-filter-up'>
                <div className='cate-plus' onClick={()=> setOpenMenuColo(!openMenuColo)}>
                    <span style={{fontWeight:"600"}}>COLORES</span>
                    {
                        !openMenuColo?
                    <HiOutlinePlusSmall  style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>
                        :
                    <HiMinusSm onClick={()=> setOpenMenuColo(!openMenuColo)} style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>    
                    }
                </div>
                {
                openMenuColo?
                <div className='open-menu'>
                    {
                       Array.isArray(data[0].colors) && data[0].colors.map((item, index) => (
                            <div className='prevent-select' style={{display:"flex"}} key={index}>
                            <input value={item} name={item} type="checkbox" onChange={(e)=> handleCheckboxChange("color", e.target)}/>
                            <span  className='label-input'>{item}</span>
                            </div>
                        ))
                    }
                </div>
                :""
               }
                </li>
                <li className='li-filter-up'>
                <div className='cate-plus' onClick={()=> setOpenMenuSiz(!openMenuSiz)}>
                    <span style={{fontWeight:"600"}}>TALLAS</span>
                    {
                        !openMenuSiz?
                    <HiOutlinePlusSmall  style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>
                        :
                    <HiMinusSm onClick={()=> setOpenMenuSiz(!openMenuSiz)} style={{cursor:"pointer", color:"rgb(128 128 128 / 95%)"}}/>    
                    }
                </div>
                {
                openMenuSiz?
                <div className='open-menu'>
                    {
                       Array.isArray(data[0].sizes) && data[0].sizes.map((item, index) => (
                            <div className='prevent-select' style={{display:"flex"}} key={index}>
                            <input value={item} name={item} type="checkbox" onChange={(e)=> handleCheckboxChange("size", e.target)}/>
                            <span  className='label-input'>{item}</span>
                            </div>
                        ))
                    }
                </div>
                :""
               }
                </li>
            </ul>
        </div>
      
    </div>
  )
}

export default Filter
