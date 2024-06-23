import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchSearchItems } from '../utils/api'
import { url } from '../utils/urls'


function SearchForm(props) {
    const searchRef = useRef()
    const navigate = useNavigate()
    const {setShowSearchForm} = props


    const handleSubmit = async(e)=> {
        e.preventDefault()
        const search = searchRef.current.value
        const searchURL = `${url}/api/search?q=${search}`
        const posts = await fetchSearchItems(searchURL)
        setShowSearchForm(false)
        e.target.reset()
        navigate(
            'posts/search/results/', 
            {state:posts && posts.error ? {error:posts.error} : {posts:posts}}
        )
    }

    return (
        <div className='search-form-container'>
            <form className='search-form' onSubmit={handleSubmit}>
                <input className='search-input' required ref={searchRef} type="text" placeholder='Search by title or topic'/>
                <input className='search-submit-btn' type="submit" value='Search'/>
            </form>
        </div>
    )
}

export default SearchForm