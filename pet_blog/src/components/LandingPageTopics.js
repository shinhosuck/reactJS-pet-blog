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
                        Ask questions, share your experiences, and discuss topics of mutual interest.
                    </p>
                    <div className="landing-page-topic-see-all-forums-container">
                        <Link to='/topics' className='landing-page-topic-see-all-forums'>
                            View all
                            <i className="fa fa-arrow-right"></i>
                        </Link>
                    </div>
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
                                <div className="landing-page-bg-overlay"></div>
                                <h3 className='landing-page-topic-name'>{topic.name}</h3>
                            </Link>
                        )
                    })}
                </div>
                <div className="mobile-landing-page-topic-see-all-forums-container">
                    <Link to='/topics' className='landing-page-topic-see-all-forums'>
                        View all
                        <i className="fa fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPageTopics