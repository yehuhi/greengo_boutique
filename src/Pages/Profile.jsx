import React, { useEffect, useState } from 'react';
import { BsHandbagFill } from 'react-icons/bs';
import './Profile.css';
import { useAuth } from '../Context/authContext/';
import { doSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { PiSignIn } from 'react-icons/pi';
import { app, auth, db } from '../firebase/firebase';
import { getDatabase, ref, set, push, get } from 'firebase/database';

const Profile = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const saveOrUpdateData = async () => {
    const db = getDatabase(app);
    const userId = auth.currentUser.uid;
    const userRef = ref(db, `users/${userId}`);

    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        // If data exists, update it
        await set(
          userRef,
          {
            userName: fullname,
            email,
            phone,
            city,
            address,
          },
          { merge: true }
        );
        alert('DATA UPDATED');
      } else {
        // If data doesn't exist, save it
        const newData = push(ref(db, 'users'));
        await set(newData, {
          userName: fullname,
          email,
          phone,
          city,
          address,
        });
        alert('DATA SAVED');
      }
    } catch (error) {
      console.error('Error saving/updating data:', error);
      alert('Error saving/updating data');
    }
  };

  const fetchData = async () => {
    console.log('auth > ', auth);
    const db_data = getDatabase(app);
    const userId = auth.currentUser.uid;
    const userRef = ref(db_data, `users/${userId}`);

    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setFullname(userData.userName);
        setEmail(userData.email);
        setPhone(userData.phone);
        setCity(userData.city);
        setAddress(userData.address);
      } else if (auth.currentUser) {
        setFullname(auth.currentUser.displayName);
        setEmail(auth.currentUser.email);
        setPhone(auth.currentUser.phoneNumber);
        setCity('');
        setAddress('');
      } else {
        alert('No data available for the current user');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-prof">
      <div className="prof-title">
        <span>Datos Personales</span>
      </div>

      <div
        className="order-div"
        onClick={() => {
          navigate('/orders');
        }}
      >
        <span className="order-btn">
          Mis Ordenes &nbsp;<BsHandbagFill className="bag" />
        </span>
        {userLoggedIn
          ? <button
              className="order-btn"
              onClick={() => {
                doSignOut().then(() => {
                  navigate('/login');
                });
              }}
            >
              Desconectarse&nbsp;&nbsp;<IoIosLogOut className="sign" />
            </button>
          : <button
              className="order-btn"
              onClick={() => {
                navigate('/login');
              }}
            >
              Conectarse&nbsp;&nbsp;<PiSignIn className="bag" />
            </button>}
      </div>
      <div className="prof-content">
        <div className="form">
          <label htmlFor="fullname" className="labels">
            Nombre
          </label>
          <input
            value={fullname}
            onChange={e => {
              setFullname(e.target.value);
            }}
            className="inputs"
            type="text"
            name="fullname"
            id="fullname"
          />
          <label className="labels" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            className="inputs"
            type="email"
            name="email"
          />
          <label className="labels" htmlFor="tel">
            Telefono
          </label>
          <input
            value={phone}
            onChange={e => {
              setPhone(e.target.value);
            }}
            className="inputs"
            type="tel"
            name="tel"
            id="tel"
          />
          <label className="labels" htmlFor="city">
            Ciudad
          </label>
          <input
            value={city}
            onChange={e => {
              setCity(e.target.value);
            }}
            className="inputs"
            type="text"
            name="city"
            id="city"
          />
          <label className="labels" htmlFor="address">
            Direccion
          </label>
          <input
            value={address}
            onChange={e => {
              setAddress(e.target.value);
            }}
            className="inputs"
            type="text"
            name="address"
            id="address"
          />

          <input
            onClick={() => {
              saveOrUpdateData();
            }}
            className="input-submit"
            type="submit"
            value="Guardar datos"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
