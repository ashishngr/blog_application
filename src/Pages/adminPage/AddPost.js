import React from 'react'
import AddPosts from '../../component/admin/AddPost'
import DashboardHeader from '../../component/admin/DashboardHeader'
const AddPost = () => {
    return (
        //addpost page   
        <div>
            <DashboardHeader />
            <h1>ADD POST.....</h1>
            <AddPosts />
        </div>
    )
}
export default AddPost
