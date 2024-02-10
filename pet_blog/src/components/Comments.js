import React from 'react'








function Comments(props) {
    const {comments} = props

    return (
        <div className="post-detail-comments">
            {comments.map((post)=> {
                return (
                    <div key={post.id} className="post-detail-comments__comment">
                        <div className='post-detail-comments__user-profile'>
                            <div className='post-detail-comments__user-image-container'>
                                <img className='post-detail-comments__user-image' src={post.user_image_url} alt="profile image"/>
                                <p className='post-detail-comments__username'>{post.user}</p>
                            </div>
                            <p className='post-detail-comments__date-posted'>{new Date(post.date_posted).toDateString()}</p>
                        </div>
                        <p className='post-detail-comments__content'>{post.content}</p>
                        <div className="post-detail-comment-btns">
                            <button className='post-detail-comment-reply-btn'>
                                <i className="fa fa-reply post-detail-comment-reply-icon" title='reply'></i>
                                <span className='post-detail-comment-reply-text'>reply</span>
                            </button>
                            <button className='post-detail-comment-edit-btn'>
                                <i className="fas fa-edit post-detail-comment-edit-icon"></i>
                                <span className='post-detail-comment-edit-text'>edit</span>
                            </button>
                            <button className='post-detail-comment-remove-btn'>
                                <i className="fa-solid fa-trash post-detail-comment-remove-icon"></i>
                                <span className='post-detail-comment-remove-text'>remove</span>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments