import React from 'react'








function Comments(props) {
    const {comments} = props
    return (
        <div className="replied-posts">
            {comments.map((post)=> {
                return (
                    <div key={post.id} className="replied-post">
                        <div className='replied-post-user-date'>
                            <div className='replied-post-user-image-container'>
                                <img className='replied-post-user-image' src={post.user_image_url} alt="profile image"/>
                                <p className='replied-post-user'>{post.user}</p>
                            </div>
                            <p className='replied-post-date-posted'>{new Date(post.date_posted).toDateString()}</p>
                        </div>
                        <p className='replied-post-content'>{post.content}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments