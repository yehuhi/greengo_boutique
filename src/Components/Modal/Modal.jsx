import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import './Modal.css';
import { app, auth, db } from '../../firebase/firebase.js';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import { useAuth } from '../../Context/authContext/index';
import { useNavigate } from 'react-router-dom';

const YOUR_SERVICE_ID = 'service_66m4mra';
const YOUR_TEMPLATE_ID = 'template_wsw8hsh';
const YOUR_PUBLIC_KEY = 'user_t7UGGaRJWwsJYYtxAUIIO';

const Modal = ({ closeModal, dataCart }) => {
  const [userData, setUserData] = useState('');

  const navigate = useNavigate();
  const handleTransactionNumber = async e => {
    e.preventDefault();

    let productsTableRows = '';
    let totalPrice = 0;

    // Generate table rows for each product and calculate total price
    dataCart.forEach(product => {
      const productTotalPrice = product.new_price * product.amount;
      totalPrice += productTotalPrice;
      productsTableRows += `  
        <tr>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.amount}</td>
            <td>$${product.new_price},000</td>
            <td>${product.colorSelected}</td>
            <td>${product.sizeSelected}</td>
            <td>$${productTotalPrice},000</td>
        </tr>
    `;
    });

    // Add total price row to the table
    let totalPriceRow = `
    <tr class="total-price">
      <td colspan="6"><b>Total Price:</b></td>
      <td><b>$${totalPrice},000</b></td>
    </tr>
    `;

    let dataBuyed = `
    <table id="customers">
      <tr>
        <th>Product Name</th>
        <th>Brand</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Color</th>
        <th>Size</th>
        <th>Total Price</th>
      </tr>
      ${productsTableRows}
      ${totalPriceRow}
    </table>
    `;

    let formData = {
      from_name: `${userData}`,
      email: 'boutiquegreengo@gmail.com',
      message: dataBuyed,
    };

    // emailjs
    //   .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, formData, YOUR_PUBLIC_KEY)
    //   .then(
    //     () => {
    //       console.log('SUCCESS!');
    //     },
    //     error => {
    //       console.log('FAILED...', error.text);
    //     }
    //   );

    localStorage.setItem('cartItems', JSON.stringify([]));
    // navigate('/profile');
    closeModal();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const db_data = getDatabase(app);
      const userId = auth.currentUser.uid;
      const userRef = ref(db_data, `users/${userId}`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val().userName);
          // console.log("userData > ", snapshot.val());
        } else if (auth.currentUser) {
          setUserData(auth.currentUser.displayName);
          // console.log("userData > ", auth.currentUser.displayName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(
    () => {
      // Add event listener to close modal when clicking on close button
      const modal = document.getElementById('myModal');
      const closeBtn = document.getElementsByClassName('close')[0];
      closeBtn.onclick = () => {
        modal.style.display = 'none';
        closeModal(); // Close modal through parent function
      };

      // Clean up event listener on unmount
      return () => {
        closeBtn.onclick = null;
      };
    },
    [closeModal]
  );

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <p style={{ marginTop: '10px', fontWeight: '600' }}>
          Inserte el Numero de la Transaccion
        </p>
        <form onSubmit={handleTransactionNumber}>
          <div className="input-txt" style={{ marginTop: '20px' }}>
            <input
              autoComplete="off"
              style={{
                outline: 'none',
                width: '310px',
                height: '35px',
                border: '1px green solid',
                paddingLeft: '20px',
                borderRadius: '7px',
              }}
              type="text"
              name="trans_number"
              id="tnumber"
            />
          </div>
          <div className="btn-div" style={{ marginTop: '15px' }}>
            <button type="submit" className="btn">
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
