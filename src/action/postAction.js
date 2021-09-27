import axios from "axios";
import { toast } from 'react-toastify';
import { POST_LIST, CREATE_POST,GET_SINGLE_POST, UPDATE_POST } from "./types";

// ===========================================================================
// CREATE POST ACTION  - this action is used 
// ===========================================================================
export const createPost = (post) =>{
    return (dispatch) =>{
        axios.post("http://localhost:3006/postApi/createPost", post).then((response)=>{
            console.log("add post", response)
            dispatch({
                type: CREATE_POST,
                payload: response
            })
        })
        .catch(error=>{
            console.log('error **** ',error.response)  
            toast.error('Post fail')         
        })
        toast.success('Post is created')
    }
    
}

// ===================================================================
// POST LIST ACTION
// ===================================================================

export const postList = (post) => {
   
    return {
        type: POST_LIST,
        payload: post 
    }
}
// ===================================================================
// GET SINGLE POST BY ID  
// ===================================================================

export const getSinglePost = (post) => {
    return {
        type: GET_SINGLE_POST,
        payload:post
    }
}

// =======================================================================================
// UPDATE POST ACTION - this action is used update post on admin pannel 
// =======================================================================================
export const updatePost = (post, id) =>{
    return (dispatch) => {
        axios.put(`http://localhost:3006/postApi/${id}`,post).then((response)=>{
            dispatch({
                type: UPDATE_POST,
                payload: post,
                id
                
            })
        })
        .catch(error=>{
            console.log('error **** ',error.response) 
        })
    }
}

