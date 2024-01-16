import React, { useState, useEffect } from 'react'
import { Link, NavLink, useOutletContext, useLocation, useNavigate} from 'react-router-dom'
import { getPostData } from '../utils/api'
import LoadingPage from './LoadingPage'
import image from '../images/default.png'



export const url = window.localStorage.host === '127.0.0.1:8000' ? 
'http://127.0.0.1:8000' : 'https://pawpals.pythonanywhere.com'

localStorage.setItem('url', url)
console.log('hello world')

function PostList() {
  const [posts, setPosts] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const {topics} = useOutletContext()
  const {state} = useLocation()
  const authenticated = JSON.parse(localStorage.getItem('auth')) || null
  const navigate = useNavigate()

  window.history.replaceState({state:null}, '', '/posts')

  const getData = async()=> {
    try {
      const data = await getPostData(`${url}/api/posts/`)
      const objs = data.map((post)=>({...post, date_posted:new Date().toDateString()}))
      setPosts(objs)
      setTimeout(()=>{
        setIsLoading(false)
      }, 500)
    } catch ({message}) {
      setIsError(message)
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    getData()
    if(state) {
      const timeoutID = setTimeout(()=>{
        const message = document.querySelector('.post-list-message')
        const errorMessage = document.querySelector('.post-list-error-message')
        if(message) {
          message.style.display = 'none'
          
        }else if(errorMessage) {
          errorMessage.style.display = 'none'

        }
        clearInterval(timeoutID)
      }, 5000)
    }
  }, [])

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
      <div className="bg-img"></div>
      {state && state.message && <p className='post-list-message'>{state.message}</p>}
      {state && state.error && <p className='post-list-error-message'>{state.error}</p>}
      <div className="post-list-main-container">
        <div className='post-container'>
          <Link to='/create/post/' className="post-container__post-list-create-post">
            <div className='post-container__create-post-image-container'>
              <img className='post-container__create-post-image' src={image} alt="" />
              <p className='post-container__create-post-text'>Start a post</p>
            </div>
          </Link>
          <div className="post-container__posts">
            {posts.map((post)=>{
              return (
                <div key={post.id} className="post-container__post">
                  <div className="post-container__post-image-container">
                    <img className='post-container__post-image' src={post.image_url} alt={post.title} />
                    <div className="post-container__post-image-color-overlay"></div>
                  </div>
                  <div className='post-container__post-text-content'>
                    <div className='post-container__author-and-date'>
                      <h4 className='post-container__post-author'>{post.author}</h4>
                      <p className='post-container__date-posted'>{post.date_posted}</p>
                      <div className="post-container__date-and-like">
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
                    <h3 className='post-container__post-title'>{post.title}</h3>
                    <p className='post-container__post-content'>{post.content.substring(0, 100)}...</p>
                    <Link to={`/post/${post.id}/detail/`} className='post-container__post-read-more-btn'>
                      Read More
                    </Link>
                    <Link
                      to={`/topic/${post.topic}/posts/?filter=${post.topic.toLowerCase()}`} 
                      state={{topic:post.topic}} 
                      className='post-container__post-topic'
                     >
                      <span>{post.topic}</span>
                      <i className="fa fa-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SIDE BAR */}
        <div className="post-list-side-bar-topics">
          <h2 className='post-list-side-bar-topics__header'>Popular Topics</h2>
          {topics.map((topic)=>{
            return (
              <Link
                to={!topic.total_post ? '.' : `/topic/${topic.name.toLowerCase()}/posts/?filter=${topic.name.toLowerCase()}`} 
                key={topic.id} 
                className="post-list-side-bar-topics__topic"
                state={{topic:topic.name}}
              >
                  <div className='post-list-side-bar-topics__topic-title-container'>
                      <h3 className='post-list-side-bar-topics__topic-name'>{topic.name}</h3>
                      {topic.total_post > 1 ? 
                          <div className='post-list-side-bar__topic-post-count'>
                            <i className="fa-solid fa-message post-list-side-bar__num-of-post"></i>
                            <span className='post-list-side-bar__post-count'>{topic.total_post}</span>
                            <span className='post-list-side-bar__text'>posts</span>
                          </div>
                      :
                          <div className='post-list-side-bar__topic-post-count'>
                            <i className="fa-solid fa-message post-list-side-bar__num-of-post"></i>
                            <span className='post-list-side-bar__post-count'>{topic.total_post}</span>
                            <span className='post-list-side-bar__text'>post</span> 
                          </div>
                      }
                  </div>
                  <p className='post-list-side-bar-topics__topic-description'>{topic.description.substring(0, 50)}...<span>Read more</span></p>
              </Link>
            )
          })}
        </div>
        
      </div>
    </React.Fragment>
  )
}

export default PostList