import React, {useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { login } from '../action/authAction'
import {Link} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from './Header';

const Loginn = () => {
    
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    console.log("AUTH++++++>", auth);
    // states to handle login creds.
    const [creds, setCreds] = useState({
        email:"",
        password: "",
        
    })

    // states to handle login forn input field errors
    const[emailError, setEmailError] = useState([])
    const[passwordError, setPasswordError] = useState([])

    // login function
    const handleSubmit = (e) => {
        e.preventDefault();
        // conditions to check errors
        let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if(creds.email.length === 0 && !regexEmail.test(creds.email)){
            console.log('email is required')
            setEmailError(['email is required and must be in format'])
        }
        if(creds.password.length === 0){
            console.log("password is required")
            setPasswordError(['password is required'])
        }
        if(creds.email.length !==0 && creds.password.length !== 0 && regexEmail.test(creds.email)){
            dispatch(login(creds));
            setCreds({
            email: "",
            password: "",
        }) 
        } 
        if(creds.password.length !== 0){
            setPasswordError([''])
        }  
        if(creds.email.length !== 0 && regexEmail.test(creds.email)){
            setEmailError([''])
        }  
    } 
    

    if(auth.rows) return <Redirect to="/" />


    return (
        // frontend login component
        <>
        <Header />
        <div className="container">
        <h1>Login</h1>
 
    <div>
        {/* login form */}
      <form noValidate
          autoComplete="off"
          onSubmit = {handleSubmit}>
               
          <div className="form-row">
              <div className="form-group col-md-4">
                  <label for="Email">Email</label>
                  <input type = "Email" className="form-control" name="Email" placeholder="Email" value={creds.email} onChange={(e)=>setCreds({...creds, email: e.target.value})} />
                        
              </div>
              <div>
                   <span> <small className="text-danger"><p>{emailError}</p></small></span>
              </div>
          </div>
          <div className="form-row">
              <div className="form-group col-md-4">
                  <label for="Password">Password</label>
                  <input type = "password"  className={`form-control `} name="password" placeholder="Password" value={creds.password} onChange={(e)=>setCreds({...creds, password: e.target.value})} />
              </div>
              <div>
                   <span> <small className="text-danger"><p>{passwordError}</p></small></span>
              </div>  
          </div>
          
          <div className="form-row">
          <button type="submit" class="btn btn-info btn-download btn-round pull-right makeLoading" >Login</button>
          <span className="px-2 bg-white text-gray-500">Or<Link to="/adminLogin">Admin Login</Link></span>
          </div>
       </form>
    </div>
    <div>   
    </div>
       <spam><ToastContainer autoClose={2000} /></spam> 
    </div> 
  </> 
    )
}

export default Loginn
