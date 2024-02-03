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

function LandingPage() {
    const [showNavLinks, setShowNavLinks] = useState(false)
    const [posts, setPosts] = useState(null)
    const [topics, setTopics] = useState(null)
    const [featured, setFeatured] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const {pathname, state} = useLocation()



    useEffect(()=> {
        const getData = async()=> {
            try {
                const data = await getPostData(`${url}/api/posts/`)
                const objs = data.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()}))
                // const filtered = objs.filter((post)=>post.num_of_replies >= 1)
                setPosts(objs.slice(0,6))
                setFeatured(objs.slice(0,4))
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
                setTopics(data.slice(0,4))
                setTimeout(()=>{
                    setIsLoading(false)
                }, 500)
               
            } catch ({message}) {
                setIsLoading(false)
                setIsError({error:message})
                console.log(message)
            }
        }
        getTopics()
    }, [])

    useEffect(()=>{
        if(showNavLinks) {
            window.scrollTo({top:0})
            document.body.style.overflowY = 'hidden'

        }else if(!showNavLinks) {
            document.body.style.overflowY = 'scroll'
        }
    }, [showNavLinks, !showNavLinks])


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
            <header>
                <div className="landing-page-navbar-container">
                    <nav className="landing-page-navbar-wrapper">
                        <Link to='/posts' className='landing-page-navbar-brand-link'>
                            <img className='landing-page-navbar-brand-logo' src={paw} alt="paw" />
                            <div className="landing-page-navbar-brand-verticla-line"></div>
                            <div className='landing-page-navbar-brand-name-container'>
                                <span className='landing-page-navbar-brand-name-lg-text'>PawPals</span>
                                <span className='landing-page-navbar-brand-name-sm-text'>BlogForum</span>
                            </div>
                        </Link>
                        <div className="landing-page-navlinks-toggle-btns">
                            <button onClick={()=>setShowNavLinks(true)} className='landing-page-toggle-btn landing-page-show-navlink-btn'>
                                <i className="fa fa-bars"></i>
                            </button>
                        </div>
                        <div className={showNavLinks?"show-landing-page-nav-links landing-page-navlinks":"landing-page-navlinks"}>
                            <button onClick={()=>setShowNavLinks(false)} className='landing-page-toggle-btn landing-page-hide-navlink-btn'>
                                <i className="fa fa-times"></i>
                            </button>
                            <Link
                                to='/topics' 
                                className='landing-page-navlink'
                                onClick={()=> {
                                    document.body.style.overflowY = 'scroll'
                                    setShowNavLinks(false)
                                }}
                            >
                                Topics
                            </Link>
                            <Link
                                to='/posts' 
                                className='landing-page-navlink'
                                onClick={()=> {
                                    document.body.style.overflowY = 'scroll'
                                    setShowNavLinks(false)
                                }}
                            >
                                Posts
                            </Link>
                            <Link
                                to='/login' 
                                className='landing-page-navlink landing-page-login-btn'
                                onClick={()=> {
                                    document.body.style.overflowY = 'scroll'
                                    setShowNavLinks(false)
                                }}
                            >
                                Login
                            </Link>
                        </div>
                    </nav>
                </div>
                <div className='mobile-landing-page-hero-wrapper'>
                    <div className="mobile-landing-page-hero-text-wrapper">
                        <h1 className='mobile-landing-page-hero-header'>We are Canine Blog Site</h1>
                        <p className='mobile-landing-page-hero-paragraph'>
                            Here, you can seek suggestions about your canine's health issues or share your expertise on various canines's health problems.
                        </p>
                        <Link to='/register' className='mobile-landing-page-join-btn'>Join now</Link>
                    </div>
                </div>
                <div className='lg-landing-page-hero-wrapper'>
                    <div className="landing-page-hero-container">
                        <div className="landing-page-hero-text-wrapper">
                            <h1 className='landing-page-hero-header'>We are Canine Blog Site</h1>
                            <p className='landing-page-hero-paragraph'>
                                Request suggestions about your canine's health issues or 
                                share your experience and expertise on various canines's health problems.
                            </p>
                            <Link to='/register' className='landing-page-join-btn'>Join now</Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className='landing-page-main'>
                {featured && <LandingPageFeaturePosts featured={featured} />       }        
                {topics && <LandingPageTopics topics={topics}/>}
                {posts && <LandingPagePosts posts={posts} />}
            </main>
            <footer>
                {posts && topics && 
                    <Footer />
                }
                
            </footer>
            <div className={showNavLinks ? 'bg-overlay' : 'hide-bg-overlay'}></div>
        </React.Fragment>
    )
}

export default LandingPage