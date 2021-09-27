import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../action/authAction'
import { Redirect } from 'react-router-dom';
// import { ToastContainer } from "react-toastify";



const AdminLoginn = () => {

    // Credentials state management
    const [creds, setCreds] = useState({
        email: "",
        password: "",
    })

    const auth = useSelector((state)=>state.auth)
    const dispatch = useDispatch();

    // state management for input field errors
    const[emailError, setEmailError] = useState([])
    const[passwordError, setPasswordError] = useState([])

    // login function
    const handleSubmit = (e) =>{
        e.preventDefault();
        // conditions to check input field error
        let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if(creds.email.length === 0 || !regexEmail.test(creds.email)){
            console.log('email is required')
            setEmailError(['email is required and must be in format'])
        }
        if(creds.password.length === 0){
            console.log("password is required")
            setPasswordError(['password is required'])
        }
        if(creds.email.length !==0 && creds.password.length !== 0){
            dispatch(login(creds));
            
        } 
        if(creds.email.length !== 0 && regexEmail.test(creds.email)){
            setEmailError([''])
        }  
        if(creds.password.length !== 0){
            setPasswordError([''])
        }

        dispatch(login(creds));
        setCreds({
            email: "",
            password: "",
        })
    }
    


    if(auth.rows)return <Redirect to="/dashboard" />


    return (
    // ADMIN LOGIN - this component is used for user login to admin pannel
    <div className="container">
    <h1>Admin Login</h1>
    <div>
        {/* login form start from here */}
      <form noValidate autoComplete="off" onSubmit = {handleSubmit}>
          <div className="form-row">
              <div className="form-group col-md-4">
                  <label for="Email">Email</label>
                  <input type = "Email" className="form-control" id="Email" placeholder="Email" value={creds.email} onChange={(e)=>setCreds({...creds, email: e.target.value})}/>
              </div>
              <div>
                   <span> <small className="text-danger"><p>{emailError}</p></small></span>
              </div>
          </div>
          <div className="form-row">
              <div className="form-group col-md-4">
                  <label for="Password">Password</label>
                  <input type = "password" className="form-control" id="Password" placeholder="Password" value={creds.password} onChange={(e)=>setCreds({...creds, password: e.target.value})}/>
              </div>
              <div>
                   <span> <small className="text-danger"><p>{passwordError}</p></small></span>
              </div>
          </div> 
          <div className="form-row">
          <button type="submit" class="btn btn-primary">Admin Login</button>
          </div>
      </form>
    </div>
    {/* <spam><ToastContainer autoClose={2000} /></spam> */}
  </div>  
)
}
export default AdminLoginn
