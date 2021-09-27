import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getAllComment, deleteComment, updateComment } from '../../action/commentAction'
import { useParams } from 'react-router'
import { useHistory } from 'react-router';

const ManageComment = () => {

    const[comment, setComment] = useState({
        status: ''
    });

    const dispatch  = useDispatch();
    const comments = useSelector((state)=>state.comment.comment)
    console.log("comments", comments)

    // function to fetch all the comments
    const fetchComment = async()=>{
        const response = await axios.get("http://localhost:3006/commentApi/allComments").catch((error)=>{
            console.log(error)
        })
        console.log("))))):)", response.data.data.comments)
        dispatch(getAllComment(response.data.data.comments))

    }
    useEffect(()=>{
        fetchComment()
    }, [])

    const params = useParams();
    const history = useHistory();

    // update function - this function render user to update comment page
    const update = async(e, id) =>{
        e.preventDefault();
        history.push(`/manageComment/updateComment/${id}`)
    }

    return (
        // maintain comment component  
        <div>
            <div>
                 <h3 style={{marginLeft: "30%"}}>Manage Comment</h3>
            <div className="container">
                {/* table to show all comments*/}
                    <table class="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">#Id</th>
                            <th scope="col">Status</th>
                            <th scope="col">Author</th>
                            <th scope="col">email</th>
                            <th scope="col">Update</th>
                            </tr>
                        </thead>

                        <tbody>
                        {/* render all comment data in table body using map function */}
                        {comments.map((comment)=>{
                        let {id,status, email, author} = comment
                        if(status === '1'){
                            status = 'Not Approved'
                        }else{
                            status = 'Aproved'
                        }
                        return (
                            <tr key = {id}>
                                <td>{id}</td>
                                <td>{status}</td>
                                <td>{author}</td>
                                <td>{email}</td>
                                <td><button type="button" class="btn btn-warning btn-download btn-round pull-right makeLoading" onClick = {(e)=>update(e, comment.id)}>Update</button></td>
                                </tr>
                            )
                        })}     
                            
    </tbody>
    </table>
    </div>
    </div>
    </div>
    )
}
export default ManageComment
