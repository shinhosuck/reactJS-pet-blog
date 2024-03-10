import React from 'react'
import { removeComment } from '../utils/api'
import { url } from '../pages/PostList'
import UpdateCommentForm from './UpdateCommentForm'




function Comments(props) {
    const { comments, setComments, authenticated, setPost} = props
    const [showCommentEditForm, setShowCommentEditForm] = React.useState(false)
    const [showBtns, setShowBtns] = React.useState({show:false, comment_id:null})
    
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
                                <p className='post-detail-comments__username'>{comment.user}</p>
                            </div>
                            <p className='post-detail-comments__date-posted'>{new Date(comment.date_posted).toDateString()}</p>
                        </div>
                        <p className='post-detail-comments__content'>{comment.content}</p>
                        <div className="post-detail-comment-btns">
                            {authenticated &&
                                <>
                                    <button className='post-detail-comment-reply-btn'>
                                        <i className="fa fa-reply post-detail-comment-reply-icon" title='reply'></i>
                                    </button>
                                     {comment.user === authenticated.username &&
                                        <>
                                            <div className='post-detail-btns-ellipsis'>
                                                <button onClick={()=> {
                                                    setShowBtns({
                                                        show:showBtns.show?false:true, 
                                                        comment_id:showBtns.comment_id?null:comment.id
                                                    })
                                                }}>
                                                    <i className="fa-solid fa-ellipsis"></i>
                                                </button>
                                            </div>
                                            {showBtns && showBtns.show && showBtns.comment_id === comment.id &&
                                                <div className='post-detail-comment-edit-and-delete'>
                                                    <button 
                                                        onClick={()=> {
                                                            setShowCommentEditForm({comment_id:comment.id})
                                                            setShowBtns({show:false, comment_id:null})
                                                        }} 
                                                        className='post-detail-comment-edit-btn'
                                                    >
                                                        <i className="fa-solid fa-pen post-detail-comment-edit-icon"></i>
                                                        <span className='post-detail-comment-edit-text'>edit</span>
                                                    </button>
                                                    <button 
                                                        onClick={()=> {
                                                            deleteComment(comment.id)
                                                            setShowBtns({show:false, comment_id:null})
                                                        }} 
                                                        className='post-detail-comment-remove-btn'
                                                    >
                                                        <i className="fa-solid fa-trash-can post-detail-comment-remove-icon"></i>
                                                        <span className='post-detail-comment-remove-text'>delete</span>
                                                    </button>
                                                </div>
                                            }
                                        </>
                                    }
                                </>
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


