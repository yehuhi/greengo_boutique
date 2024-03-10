import React from 'react'
import { BsHandbagFill } from "react-icons/bs";
import './Profile.css'
const Profile = () => {

  return (
    <div style={{width:"100%", height:"100%", marginTop:"71px"}}>
        <div className='prof-content'>
            <div className='prof-title'><span>Datos Personales</span></div>
            <div className='order-div'>
                <span className='order-btn'>Mis Ordenes &nbsp;<BsHandbagFill className='bag'/></span>
            </div>
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
