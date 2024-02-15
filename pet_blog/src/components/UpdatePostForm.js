import React, { useState } from 'react'
import { updatePost } from '../utils/api'



function UpdatePostForm(props) {
    const [updatePost, setUpdatePost] = useState(props.updatePost)
    const {showUpdatePostForm} = props

    const handleSubmit = async(e)=> {
        e.preventDefault()
        console.log('hello world')
    }

    const handleChange = (e)=> {
        const {name, value} = e.target
        setUpdatePost((prev)=> ({...prev, [name]:value}))
    }

    return (
        <form id='post-edit-form' action="" className="post-detail-post-edit-form" onSubmit={handleSubmit}>
            <input id='post-edit-form-input' name='title' onChange={handleChange} value={updatePost.title} type="text" />
            <textarea id='post-edit-form-textarea' name='content' onChange={handleChange} value={updatePost.content} className='reply-form-textarea' rows='7'/>
            <div className="post-detail-post-edit-btns">
                <button className='post-detail-post-edit-btn-submit' type='submit'>Submit</button>
                <button onClick={()=>showUpdatePostForm(false)} className='post-detail-post-edit-btn-cancel' type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default UpdatePostForm