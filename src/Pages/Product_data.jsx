import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import data from '../Components/Assets/new_collections'
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import { IoMdHeartEmpty } from "react-icons/io";
import { TbRulerMeasure } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { ShopState } from '../Context/ShopProvider';
import "./Prod-data.css"

const Product_data = () => {
  const {filtered, setFiltered, favorite, setFavorite, cart, setCart } = ShopState();
    const { productID } = useParams();
    const product = data.find(d => d.id === Number(productID));
    const [currentImage, setCurrentImage] = useState(0);
    const [amountProd, setAmountProd] = useState(0);
    const [sizeSelected, setSizeSelected] = useState(null);
    const [colorSelected, setColorSelected] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [favItems, setFavItems] = useState([]);

     const handleColorSelect = (color) => {
        setColorSelected(color);
      };

     const handleSizeSelect = (size) => {
          setSizeSelected(size);
        };
  
      // Click handler for the arrow image to change the current image
      const handleArrowClick = (direction) => {
      if (direction === 'next') {
        setCurrentImage((prevImage) => (prevImage === product.image.length - 1 ? 0 : prevImage + 1));
       } else if (direction === 'prev') {
        setCurrentImage((prevImage) => (prevImage === 0 ? product.image.length - 1 : prevImage - 1));
       }
      }

      const handleSelectChange = (e) => {
        setAmountProd(e.target.value);
      };

      const cartAdded = (id)=>{
        let amount = parseInt(amountProd);
        if(amount === 0){
          amount = 1;
        }
        // SAVE THE CART ITEMS
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, { amount, id, colorSelected, sizeSelected }]));

        // console.log("Parsed amountProd:", amount);
        setCart([...cartItems, { amount, id, colorSelected, sizeSelected }]);
        setAmountProd(0); 
      };

      const favoriteChange = (id) => {
        if (favorite.includes(id)) {
          const updatedFavorite = favorite.filter(itemId => itemId !== id);
          setFavorite(updatedFavorite);
          setFavItems(updatedFavorite);
          localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorite));
        } else {
          const updatedFavorite = [...favorite, id];
          setFavorite(updatedFavorite);
          setFavItems(updatedFavorite);
          localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorite));
        }
      };
      
      const removeFromFavorite = (id) => {
        const updatedFavorite = favItems.filter(itemId => itemId !== id);
        setFavorite(updatedFavorite);
        setFavItems(updatedFavorite);
        localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorite));
      };
      

      useEffect(() => {
        const data_cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(data_cart);
        const items = JSON.parse(localStorage.getItem('favoriteItems'));
        if(items && items[0]){
          setFavItems([...items])
        }
        console.log("FAVORITO PROD > ", favItems);
      }, []);

  return (
    <div className='prod-data-cont'>
        <Breadcrum page={product}/>
      <div className="allScreen">
    {/* IMAGES */}
    <div className='cont-prod'>
      <img className='prod-image prevent-select' src={product.image[currentImage]} alt="carousel" />
      <div className='arrow-left prevent-select'>
        <IoIosArrowBack onClick={() => handleArrowClick('prev')} size={30} />
      </div>
      <div className='arrow-right prevent-select'>
        <IoIosArrowForward onClick={() => handleArrowClick('next')} size={30}/>
      </div>
    </div>
            {/* DETAILS */}
            <div className="half2">
                <div className='prod-detail prevent-select'>
                <div className="prod-namep prevent-select">
                {product.brand}
                </div>
                <div className="prodata-name prevent-select">
                    {product.name}
                </div>
                <div  className="prod-price-data prevent-select">
                    <span>${product.new_price},000</span>
                </div>
                <div >
                <span className='font-title'>COLOR</span> 
                <div className="prod-colorsp prevent-select">
                {product.color.map((color, i) => (
                  <div key={i} onClick={() => handleColorSelect(color)} className={`prodata-color1 ${color === colorSelected ? 'color-selected' : ''}`} style={{ backgroundColor: color }}>
                    {/* Display color square */}
                  </div>
                ))}
                </div>
                    
                </div>
                <div className="size prevent-select">
                    <div className="prod-size">
                    <span className='font-title'>TALLAS</span> 
                        <div className='sizes prevent-select'>
                          {product.size.map((size, i) => {
                            return (
                              <div key={i} onClick={() => handleSizeSelect(size)} className={`size-square ${size === sizeSelected ? 'size-square-selected' : ''}`}>
                              {size}
                              </div>
                            );
                          })}
                        </div>
                     </div>
                    <div className="prod-name-size prevent-select">
                        GUIA DE TALLAS
                    </div>
                </div>
              </div>
            <div className='prod-detail2'>
            <div className="qty">
            <span className='font-title'>CANT</span> 
                    <select className='selecto' name="quantity" id="" value={amountProd} onChange={handleSelectChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
            </div>
                <button onClick={()=> cartAdded(product.id)} className='add_button'>AGREGAR AL CARRITO</button>     
            </div>                
            <div className='prod-detail3'>
            <div className="favorites2">
                  {
                    favItems && favItems[0] && favItems.includes(parseInt(productID))? 
                     <div style={{color:"red", display:"flex"}} onClick={()=> removeFromFavorite(product.id)}><IoMdHeartEmpty className='fav-icon'/> REMOVER DE FAVORITOS</div> 
                    :<div style={{ display:"flex"}} onClick={()=> favoriteChange(product.id)}><IoMdHeartEmpty className='fav-icon'/> AGREGAR A FAVORITOS</div>
                  }
                    
                </div>
                <div className="favorites3">
                    <TbRulerMeasure className='fav-icon'/> DETALLES
                </div>    
            </div>
            </div>
      </div>
      
    </div>
  )
}

export default Product_data
