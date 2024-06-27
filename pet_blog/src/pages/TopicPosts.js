import React, { useState, useEffect, useContext } from 'react'
import { useLocation, Navigate, Link, NavLink, useSearchParams} from 'react-router-dom'
import { getPostData, getTopicData } from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from '../utils/urls'
import dogImg from '../images/cartoon_dog.png'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import { formatDate } from '../utils/formatDate'
import RightSidebar from '../components/RightSidebar'
import { handleRightColumnContent } from '../utils/handleEvents'


function TopicPosts() {
    const {state, pathname} = useLocation()
    const [topics, setTopics] = useState(null)
    const [postArray, setPostArray] = useState(null)
    const [topicNames,setTopicNames] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [topicMenuOpen, setTopicMenuOpen] = useState(false)
    const { isAuthenticated } = useContext(ContentLayoutContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const filter = searchParams.get('filter')

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

    const posts = postArray && filter && postArray.filter((post)=> post.topic === filter)
    
    useEffect(()=> {
        getPosts()
    }, [])

    useEffect(()=> {
        getTopics()
    }, [])

    useEffect(()=> {
        document.title = `Topic: ${filter}`
        window.addEventListener('scroll', handleRightColumnContent)
        return ()=> {
            window.removeEventListener('scroll', handleRightColumnContent)
        }
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
    
    console.log(state, filter)

    return (
        <React.Fragment>
            <div className="bg-img">
                <div className="bg-img-header-container">
                    <div className="bg-img-contents">
                        <h1 className='bg-img-header'>{filter}</h1>
                        {topics && topics.filter((topic)=> topic.name === filter)
                            .map((obj)=> {
                                return (
                                    <p className='bg-img-text' key={obj.id}>{obj.description}</p>
                                )
                            })
                        }
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
                                <p className='topic-change-input' >{filter && filter}</p>
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
                                                state={{topic:topicName, redirect:filter}} 
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
                    {posts.length ? 
                        <div className="topic-posts-container__posts">
                            {posts.map((post)=> {
                                return (
                                    <div key={post.id} className="post-container__post">
                                        <div className='post-container__post-image-container'>
                                            <img className='post-container__post-image' src={post.image_url} alt={post.title} />
                                            <div className='post-container__post-image-background-overlay'></div>
                                        </div>
                                        <div className='post-container__post-text-content'>
                                            <div className='landing-page-post-topic-container'>
                                                <Link
                                                to={`/topic/${post.topic}/posts/?filter=${post.topic}`}
                                                state={{topic:post.topic, redirect:pathname}} 
                                                className='post-topic-btn'
                                                >
                                                    {post.topic}
                                                </Link>
                                                <p className='post-container__post-date-posted'>{formatDate(post.date_posted)}</p>
                                            </div>
                                            <h3 className='post-container__post-title'>{post.title}</h3>
                                            <p className='post-container__post-content'>
                                                {post.content.substring(0, 150)}...
                                            </p>
                                            <Link 
                                                className='landing-page-post-read-more-btn'
                                                to={`/post/${post.id}/detail/`}
                                                state={{redirect:pathname}} 
                                            >
                                                Read more
                                            </Link>
                                        </div>
                                    </div>
                                )
                                
                            })}
                        </div>
                    :
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
                    }
                </div>
                <div className='right-side-bar'>
                    <RightSidebar />
                </div>
            </div> 
        </React.Fragment>
    )
}

export default TopicPosts
