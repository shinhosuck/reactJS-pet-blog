import React, { useState, useEffect, useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import { formatDate } from '../utils/formatDate'
import SidebarLatestPosts from '../components/SidebarLatestPosts'

function PostListPosts() {
    const {posts} = useContext(ContentLayoutContext)
    const {pathname} = useLocation()
    const [ scrollHeight, setScrollHeight] = useState(window.pageYOffset)


    function endEventListener(){
        const postDetailSideBar = document.querySelector('.posts-side-bar')
        const scrolled = window.pageYOffset
        if(scrolled >= 450) {
            if(postDetailSideBar) {
                postDetailSideBar.style.top = '75px'
            }
        }else {
            if(postDetailSideBar) {
                postDetailSideBar.style.top = '0px'
            }
        }
        setScrollHeight(scrolled)
        return window.removeEventListener(
            'scroll', 
            endEventListener
        )
    }
    
    useEffect(()=> {
        window.addEventListener(
            'scroll', 
            endEventListener
        )
    }, [scrollHeight])
    
    return (
        <div className="post-container">
            <div className="post-container__posts">
                {posts && posts.map((post)=> {
                    return (
                        <div key={post.id} className="post-container__post">
                            <div className='post-container__post-author-and-date'>
                                <img src={post.author_profile_image_url} alt="" />
                                <div>
                                    <p className='post-container__post-author'>{post.author}</p>
                                    <p className='post-container__post-date-posted'>{formatDate(post.date_posted)}</p>
                                </div>
                            </div>
                            <h3 className='post-container__post-title'>{post.title}</h3>
                            <div className="post-container__post-image-container">
                                <img className='post-container__post-image' src={post.image_url} alt={post.title} />
                                {post.qs_count.like_count > 1 ? 
                                    <div className='post-container__post-like'>
                                        <div className='post-container__post-like-container'>
                                            <i className="fa-solid fa-hands-clapping post-container__clapping"></i>
                                            <span className='post-container__post-like-count'>{post.qs_count.like_count}</span>
                                        </div>
                                        <div className='post-container__num-of-replies-container'>
                                            <i className="fas fa-comment post-container__num-of-post"></i>
                                            <span className='post-container__post-reply-count'>{post.qs_count.comment_count}</span>
                                        </div>
                                    </div>
                                : 
                                    <div className='post-container__post-like'>
                                        <div className='post-container__post-like-container'>
                                            <i className="fa-solid fa-hands-clapping post-container__clapping"></i>
                                            <span className='post-container__post-like-count'>{post.qs_count.like_count}</span>
                                        </div>
                                        <div className='post-container__num-of-replies-container'>
                                            <i className="fas fa-comment post-container__num-of-post"></i>
                                            <span className='post-container__post-reply-count'>{post.qs_count.comment_count}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='post-container__post-text-content'>
                                <p className='post-container__post-content'>
                                    {post.content.length > 250 ?
                                        <span>{`${post.content.substring(0, 250)}`}...</span>
                                    : 
                                        <span>{post.content}</span>
                                    }
                                    <Link 
                                        className='post-container__post-read-more-btn'
                                        to={`/post/${post.id}/detail/`}
                                        state={{redirect:pathname}} 
                                    >
                                        Read more
                                    </Link>
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='posts-side-bar'>
                <SidebarLatestPosts />
            </div>
        </div>
    )
}

export default PostListPosts