import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'




function PostListPosts(props) {
    const [width, setWidth] = useState(window.innerWidth)
    const {state, pathname} = useLocation()
    const {posts, user} = props

    
    const getWindowWidth = (e)=> {
        setWidth(window.innerWidth)
        
        const textContents = [...document.querySelectorAll('.post-container__post-text-content')]
        textContents.forEach((content)=> {
            const contentHeight = content.offsetHeight
            const element = content.previousElementSibling.firstElementChild
            if(width >= 700) {
                element.style.height = `${contentHeight + 15}px`
                element.style.width = 'auto'
                element.style.display = 'block'

            }else {
                element.style.height = '100%'
                element.style.width = '100%'
                element.style.aspectRatio = '4/3'
                element.style.objectFit = 'cover'
                element.style.display = 'block'
            }
        })
        window.removeEventListener('resize', getWindowWidth)
    }

    useEffect(()=> {
        if(width >= 700) {
            getWindowWidth()
        }
        window.addEventListener('resize', getWindowWidth)
    }, [width])

    return (
        <div className="post-container__posts">
            {user && 
                <Link 
                    to='/create/post/' 
                    state={{redirect:pathname}}
                    className="post-container__post-list-create-post"
                >
                    <img className='post-container__create-post-image' src={user.profile_image_url} alt="" />
                    <p className='post-container__create-post-text'>Start a post</p>
                </Link>
            }
            {posts.map((post)=>{
                return (
                    <div key={post.id} className="post-container__post">
                        <div className="post-container__post-image-container">
                            <img className='post-container__post-image' src={post.image_url} alt={post.title} />
                        </div>
                        <div className='post-container__post-text-content'>
                            <h3 className='post-container__post-title'>{post.title}</h3>
                            <p className='post-container__post-content'>
                                {post.content.substring(0, 150)}...
                                <Link 
                                    className='post-container__post-read-more-btn'
                                    to={`/post/${post.id}/detail/`}
                                    state={{redirect:pathname}} 
                                >
                                    Read more
                                </Link>
                            </p>
                            {post.like.length > 1 ? 
                                <div className='post-container__post-like'>
                                    <div className='post-container__post-like-container'>
                                        <i className="fa-solid fa-hands-clapping post-container__clapping"></i>
                                        <span className='post-container__post-like-count'>{post.like.length}</span>
                                        <span className='post-container__post-like-text'>likes</span>
                                    </div>
                                    <div className='post-container__num-of-replies-container'>
                                        <i className="fa-regular fa-message post-container__num-of-post"></i>
                                        <span className='post-container__post-reply-count'>{post.num_of_replies}</span>
                                        <span className='post-container__post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                    </div>
                                </div>
                            : 
                                <div className='post-container__post-like'>
                                    <div className='post-container__post-like-container'>
                                        <i className="fa-solid fa-hands-clapping post-container__clapping"></i>
                                        <span className='post-container__post-like-count'>{post.like.length}</span>
                                        <span className='post-container__post-like-text'>like</span>
                                    </div>
                                    <div className='post-container__num-of-replies-container'>
                                        <i className="fa-regular fa-message post-container__num-of-post"></i>
                                        <span className='post-container__post-reply-count'>{post.num_of_replies}</span>
                                        <span className='post-container__post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
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

export default PostListPosts