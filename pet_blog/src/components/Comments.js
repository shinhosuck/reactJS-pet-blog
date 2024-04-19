import React from 'react'
import { removeComment } from '../utils/api'
import { url } from '../utils/urls'
import UpdateCommentForm from './UpdateCommentForm'




function Comments(props) {
    const { comments, setComments, authenticated, setPost} = props
    const [showCommentEditForm, setShowCommentEditForm] = React.useState(false)
    
    const deleteComment = async(id)=> {
        try {
            const data = await removeComment(`${url}/api/comment/${id}/delete/`, authenticated.token)
            if(!data.error) {
                const new_comment_array = comments.filter((comment)=> comment.id !== id)
                setPost((prev)=> ({...prev, num_of_replies:data.comment_count}))
                setComments(new_comment_array)
                console.log(data)

            }else {
                console.log(data.error)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
   
    return (
        <div className="post-detail-comments">
            {comments && comments.map((comment)=> {
                return (
                    <div key={comment.id} className="post-detail-comments__comment">
                        <div className='post-detail-comments__user-profile'>
                            <div className='post-detail-comments__user-image-container'>
                                <img className='post-detail-comments__user-image' src={comment.user_image_url} alt="profile image"/>
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
                            <p className='post-detail-comments__content'>{comment.content}</p>
                            {authenticated &&
                                <div className='post-comment-btns'>
                                    <button className='post-detail-comment-reply-btn'>
                                        <i className="fa fa-reply post-detail-comment-reply-icon" title='reply'></i>
                                        <span className='post-detail-comment-edit-text'>Reply</span>
                                    </button>
                                     {comment.user === authenticated.username &&
                                        <>
                                            <button 
                                                onClick={()=> {
                                                    setShowCommentEditForm({comment_id:comment.id})
                                                }} 
                                                className='post-detail-comment-edit-btn'
                                            >
                                                <i className="fa-solid fa-pen post-detail-comment-edit-icon"></i>
                                                <span className='post-detail-comment-edit-text'>Edit</span>
                                            </button>
                                            <button 
                                                onClick={()=> {
                                                    deleteComment(comment.id)
                                                }} 
                                                className='post-detail-comment-remove-btn'
                                            >
                                                <i className="fa-solid fa-trash-can post-detail-comment-remove-icon"></i>
                                                <span className='post-detail-comment-remove-text'>Remove</span>
                                            </button>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                        {showCommentEditForm && showCommentEditForm.comment_id === comment.id &&
                            <UpdateCommentForm 
                                comment={comment} 
                                setShowCommentEditForm={setShowCommentEditForm}
                                setComments={setComments}
                                authenticated={authenticated}
                            />
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Comments


