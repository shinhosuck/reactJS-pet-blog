import React from 'react'
import { Link, useLocation } from 'react-router-dom'






function LandingPageFeaturePosts(props) {
    const {pathname, state} = useLocation()
    const {featured} = props
    return (
       <div className="landing-page-featured-posts-container">
            <div className="landing-page-featured-posts-wrapper">
                <div className="landing-page-featured-post-header-container">
                    <h1 className='landing-page-featured-posts-header'>Featured Posts</h1>
                    <p className='landing-featured-posts-text'>
                        You'll find valuable information, 
                        advice, and entertaining stories to help you better 
                        understand and care for your furry friend. 
                    </p>
                </div>
                <div className="landing-page-featured-posts">
                    {featured.map((post)=> {
                        return (
                            <div key={post.id} className="landing-page-featured-post">
                                <div className="landing-page-featured-post-image-container">
                                    <img className='landing-page-featured-post-image' src={post.image_url} alt={post.title} />
                                </div>
                                <div className='landing-page-featured-post-text-content'>
                                    <h3 className='landing-page-featured-post-title'>{post.title}</h3>
                                    <p className='landing-page-featured-post-content'>
                                        {post.content.substring(0, 200)}... 
                                        <Link 
                                            to={`/post/${post.id}/detail/`} 
                                            state={{redirect:pathname}} 
                                            className='landing-page-featured-post-read-more'
                                        >
                                            Read more
                                        </Link>
                                    </p>
                                    {post.like.length > 1 ? 
                                        <div className='landing-page-featured-post-like'>
                                            <div className='landing-page-featured-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-featured-post-clap"></i>
                                                <span className='landing-page-featured-post-like-count'>{post.like.length}</span>
                                                <span className='landing-page-featured-post-like-text'>likes</span>
                                            </div>
                                            <div className='landing-page-featured-post-num-of-replies-container'>
                                                <i className="fa-regular fa-message landing-page-featured-post-num-of-post"></i>
                                                <span className='landing-page-featured-post-reply-count'>{post.num_of_replies}</span>
                                                <span className='landing-page-featured-post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                            </div>
                                        </div>
                                    : 
                                        <div className='landing-page-featured-post-like'>
                                            <div className='landing-page-featured-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-featured-post-clap"></i>
                                                <span className='landing-page-featured-post-like-count'>{post.like.length}</span>
                                                <span className='landing-page-featured-post-like-text'>like</span>
                                            </div>
                                            <div className='landing-page-featured-post-num-of-replies-container'>
                                                <i className="fa-regular fa-message landing-page-featured-post-num-of-post"></i>
                                                <span className='landing-page-featured-post-reply-count'>{post.num_of_replies}</span>
                                                <span className='landing-page-featured-post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LandingPageFeaturePosts