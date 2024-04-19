import React, { useState, useEffect, createContext } from 'react'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import { getTopicData, getPostData } from '../utils/api'
import { url } from '../utils/urls'


export const ContentLayoutContext = createContext()


function ContentLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') ? 
    JSON.parse(localStorage.getItem('auth')) :
    null
  )
  const [topics, setTopics] = useState(null)
  const [posts, setPosts] = useState(null)
  const navigate = useNavigate()

  useEffect(()=> {
    const getTopics = async()=> {
      const data = await getTopicData(`${url}/api/topics/`)
      setTopics(data)
    }
    getTopics()
  }, [])

  useEffect(()=> {
    const getPosts = async()=> {
      try {
        const data = await getPostData(`${url}/api/posts/`)
        
        setPosts(data)
      } catch ({message}) {
        console.log(message)
      }
    }
    getPosts()
  }, [])

  return (
    <ContentLayoutContext.Provider value={
        {
          topics:topics,
          posts:posts,
          setIsAuthenticated:setIsAuthenticated,
          isAuthenticated:isAuthenticated
        }
      }
    >
        <header className='main-header'>
            <Navbar/>
        </header>
        <main>
            <Outlet context={
              {
                // posts:posts, 
                // topics:topics,
                setIsAuthenticated:setIsAuthenticated,
                isAuthenticated:isAuthenticated
              }
            }/>
        </main>
        <footer>
          <Footer isAuthenticated={isAuthenticated}/>
        </footer>
        <div className='bg-overlay hide-bg-overlay'></div>
    </ContentLayoutContext.Provider>
  )
}

export default ContentLayout
