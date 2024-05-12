import React, { useState, useEffect, useContext } from 'react'
import { useLocation, Navigate, Link, NavLink } from 'react-router-dom'
import { getPostData, getTopicData } from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from '../utils/urls'
import dogImg from '../images/cartoon_dog.png'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import { formatDate } from '../utils/formatDate'
import SidebarLatestPosts from '../components/SidebarLatestPosts'


function TopicPosts() {
    const {state} = useLocation()
    const [topics, setTopics] = useState(null)
    const [postArray, setPostArray] = useState(null)
    const [topicNames,setTopicNames] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [topicMenuOpen, setTopicMenuOpen] = useState(false)
    const { isAuthenticated } = useContext(ContentLayoutContext)
    const location = useLocation()
    const [ scrollHeight, setScrollHeight] = useState(window.pageYOffset)


    function endEventListener(){
        const postDetailSideBar = document.querySelector('.posts-side-bar')
        const scrolled = window.pageYOffset
        if(scrolled >= 450) {
            if(postDetailSideBar) {
                postDetailSideBar.style.top = '75px'
            }
        }else {
            if(postDetailSideBar) {
                postDetailSideBar.style.top = '0px'
            }
        }
        setScrollHeight(scrolled)
        return window.removeEventListener(
            'scroll', 
            endEventListener
        )
    }
    
    useEffect(()=> {
        window.addEventListener(
            'scroll', 
            endEventListener
        )
    }, [scrollHeight])
    
    const getPosts =  async()=> {
        try {
            const data = await getPostData(`${url}/api/posts`)
            const objs = data.map((post)=>{
                return {...post, date_posted:new Date(post.date_posted).toDateString()}
            })
            setPostArray(objs)
    
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
            setIsError(true)
        }
    }

    const getTopics = async()=> {
        try {
            const data = await getTopicData(`${url}/api/topics`)
            const names = data.reduce((total, topic)=> {
                if(!total.includes(topic.name)){
                    total.push(topic.name)
                }
                return total
            }, ['All Posts'])
            setTopics(data)
            setTopicNames(names)
           
        } catch ({message}) {
            setIsLoading(false)
            setIsError({error:message})
            console.log(message)
        }
    }

    const posts = postArray && state && postArray.filter((post)=> post.topic === state.topic)
    
    useEffect(()=> {
        getPosts()
    }, [])

    useEffect(()=> {
        getTopics()
    }, [])

    
    if(postArray && topicNames) {
        const timeOutID = setTimeout(()=> {
            setIsLoading(false)
            clearTimeout(timeOutID)
        }, 100)
    }

    if(state && state.topic.toLowerCase().replaceAll(' ', '') === 'allposts') {
        return (
            <Navigate to='/posts'/>
        )
    }

    if(isLoading) {
        return (
            <LoadingPage />
        )
    }

    if(isError) {
        return (
            <Navigate to='/error' replace={true} state={{message:isError}} />
        )
    }

    return (
        <React.Fragment>
            <div className="bg-img">
                <div className="my-posts-hero-container">
                    <div className="my-posts-header-contents">
                        <h1 className='my-posts-hero-header'>{state && state.topic}</h1>
                        <TopicContent topics={topics} state={state}/>
                    </div>
                </div>
            </div>
            <div className='topic-posts-wrapper'>           
                <div className="topic-posts-container">
                    <div className='topic-posts-navbar'>
                        <div className='topic-posts-navbar__toggle-btns-container'>
                            <p className='topic-posts-navbar__nav-bar-text'>Topic:</p>
                            <button 
                                onClick={()=>setTopicMenuOpen(!topicMenuOpen)}
                                className='topic-posts-navbar__toggle-btns'
                            >
                                <p className='topic-change-input' >{state && state.topic}</p>
                                {!topicMenuOpen ?
                                    <div className='topic-post-toggle-btn'>
                                        <i className="fa fa-chevron-down"></i>
                                    </div>
                                :
                                    <div className='topic-post-toggle-btn'>
                                        <i className="fa fa-chevron-up"></i>
                                    </div>
                                }
                            </button>
                            {topicMenuOpen && 
                                <div className="topic-posts-navbar__topics-btns">
                                    {topicNames && topicNames.map((topicName)=> {
                                        return (
                                            <NavLink
                                                key={topicName}
                                                onClick={()=> setTopicMenuOpen(false)}
                                                to={`.?filter=${topicName}`} 
                                                state={{topic:topicName, redirect:state.redirect}} 
                                                className='topic-btn'
                                            >
                                                {topicName}
                                            </NavLink>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                    {!posts.length ? 
                        <div className="no-topic-post-container">
                            <img src={dogImg} alt="" />
                            <div className="no-topic-post-text-container">
                                <h3>Be the first to post on this topic!</h3>
                                <p>
                                    Nobody's posted yet on this topic.
                                    Create a post and get the conversation going.
                                </p>
                                {isAuthenticated ? 
                                    <Link to='/create/post'>Create Post</Link>
                                : 
                                    <p className='login-to-create-post'>Please login to create post. <Link to='/login'>Login</Link></p>
                                }
                            </div>
                        </div>
                    :
                        <div className="topic-posts-container__posts">
                            {posts.map((post)=> {
                                return (
                                    <div key={post.id} className="topic-posts-container__post">
                                        <div className='landing-page-post-author-and-date'>
                                            <img src={post.author_profile_image_url} alt="" />
                                            <div>
                                                <p>{post.author}</p>
                                                <p>{formatDate(post.date_posted)}</p>
                                            </div>
                                        </div>
                                        <h3 className='topic-posts-container__post-title'>{post.title}</h3>
                                        <div className="topic-posts-container__post-image-container">
                                            <img className='topic-posts-container__post-image' src={post.image_url} alt={post.title}/>
                                            {post.qs_count.like_count > 1 ? 
                                                <div className='topic-posts-container__post-like'>
                                                    <div className='topic-post-like-container'>
                                                        <i className="fa-solid fa-hands-clapping topic-post-like"></i>
                                                        <span className='topic-post-like-count'>{post.qs_count.like_count}</span>
                                                    </div>
                                                    <div className='topic-posts-container__num-of-replies-container'>
                                                        <i className="fas fa-comment topic-posts-container__num-of-post"></i>
                                                        <span className='topic-post-reply-count'>{post.qs_count.comment_count}</span>
                                                    </div>
                                                </div>
                                                : 
                                                <div className='topic-posts-container__post-like'>
                                                    <div className='topic-post-like-container'>
                                                        <i className="fa-solid fa-hands-clapping topic-post-like"></i>
                                                        <span className='topic-post-like-count'>{post.qs_count.like_count}</span>
                                                    </div>
                                                    <div className='topic-posts-container__num-of-replies-container'>
                                                        <i className="fas fa-comment topic-posts-container__num-of-post"></i>
                                                        <span className='topic-post-reply-count'>{post.qs_count.comment_count}</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="topic-posts-text-container">
                                            <p className='topic-posts-container__post-content'>
                                                {post.content.length > 250 ?
                                                    <span>{`${post.content.substring(0, 250)}`}...</span>
                                                : 
                                                    <span>{post.content}</span>
                                                }
                                                <Link 
                                                    to={`/post/${post.id}/detail/`} 
                                                    className='topic-post-container__post-read-more-btn'
                                                    state={{redirect:'/posts'}}
                                                >
                                                    Read More
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                )
                                
                            })}
                        </div>
                    }
                </div>
                <div className='posts-side-bar'>
                    <SidebarLatestPosts />
                </div>
            </div> 
        </React.Fragment>
    )
}

export default TopicPosts


const TopicContent = (props)=> {
    const {topics, state} = props
    const topicContent = topics && topics.find((topic)=> topic.name === state.topic)
    return (
        <>
            <p style={{fontSize:'1rem'}} className='my-posts-num-of-posts'>{topicContent.description}</p>
        </>
    )
}