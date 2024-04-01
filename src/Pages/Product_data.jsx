import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import data from '../Components/Assets/new_collections';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbRulerMeasure } from 'react-icons/tb';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { ShopState } from '../Context/ShopProvider';
import Toast from '../Components/Toast/Toast';
import './Prod-data.css';

const Product_data = () => {
  const {
    filtered,
    setFiltered,
    favorite,
    setFavorite,
    cart,
    setCart,
    data,
    setData,
  } = ShopState();

  // console.log('DATA IN THE PRODUCT INIDE >> ', data);
  const { productID } = useParams();
  // console.log('FINDED PROD >> ', product);
  const [currentImage, setCurrentImage] = useState(0);
  const [amountProd, setAmountProd] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(null);
  const [colorSelected, setColorSelected] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [allData, setAllData] = useState([]);
  const [product, setProduct] = useState([]);
  const [favItems, setFavItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showFavToast, setShowFavToast] = useState(false);
  const [showWarningToast, setShowWarningToast] = useState(false);
  // console.log('FAVOITEMS -> ', favItems);
  // const product = favItems.find(d => Number(d.id) === Number(productID));

  const handleShowToast = color => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  const handleWarningShowToast = color => {
    setShowWarningToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  const handleFavShowToast = color => {
    setShowFavToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  const handleColorSelect = color => {
    setColorSelected(color);
  };

  const handleSizeSelect = size => {
    setSizeSelected(size);
  };

  // Click handler for the arrow image to change the current image
  const handleArrowClick = direction => {
    if (direction === 'next') {
      setCurrentImage(
        prevImage =>
          prevImage === product.image.length - 1 ? 0 : prevImage + 1
      );
    } else if (direction === 'prev') {
      setCurrentImage(
        prevImage =>
          prevImage === 0 ? product.image.length - 1 : prevImage - 1
      );
    }
  };

  const handleSelectChange = e => {
    setAmountProd(e.target.value);
  };

  const cartAdded = id => {
    if (colorSelected === null || sizeSelected === null) {
      // console.log('ENTRA A VERIFICAR');
      handleWarningShowToast();
      return;
    }

    let amount = parseInt(amountProd);
    if (amount === 0) {
      amount = 1;
    }
    // SAVE THE CART ITEMS
    localStorage.setItem(
      'cartItems',
      JSON.stringify([
        ...cartItems,
        { amount, id, colorSelected, sizeSelected },
      ])
    );
    localStorage.setItem('itemsCart', JSON.stringify([product]));
    handleShowToast();
    // console.log("Parsed amountProd:", amount);
    setCart([...cartItems, { amount, id, colorSelected, sizeSelected }]);
    setAmountProd(0);
  };

  const favoriteChange = (id, prod) => {
    if (favorite.some(item => item.id === id)) {
      const updatedFavorite = favorite.filter(itemId => itemId.id !== id);
      setFavorite(updatedFavorite);
      setFavItems(updatedFavorite);
      localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorite));
    } else {
      const updatedFavorite = [...favorite, prod];
      setFavorite(updatedFavorite);
      setFavItems(updatedFavorite);
      localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorite));
    }
    handleFavShowToast();
  };

  const removeFromFavorite = id => {
    const updatedFavorite = favItems.filter(itemId => itemId.id !== id);
    setFavorite(updatedFavorite);
    setFavItems(updatedFavorite);
    localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorite));
  };

  useEffect(
    () => {
      const allData = JSON.parse(localStorage.getItem('allData')) || [];
      const storedCartItems =
        JSON.parse(localStorage.getItem('cartItems')) || [];
      const storedFavoriteItems =
        JSON.parse(localStorage.getItem('favoriteItems')) || [];

      setProduct(allData.find(item => item.id === Number(productID)));
      setCartItems(storedCartItems);
      setFavItems(storedFavoriteItems);
    },
    [productID]
  );

  return (
    <div className="prod-data-cont">
      {product && product.brand ? <Breadcrum page={product} /> : ''}

      {product && product.brand
        ? <div className="allScreen">
            {/* IMAGES */}
            {product && product.images[0]
              ? <div className="cont-prod">
                  <img
                    className="prod-image prevent-select"
                    src={product.images[0]}
                    alt="carousel"
                  />
                  <div className="arrow-left prevent-select">
                    <IoIosArrowBack
                      onClick={() => handleArrowClick('prev')}
                      size={30}
                    />
                  </div>
                  <div className="arrow-right prevent-select">
                    <IoIosArrowForward
                      onClick={() => handleArrowClick('next')}
                      size={30}
                    />
                  </div>
                </div>
              : ''}

            {/* DETAILS */}
            <div className="half2">
              <div className="prod-detail prevent-select">
                <div className="prod-namep prevent-select">
                  {product.brand}
                </div>
                <div className="prodata-name prevent-select">
                  {product.PRODUCT}
                </div>
                <div className="prod-price-data prevent-select">
                  <span>
                    ${product.price},000
                  </span>
                </div>
                <div>
                  <span className="font-title">COLOR</span>
                  <div className="prod-colorsp prevent-select">
                    {product.color.map((color, i) =>
                      <div
                        key={i}
                        onClick={() => handleColorSelect(color)}
                        className={`prodata-color1 ${color === colorSelected
                          ? 'color-selected'
                          : ''}`}
                        style={{ backgroundColor: color }}
                      >
                        {/* Display color square */}
                      </div>
                    )}
                  </div>
                </div>
                <div className="size prevent-select">
                  <div className="prod-size">
                    <span className="font-title">TALLAS</span>
                    <div className="sizes prevent-select">
                      {product.size.map((size, i) => {
                        return (
                          <div
                            key={i}
                            onClick={() => handleSizeSelect(size)}
                            className={`size-square ${size === sizeSelected
                              ? 'size-square-selected'
                              : ''}`}
                          >
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
              <div className="prod-detail2">
                <div className="qty">
                  <span className="font-title">CANT</span>
                  <select
                    className="selecto"
                    name="quantity"
                    id=""
                    value={amountProd}
                    onChange={handleSelectChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button
                  onClick={() => cartAdded(product.id)}
                  className="add_button"
                >
                  AGREGAR AL CARRITO
                </button>
              </div>
              <div className="prod-detail3">
                <div className="favorites2">
                  {favItems &&
                  favItems[0] &&
                  favItems.some(item => item.id === parseInt(productID))
                    ? <div
                        style={{ color: 'red', display: 'flex' }}
                        onClick={() => removeFromFavorite(product.id)}
                      >
                        <IoMdHeartEmpty className="fav-icon" /> REMOVER DE
                        FAVORITOS
                      </div>
                    : <div
                        style={{ display: 'flex' }}
                        onClick={() => favoriteChange(product.id, product)}
                      >
                        <IoMdHeartEmpty className="fav-icon" /> AGREGAR A
                        FAVORITOS
                      </div>}
                </div>
                <div className="favorites3">
                  <TbRulerMeasure className="fav-icon" /> DETALLES
                </div>
              </div>
            </div>
          </div>
        : <div />}

      {showToast &&
        <Toast
          message="AGREGADO A TU BOLSO DE COMPRAS!"
          duration={3000}
          color="greenyellow"
          onClose={() => setShowToast(false)}
        />}
      {showFavToast &&
        <Toast
          message="AGREGADO A TUS FAVORITOS!"
          duration={3000}
          color="rose"
          onClose={() => setShowFavToast(false)}
        />}
      {showWarningToast &&
        <Toast
          message="TE FALTA SELECCIONAR COLOR O TALLA"
          duration={3000}
          color="orange"
          onClose={() => setShowWarningToast(false)}
        />}
    </div>
  );
};

export default Product_data;
