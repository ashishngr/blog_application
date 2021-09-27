import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ActiveComments from './ActiveComments';
import '../css/FrontEndPost.css'
import '../css/detailPost.css'
import Modal from 'react-bootstrap/Modal'
import { createComment } from '../action/commentAction';
import { ToastContainer } from "react-toastify";

const DetailPost = () => {
   
    const token = localStorage.getItem("token");
    console.log("token====>", token)


    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[createTime, setCreateTime] = useState("");
    const[tag, setTag] = useState("")
    const [show, setShow] = useState(false);

    // function to handle show and hide of modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const params = useParams();
    const dispatch = useDispatch()


    const [comment, setComment] = useState({
        content: "",
        author: "",
        post_id: params.id,
        status: '1',
        email: "",
        url: ""
    })

    
    //function to fetch post data   
    const fetchPost = async() => {
        const response = await axios.get(`http://localhost:3006/postApi/post/${params.id}`).catch((error)=>{
                console.log(error);
        })
        console.log("response--data", response.data.data.post[0])
        setContent( response.data.data.post[0].content)
        setTitle( response.data.data.post[0].title)
        setTag( response.data.data.post[0].tag)
        setCreateTime( response.data.data.post[0].create_time)
    }
    useEffect(()=>{
            fetchPost();

    },[])

    

    // state to handle errors of create comment form input  field
    const [contentErr, setContentErr] = useState([])
    const [authorErr, setAuthorErr] = useState([])
    const [emailErr, setEmailErr] = useState([])
    const [urlErr, setUrlErr] = useState([])

    const handleSubmit = (e) =>{
        e.preventDefault();
        // conditions to check create comment input field error
        let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if(comment.author.length ===  0){
            console.log('author is required')
            setAuthorErr(['author required'])
        }
        if(comment.content.length ===  0){
            console.log('ucontent is required')
            setContentErr(['content required'])
        }
        if(comment.email.length ===  0 || !regexEmail.test(comment.email)){
            console.log('username is required')
            setEmailErr(['Email is required and must be in email format'])
        }
        if(comment.url.length ===  0){
            console.log('username is required')
            setUrlErr(['content required'])
        }
        if(comment.author.length !==  0 && comment.content.length !==  0 && comment.email.length !==  0 && regexEmail.test(comment.email) && comment.url.length !==  0 ){
            dispatch(createComment(comment))
            setComment({
                content: "",
                author: "",
                post_id: params.id,
                status: '1',
                email: "",
                url: ""
            })
            setShow(false)
        }
        if(comment.author.length !== 0){
            setAuthorErr([''])
        }
        if(comment.content.length !== 0){
            setContentErr([''])
        }
        if(comment.email.length !== 0 && regexEmail.test(comment.email)){
           setEmailErr(['']) 
        }   
        if(comment.url.length !== 0){
            setUrlErr([''])
        }     
    }
     
    return (
        // detail post page component
        <>
            <div>
                <h3 style = {{marginLeft: "40%"}}>Post Detail With Comment</h3>                           
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
                        <div class="container bootstrap snippets bootdey">
                            <div class="row">
                                <div class="post-list">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <h4>
                                                <a hre="#" class="username">{title}</a>
                                                <label class="label label-info">#{tag}</label>
                                            </h4>
                                            <h5> 
                                                <i class="fa fa-calendar">{createTime}</i>
                                            </h5>
                                            <div>
                                                <p class="description">{content}<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit lectus, efficitur eu eros vel, luctus aliquet est. Sed sit amet ligula non mauris porta dignissim..</p>
                                                    <div class="col-sm-4" data-no-turbolink="">
                                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={handleShow} style={{display: token ? 'block' : 'none'}}>
                                                    <i class="fa fa-share"></i> Comment
                                                    </button>            
                                                    </div>
                                                </p>    
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>                
                    </div> 
                    <div>
                    {/*=== CREATE COMMENT SECTION ========*/}
                    <div className="comment-section">
                        <h4>Comments</h4>
                            <ActiveComments />
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Comment</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                            {/* create comment form */}
                                            <form noValidate
                                            autoComplete="off"
                                            onSubmit={handleSubmit}
                                            >                
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                    <label for="Title">Author</label>
                                                    <input type = "text" className="form-control"  placeholder="Author" required="true" style={{width: "20rem"}} value={comment.author} onChange={(e)=>setComment({...comment, author: e.target.value})}/>
                                                </div>
                                            <div>
                                            <span> <small className="text-danger"><p>{authorErr}</p></small></span>
                                            </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                        <label for="Title">Content</label>
                                                        <textarea type = "text" className="form-control"  placeholder="Content" required="true" style={{width: "20rem"}} value={comment.content} onChange={(e)=>setComment({...comment, content: e.target.value})} />
                                                </div>
                                                <div>
                                                        <span> <small className="text-danger"><p>{contentErr}</p></small></span>
                                                </div>
                                            </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label for="Title">Email</label>
                                                        <input type = "text" className="form-control"  placeholder="Email" required="true" style={{width: "20rem"}} value={comment.email} onChange={(e)=>setComment({...comment, email: e.target.value})}/>
                                                    </div>
                                                <div>
                                                    <span> <small className="text-danger"><p>{emailErr}</p></small></span>
                                                </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label for="Url">Url</label>
                                                        <input type = "text" className="form-control"  placeholder="Url" required="true" style={{width: "20rem"}} value={comment.url} onChange={(e)=>setComment({...comment, url: e.target.value})}/>
                                                    </div>
                                                    <div>
                                                        <span> <small className="text-danger"><p>{urlErr}</p></small></span>
                                                        </div>
                                                    </div>
                                                </form>
                                                </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button variant="secondary" onClick={handleClose}>
                                                Close
                                        </button>
                                        <button variant="primary" type="submit" onClick={handleSubmit}>
                                                Create Comment
                                        </button>
                                    </Modal.Footer>
                            </Modal>
                        </div> 
                    </div>
            <div>
                <ToastContainer autoClose={2000}/>
            </div>

        </>           
        
    )
}

export default DetailPost
