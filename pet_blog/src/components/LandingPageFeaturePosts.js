import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'




function LandingPageFeaturePosts(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const {pathname, state} = useLocation()
    const {featuredPosts} = props

    const setWidth = (e)=> {
        setWindowWidth(window.innerWidth)
        return e.target.removeEventListener('resize', setWidth)
    }

    useEffect(()=> {
        window.addEventListener('resize', setWidth)
    }, [windowWidth])

    
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
                    {featuredPosts.map((post, index)=> {
                        return (
                            <div key={post.id} className="landing-page-featured-post">
                                <div className="landing-page-featured-post-image-container">
                                    <img className='landing-page-featured-post-image' src={post.image_url} alt={post.title} />
                                    {post.qs_count.like_count > 1 ? 
                                        <div className='landing-page-featured-post-like mobile-landing-page-featured-post-like'>
                                            <div className='landing-page-featured-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-featured-post-clap"></i>
                                                <span className='landing-page-featured-post-like-count'>{post.qs_count.like_count}</span>
                                            </div>
                                            <div className='landing-page-featured-post-num-of-replies-container'>
                                                <i className="fa-solid fa-message landing-page-featured-post-num-of-post"></i>
                                                <span className='landing-page-featured-post-reply-count'>{post.qs_count.comment_count}</span>
                                            </div>
                                        </div>
                                    : 
                                        <div className='landing-page-featured-post-like mobile-landing-page-featured-post-like'>
                                            <div className='landing-page-featured-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-featured-post-clap"></i>
                                                <span className='landing-page-featured-post-like-count'>{post.qs_count.like_count}</span>
                                            </div>
                                            <div className='landing-page-featured-post-num-of-replies-container'>
                                                <i className="fa-solid fa-message landing-page-featured-post-num-of-post"></i>
                                                <span className='landing-page-featured-post-reply-count'>{post.qs_count.comment_count}</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className='landing-page-featured-post-text-content'>
                                    <h3 className='landing-page-featured-post-title'>{post.title}</h3>
                                    <p className='landing-page-featured-post-content'>{
                                        windowWidth >= 1200 && index === 2 && post.content.slice(0, 200) || 
                                        windowWidth >= 1200 && index !== 2 && post.content.slice(0, 50) ||
                                        post.content.slice(0, 100)
                                        }...
                                        <Link 
                                            to={`/post/${post.id}/detail/`} 
                                            state={{redirect:pathname}} 
                                            className='landing-page-featured-post-read-post'
                                        >
                                            Read more
                                        </Link>
                                    </p>
                                    {post.qs_count.like_count > 1 ? 
                                        <div className='landing-page-featured-post-like lg-landing-page-featured-post-like'>
                                            <div className='landing-page-featured-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-featured-post-clap"></i>
                                                <span className='landing-page-featured-post-like-count'>{post.qs_count.like_count}</span>
                                            </div>
                                            <div className='landing-page-featured-post-num-of-replies-container'>
                                                <i className="fa-solid fa-message landing-page-featured-post-num-of-post"></i>
                                                <span className='landing-page-featured-post-reply-count'>{post.qs_count.comment_count}</span>
                                            </div>
                                        </div>
                                    : 
                                        <div className='landing-page-featured-post-like lg-landing-page-featured-post-like'>
                                            <div className='landing-page-featured-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-featured-post-clap"></i>
                                                <span className='landing-page-featured-post-like-count'>{post.qs_count.like_count}</span>
                                            </div>
                                            <div className='landing-page-featured-post-num-of-replies-container'>
                                                <i className="fa-solid fa-message landing-page-featured-post-num-of-post"></i>
                                                <span className='landing-page-featured-post-reply-count'>{post.qs_count.comment_count}</span>
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