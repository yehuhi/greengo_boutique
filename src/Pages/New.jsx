import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero/Hero';
import loadingImg from '../Components/Assets/logo2.png';
import Footer from '../Components/Footer/Footer';
import { ShopState } from '../Context/ShopProvider';
import './New.css';

const New = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    filtered,
    setFiltered,
    favorite,
    setFavorite,
    cart,
    setCart,
    datos,
    setDatos,
  } = ShopState();

  const load = () => {
    // fetch('https://sheetdb.io/api/v1/1381bhdn7pbkd?sheet=homepage')
    fetch(
      'https://script.googleusercontent.com/macros/echo?user_content_key=X8b6UAS_DXy9SXTXLk4J926C6cKWIjKy8TWDDMQB62lHcojSYoO-P2DDoKZm7PBZxcEmqXOxPisI89OIBGVuCRXOcn0eJB8im5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGnrgdao9tZ7QjjfuRoKKDg6vven7xz4YWqXp3vpZuNLPpRsgXlC1fmkfuIgM5hS8tjiufuFPB-o3AiRPcHqLe-yrgaCoAcWqtz9Jw9Md8uu&lib=MhpLCRi-dbxcPVauODzr0fwVH-hBlMqS6'
    )
      .then(response => response.json())
      .then(data => {
        // Filter the data to include only objects where sheetName is "homepage"
        const filteredData = data.data.filter(
          item => item.sheetName === 'homepage' && item.id !== 'TYPE'
        );

        setDatos(filteredData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="new-cont">
      {isLoading &&
        <div className="overlay">
          <div className="loading-spinner">
            <img
              src={loadingImg} // Replace with the path to your image
              alt="Loading..."
              className="spinner-image"
            />
            <br />
            <span style={{ color: 'white' }}>Loading...</span>
          </div>
        </div>}
      <Hero />
      {!isLoading && <Footer />}
    </div>
  );
};

export default New;
