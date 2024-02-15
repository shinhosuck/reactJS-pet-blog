import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { url } from '../pages/PostList'
import { getPostData} from '../utils/api'
import ScrollToTop from './ScrollToTop'





function TopPosts(props) {
    const { comments } = props
    const [posts, setPosts] = useState(null)

    
    useEffect(()=> {
        const getPosts = async()=> {
            const data = await getPostData(`${url}/api/posts/`)
            const filtered = data.slice(0, 4).filter((post)=> {
                if(post.num_of_replies >= 4) {
                    const date = new Date(post.date_posted).toDateString()
                    post.date_posted = date
                    return post
                }
            })
            setPosts(filtered)
        }
        getPosts()
    }, [comments])

    return (
        <>
            <ScrollToTop />
            <div className='top-posts'>
                <h2 className='top-posts__header'>Top Posts</h2>
                {posts && posts.map((post)=> {
                    return (
                        <div key={post.id} className="top-posts__post">
                            <div className="top-posts__img-wrapper">
                                <img className='top-posts__img' src={post.image_url} alt="" />
                            </div>
                            <div className="top-posts__text-wrapper">
                                <h4 className='top-posts__post-title'>{post.title}</h4>
                                <p className='top-posts__post-content'>
                                    {post.content.substring(0, 50)}...
                                    <Link className='top-posts__read-more' to={`/post/${post.id}/detail/`}>Read more</Link>
                                </p>
                            </div>
                            <div className="top-posts__btns-wrapper">
                                <button className='top-posts__num-of-like-btn'>
                                    <i className='fa-solid fa-hands-clapping'></i>
                                    <span>{post.like.length}</span>
                                    <span>{post.like.length > 1 ? 'likes' : 'like'}</span>
                                </button>
                                <button className='top-posts__num-of-comments-btn'>
                                    <i className="fa fa-message"></i>
                                    <span>{post.num_of_replies}</span>
                                    <span>{post.num_of_replies > 1 ? 'comments' : 'comment'}</span>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default TopPosts