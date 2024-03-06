import React, { useEffect, useState } from 'react';
import "./Favorites.css"
import data from "../Components/Assets/data";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ShopState } from '../Context/ShopProvider';


const Favorites = () => {
  const {filtered, setFiltered, favorite, setFavorite, cart, setCart } = ShopState();
  const [amountProd, setAmountProd] = useState(0);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [favoriteItemsEnd, setFavoriteItemsEnd] = useState([]);
  const [isMobile, setIsMobile] = useState(false);


  const favoriteFetch = () => {
  if(favoriteItems && favoriteItems[0]){
    let dato = data.filter(item => favoriteItems.some(favoriteItem => favoriteItem === item.id));
    console.log("COLORES DEL PRODUCTO >> ", dato);
    // Add colorSelected, sizeSelected, and amount to the relevant item in favoriteItems
    // dato = dato.map((item) => {
    //     const cartItem = favoriteItems.find((c) => c.id === item.id);
    //     return {
    //         ...item,
    //         colorSelected: cartItem.colorSelected,
    //         sizeSelected: cartItem.sizeSelected,
    //         amount: cartItem.amount,
    //         price: cartItem.amount * item.new_price
    //     };
    // });
    setFavoriteItemsEnd(dato);
    // const total = dato.reduce((total, currentItem) => total + Number(currentItem.price), 0);
    // setTotalPrice(total);
    // console.log("DATOS >> ", dato);

    }
  };

  const removeFromFavorite = (id) => {
    let favRemoved = favorite.filter((item) => item !== id)
    localStorage.setItem('favoriteItems', JSON.stringify(favRemoved));
    setFavorite(favRemoved);
    setFavoriteItemsEnd(favRemoved);
  };

  const cartAdded = (id)=>{
    let amount = parseInt(amountProd);
    if(amount === 0){
      amount = 1;
    }
    setCart([...cart, { amount, id }]);
    setAmountProd(0); 
    localStorage.setItem('cartItems', JSON.stringify([...cart, { amount, id, colorSelected:"black", sizeSelected:"M" }]));
    let favRemoved = favorite.filter((item) => item !== id)
    localStorage.setItem('favoriteItems', JSON.stringify(favRemoved));
    setFavorite(favRemoved);
    setFavoriteItemsEnd(favRemoved);
};

useEffect(()=>{
  const items = JSON.parse(localStorage.getItem('favoriteItems'));
  // console.log("FAVORITES LOCAL STORAGE >>> ", items);
  setFavoriteItems(items);
},[]);

useEffect(() => {
  favoriteFetch();
}, [favoriteItems]); // Only depend on cartItems

useEffect(() => {
  const checkIfMobile = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 600); // Adjust the threshold as needed
  };

  checkIfMobile();

  window.addEventListener('resize', checkIfMobile);

  return () => {
    window.removeEventListener('resize', checkIfMobile);
  };
}, []);

  return (
    <div style={{width:"100%", height:"100vh",marginTop:"81px"}}>
      <div className='your-bag-fav'>
      <span className='title-fav' style={{fontSize:"27px",fontFamily:"sans-serif", letterSpacing:"1.2px"}}>MIS PRODUCTOS FAVORITOS</span>
      </div>
      

      <div className="prod-desc">
        <div className='table-headers'>
          <div>
          <span className='titles'>Descripcion del Producto</span>
          </div>
          <div className='prod-actions'>
            <div>
              {/* <span className='titles'>Subtotal</span> */}
            </div>
            {
              !isMobile?
              <div>
                <span className='titles'>Eliminar</span>
              </div>:""
            }
            
          </div>
        </div>

        <div className='all-details'>
      {/* PRODUCT DETAILS */}
          {
           favoriteItemsEnd[0] && favoriteItemsEnd.map((item, i)=>{
            return <div key={i} className="detail">
            <div className='detail-image'>
              <div className='img-detail'>
                <img className='image-cart' src={item.image} alt="img" />
              </div>
              <div className='data-details'>
                <span style={{fontWeight:"600"}}>TOMMY HILFIGER</span>
                <span className='item-name'>{item.name}</span>
                <div style={{display:"flex"}}>
                <span className='font-title'>COLORS:</span>
                {
                    item.color.map((colorito,a)=>{
                      return <div key={a} style={{width:"20px",marginLeft:"7px", height:"20px", backgroundColor: colorito, border:"1px solid grey", borderRadius:"50%"}}></div>
                    })
                }
                </div>
                
                <span style={{display:"flex"}}> <span className='font-title'>SIZES:</span>
                <div style={{display:"flex", fontWeight:"600"}}>
                {
                    item.size.map((sizesito,a)=>{
                      return <span style={{marginLeft:"10px"}} key={a}>{sizesito}</span>
                    })
                }
                </div>
                </span>
                {
                  isMobile?
                  <div className='price-remove-fav'>
                  <div className='add-cart-favorite' onClick={()=> cartAdded(item.id)}>AL CARRITO</div>
                  <div className='remove-icon' onClick={()=>removeFromFavorite(item.id)}><RiDeleteBin6Line style={{fontSize:"21px", color:"green"}}/></div>
                </div>:""
                }
                {/* <span>QTY: 2</span> */}
              </div>
            </div>
            {
              !isMobile?
              <div className='price-remove-fav'>
              <div className='add-cart-favorite' onClick={()=> cartAdded(item.id)}>AL CARRITO</div>
              <div className='remove-icon' onClick={()=>removeFromFavorite(item.id)}>X</div>
            </div>:""
            }
            
          </div>
           })
          }
        {!favoriteItemsEnd[0]?<div className='favorite-empty'>AGREGA ALGO LINDO A TUS FAVORITOS</div>:""}
        </div>
      </div>
    </div>
  )
}

export default Favorites
