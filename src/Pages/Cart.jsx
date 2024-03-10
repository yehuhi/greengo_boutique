import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Cart.css"
import data from "../Components/Assets/data"
import { ShopState } from '../Context/ShopProvider';
import { RiDeleteBin6Line } from "react-icons/ri";


const Cart = () => {
  const {filtered, setFiltered, favorite, setFavorite, cart, setCart, cartCount, setCartCount } = ShopState();
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsEnd, setCartItemsEnd] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedSizeValue, setSelectedSizeValue] = useState(null);
  const [colorSelected, setColorSelected] = useState({});
  const [isMobile, setIsMobile] = useState(false);


    const handleColorSelect = (color, itemId) => {
      // Remove the previously selected color for the current item
      const updatedColors = { ...colorSelected };
      if (updatedColors[itemId] === color) {
        delete updatedColors[itemId];
      } else {
        // Update the selected color for the current item
        updatedColors[itemId] = color;
      }
      setColorSelected(updatedColors);
    };
  
    const cartFetch = () => {
        // console.log("CARITEMS <> ", cartItems);
        setCartCount(cartItems);
        let dato = data.filter(item => cartItems.some(cartItem => cartItem.id === item.id));
        // Add colorSelected, sizeSelected, and amount to the relevant item in cartItems
        dato = dato.map((item) => {
            const cartItem = cartItems.find((c) => c.id === item.id);
            return {
                ...item,
                colorSelected: cartItem.colorSelected,
                sizeSelected: cartItem.sizeSelected,
                amount: cartItem.amount,
                price: cartItem.amount * item.new_price
            };
            
        });
        setCartItemsEnd(dato);
        const total = dato.reduce((total, currentItem) => total + Number(currentItem.price), 0);
        setTotalPrice(total);
        localStorage.setItem('totalCartForPay', JSON.stringify(total));
        localStorage.setItem('itemsCart', JSON.stringify(cartItemsEnd));

        // console.log("DATOS >> ", dato);
    };

    const handleChange = (item, event) => {
      const itemId = item.id;
      const newQty = event.target.value;
    
      setSelectedValue(prev => ({
        ...prev,
        [itemId]: newQty
      }));
    
      // Update the quantity for the current item in cartItems
      const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem.id === itemId) {
          return {
            ...cartItem,
            amount: parseInt(newQty)
          };
        }
        return cartItem;
      });
    
      // Update cartItems state with the updated quantities
      setCartItems(updatedCartItems);
    
      // Fetch updated cart data
      cartFetch();
    };

    const handleSizeSelect = (event) => {
      const itemId = event.target.dataset.itemId;
      const newSize = event.target.value;
  
      // Update the selected size for the current item
      setSelectedSizeValue(prev => ({
        ...prev,
        [itemId]: newSize
      }));
    };

    const removeFromCart = (id) => {
      let cartRemoved = cart.filter((item) => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(cartRemoved));
      setCartItems(cartRemoved);
    };

    useEffect(() => {
        const data_cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(data_cart);

         // Initialize colorSelected state with default colors from fetchedData
        const defaultColors = data_cart.reduce((acc, item) => {
          acc[item.id] = item.colorSelected;
          return acc;
        }, {});
        setColorSelected(defaultColors);
        // setCartItemsEnd(data_cart);

        // Initialize sizeSelected state with default sizes from fetchedData
        const defaultSizes = data_cart.reduce((acc, item) => {
          acc[item.id] = item.sizeSelected;
          return acc;
        }, {});
        setSelectedSizeValue(defaultSizes);

        // Initialize sizeSelected state with default sizes from fetchedData
        const defaultAmounts = data_cart.reduce((acc, item) => {
          acc[item.id] = item.amount;
          return acc;
        }, {});
        setSelectedValue(defaultAmounts);

        setCartItemsEnd(data_cart);
    }, []);
    
    useEffect(() => {
        cartFetch();
    }, [cartItems, cart]); // Only depend on cartItems

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
      <div className='your-bag'>
      <span style={{fontSize:"27px",fontFamily:"sans-serif", letterSpacing:"1.2px"}}>MI BOLSO DE COMPRAS</span>
      <span style={{fontSize:"14px"}}>Total: <span style={{fontWeight:"600"}}>${totalPrice > 0?totalPrice+",000":"0"}</span></span>
      </div>
      

      <div className="prod-desc">
        <div className='table-headers'>
          <div>
          <span className='titles'>Descripcion del Producto</span>
          </div>
          {
            !isMobile?
            <div className='prod-actions-cart'>
            <div>
              <span className='titles'>Cantidad</span>
            </div>
            <div>
              <span className='titles'>Subtotal</span>
            </div>
            <div>
              <span style={{marginRight:"10px"}} className='titles'>Eliminar</span>
            </div>
          </div>:""
          }
          
        </div>

        <div className='all-details'>
       {/* PRODUCT DETAILS */}
          {
            cartItemsEnd[0] && cartItemsEnd.map((item, i)=>{
              return <div key={i} className="detail">
              <div className='detail-image'>
                <div className='img-detail'>
                  <img className='image-cart' src={item.image} alt="img" />
                </div>
                <div className='data-details'>
                  <span style={{fontWeight:"600", letterSpacing:"1.2px"}}>{item.brand}</span>
                  <span className='item-name'>{item.name}</span>
                  <div style={{display: "flex", alignItems: "center", fontFamily: "math"}}>
                    <span className='font-title'>COLOR:</span>  
                    {item.color.map((color, i) => (
                      <div
                        key={i}
                        onClick={() => handleColorSelect(color, item.id)} // Pass item ID to handleColorSelect
                        className={`prodata-color3 ${color === colorSelected[item.id]? 'color-selected-cart' : ''}`}
                        style={{ backgroundColor: color }}
                      >
                        {/* Display color square */}
                      </div>
                    ))}
                  </div>
                  <span style={{fontFamily:"math", color:"grey"}}>${item.new_price},000</span>
                  <span style={{fontFamily:"math", display:"flex"}}> <span className='font-title'>TALLA:</span> 
                  <div className="qty-cart"> 
                      <select className='selecto-size-cart' name="quantity" id="options" data-item-id={item.id} value={selectedSizeValue[item.id] !== null ? selectedSizeValue[item.id] : ''} onChange={handleSizeSelect}>
                          {['S', 'M', 'L', 'XL'].map((value, i) => (
                              <option key={i} value={value}>
                                  {value}
                              </option>
                          ))}
                      </select>
                  </div>
                  </span>
                  {
                    isMobile?
                    <div className='price-remove'>
                      <span className='font-title'>CANT:</span>
                          <div className="qty"> 
                              <select className='selecto-cart' name="quantity" id="options" data-item-id={item.id} value={selectedValue[item.id] !== null ? selectedValue[item.id] : item.amount} onChange={(e)=>handleChange(item,e)}>
                                  {[1, 2, 3, 4, 5].map((value, i) => (
                                      <option key={i} value={value}>
                                          {value}
                                      </option>
                                  ))}
                              </select>
                          </div>
                      <div className='price-cart'>${item.price},000</div>
                      <div className='remove-icon-cart' onClick={()=>removeFromCart(item.id)}><RiDeleteBin6Line style={{fontSize:"17px", color:"green", cursor:"pointer"}}/></div>
                    </div>:""
                  }
                  
                  {/* <span style={{fontWeight:"700"}}>{item.sizeSelected}</span></span> */}
                  {/* <span>QTY: 2</span> */}
                </div>
              </div>
              {
              !isMobile?
              <div className='price-remove'>
                  <div className="qty"> 
                      <select className='selecto-cart' name="quantity" id="options" data-item-id={item.id} value={selectedValue[item.id] !== null ? selectedValue[item.id] : item.amount} onChange={(e)=>handleChange(item,e)}>
                          {[1, 2, 3, 4, 5].map((value, i) => (
                              <option key={i} value={value}>
                                  {value}
                              </option>
                          ))}
                      </select>
                  </div>
                <div style={{marginRight:"25px"}}>${item.price},000</div>
                <div className='remove-icon-cart' onClick={()=>removeFromCart(item.id)}>X</div>
              </div>:""
              }
            </div>
            })
          }
          {!totalPrice?<div className='cart-empty'>TU BOLSO DE COMPRAS ESTA VACIO</div>:""}
        </div>
        
       
      </div>
        <div className='cart-next'>
          <div style={{width:"80%", height:"60px"}}>
            <div className='bar-bottom'>
              <p style={{fontWeight:"700", letterSpacing:"1px"}}></p>
              <div className='checkout'>
                <p style={{fontWeight:"600"}}>Total a Pagar:&nbsp;<span style={{fontWeight:"100"}}>${totalPrice}{totalPrice !== 0? ',000':""}</span></p>
                
                {
                  totalPrice !== 0?
                  <Link to={`/cart-pay`}>
                 <div className='checkout-btn'>PAGAR</div>
                </Link>:""
                }
                
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart
