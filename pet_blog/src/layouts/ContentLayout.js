import React, { useState, useEffect } from 'react'
import { Outlet, useOutletContext} from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import Footer from '../pages/Footer'
import { getTopicData, getPostData } from '../utils/api'
import { url } from '../utils/urls'



function ContentLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') ? 
    JSON.parse(localStorage.getItem('auth')) :
    null
  )
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
        <header className='main-header'>
            <Navbar 
              topics={topics} 
              setIsAuthenticated={setIsAuthenticated} 
              isAuthenticated={isAuthenticated} 
            />
        </header>
        <main>
            <Outlet context={
              {
                posts:posts, 
                topics:topics,
                setIsAuthenticated:setIsAuthenticated,
                isAuthenticated:isAuthenticated
              }
            }/>
        </main>
        <footer>
          <Footer isAuthenticated={isAuthenticated}/>
        </footer>
        <div className='bg-overlay hide-bg-overlay'></div>
    </React.Fragment>
  )
}

export default ContentLayout
