import React from 'react'
import { useHistory } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import {logout} from '../action/authAction'



const Header = () => {
    const state = useSelector(state=>state)
    console.log(state);
    const token = localStorage.getItem("token")
    console.log("+++++=>", token)
    const dispatch = useDispatch(); 
    let history = useHistory();

    // function to redirect login page
    const handleLogin = (e) =>{
        e.preventDefault();
        history.push('/login')
    }
    // logout function
    const handleLogout = (e) =>{
        e.preventDefault();
        dispatch(logout());
        history.push('/')
    }
    // function to redirect register page
    const handleRegister = (e) =>{
        e.preventDefault();
        history.push('/register')
    }
    // function to redirect landing page on frontend
    const landingPage  = (e) =>{
        e.preventDefault();
        history.push('/')
    }
    
    // arrow function to handle nav bar accordingly
    const RenderMenu = ()=>{
        if(token){
            return(
                <>
                 <a class="navbar-brand" onClick={landingPage}>Blog System</a>
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" onClick={landingPage} >Posts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onClick={handleLogout}>Logout</a>
                </li>
                </ul>
                </>
            )
        } else{
            return(
            <>    <a class="navbar-brand" onClick={landingPage}>Blog System</a>
                <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" onClick={landingPage} >Posts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"  onClick={handleLogin}>Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"  onClick={handleRegister} >Register</a>
                </li>
                </ul>
                

               </div>
            </>
            )
        }
    }
    
    return (
        // header component
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: "100%", top: "0", overflow: "hidden"}}>
            <RenderMenu />
        </nav>
    )
}
export default Header       
