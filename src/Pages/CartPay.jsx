import React, { useEffect, useState } from 'react';
import './CartPay.css';
import nequi_QR from '../Components/Assets/QR_NEQUI.png';
import Modal from '../Components/Modal/Modal';
import { app, auth, db } from '../firebase/firebase';
import { getDatabase, ref, set, push, get } from '../firebase/firebase';
// import { useAuth } from '../../Context/authContext/index';
import loadingImg from '../Components/Assets/logo2.png';
import { useNavigate } from 'react-router-dom';
import { ShopState } from '../Context/ShopProvider';

const CartPay = () => {
  const {
    filtered,
    setFiltered,
    favorite,
    setFavorite,
    cart,
    setCart,
    cartCount,
    setCartCount,
  } = ShopState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOutCityOpen, setIsModalOutCityOpen] = useState(false);
  const [totalForPay, setTotalForPay] = useState(0);
  const [itemsCart, setItemsCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const insertTransNum = () => {};

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = value => {
    setIsModalOpen(false);
    if (value !== 'close') {
      setIsLoading(true);

      setTimeout(() => {
        localStorage.setItem('cartItems', JSON.stringify([]));
        setCartCount('');
        navigate('/profile');
      }, 5000);
    }
  };

  useEffect(() => {
    const data_cart_pay =
      JSON.parse(localStorage.getItem('totalCartForPay')) || 0;
    setTotalForPay(data_cart_pay);
    const data_cart = JSON.parse(localStorage.getItem('itemsCart')) || 0;
    setItemsCart(data_cart);
  }, []);

  return (
    <div className="cart-container">
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
      <div className="title-cartpay">
        <p style={{ fontWeight: '600', letterSpacing: '1.2px' }}>
          Total a pagar -{' '}
          <span style={{ fontWeight: '100' }}>
            ${totalForPay !== 0 ? totalForPay + ',000' : ''}
          </span>
        </p>
      </div>
      <div className="cart-pay-cont">
        <div className="cart-cont-inside">
          <div className="cart-pay-col card">
            <div className="card-inside">
              <p className="text-qr">
                Escanea el codigo QR aca abajo si deseas realizar el pago
                mediante la <br />
                <span style={{ fontWeight: '600', color: '#7300b7' }}>
                  {' '}App de NEQUI
                </span>
              </p>
            </div>
            <div>
              <img className="img-card" src={nequi_QR} alt="QR" />
            </div>
            <div className="txt-btn">
              <p className="text-btn">
                Presione el siguiente boton para ingresar el Numero de la
                Transaccion despues de haber realizado el pago
              </p>
              <button onClick={openModal} className="qr-btn">
                Agregar No. de Transaccion
              </button>
            </div>
          </div>
          <div className="cart-pay-col">
            <div className="card-inside">
              <p className="text-qr">
                Escanea el codigo QR aca abajo si deseas realizar el pago
                mediante la <br />
                <span style={{ fontWeight: '600', color: 'red' }}>
                  {' '}App de DAVIPLATA
                </span>{' '}
              </p>
            </div>
            <div>
              <img className="img-card" src={nequi_QR} alt="QR" />
            </div>
            <div className="txt-btn">
              <p className="text-btn">
                Presione el siguiente boton para ingresar el Numero de la
                Transaccion despues de haber realizado el pago
              </p>
              <button onClick={openModal} className="qr-btn">
                Agregar No. de Transaccion
              </button>
            </div>
          </div>
          <div className="cart-pay-col">
            <div className="card-inside">
              <p className="text-qr">
                Escanea el codigo QR aca abajo si deseas realizar el pago
                mediante la <br />
                <span style={{ fontWeight: '600', color: 'blue' }}>
                  {' '}App de BANCOLOMBIA
                </span>
              </p>
            </div>
            <div>
              <img className="img-card" src={nequi_QR} alt="QR" />
            </div>
            <div className="txt-btn">
              <p className="text-btn">
                Presione el siguiente boton para ingresar el Numero de la
                Transaccion despues de haber realizado el pago
              </p>
              <button onClick={openModal} className="qr-btn">
                Agregar No. de Transaccion
              </button>
            </div>
          </div>
        </div>
      </div>
      {!isModalOutCityOpen
        ? <div className="txt-footer">
            <div
              className="txt-footer-x"
              onClick={() => {
                setIsModalOutCityOpen(!isModalOutCityOpen);
              }}
            >
              X
            </div>
            <p>
              <span style={{ fontWeight: '800' }}>IMPORTANTE</span> <br /> El
              pago de tu compra no incluye envios fuera la ciudad de
              Barranquilla.
            </p>
          </div>
        : ''}

      {isModalOpen && <Modal closeModal={closeModal} dataCart={itemsCart} />}
    </div>
  );
};

export default CartPay;
