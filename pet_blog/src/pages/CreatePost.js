import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate, useLocation, Link} from 'react-router-dom'
import LoadingPage from './LoadingPage'
import { getTopicData, createPost, updatePost } from '../utils/api'
import { validatePost } from '../utils/validators'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout'


function CreatePost(props) {
    const {update, text} = props
    const [post, setPost] = useState({image:'',topic:'',title:'',content:''})
    const [topics, setTopics] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [missingValue, setMissingValue] = useState(null)
    const {isAuthenticated} = useContext(ContentLayoutContext)
    const {state, pathname} = useLocation()
    const navigate = useNavigate()
    
    const handleSubmit = async(e)=> {
        e.preventDefault()
        setMissingValue(null)
        const form = new FormData()
        const obj = validatePost(post)
       
        if(obj !== 'valid') {
            setMissingValue(obj)

        }else {
            const keys = Object.keys(post)
            keys.forEach((key)=>{
                if(key === 'image'){
                    if (post[key] instanceof Object) {
                        form.append(key, post[key][0])
                    }else {
                        form.append(key, post[key])
                    }
                }else if(key !== 'image') {
                    form.append(key, post[key])
                }
            })

            let data;
            
            if(update) {
                data = await updatePost(`${url}/api/post/${post.id}/update/`, form, isAuthenticated.token)

            }else {
                data = await createPost(`${url}/api/create/`, form, isAuthenticated.token)
            }
            
            if(data.message === 'Successfully created' || data.message === 'Successfully updated'){
                setPost({image:'',topic:'',title:'',content:''})
                navigate('/my-posts', {state:{message:data.message}})
            }
        }
    }

    function handleChange(e) {
        const {name, value} = e.target 
        name === 'image' ? 
            setPost((prev)=>({...prev, [name]:e.target.files})) 
        : 
            setPost((prev)=>({...prev, [name]:value}))
    }

    const getData = async()=> {
        try {
            const data = await getTopicData(`${url}/api/topics/`)
            const topicArray = data.map((topic)=>topic.name)
            setTopics(topicArray)
            setTimeout(()=>{
                setIsLoading(false)
            }, 500)
        } catch ({message}) {
            setIsLoading(false)
            setIsError(true)
        }
    }

    useEffect(()=>{
        getData()
        if(update) {
            setPost(update)
        }
    }, [update])

    if(!isAuthenticated) {
        return (
            <Navigate to='/login' replace={true} state={{error:'Please login first!', redirect:pathname}}/>
        )
    }
    if(isLoading) {
        return (
            <LoadingPage />
        )
    }
    if(isError) {
        return (
            <h2>There was an error!</h2>
        )
    }
    return (
        <div className="create-post-wrapper">
            <div className="bg-img create-post-bg-img">
               <div className='create-post-bg-img-text-container'>
                    <h1 className='my-posts-hero-header'>Create Post</h1>
                    <p className='bg-img-text'>Create a post to start a new conversation.</p>
               </div>
            </div>
            <div className='create-post-container'>
                {state && state.redirect && 
                    <div className="create-post-container__redirect-btn">
                        <i className="fa fa-arrow-left"></i>
                        <Link to={`${state.redirect}`}>
                            Back to {state.redirect.split('/').filter((obj)=>obj!=='').join('')}
                        </Link>
                    </div>
                }
                <div className="create-post__form-container">
                    <form className="create-post__form" onSubmit={handleSubmit}>
                        {missingValue && missingValue.image === '' && <p className='create-post__error'>This field is required.</p>}
                        <label className='create-post__img-input-label' htmlFor="image">
                            Image
                            <input
                                onChange={handleChange}
                                type="file" 
                                accept='image/*'
                                name='image'
                                hidden
                                className='create-post__img-input' 
                                id='image'
                            />
                        </label>
                        <label className='create-post__label' htmlFor="topic">Topic</label>
                        {missingValue && missingValue.topic === '' && <p className='create-post__error'>This field is required.</p>}
                        <select
                            id='topic'
                            onChange={handleChange} 
                            className='create-post__select' 
                            name="topic"
                            value={post.topic}
                        >
                        <option className='create-post__option' value=''>--------</option>
                            {topics.map((topic)=>{
                                return (
                                    <option className='create-post__option' key={topic} value={topic}>
                                        {topic}
                                    </option>
                                )
                            })}
                        </select>
                        <label className='create-post__label' htmlFor="title">Title</label>
                        {missingValue && missingValue.title === '' && <p className='create-post__error'>This field is required.</p>}
                        <input
                            id='title'
                            onChange={handleChange}
                            className='create-post__input' 
                            type="text"
                            value= {post.title}
                            name='title'
                        />
                        <label className='create-post__label' htmlFor="content">Content</label>
                        {missingValue && missingValue.content === '' && <p className='create-post__error'>This field is required.</p>}
                        <textarea
                            id='content'
                            onChange={handleChange}
                            name="content" 
                            className='create-post__textarea'
                            cols="30" 
                            rows="5"
                            value= {post.content}
                        />
                        <div className='create-post-btns'>
                            <button className='create-post__btn' type='submit'>Submit</button>
                            <Link to='/posts' className='create-post-cancel-btn'>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost