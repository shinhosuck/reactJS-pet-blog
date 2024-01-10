import React, { useState, useEffect } from 'react'
import { url } from './PostList'
import { fetchComments } from '../utils/api'





function MyComment() {
  const [comments, setComments] = useState(null)
  const authenticate = JSON.parse(localStorage.getItem('auth'))

  useEffect(()=> {
    const getComments = async()=> {
      try {
        const data = await fetchComments(`${url}/api/my-comment/`, authenticate.token)
        if(!data.error) {
          setComments(data)
          console.log(data)

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
    <div>MyComment</div>
  )
}

export default MyComment