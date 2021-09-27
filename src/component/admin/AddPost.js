import React, {useState} from 'react'
import { useDispatch} from 'react-redux'
import { createPost } from '../../action/postAction';
import { ToastContainer } from "react-toastify";


const AddPosts = () => {
    // options for user to select post status
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



    const dispatch = useDispatch()

    // state handling for post
    const [post, setPost] = useState({
        title: "",
        content: "",
        tag: "",
        status: "2",


    })

    // state handling for errors
    const[titleErr, setTitleErr] = useState([])
    const[contentErr, setContentErr] = useState([])
    const[tagErr, setTagErr] = useState([])


    // submit function used for post form
    const handleSubmit = (e)=>{
        e.preventDefault();

        // conditions to handle input field errors
        if(post.title.length === 0){
            setTitleErr(['Title is required'])
        }
        if(post.content.length === 0){
            setContentErr(['Content is required'])
        }
        if(post.tag.length === 0){
            setTagErr(['Tag is required'])
        }

        if(post.title.length !== 0 && post.content.length !== 0 && post.tag.length !== 0){
             dispatch(createPost(post))
             console.log("||=== to dispatch fill form ===||")
            setPost({
            title: "",
            content: "",
            tag: "",
            status: "",

        })
        }

        if(post.title.length !== 0){
            setTitleErr([''])
        }
        if(post.content.length !== 0){
            setContentErr([''])
        }
        if(post.tag.length !== 0){
            setTagErr([''])
        } 
    }
   
    return (
        // =====================================================================
        // ADD POST CONTAINER 
        // =====================================================================
        <div>    
            <div>  
                <div className = "container" style={{width:"40%"}}>
                    <div className = "card" style={{marginLeft: "30px", paddingLeft: "150px", paddingTop: "20px", width: "100%"}}>
                        {/* add post form start from hare */}
                        <form noValidate
                            autoComplete = "off"
                            onSubmit = {handleSubmit}
                            styel={{with:"20rem"}}>
                                 <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label for="Title">Title</label>
                                        <input type = "text" className="form-control"  placeholder="Title" value={post.title} onChange={(e)=>setPost({...post, title: e.target.value})} required="true" style={{width: "20rem"}}/>
                                    </div>
                                    <div>
                                        <span> <small className="text-danger"><p>{titleErr}</p></small></span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label for="Content">Content</label>
                                        <textarea type = "text" className="form-control" id="Content" placeholder="Content" value={post.content} onChange={(e)=>setPost({...post, content: e.target.value})} required="true" style={{width: "20rem"}}/>
                                    </div>
                                    <div>
                                        <span> <small className="text-danger"><p>{contentErr}</p></small></span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label for="Tags">Tags</label>
                                        <input type = "text" className="form-control" id="Tags" placeholder="Tags" value={post.tag} onChange={(e)=>setPost({...post, tag: e.target.value})} required="true" style={{width: "20rem"}}/>
                                    </div>
                                    <div>
                                        <span> <small className="text-danger"><p>{tagErr}</p></small></span>
                                    </div>
                                </div> 
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label for="Status">Satatus</label>
                                        <select value={post.status} onChange={(e)=>setPost({...post, status: e.target.value})}  style={{width: "20rem"}} className="form-control">
                                            {options.map((option) => (
                                            <option value={option.value}  style={{width: "20rem", height: "40px"}}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-row">
                                        <button type="submit" class="btn btn-info btn-download btn-round pull-right makeLoading" style={{marginTop: "20px", marginBottom: "20px"}} >Add Post</button>
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        <div><ToastContainer autoClose={2000} /></div>
    </div>
    )
}

export default AddPosts
