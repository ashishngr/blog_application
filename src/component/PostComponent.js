import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import '../css/FrontEndPost.css'
import { useParams } from 'react-router'



const PostComponent = () => {
    const history = useHistory();


   const [offset, setOffset] = useState(0);
   const [posts, setPosts] = useState([])
   var [fetching, setFeatching] = useState(true)

    const postDetail = (e, id) =>{
        e.preventDefault()
        history.push(`/postDetail/${id}`)
        
    }

    // function to handle load more button
    const loadMorePost = async () =>{
            setOffset((offset)=>offset + 3)        
           
        }
    // function to fetch all post
    const fetchPost = async () =>{
        const response = await axios.get(`http://localhost:3006/postApi/publicPost/${offset}`).catch((error)=>{
            console.log(error)
        })
        let length =  response.data.data.post.length
        
        if(length !== 3){
            setFeatching(false)
        }
        setPosts([...posts, ...response.data.data.post])
           
       
           
    }

    useEffect(()=>{
       fetchPost()
    },[offset])

    const renderPostList = posts.map((post) =>{
        const{id, title, content, create_time, tag } = post;
        return (
            <>
                <a onclick = {(e)=>postDetail(e, id)}>
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
                        <div class="container bootstrap snippets bootdey" key={id}>
                            <div class="row">
                                <div class="post-list">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <h4>
                                                <a hre="#" class="username">{title}</a>
                                                <label class="label label-info">#{tag}</label>
                                            </h4>
                                            <h5> 
                                                <i class="fa fa-calendar"></i>
                                                {create_time} 
                                            </h5>
                                                <p class="description">{content}<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit lectus, efficitur eu eros vel, luctus aliquet est. Sed sit amet ligula non mauris porta dignissim..</p></p>    
                                        </div>
                                        <div class="col-sm-4" data-no-turbolink="">
                                                <a class="btn btn-info btn-download btn-round pull-right makeLoading" onClick={(e)=>postDetail(e, post.id)}  >
                                                <i class="fa fa-share"></i> View
                                                </a>            
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>       
                </a>
            </>
        )
    })
    return (
        <div>
            <div className="container y-flex justify-content-center" style={{marginLeft: "20rem" , overflow: "hidden"}}>
                {renderPostList}  
            </div>
            <button  className="btn" onClick={(e)=>loadMorePost(e)} style={{marginLeft: "80%", display: fetching !== true ? 'none' : 'block' }}>Load More</button>
        </div>
    )
}

export default PostComponent
