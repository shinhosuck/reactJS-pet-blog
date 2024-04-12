import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getPostData} from '../utils/api'
import LoadingPage from './LoadingPage'
import PostListPosts from '../components/PostListPosts'
import { getTopicData } from '../utils/api'
import { url } from '../utils/urls'


function PostList() {
  const [posts, setPosts] = useState(null)
  const [topics, setTopics] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const authenticated = JSON.parse(localStorage.getItem('auth')) || null
  window.history.replaceState({state:null}, '', '/posts')
  

  // const getPosts = async()=> {
  //   const data_objs = await getPostData(`${url}/api/posts/`)
  //   if (data_objs.error) {
  //     setIsError(data_objs.error)
  //   }
  //   const post_data = data_objs.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()}))
  //   setPosts(post_data)
  //   setIsLoading(false)
  // }

  

  useEffect(()=>{
    const getPosts = async()=> {
      const data_objs = await getPostData(`${url}/api/posts/`)
      if (data_objs.error) {
        setIsError(data_objs.error)
      }
      const post_data = data_objs.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()}))
      setPosts(post_data)
      setIsLoading(false)
    }
    getPosts()
  }, [])

  useEffect(()=> {
    const getTopics = async()=> {
      const topics_data = await getTopicData(`${url}/api/topics/`)
      if(topics_data.error){
        setIsError(topics_data.error)
      }
      setTopics(topics_data)
      setIsLoading(false)
    } 
    getTopics()
  }, [])

  if(isLoading) {
    return (
      <LoadingPage />
    )
  }
  if(isError) {
    return (
      <Navigate to='/error' state={{error:isError}}/>
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
      {posts && topics && <PostListPosts posts={posts} topicsOjbs={topics}/>
      }
    </React.Fragment>
  )
}

export default PostList