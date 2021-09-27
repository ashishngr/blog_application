import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { getSinglePost, updatePost } from '../../action/postAction'
import { useHistory } from 'react-router';

const UpdatePosts = () => {
    const posts = useSelector(state => state.post.post)
    console.log("---->", posts)

    // state to handle updating post 
    const [post, setPost] = useState({
        title: "",
        content: "",
        tag: "",
        status: "",
        
    })
    
    const[title, setTitel] = useState("");
    const[content, setContent] = useState("")     
    const[status, setStatus] = useState();
    const [tag, setTag] = useState("")
    
    let params = useParams();
    let history = useHistory();
    const dispatch  = useDispatch();

    // function to fetch updating  post data
    const fetchSinglePost = async() =>{
        console.log("iddd=============>", params.id)
        const response = await axios.get(`http://localhost:3006/postApi/post/${params.id}`).catch((error)=>{
            console.log(error)
        })
        console.log("====+>>>", response.data.data)
        dispatch(getSinglePost(response.data.data.post))
        console.log("====+>>>", response.data.data.post[0].content)
        setTitel(response.data.data.post[0].title)
        setContent(response.data.data.post[0].content)
        setStatus(response.data.data.post[0].status)
        setTag(response.data.data.post[0].tag)
        setPost(response.data.data.post[0])

        
    }
    useEffect(()=>{
        fetchSinglePost();
    }, [])

    // states to handle errors
    let [titleError, setTitleError] = useState([]);
    let [contentError, setContentError] = useState([])
    let [tagError, setTagError] = useState([])

    // function to handle update post form
    const handleSubmit = (e, ) =>{
        e.preventDefault();
        // conditions to handle inpot fields error
        if(post.title.length === 0){
            setTitleError(['Title is required'])
        }
        if(post.content.length === 0){
            setContentError(['Content is required'])
        }
        if(post.tag.length === 0){
            setTagError(['single tag is required'])
        }
        if(post.title.length !== 0 && post.content.length !== 0 && post.tag.length !== 0){
            dispatch(updatePost(post, params.id))
            history.push('/managePost')
        }

        if(post.title.length !== 0){
            setTitleError([''])
        }
        if(post.content.length !== 0){
            setContentError([''])
        }
        if(post.tag.length !== 0){
            setTagError([''])
        }
       
    }

    // option to select post option 
    const options = [
        {
            label: "Public",
            value: '1',
        },
        {
            label: "Draft",
            value: '2',
        },
        {
            label: "Archived",
            value: '3',
        },
    ]
     
    return (
        // update post component
        <div>
            <div class="container">
            <h3 style={{marginLeft: "40%", marginTop: "20px"}}>UPDATE POST</h3>
                <div clas="card" style={{width:"50%", marginLeft: "20%", marginTop: "50px"}}>
                    {/* update post form  */}
                        <form noValidate
                            autoComplete = "off"
                            onSubmit = {handleSubmit}>
                            <div class="form-group">
                                <label htmlFor="title">Title</label>
                                <input  className="form-control" id="title" type="text" defaultValue={title} onChange={(e)=>setPost({...post, title: e.target.value})}/>
                                <div>
                                    <span> <small className="text-danger"><p>{titleError}</p></small></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content">Content</label>
                                <textarea className="form-control" id="content" defaultValue={content} onChange={(e)=>setPost({...post, content: e.target.value})}/>
                                <div>
                                    <span> <small className="text-danger"><p>{contentError}</p></small></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tag">Tags</label>
                                <input  className="form-control" id="tag" defaultValue={tag} onChange={(e)=>setPost({...post, tag: e.target.value})}/>
                                <div>
                                    <span> <small className="text-danger"><p>{tagError}</p></small></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" style={{width: "25rem", height: "25px", marginTop: "10px"}}>Status</label>
                                     <select value={post.status} onChange={(e)=>setPost({...post, status: e.target.value})}  style={{width: "40.5rem", height: "50px"}}>
                                            {options.map((option) => (
                                            <option value={option.value}  style={{width: "20rem", height: "40px"}}>{option.label}</option>
                                            ))}
                                    </select>       
                            </div>
                            <div>
                                <button type="submit" class="btn btn-info btn-download btn-round pull-right makeLoading  ">Update</button>
                            </div>  
                        </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatePosts
