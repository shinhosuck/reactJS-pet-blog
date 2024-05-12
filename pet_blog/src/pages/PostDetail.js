import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import CommentForm from '../components/CommentForm'
import LoadingPage from './LoadingPage'
import UpdatePostForm from '../components/UpdatePostForm'
import Comments from '../components/Comments'
import PostDetailPost from '../components/PostDetailPost'
import { getPostData, addLikes, getPostComments } from '../utils/api'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import dogImg from '../images/cartoon_dog.png'
import SidebarLatestPosts from '../components/SidebarLatestPosts'



function PostDetail() {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [showUpdatePostForm, setShowUpdatePostForm] = useState(false)
    const { isAuthenticated, posts, topics } = useContext(ContentLayoutContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const updateLike = async()=> {
        if(!isAuthenticated) {
            navigate('/login', {replace:true, state:{error:'You must login first.'}})

        }else {
            const data = await addLikes(`${url}/api/post/${post.id}/like/`, isAuthenticated.token)
            if(!data.error){
                setPost((prev)=>{
                    if(!prev.likes.includes(isAuthenticated.username)) {
                        return {
                            ...prev, 
                            likes:[...prev.likes, isAuthenticated.username],
                            qs_count:{...prev.qs_count, like_count:prev.qs_count.like_count+1}
                        }
                    }else {
                        return prev
                    }
                })
            }
        }
    }

    const getPost = async()=> {
        try {
            const data = await getPostData(`${url}/api/post/${id}/detail/`)
            if(data.error) {
                setIsError(data.error)
                setIsLoading(false)
                
            }else {
                const datePosted = new Date(data.date_posted)
                const postObj = {...data, date_posted:`${datePosted.toDateString()} ${datePosted.toLocaleTimeString({}, { hour:'2-digit', minute:'2-digit'})}`}
                setPost(postObj)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getPost()
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
                        <p className='post-detail-post-topic-name'>{post.topic}</p>
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
                                getPost={getPost}
                            />
                        }
                        {!showUpdatePostForm &&
                            <CommentForm 
                                setShowCommentForm={setShowCommentForm}
                                comments={comments}
                                setComments={setComments}
                                setPost={setPost}
                                post={post}
                            />
                        }
                        {showUpdatePostForm && isAuthenticated &&
                            <UpdatePostForm 
                                post={post} 
                                showUpdatePostForm={setShowUpdatePostForm}
                                authenticated={isAuthenticated}
                            />
                        }
                        <div className="post-detail-comments">
                            {comments && comments.map((comment)=> {
                                return (
                                    <Comments
                                        key={comment.id}
                                        comment={comment}
                                        comments={comments}
                                        setComments={setComments}
                                        setPost={setPost}
                                        post={post}
                                        getPost={getPost}
                                    />
                                )
                            })} 
                        </div>
                    </div>
                    {!showUpdatePostForm && !comments &&
                        <div className="no-comments-container">
                            <img src={dogImg} alt="" />
                            <div className="no-comment-text-container">
                                <h3>Be the first to comment!</h3>
                                <p>
                                    Nobody's responded to this post yet.
                                    Add your thoughts and get the conversation going.
                                </p>
                                {!isAuthenticated && <p className='login-to-create-post'>Please login to comment on this post. <Link to='/login'>Login</Link></p>}
                            </div>
                        </div>
                    }
                </div>
                <div className='post-detail-side-bar'>
                    <SidebarLatestPosts />
                </div>
            </div>
        </React.Fragment>
    )
}

export default PostDetail