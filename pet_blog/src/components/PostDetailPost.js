import React, { useState, useEffect } from 'react'
import { deletePost } from '../utils/api'
import { url } from '../pages/PostList'





function PostDetailPost(props) {
    const [textContainer, setTextContainer] = useState(null)
    const [showBtns, setShowBtns] = useState(false)
    const [width, seWidth] = useState(window.innerWidth)
    const {setShowUpdatePostForm, setShowCommentForm, authenticated, 
            documentReady, navigate, post, updateLike} = props

    const removePost = async()=> {
        console.log(post.id)
        try {
            const data = await deletePost(`${url}/api/post/${post.id}/delete/`, authenticated.token)
            console.log(data.message)
            navigate('/posts')

        } catch (error) {
            console.log(error.message)
        }
    }

    // match post img height to the post content height on window resize
    const getWindowWidth = (e)=> {
        const content = document.querySelector('.post-detail-container__text-contents')
        const imgContainer = content && content.previousElementSibling

        if(width >= 700 && imgContainer) {
            imgContainer.style.height = `${content.offsetHeight}px`
            imgContainer.style.minHeight = '180px'

        }else if(imgContainer) {
            imgContainer.style.height = 'auto'
            imgContainer.style.minHeight = 'initial'
        }
        seWidth(window.innerWidth)
    }

    useEffect(()=> {
        window.onresize = getWindowWidth
    }, [width])

    // end

    // window onload sets the post image
    useEffect(()=> {
        const content = document.querySelector('.post-detail-container__text-contents')
        content && setTextContainer(true)

        if(textContainer) {
            getWindowWidth()
        }

    }, [textContainer])
    // end

    return (
        <div className="post-detail-container__post-detail">
            <div className='post-detail-container__post-image-container'>
                <img className='post-detail-container__post-image' src={post.image_url} alt="" />
            </div>
            <div className="post-detail-container__text-contents">
                <h3 className='post-detail-container__post-title'>{post.title}</h3>
                <p className='post-detail-container__post-content'>{post.content}</p>
                <div className="post-detail-container__like-and-reply">
                    
                    <button 
                        onClick={(e)=>authenticated ? updateLike(e, post): ''} 
                        className={authenticated ?
                                'post-detail-container__post-like'
                            :
                                'post-detail-container__post-like-not-authenticated'
                        } 
                    >
                        <i className='fa-solid fa-hands-clapping post-detail-like'></i>
                        <span className='post-detail-like-count'>{post.like.length}</span>
                    </button>
                    <div className='post-detail-container__num-of-replies-container'>
                        <i className="fa-solid fa-message post-detail-container__num-of-post"></i>
                        <span className='post-detail-container__reply-count'>{post.num_of_replies}</span>
                    </div>
                    <div className="post-detail-lg-btns">
                        {authenticated && 
                            <>
                                
                                <button 
                                    onClick={()=> {
                                        setShowCommentForm(true)
                                        setShowUpdatePostForm(false)
                                    }} 
                                    className='post-detail-reply'
                                >
                                    <i className="fa fa-reply post-detail-reply-btn" title='reply'></i>
                                </button>
                                {authenticated.username === post.author &&
                                    <>
                                        <div className='post-detail-btns-ellipsis'>
                                            <button onClick={()=>setShowBtns(!showBtns)}>
                                                <i className="fa-solid fa-ellipsis"></i>
                                            </button>
                                        </div>
                                        {showBtns &&
                                            <div className='post-detail-edit-and-delete-btns'>
                                                <button
                                                    className='post-detail-edit' 
                                                    onClick={()=> {
                                                        setShowUpdatePostForm(true)
                                                        setShowCommentForm(false)
                                                        setShowBtns(false)
                                                    }}
                                                >
                                                    <i className="fa-solid fa-pen post-detail-edit-btn"></i>
                                                    <span className='post-detail-edit-text'>edit</span>
                                                </button> 
                                                <button
                                                    onClick={()=> {
                                                        removePost()
                                                        setShowBtns(false)
                                                    }}
                                                    className='post-detail-delete'
                                                >
                                                    <i className="fa-solid fa-trash-can post-detail-remove-icon"></i>
                                                    <span className='post-detail-remove-text'>delete</span>
                                                </button>
                                            </div>
                                        }
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetailPost





