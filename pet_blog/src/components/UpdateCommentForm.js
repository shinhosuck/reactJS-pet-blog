import React from 'react'
import { editComment } from '../utils/api'
import { url } from '../pages/PostList'






function UpdateCommentForm(props) {
    const [comment, setComment] = React.useState(props.comment)
    const {setShowCommentEditForm, setComments, authenticated} = props


    const handleSubmit = async(e)=> {
        e.preventDefault()

        setComments((prev)=> {
            const items = prev.map((i)=> i.id === comment.id ? comment : i)
            return items
        })
        e.target.reset()
        setShowCommentEditForm(false)

        const obj = {content:comment.content}
        try {
            const data = await editComment(`${url}/api/comment/${comment.id}/update/`, obj, authenticated.token)
            
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const handleChange = (e)=> {
        const {name, value} = e.target
        setComment((prev)=> ({...prev, [name]:value}))
        
    }

    return (
        <form className='update-comment-form' onSubmit={handleSubmit}>
            <textarea onChange={handleChange} name="content" value={comment.content} rows="6"></textarea>
            <div className="update-comment-form-btns">
                <button className='update-comment-update-btn' type='submit'>Update</button>
                <button className='update-comment-cancel-btn' onClick={()=>setShowCommentEditForm(false)} type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default UpdateCommentForm