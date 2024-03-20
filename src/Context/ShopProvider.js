import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    // const [user, setUser] = useState();
    const [filtered, setFiltered] = useState({ categories: [], brands: [], sizes: [], prices: [], colors:[] });
    const [cart, setCart] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState({});
    const [breadCrum, setBreadCrum] = useState("");

  
    useEffect(() => {
    }, [cart, favorite]);
  
    return (
      <ShopContext.Provider
        value={{
         user,
         setUser,
         filtered,
         setFiltered,
         cart,
         setCart,
         favorite,
         setFavorite,
         cartCount,
         setCartCount,
         breadCrum,
         setBreadCrum
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
