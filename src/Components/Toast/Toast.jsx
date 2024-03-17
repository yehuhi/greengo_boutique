import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, duration, color, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(
    () => {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    },
    [duration, onClose]
  );

  return (
    <div
      className={`toast ${isVisible ? 'show' : 'hide'}`}
      style={{ backgroundColor: color }}
    >
      <div className="toast-content">
        <span>
          {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
