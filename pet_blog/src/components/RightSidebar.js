import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import { ContentLayoutContext } from '../layouts/ContentLayout'


function RightSidebar() {
    const { posts } = useContext(ContentLayoutContext)
    const [ postObjs, setPostObjs] = useState(null)
    const { pathname } = useLocation()
   
    useEffect(()=> {
        const sortedPosts = posts && posts.slice(0, 4)
        .sort((a, b)=>new Date(b.date_posted)-new Date(a.date_posted))

        setPostObjs(sortedPosts)
    }, [posts])
   
    return (
        <div class='right-sidebar-container'>
            <div className="right-side-bar-container">
                <h2 className='right-side-bar-header'>Most Viewed</h2>
                <div className="side-bar-latest-posts-container">
                    {postObjs && postObjs.slice(0, 3).map((post)=> {
                        return (
                            <div key={post.id} className="side-bar-latest-post">
                                <Link 
                                    to={`/topic/${post.topic}/posts/?filter=${post.topic}`}
                                    state={{topic:post.topic, redirect:pathname}} 
                                    className='post-topic-btn'
                                >
                                    {post.topic}
                                </Link>
                                <Link
                                    to={`/post/${post.id}/detail/`} key={post.id} 
                                    className='right-sidebar-post-title'
                                 >
                                    {post.title}
                                </Link>
                                <p className='right-sidebar-post-content'>{post.content.substring(0, 80)}...</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="right-side-bar-container">
                <h2 className='right-side-bar-header'>Latest Posts</h2>
                <div className="side-bar-latest-posts-container">
                    {postObjs && postObjs.map((post)=> {
                        return (
                            <div key={post.id} className="side-bar-latest-post">
                                <Link 
                                    to={`/topic/${post.topic}/posts/?filter=${post.topic}`}
                                    state={{topic:post.topic, redirect:pathname}} 
                                    className='post-topic-btn'
                                >
                                    {post.topic}
                                </Link>
                                <Link
                                    to={`/post/${post.id}/detail/`} key={post.id} 
                                    className='right-sidebar-post-title'
                                 >
                                    {post.title}
                                </Link>
                                <p className='right-sidebar-post-content'>{post.content.substring(0, 80)}...</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default RightSidebar