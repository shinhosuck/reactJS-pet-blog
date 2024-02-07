import React, { useState, useEffect, useRef} from 'react'
import { useParams, Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getPostData, addLikes, replyPost, hasReplied, getRepliedPosts } from '../utils/api'
import LoadingPage from './LoadingPage'
import UpdateReplyPost from './UpdateReplyPost'
import { url } from './PostList'
import userImg from '../images/default.png'


function PostDetail() {
    const [post, setPost] = useState(null)
    const [repliedPosts, setRepliedPosts] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [showUpdateReplyForm, setShowUpdateReplyForm] = useState(false)
    const [updateReplyPost, setUpdateReplyPost] = useState(null)
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

        }else if(width < 700 && img) {
            img.style.height = '100%'
        }
        seWidth(window.innerWidth)
        window.removeEventListener('resize', getWindowWidth)
    }

    const handleReplyPostSubmit = async(e)=> {
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
        if(authenticated) {
            const updateOrReply = async()=> {
                try {
                    const data = await hasReplied(`${url}/api/post/${id}/has-reply/`, authenticated.token)
                    if(!data.message){
                        setUpdateReplyPost(data)
    
                    }else {
                        console.log(data)

                    }
                } catch (error) {
                    console.log(error)
                }
            }
            updateOrReply()
        }
    }, [post])

    useEffect(()=> {
        const fetchRepliedPosts = async()=> {
            try {
                const data = await getRepliedPosts(`${url}/api/replied/posts/${id}/`)
                if(!data.error) {
                    setRepliedPosts(data)

                }else {
                    console.log(data)
                    setRepliedPosts(null)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchRepliedPosts()
    }, [post])


    useEffect(()=> {
        window.addEventListener('resize', getWindowWidth)
    }, [width])


    // if(document.querySelector('.post-detail-container__text-contents')){
    //     const content = document.querySelector('.post-detail-container__text-contents')

    //     console.log('CONTENT:', content.offsetHeight)
    //     content.previousElementSibling.style.height = `${content.clientHeight}px`
    //     console.log('IMAGE:', content.previousElementSibling.offsetHeight)
    // }
    
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
            <div className='post-detail-container'>
                <Link to={`${state.redirect}`} className='post-detail-back-to-btn'>
                    <i className="fa fa-arrow-left"></i>
                    <span>Back to {state.redirect === '/' ? 'home':state.redirect.split('/').filter((obj)=>obj!=='').join('')   }</span>
                </Link>
                <div className="post-detail-container__post-detail">
                    <img className='post-detail-container__post-image' src={post.image_url} alt="" />
                    <div className="post-detail-container__text-contents">
                        <h3 className='post-detail-container__post-title'>{post.title}</h3>
                        <p className='post-detail-container__post-content'>{post.content}</p>
                        <div className="post-detail-container__like-and-reply">
                            {post.like.length > 1 ? 
                                <>
                                    <button onClick={(e)=>updateLike(e, post)} className='post-detail-container__post-like' title='give it a clap'>
                                        <i className="fa-solid fa-hands-clapping post-detail-like"></i>
                                        <span className='post-detail-like-count'>{post.like.length}</span>
                                        <span className='post-detail-like-count-text'>likes</span>
                                    </button>
                                    <div className='post-container__num-of-replies-container'>
                                        <i className="fa-solid fa-message post-container__num-of-post"></i>
                                        <span className='post-reply-count'>{post.num_of_replies}</span>
                                        <span className='post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                    </div>
                                </>
                            : 
                                <>
                                    <button onClick={(e)=>updateLike(e, post)} className='post-detail-container__post-like' title='give it a clap'>
                                        <i className="fa-solid fa-hands-clapping post-detail-like"></i>
                                        <span className='post-detail-like-count'>{post.like.length}</span>
                                        <span className='post-detail-like-count-text'>like</span>
                                    </button>
                                    <div className='post-container__num-of-replies-container'>
                                        <i className="fa-solid fa-message post-container__num-of-post"></i>
                                        <span className='post-reply-count'>{post.num_of_replies}</span>
                                        <span className='post-reply-text'>{post.num_of_replies > 1 ? 'comments': 'comment'}</span>
                                    </div>
                                </>
                            }
                            {updateReplyPost ? 
                                <button className='post-detail-edit' onClick={()=>setShowUpdateReplyForm(true)}>
                                    <i className="fas fa-edit post-detail-edit-btn"></i>
                                    <span className='post-detail-edit-text'>update</span>
                                </button> 
                            :
                                <button 
                                    onClick={()=> {
                                        authenticated ? setShowReplyForm(true):
                                        navigate('/login', {replace:true, state:{error:'You must login first.'}})
                                    }} 
                                    className='post-detail-reply'
                                >
                                    <i className="fa fa-reply post-detail-reply-btn" title='reply'></i>
                                    <span className='post-detail-reply-text'>reply</span>
                                </button>
                            }
                        </div>
                    </div>
                </div>
                {showReplyForm && authenticated &&
                    <div className="reply-form-container">
                        <form action="" className="reply-form" onSubmit={handleReplyPostSubmit}>
                            <textarea className='reply-form-textarea' ref={replyContent} rows='7' placeholder="What's on your mind?"/>
                            <div className="reply-btns">
                                <button className='reply-btn-submit' type='submit'>Reply</button>
                                <button onClick={()=>setShowReplyForm(false)} className='reply-btn-cancel' type='button'>Cancel</button>
                            </div>
                        </form>
                    </div>
                }
                {showUpdateReplyForm && authenticated &&
                    <UpdateReplyPost updateReplyPost={updateReplyPost} showUpdateReplyForm={setShowUpdateReplyForm}/>
                }
                <>
                    {repliedPosts ? 
                        <div className="replied-posts">
                            {repliedPosts.map((post)=> {
                                return (
                                    <div key={post.id} className="replied-post">
                                        <div className='replied-post-user-date'>
                                            <div className='replied-post-user-image-container'>
                                                <img className='replied-post-user-image' src={post.user_image_url} alt="profile image"/>
                                                <p className='replied-post-user'>{post.user}</p>
                                            </div>
                                            <p className='replied-post-date-posted'>{new Date(post.date_posted).toDateString()}</p>
                                        </div>
                                        <p className='replied-post-content'>{post.content}</p>
                                    </div>
                                )
                            })}
                        </div>
                    :
                        
                        <div className="no-replied-post-container">
                            <h4>Be the first one to leave a comment!</h4>
                        </div>
                    }
                </>
            </div>
        </React.Fragment>
    )
}

export default PostDetail