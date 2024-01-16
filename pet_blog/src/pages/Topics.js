import React, { useState, useEffect } from 'react'
import { Link, useOutletContext, useLocation } from 'react-router-dom'
import { getTopicData } from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from './PostList'



function Topics() {
    const [topics, setTopics] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const {posts} = useOutletContext()
    const {pathname} = useLocation()

    const objs = posts ? posts.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()})) : null

    topics && topics.map((topic)=> {
        console.log(topic.image_url)
    })

    const getTopics = async()=> {
        try {
            const data = await getTopicData(`${url}/api/topics/`)
            setTopics(data)
            setTimeout(()=>{
                setIsLoading(false)
            }, 500)
        } catch ({message}) {
            setIsError(message)
            setIsLoading(false)
            console.log(message)
        }
    }

    useEffect(()=> {
        getTopics()
    }, [])

    console.log(topics)

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
        <React.Fragment>
            <div className="bg-img"></div>
            <div className="topics-main-container">
                <div className="topics-container">
                    <div className='topics-header-container'>
                        <h1 className='topics-main-container__header'>Forums</h1>
                        <h4 className='topics-sub-header'>8 Common Dog Health Problems</h4>
                    </div>
                    
                    {topics.map((topic)=> {
                        return (
                            <div key={topic.id} className="topic">
                                <img className='topic-image' src={topic.image_url} alt={topic.name} />
                                <div className='topic-container__text-container'>
                                    <div className='topic-title-container'>
                                        <h3 className='topic-name'>{topic.name}</h3>
                                        {topic.total_post > 1 ? 
                                            <div className='topic-post-count'>
                                                <i className="fa-solid fa-message post-container__num-of-post "></i>
                                                <span className='topic-total-post-count'>{topic.total_post}</span>
                                                <span className='topic-total-post-count-text'>posts</span>
                                            </div>
                                        :
                                            <div className='topic-post-count'>
                                                <i className="fa-solid fa-message post-container__num-of-post "></i>
                                                <span className='topic-total-post-count'>{topic.total_post}</span>
                                                <span className='topic-total-post-count-text'>post</span> 
                                            </div>
                                        }
                                    </div>
                                    <p className='topic-description'>{topic.description}</p>
                                    {topic.total_post > 1 ?
                                        <Link to={`/topic/${topic.name}/posts/?filter=${topic.name.toLowerCase()}`} state={{topic:topic.name}} className='topic-see-all-post-btn'>See Posts</Link>
                                    :
                                        <>
                                            {topic.total_post === 0 ?
                                                <Link className='topic-see-all-post-btn'>No Post to See</Link>
                                            :
                                                <Link to={`/topic/${topic.name}/posts/?filter=${topic.name.toLowerCase()}`} state={{topic:topic.name}} className='topic-see-all-post-btn'>See Post</Link>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* SIDE BAR */}
                <div className="topics-side-bar-recent-posts">
                    <h2 className='topics-side-bar__header'>Latest Posts</h2>
                    {objs && objs.map((post)=>{
                        return (
                            <div key={post.id} className='topic-side-bar__position-absolute-container'>
                                <Link to={`/post/${post.id}/detail/`} className="topics-side-bar__post">
                                    <div className='topics-side-bar__post-text-content'>
                                        <div className='topics-side-bar__author-and-date'>
                                            <h4 className='topics-side-bar__post-author'>{post.author}</h4>
                                            <p className='topics-side-bar__date-posted'>{post.date_posted}</p>
                                        </div>
                                        <h3 className='topics-side-bar__post-title'>{post.title}</h3>
                                        <p className='topics-side-bar__post-content'>{post.content.substring(0, 50)}...<span>Read more</span></p>
                                        <div className="topics-side-bar__date-and-like">
                                            {post.like.length > 1 ? 
                                                <div className='topics-side-bar__post-like-container'>
                                                    <div className='topics-side-bar_like-container'>
                                                        <i className="fa-solid fa-hands-clapping topics-side-bar__post-like"></i>
                                                        <span className='topics-side-bar__like-count'>{post.like.length}</span>
                                                        <span className='topics-side-bar__like-text'>likes</span>
                                                    </div>
                                                    <div className='topics-side-bar__num-of-replies-container'>
                                                        <i className="fa-solid fa-message topics-side-bar__num-of-post"></i>
                                                        <span className='topics-side-bar__reply-count'>{post.num_of_replies}</span>
                                                        <span className='topics-side-bar__reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                                    </div>
                                                </div>
                                            : 
                                                <div className='topics-side-bar__post-like-container'>
                                                    <div className='topics-side-bar_like-container'>
                                                        <i className="fa-solid fa-hands-clapping topics-side-bar__post-like"></i>
                                                        <span className='topics-side-bar__like-count'>{post.like.length}</span>
                                                        <span className='topics-side-bar__like-text'>like</span>
                                                    </div>
                                
                                                    <div className='topics-side-bar__num-of-replies-container'>
                                                        <i className="fa-solid fa-message topics-side-bar__num-of-post"></i>
                                                        <span className='topics-side-bar__reply-count'>{post.num_of_replies}</span>
                                                        <span className='topics-side-bar__reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                                <Link to={`/topic/${post.topic}/posts/?filter=${post.topic.toLowerCase()}`} state={{topic:post.topic}} className='topics-side-bar__post-topic'>
                                    <span>{post.topic}</span>
                                    <i className="fa fa-chevron-right"></i>
                                </Link>
                            </div>
                        )
                    })}
                </div>

            </div>
        </React.Fragment>
    )
}

export default Topics