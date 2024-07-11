// src/components/WhatsAppButton.js
import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';

const WhatsAppButton = () => {
  const phoneNumber = '+573023608959';

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '10px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
      }}
    >
      <IoLogoWhatsapp style={{ fontSize: '40px' }} />
    </a>
  );
};

export default WhatsAppButton;
