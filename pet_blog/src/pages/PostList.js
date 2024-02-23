import React, { useState, useEffect } from 'react'
import { useOutletContext, useLocation } from 'react-router-dom'
import { getPostData} from '../utils/api'
import LoadingPage from './LoadingPage'
import PostListPosts from '../components/PostListPosts'
import ScrollToTop from '../components/ScrollToTop'

export const url = window.location.host === 'localhost:3000' ? 
'http://127.0.0.1:8000' : 'https://pawpals.pythonanywhere.com'



function PostList() {
  const [posts, setPosts] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // const [message, setMessage] = useState(null)
  // const [user, setUser] = useState(null)
  // const {topics} = useOutletContext()
  // const {state, pathname} = useLocation()

  
  const authenticated = JSON.parse(localStorage.getItem('auth')) || null

  window.history.replaceState({state:null}, '', '/posts')

  const getData = async()=> {
    try {
      const data = await getPostData(`${url}/api/posts/`)
      const objs = data.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()}))
      setPosts(objs)
      const timeoutID = setTimeout(()=>{
        setIsLoading(false)
        clearTimeout(timeoutID)
      }, 100)
    } catch ({message}) {
      setIsError(message)
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  // useEffect(()=> {
  //   if(authenticated) {
  //     setUser(authenticated)
  //   }
  // }, [])

  // useEffect(()=>{
  //   state && state.message && setMessage(state.message)
  //   if(state) {
  //     !authenticated && setUser(null)
  //     const timeoutID = setTimeout(()=>{
  //       const element = document.querySelector('.post-list-message')
  //       if(element) {
  //         element.style.display = 'none'
  //       }
  //       clearTimeout(timeoutID)
  //     }, 5000)
  //   }
  // }, [state])

  if(isLoading) {
    return (
      <LoadingPage />
    )
  }
  if(isError) {
    return (
      <h2>There was an error {window.location.host}</h2>
    )
  }
  return (
    <React.Fragment>
      <ScrollToTop />
      <div className="bg-img">
        <div className="bg-img-header-container">
          <div className="bg-img-contents">
            <h1 className='bg-img-header'>Latest Posts</h1>
            <p className='bg-img-text'>
              You'll find a wealth of information about caring for your canine companion, 
              from best practices to advice against.
            </p>
          </div>
        </div>
      </div>

      {/* {message && <p className='post-list-message'>{message}</p>} */}
      {posts && 
        <PostListPosts 
          posts={posts} 
          // user={user} 
        />
      }
    </React.Fragment>
  )
}

export default PostList