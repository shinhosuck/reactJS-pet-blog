import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTopicData } from '../utils/api'
import { url } from './PostList'
import CreatePost from './CreatePost'


const UpdatePost= ()=> {
    const [topics, setTopics] = useState(null)
    const [error, setError] = useState(null)
    const [update, setUpdate] = useState(null)
    const {state} = useLocation()
    const navigate = useNavigate()

    const fetchTopics = async()=> {
        try {
            const data = await getTopicData(`${url}/api/topics`)
            const objs = data.map((topic)=>topic.name)
            setTopics(objs)
        } catch ({message}) {
            setError(message)
            navigate('/error', {state:{message:message}})
        }
    }

    useEffect(()=> {
        fetchTopics()
        const obj = {
            id:state.update.id,
            image:state.update.image,
            topic:state.update.topic,
            title:state.update.title,
            content:state.update.content
        }
        setUpdate(obj)
    }, [state.post])


    return (
        <CreatePost text='Update Post' update={update}/>
    )
}

export default UpdatePost