import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'



function LandingPagePosts(props) {
    const {pathname, state} = useLocation()
    const {latesPosts} = props
    return (
        <div className="landing-page-posts-container">
            <div className="landing-page-posts-wrapper">
                <div className="landing-page-post-header-container">
                    <h1 className='landing-page-posts-header'>Latest Posts</h1>
                    <p className='landing-page-posts-text'>
                        You'll find a wealth of information about caring for your canine companion, 
                        from best practices to advice against.
                    </p>
                </div>
                <div className="landing-page-posts">
                    {latesPosts.map((post)=> {
                        return (
                            <div key={post.id} className="landing-page-post">
                                <div className='landing-page-post-author-and-date'>
                                    <img src={post.author_profile_image_url} alt="" />
                                    <div>
                                        <p>{post.author}</p>
                                        <p>{formatDate(post.date_posted)}</p>
                                    </div>
                                </div>
                                <h3 className='landing-page-post-title'>{post.title}</h3>
                                <div className="landing-page-post-image-container">
                                    <img className='landing-page-post-image' src={post.image_url} alt={post.title} />
                                    {post.qs_count.like_count > 1 ? 
                                        <div className='landing-page-post-like'>
                                            <div className='landing-page-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-post-clap"></i>
                                                <span className='landing-page-post-like-count'>{post.qs_count.like_count}</span>
                                            </div>
                                            <div className='landing-page-post-num-of-replies-container'>
                                                <i className="fas fa-comment landing-page-post-num-of-post"></i>
                                                <span className='landing-page-post-reply-count'>{post.qs_count.comment_count}</span>
                                            </div>
                                        </div>
                                    : 
                                        <div className='landing-page-post-like'>
                                            <div className='landing-page-post-like-container'>
                                                <i className="fa-solid fa-hands-clapping landing-page-post-clap"></i>
                                                <span className='landing-page-post-like-count'>{post.qs_count.like_count}</span>
                                            </div>
                                            <div className='landing-page-post-num-of-replies-container'>
                                                <i className="fas fa-comment landing-page-post-num-of-post"></i>
                                                <span className='landing-page-post-reply-count'>{post.qs_count.comment_count}</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className='landing-page-post-text-content'>
                                    <p className='landing-page-post-content'>
                                        {post.content.length > 250 ?
                                            post.content.substring(0, 250)
                                        :
                                            post.content
                                        }... 
                                        <Link 
                                            to={`/post/${post.id}/detail/`} 
                                            state={{redirect:pathname}} 
                                            className='landing-page-post-read-more'
                                        >
                                            Read more
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Link to='/posts' className='landing-page-post-see-all-posts'>
                    View all
                    <i className="fa fa-arrow-right"></i>
                </Link>
            </div>
        </div>
    )
}

export default LandingPagePosts