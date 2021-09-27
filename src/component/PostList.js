import React from 'react'
import PostComponent from './PostComponent'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const PostList = () => {
    return (
        // post list component 
        <div class="col-sm-6">
            <h1>All Post</h1>
            <div >
                <PostComponent />
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default PostList
