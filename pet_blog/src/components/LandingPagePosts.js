import React from 'react'
import { Link, useLocation } from 'react-router-dom'




function LandingPagePosts(props) {
    const {pathname, state} = useLocation()
    const {posts} = props
    return (
        <div className="landing-page-posts-container">
            <div className="landing-page-posts-wrapper">
                <div className="landing-page-post-header-container">
                    <h1 className='landing-page-posts-header'>Posts</h1>
                </div>
                <div className="landing-page-posts">
                    {posts.map((post)=> {
                        return (
                            <div key={post.id} className="landing-page-post">
                                <div className="landing-page-post-image-container">
                                    <img className='landing-page-post-image' src={post.image_url} alt={post.title} />
                                </div>
                                <div className="landing-page-post-color-overlay"></div>
                                <div className='landing-page-post-text-content'>
                                    <h3 className='landing-page-post-title'>{post.title}</h3>
                                    <p className='landing-page-post-content'>
                                        {post.content.substring(0, 100)}... 
                                        <Link 
                                            to={`/post/${post.id}/detail/`} 
                                            state={{redirect:pathname}} 
                                            className='landing-page-post-read-more'
                                        >
                                            Read more
                                        </Link>
                                    </p>
                                    {post.like.length > 1 ? 
                                        <div className='landing-page-post-like'>
                                            <div className='landing-page-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-post-clap"></i>
                                                <span className='landing-page-post-like-count'>{post.like.length}</span>
                                                <span className='landing-page-post-like-text'>likes</span>
                                            </div>
                                            <div className='landing-page-post-num-of-replies-container'>
                                                <i className="fa-regular fa-message landing-page-post-num-of-post"></i>
                                                <span className='landing-page-post-reply-count'>{post.num_of_replies}</span>
                                                <span className='landing-page-post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                            </div>
                                        </div>
                                    : 
                                        <div className='landing-page-post-like'>
                                            <div className='landing-page-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-post-clap"></i>
                                                <span className='landing-page-post-like-count'>{post.like.length}</span>
                                                <span className='landing-page-post-like-text'>like</span>
                                            </div>
                                            <div className='landing-page-post-num-of-replies-container'>
                                                <i className="fa-regular fa-message landing-page-post-num-of-post"></i>
                                                <span className='landing-page-post-reply-count'>{post.num_of_replies}</span>
                                                <span className='landing-page-post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="landing-page-post-see-all-posts-container">
                    <Link to='/posts' className='landing-page-post-see-all-posts'>
                        View all
                        <i className="fa fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPagePosts