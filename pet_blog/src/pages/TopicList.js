import React, { useState, useEffect } from 'react'
import { Link, useOutletContext, useLocation } from 'react-router-dom'
import { getTopicData } from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from './PostList'
import TopicListTopics from '../components/TopicListTopics'
import TopicListSidebar from '../components/TopicListSidebar'
import ScrollToTop from '../components/ScrollToTop'



function TopicList() {
    const {posts} = useOutletContext()
    const [topics, setTopics] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const {state} = useLocation()

    window.history.replaceState({state:null}, '', '/topics')

    const getTopics = async()=> {
        try {
            const data = await getTopicData(`${url}/api/topics/`)
            setTopics(data)
            const timeoutID = setTimeout(()=>{
                setIsLoading(false)
                clearTimeout(timeoutID)
            }, 100)
        } catch ({message}) {
            setIsError(message)
            setIsLoading(false)
            console.log(message)
        }
    }

    useEffect(()=> {
        getTopics()
    }, [])

    useEffect(()=> {
        if(state && state.error) {
            const timeoutID = setTimeout(()=>{
                const errorMessage = document.querySelector('.topics-error-message')
                errorMessage.style.display = 'none'
                clearTimeout(timeoutID)
            }, 5000)
        }
    }, [state])

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
        <>
            <ScrollToTop />
            <div className="bg-img">
                <div className="bg-img-header-container">
                    <div className="bg-img-contents">
                        <h1 className='bg-img-header'>Topics</h1>
                        <p className='bg-img-text'>
                            Ask questions, share your experiences,
                            and discuss topics of mutual interest.
                        </p>
                    </div>
                </div>
            </div>

            {/* {state && state.error && <p className='topics-error-message'>{state.error}</p>} */}

            <div className="topics-main-container">
                {topics && <TopicListTopics topics={topics} />}
                {posts && <TopicListSidebar posts={posts} />}
            </div>
        </>
    )
}

export default TopicList