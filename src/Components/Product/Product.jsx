import React, { useEffect, useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoIosHeart } from 'react-icons/io';
import './Product.css';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import foto from '../Assets/product_1.png';
import { ShopState } from '../../Context/ShopProvider';

const Product = props => {
  // console.log('LO SELECCIONADO ES > ', props);
  const {
    filtered,
    setFiltered,
    favorite,
    setFavorite,
    cart,
    setCart,
  } = ShopState();
  const [currentImage, setCurrentImage] = useState(0);
  const [favoriteSelected, setFavoriteSelected] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const handleArrowClick = (direction, event) => {
    event.preventDefault(); // Prevent the default behavior (link navigation)
    event.stopPropagation(); // Stop click event propagation to the image
    if (direction === 'next') {
      setCurrentImage(
        prevImage => (prevImage === props.image.length - 1 ? 0 : prevImage + 1)
      );
    } else if (direction === 'prev') {
      setCurrentImage(
        prevImage => (prevImage === 0 ? props.image.length - 1 : prevImage - 1)
      );
    }
  };

  const favoriteChange = (selected, id, prop) => {
    let findFav = favorite.findIndex(x => prop.id === x.id);

    if (findFav > -1 && favorite && !favorite[0]) {
      const updatedFavorite = favorite.filter(itemId => itemId.id !== id);
      console.log('TST FAV -> ', updatedFavorite);
      setFavorite(updatedFavorite);
      setFavoriteItems(updatedFavorite); // Update favoriteItems as an array
      localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorite));
    } else {
      const updatedFavorite = [...favorite, prop];
      setFavorite(updatedFavorite);
      setFavoriteItems(updatedFavorite); // Update favoriteItems as an array
      localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorite));
      console.log('TST 2 FAV -> ', updatedFavorite);
    }
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('favoriteItems'));
    // console.log("FAVORITES LOCAL STORAGE >>> ", items);
    setFavoriteItems(items);
  }, []);

  return (
    <div className="prods">
      <div className="image">
        {favoriteItems &&
        !favoriteItems.some(item => item.id === props.id) &&
        !favoriteSelected
          ? <IoMdHeartEmpty
              onClick={() => favoriteChange(!favoriteSelected, props.id, props)}
              className="favorite-icon"
            />
          : favoriteItems && favoriteItems.some(item => item.id === props.id)
            ? <IoIosHeart
                onClick={() =>
                  favoriteChange(!favoriteSelected, props.id, props)}
                className="favorite-icon"
                style={{ color: 'red' }}
              />
            : <IoMdHeartEmpty
                onClick={() =>
                  favoriteChange(!favoriteSelected, props.id, props)}
                className="favorite-icon"
              />}

        <Link to={`/product/${props.id}`}>
          <img
            className="image-img prevent-select"
            src={
              props.image[currentImage] !== 'imageLink'
                ? props.image[currentImage]
                : foto
            }
            alt="carousel"
          />
        </Link>
        {/* <Link to={`/product/${props.id}`}>
          <LazyLoadImage
            className="image-img prevent-select"
            src={props.image[currentImage] !== 'imageLink' ? props.image[currentImage] : foto}
            alt="carousel"
            effect="blur"
          />
        </Link> */}
        <div className="arrow-left-p ">
          <IoIosArrowBack
            onClick={event => handleArrowClick('prev', event)}
            size={30}
          />
        </div>
        <div className="arrow-right-p ">
          <IoIosArrowForward
            onClick={event => handleArrowClick('next', event)}
            size={30}
          />
        </div>
      </div>

      {props.brand !== 'brand' &&
        <div className="prod-details">
          <div className="brand prevent-select">
            {props.brand !== 'brand' ? props.brand : ''}
          </div>
          <div className="prod-name prevent-select">
            {props.name !== 'name' ? props.name : ''}
          </div>
          <div className="prod-price prevent-select">
            {/* {props.new_price !== 'new_price' ? props.new_price : ''} */}
            ${props.price},000
          </div>
          <div className="prod-colors prevent-select">
            {props.color.map((color, i) => {
              return (
                <div
                  className="color1"
                  key={i}
                  style={{ backgroundColor: `${color}` }}
                />
              );
            })}
          </div>
        </div>}
    </div>
  );
};

export default Product;
