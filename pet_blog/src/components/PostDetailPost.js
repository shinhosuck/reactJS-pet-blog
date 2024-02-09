import React, { useState } from 'react'




function PostDetailPost(props) {
    const {
        setShowUpdatePostForm, 
        setShowCommentForm, 
        authenticated, 
        navigate, 
        post, 
        updatePost, 
        updateLike
    } = props

    return (
        <div className="post-detail-container__post-detail">
            <div className='post-detail-container__post-image-container'>
                <img className='post-detail-container__post-image' src={post.image_url} alt="" />
            </div>
            <div className="post-detail-container__text-contents">
                <h3 className='post-detail-container__post-title'>{post.title}</h3>
                <p className='post-detail-container__post-content'>{post.content}</p>
                <div className="post-detail-container__like-and-reply">
                    <div className='post-detail-container__num-of-replies-container'>
                        <i className="fa-solid fa-message post-detail-container__num-of-post"></i>
                        <span className='post-detail-container__reply-count'>{post.num_of_replies}</span>
                        <span className='post-detail-container__reply-text'>
                            {post.num_of_replies > 1 ? 'comments':'comment'}
                        </span>
                    </div>
                    <button 
                        onClick={(e)=>authenticated ? updateLike(e, post): navigate('/login', {state:{error:'You must login!'}})} 
                        className='post-detail-container__post-like' 
                    >
                        <i className="fa-solid fa-hands-clapping post-detail-like"></i>
                        <span className='post-detail-like-count'>{post.like.length}</span>
                        <span className='post-detail-like-count-text'>
                            {post.like.length > 1 ? 'likes': 'like'}
                        </span>
                    </button>
                    <div className="post-detail-lg-btns">
                        {authenticated && 
                            <button 
                                onClick={()=> {
                                    setShowCommentForm(true)
                                    setShowUpdatePostForm(false)
                                }} 
                                className='post-detail-reply'
                            >
                                <i className="fa fa-reply post-detail-reply-btn" title='reply'></i>
                                <span className='post-detail-reply-text'>reply</span>
                            </button>
                        }
                        {updatePost && 
                            <button
                                className='post-detail-edit' 
                                onClick={()=> {
                                    setShowUpdatePostForm(true)
                                    setShowCommentForm(false)
                                }}
                            >
                                <i className="fas fa-edit post-detail-edit-btn"></i>
                                <span className='post-detail-edit-text'>edit post</span>
                            </button> 
                        }
                    </div>
                    <MobileButtons 
                        setShowUpdatePostForm = {setShowUpdatePostForm}
                        setShowCommentForm = {setShowCommentForm}
                        authenticated = {authenticated}
                        updatePost = {updatePost}
                        navigate = {navigate}
                        post = {post}
                        updateLike = {updateLike}
                    />
                </div>
            </div>
        </div>
    )
}

export default PostDetailPost


function MobileButtons(props) {

    const [showBtns, setShowBtns] = useState(false)

    const {
        setShowUpdatePostForm, 
        setShowCommentForm, 
        authenticated, 
        updatePost,
    } = props

    return (
        <>
            <div className='post-detail-btns-ellipsis'>
                <button onClick={()=>setShowBtns(!showBtns)}>
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            {showBtns && 
                <div className='post-detail-mobile-btns show-post-detail-mobile-btns'>
                    {authenticated && 
                        <button 
                            onClick={()=> {
                                setShowCommentForm(true)
                                setShowUpdatePostForm(false)
                                setShowBtns(!showBtns)
                            }} 
                            className='post-detail-reply post-detail-mobile-btn'
                        >
                            <i className="fa fa-reply post-detail-reply-btn" title='reply'></i>
                            <span className='post-detail-reply-text'>reply</span>
                        </button>
                    }
                    {updatePost && 
                        <button
                            className='post-detail-edit post-detail-mobile-btn' 
                            onClick={()=> {
                                setShowUpdatePostForm(true)
                                setShowCommentForm(false)
                                setShowBtns(!showBtns)
                            }}
                        >
                            <i className="fas fa-edit post-detail-edit-btn"></i>
                            <span className='post-detail-edit-text'>edit post</span>
                        </button> 
                    }
                </div>
            }
        </>
    )
}


