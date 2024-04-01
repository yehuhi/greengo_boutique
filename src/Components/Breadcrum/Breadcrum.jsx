import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrum.css';
import { ShopState } from '../../Context/ShopProvider';

const Breadcrum = props => {
  const { breadCrum, setBreadCrum } = ShopState();

  let pageTitle = '';
  if (props.page === 'womens' || props.page.type === 'womens') {
    setBreadCrum('MUJERES');
    pageTitle = 'MUJERES';
  } else if (props.page === 'mens' || props.page.type === 'mens') {
    setBreadCrum('HOMBRES');
    pageTitle = 'HOMBRES';
  } else if (props.page === 'kids' && props.page.type === 'kids') {
    setBreadCrum('NIÑOS');
    pageTitle = 'NIÑOS';
  }

  return (
    <div className="bread-cont">
      <span style={{ cursor: 'pointer' }}>
        <Link
          to={`/${props.page.value
            ? props.page.value
            : props.page.type ? props.page.type : props.page}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          {`${breadCrum.toUpperCase()}`}
        </Link>
      </span>&nbsp;/&nbsp;
      <span style={{ cursor: 'pointer' }}>
        {`${(props.page.brand ? props.page.brand : '').toUpperCase()}`}
      </span>&nbsp;{`${props.page.brand ? '/' : ''}`}&nbsp;
      <span style={{ cursor: 'pointer' }}>
        {`${(props.page.category ? props.page.category : '').toUpperCase()}`}
      </span>
    </div>
  );
};

export default Breadcrum;
