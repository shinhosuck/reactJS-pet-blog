import React, { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import NavbarTopics from './NavarTopics'
import SearchForm from './SearchForm'


function DesktopNavLinks(props) {
    const {isAuthenticated,  setShowSearchForm, showSearchForm, logout, topics } = props

    function handleEvent(e) {
        const lgTopicChevron = document.querySelector('.lg-topic-chevron')
        const navbarTopics = [...document.querySelectorAll('.navbar-topics')][1]
        const lgAuthenticatedUser = document.querySelector('.lg-authenticated-user')
        const chevronDown = document.querySelector('.lg-chevron')

        const names = e.target.classList.value.split(' ')
        
        if(names.includes('auth-user')) {
            // pass

        }else if(names.includes('topic-element')) {
            // pass

        }else {
            navbarTopics && navbarTopics.classList.remove('show-navbar-topics')
            lgAuthenticatedUser && lgAuthenticatedUser.classList.remove('show-lg-authenticated-user')

            if(chevronDown) {
                chevronDown.style.transform = 'rotate(0deg)'
            }else if(lgTopicChevron) {
                lgTopicChevron.style.transform = 'rotate(0deg)'
            }
        } 
    }

    useEffect(()=> {
        window.addEventListener('click', handleEvent)
    }, [])
    return (
        <div className='desktop-navlinks' >
            <NavLink
                to='/' className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
            >
                Home
            </NavLink>
            <div
                onClick={()=> {
                    const lgAuthenticatedUser = document.querySelector('.lg-authenticated-user')
                    const chevronDown = document.querySelector('.lg-chevron')
                    const navbarTopics = [...document.querySelectorAll('.navbar-topics')][1]
                    const lgTopicChevron = document.querySelector('.lg-topic-chevron')

                    lgAuthenticatedUser && lgAuthenticatedUser.classList.remove('show-lg-authenticated-user')
                    navbarTopics && navbarTopics.classList.toggle('show-navbar-topics')

                    setShowSearchForm(false)

                    if(chevronDown) {
                        chevronDown.style.transform = 'rotate(0deg)'
                    } 
                
                    if(navbarTopics && navbarTopics.classList.contains('show-navbar-topics')) {
                        lgTopicChevron.style.transform = 'rotate(180deg)'
                    }else {
                        lgTopicChevron.style.transform = 'rotate(0deg)'
                    }
                }}
                id='topics'
                className='navbar-navlink topic-element'
            >
                <button className='navbar-topic-btn topic-element'>
                    <span className='topic-element'>Topics</span>
                    <i className="fa fa-chevron-down lg-topic-chevron topic-element"></i>
                </button>
                <NavbarTopics topics={topics} />
            </div>
            
            <NavLink
                to='/posts' 
                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
            >
                Posts
            </NavLink>
            {isAuthenticated ?
                <>
                    <div 
                        className="lg-authenticated-user-container navbar-navlink auth-user"
                        onClick={()=> {
                            const navbarTopics = [...document.querySelectorAll('.navbar-topics')][1]
                            const lgAuthenticatedUser = document.querySelector('.lg-authenticated-user')
                            const chevronDown = document.querySelector('.lg-chevron')
                            const lgTopicChevron = document.querySelector('.lg-topic-chevron')
                            
                            lgAuthenticatedUser.classList.toggle('show-lg-authenticated-user')
                            navbarTopics && navbarTopics.classList.remove('show-navbar-topics')
                            lgTopicChevron.style.transform = 'rotate(0deg)'

                            setShowSearchForm(false)

                            if(lgAuthenticatedUser.classList.contains('show-lg-authenticated-user')){
                                chevronDown.style.transform = 'rotate(180deg)'

                            }else {
                                chevronDown.style.transform = 'rotate(0deg)'
                            }
                        }}
                    >
                        <img src={isAuthenticated.image_url} alt="" className='auth-user'/>
                        <span className='auth-user'>{isAuthenticated.username}</span>
                        <i className="auth-user fa fa-chevron-down lg-chevron auth-user"></i>
                        <div className="lg-authenticated-user auth-user">
                            <NavLink
                                to={`/user/${isAuthenticated.username}/dashboard/`}
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink 
                                to='/create/post'
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Create Post
                            </NavLink>
                            <button 
                                onClick={()=>logout()} 
                                className='navbar-navlink navbar-button auth-user' 
                                style={{border:'none',background:'none'}}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            :
                <>
                    <NavLink
                        to='/login' 
                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to='/register' 
                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Register
                    </NavLink>
                </>
            }
            <button onClick={()=> {
                setShowSearchForm(!showSearchForm)
                const navbarTopics = [...document.querySelectorAll('.navbar-topics')][1]
                const lgAuthenticatedUser = document.querySelector('.lg-authenticated-user')
                const chevronDown = document.querySelector('.lg-chevron')
                const lgTopicChevron = document.querySelector('.lg-topic-chevron')

                if (chevronDown) {
                    chevronDown.style.transform = 'rotate(0deg)'
                }else if (lgTopicChevron) {
                     lgTopicChevron.style.transform = 'rotate(0deg)'
                }
               
                navbarTopics && navbarTopics.classList.remove('show-navbar-topics')
                
                lgAuthenticatedUser && lgAuthenticatedUser.classList.remove('show-lg-authenticated-user')
            }} 
                className='search-btn'
            >
                Search
            </button>
        </div>

    )
}

export default DesktopNavLinks