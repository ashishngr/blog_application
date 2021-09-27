import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import '../css/detailPost.css'
import { useParams } from 'react-router'



const ActiveComments = () => {
   

    const[offset, setOffset] = useState(0)
    const[comments, setComments] = useState([])
    var[fetching, setFetching] = useState(true)

    const history = useHistory();
    let params = useParams()

    // load more function
    const loadMoreComment = ()=>{
        setOffset((offset)=> offset + 2)
        console.log("=========>>>>>>>=====>>>>>>",offset)

    }

    // fetch comments function
    const fetchComment = async() =>{
        console.log("post_id====>::===>", params.id)
        let post_id = params.id
        const response = await axios.get(`http://localhost:3006/commentApi/activeComments/${post_id}/${offset}`).catch((error)=>{
            console.log(error)
        })
        let length = response.data.data.comments.length
        console.log("length|||||=????=>", length)
        if(length === 1 || length === 0){
            setFetching(false)
        }
        console.log("response======||||====",response.data.data.comments)
        setComments([...comments, ...response.data.data.comments])

    }

    useEffect(()=>{
        fetchComment()
    },[offset])

    // function to render the  comment list whose status are active
    const renderCommentList = comments.map((comment)=>{
        const{id, content, create_time, author}  = comment;
        return( 
            <div key={id} >
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="media g-mb-30 media-comment">
                                            <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                                                <div class="g-mb-15">
                                                    <h5 class="h5 g-color-gray-dark-v1 mb-0">{author}</h5>
                                                    <span class="g-color-gray-dark-v4 g-font-size-12">{create_time}</span>
                                                 </div>
                                                    <p><p>{content}</p>
                                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                                            felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        )
    })

    return (
        // active comment component 
        <div>
            <div>
                 {renderCommentList}
            </div>
            <div style={{float: "left"}}>
                <button  className="btn btn-info btn-download btn-round pull-right makeLoading" onClick={(e)=>loadMoreComment(e)} style={{marginLeft: "50rem",marginTop: "30px", display: fetching !== true ? 'none' : 'block' }}>Load More</button>
            </div>
        </div>
    )
}

export default ActiveComments
