import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Modal.css';

const YOUR_SERVICE_ID = 'service_66m4mra';
const YOUR_TEMPLATE_ID = 'template_wsw8hsh';
const YOUR_PUBLIC_KEY = 'user_t7UGGaRJWwsJYYtxAUIIO';

const Modal = ({ closeModal, dataCart }) => {
  const handleTransactionNumber = (e) => {
    e.preventDefault();

    let dataBuyed = `NUMERO DE TRANSFERENCIA: <b>${e.target.elements.trans_number.value}</b><br><br>
    <b>PRODUCTOS ADQUIRIDOS:</b><br>
     ${dataCart[0].brand}<br>
     ${dataCart[0].name}<br>
     PRECIO: $${dataCart[0].new_price},000<br>
     COLOR: ${dataCart[0].colorSelected}<br>
     TALLA: ${dataCart[0].sizeSelected}<br>`;

    let formData = {
      from_name: 'FARINA LUQUE',
      email: 'boutiquegreengo@gmail.com',
      message: dataBuyed
    };

    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, formData, YOUR_PUBLIC_KEY)
    .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );

    closeModal();
  };

  useEffect(() => {
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
  }, [closeModal]);

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <p style={{ marginTop: "10px", fontWeight: "600" }}>Inserte el Numero de la Transaccion</p>
        <form onSubmit={handleTransactionNumber}>
          <div className='input-txt' style={{marginTop:"20px"}}>
            <input autoComplete="off" style={{ outline: "none", width: "310px", height: "35px", border: "1px green solid", paddingLeft: "20px", borderRadius: "7px" }} type="text" name="trans_number" id="tnumber" />
          </div>
          <div className='btn-div' style={{marginTop:"15px"}}>
            <button type="submit" className='btn'>ENVIAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
