import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router'
import { useHistory } from 'react-router';
import '../../css/updateComment.css'

import { getSingleComment } from '../../action/commentAction'
import { updateComment } from '../../action/commentAction';

const UpdateComment = () => {

    // handle state for update comment
    const[comment, setComment] = useState({
        status: '1'
    });

    // states to handle comment data
    const [author, setAuthor] = useState()
    const[content, setContent] = useState()
    const[createTime, setCreateTime] = useState()
    const[status, setStatus] = useState()
    const[id, setId] = useState()

    let history = useHistory();
    let params = useParams();
    let dispatch = useDispatch();

    // fetch data of comment by spcific id
    const fetchComment = async()=>{
        const response =await axios.get(`http://localhost:3006/commentApi/comment/${params.id}`).catch((error)=>{
            console.log(error)
        })
        console.log("=====>:::===>",response.data.data.comments);
        dispatch(getSingleComment(response.data.data.comment));
        setAuthor(response.data.data.comments[0].author)
        setContent(response.data.data.comments[0].content)
        setCreateTime(response.data.data.comments[0].craete_time)
        setId(response.data.data.comments[0].id)
        // setComment({status:response.data.data.comments[0].status})
       console.log("====::===>>",response.data.data.comments[0].status)
        if(response.data.data.comments[0].status === '1'){
            setStatus('Not Approved')
           
        }
        if(response.data.data.comments[0].status === '2'){
          setStatus( "Approved")
           
        }
        
    }

    useEffect(()=>{
        fetchComment()
    }, [])

    // delete comment function
    const handleDelete = async(e, id) =>{
        const response = await axios.delete(`http://localhost:3006/commentApi/DeleteComment/${id}`).catch((error)=>{
                    console.log(error);
                })
        history.push('/manageComment')        

    }

    useEffect(()=>{
        handleDelete()
    },[])

    // change status function  - this function is used to update thestatus of comment
    const changeStatus = async()=>{
      
       console.log("statuss=========>>>>",status)
       if(status === 'Not Approved'){
         setComment({status: '2'})
         setStatus('Approved')
         console.log(comment.status)
         console.log('status==', status)
       }
       else if(status === "Approved"){
           setComment({status: '1'})
           setStatus('Not Approved') 
           console.log(comment.status)
           console.log('status===', status)
       }

       dispatch(updateComment(comment, params.id))
    }
    
    return (
        // update comment component 
        <div>
            <h2 className="text-primary" style={{marginLeft: "40%"}}>UPDATE COMMENT</h2>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
                <div class="container" style={{marginLeft:"20%"}}>
                <div class="row">
                    <div class="col-md-8">
                        <div class="media g-mb-30 media-comment">
                        
                            <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                            <div class="g-mb-15">
                                <h5 class="h5 g-color-gray-dark-v1 mb-0">{author}</h5>
                                <span class="g-color-gray-dark-v4 g-font-size-12"><div>{createTime}</div></span>
                            </div>
                        
                            <p>{content}</p>
                        
                            <ul class="list-inline d-sm-flex my-0">
                                <li><h5 className="text-primary">Status:{status}</h5></li>
                            </ul>
                            <ul class="list-inline d-sm-flex my-0" style={{marginLeft: "30%"}}>
                                {/* button to handle update comment status */}
                                <li><button class="btn btn-info btn-download btn-round pull-right makeLoading" onClick={(e)=>changeStatus(e)}>change Status</button></li>
                                {/* button to handle delete comment */}
                                <li><button class="btn btn-danger btn-download btn-round pull-right makeLoading" style={{marginLeft: "30px"}} onClick={(e)=>handleDelete(e, id)}>Delete</button></li>
                            </ul>
                            </div>
                           
                        </div>
                    </div>
                </div> 
             </div>    
        </div>
    )
}

export default UpdateComment
