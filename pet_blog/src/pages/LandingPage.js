import React, { useState, useEffect } from 'react'
import { Link, Navigate} from 'react-router-dom'
import { getPostData, getTopicData} from '../utils/api'
import { url } from '../utils/urls'
import Footer from '../components/Footer'
import LandingPageTopics from '../components/LandingPageTopics'
import LandingPagePosts from '../components/LandingPagePosts'
import LandingPageFeaturePosts from '../components/LandingPageFeaturePosts'
import LandingPageHeader from '../components/LandingPageHeader'
import LandingPageEmailSub from '../components/LandingPageEmailSub'
import LoadingPage from './LoadingPage'


function LandingPage() {
    const [featuredPosts, setFeaturedPosts] = useState(null)
    const [topics, setTopics] = useState(null)
    const [latesPosts, setLatestPosts] = useState(null)
    const [isError, setIsError] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const isAuthenticated = window.localStorage.getItem('auth')

    useEffect(()=> {
        const getPosts = async()=> {
            const data = await getPostData(`${url}/api/posts/`)
            if(data.error) {
                setIsError(data.error)
            }
            else {
                const objs = data.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()}))
                const latesPost = data.filter((post)=>!post.featured).sort((a, b)=>new Date(b.date_posted)-new Date(a.date_posted))
                .map((post)=> {
                    const newDate = new Date(post.date_posted)
                    const formatedDate = `${newDate.toDateString()} ${newDate.toLocaleTimeString({hour: '2-digit', minute:'2-digit'})}`
                    return {...post, date_posted:formatedDate}
                })
                const featuredPosts = objs.filter((post)=>post.featured)
                setLatestPosts(latesPost.slice(0,6))
                setFeaturedPosts(featuredPosts.slice(0,6))
                setIsLoading(false)
            }
        }
        getPosts()
    }, [])

    useEffect(()=> {
        const getTopics = async()=> {
            const data = await getTopicData(`${url}/api/topics`)
            if(data.error){
                setIsError(data.error)
            }
            setTopics(data)
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
                        <Link to={!isAuthenticated ? '/register':'/posts'} className='mobile-landing-page-join-btn'>{isAuthenticated?'Explore':'Join now'}</Link>
                    </div>
                </div>
                <div className='lg-landing-page-hero-wrapper'>
                    <div className="landing-page-hero-container">
                        <div className="landing-page-hero-text-wrapper">
                            <h1 className='landing-page-hero-header'>We are Canine Blog Site</h1>
                            <p className='landing-page-hero-paragraph'>
                                Request suggestions and share your experience and expertise on various canines's health issues.
                            </p>
                            <Link to={!isAuthenticated ? '/register':'/posts'} className='landing-page-join-btn'>{isAuthenticated?'Explore':'Join now'}</Link>
                        </div>
                    </div>
                </div>
                {featuredPosts && <LandingPageFeaturePosts featuredPosts={featuredPosts} />} 
                {topics && <LandingPageTopics topics={topics}/>}
                {latesPosts && <LandingPagePosts latesPosts={latesPosts} />}
                <LandingPageEmailSub />
            </main>
            <footer>
                <Footer isAuthenticated={isAuthenticated}/>
            </footer>
        </React.Fragment>
    )
}

export default LandingPage