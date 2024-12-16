import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate, useLocation, Link} from 'react-router-dom'
import LoadingPage from './LoadingPage'
import { getTopicData, createPost, updatePost } from '../utils/api'
import { validatePost } from '../utils/validators'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import paw from '../images/paw.webp'


function CreatePost() {
    const [post, setPost] = useState({image:'',topic:'',title:'',content:''})
    const [topics, setTopics] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [missingValue, setMissingValue] = useState(null)
    const {isAuthenticated} = useContext(ContentLayoutContext)
    const [selected, setSelected ] = useState(null)
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
                }else {
                    form.append(key, post[key])
                }
            })

            const data = await createPost(`${url}/api/create/`, form, isAuthenticated.token)
            
            if(data.message === 'Successfully created'){
                setPost({image:'',topic:'',title:'',content:''})
                navigate(`/post/${data.id}/detail`, {state:{message:data.message}})
            }
        }
    }

    function handleChange(e) {
        const {name, value} = e.target 
        if (name === 'image') {
            setPost((prev)=>({...prev, [name]:e.target.files})) 
            const  imgName = e.target.files[0].name
            setSelected(imgName)
        }
        else {
            setPost((prev)=>({...prev, [name]:value})) 
        }
    }

    function removeSelectedImage(ele) {
        setSelected(null)
        setPost((prev)=>({...prev, image:''}))
        ele.value = ''
    }

    const getData = async()=> {
        try {
            const data = await getTopicData(`${url}/api/topics/`)
            const topicArray = data.map((topic)=>topic.name)
            setTopics(topicArray)
            setIsLoading(false)
        } 
        catch ({message}) {
            setIsLoading(false)
            setIsError(true)
        }
    }

    useEffect(()=>{
        getData()
        document.title = 'Create Post'
    }, [])

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
        <div className='create-post-container'>
            <Link to='/' className='navbar-brand-link'>
                <img className='navbar-brand-logo' src={paw} alt="paw" />
                <h2 className='navbar-brand-name'>
                    <span>Canine</span>
                    <span>Blog</span>
                </h2>
            </Link>
            <div className="create-post__form-container">
                <h2 className='user-login__header'>Create Post</h2>
                <form className="create-post__form" onSubmit={handleSubmit}>
                    <div className="create-post-select-topic-container">
                        <label className='create-post__label' htmlFor="topic">Topic</label>
                        {missingValue && missingValue.topic === '' && <p className='create-post__error'>This field is required.</p>}
                        <select autoFocus={true} id='topic' onChange={handleChange} className='create-post__select' name="topic" value={post.topic}>
                            <option className='create-post__option' value=''>Please choose a topic</option>
                            {topics.map((topic)=>{
                                return (
                                    <option className='create-post__option' key={topic} value={topic}>
                                        {topic}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='create-post-img-input-container'>
                        <label className='create-post__img-input-label' htmlFor="image">Image</label>
                        {missingValue && missingValue.image === '' && <p className='create-post__error'>This field is required.</p>}
                        <div className='create-post-image-input-container' autoFocus={true}>
                            <label className='create-post-hidden-input-label'>
                                <div className='create-post-upload-btn'>
                                    <i className="fa-solid fa-upload"></i>
                                    <span>Upload</span>
                                </div>
                                <input 
                                    style={{display:'none'}}
                                    id='image' 
                                    onChange={handleChange} 
                                    type="file" 
                                    accept='image/*' 
                                    name='image' 
                                    className='create-post__img-input'
                                />
                            </label>
                            {selected &&
                                <div className='create-post-selected-image'>
                                    <span>{selected}</span>
                                    <button 
                                        className='create-post-remove-btn'
                                        type='button' 
                                        onClick={(e)=>{
                                            const ele = e.currentTarget.parentElement
                                            .previousElementSibling.lastElementChild
                                            removeSelectedImage(ele)
                                        }}
                                    >
                                        <i className='fas fa-close'></i>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    
                    <div className='create-post-title-input-container'>
                        <label className='create-post__label' htmlFor="title">Title</label>
                        {missingValue && missingValue.title === '' && <p className='create-post__error'>This field is required.</p>}
                        <input id='title' onChange={handleChange} className='create-post__input' type="text" value= {post.title} name='title'/>
                    </div>
                    <div className="create-post-textarea-container">
                        <label className='create-post__label' htmlFor="content">Content</label>
                        {missingValue && missingValue.content === '' && <p className='create-post__error'>This field is required.</p>}
                        <textarea id='content' onChange={handleChange} name="content" className='create-post__textarea' cols="30" rows="5" value= {post.content}/>
                    </div>
                    <div className='create-post-btns'>
                        <button className='create-post__btn' type='submit'>Submit</button>
                        <Link to='/posts' className='create-post-cancel-btn'>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost