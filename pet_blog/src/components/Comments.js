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
                    </div>
                )
            })}
        </div>
    )
}

export default Comments