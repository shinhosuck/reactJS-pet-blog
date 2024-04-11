import React, { useState, useEffect } from 'react'
import {useOutletContext} from 'react-router-dom'
import { getPostData} from '../utils/api'
import LoadingPage from './LoadingPage'
import PostListPosts from '../components/PostListPosts'
import { getTopicData } from '../utils/api'
import { url } from '../utils/urls'

// export const url = window.location.host === 'localhost:3000' ? 
// 'http://127.0.0.1:8000' : 'https://pawpals.pythonanywhere.com'



function PostList() {
  const [posts, setPosts] = useState(null)
  const [topics, setTopics] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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

  const getTopics = async()=> {
    try {
      const data = await getTopicData(`${url}/api/topics/`)
      setTopics(data)
      // console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  } 

  useEffect(()=>{
    getData()
    getTopics()
  }, [])

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
          topicsArray={topics}
          // user={user} 
        />
      }
    </React.Fragment>
  )
}

export default PostList