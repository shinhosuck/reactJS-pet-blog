import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import RightSidebar from '../components/RightSidebar'
import LoadingPage from './LoadingPage'
import { handleRightColumnContent } from '../utils/handleEvents'


function SearchResults() {
    const [posts, setPosts] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const {state, pathname} = useLocation()


    useEffect(()=> {
        document.title = 'Search Result'
        if (state) {
            setPosts(null)
            setIsError(null)

            if (state.posts) {
                setPosts(state.posts)

            }else {
                setIsError(state.error)
            }
            setIsLoading(false)
        }
    }, [state])

    useEffect(()=> {
        window.addEventListener('scroll', handleRightColumnContent)
        return ()=> {
            window.removeEventListener('scroll', handleRightColumnContent)
        }
    }, [])

    if(isLoading) {
        return (
            <LoadingPage />
        )
    }
    
    return (
        <>
            <div className="bg-img">
                <div className="bg-img-header-container">
                    <div className="bg-img-contents">
                        <h1 className='bg-img-header'>Search Result</h1>
                        <p className='bg-img-text'>
                        You'll find a wealth of information 
                        about caring for your canine companion, 
                        from best practices to advice against.
                        </p>
                    </div>
                </div>
            </div>
            <div className="post-container">
                <div className="post-container__posts">
                    { isError ?
                        <h3>{ isError }</h3>
                    :
                        posts && posts.map((post)=> {
                            return (
                                <div key={post.id} className="post-container__post">
                                    <div className='post-container__post-author-and-date'>
                                        <img src={post.author_profile_image_url} alt="" />
                                        <div>
                                            <p className='post-container__post-author'>{post.author}</p>
                                            <p className='post-container__post-date-posted'>{formatDate(post.date_posted)}</p>
                                        </div>
                                    </div>
                                    <div className='post-container-post-title-topic-container'>
                                        <h3 className='post-container__post-title'>{post.title}</h3>
                                    </div>
                                    <div className="post-container__post-image-container">
                                        <img className='post-container__post-image' src={post.image_url} alt={post.title} />
                                        {post.qs_count.like_count > 1 ? 
                                            <div className='post-container__post-like'>
                                                <div className='post-container-post-topic'>
                                                    <p>{post.topic}</p>
                                                </div>
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
                                                <div className='post-container-post-topic'>
                                                    <p>{post.topic}</p>
                                                </div>
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
                        })
                    }
                </div>
                <div className='right-side-bar'>
                    <RightSidebar />
                </div>
            </div>
        </>
    )
}

export default SearchResults