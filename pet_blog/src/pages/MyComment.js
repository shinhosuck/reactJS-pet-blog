import React, { useState, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { url } from './PostList'
import LoadingPage from './LoadingPage'
import { fetchComments, removeComment, editComment } from '../utils/api'


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
        setComments(data)
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
      try {
        const data = await fetchComments(`${url}/api/my-comment/`, authenticate.token)
        if(!data.error) {
          setComments(data)
          setIsLoading(false)

        }else {
          console.log(data)
        }
      } catch (error) {
        console.log(error.message)
      }
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
  if(isError) {
      return (
          <h2>There was an error</h2>
      )
  }
  return (
    <React.Fragment>
      <div className="bg-img">
        <div className="my-posts-hero-container">
            <div className="my-posts-header-contents">
                <div className="my-posts-author-profile">
                    <img className='my-posts-profile-img' src={authenticate.profile_image_url} alt="" />
                    <h4 className='my-posts-username'>{authenticate.username}</h4>
                </div>
                <h1 className='my-posts-hero-header'>My Comments</h1>
                <div>
                  <p className='my-posts-num-of-posts'>{authenticate.num_of_comments > 1 ? `${authenticate.num_of_comments} comments`:`${authenticate.num_of_comments} comment`}</p>
                  <Link to='/my-posts' className='my-posts-num-of-comments'>
                    {authenticate.num_of_posts > 1 ? 
                      `${authenticate.num_of_posts} posts`
                    :
                      `${authenticate.num_of_posts} post`}
                  </Link>
                </div>
            </div>
        </div>
      </div>
      <div className='my-comments-container'>
        {comments && comments.map((comment)=> {
            return (
                <div key={comment.id} className="my-comments-container__my-comment">
                  <div className='my-comments-date-and-time'>
                    <p className='my-comments__date-replied'>{new Date(comment.date_posted).toDateString()}</p>
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
                      update
                    </button>
                    <button
                      onClick={()=>deleteComment(comment.id)} 
                      className='my-comments__delete-button'
                    >
                       <i className="fa-solid fa-trash-can"></i>
                      delete
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
    </React.Fragment>
  )
}

export default MyComment