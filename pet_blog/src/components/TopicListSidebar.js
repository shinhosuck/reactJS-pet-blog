import React from 'react'
import { Link, useLocation } from 'react-router-dom'




function TopicListSidebar(props) {
    const {posts} = props
    const {pathname} = useLocation()
    const objs = posts ? posts.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()})) : null

    return (
        <div className="topics-side-bar-posts-container">
            <h2 className='topics-side-bar__header'>Top Posts</h2>
            {objs&& objs.slice(0, 4).map((post)=>{
                return (
                    <div 
                        className="topics-side-bar__post"
                        to={`/post/${post.id}/detail/`} 
                        state={{redirect:pathname}}
                    >
                        <img className='topics-side-bar_image' src={post.image_url} alt="" />
                        <div className='topics-side-bar__post-text-content'>
                            <h4 className='topics-side-bar__post-title'>{post.title}</h4>
                            <p className='topics-side-bar__post-paragraph'>
                                {post.content.substring(0, 50)}...
                                <Link
                                    className='topic-side-bar__post-read-more'
                                     to={`/post/${post.id}/detail/`} 
                                     state={{redirect:pathname}}
                                >
                                    Read more
                                </Link>
                            </p>
                            {post.like.length > 1 ? 
                                <div className='topics-side-bar__post-like-container'>
                                    <div className='topics-side-bar_like-container'>
                                        <i className="fa-solid fa-hands-clapping topics-side-bar__clapping"></i>
                                        <span className='topics-side-bar__like-count'>{post.like.length}</span>
                                        <span className='topics-side-bar__like-text'>likes</span>
                                    </div>
                                    <div className='topics-side-bar__num-of-replies-container'>
                                    <i className="fa-regular fa-message topics-side-bar__num-of-post"></i>
                                        <span className='topics-side-bar__reply-count'>{post.num_of_replies}</span>
                                        <span className='topics-side-bar__reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                    </div>
                                </div>
                            : 
                                <div className='topics-side-bar__post-like-container'>
                                    <div className='topics-side-bar_like-container'>
                                        <i className="fa-solid fa-hands-clapping topics-side-bar__clapping"></i>
                                        <span className='topics-side-bar__like-count'>{post.like.length}</span>
                                        <span className='topics-side-bar__like-text'>like</span>
                                    </div>
                
                                    <div className='topics-side-bar__num-of-replies-container'>
                                        <i className="fa-regular fa-message topics-side-bar__num-of-post"></i>
                                        <span className='topics-side-bar__reply-count'>{post.num_of_replies}</span>
                                        <span className='topics-side-bar__reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                   
                )
            })}
        </div>
    )
}

export default TopicListSidebar