import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import CommentForm from '../components/CommentForm'
import LoadingPage from './LoadingPage'
import UpdatePostForm from '../components/UpdatePostForm'
import Comments from '../components/Comments'
import PostDetailPost from '../components/PostDetailPost'
import { getPostData, addLikes, getPostComments } from '../utils/api'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import ScrollToTop from '../components/ScrollToTop'

function PostDetail() {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [showUpdatePostForm, setShowUpdatePostForm] = useState(false)
    const { isAuthenticated } = useContext(ContentLayoutContext)
    const { id } = useParams()
    const navigate = useNavigate()
    

    const updateLike = async(e)=> {
        if(!isAuthenticated) {
            navigate('/login', {replace:true, state:{error:'You must login first.'}})

        }else {
            const data = await addLikes(`${url}/api/post/${post.id}/like/`, isAuthenticated.token)
            if(!data.error){
                setPost((prev)=>{
                    const newLike = prev.like
                    !newLike.includes(isAuthenticated.username) && newLike.push(isAuthenticated.username)
                    return {...prev, like:newLike}
                })
            }
        }
    }

    useEffect(()=>{
        const getData = async()=> {
            const data = await getPostData(`${url}/api/post/${id}/detail/`)
            if(data.error) {
                setIsError(data.error)
                setIsLoading(false)
                console.log(data.error)

            }else {
                const objs = {...data, date_posted:new Date(data.date_posted).toDateString()}
                setPost(objs)
                setIsLoading(false)
            }
        }
        getData()
    }, [id])
    

    useEffect(()=> {
        const fetchPostComments = async()=> {
            const data = await getPostComments(`${url}/api/post/${id}/comments/`)
            if(data.error) {
                setComments(false)

            }else {
                setComments(data)
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
            <Navigate to='/error' state={{error:isError}}/>
        )
    }

    return (
        <React.Fragment>
            <div className="bg-img">
                <div className="bg-img-header-container">
                    <div className="bg-img-contents">
                        <div className="post-detail-author-profile">
                            <img className='post-detail-author-img' src={post.author_profile_image_url} alt="" />
                            <h4 className='post-detail-post-author'>{post.author}</h4>
                        </div>
                        <p className='post-detail-date-posted'>Posted on {post.date_posted}</p>
                        <h1 className='post-detail-post-title'>{post.title}</h1>
                    </div>
                </div>
            </div>
            <div className="post-detail-main-container">
                <div className='post-detail-container'>
                    <div className='post-detail-container-contents'>
                        {post && 
                            <PostDetailPost 
                                setShowUpdatePostForm = {setShowUpdatePostForm} 
                                setShowCommentForm = {setShowCommentForm} 
                                authenticated = {isAuthenticated} 
                                navigate = {navigate} 
                                post = {post} 
                                updateLike = {updateLike}
                            />
                        }
                        
                        {showCommentForm && isAuthenticated &&
                            <CommentForm 
                                setShowCommentForm={setShowCommentForm} 
                                comments={comments}
                                setComments={setComments}
                                post={post}
                                setPost={setPost}
                                
                            />
                        }
                        {showUpdatePostForm && isAuthenticated &&
                            <UpdatePostForm 
                                post={post} 
                                showUpdatePostForm={setShowUpdatePostForm}
                                authenticated={isAuthenticated}
                            />
                        }
                        
                        {comments &&
                            <Comments 
                                comments={comments} 
                                authenticated={isAuthenticated} 
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