import { CREATE_COMMENT, GET_ALL_COMMENT, DELETE_COMMENT, ACTIVE_COMMENT_LIST, UPDATE_COMMENT, GET_SINGLE_COMMENT } from "./types";
import axios from 'axios';
import { toast } from 'react-toastify';


export const createComment =  (comment) =>{


// ==========================================================================================
// create comment action - this action is used to create a new comment on frontent 
// ==========================================================================================
    return (dispatch) =>{
        axios.post("http://localhost:3006/commentApi/createComment",comment).then((response)=>{
            console.log("add comment", response)
            dispatch({
                type: CREATE_COMMENT,
                payload: response
            })
        })
        .catch(error=>{
            console.log('error **** ',error.response)
        })
        toast.success('Comment is created')
    }
}
// =================================================================================================
// get all comment action - this action is used to get all the coments on admin pannel
// ================================================================================================
export const getAllComment = (comment)=>{
     return{
         type: GET_ALL_COMMENT,
         payload: comment
     }
}
// ==================================================================================================
// get single comment action - this action is used to get the data of single comment 
// ==================================================================================================
export const getSingleComment = (comment) =>{
    return{
        type: GET_SINGLE_COMMENT,
        payload: comment
    }
}

// =================================================================================================
// delete comment action - this action is used to delete comment on admin Dashbord
// =================================================================================================
export const deleteComment = (id)=>{
    return (dispatch) => {
        axios.delete(`http://localhost:3006/commentApi/deleteComment/${id}`).then((response)=>{
            dispatch({
                type: DELETE_COMMENT,
                id,
            })
        })
    }
}
// ================================================================================================
// active comment action - this action is used to show active comments on frontend 
// ================================================================================================
export const activeCommentList = (comment)=>{
 return{
     type: ACTIVE_COMMENT_LIST,
     payload: comment,
 }
}
// ================================================================================================
// update comment action - this action is used to update comment on admin dashbord
// ===============================================================================================
export const updateComment = (comment, id) =>{
    return (dispatch) => {
        axios.put(`http://localhost:3006/commentApi/updateComment/${id}`, comment).then((response)=>{
            dispatch({
                type: UPDATE_COMMENT,
                payload: comment,
                id,
            })
        })
        .catch(error=>{
           console.log("errrorrrr", error)
           
        })
    }
}
