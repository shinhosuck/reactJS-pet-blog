import React from 'react'
import { useNavigate } from 'react-router-dom'
import { editComment } from '../utils/api'
import { url } from '../utils/urls'



function UpdateCommentForm(props) {
    const [comment, setComment] = React.useState(props.comment)
    const {setShowCommentEditForm, setComments, authenticated} = props
    const navigate = useNavigate()

    const handleSubmit = async(e)=> {
        e.preventDefault()

        setComments((prev)=> {
            const items = prev.map((i)=> i.id === comment.id ? comment : i)
            return items
        })
        e.target.reset()
        setShowCommentEditForm(false)

        try {
            const data = await editComment(`${url}/api/comment/${comment.id}/update/`, comment, authenticated.token)
            if(data.error){
                console.log(data.error)
                navigate('/error', {replace:false, state:{message:{error:`${data.error}`}}})

            }else {
                console.log(data)
            }
            
        } catch (error) {
            console.log(error.message)
            navigate('/error', {replace:false, state:{message:{error:`${error.message}`}}})
        }
    }
    
    const handleChange = (e)=> {
        const {name, value} = e.target
        setComment((prev)=> ({...prev, [name]:value}))
        
    }

    return (
        <form className='post-detail-update-comment-form' onSubmit={handleSubmit}>
            <textarea className='post-detail-update-comment-textarea' onChange={handleChange} name="content" value={comment.content} rows="6"></textarea>
            <div className="post-detail-update-comment-form-btns">
                <button className='post-detail-update-comment-update-btn' type='submit'>Submit</button>
                <button className='post-detail-update-comment-cancel-btn' onClick={()=>setShowCommentEditForm(false)} type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default UpdateCommentForm