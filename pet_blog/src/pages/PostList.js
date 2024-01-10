import React, { useState, useEffect } from 'react'
import { Link, NavLink, useOutletContext, useLocation, useNavigate} from 'react-router-dom'
import { getPostData } from '../utils/api'
import LoadingPage from './LoadingPage'
import image from '../images/default.png'



export const url = 'http://127.0.0.1:8000'

function PostList() {
  const [posts, setPosts] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const {topics} = useOutletContext()
  const {state} = useLocation()
  const authenticated = localStorage.getItem('auth') || null
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
              <p className='post-container__create-post-text'>What's on your mind?</p>
            </div>
            <button className='post-container__create-post-btn'>Create Post</button>
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
        <div className="post-list-side-bar-topics">
          <h2 className='post-list-side-bar-topics__header'>Popular Topics</h2>
          {topics.map((topic)=>{
            return (
              <div key={topic.id} className="post-list-side-bar-topics__topic">
                  <img className='post-list-side-bar-topics__topic-image' src={topic.image_url} alt={topic.name} />
                  <div className='post-list-side-bar-topics__topic-title-container'>
                      <h3 className='post-list-side-bar-topics__topic-name'>{topic.name}</h3>
                      {topic.total_post > 1 ? 
                          <div className='topic-post-count'>
                            <i className="fa-solid fa-message post-container__num-of-post "></i>
                            <span className='topic-total-post-count'>{topic.total_post}</span>
                            <span className='topic-total-post-count-text'>posts</span>
                          </div>
                      :
                          <div className='topic-post-count'>
                            <i className="fa-solid fa-message post-container__num-of-post "></i>
                            <span className='topic-total-post-count'>{topic.total_post}</span>
                            <span className='topic-total-post-count-text'>post</span> 
                          </div>
                      }
                  </div>
                  <p className='post-list-side-bar-topics__topic-description'>{topic.description}</p>
                  {topic.total_post > 1 ?
                      <Link to={`/posts/topic/?filter=${topic.name.toLowerCase()}`} state={{topic:topic.name}} className='post-list-side-bar-topics__topic-see-all-post-btn'>See Posts</Link>
                  :
                      <>
                          {topic.total_post === 0 ?
                              <Link className='post-list-side-bar-topics__topic-see-all-post-btn'>No Post to See</Link>
                          :
                              <Link to={`/posts/topic/?filter=${topic.name.toLowerCase()}`} state={{topic:topic.name}} className='post-list-side-bar-topics__topic-see-all-post-btn'>See Post</Link>
                          }
                      </>
                  }
              </div>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default PostList