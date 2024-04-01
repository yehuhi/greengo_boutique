import React, { useEffect, useState } from 'react';
import { ShopState } from '../../Context/ShopProvider';

import './Hero.css';

const Hero = () => {
  const [updateData, setUpdateData] = useState(null);
  const {
    filtered,
    setFiltered,
    favorite,
    setFavorite,
    cart,
    setCart,
    datos,
    setDatos
  } = ShopState();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchData = () => {
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=G9Y70TKpg3_zMJIDg1Zb1BNUX3QvZlN8HruKvU9vBdM8Vsu-V6w2Cx5q3oCHOqmbCNEjh4axc4DUWkfc1eUqR9gzDlisolCbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMwpOhq36CtnQItMg5j0hL08pR1MMtpWtgyujCTAPe0qcpOo942aDv-1nGmTfLM070wK6B7JdV45LK0oTMy089UeRO0rd8CSMNz9Jw9Md8uu&lib=MhpLCRi-dbxcPVauODzr0fwVH-hBlMqS6')
      .then(response => response.json())
      .then(data => {
        // Filter the data to include only objects where sheetName is "homepage" and id is not "TYPE"
        const filteredData = data.data.filter(item => item.sheetName === 'homepage' && item.id !== 'TYPE');
  
        // Set the filtered data
        setUpdateData(filteredData);
        setDatos(filteredData);
        // console.log('HOMEPAGE STORE DATA > ', filteredData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="hero-cont" style={{ height: "auto" }}>
      {updateData?.map((item, index) => (
        <div key={index} className='hero-cont-inside'>
          <div className="div_p">
            <p className="p1">
              {item.PRODUCT ? item.PRODUCT : ''}
            </p>
            <p className="p2">
              {item.PURCHASE_PRICE ? item.PURCHASE_PRICE : 'TESSST'}
            </p>
          </div>

          <div className="images-hero">
            {item.price && (
              <div className="image-hero1">
                <img
                  className="img-hero"
                  src={item.price}
                  alt="Image 1"
                />
              </div>
            )}
            {item.PRICE_IN_COL && (
              <div className="image-hero1">
                <img
                  className="img-hero"
                  src={item.PRICE_IN_COL}
                  alt="Image 2"
                />
              </div>
            )}
            {item.brand && (
              <div className="image-hero1">
                <img
                  className="img-hero"
                  src={item.brand}
                  alt="Image 3"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
