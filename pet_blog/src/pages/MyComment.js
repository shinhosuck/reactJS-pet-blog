import React, { useState, useEffect } from 'react'
import { url } from './PostList'
import { fetchComments, removeComment, commentUpdate } from '../utils/api'





function MyComment() {
  const [comments, setComments] = useState(null)
  const [update, setUpdate] = useState(null)
  const authenticate = JSON.parse(localStorage.getItem('auth'))


  const deleteComment = async(id)=> {
    try {
      const data = await removeComment(`${url}/api/comment/${id}/delete/`, authenticate.token)
      if(!data.message){
        setComments(data)
        console.log(data)

      }else{
        setComments(null)
      }

    } catch (error) {
      console.log(error.message)
    }

  }

  const updateComment = async(e, id)=> {
    e.preventDefault()
    const body = {content:update.content}
    try {
      const data = await commentUpdate(`${url}/api/comment/${id}/update/`, body, authenticate.token)
      if(!data.error) {
        setComments(data)
        setUpdate(null)

      }else {
        console.log(data.error)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e)=> {
    const {name, value} = e.target
    setUpdate((preve)=>({...preve, [name]:value}))
  }

  useEffect(()=> {
    const getComments = async()=> {
      try {
        const data = await fetchComments(`${url}/api/my-comment/`, authenticate.token)
        if(!data.error) {
          setComments(data)

        }else {
          console.log(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getComments()
  }, [])

  return (
    <React.Fragment>
      <div className="bg-img"></div>
      <div className='my-comments-container'>
        {comments ?
          comments.map((comment)=> {
            return (
                <div key={comment.id} className="my-comments-container__my-comment">
                  <p className='my-comments__date-posted'>{new Date(comment.date_posted).toDateString()}</p>
                  <p className='my-comments__content'>{comment.content}</p>
                  <div className="my-comments-container__buttons">
                    <button onClick={()=>setUpdate({content:comment.content, id:comment.id})} className='my-comments__update-button'>Update</button>
                    <button onClick={()=>deleteComment(comment.id)} className='my-comments__delete-button'>Delete</button>
                  </div>
                  {update && update.id === comment.id &&
                    <div className="update-comment-form-container">
                      <form action="" className="update-comment-form" onSubmit={(e)=>updateComment(e,comment.id)}>
                        <textarea onChange={handleChange} className='update-comment-textarea' value={update.content} name="content" rows="8"></textarea>
                        <div className="update-comment-form-buttons-container">
                          <button type='submit' className='update-comment-submit-btn'>Submit</button>
                          <button onClick={()=>setUpdate(null)} type='button' className='update-comment-cancel-btn'>Cancel</button>
                        </div>
                      </form>
                    </div>
                  }
                </div>
            )
          })
        :
          <h2>Loading...</h2>
        }
        
      </div>
    </React.Fragment>
  )
}

export default MyComment