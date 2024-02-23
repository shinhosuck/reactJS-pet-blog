import React from 'react'




function CommentForm(props) {
    const {showCommentForm, handleCommentSubmit, commentContent} = props
    return (
        <form action="" className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea id='comment' name='comment' className='comment-form-textarea' ref={commentContent} rows='7' placeholder='Add a comment'/>
            <div className="comment-btns">
                <button className='comment-btn-submit' type='submit'>Submit</button>
                <button onClick={()=>showCommentForm(false)} className='comment-btn-cancel' type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default CommentForm