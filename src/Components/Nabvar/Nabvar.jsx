import React, { useEffect, useState, useRef } from 'react';
import logo from '../Assets/logoback.png';
import backLogo from '../Assets/backlogo.png';
import cart_icon from '../Assets/cart_icon.png';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import './Nabvar.css'
import { FiMenu } from "react-icons/fi";
import { NavLink, useLocation } from 'react-router-dom';
import { ShopState } from '../../Context/ShopProvider';


const Nabvar = () => {
  const {filtered, setFiltered, favorite, setFavorite, cart, setCart, cartCount, setCartCount } = ShopState();
  const [navLinkSelected, setNavLinkSelected] = useState("");
  const [cartItemsLenght, setCartItemsLenght] = useState(0);
  const [favItemsLenght, setFavItemsLenght] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const data_cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const data_fav = JSON.parse(localStorage.getItem('favoriteItems')) || [];
    setCartItemsLenght(data_cart.length);
    setFavItemsLenght(data_fav.length);
    setCart(data_cart);
    // console.log("data_cart.length > ",data_cart.length);
}, [cartCount, favorite]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
    <div className='navbar'>
      <div className="nav-logo">
        <NavLink to='/'>
          <img className='logo-img' src={logo} alt="logo" />
        </NavLink>
        {/* <p>GREENGO Boutique</p> */}
      </div>
      <ul className="nav-menu">
        <li className={`link ${location.pathname === '/' ? 'active' : 'inactive'}`}>
          <NavLink to='/'>NUEVO</NavLink>
        </li>
        <li className={`link ${location.pathname === '/womens' ? 'active' : 'link'}`}>
          <NavLink to='/womens'>MUJERES</NavLink>
        </li>
        <li className={`link ${location.pathname === '/mens' ? 'active' : 'inactive'}`}>
          <NavLink to='/mens'>HOMBRES</NavLink>
        </li>
        <li className={`link ${location.pathname === '/kids' ? 'active' : 'inactive'}`}>
          <NavLink to='/kids'>NIÑOS</NavLink>
        </li>
      </ul>

      <div className="nav-login-cart">
        <IoIosSearch className='search-icon'/>
        <NavLink to='/cart' className='link'>
        <div className='cart-cont'>
          <HiOutlineShoppingCart  className='cart-img'/>
          {
           (cart.length && cart.length>=0) || cartItemsLenght?
            <div className='cart-counter'>
              <span className='count'>{cart.length?cart.length:cartItemsLenght}</span>
            </div>:""
          }
        </div>
        </NavLink>
        {
        favItemsLenght > 0?
          <NavLink to='/favorites' className='link'>
          <IoIosHeart className='lev-icon' style={{color:"red"}}/>
        </NavLink>
        :
        <NavLink to='/favorites' className='link'>
          <IoMdHeartEmpty className='lev-icon'/>
        </NavLink>
        }
        <button>Iniciar Sesion</button>      
      </div>

      {/* MENU MOBILE */}
      {
          isMobile && !openMenu?
      <div className='nav-menu-mobile' ref={menuRef}>
        <FiMenu onClick={()=>setOpenMenu(!openMenu)} style={{fontSize:"35px",color:"#d4d4b6", cursor:"pointer", marginRight:"100px"}}/>
      </div>:  isMobile?
        <IoClose onClick={()=>setOpenMenu(!openMenu)} style={{fontSize:"43px",color:"#d4d4b6", cursor:"pointer", marginRight:"92px"}}/>
        :""
      }
        {
            openMenu?
            <div className='menu-mobile-back'>
        <div className='menu-mobile-icons'>
            <IoPersonOutline style={{fontSize:"27px", color:"white"}}/>

            {
            favItemsLenght > 0?
              <NavLink to='/favorites' onClick={() => setOpenMenu(false)} className='link'>
              <IoIosHeart className='lev-icon' style={{color:"red"}}/>
            </NavLink>
            :
            <NavLink to='/favorites' onClick={() => setOpenMenu(false)} className='link'>
              <IoMdHeartEmpty className='lev-icon'/>
            </NavLink>
            }

             <NavLink to='/cart' onClick={() => setOpenMenu(false)} className='link' style={{paddingRight:"30px"}}>
              <div className='cart-cont'>
                <HiOutlineShoppingCart  className='cart-img' />
                {
                (cart.length && cart.length>=0) || cartItemsLenght?
                  <div className='cart-counter'>
                    <span className='count'>{cart.length?cart.length:cartItemsLenght}</span>
                  </div>:""
                }
              </div>
            </NavLink>

            {/* <button>Iniciar Sesion</button>  */}
        </div>
        
        <div className='menu-div'>
          <ul className="menu-mobile-ul" style={{width:"100%", display:"flex", flexDirection:"column"}}>
          <li className={`link ${location.pathname === '/' ? 'active' : 'inactive'}`}>
            <NavLink to='/' onClick={() => setOpenMenu(false)}>NUEVO</NavLink>
          </li>
          <li className={`link ${location.pathname === '/womens' ? 'active' : 'link'}`}>
            <NavLink to='/womens' onClick={() => setOpenMenu(false)}>MUJERES</NavLink>
          </li>
          <li className={`link ${location.pathname === '/mens' ? 'active' : 'inactive'}`}>
            <NavLink to='/mens' onClick={() => setOpenMenu(false)}>HOMBRES</NavLink>
          </li>
          <li className={`link ${location.pathname === '/kids' ? 'active' : 'inactive'}`}>
            <NavLink to='/kids' onClick={() => setOpenMenu(false)}>NIÑOS</NavLink>
          </li>

          </ul>
        </div>
      </div>:""
        }
      
    </div>
  )
}

export default Nabvar;
