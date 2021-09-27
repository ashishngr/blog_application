import React from 'react'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../action/authAction';

const DashboardHeader = () => {

    const dispatch = useDispatch()
    const history = useHistory();

    //Admin Logout function
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
        history.push('/')
    }
    // add post function
    const addPost = (e) =>{
        e.preventDefault();
        history.push('/addPost')
    }
    // manage post function
    const ManagePost = (e) => {
        e.preventDefault();
        history.push('/managePost')
       
    }
    // manage comment function
    const ManageComment = (e) =>{
        e.preventDefault();
        history.push('/manageComment');
    }
    // this function is used to redirect user to the admin landing page
    const AdminPage = (e)=>{
        e.preventDefault();
        history.push('/dashboard')
    }
    return (
        // ==========================================================================
        // dashbord header component
        // ==========================================================================
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: "100%", top: "0", overflow: "hidden"}}> 
            <a class="navbar-brand" onClick={AdminPage}>Blog System(Admin)</a>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link"  onClick={addPost}>Add Post</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" onClick={ManagePost}>Manage Post</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"  onClick={ManageComment} >Manage Comment</a>
                </li>
                </ul>
            </div>
            <div class="collapse navbar-collapse" id="navbarText" style={{float: "right", marginLeft: "50rem"}}>
                <ul class="navbar-nav bg-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#" onClick={handleLogout} >Logout</a>
                </li>
                </ul>
            </div>
        </nav>
        </div>
    )
}

export default DashboardHeader
