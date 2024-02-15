import React, { useState, useEffect } from 'react'
import { useLocation, Navigate, useNavigate, Link} from 'react-router-dom'
import { getMyData, deletePost } from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from './PostList'



function MyPost() {
  const [posts, setPosts] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const authenticated = JSON.parse(localStorage.getItem('auth')) || null
  const {state, pathname} = useLocation()
  const navigate = useNavigate()


  window.history.replaceState({state:null}, '', '/my-posts')

  const getMyPosts = async()=> {
    try {
      const data = await getMyData(`${url}/api/my-post/`, authenticated.token)
      if(data.error) {
        setIsLoading(false)
        setIsError(data)

      }else {
        const objs = data.map((post)=>({...post, date_posted:new Date().toDateString()}))
        setPosts(objs)
        const timeoutID = setTimeout(()=> {
          setIsLoading(false)
          clearTimeout(timeoutID)
        }, 500)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const removePost = async(e, post)=> {
    try {
      const data = await deletePost(`${url}/api/post/${post.id}/delete/`, authenticated.token)
      if(!data.error) {
        const newPostArray = posts.filter((obj)=>obj.id !== post.id)
        setPosts(newPostArray)
        console.log(data.message)

      }else {
        console.log(data.error)
      }
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=> {
    getMyPosts()
    const timeoutID = setTimeout(()=> {
      const message = document.querySelector('.my-posts-container__message')
        if(message) {
          message.style.display = 'none'
        }
        clearTimeout(timeoutID)
    }, 3000)
    
  }, [])

  if(!authenticated) {
    return (
      <Navigate to='/login' replace={true} state={{redirect:pathname ,error:'Please login to see your post!'}}/>
    )
  }
  if(isLoading) {
    return (
      <LoadingPage />
    )
  }
  if(isError) {
    return (
      <Navigate to='/error' replace={true} state={{message:isError.error}}/>
    )
  }
  return (
    <React.Fragment>
      <div className="bg-img"></div>
      <div className="my-posts-main-container">
        <div className='my-posts-container'>
            <div className="my-posts-container__posts">
              {posts.map((post)=> {
                return (
                  <div key={post.id} className="my-posts-container__post">
                    <div className="my-posts-container__post-image-container">
                      <img className='my-posts-container__post-image' src={post.image_url} alt={post.title} />
                      <div className="my-posts-container__post-image-color-overlay"></div>
                    </div>
                    <div className='my-posts-container__post-text-content'>
                      <div className='my-posts-container__author-and-date'>
                        <div className="my-posts-container__date-and-like">
                          <p className='my-posts-container__date-posted'>{post.date_posted}</p>
                          {post.like.length > 1 ? 
                            <div className='post-container__post-like'>
                              <div className='post-like-container'>
                                <i className="fa-solid fa-hands-clapping post-like"></i>
                                <span className='post-like-count'>{post.like.length}</span>
                                <span className='post-like-text'>likes</span>
                              </div>
                              <div className='post-container__num-of-replies-container'>
                                <i className="fa-solid fa-message post-container__num-of-post"></i>
                                <span className='post-reply-count'>{post.num_of_replies}</span>
                                <span className='post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                              </div>
                            </div>
                          : 
                            <div className='post-container__post-like'>
                              <div className='post-like-container'>
                                <i className="fa-solid fa-hands-clapping post-like"></i>
                                <span className='post-like-count'>{post.like.length}</span>
                                <span className='post-like-text'>like</span>
                              </div>
                              <div className='post-container__num-of-replies-container'>
                                <i className="fa-solid fa-message post-container__num-of-post "></i>
                                <span className='post-reply-count'>{post.num_of_replies}</span>
                                <span className='post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                      <h3 className='my-posts-container__post-title'>{post.title}</h3>
                      <p className='my-posts-container__post-content'>{post.content}</p>
                      <div className="my-posts-container__btns">
                        <Link to={`/update/${post.id}/post`} state={{update:post, redirect:pathname}} className='my-posts-container__post-update'>
                          Update Post
                        </Link>
                        <button onClick={(e)=>removePost(e, post)} className='my-posts-container__post-delete'>Delete Post</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MyPost