import React, { useState, useEffect, useRef} from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { getPostData, addLikes, createComment, getPostComments } from '../utils/api'
import CommentForm from '../components/CommentForm'
import LoadingPage from './LoadingPage'
import UpdatePostForm from '../components/UpdatePostForm'
import Comments from '../components/Comments'
import { url } from './PostList'
import userImg from '../images/default.png'
import ScrollToTop from '../components/ScrollToTop'
import PostDetailPost from '../components/PostDetailPost'




function PostDetail() {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [showCommentForm, setShowCommentForm] = useState(false)
    const [showUpdatePostForm, setShowUpdatePostForm] = useState(false)
    // const {state, pathname} = useLocation()

    const authenticated = JSON.parse(localStorage.getItem('auth')) || null
    const { id } = useParams()
    const commentContent = useRef()
    const navigate = useNavigate()
    


    const handleCommentSubmit = async(e)=> {
        e.preventDefault()
        const content = {content:commentContent.current.value}
        if(content) {
            try {
                const data = await createComment(`${url}/api/post/${post.id}/create/comment/`, content, authenticated.token)
                const obj = {...data, user:authenticated.username, user_image_url:authenticated.profile_image_url}
                comments ? setComments((prev)=> [...prev, obj]) : setComments([obj])
                setPost((prev)=> ({...prev, num_of_replies:data.comment_count}))
                e.target.reset()
                setShowCommentForm(false)

            } catch (error) {
                console.log(error.message)
            }
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
                const timeOutId = setTimeout(()=>{
                    setIsLoading(false)
                    clearTimeout(timeOutId)
                }, 100)

            } catch ({message}) {
                console.log('Error:',message)
                setIsError(message)
                setIsLoading(false)
            }
        }
        getData()

    }, [id])
    

    useEffect(()=> {
        const fetchPostComments = async()=> {
            try {
                const data = await getPostComments(`${url}/api/post/${id}/comments/`)
                if(!data.error) {
                    setComments(data)

                }else {
                    console.log(data)
                    setComments(false)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchPostComments()
    }, [post])


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
                            <img className='post-detail-author-img' src={post.author_profile_image} alt="" />
                            <h4 className='post-detail-post-author'>{post.author}</h4>
                        </div>
                        <p className='post-detail-date-posted'>Posted on {post.date_posted}</p>
                        <h1 className='post-detail-post-title'>{post.title}</h1>
                    </div>
                </div>
            </div>
            <div className="post-detail-main-container">
                <div className='post-detail-container'>
                    {/* <Link to={`${state && state.redirect && state.redirect}`} className='post-detail-back-to-btn'>
                        <i className="fa fa-arrow-left"></i>
                        <span>Back to {
                                state && state.redirect && state.redirect === '/' 
                            ? 
                                'home'
                            :   
                                state && state.redirect && state.redirect.split('/').filter((obj)=>obj!=='').join('')}</span>
                    </Link> */}
                    <div className='post-detail-container-contents'>
                        {post && 
                            <PostDetailPost 
                                setShowUpdatePostForm = {setShowUpdatePostForm} 
                                setShowCommentForm = {setShowCommentForm} 
                                authenticated = {authenticated} 
                                navigate = {navigate} 
                                post = {post} 
                                updateLike = {updateLike}
                            />
                        }
                        
                        {showCommentForm && authenticated &&
                            <CommentForm 
                                handleCommentSubmit={handleCommentSubmit} 
                                showCommentForm={setShowCommentForm} 
                                commentContent={commentContent}
                            />
                        }
                        {showUpdatePostForm && authenticated &&
                            <UpdatePostForm 
                                post={post} 
                                showUpdatePostForm={setShowUpdatePostForm}
                                authenticated={authenticated}
                            />
                        }
                        
                        {comments &&
                            <Comments 
                                comments={comments} 
                                authenticated={authenticated} 
                                setComments={setComments} 
                                setPost={setPost}
                            />
                        }
                            
                    </div>
                    {!showCommentForm && !showUpdatePostForm && !comments &&
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
                </div>
            </div>
        </React.Fragment>
    )
}

export default PostDetail