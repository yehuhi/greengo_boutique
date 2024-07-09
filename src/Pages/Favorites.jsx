import React, { useEffect, useState } from 'react';
import './Favorites.css';
import data from '../Components/Assets/data';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ShopState } from '../Context/ShopProvider';

const Favorites = () => {
  const {
    filtered,
    setFiltered,
    favorite,
    setFavorite,
    cart,
    setCart,
  } = ShopState();
  const [amountProd, setAmountProd] = useState(0);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [favoriteItemsEnd, setFavoriteItemsEnd] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const removeFromFavorite = id => {
    // console.log('favoriteItemsEnd >> ', favoriteItemsEnd);
    let favRemoved = favoriteItemsEnd.filter(item => item.id !== id);
    localStorage.setItem('favoriteItems', JSON.stringify(favRemoved));
    setFavorite(favRemoved);
    setFavoriteItemsEnd(favRemoved);
  };

  const cartAdded = id => {
    console.log('CART TO ADD > ', id);
    let amount = parseInt(amountProd);
    if (amount === 0) {
      amount = 1;
    }
    setCart([...cart, { amount, id }]);
    setAmountProd(0);
    localStorage.setItem(
      'cartItems',
      JSON.stringify([
        ...cart,
        { amount, id, colorSelected: 'black', sizeSelected: 'M' },
      ])
    );
    let favRemoved = favoriteItemsEnd.filter(item => item.id !== id);
    let toCart = favoriteItemsEnd.filter(item => item.id === id);
    localStorage.setItem('favoriteItems', JSON.stringify(favRemoved));
    const cartIts = JSON.parse(localStorage.getItem('itemsCart'));
    if (cartIts && cartIts[0]) {
      localStorage.setItem(
        'itemsCart',
        JSON.stringify([...cartIts, ...toCart])
      ); // Concatenate the arrays correctly
    } else {
      localStorage.setItem('itemsCart', JSON.stringify([...toCart])); // Concatenate the arrays correctly
    }
    setFavorite(favRemoved);
    setFavoriteItemsEnd(favRemoved);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('favoriteItems'));
    console.log('FAVORITES LOCAL STORAGE >>> ', items);
    setFavoriteItems(items);
    setFavoriteItemsEnd(items);
  }, []);

  useEffect(
    () => {
      // favoriteFetch();
    },
    [favoriteItems]
  ); // Only depend on cartItems

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
    <div style={{ width: '100%', height: '100vh', marginTop: '81px' }}>
      <div className="your-bag-fav">
        <span
          className="title-fav"
          style={{
            fontSize: '27px',
            fontFamily: 'sans-serif',
            letterSpacing: '1.2px',
          }}
        >
          MIS PRODUCTOS FAVORITOS
        </span>
      </div>

      <div className="prod-desc">
        <div className="table-headers">
          <div>
            <span className="titles">Descripcion del Producto</span>
          </div>
          <div className="prod-actions">
            <div>
              {/* <span className='titles'>Subtotal</span> */}
            </div>
            {!isMobile
              ? <div>
                  <span className="titles">Eliminar</span>
                </div>
              : ''}
          </div>
        </div>
        {favoriteItemsEnd && favoriteItemsEnd[0]
          ? <div className="all-details">
              {/* PRODUCT DETAILS */}
              {favoriteItemsEnd[0] &&
                favoriteItemsEnd.map((item, i) => {
                  return (
                    <div key={i} className="detail">
                      <div className="detail-image">
                        {favoriteItemsEnd && favoriteItemsEnd[0].image
                          ? <div className="img-detail">
                              {item.image.map((img, a) => {
                                return (
                                  <img
                                    key={a}
                                    className="image-cart"
                                    src={img}
                                    alt="img"
                                  />
                                );
                              })}
                            </div>
                          : ''}

                        <div className="data-details">
                          <span style={{ fontWeight: '600' }}>
                            {item.brand}
                          </span>
                          <span className="item-name">
                            {item.name ? item.name : item.PRODUCT}
                          </span>
                          <div style={{ display: 'flex' }}>
                            <span className="font-title">COLORES:</span>
                            {item.color.map((colorito, a) => {
                              return (
                                <div
                                  key={a}
                                  style={{
                                    width: '20px',
                                    marginLeft: '7px',
                                    height: '20px',
                                    backgroundColor: colorito
                                      ? colorito
                                      : 'red',
                                    border: '1px solid grey',
                                    borderRadius: '50%',
                                  }}
                                />
                              );
                            })}
                          </div>

                          <span style={{ display: 'flex' }}>
                            {' '}<span className="font-title">TALLAS:</span>
                            <div style={{ display: 'flex', fontWeight: '600' }}>
                              {item.size.map((sizesito, a) => {
                                return (
                                  <span style={{ marginLeft: '10px' }} key={a}>
                                    {sizesito ? sizesito.toUpperCase() : 'S'}
                                  </span>
                                );
                              })}
                            </div>
                          </span>
                          {isMobile
                            ? <div className="price-remove-fav">
                                <div
                                  className="add-cart-favorite"
                                  onClick={() => cartAdded(item.id)}
                                >
                                  AL CARRITO
                                </div>
                                <div
                                  className="remove-icon"
                                  onClick={() => removeFromFavorite(item.id)}
                                >
                                  <RiDeleteBin6Line
                                    style={{ fontSize: '21px', color: 'green' }}
                                  />
                                </div>
                              </div>
                            : ''}
                          {/* <span>QTY: 2</span> */}
                        </div>
                      </div>
                      {!isMobile
                        ? <div className="price-remove-fav">
                            <div
                              className="add-cart-favorite"
                              onClick={() => cartAdded(item.id)}
                            >
                              AL CARRITO
                            </div>
                            <div
                              className="remove-icon"
                              onClick={() => removeFromFavorite(item.id)}
                            >
                              X
                            </div>
                          </div>
                        : ''}
                    </div>
                  );
                })}
              {/* {!favoriteItems && !favoriteItems[0]
                ? <div style={{ color: 'red' }} className="favorite-empty">
                    AGREGA ALGO LINDO A TUS FAVORITOS
                  </div>
                : 'TEST'} */}
            </div>
          : ''}
        {!favoriteItemsEnd[0]
          ? <div className="favorite-empty">
              AGREGA ALGO LINDO A TUS FAVORITOS
            </div>
          : ''}
      </div>
    </div>
  );
};

export default Favorites;
