import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { getTopicData, getPostData } from '../utils/api'





const postsUrl = 'http://127.0.0.1:8000/api/posts/'
const topicsurl = 'http://127.0.0.1:8000/api/topics/'

function ContentLayout() {
  const [topics, setTopics] = useState(null)
  const [posts, setPosts] = useState(null)


  const getTopics = async()=> {
    try {
      const data = await getTopicData(topicsurl)
      setTopics(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getPosts = async()=> {
    try {
      const data = await getPostData(postsUrl)
      setPosts(data)
    } catch ({message}) {
      console.log(message)
    }
  }

  useEffect(()=> {
    getTopics()
  }, [])

  useEffect(()=> {
    getPosts()
  }, [])

  return (
    <React.Fragment>
        <header>
            <Navbar />
        </header>
        <main>
            <Outlet context={
              {
                posts:posts, 
                topics:topics,
              }
            }/>
        </main>
        <footer>
            <h2>Footer</h2>
        </footer>
    </React.Fragment>
  )
}

export default ContentLayout