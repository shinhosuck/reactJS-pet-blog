import React, { useState, useEffect } from 'react'
import { useLocation, Navigate, Link, useNavigate } from 'react-router-dom'
import { getPostData, getTopicData } from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from './PostList'



function TopicPosts() {
    const {state} = useLocation()
    const [postArray, setPostArray] = useState(null)
    const [topicsArray, setTopicsArray] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [topicMenuOpen, setTopicMenuOpen] = useState(false)
    
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
        }, 1000)
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
    return (
        <React.Fragment>
            <div className="bg-img"></div>
            <div className="topic-posts-container">
                <div className='topic-posts-navbar'>
                    <div className='topic-posts-navbar__toggle-btns-container'>
                        <p className='topic-posts-navbar__nav-bar-text'>Choose Topic:</p>
                        <p className='topic-change-input' >{state && state.topic}</p>
                        <div className='topic-posts-navbar__toggle-btns'>
                            {!topicMenuOpen ?
                                <button onClick={()=>setTopicMenuOpen(true)} className='topic-post-toggle-btn'>
                                    <i className="fa fa-chevron-down"></i>
                                </button>
                            :
                                <button onClick={()=>setTopicMenuOpen(false)} className='topic-post-toggle-btn'>
                                    <i className="fa fa-chevron-up"></i>
                                </button>
                            }
                        </div>
                        {topicMenuOpen && 
                            <div className="topic-posts-navbar__topics-btns">
                                {topicsArray && topicsArray.map((obj)=> {
                                    return (
                                        <Link
                                            onClick={()=> setTopicMenuOpen(false)}
                                            to={`.?filter=${obj}`} 
                                            state={{topic:obj}} 
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
                {!posts ? 
                    <div>
                        <h2 style={{textAlign:'center',padding:'5rem 0',color:'rgb(50, 50, 50)',}}>Posts not available!</h2>
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
                                        <Link to={`/post/${post.id}/detail/`} className='post-container__post-read-more-btn'>
                                            Read More
                                        </Link>
                                        <Link
                                            to={`/topic/${post.topic}/posts/?filter=${post.topic.toLowerCase()}`} 
                                            state={{topic:post.topic}} 
                                            className='post-container__post-topic'
                                        >
                                            <span>{post.topic}</span>
                                            <i className="fa fa-chevron-right"></i>
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