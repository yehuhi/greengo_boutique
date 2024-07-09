import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import './Login.css';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import {
  doSignInWithEmailAndPassword,
  doSignWithGoggle,
} from '../../../firebase/auth';
import { useAuth } from '../../../Context/authContext/';
import Toast from '../../../Components/Toast/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigninIn, setIsSigninIn] = useState(false);
  const [errorMesg, setErrorMsg] = useState('');
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showWarningToast, setShowWarningToast] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    if (!isSigninIn) {
      setIsSigninIn(true);
      await doSignInWithEmailAndPassword(email, password).catch(err => {
        navigate('/login');
        setShowWarningToast(true);
        setIsSigninIn(false);
        setErrorMsg('Inserta datos correctos');
      });
    }
  };

  const onGoogleSignIn = async e => {
    e.preventDefault();
    if (!isSigninIn) {
      setIsSigninIn(true);
      await doSignWithGoggle().catch(err => {
        setIsSigninIn(false);
        setErrorMsg(err);
      });
    }
  };

  return (
    <div className="login_content">
      {userLoggedIn && <Navigate to={'/profile'} replace={true} />}
      <div className="content_form">
        <div className="title">
          <span style={{ letterSpacing: '1.2px' }}>Bienvenidos de Nuevo!</span>
        </div>
        <div className="inputs_form">
          <div className="input_fields_login">
            <span className="field-name">Email</span>
            <input
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              className="input_form"
              type="email"
              name="email"
              id="email"
            />
          </div>

          <div className="input_fields_login">
            <span className="field-name">Contraseña</span>
            <input
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
              className="input_form"
              type="password"
              name="passw"
              id="passw"
            />
          </div>
          {errorMesg &&
            <span style={{ color: 'orange', fontSize: '14px' }}>
              {errorMesg}
            </span>}
          <input
            onClick={e => {
              onSubmit(e);
            }}
            className="submit_btn"
            type="submit"
            value="Conectarse"
          />
        </div>
        <div>
          <span className="no_register">
            No tienes una cuenta?<span>
              &nbsp;
              <NavLink to="/signup" className="signup_btn">
                Resgistrarse
              </NavLink>
            </span>
          </span>
        </div>
        <div className="line">
          <div style={{ borderBottom: '1px white solid', width: '100%' }}>
            <span />
          </div>
        </div>
        <div
          onClick={e => {
            onGoogleSignIn(e);
          }}
          className="google_btn"
        >
          <FaGoogle />&nbsp;&nbsp;Cuenta de Google
        </div>
      </div>
      {showWarningToast &&
        <Toast
          message="Datos Errados!"
          duration={3000}
          color="orange"
          onClose={() => setShowWarningToast(false)}
        />}
    </div>
  );
};

export default Login;
