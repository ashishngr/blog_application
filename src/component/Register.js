import React, {Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect} from 'react-router';
import {register} from '../action/authAction';
import {Link} from 'react-router-dom';
import authReducer from '../reducer/authReducer';
import { useForm } from 'react-hook-form';
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import Header from './Header';

const Registerr = () => {

    
    
   injectStyle();
   const dispatch = useDispatch();

   const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        profile: "",
        
   })
//    console.log("++++>", user)
const state = useSelector(state=> state.auth[0]) 
// console.log("@@@@====>", state);


let [userError, setUserError] = useState([]);
let [emailError, setEmailError] = useState([])
let [passwordError, setPasswordError] = useState([])
let [profileError, setProfileError] = useState([])


const handleSubmit = (e) =>{
    e.preventDefault()
    // conditions to check register form input fields error
    let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if(user.username.length ===  0){
        console.log('username is required')
        setUserError(['username required'])
    }
    if(user.email.length === 0|| !regexEmail.test(user.email)){
        console.log('email is required')
        setEmailError(['email is required and must be in email format'])
    }
    if(user.password.length === 0){
        console.log("password is required")
        setPasswordError(['password is required '])
    }
    if(user.profile.length === 0 ){
        console.log("profile is required")
        setProfileError(['Profile is required '])
    }
    
    console.log("errorlength=======>", user.username.length)
    console.log("error====>", userError)

    if(user.username.length !== 0 && user.email.length !== 0 && user.password.length !== 0 && user.profile.length !== 0 && regexEmail.test(user.email)){
        dispatch(register(user))
        setUser({
            username: "",
            email: "",
            password: "",
            profile: "",
        })
    }


    if(user.username.length !== 0){
        setUserError([''])
    }
    if(user.email.length !== 0 && regexEmail.test(user.email)){
        setEmailError([''])
    }
    if(user.password.length !== 0){
        setPasswordError([''])
    }
    if(user.profile.length !== 0){
        setProfileError([''])
    }

   
        
   };

    //if(state) return <Redirect to='/login'/>

    return (
        // register component 
        <Fragment>
            <Header />
            <div className="container">
                <h1>Register</h1>         
            <div>
            {/* registeration form   */}
            <form noValidate
            autoComplete="off"
            onSubmit = {handleSubmit}>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label for="Email">Username</label>
                    <input type = "text" className="form-control" id="Username" placeholder="Username" value={user.username} onChange={(e)=>setUser({...user, username: e.target.value})}/>
                </div>
                <div>
                    <span> <small className="text-danger"><p>{userError}</p></small></span>
                </div>
                </div>
                <div className="form-group col-md-4">
                      <label for="Email">Email</label>
                      <input type = "text" className="form-control" id="Email" placeholder="Email" value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}/>
                    <div>
                        <span> <small className="text-danger"><p>{emailError}</p></small></span>
                    </div>
                </div>
                <div className="form-group col-md-4">
                      <label for="Password">Password</label>
                      <input type = "password" className="form-control" id="Password" placeholder="Password" value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
                    <div>
                        <span> <small className="text-danger"><p>{passwordError}</p></small></span>
                    </div>
                </div>
                <div className="form-group col-md-4">
                      <label for="Profile">Profile</label>
                      <input type = "text" className="form-control" id="Profile" placeholder="Profile" value={user.profile} onChange={(e)=>setUser({...user, profile: e.target.value})}/>
                    <div>
                        <span> <small className="text-danger"><p>{profileError}</p></small></span>
                    </div>
                </div> 
              <div className="form-row"> 
              <button type="submit" class="btn btn-info btn-download btn-round pull-right makeLoading" >Register</button>
              <span className="px-2 bg-white text-gray-500">Or<Link to="/login">Login</Link></span>
              </div> 
            </form>
            </div>
            <div ><ToastContainer autoClose={2000} /></div>
            </div>  
        </Fragment>
    )
}
export default Registerr



