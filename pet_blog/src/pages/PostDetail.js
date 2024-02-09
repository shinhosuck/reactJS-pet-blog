import React, { useState, useEffect, useRef} from 'react'
import { useParams, Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getPostData, addLikes, replyPost, hasReplied, getPostComments } from '../utils/api'
import CommentForm from '../components/CommentForm'
import LoadingPage from './LoadingPage'
import UpdatePostForm from '../components/UpdatePostForm'
import Comments from '../components/Comments'
import { url } from './PostList'
import userImg from '../images/default.png'
import ScrollToTop from '../components/ScrollToTop'


function PostDetail() {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [showUpdatePostForm, setShowUpdatePostForm] = useState(false)
    const [updatePost, setUpdatePost] = useState(null)
    const authenticated = JSON.parse(localStorage.getItem('auth')) || null
    const { id } = useParams()
    const replyContent = useRef()
    const navigate = useNavigate()
    const {state, pathname} = useLocation()
    const [width, seWidth] = useState(window.innerWidth)

    

    const getWindowWidth = (e)=> {
        const content = document.querySelector('.post-detail-container__text-contents')
        const img = content && content.previousElementSibling
        if(width >= 700 && img) {
            img.style.height = `${content.offsetHeight}px`
            img.style.minHeight = '180px'

        }else if(img) {
            img.style.height = 'auto'
        }
        seWidth(window.innerWidth)
        window.removeEventListener('resize', getWindowWidth)
    }


    const handleCommentSubmit = async(e)=> {
        e.preventDefault()
        const content = {content:replyContent.current.value}
        try {
            const data = await replyPost(`${url}/api/post/${post.id}/reply/`, content, authenticated.token)
            if(data.message) {
                navigate('/posts')

            }else {
                console.log(data.detail)

            }
        } catch (error) {
            console.log(error.message)
        }
    }


    const updateLike = async(e)=> {
        if(!authenticated) {
            navigate('/login', {replace:true, state:{error:'You must login first.'}})

        }else {
            try {
                const data = await addLikes(`${url}/api/update/post/${post.id}/like/`, authenticated.token)
                if(!data.error){
                    setPost((prev)=>{
                        const newLike = prev.like
                        !newLike.includes(authenticated.username) && newLike.push(authenticated.username)
                        return {...prev, like:newLike}
                    })
                }else {
                    console.log(data)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
    }


    useEffect(()=>{
        const getData = async()=> {
            try {
                const data = await getPostData(`${url}/api/post/${id}/detail/`)
                const objs = {...data, date_posted:new Date(data.date_posted).toDateString()}
                setPost(objs)
                setIsLoading(false)

            } catch ({message}) {
                console.log('Error:',message)
                setIsError(message)
                setIsLoading(false)
            }
        }
        getData()

    }, [id])
    

    useEffect(()=> {
        if(authenticated && post && authenticated.username === post.author) {
            setUpdatePost(post)
        }
    }, [post])

    
    useEffect(()=> {
        const fetchpostComments = async()=> {
            try {
                const data = await getPostComments(`${url}/api/post/${id}/comments/`)
                if(!data.error) {
                    setComments(data)

                }else {
                    console.log(data)
                    setComments(null)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchpostComments()
    }, [post])


    useEffect(()=> {
        window.addEventListener('resize', getWindowWidth)
    }, [width])


    if(document.querySelector('.post-detail-container__text-contents')){
        const content = document.querySelector('.post-detail-container__text-contents')
        const img = content && content.previousElementSibling
        if(width >= 700 && img) {
            img.style.height = `${content.offsetHeight}px`
            img.style.minHeight = '180px'

        }else {
            img.style.height = 'auto'
        }
    }

    if(isLoading) {
        return (
            <LoadingPage />
        )
    }

    if(isError) {
        return (
            <h2>There was an error</h2>
        )
    }
    return (
        <React.Fragment>
            <ScrollToTop />
            <div className="bg-img">
                <div className="bg-img-header-container">
                    <div className="bg-img-contents">
                        <div className="post-detail-author-profile">
                            <img className='post-detail-author-img' src={userImg} alt="" />
                            <h4 className='post-detail-post-author'>{post.author}</h4>
                        </div>
                        <p className='post-detail-date-posted'>Posted on {post.date_posted}</p>
                        <h1 className='post-detail-post-title'>{post.title}</h1>
                    </div>
                </div>
            </div>
            <div className="post-detail-main-container">
                <div className='post-detail-container'>
                    <Link to={`${state.redirect}`} className='post-detail-back-to-btn'>
                        <i className="fa fa-arrow-left"></i>
                        <span>Back to {state.redirect === '/' ? 'home':state.redirect.split('/').filter((obj)=>obj!=='').join('')   }</span>
                    </Link>
                    <div className="post-detail-container__post-detail">
                        <div className='post-detail-container__post-image-container'>
                            <img className='post-detail-container__post-image' src={post.image_url} alt="" />
                        </div>
                        <div className="post-detail-container__text-contents">
                            <h3 className='post-detail-container__post-title'>{post.title}</h3>
                            <p className='post-detail-container__post-content'>{post.content}</p>
                            <div className="post-detail-container__like-and-reply">
                                {post.like.length > 1 ? 
                                    <>
                                        <div className='post-detail-container__num-of-replies-container'>
                                            <i className="fa-solid fa-message post-detail-container__num-of-post"></i>
                                            <span className='post-detail-container__reply-count'>{post.num_of_replies}</span>
                                            <span className='post-detail-container__reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                        </div>
                                        <button 
                                            onClick={(e)=>authenticated ? updateLike(e, post): navigate('/login', {state:{error:'You must login!'}})} 
                                            className='post-detail-container__post-like' 
                                        >
                                            <i className="fa-solid fa-hands-clapping post-detail-like"></i>
                                            <span className='post-detail-like-count'>{post.like.length}</span>
                                            <span className='post-detail-like-count-text'>likes</span>
                                        </button>
                                        {authenticated && 
                                            <button 
                                                onClick={()=> {
                                                    setShowCommentForm(true)
                                                    setShowUpdatePostForm(false)
                                                }} 
                                                className='post-detail-reply'
                                            >
                                                <i className="fa fa-reply post-detail-reply-btn" title='reply'></i>
                                                <span className='post-detail-reply-text'>reply</span>
                                            </button>
                                        }
                                    </>
                                : 
                                    <>
                                        <div className='post-detail-container__num-of-replies-container'>
                                            <i className="fa-solid fa-message post-detail-container__num-of-post"></i>
                                            <span className='post-detail-container__reply-count'>{post.num_of_replies}</span>
                                            <span className='post-detail-container__reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                        </div>
                                        <button
                                            onClick={(e)=>authenticated ? updateLike(e, post): navigate('/login', {state:{error:'You must login!'}})} 
                                            className='post-detail-container__post-like'
                                        >
                                            <i className="fa-solid fa-hands-clapping post-detail-like"></i>
                                            <span className='post-detail-like-count'>{post.like.length}</span>
                                            <span className='post-detail-like-count-text'>like</span>
                                        </button>
                                        {authenticated && 
                                            <button 
                                                onClick={()=> {
                                                    setShowCommentForm(true)
                                                    setShowUpdatePostForm(false)
                                                }} 
                                                className='post-detail-reply'
                                            >
                                                <i className="fa fa-reply post-detail-reply-btn" title='reply'></i>
                                                <span className='post-detail-reply-text'>reply</span>
                                            </button>
                                        }
                                    </>
                                }
                                {updatePost && 
                                    <button
                                        className='post-detail-edit' 
                                        onClick={()=> {
                                            setShowUpdatePostForm(true)
                                            setShowCommentForm(false)
                                        }}
                                    >
                                        <i className="fas fa-edit post-detail-edit-btn"></i>
                                        <span className='post-detail-edit-text'>edit post</span>
                                    </button> 
                                }
                            </div>
                        </div>
                    </div>
                    {showCommentForm && authenticated &&
                        <CommentForm 
                            handleCommentSubmit={handleCommentSubmit} 
                            showCommentForm={setShowCommentForm} 
                            replyContent={replyContent}
                        />
                    }
                    {showUpdatePostForm && authenticated &&
                        <UpdatePostForm 
                            updatePost={updatePost} 
                            showUpdatePostForm={setShowUpdatePostForm}
                        />
                    }
                    <>
                        {comments ? 
                            <Comments comments={comments}/>
                        :
                            !showCommentForm &&
                            <div className="no-comments-container">
                                <div className="no-comment-text-container">
                                    <h3>Be the first to comment!</h3>
                                    <p>
                                        Nobody's responded to this post yet.
                                        Add your thoughts and get the conversation going.
                                    </p>
                                </div>
                            </div>
                        }
                    </>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PostDetail