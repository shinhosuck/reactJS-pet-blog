import React, { useState } from 'react'




function UpdatePostForm(props) {
    const [updatePost, setUpdatePost] = useState(props.updatePost)
    const {showUpdatePostForm} = props

    const handleSubmit = async()=> {

    }

    const handleChange = (e)=> {
        const {name, value} = e.target
        setUpdatePost((prev)=> ({...prev, [name]:value}))
    }

    console.log(updatePost)

    return (
        <form action="" className="post-detail-post-edit-form" onSubmit={handleSubmit}>
            <input name='title' onChange={handleChange} value={updatePost.title} type="text" />
            <textarea name='content' onChange={handleChange} value={updatePost.content} className='reply-form-textarea' rows='7'/>
            <div className="post-detail-post-edit-btns">
                <button className='post-detail-post-edit-btn-submit' type='submit'>Submit</button>
                <button onClick={()=>showUpdatePostForm(false)} className='post-detail-post-edit-btn-cancel' type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default UpdatePostForm