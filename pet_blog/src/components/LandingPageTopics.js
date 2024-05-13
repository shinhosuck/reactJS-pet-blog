import React from 'react'
import { Link, useLocation } from 'react-router-dom'



function LandingPageTopics(props) {
    const {topics} = props
    const {pathname, state} = useLocation()

    return (
        <div className="landing-page-topics-wrapper">
            <div className="landing-page-topics-container">
                <div className="landing-page-topic-header-container">
                    <h1 className='landing-page-topic-header'>Topics</h1>
                    <p className='landing-page-topic-text'>
                        Ask questions, share your experiences, 
                        and discuss topics of mutual interest.
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
                                    {topic.post_count > 1 ? 
                                        <div className='landing-page-topic-post_count'>
                                            <span>{topic.post_count}</span>
                                            <span>Posts</span>
                                        </div>
                                    :
                                        <div className='landing-page-topic-post_count'>
                                            <span>{topic.post_count}</span>
                                            <span>Post</span>
                                        </div>
                                    }
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