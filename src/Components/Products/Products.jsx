import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './Products.css';
import Product from '../Product/Product';
import loadingImg from '../../Components/Assets/logo2.png';
import { ShopState } from '../../Context/ShopProvider';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Products = ({ type }) => {
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [womensData, setWomensData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://script.googleusercontent.com/macros/echo?user_content_key=G9Y70TKpg3_zMJIDg1Zb1BNUX3QvZlN8HruKvU9vBdM8Vsu-V6w2Cx5q3oCHOqmbCNEjh4axc4DUWkfc1eUqR9gzDlisolCbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMwpOhq36CtnQItMg5j0hL08pR1MMtpWtgyujCTAPe0qcpOo942aDv-1nGmTfLM070wK6B7JdV45LK0oTMy089UeRO0rd8CSMNz9Jw9Md8uu&lib=MhpLCRi-dbxcPVauODzr0fwVH-hBlMqS6'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const sheetNamesToFilter = [
        'polo_ralph_lauren',
        'victoria_secret',
        'michael_kors',
        'tommy_hilfiger',
        'calvin_klein',
        'steve_madden',
        'guess',
        'steps',
        'windsore_store',
      ];

      const filteredData = data.data.filter(
        item =>
          sheetNamesToFilter.includes(item.sheetName) && item.type === type
      );

      const updatedData = filteredData.reduce((accumulator, item) => {
        if (item.color !== '' || item.size !== '' || item.imageLink !== '') {
          const colorArray = item.color.split(',');
          const sizeArray = item.size.split(',');
          const imagesArray = [item.imageLink];
          accumulator.push({
            ...item,
            color: colorArray,
            size: sizeArray,
            images: imagesArray,
          });
        }
        return accumulator;
      }, []);

      setWomensData(updatedData);
      setData(updatedData);
      setLoading(false);

      localStorage.setItem('allData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderFilter = useCallback(
    () => {
      let afterFilter = womensData.filter(item => {
        if (
          filtered.brands.length > 0 &&
          !filtered.brands.includes(item.brand)
        ) {
          return false;
        }
        if (
          filtered.sizes.length > 0 &&
          !item.size.some(size => filtered.sizes.includes(size))
        ) {
          return false;
        }
        if (
          filtered.prices.length > 0 &&
          !filtered.prices.includes(item.price)
        ) {
          return false;
        }
        if (
          filtered.colors.length > 0 &&
          !filtered.colors.some(clr => item.color.includes(clr))
        ) {
          return false;
        }
        if (
          filtered.categories.length > 0 &&
          !filtered.categories.includes(item.category)
        ) {
          return false;
        }
        return true;
      });
      setFilteredProducts(afterFilter);
    },
    [womensData, filtered]
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(
    () => {
      if (!loading) {
        renderFilter();
      }
    },
    [filtered, loading, renderFilter]
  );

  const filteredProductElements = useMemo(
    () =>
      filteredProducts
        .filter(
          item =>
            item.images &&
            item.images.length > 0 &&
            item.images[0] !== 'image_link'
        )
        .map((item, i) =>
          <Product
            key={i}
            id={item.id}
            name={item.PRODUCT}
            brand={item.brand}
            color={item.color}
            image={item.images}
            price={item.price}
            size={item.size}
          />
        ),
    [filteredProducts]
  );

  return (
    <div className="prods-cont">
      {loading
        ? <div className="overlay">
            <div className="loading-spinner">
              <img
                src={loadingImg} // Replace with the path to your image
                alt="Cargando..."
                className="spinner-image"
              />
              <br />
              <span style={{ color: 'white' }}>Cargando...</span>
            </div>
          </div>
        : filteredProductElements}
      {!filteredProducts[0] &&
        !loading &&
        <div className="favorite-empty">
          NO SE HA ENCONTRADO NINGUN ARTICULO
        </div>}
    </div>
  );
};

export default Products;
