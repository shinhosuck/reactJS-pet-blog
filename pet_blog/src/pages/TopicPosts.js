import React, { useState, useEffect } from 'react'
import { useLocation, Navigate, Link } from 'react-router-dom'
import { getPostData, getTopicData } from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from './PostList'
import ScrollToTop from '../components/ScrollToTop'


function TopicPosts() {
    const {state, pathname, search} = useLocation()
    const [postArray, setPostArray] = useState(null)
    const [topicsArray, setTopicsArray] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [topicMenuOpen, setTopicMenuOpen] = useState(false)

    const location = useLocation()
    
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
            const topics = data.reduce((total, topic)=> {
                if(!total.includes(topic.name)){
                    total.push(topic.name)
                }
                return total
            }, ['All Posts'])
            setTopicsArray(topics)
           
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

    
    if(postArray && topicsArray) {
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
            <Navigate to='/error' replace={true} state={{message:isError.error}} />
        )
    }

    console.log(posts)

    return (
        <React.Fragment>
            <ScrollToTop />
            <div className="bg-img"></div>            
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
                                {topicsArray && topicsArray.map((obj)=> {
                                    return (
                                        <Link
                                            onClick={()=> setTopicMenuOpen(false)}
                                            to={`.?filter=${obj}`} 
                                            state={{topic:obj, redirect:state.redirect}} 
                                            className='topic-btn' 
                                            key={obj}
                                        >
                                            {obj}
                                        </Link>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
                {!posts.length ? 
                    <div className="no-comments-container" style={{marginTop: '4rem'}}>
                        <div className="no-comment-text-container">
                            <h3>Be the first to post on "{state && state.topic}"!</h3>
                            <p>
                                Nobody's posted yet on this topic.
                                Create a post and get the conversation going.
                            </p>
                        </div>
                    </div>
                :
                    <div className="topic-posts-container__posts">
                        {posts.map((post)=> {
                            return (
                                <div key={post.id} className="topic-posts-container__post">
                                    <div className="topic-posts-container__post-image-container">
                                        <img className='topic-posts-container__post-image' src={post.image_url} alt={post.title} />
                                        <div className="topic-posts-container__post-image-color-overlay"></div>
                                    </div>
                                    <div className='topic-posts-container__post-text-content'>
                                        <div className='topic-posts-container__author-and-date'>
                                            <h4 className='topic-posts-container__post-author'>{post.author}</h4>
                                            <p className='topic-posts-container__date-posted'>{post.date_posted}</p>
                                            <div className="topic-posts-container__date-and-like">
                                                {post.like.length > 1 ? 
                                                    <div className='topic-posts-container__post-like'>
                                                        <div className='post-like-container'>
                                                            <i className="fa-solid fa-hands-clapping post-like"></i>
                                                            <span className='post-like-count'>{post.like.length}</span>
                                                            <span className='post-like-text'>likes</span>
                                                        </div>
                                                        <div className='topic-posts-container__num-of-replies-container'>
                                                            <i className="fa-solid fa-message topic-posts-container__num-of-post"></i>
                                                            <span className='post-reply-count'>{post.num_of_replies}</span>
                                                            <span className='post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                                        </div>
                                                    </div>
                                                    : 
                                                    <div className='topic-posts-container__post-like'>
                                                        <div className='post-like-container'>
                                                            <i className="fa-solid fa-hands-clapping post-like"></i>
                                                            <span className='post-like-count'>{post.like.length}</span>
                                                            <span className='post-like-text'>like</span>
                                                        </div>
                                                        <div className='topic-posts-container__num-of-replies-container'>
                                                            <i className="fa-solid fa-message topic-posts-container__num-of-post "></i>
                                                            <span className='post-reply-count'>{post.num_of_replies}</span>
                                                            <span className='post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <h3 className='post-container__post-title'>{post.title}</h3>
                                        <p className='post-container__post-content'>{post.content.substring(0, 100)}...</p>
                                        <Link 
                                            to={`/post/${post.id}/detail/`} 
                                            className='post-container__post-read-more-btn'
                                            state={{redirect:'/posts'}}
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default TopicPosts