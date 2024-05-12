import React, { useState, useEffect } from 'react'
import { useLocation, Navigate, useNavigate, Link, useOutletContext} from 'react-router-dom'
import { getMyData, deletePost } from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from '../utils/urls'
import dogImg from '../images/cartoon_dog.png'
import { formatDate } from '../utils/formatDate'
import SidebarLatestPosts from '../components/SidebarLatestPosts'


function MyPost() {
  const [posts, setPosts] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const authenticated = JSON.parse(localStorage.getItem('auth')) || null
  const {pathname} = useLocation()
  window.history.replaceState({state:null}, '', '/my-posts')
  const [ scrollHeight, setScrollHeight] = useState(window.pageYOffset)

  function endEventListener(){
      const postDetailSideBar = document.querySelector('.posts-side-bar')
      const scrolled = window.pageYOffset
      if(scrolled >= 450) {
          if(postDetailSideBar) {
              postDetailSideBar.style.top = '75px'
          }
      }else {
          if(postDetailSideBar) {
              postDetailSideBar.style.top = '0px'
          }
      }
      setScrollHeight(scrolled)
      return window.removeEventListener(
          'scroll', 
          endEventListener
      )
  }
    
  const getMyPosts = async()=> {
    const data = await getMyData(`${url}/api/my-post/`, authenticated.token)
    if(data.error || data.message || data.length === 0) {
      setIsLoading(false)

    }else {
      const objs = data.sort((a, b)=>new Date(b.date_posted)-new Date(a.date_posted))
      setPosts(objs)
      setIsLoading(false)
    }
  }

  const removePost = async(e, post)=> {
      const data = await deletePost(`${url}/api/post/${post.id}/delete/`, authenticated.token)
      if(!data.error) {
        const newPostArray = posts.filter((obj)=>obj.id !== post.id)
        setPosts(newPostArray)
        console.log(data.message)

      }else {
        setIsError({error:data.error})
      }
  }

  useEffect(()=> {
    window.addEventListener(
        'scroll', 
        endEventListener
    )
  }, [scrollHeight])

  useEffect(()=> {
    getMyPosts()
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
                    <img className='my-posts-profile-img' src={authenticated.image_url} alt="" />
                    <h4 className='my-posts-username'>{authenticated.username}</h4>
                </div>
                <h1 className='my-posts-hero-header'>My Posts</h1>
                <div>
                  <p className='my-posts-num-of-posts'>
                    {authenticated.qs_count.post_count > 1 ? 
                    `${authenticated.qs_count.post_count} posts`
                    :
                    `${authenticated.qs_count.post_count} posts`}
                  </p>
                  <Link to='/my-comments' className='my-posts-num-of-comments'>
                    {authenticated.qs_count.comment_count > 1 ? 
                      `${authenticated.qs_count.comment_count} comments`
                    :
                      `${authenticated.qs_count.comment_count} comment`}
                  </Link>
                </div>
            </div>
        </div>
      </div>
      <div className="my-posts-main-container">
        <div className='my-posts-container'>
          {!posts ?
            <div className="no-topic-post-container">
              <img src={dogImg} alt="" />
              <div className="no-topic-post-text-container">
                  <h3>You do not have any post!</h3>
                  <p>
                      Please pick a topic and create a post to start a new conversation.
                  </p>
                  <Link to='/create/post'>Create Post</Link>
              </div>
            </div> 
          : 
            <div className="my-posts-container__posts">
              {posts.map((post)=> {
                return (
                  <div key={post.id} className="my-posts-container__post">
                    <h3 className='my-posts-container__post-title'>{post.title}</h3>
                    <p className='my-posts-container__date-posted'>{formatDate(post.date_posted)}</p>
                    <div className="my-posts-container__post-image-container">
                      <img className='my-posts-container__post-image' src={post.image_url} alt={post.title} />
                      <div className='post-container__post-like'>
                        <div className='post-container__post-like-container'>
                            <i className="fa-solid fa-hands-clapping post-container__clapping"></i>
                            <span className='post-container__post-like-count'>{post.qs_count.like_count}</span>
                        </div>
                        <div className='post-container__num-of-replies-container'>
                            <i className="fa-solid fa-comment post-container__num-of-post"></i>
                            <span className='post-container__post-reply-count'>{post.qs_count.comment_count}</span>
                        </div>
                        <div className="my-posts-container__btns">
                          <Link 
                            to={`/update/${post.id}/post`} state={{update:post, redirect:pathname}} 
                            className='my-posts-container__post-update'
                          >
                            <i className="fa-solid fa-pen post-detail-edit-btn"></i>
                            <span className='post-detail-edit-text'>Edit</span>
                          </Link>
                          <button onClick={(e)=>removePost(e, post)} className='my-posts-container__post-delete'>
                            <i className="fa-solid fa-trash-can post-detail-remove-icon"></i>
                            <span className='post-detail-remove-text'>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='my-posts-container__post-text-content'>
                      <p className='my-posts-container__post-content'>{post.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          }
        </div>
        <div className='posts-side-bar'>
            <SidebarLatestPosts />
        </div>
      </div>
    </React.Fragment>
  )
}

export default MyPost