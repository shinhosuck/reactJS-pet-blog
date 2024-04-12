import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoadingPage from '../pages/LoadingPage'


function PostListPosts(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [postsByTopics, setPostsByTopics] = useState(null)
    const [topicNames, setTopicNames] = useState(null)
    const {pathname} = useLocation()
    const {posts, topicsOjbs} = props
    
    useEffect(()=> {
        const getPostsByTopics = ()=> {
            const topicNamesArray = posts && posts.reduce((topicsArray, post)=> {
                !topicsArray.includes(post.topic) && topicsArray.push(post.topic)
                return topicsArray
            }, [])
            setTopicNames(topicNamesArray)
        }
        getPostsByTopics()
    }, [posts])

    useEffect(()=> {
        const objs = topicNames && topicNames.map((topicName)=> {
            const postsFiltered = posts.filter((post)=> {
                if(post.topic === topicName){
                    return post
                }
            });
            return {topic:topicName, posts:postsFiltered.slice(0,6)}
        })
        setPostsByTopics(objs)
        setIsLoading(false)
    }, [topicNames])

    if(isLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div className="post-container__posts">
           {postsByTopics && topicNames && topicNames.map((topic)=> {
                return (
                    <div key={topic} className="post-container__rows">
                        <div className='post-container__posts-by-topic'>
                            <div className="post-container__topic-container">
                                <h1 className='post-container__topic-name'>{topic}</h1>
                                {topicsOjbs && topicsOjbs.map((topicObj)=> {
                                    return (
                                        <React.Fragment key={topicObj.id}>
                                            {topicObj.name === topic && 
                                                <p className='post-container__topic-text'>{topicObj.description}</p>
                                            }
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            {postsByTopics.map((obj)=>{
                                return (
                                    obj.posts.map((post)=> {
                                        return ( 
                                            <React.Fragment key={post.id}>
                                                {obj.topic === topic ?
                                                    <div className="post-container__post">
                                                        <div className="post-container__post-image-container">
                                                            <img className='post-container__post-image' src={post.image_url} alt={post.title} />
                                                            {post.like.length > 1 ? 
                                                                <div className='post-container__post-like'>
                                                                    <div className='post-container__post-like-container'>
                                                                        <i className="fa-solid fa-hands-clapping post-container__clapping"></i>
                                                                        <span className='post-container__post-like-count'>{post.like.length}</span>
                                                                    </div>
                                                                    <div className='post-container__num-of-replies-container'>
                                                                        <i className="fa-solid fa-message post-container__num-of-post"></i>
                                                                        <span className='post-container__post-reply-count'>{post.num_of_replies}</span>
                                                                    </div>
                                                                </div>
                                                            : 
                                                                <div className='post-container__post-like'>
                                                                    <div className='post-container__post-like-container'>
                                                                        <i className="fa-solid fa-hands-clapping post-container__clapping"></i>
                                                                        <span className='post-container__post-like-count'>{post.like.length}</span>
                                                                    </div>
                                                                    <div className='post-container__num-of-replies-container'>
                                                                        <i className="fa-solid fa-message post-container__num-of-post"></i>
                                                                        <span className='post-container__post-reply-count'>{post.num_of_replies}</span>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className='post-container__post-text-content'>
                                                            <h3 className='post-container__post-title'>{post.title}</h3>
                                                            <p className='post-container__post-content'>
                                                                {post.content.substring(0, 100)}...
                                                                <Link 
                                                                    className='post-container__post-read-more-btn'
                                                                    to={`/post/${post.id}/detail/`}
                                                                    state={{redirect:pathname}} 
                                                                >
                                                                    Read more
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                :
                                                    ''
                                                }
                                            </React.Fragment>
                                        )

                                    })
                                )
                            })}
                        </div>
                        <div className="post-container__see-all-posts">
                            <Link 
                                className='post-container__see-all-posts-btn'
                                to={`/topic/${topic}/posts/?filter=${topic.toLowerCase()}`}
                                state={{topic:topic, redirect:pathname}} 
                            >
                                View all
                                <i className="fa fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                )
           })}
        </div>
    )
}

export default PostListPosts