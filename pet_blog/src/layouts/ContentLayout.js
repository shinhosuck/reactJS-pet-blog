import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import Footer from '../pages/Footer'
import { getTopicData, getPostData } from '../utils/api'
import { url } from '../pages/PostList'



function ContentLayout() {
  const [topics, setTopics] = useState(null)
  const [posts, setPosts] = useState(null)


  
  const getTopics = async()=> {
    try {
      const data = await getTopicData(`${url}/api/topics/`)
      setTopics(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getPosts = async()=> {
    try {
      const data = await getPostData(`${url}/api/posts/`)
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
          <Footer />
        </footer>
        <div className='bg-overlay hide-bg-overlay'></div>
    </React.Fragment>
  )
}

export default ContentLayout
