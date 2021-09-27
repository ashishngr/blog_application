import axios from 'axios';
import { toast } from 'react-toastify';

import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from './types'

//=========================================================================================
// register action - this action is used to register a new user
// ========================================================================================
 
export const register =   (user) =>{
    return (dispatch)=>{


        return axios.post("http://localhost:3006/auth/register", user).then((response)=>{
            console.log("****", response.data);
            
        dispatch({
            type:  REGISTER_SUCCESS,
            payload: response.data.data.user,
            
        })

       
        }
        )
        .catch(error=>{
                    console.log('error **** ',error.response)
                    toast.error(error.response?.data,{
                        position: toast.POSITION.TOP_CENTER
                    })
                })         
    }
}

//=================================================================================
// login Action - this action is used for login
// ================================================================================   
export  const login = (creds) => {
 return (dispatch) =>{
     axios.post('http://localhost:3006/auth/login', creds).then((response)=>{
         localStorage.setItem("token", response.data.token)
         console.log("______<<<<<<<>>>>>>",response.data.data.user);
         dispatch({
             type:LOGIN_SUCCESS,
             token: response.data.token,
             payload: response.data.data.user    
             
         }
         )        
     }).catch((error)=>{
         console.log(error.response)
         toast.error('Login fails or invalid credentials')
     })    
 }
}
// ========================================================================
// logout action  - this action is used to logout 
// ========================================================================

export const logout = () => {
    return(dispatch)=>{
        axios.get("http://localhost:3006/auth/logout").then((response)=>{
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: response.data
            })
        })
    }
}