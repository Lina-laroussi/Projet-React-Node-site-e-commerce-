import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { register} from '../actions/UserActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



export default function RegisterScreen(props) {

   const [email ,setEmail] = useState('');
   const [name ,setName] = useState('');
   const [password ,setPassword ]= useState('');
   const [confirmPassword ,setConfirmPassword ]= useState('');
   const location = useLocation();

   const redirect = location.search ? location.search.split("=")[1]: '/';
  /* const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';*/

   const userRegister = useSelector((state)=> state.userSignin);
    const { userInfo , loading ,error } = userRegister;

    const dispatch = useDispatch();
    const navigate= useNavigate();
    const submitHandler = (e) =>{
        e.preventDefault();
        if (password !== confirmPassword) {
           alert('Password and confirm password are not match');
          } 
        else {
           dispatch(register(name, email, password));
    }
};
 
   useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
        
    }, [redirect, userInfo,navigate]);
  return(
   <div>
       <form className='form' onSubmit={submitHandler}>
          <div>
             <h1>Create Account</h1>
             {loading && <LoadingBox></LoadingBox>}
             {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
          <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder='Enter Name' required 
              onChange={ e =>setName(e.target.value) }></input>
          </div>
          <div>
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder='Enter Email' required 
              onChange={ e =>setEmail(e.target.value) }></input>
          </div>
           <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder='Enter Password' required 
              onChange={ e =>setPassword(e.target.value) }></input>
          </div>
           <div>
              <label htmlFor="Confirmpassword">Confirm Password</label>
              <input type="password" id="Confirmpassword" placeholder='Enter Confirm Password' required 
              onChange={ e =>setConfirmPassword(e.target.value) }></input>
          </div>
          <div>
              <label/>
              <button className='primary' type="submit">register</button>
          </div>
          <div>
              <label/>
              <div>
                  already have an account ?
                  <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
              </div>
          </div>
       </form>
  </div>
  )
}
