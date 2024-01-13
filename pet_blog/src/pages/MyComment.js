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
      console.log(data)

    } catch (error) {
      console.log(error.message)
    }

  }

  const updateComment = async(id)=> {
    try {
      const data = await commentUpdate(`${url}/api/comment/${id}/update/`, update, authenticate.token)
      console.log(data)

    } catch (error) {
      console.log(error.message)
    }
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
    <div className='my-comments-container'>
      {comments ?
        comments.map((comment)=> {
          return (
            <div key={comment.id} className="my-comments-container__my-comment">
              <p className='my-comments__date-posted'>{new Date(comment.date_posted).toDateString()}</p>
              <p className='my-comments__content'>{comment.content}</p>
              <div className="my-comments-container__buttons">
                <button onClick={()=>updateComment(comment.id)} className='my-comments__update-button'>Update</button>
                <button onClick={()=>deleteComment(comment.id)} className='my-comments__delete-button'>Delete</button>
              </div>
            </div>
          )
        })
       :
        <h2>Loading...</h2>
       }
      
    </div>
  )
}

export default MyComment