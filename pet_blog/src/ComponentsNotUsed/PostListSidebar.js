import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'







function PostListSidebar(props) {
    const {topics} = props
    const {state, pathname} = useLocation()
    
    return (
       
        <div className="post-list-side-bar-topics-container">
            <h2 className='post-list-side-bar-topics__header'>Popular Topics</h2>
            <div className="post-list-side-bar-topics">
                {topics.map((topic)=>{
                    return (
                        <Link
                            to={`/topic/${topic.name.toLowerCase()}/posts/?filter=${topic.name.toLowerCase()}`} 
                            key={topic.id} 
                            className="post-list-side-bar-topics__topic"
                            state={{topic:topic.name, redirect:pathname}}
                        >
                            <img className='post-list-topics-side-bar_image' src={topic.image_url} alt="" />
                            <div className="post-list-side-bar-bg-overlay"></div>
                            <h3 className='post-list-side-bar-topics__topic-name'>{topic.name}</h3>
                        </Link>
                    )
                })}
            </div>
            <div className="post-list-topics-side-bar__view-all-btn-container">
                <Link 
                    to='/topics'
                    className='post-list-topics-side-bar__view-all-btn'
                >
                    View all 
                    <i className="fa fa-arrow-right"></i>
                </Link>
            </div>
        </div>
    )
}

export default PostListSidebar