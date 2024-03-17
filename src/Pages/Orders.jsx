import React, { useEffect, useState } from 'react';
import './Orders.css';
import data from '../Components/Assets/data';
import { ShopState } from '../Context/ShopProvider';
import { FaRegClock } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { app, auth, db } from '../firebase/firebase';
import { getDatabase, ref, set, push, get } from 'firebase/database';

const Orders = () => {
  const {
    filtered,
    setFiltered,
    favorite,
    setFavorite,
    cart,
    setCart,
  } = ShopState();
  const [amountProd, setAmountProd] = useState(0);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [favoriteItemsEnd, setFavoriteItemsEnd] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const fetchOrders = async () => {
    const userId = auth.currentUser.uid;
    const ordersRef = ref(db, `orders/${userId}`);

    try {
      const snapshot = await get(ordersRef);
      let arr = [];
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        // Now you can use ordersData for further processing
        for (const key in ordersData) {
          if (ordersData) {
            const order = ordersData[key];
            arr.push(order);
            setFavoriteItemsEnd(arr);
            console.log('Orders data:', arr);
          }
        }
      } else {
        console.log('No orders found for the current user');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('orderItems'));
    console.log('Orders LOCAL STORAGE >>> ', items);
    setFavoriteItems(items);
  }, []);

  useEffect(
    () => {
      fetchOrders();
    },
    [favoriteItems]
  ); // Only depend on cartItems

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

  return (
    <div style={{ width: '100%', height: '100vh', marginTop: '81px' }}>
      <div className="your-bag-fav">
        <span
          className="title-fav"
          style={{
            fontSize: '27px',
            fontFamily: 'sans-serif',
            letterSpacing: '1.2px',
          }}
        >
          MIS ORDENES
        </span>
      </div>

      <div className="scrollable-container">
        <div style={{ marginBottom: '90px' }}>
          {favoriteItemsEnd.map((item, i) =>
            <div className="prod-desc" key={i}>
              <div className="dateOrder">
                <span className="order-line">
                  <FaRegCalendarAlt
                    style={{ color: 'green', marginRight: '2px' }}
                  />{' '}
                  <span style={{ color: 'black' }}>{item.orderDate}</span>
                </span>
                <span className="order-line">
                  <FaRegClock
                    style={{ color: 'green', marginRight: '2px' }}
                  />{' '}
                  <span style={{ color: 'black' }}>{item.status}</span>
                </span>
              </div>
              <div className="dateOrder" style={{ marginBottom: '10px' }}>
                <span className="order-line">
                  <span style={{ color: 'green' }}>
                    Orden:{' '}
                    <span style={{ color: 'black' }}>#{item.orderNum}</span>
                  </span>
                </span>
              </div>
              <div className="table-headersx">
                <div>
                  <span className="titles">Descripcion del Producto</span>
                </div>
                <div className="prod-actions" />
              </div>
              <div className="all-detailsx">
                <div className="detail">
                  <div className="detail-image">
                    <div className="img-detail">
                      <img
                        className="image-cart"
                        src={item.items[0].image}
                        alt="img"
                      />
                    </div>
                    <div className="data-details">
                      <span style={{ fontWeight: '600' }}>
                        {item.items[0].brand}
                      </span>
                      <span className="item-name">
                        {item.items[0].name}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="font-title">COLOR:</span>
                        <div
                          style={{
                            width: '20px',
                            marginLeft: '7px',
                            height: '20px',
                            backgroundColor: item.items[0].colorSelected,
                            border: '1px solid grey',
                            borderRadius: '50%',
                          }}
                        />
                      </div>
                      <div>
                        <span className="font-title">
                          PRECIO: ${item.items[0].new_price},000
                        </span>
                      </div>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="font-title">TALLA:</span>
                        <div style={{ display: 'flex', fontWeight: '600' }}>
                          <span style={{ marginLeft: '10px' }}>
                            {item.items[0].sizeSelected}
                          </span>
                        </div>
                      </span>
                      {isMobile ? <div className="price-remove-fav" /> : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
