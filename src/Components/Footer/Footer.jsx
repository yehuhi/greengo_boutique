import React from 'react';
import logo from '../Assets/logo2.png';
import { Link } from 'react-router-dom';
import { BsInstagram } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <img className="footer-img" src={logo} alt="logo" />
      <div className="footer-txt">
        <div className="texts">
          <span className="txt-span">
            Somos una tienda de ropa importada con precios competitivos de las
            mejores marcas internacionales para todas las edades.
          </span>
          <span className="txt-span">
            Tambien recibimos pedidos de productos que no encuentren en nuestar
            pagina web.
          </span>
        </div>

        <div className="footer-links">
          <div className="link-foo">
            <Link to={'/womens'}>Mujeres</Link>
          </div>
          <div className="link-foo">
            <Link to={'/mens'}>Hombres</Link>
          </div>
          <div>
            <Link to={'/kids'}>Ninos</Link>
          </div>
        </div>
      </div>
      <div className="icons-footer">
        <div className="icons-foo">
          <BsInstagram />
        </div>
        <div className="icons-foo">
          <FaTiktok />
        </div>
        <div className="icons-foo">
          <FaFacebookSquare />
          <div />
        </div>
      </div>
      <div />
    </div>
  );
};

export default Footer;
