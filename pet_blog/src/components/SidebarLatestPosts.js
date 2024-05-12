import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import { ContentLayoutContext } from '../layouts/ContentLayout'



function SidebarLatestPosts() {
    const { posts } = useContext(ContentLayoutContext)
    const [ scrollHeight, setScrollHeight] = useState(window.pageYOffset)


    function endEventListener(){
        const postDetailSideBar = document.querySelector('.post-detail-side-bar')
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
        <div className="post-detail-side-bar-container">
            <h2 className='post-detail-side-bar-header'>Latest Posts</h2>
            <div className="side-bar-latest-posts-container">
                {posts && posts.slice(0, 6).sort((a, b)=>new Date(b.date_posted)-new Date(a.date_posted))
                .map((post)=> {
                    return (
                        <Link to={`/post/${post.id}/detail/`} key={post.id} className="side-bar-latest-post">
                            <div className="side-bar-post-image-container">
                                <img src={post.image_url} alt="" />
                            </div>
                            <div className='side-bar-post-content'>
                                {post.title.length > 40 ?
                                    <h5>{post.title.substring(0, 40)}...</h5>
                                :
                                    <h5>{post.title}</h5>
                                }
                                <div className="side-bar-likes-and-num-of-comments">
                                    <div className="side-bar-likes">
                                        <i className='fa-solid fa-hands-clapping side-bar-likes-icon'></i>
                                        <span className='side-bar-likes-count'>{post.qs_count.like_count}</span>
                                    </div>
                                    <div className="side-bar-num-of-comments">
                                        <i className="fas fa-comment side-bar-num-of-comments-icon"></i>
                                        <span className='side-bar-num-of-comments-count'>{post.qs_count.comment_count}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default SidebarLatestPosts