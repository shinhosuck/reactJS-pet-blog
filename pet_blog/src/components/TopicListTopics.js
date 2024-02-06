import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'





function TopicListTopics(props) {
    const [width, setWidth] = useState(window.innerWidth)
    const {topics} = props
    const {pathname, state} = useLocation()


    return (
        <div className='topics-all'>
            <div className="topics-default-container">
                <h2 className='topics-header'>8 Common Health Issues</h2>
                {topics.map((topic)=> {
                    return (
                        <Link
                            key={topic.id} 
                            className="topic"
                            to={`/topic/${topic.name}/posts/?filter=${topic.name.toLowerCase()}`} 
                            state={{topic:topic.name, redirect:pathname}} 
                        >
                            <img className='topic-image' src={topic.image_url} alt={topic.name} />
                            <div className="topic-list-bg-overlay"></div>
                            <div className='topic-container__text-container'>
                                <h4 className='topic-name'>{topic.name}</h4>
                                {topic.total_post > 1 ? 
                                    <div className='topic-post-count'>
                                        <i className="fa-regular fa-message topic__num-of-post"></i>
                                        <span className='topic-total-post-count'>{topic.total_post}</span>
                                        <span className='topic-total-post-count-text'>posts</span>
                                    </div>
                                :
                                    <div className='topic-post-count'>
                                        <i className="fa-regular fa-message topic__num-of-post"></i>
                                        <span className='topic-total-post-count'>{topic.total_post}</span>
                                        <span className='topic-total-post-count-text'>post</span> 
                                    </div>
                                }
                            </div>
                        </Link>
                    )
                })}
            </div>
            {/* <div className="topics-general-container">
                <h2 className='topics-general-header'>General Topics</h2>
            </div> */}
        </div>
    )
}

export default TopicListTopics