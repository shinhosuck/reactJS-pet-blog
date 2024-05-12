import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { deletePost } from '../utils/api'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout'


function PostDetailPost(props) {
    const [isError, setIsError] = useState(false)
    const [showEditDeleteBtns, setShowEditDeleteBtns] = useState(false)
    const { isAuthenticated } = useContext(ContentLayoutContext)
    const {
            setShowUpdatePostForm, 
            setShowCommentForm, 
            authenticated, 
            navigate, 
            post, 
            updateLike
        } = props

 
    const removePost = async()=> {
        const data = await deletePost(`${url}/api/post/${post.id}/delete/`, authenticated.token)
        if(data.error) {
            setIsError(data.error)
        }
        navigate('/posts')
    }

    if(isError) {
        return (
            <Navigate to='/error' state={{error:isError}} />
        )
    }

    return (
        <div className="post-detail-container__post-detail">
            <div className='post-detail-image-and-author-wrapper'>
                <div className='post-detail-author-info-container'>
                    <div className='post-detail-author-and-date-wrapper'>
                        <img src={post.author_profile_image_url} alt="author image" />
                        <div className='post-detail-author-post-date'>
                            <span>{post.author}</span>
                            <span>{post.date_posted}</span>
                        </div>
                    </div>
                    <h3 className='post-detail-container__post-title'>{post.title}</h3>
                </div>
                <div className='post-detail-container__post-image-container'>
                    <img className='post-detail-container__post-image' src={post.image_url} alt="" />
                    <div className="post-detail-container__like-and-reply">
                        <button 
                            onClick={()=>updateLike()} 
                            className={authenticated ?
                                    'post-detail-container__post-like  post-detail-like-btn'
                                :
                                    'post-detail-container__post-like-not-authenticated  post-detail-like-btn'
                            } 
                        >
                            <i className='fa-solid fa-hands-clapping post-detail-like'></i>
                            <span className='post-detail-like-count'>{post.qs_count.like_count}</span>
                        </button>
                        <div className='post-detail-container__num-of-replies-container'>
                            <i className="fas fa-comment post-detail-container__num-of-post"></i>
                            <span className='post-detail-container__reply-count'>{post.qs_count.comment_count}</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className='post-detail-container__post-content'>{post.content}</p>
            <div className="post-detail-edit-delete-btns-container">
                {isAuthenticated && isAuthenticated.username === post.author &&
                    <>
                        <button className='post-detail-ellipsis' onClick={()=>setShowEditDeleteBtns(!showEditDeleteBtns)}>
                            <i className="fas fa-ellipsis"></i>
                        </button>
                        {showEditDeleteBtns && 
                            <div className='post-detail-edit-and-delete-btns'>
                                <button
                                    className='post-detail-edit' 
                                    onClick={()=> {
                                        setShowUpdatePostForm(true)
                                        setShowCommentForm(false)
                                        setShowEditDeleteBtns(!showEditDeleteBtns)
                                    }}
                                >
                                    <i className="fa-solid fa-pen post-detail-edit-btn"></i>
                                    <span className='post-detail-edit-text'>Edit</span>
                                </button> 
                                <button
                                    onClick={()=> {
                                        removePost()
                                        setShowEditDeleteBtns(!showEditDeleteBtns)
                                    }}
                                    className='post-detail-delete'
                                >
                                    <i className="fa-solid fa-trash-can post-detail-remove-icon"></i>
                                    <span className='post-detail-remove-text'>Remove</span>
                                </button>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default PostDetailPost





