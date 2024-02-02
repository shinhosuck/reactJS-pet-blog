import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import landingPageImg from '../images/landing_page.webp'
import { getPostData, getTopicData} from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from './PostList'
import Footer from './Footer'
import paw from '../images/paw.webp'



function LandingPage() {
    const [showNavLinks, setShowNavLinks] = useState(false)
    const [posts, setPosts] = useState(null)
    const [topics, setTopics] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const {pathname, state} = useLocation()



    useEffect(()=> {
        const getData = async()=> {
            try {
                const data = await getPostData(`${url}/api/posts/`)
                const objs = data.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()}))
                setPosts(objs.slice(0,6))
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
                setTopics(data.slice(0,6))
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
        const root = document.querySelector('#root')
        if(showNavLinks) {
            window.scrollTo({top:0})
            document.body.style.overflowY = 'hidden'

        }else {
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
                        <Link to='/forums' className='landing-page-navbar-brand-link'>
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
                            <Link to='/forums' className='landing-page-navlink'>Forums</Link>
                            <Link to='/posts' className='landing-page-navlink'>Posts</Link>
                            <Link to='/login' className='landing-page-navlink landing-page-login-btn'>Login</Link>
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
                                Here, you can seek suggestions about your canine's health issues or share your expertise on various canines's health problems.
                            </p>
                            <Link to='/register' className='landing-page-join-btn'>Join now</Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className='landing-page-main'>
                <div className="landing-page-topics-container">
                    <div className="landing-page-topic-header-container">
                        <h1 className='landing-page-topic-header'>Forums</h1>
                    </div>
                    <div className="landing-page-topics">
                        {topics.map((topic)=> {
                            return (
                                <div key={topic.id} className="landing-page-topic">
                                    <img className='landing-page-topic-image' src={topic.image_url} alt={topic.name} />
                                    <div className='landing-page-topic-text-container'>
                                        <h3 className='landing-page-topic-name'>{topic.name}</h3>
                                        <p className='landing-page-topic-description'>
                                            {topic.description}
                                            {topic.total_post ?
                                                <Link 
                                                    className='landing-page-topic-read-more'
                                                    to={topic.total_post ? `/topic/${topic.name}/posts/?filter=${topic.name.toLowerCase()}` :'.'} 
                                                    state={{topic:topic.name, redirect:pathname}} 
                                                >
                                                    {topic.total_post > 1 ? 'Read posts' : 'Read post'}
                                                </Link>
                                            :
                                                <Link className='landing-page-topic-read-more'>No post to see</Link>
                                            }
                                        </p>
                                        {topic.total_post > 1 ? 
                                            <div className='landing-page-topic-post-count'>
                                                <i className="fa-regular fa-message landing-page-topic-num-of-post"></i>
                                                <span className='landing-page-topic-total-post-count'>{topic.total_post}</span>
                                            </div>
                                        :
                                            <div className='landing-page-topic-post-count'>
                                                <i className="fa-regular fa-message landing-page-topic-num-of-post"></i>
                                                <span className='landing-page-topic-total-post-count'>{topic.total_post}</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="landing-page-topic-see-all-forums-container">
                        <Link to='/forums' className='landing-page-topic-see-all-forums'>
                            See all forums
                            <i className="fa fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
                <div className="landing-page-posts-container">
                    <div className="landing-page-posts-wrapper">
                        <div className="landing-page-post-header-container">
                            <h1 className='landing-page-posts-header'>Posts</h1>
                        </div>
                        <div className="landing-page-posts">
                            {posts.map((post)=> {
                                return (
                                    <div key={post.id} className="landing-page-post">
                                        <div className="landing-page-post-image-container">
                                            <img className='landing-page-post-image' src={post.image_url} alt={post.title} />
                                        </div>
                                        <div className="landing-page-post-color-overlay"></div>
                                        <div className='landing-page-post-text-content'>
                                            <h3 className='landing-page-post-title'>{post.title}</h3>
                                            <p className='landing-page-post-content'>
                                                {post.content.substring(0, 100)}... 
                                                <Link 
                                                    to={`/post/${post.id}/detail/`} 
                                                    state={{redirect:pathname}} 
                                                    className='landing-page-post-read-more'
                                                >
                                                    Read more
                                                </Link>
                                            </p>
                                            {post.like.length > 1 ? 
                                                <div className='landing-page-post-like'>
                                                    <div className='landing-page-post-like-container'>
                                                        <i className="fa-solid fa-hands-clapping landing-page-post-clap"></i>
                                                        <span className='landing-page-post-like-count'>{post.like.length}</span>
                                                        <span className='landing-page-post-like-text'>likes</span>
                                                    </div>
                                                    <div className='landing-page-post-num-of-replies-container'>
                                                        <i className="fa-regular fa-message landing-page-post-num-of-post"></i>
                                                        <span className='landing-page-post-reply-count'>{post.num_of_replies}</span>
                                                        <span className='landing-page-post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                                    </div>
                                                </div>
                                            : 
                                                <div className='landing-page-post-like'>
                                                    <div className='landing-page-post-like-container'>
                                                        <i className="fa-solid fa-hands-clapping landing-page-post-clap"></i>
                                                        <span className='landing-page-post-like-count'>{post.like.length}</span>
                                                        <span className='landing-page-post-like-text'>like</span>
                                                    </div>
                                                    <div className='landing-page-post-num-of-replies-container'>
                                                        <i className="fa-regular fa-message landing-page-post-num-of-post"></i>
                                                        <span className='landing-page-post-reply-count'>{post.num_of_replies}</span>
                                                        <span className='landing-page-post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="landing-page-post-see-all-posts-container">
                            <Link to='/posts' className='landing-page-post-see-all-posts'>
                                See all posts
                                <i className="fa fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <div className={showNavLinks ? 'bg-overlay' : 'hide-bg-overlay'}></div>
            <footer>
                {posts && topics && 
                    <Footer />
                }
                
            </footer>
        </React.Fragment>
    )
}

export default LandingPage