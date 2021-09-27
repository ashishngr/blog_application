import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../action/types';

const initialState = {
    user: {},
    token: localStorage.getItem("token"),
    username: null,
    email: null,
    password: null,
    profile: null,
    id: null,
    isAuthenticated: null, 
   

}
// auth reducer cases
export default function  (state = initialState, action){
    switch(action.type){
        case REGISTER_SUCCESS:
                toast("welcome....",{
                    position: toast.POSITION.TOP_RIGHT
                })
            const user = action.payload
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                id: user.id,
                usename: user.username,
                email: user.email,
                profile: user.profile
            };
        case REGISTER_FAIL:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false
            } ;

            case LOGIN_SUCCESS:
            const token  = jwtDecode(action.token);
                return{
                    ...state,
                    ...action.payload,
                    token: action.token,
                    username: token.username,
                    id: token.id,
                    email: token.email,
                    isAuthenticated: true 

                };
            case LOGOUT_SUCCESS:
                 localStorage.removeItem("token")   
                toast("LOGOUT SUCCESS...",{
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return{
                    user: {},
                    token: null,
                    username: null,
                    email: null,
                    password: null,
                    profile: null,
                    id: null,
                    isAuthenticated: null, 
                }
         default:
             return state;   
    }
}