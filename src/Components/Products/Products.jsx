import React, { useEffect, useState } from 'react'
import "./Products.css"
import Product from '../Product/Product';
import data_product from '../Assets/new_collections';
import { ShopState } from '../../Context/ShopProvider';


const Products = ({filter}) => {
  const {filtered, setFiltered, favorite, setFavorite, cart, setCart } = ShopState();
   const [filteredProducts, setFilteredProducts] = useState([]);

  const renderFilter = ()=>{

    let afterFilter = data_product.filter(item => {
      // Check if the item's brand is in the specified brands array
      if (filtered.brands.length > 0 && !filtered.brands.includes(item.brand)) {
        return false;
      }
      if (filtered.sizes.length > 0 && !item.size.some((size) => filtered.sizes.includes(size))) {
        return false;
      }
      if (filtered.prices.length > 0 && !filtered.prices.includes(item.price)) {
        return false;
      }
      if (filtered.colors.length > 0 && !filtered.colors.some((clr) => item.color.includes(clr))) {
        return false;
      }
      if (filtered.categories.length > 0 && !filtered.categories.includes(item.category)) {
        return false;
      }
          
      return true; // Include the item if all conditions are met
    });
    // console.log("filtered  >>> ", filtered);
    // console.log("PRODUCTS AFTER FILTER >>> ", afterFilter);
    setFilteredProducts(afterFilter);
  };
 

  useEffect(()=>{
    renderFilter();
  },[filtered]);
  
  // console.log("FILTERED BY - ", filtered);
  return (
    <div className='prods-cont'>
      {
        filteredProducts.map((item, i)=>{
            return <Product key={i} name={item.name} id={item.id} brand={item.brand} colors={item.color} image={item.image} new_price={item.new_price}/>
        })
      }
      {!filteredProducts[0]?<div className='favorite-empty'>NO SE HA ENCONTRADO NINGUN ARTICULO</div>:""}
    </div>

  )
}

export default Products
