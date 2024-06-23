import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate, Link, NavLink } from 'react-router-dom'
import { getTopicData, updatePost as updateMyPost } from '../utils/api'
import { url } from '../utils/urls'
import CreatePost from './CreatePost'
import { validatePost } from '../utils/validators'
import { ContentLayoutContext } from '../layouts/ContentLayout'


const UpdatePost= ()=> {
    const [topics, setTopics] = useState(null)
    const [error, setError] = useState(null)
    const [updatePost, setUpdatePost] = useState({
        id:'', image:'', topic:'', 
        title:'', content:''
    })
    const [missingValue, setMissingValue] = useState(null)
    const {state} = useLocation()
    const navigate = useNavigate()
    const {isAuthenticated} = useContext(ContentLayoutContext)


    const handleSubmit = async(e)=> {
        e.preventDefault()
        setMissingValue(null)
        
        const formData = new FormData()
        const result = validatePost(updatePost)
       
        if(result !== 'valid') {
            setMissingValue(result)

        }else {
            const keys = Object.keys(updatePost)
            keys.forEach((key)=>{
                if(key === 'image'){
                    if (updatePost[key] instanceof Object) {
                        formData.append(key, updatePost[key][0])
                    }else {
                        formData.append(key, updatePost[key])
                    }
                }else {
                    formData.append(key, updatePost[key])
                }
            })

            const data = await updateMyPost(`${url}/api/post/${updatePost.id}/update/`, formData, isAuthenticated.token)

            if(data.message === 'Successfully updated'){
                setUpdatePost(
                    {
                        id:data.id,
                        image:data.image,
                        topic:data.topic,
                        title:data.title,
                        content:data.content
                    }
                )
                navigate(`/user/${isAuthenticated.username}/dashboard/posts/`, {state:{message:data.message}})
            }
        }
    }

    function handleChange(e) {
        const {name, value} = e.target 
        if (name === 'image') {
            setUpdatePost((prev)=>({...prev, [name]:e.target.files}))
        }else {
            setUpdatePost((prev)=>({...prev, [name]:value}))
        }
    }

    const fetchTopics = async()=> {
        try {
            const data = await getTopicData(`${url}/api/topics`)
            const topic_names = data.map((topic)=>topic.name)
            setTopics(topic_names)
        } catch ({message}) {
            setError(message)
            navigate('/error', {state:{message:message}})
        }
    }

    useEffect(()=> {
        fetchTopics()
        setUpdatePost((prev)=> {
            const post = {
                ...prev,
                id:state.update.id,
                image:state.update.image,
                topic:state.update.topic,
                title:state.update.title,
                content:state.update.content
            }
            return post
        })
    }, [state])
    console.log(updatePost)
    return (
        <div className="create-post-wrapper">
            <div className="bg-img create-post-bg-img">
               <div className='create-post-bg-img-text-container'>
                    <h1 className='my-posts-hero-header'>Post Update</h1>
                    <p className='bg-img-text'>Update your existing post to continue the conversation.</p>
               </div>
            </div>
            <div className='create-post-container'>
                {/* {state && state.redirect && 
                    <div className="create-post-container__redirect-btn">
                        <i className="fa fa-arrow-left"></i>
                        <Link to={`${state.redirect}`}>
                            Back to {state.name}
                        </Link>
                    </div>
                } */}
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
                            value={updatePost ? updatePost.topic : 'topic'}
                        >
                            {topics && topics.map((topic)=>{
                                return (
                                    <option className='create-post__option' key={topic}>
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
                            value= {updatePost && updatePost.title}
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
                            value= {updatePost && updatePost.content}
                        />
                        <div className='create-post-btns'>
                            <button className='create-post__btn' type='submit'>Submit</button>
                            <NavLink to={`/user/${isAuthenticated.username}/dashboard/posts/`} className='create-post-cancel-btn'>Cancel</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatePost