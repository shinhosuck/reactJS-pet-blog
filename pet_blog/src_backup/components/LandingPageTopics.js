import React from 'react'
import { Link, useLocation } from 'react-router-dom'



function LandingPageTopics(props) {
    const {topics} = props
    const {pathname, state} = useLocation()

    return (
        <div className="landing-page-topics-wrapper">
            <div className="landing-page-topics-container">
                <div className="landing-page-topic-header-container">
                    <h1 className='landing-page-topic-header'>Top Topics</h1>
                    <p className='landing-page-topic-text'>
                        Ask questions, share your experiences, and discuss topics of mutual interest.
                    </p>
                </div>
                <div className="landing-page-topics">
                    {topics.map((topic)=> {
                        return (
                            <Link
                                key={topic.id} 
                                className="landing-page-topic"
                                to={`/topic/${topic.name}/posts/?filter=${topic.name.toLowerCase()}`}
                                state={{topic:topic.name, redirect:pathname}} 
                            >
                                <img className='landing-page-topic-image' src={topic.image_url} alt={topic.name} />
                                <div className="landing-page-topic-bg-overlay">
                                    <h3 className='landing-page-topic-name'>{topic.name}</h3>
                                    <div className='landing-page-topic-likes-and-post_count'>
                                        <div className='landing-page-topic-like'>
                                            <i className="fa-solid fa-hands-clapping landing-page-post-clap"></i>
                                            <span>{topic.topic_post_set_likes}</span>
                                        </div>
                                        <div className='landing-page-topic-post_count'>
                                            <i className="fa-solid fa-message"></i>
                                            <span>{topic.post_count}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LandingPageTopics