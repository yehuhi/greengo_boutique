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
            <Link className="links-foo" to={'/womens'}>
              MUJERES
            </Link>
          </div>
          <div className="link-foo">
            <Link className="links-foo" to={'/mens'}>
              HOMBRES
            </Link>
          </div>
          <div className="link-foo3">
            <Link className="links-foo" to={'/kids'}>
              NIÑOS
            </Link>
          </div>
        </div>
      </div>
      <div className="icons-footer">
        <div className="icons-foo">
          <Link
            className="icons-foo"
            to={'https://www.instagram.com/Greengoboutique/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram />
          </Link>
        </div>
        <div className="icons-foo">
          <Link
            className="icons-foo"
            to={'https://www.tiktok.com/explore'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </Link>
        </div>
        <div className="icons-foo">
          <Link
            className="icons-foo"
            to={'https://www.facebook.com/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookSquare />
          </Link>
          <div />
        </div>
      </div>
      <div />
    </div>
  );
};

export default Footer;
