import React, { useEffect, useState } from 'react';
import './Products.css';
import Product from '../Product/Product';
import loadingImg from '../../Components/Assets/logo2.png';
import { ShopState } from '../../Context/ShopProvider';

const Products = ({ type }) => {
  const {
    filtered,
    setFiltered,
    favorite,
    setFavorite,
    cart,
    setCart,
    data,
    setData
  } = ShopState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [womensData, setWomensData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   try {
  //     const sheetNamesToFilter = ["polo_ralph_lauren", "victoria_secret", "michael_kors", "tommy_hilfiger",
  //      "calvin_klein", "steve_madden", "guess", "steps", "windsore_store"];
  
  //     fetch('https://script.googleusercontent.com/macros/echo?user_content_key=G9Y70TKpg3_zMJIDg1Zb1BNUX3QvZlN8HruKvU9vBdM8Vsu-V6w2Cx5q3oCHOqmbCNEjh4axc4DUWkfc1eUqR9gzDlisolCbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMwpOhq36CtnQItMg5j0hL08pR1MMtpWtgyujCTAPe0qcpOo942aDv-1nGmTfLM070wK6B7JdV45LK0oTMy089UeRO0rd8CSMNz9Jw9Md8uu&lib=MhpLCRi-dbxcPVauODzr0fwVH-hBlMqS6')
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log("DATOS >>>> > ", data);
  
  //       // Filter the data array by sheetName values
  //       const filteredData = data.data.filter(item => sheetNamesToFilter.includes(item.sheetName) && item.type === type);

  //       const updatedData = filteredData.reduce((accumulator, item) => {
  //         if (item.color !== "" || item.size !== "" || item.imageLink !== "") {
  //           const colorArray = item.color.split(',');
  //           const sizeArray = item.size.split(',');
  //           const imagesArray = [];
  //           imagesArray.push(item.imageLink);
  //           accumulator.push({
  //             ...item,
  //             color: colorArray,
  //             size: sizeArray,
  //             images: imagesArray,
  //           });
  //         }
  //         return accumulator;
  //       }, []);
  //       const filteredAllData = data.data.filter(item => sheetNamesToFilter.includes(item.sheetName));

  //       const updatedAllData = filteredAllData.reduce((accumulator, item) => {
  //         if (item.color !== "" || item.size !== "" || item.imageLink !== "") {
  //           const colorArray = item.color.split(',');
  //           const sizeArray = item.size.split(',');
  //           const imagesArray = [];
  //           imagesArray.push(item.imageLink);
  //           accumulator.push({
  //             ...item,
  //             color: colorArray,
  //             size: sizeArray,
  //             images: imagesArray,
  //           });
  //         }
  //         return accumulator;
  //       }, []);
  
  //       setWomensData(updatedData);
  //       setData(updatedData);
  //       setLoading(false);
  //       localStorage.setItem('allData', JSON.stringify(updatedAllData));

  //       // console.log('MUJERES STORE DATA > ', updatedData);
  //     });
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  
  const fetchData = async () => {
    try {
      const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=G9Y70TKpg3_zMJIDg1Zb1BNUX3QvZlN8HruKvU9vBdM8Vsu-V6w2Cx5q3oCHOqmbCNEjh4axc4DUWkfc1eUqR9gzDlisolCbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMwpOhq36CtnQItMg5j0hL08pR1MMtpWtgyujCTAPe0qcpOo942aDv-1nGmTfLM070wK6B7JdV45LK0oTMy089UeRO0rd8CSMNz9Jw9Md8uu&lib=MhpLCRi-dbxcPVauODzr0fwVH-hBlMqS6');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      const sheetNamesToFilter = ["polo_ralph_lauren", "victoria_secret", "michael_kors", "tommy_hilfiger",
        "calvin_klein", "steve_madden", "guess", "steps", "windsore_store"];
  
      const filteredData = data.data.filter(item => sheetNamesToFilter.includes(item.sheetName) && item.type === type);
  
      const updatedData = filteredData.reduce((accumulator, item) => {
        if (item.color !== "" || item.size !== "" || item.imageLink !== "") {
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
  

//   const fetchData = async () => {
//   try {
//     const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=G9Y70TKpg3_zMJIDg1Zb1BNUX3QvZlN8HruKvU9vBdM8Vsu-V6w2Cx5q3oCHOqmbCNEjh4axc4DUWkfc1eUqR9gzDlisolCbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMwpOhq36CtnQItMg5j0hL08pR1MMtpWtgyujCTAPe0qcpOo942aDv-1nGmTfLM070wK6B7JdV45LK0oTMy089UeRO0rd8CSMNz9Jw9Md8uu&lib=MhpLCRi-dbxcPVauODzr0fwVH-hBlMqS6');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();

//     const sheetNamesToFilter = ["polo_ralph_lauren", "victoria_secret", "michael_kors", "tommy_hilfiger",
//       "calvin_klein", "steve_madden", "guess", "steps", "windsore_store"];

//     // Only fetch and process a subset of data initially
//     const filteredData = data.data.filter(item => sheetNamesToFilter.includes(item.sheetName) && item.type === type).slice(0, 50);

//     const updatedData = filteredData.reduce((accumulator, item) => {
//       if (item.color !== "" || item.size !== "" || item.imageLink !== "") {
//         const colorArray = item.color.split(',');
//         const sizeArray = item.size.split(',');
//         const imagesArray = [item.imageLink];
//         accumulator.push({
//           ...item,
//           color: colorArray,
//           size: sizeArray,
//           images: imagesArray,
//         });
//       }
//       return accumulator;
//     }, []);

//     setWomensData(updatedData);
//     setData(updatedData);
//     setLoading(false);

//     // Store the entire data in localStorage for future use
//     localStorage.setItem('allData', JSON.stringify(data.data));
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

  const renderFilter = () => {
    let afterFilter = womensData?.filter(item => {
      // Check if the item's brand is in the specified brands array
      if (filtered.brands.length > 0 && !filtered.brands.includes(item.brand)) {
        return false;
      }
      if (
        filtered.sizes.length > 0 &&
        !item.size.some(size => filtered.sizes.includes(size))
      ) {
        return false;
      }
      if (filtered.prices.length > 0 && !filtered.prices.includes(item.price)) {
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

      return true; // Include the item if all conditions are met
    });
    setFilteredProducts(afterFilter);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(
    () => {
      if (!loading) {
        renderFilter();
      }
    },
    [filtered, loading]
  );

   return (
    <div className="prods-cont">
      {loading
        ? <div className="overlay">
            <div className="loading-spinner">
              <img
                src={loadingImg} // Replace with the path to your image
                alt="Loading..."
                className="spinner-image"
              />
              <br />
              <span style={{ color: 'white' }}>Loading...</span>
            </div>
          </div>
        : filteredProducts
          .filter(item => item.images && item.images.length > 0 && item.images[0] !== 'image_link') // Filter out items with empty or placeholder image links
          .map((item, i) => (
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
          ))
      }
      {!filteredProducts[0] && !loading && (
        <div className="favorite-empty">NO SE HA ENCONTRADO NINGUN ARTICULO</div>
      )}
    </div>
  );
};

export default Products;
