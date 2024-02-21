import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import landingPageImg from '../images/landing_page.webp'
import { getPostData, getTopicData} from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from './PostList'
import Footer from './Footer'
import paw from '../images/paw.webp'
import LandingPageTopics from '../components/LandingPageTopics'
import LandingPagePosts from '../components/LandingPagePosts'
import LandingPageFeaturePosts from '../components/LandingPageFeaturePosts'
import LandingPageHeader from '../components/LandingPageHeader'
import LandingPageEmailSub from '../components/LandingPageEmailSub'


function LandingPage() {
    const [posts, setPosts] = useState(null)
    const [topics, setTopics] = useState(null)
    const [featured, setFeatured] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const authenticated = window.localStorage.getItem('auth')


    useEffect(()=> {
        const getData = async()=> {
            try {
                const data = await getPostData(`${url}/api/posts/`)
                const objs = data.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()}))
                // const filtered = objs.filter((post)=>post.num_of_replies >= 1)
                setPosts(objs.slice(0,6))
                setFeatured(objs.slice(0,6))
                setTimeout(()=>{
                    setIsLoading(false)
                }, 500)
            } catch ({message}) {
                console.log(message)
                setIsError(message)
                setIsLoading(false)
            }
        }
        getData()
    }, [])

    useEffect(()=> {
        const getTopics = async()=> {
            try {
                const data = await getTopicData(`${url}/api/topics`)
                setTopics(data)
                setTimeout(()=>{
                    setIsLoading(false)
                }, 100)
               
            } catch ({message}) {
                setIsLoading(false)
                setIsError({error:message})
                console.log(message)
            }
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
            <h2>There was an error {window.location.host}</h2>
        )
    }

    return (
        <React.Fragment>
            <header className='landing-page-header'>
                <LandingPageHeader />
            </header>
            <main className='landing-page-main'>
                <div className='mobile-landing-page-hero-wrapper'>
                    <div className="mobile-landing-page-hero-text-wrapper">
                        <h1 className='mobile-landing-page-hero-header'>We are Canine Blog Site</h1>
                        <p className='mobile-landing-page-hero-paragraph'>
                            Request suggestions and share your experience and expertise on various canines's health issues.
                        </p>
                        <Link to={!authenticated ? '/register':'/posts'} className='mobile-landing-page-join-btn'>{authenticated?'Explore':'Join now'}</Link>
                    </div>
                </div>
                <div className='lg-landing-page-hero-wrapper'>
                    <div className="landing-page-hero-container">
                        <div className="landing-page-hero-text-wrapper">
                            <h1 className='landing-page-hero-header'>We are Canine Blog Site</h1>
                            <p className='landing-page-hero-paragraph'>
                                Request suggestions and share your experience and expertise on various canines's health issues.
                            </p>
                            <Link to={!authenticated ? '/register':'/posts'} className='landing-page-join-btn'>{authenticated?'Explore':'Join now'}</Link>
                        </div>
                    </div>
                </div>
                {featured && <LandingPageFeaturePosts featured={featured} />} 
                {topics && <LandingPageTopics topics={topics}/>}
                {posts && <LandingPagePosts posts={posts} />}
                <LandingPageEmailSub />
            </main>
            <footer>
                {posts && topics && 
                    <Footer />
                }
            </footer>
        </React.Fragment>
    )
}

export default LandingPage