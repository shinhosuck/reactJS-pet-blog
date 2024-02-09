import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useLocation, Link} from 'react-router-dom'
import LoadingPage from './LoadingPage'
import { getTopicData, createPost, updatePost } from '../utils/api'
import { validatePost } from '../utils/utils'
import { url } from './PostList'



function CreatePost(props) {
    const {update, text} = props
    const [post, setPost] = useState(
        {
            image:'',
            topic:'',
            title:'',
            content:''
        }
    )
    const [topics, setTopics] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [missingValue, setMissingValue] = useState(null)
    const authenticated = JSON.parse(localStorage.getItem('auth')) || null
    const navigate = useNavigate()
    const {state, pathname} = useLocation()


    const handleSubmit = async(e)=> {
        e.preventDefault()
        setMissingValue(null)
        const form = new FormData()
        const obj = validatePost(post)

        if(obj) {
            setMissingValue(obj)

        }else {
            try {
                const keys = Object.keys(post)
                keys.forEach((key)=>{
                    if(key === 'image' && post[key] instanceof Object) {
                        form.append('image', post[key][0])
                    }else if(key !== 'image') {
                        form.append(key, post[key])
                    }
                })

                let data;
                
                if(update) {
                    data = await updatePost(`${url}/api/post/${post.id}/update/`, form, authenticated.token)

                }else {
                    data = await createPost(`${url}/api/create/`, form, authenticated.token)
                }
                
                if(data.message === 'Successfully created' || data.message === 'Successfully updated'){
                    setPost({
                        image:'',
                        topic:'',
                        title:'',
                        content:''
                    })
                    navigate('/my-posts', {state:{message:data.message}})
                }
            } catch (error) {
                console.log(error)
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

    if(!authenticated) {
        return (
            <Navigate to='/login' replace={true} state={{error:'You must login to create post!', redirect:pathname}}/>
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
                <h2 className='create-post__header'>{text ? 'Update Post' : 'Create Post'}</h2>
                <form className="create-post__form" onSubmit={handleSubmit}>
                    {missingValue && missingValue.image === '' && <p className='create-post__error'>This field is required.</p>}
                    <label className='create-post__img-input-label' htmlFor="image">
                        Choose Image
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
                    <label className='create-post__label' htmlFor="topic">Choose Topic</label>
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
                    <button className='create-post__btn' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost