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
  const {pathname} = useLocation()
  window.history.replaceState({state:null}, '', '/my-posts')


  const getMyPosts = async()=> {
    try {
      const data = await getMyData(`${url}/api/my-post/`, authenticated.token)
      if(data.error) {
        setIsLoading(false)
        setIsError({error:data.error})

      }else {
        const objs = data.map((post)=>({...post, date_posted:new Date().toDateString()}))
        setPosts(objs)
        const timeoutID = setTimeout(()=> {
          setIsLoading(false)
          clearTimeout(timeoutID)
        }, 100)
      }
    } catch (error) {
      console.log('MESSAGE:', error.message, 'NAME:', error.name)
      setIsLoading(false)
      setIsError(
        {
          error:error.message, 
          name:error.name
        }
      )

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
        setIsError({error:data.message})
      }

    } catch (error) {
      setIsError(
        {
          error:error.message, 
          name:error.name
        }
      )
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
      <Navigate 
        to='/login' 
        replace={true} 
        state={
            {
              redirect:pathname ,
              error:'Please login to see your post!'
            }
          }
        />
    )
  }
  if(isLoading) {
    return (
      <LoadingPage />
    )
  }
  if(isError) {
    return (
      <Navigate 
        to='/error' 
        replace={true} 
        state={
          {
            message:{
              error:isError.error,
              name:isError.name
            }
          }
        }
      />
    )
  }
  return (
    <React.Fragment>
      <div className="bg-img">
        <div className="my-posts-hero-container">
            <div className="my-posts-header-contents">
                <div className="my-posts-author-profile">
                    <img className='my-posts-profile-img' src={authenticated.profile_image_url} alt="" />
                    <h4 className='my-posts-username'>{authenticated.username}</h4>
                </div>
                <h1 className='my-posts-hero-header'>My Posts</h1>
                <div>
                  <p className='my-posts-num-of-posts'>{posts.length > 1 ? `${posts.length} posts`:`${posts.length} posts`}</p>
                  <Link to='/my-comments' className='my-posts-num-of-comments'>
                    {authenticated.num_of_comments > 1 ? 
                      `${authenticated.num_of_comments} comments`
                    :
                      `${authenticated.num_of_comments} comment`}
                  </Link>
                </div>
            </div>
        </div>
      </div>
      <div className="my-posts-main-container">
        <div className='my-posts-container'>
            <div className="my-posts-container__posts">
              {posts.map((post)=> {
                return (
                  <div key={post.id} className="my-posts-container__post">
                    <div className="my-posts-container__post-image-container">
                      <img className='my-posts-container__post-image' src={post.image_url} alt={post.title} />
                      {post.like.length > 1 ? 
                        <div className='post-container__post-like'>
                          <div className='post-container__post-like-container'>
                              <i className="fa-solid fa-hands-clapping post-container__clapping"></i>
                              <span className='post-container__post-like-count'>{post.like.length}</span>
                          </div>
                          <div className='post-container__num-of-replies-container'>
                              <i className="fa-solid fa-message post-container__num-of-post"></i>
                              <span className='post-container__post-reply-count'>{post.num_of_replies}</span>
                          </div>
                          <div className="my-posts-container__btns">
                            <Link 
                              to={`/update/${post.id}/post`} state={{update:post, redirect:pathname}} 
                              className='my-posts-container__post-update'
                            >
                              <i className="fa-solid fa-pen post-detail-edit-btn"></i>
                              <span className='post-detail-edit-text'>edit</span>
                            </Link>
                            <button onClick={(e)=>removePost(e, post)} className='my-posts-container__post-delete'>
                              <i className="fa-solid fa-trash-can post-detail-remove-icon"></i>
                              <span className='post-detail-remove-text'>delete</span>
                            </button>
                          </div>
                        </div>
                      : 
                        <div className='post-container__post-like'>
                          <div className='post-container__post-like-container'>
                              <i className="fa-solid fa-hands-clapping post-container__clapping"></i>
                              <span className='post-container__post-like-count'>{post.like.length}</span>
                          </div>
                          <div className='post-container__num-of-replies-container'>
                              <i className="fa-solid fa-message post-container__num-of-post"></i>
                              <span className='post-container__post-reply-count'>{post.num_of_replies}</span>
                          </div>
                          <div className="my-posts-container__btns">
                            <Link 
                              to={`/update/${post.id}/post`} state={{update:post, redirect:pathname}} 
                              className='my-posts-container__post-update'
                            >
                              <i className="fa-solid fa-pen post-detail-edit-btn"></i>
                              <span className='post-detail-edit-text'>edit</span>
                            </Link>
                            <button onClick={(e)=>removePost(e, post)} className='my-posts-container__post-delete'>
                              <i className="fa-solid fa-trash-can post-detail-remove-icon"></i>
                              <span className='post-detail-remove-text'>delete</span>
                            </button>
                          </div>
                        </div>
                      }
                    </div>
                    <div className='my-posts-container__post-text-content'>
                      <p className='my-posts-container__date-posted'>Posted on {post.date_posted}</p>
                      <h3 className='my-posts-container__post-title'>{post.title}</h3>
                      <p className='my-posts-container__post-content'>{post.content}</p>
                      {/* <div className="my-posts-container__btns">
                        <Link 
                          to={`/update/${post.id}/post`} state={{update:post, redirect:pathname}} 
                          className='my-posts-container__post-update'
                        >
                          <i className="fa-solid fa-pen post-detail-edit-btn"></i>
                          <span className='post-detail-edit-text'>edit</span>
                        </Link>
                        <button onClick={(e)=>removePost(e, post)} className='my-posts-container__post-delete'>
                          <i className="fa-solid fa-trash-can post-detail-remove-icon"></i>
                          <span className='post-detail-remove-text'>delete</span>
                        </button>
                      </div> */}
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