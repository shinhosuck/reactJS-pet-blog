import React, { useState } from 'react'








function UpdateReplyPost(props) {
    const [updateReplyPost, setUpdateReplyPost] = useState(props.updateReplyPost)
    const {showUpdateReplyForm} = props
    
    const handleSubmit = async()=> {

    }

    const handleChange = ()=> {

    }

    return (
        <div className="reply-form-container">
            <form action="" className="reply-form" onSubmit={handleSubmit}>
                <textarea onChange={handleChange} value={updateReplyPost.content} className='reply-form-textarea' rows='7'/>
                <div className="reply-btns">
                    <button className='reply-btn-submit' type='submit'>Reply</button>
                    <button onClick={()=>showUpdateReplyForm(false)} className='reply-btn-cancel' type='button'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateReplyPost