import React, { useState, useEffect } from 'react';
import Filter from '../Components/Filter/Filter';
import Products from '../Components/Products/Products';
import './Womens.css';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import { ShopState } from '../Context/ShopProvider';

const Womens = ({ filterBy }) => {
  const { filtered, setFiltered } = ShopState();
  const [openFilters, setOpenFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const toggleFilters = () => {
    setOpenFilters(!openFilters);
  };

  return (
    <div className="women-cont">
      <Breadcrum page={'womens'} />
      <div className="filters">
        {isMobile &&
          <div className="open-filters" onClick={toggleFilters}>
            {openFilters ? 'CERRAR FILTROS' : 'FILTROS'}
          </div>}
        {isMobile && openFilters && <Filter />}
        {/* {!isMobile && <Filter />} Always render Filter for non-mobile */}
      </div>
      <div className="new-container">
        {!isMobile && <Filter />}
        <Products />
      </div>
    </div>
  );
};

export default Womens;
