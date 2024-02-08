import React from 'react'








function CommentForm(props) {
    const {showCommentForm, handleCommentSubmit, replyContent} = props
    return (
        <div className="comment-form-container">
            <form action="" className="comment-form" onSubmit={handleCommentSubmit}>
                <textarea className='comment-form-textarea' ref={replyContent} rows='7'/>
                <div className="comment-btns">
                    <button className='comment-btn-submit' type='submit'>Reply</button>
                    <button onClick={()=>showCommentForm(false)} className='comment-btn-cancel' type='button'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm