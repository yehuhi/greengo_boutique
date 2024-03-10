import React from 'react'
import { BsHandbagFill } from "react-icons/bs";
import './Profile.css'
import { useAuth } from '../Context/authContext/';      
import { doSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { PiSignIn } from "react-icons/pi";



const Profile = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();


  return (
    <div className='content-prof'>
       <div className='prof-title'><span >Datos Personales</span></div>
       
       <div className='order-div'>
       <span className='order-btn'>Mis Ordenes &nbsp;<BsHandbagFill className='bag'/></span>
       {
        userLoggedIn?
        <button className='order-btn' onClick={()=>{doSignOut().then(()=>{navigate('/')})}}>Desconectarse&nbsp;&nbsp;<IoIosLogOut className='sign'/></button>
        :<button className='order-btn' onClick={()=>{navigate('login')}}>Conectarse&nbsp;&nbsp;<PiSignIn className='bag'/></button>
       }
       </div>
        <div className='prof-content'>
            <div className='form'>
                <label htmlFor="fullname">Nombre</label>
                <input className='inputs' type="text" name="fullname" id="fullname" />
                <label htmlFor="email">Email</label>
                <input className='inputs' type="email" name='email'/>
                <label htmlFor="tel">Telefono</label>
                <input className='inputs' type="tel" name="tel" id="tel"/>
                <label htmlFor="city">Ciudad</label>
                <input className='inputs' type="text" name="city" id="city" />
                <label htmlFor="address">Direccion</label>
                <input className='inputs' type="text" name="address" id="address" />
            
                <input className='input-submit' type="submit" value="Guardar datos" />
            </div>
        </div>
        
    </div>
  )
}

export default Profile
