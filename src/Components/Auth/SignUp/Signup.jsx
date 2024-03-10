import React, { useState } from 'react'
import '../Login/Login.css'
import { NavLink, Navigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from '../../../Context/authContext/index';      


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMesg, setErrorMsg] = useState('');
    const { userLoggedIn } = useAuth();
    // console.log("userLoggedIn > ", userLoggedIn);
    const onSubmit = async(e)=>{
        e.preventDefault();
        if(!isRegistering){
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password);
        }
    };

  return (
    <div className='signup_content'>
        {
            userLoggedIn && (<Navigate to={'/profile'} replace={true}/>)
        }
        <div className='content_form'>
            <div className="title-signup">
                <span style={{letterSpacing:"1.2px"}}>Unete a nosotros!</span>
            </div>
            <div className='inputs_form_signup'>
                <div className='input_fields'>
                    <span style={{color:"white"}}>Email</span>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='input_form' type="email" name="email" id="email" />
                </div>
                
                <div className='input_fields'>
                    <span style={{color:"white"}}>Contraseña</span>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='input_form' type="password" name="passw" id="passw" />
                </div>

                <div className='input_fields'>
                    <span style={{color:"white"}}>Confirmar Contraseña</span>
                    <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} className='input_form' type="password" name="passw" id="passw" />
                </div>
                {
                    errorMesg && (
                        <span style={{color:"green", fontSize:"14px"}}>{errorMesg}</span>
                    )
                }
                <input onClick={(e)=>{onSubmit(e)}} className='submit_btn' type="submit" value="Registrarse" />
            </div>
        </div>
      
    </div>
  )
}

export default SignUp

