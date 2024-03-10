import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { url } from '../pages/PostList'
import { createComment } from '../utils/api'


function CommentForm(props) {
    const [isFieldError, setIsFieldError] =  useState(false)
    const authenticated = JSON.parse(localStorage.getItem('auth')) || null
    const { setShowCommentForm, post, setPost, comments, setComments } = props
    const commentContent = useRef()
    const navigate = useNavigate()


    const handleCommentSubmit = async(e)=> {
        e.preventDefault()
        const content = {content:commentContent.current.value}
        
        if(Object.values(content)[0]) {
            try {
                const data = await createComment(
                    `${url}/api/post/${post.id}/create/comment/`, 
                    content, 
                    authenticated.token
                )
                if(!data.error) {
                    const comment_obj = {
                        ...data, 
                        user:authenticated.username, 
                        user_image_url:authenticated.profile_image_url
                    }
                    comments ? setComments((prev)=> [...prev, comment_obj]) : setComments([comment_obj])
                    setPost((prev)=> ({...prev, num_of_replies:data.comment_count}))
                    setShowCommentForm(false)
                    e.target.reset()
                }
                else {
                    console.log(data.error)
                    navigate('/error', {replace:true, state:{message:{error:`${data.error}`}}})
                }

            } catch (error) {
                console.log(error.message)
                navigate('/error', {replace:true, state:{message:{error:`${error.message}`}}})
            }

        }else {
            setIsFieldError(true)
        }
    }

    useEffect(()=> {
        const id = setTimeout(()=> {
            setIsFieldError(false)
            clearTimeout(id)
        }, 3000)
    }, [isFieldError])

    return (
        <form action="" className="comment-form" onSubmit={handleCommentSubmit}>
            {isFieldError && <p style={{color:'orangered'}}>This field can't be empty!</p>}
            <textarea id='comment' name='comment' className='comment-form-textarea' ref={commentContent} rows='7' placeholder='Add a comment'/>
            <div className="comment-btns">
                <button className='comment-btn-submit' type='submit'>Submit</button>
                <button onClick={()=>setShowCommentForm(false)} className='comment-btn-cancel' type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default CommentForm