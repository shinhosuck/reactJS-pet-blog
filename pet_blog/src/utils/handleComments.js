import { createComment, createChildComment } from './api'
import { url } from "./urls";



export const postComment = async(id, body, token)=> {
    const data = await createComment(
        `${url}/api/post/${id}/create/comment/`,
        body,
        token
    )
    return data
}

export const childComment = async(id, body, token)=> {
    const data = await createChildComment(
        `${url}/api/comments/${id}/comment/`,
        body,
        token
    )
    return data
}