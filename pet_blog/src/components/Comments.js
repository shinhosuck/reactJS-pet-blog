import React, { useState, useContext, useEffect } from 'react'
import { removeComment, getChildrenComments } from '../utils/api'
import { url } from '../utils/urls'
import UpdateCommentForm from './UpdateCommentForm'
import ChildCommentForm from './ChildCommentForm'
import { ContentLayoutContext } from '../layouts/ContentLayout'


function Comments(props) {
    const [showCommentEditForm, setShowCommentEditForm] = useState(false)
    const [showCommentForm, setShowCommentForm] = useState({id:null})
    const [childrenComments, setChildrenComments] = useState([])
    const { isAuthenticated } = useContext(ContentLayoutContext)
    const { post, setPost, comment, comments, setComments, getPost} = props


    const deleteComment = async(id, comment)=> {
        if(!comment.parent_id) {
            try {
                const data = await removeComment(`${url}/api/comment/${comment.id}/delete/`, isAuthenticated.token)
                if(!data.error) {
                    const new_comment_array = comments.filter((commentObj)=> commentObj.id !== comment.id)
                    setComments(new_comment_array)
                    setPost((prev)=>({...prev, qs_count:{...prev.qs_count, comment_count:prev.qs_count.comment_count-1}}))
                }else {
                    console.log(data.error)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        if(comment.parent_id) {
            try {
                const data = await removeComment(`${url}/api/comment/${comment.id}/delete/`, isAuthenticated.token)
                if(!data.error) {
                    setPost((prev)=>({...prev, qs_count:{...prev.qs_count, comment_count:prev.qs_count.comment_count-1}}))
                    const comment = document.getElementById(`${id}`)
                    comment.style.display = 'none'
                }else {
                    console.log(data.error)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    useEffect(()=> {
        const fetchChildrenComments = async()=> {
            const data = await getChildrenComments(`${url}/api/comment/${comment.id}/children/`)
            if(!data.error) {
                setChildrenComments(data)
            }
            else {
                console.log(data.error)
            }
        }
        fetchChildrenComments()
    }, [comment]) 

    return (
        <div id={comment.id} key={comment.id} className={comment.parent_id ? 'post-detail-comments__comment has-parent-id' :'post-detail-comments__comment'}>
            <div className='post-detail-comments__user-profile'>
                <div className='post-detail-comments__user-image-container'>
                    <img className='post-detail-comments__user-image' src={comment.user_profile_image_url} alt="profile image"/>
                </div>
                <div className='post-detail-username-and-date'>
                    <p className='post-detail-comments__username'>{comment.user}</p>
                    <p className='post-detail-comments__date-posted'>{
                            `${new Date(comment.date_posted).toDateString()} 
                            ${new Date(comment.date_posted).toLocaleTimeString({}, {hour:'2-digit', minute:'2-digit'})}`
                        }
                    </p>
                </div>
            </div>
            <div className="post-detail-comment-btns">
                <p id={`comment-${comment.id}`} value='' className='post-detail-comments__content'>{comment.content}</p>
                <div className='post-comment-btns'>
                    <button className='post-detail-comment-reply-btn'
                        onClick={()=> {
                            setShowCommentForm({id:comment.id})
                            setShowCommentEditForm(false)
                        }}
                    >
                        <i className="fa fa-reply post-detail-comment-reply-icon" title='reply'></i>
                        <span className='post-detail-comment-edit-text'>Reply</span>
                    </button>
                    {isAuthenticated && comment.user === isAuthenticated.username &&
                        <>
                            <button 
                                onClick={()=> {
                                    setShowCommentEditForm({comment_id:comment.id})
                                    setShowCommentForm(false)
                                }} 
                                className='post-detail-comment-edit-btn'
                            >
                                <i className="fa-solid fa-pen post-detail-comment-edit-icon"></i>
                                <span className='post-detail-comment-edit-text'>Edit</span>
                            </button>
                            <button 
                                onClick={()=> {
                                    deleteComment(comment.id, comment)
                                }} 
                                className='post-detail-comment-remove-btn'
                            >
                                <i className="fa-solid fa-trash-can post-detail-comment-remove-icon"></i>
                                <span className='post-detail-comment-remove-text'>Remove</span>
                            </button>
                        </>
                    }
                </div>
            </div>
            {showCommentForm && showCommentForm.id === comment.id &&
                <ChildCommentForm 
                    setShowCommentForm={setShowCommentForm} 
                    childrenComments={childrenComments}
                    setChildrenComments={setChildrenComments}
                    comment={comment}
                    setPost={setPost}
                    post={post}
                />
            }
            {showCommentEditForm && showCommentEditForm.comment_id === comment.id &&
                <UpdateCommentForm 
                    comment={comment} 
                    setShowCommentEditForm={setShowCommentEditForm}
                    setComments={setComments}
                    getPost={getPost}
                />
            }
            {childrenComments && childrenComments.map((comment)=> {
                return (
                    <Comments 
                        key={comment.id}
                        setPost={setPost}
                        comment={comment}
                        post={post}
                        setComments={setComments} 
                        getPost={getPost}
                    />
                )
            })} 
        </div>
    )
}

export default Comments


