import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    // const [user, setUser] = useState();
    const [filtered, setFiltered] = useState({ categories: [], brands: [], sizes: [], prices: [], colors:[] });
    const [cart, setCart] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    
    // const address = 'https://dashboard-be.up.railway.app';
    // const address = 'http://localhost:5000';
    // const address_web = 'https://cheerful-cucurucho-361367.netlify.app';
    // const address_web = 'http://localhost:3000';
  
    useEffect(() => {
      // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      // let obj = {};
      // Object.assign(obj, userInfo);
      // obj.notifications = [];
      // setUser(obj);
    }, [cart, favorite]);
    // const socket = useMemo(() => io(address), []);
  
    return (
      <ShopContext.Provider
        value={{
        //  user,
        //  setUser,
         filtered,
         setFiltered,
         cart,
         setCart,
         favorite,
         setFavorite,
         cartCount,
         setCartCount
        }}
      >
        {' '}
        {children}{' '}
      </ShopContext.Provider>
    );
  };

  export const ShopState = () => {
    return useContext(ShopContext);
  };

  export default ShopProvider;
