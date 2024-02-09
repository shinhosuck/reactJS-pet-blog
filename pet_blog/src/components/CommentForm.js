import React from 'react'




function CommentForm(props) {
    const {showCommentForm, handleCommentSubmit, replyContent} = props
    return (
        <form action="" className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea className='comment-form-textarea' ref={replyContent} rows='7' placeholder='Add a comment'/>
            <div className="comment-btns">
                <button className='comment-btn-submit' type='submit'>Comment</button>
                <button onClick={()=>showCommentForm(false)} className='comment-btn-cancel' type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default CommentForm