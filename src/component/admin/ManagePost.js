import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { postList } from '../../action/postAction'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';



const ManagePost = () => {

    // manage state for posts 
    const [post, setPost] = useState({
        title: "",
        content: "",
        status: "",
        update_time: " ",
        tag: "",
        
    })

    const dispatch = useDispatch();
    let history = useHistory()

    // post update function 
    const update  = (e, id, title) => {
        console.log("post_id", id)
        console.log("title", title)
        history.push(`/managePost/updatePost/${id}`)
    }

    const posts = useSelector((state)=>state.post.post)
    console.log("render all post |||||=====>>>>>>====>>>>>>>", posts) 
    


    // fetch all post function 
    const fetchPost = async () =>{
        const response = await axios.get("http://localhost:3006/postApi/allPost").catch((error)=>{
            console.log(error)
        })
        console.log("))))):)", response.data.data.post)
        dispatch(postList(response.data.data.post)) 
    }

    useEffect(()=>{
        fetchPost();
    }, [])

    

    return (
        // manage post function  
        <div className="container">
            <h3 style={{marginLeft: "40%", marginBottom:"30px"}}>Manage Post</h3>
            {/* table to render all post starts here */}
            <table class="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#Id</th>
                    <th scope="col">Post Title</th>
                    <th scope="col">Number of  Comments</th>
                    <th scope="col">Status</th>
                   
                    <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {/* map all post data in table body */}
                     {posts && posts.map((post)=>{
                        let {id, title,status, total_comments} = post
                        
                        if(status=== '2'){
                            status = 'Draft'
                        } else if(status === '1'){
                            status = 'Public'
                        }
                        else{
                            status = 'Archived'
                        }
                        return (
                            <tr key = {id}>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{total_comments}</td>
                                <td>{status}</td>
                                <td><button onClick = {(e)=>update(e,id, title)} class="btn btn-info btn-download btn-round pull-right makeLoading">Update</button></td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
               
        </div>
    )
}

export default ManagePost
