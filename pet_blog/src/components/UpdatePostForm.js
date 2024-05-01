import React, { useState } from 'react'
import { updatePost } from '../utils/api'
import { url } from '../utils/urls'



function UpdatePostForm(props) {
    const [post, setPost] = useState(props.post)
    const {showUpdatePostForm, authenticated} = props

    const handleSubmit = async(e)=> {
        e.preventDefault()
        console.log('hello world')
    }

    const handleChange = (e)=> {
        const {name, value} = e.target
        setPost((prev)=> ({...prev, [name]:value}))
    }

    return (
        <form id='post-edit-form' action="" className="post-detail-post-edit-form" onSubmit={handleSubmit}>
            <input id='post-edit-form-input' name='title' onChange={handleChange} value={post.title} type="text" />
            <textarea id='post-edit-form-textarea' name='content' onChange={handleChange} value={post.content} className='reply-form-textarea' rows='5'/>
            <div className="post-detail-post-edit-btns">
                <button className='post-detail-post-edit-btn-submit' type='submit'>Update</button>
                <button onClick={()=>showUpdatePostForm(false)} className='post-detail-post-edit-btn-cancel' type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default UpdatePostForm