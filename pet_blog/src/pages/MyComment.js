import React, { useState, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { url } from '../utils/urls'
import LoadingPage from './LoadingPage'
import { fetchComments, removeComment, editComment } from '../utils/api'
import dogImg from '../images/cartoon_dog.png'

function MyComment() {
  const [comments, setComments] = useState(null)
  const [update, setUpdate] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const authenticate = JSON.parse(localStorage.getItem('auth'))
  const navigate = useNavigate()
  const {state, pathname} = useLocation()


  const deleteComment = async(id)=> {
    const obj = {isMyComment:true}
    try {
      const data = await removeComment(`${url}/api/comment/${id}/delete/`, authenticate.token, obj)
      if(!data.error){
        const new_comment_array = comments.filter((comment)=> comment.id !== id)
        setComments(new_comment_array)
        setIsLoading(false)
        console.log(data)

      }else{
        console.log(data.message)
        setIsLoading(false)
        navigate('/error', {replace:true, state:{message:{error:`${data.error}`}}})
        
      }

    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
      navigate('/error', {replace:true, state:{message:{error:`${error.message}`}}})
    }

  }

  const updateComment = async(e, id)=> {
    e.preventDefault()
    const body = {content:update.content, user:authenticate.username}
    try {
      const data = await editComment(`${url}/api/comment/${id}/update/`, body, authenticate.token)
      if(!data.error) {
        console.log(data)
        const newComments = comments.map((comment)=> {
          if(comment.id === data.id){
            return data
          }else {
            return comment
          }
        })
        setComments(newComments)
        setUpdate(null)
        setIsLoading(false)

      }else {
        console.log(data.error)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e)=> {
    const {name, value} = e.target
    setUpdate((preve)=>({...preve, [name]:value}))
  }

  useEffect(()=> {
    const getComments = async()=> {
      const data = await fetchComments(`${url}/api/my-comment/`, authenticate.token)
      if(data.length !== 0) {
        setComments(data)
      }
      setIsLoading(false)
    }
    getComments()
  }, [])

  if(!authenticate) {
    return (
      <Navigate to='/login'  replace={true} state={{error:'Please login to see your comment!', redirect:pathname}}/>
    )
  }

  if(isLoading) {
      return (
          <LoadingPage />
      )
  }
  
  return (
    <React.Fragment>
      <div className="bg-img">
        <div className="my-posts-hero-container">
            <div className="my-posts-header-contents">
                <div className="my-posts-author-profile">
                    <img className='my-posts-profile-img' src={authenticate.image_url} alt="" />
                    <h4 className='my-posts-username'>{authenticate.username}</h4>
                </div>
                <h1 className='my-posts-hero-header'>My Comments</h1>
                <div>
                  <p className='my-posts-num-of-posts'>
                    {authenticate.qs_count.comment_count > 1 ? 
                      `${authenticate.qs_count.comment_count} comments`
                    :
                      `${authenticate.qs_count.comment_count} comment`}
                  </p>
                  <Link to='/my-posts' className='my-posts-num-of-comments'>
                    {authenticate.qs_count.post_count > 1 ? 
                      `${authenticate.qs_count.post_count} posts`
                    :
                      `${authenticate.qs_count.post_count} post`}
                  </Link>
                </div>
            </div>
        </div>
      </div>
      {comments ?
        <div className='my-comments-container'>
          {comments.map((comment)=> {
            return (
              <div key={comment.id} className="my-comments-container__my-comment">
                <div className='my-comments-date-and-time'>
                  <p className='my-comments__date-replied'>{
                    `${new Date(comment.date_posted).toDateString()} 
                    ${new Date(comment.date_posted).toLocaleTimeString({}, {hour:'2-digit', minute:'2-digit'})}`}
                  </p>
                  <p className='my-comments__post_name'>
                    <span>Replied to:</span> 
                    <Link className='my-comments__post-name-link' to={`/post/${comment.post_id}/detail/`}>{comment.post}</Link>
                  </p>
                </div>
                <p className='my-comments__content'>{comment.content}</p>
                <div className="my-comments-container__buttons">
                  <button
                    onClick={()=>setUpdate({content:comment.content, id:comment.id})} 
                    className='my-comments__update-button'
                  >
                    <i className="fa-solid fa-pen"></i>
                    Edit
                  </button>
                  <button
                    onClick={()=>deleteComment(comment.id)} 
                    className='my-comments__delete-button'
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    Remove
                  </button>
                </div>
                {update && update.id === comment.id &&
                  <div className="update-comment-form-container">
                    <form action="" className="update-comment-form" onSubmit={(e)=>updateComment(e,comment.id)}>
                      <textarea onChange={handleChange} className='update-comment-textarea' value={update.content} name="content" rows="6"></textarea>
                      <div className="update-comment-form-buttons-container">
                        <button type='submit' className='update-comment-submit-btn'>Submit</button>
                        <button onClick={()=>setUpdate(null)} type='button' className='update-comment-cancel-btn'>Cancel</button>
                      </div>
                    </form>
                  </div>
                }
              </div>
            )
          })}
        </div>
      :
        <div className="no-topic-post-container my-comment-no-comment">
          <img src={dogImg} alt="" />
          <div className="no-topic-post-text-container">
              <h3>You do not have any coment!</h3>
              <p>
                  Please pick a post and comment.
              </p>
              <Link to='/posts'>Back to posts</Link>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default MyComment