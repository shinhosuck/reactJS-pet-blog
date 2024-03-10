import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'



const error = {
    minHeight: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    padding: '5rem 0'
}

const errorContent = {
    border: '1px solid red',
    display: 'grid',
    gap: '1rem'
}



function Error() {

    const {state} = useLocation()
   
    return (
        <div style={error} className="error">
            <ScrollToTop />
            <div style={errorContent} className='error__content'>
                <h2 className='error__header'>There was an error!</h2>
                <h3 className='error__text'>{state.message.error}</h3>
                <Link to='/posts' className='error__back-to-posts'>Back to posts</Link>
            </div>
        </div>
    )
}

export default Error