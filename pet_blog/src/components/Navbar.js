import { Link, NavLink, useNavigate } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import paw from '../images/paw.webp'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import NavbarTopics from './NavarTopics'
import { url } from '../utils/urls'
import { getTopicData } from '../utils/api'

export function Navbar() {
    const { isAuthenticated, setIsAuthenticated } = useContext(ContentLayoutContext)
    const [topics, setTopics] = useState(null)
    const [showNavLinks, setShowNavLinks] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const navigate = useNavigate()

    const handleMobileTopics = ()=> {
        const mobileTopics = document.querySelector('#mobile-topics > .navbar-topics')
        const mobileTopicsChevronDown = document.querySelector('.mobile-topics-chevron-down')

        mobileTopics.classList.contains('show-navbar-topics') ?
        mobileTopics.classList.remove('show-navbar-topics') :
        mobileTopics.classList.add('show-navbar-topics')

        if(mobileTopics.classList.contains('show-navbar-topics')){
            mobileTopicsChevronDown.style.transform = 'rotate(180deg)'
        }else{
            mobileTopicsChevronDown.style.transform = 'rotate(0deg)'
        }
    }

    const handleAuthenticatedUserNavLinks = ()=> {
        const chevronDown = document.querySelector('.mobile-navlinks-authenticated-user-chevron')
        const linksContainer = document.querySelector('.mobile-authenticated-user-links')
        
        linksContainer.classList.contains('show-mobile-authenticated-user-links') ?
        linksContainer.classList.remove('show-mobile-authenticated-user-links'):
        linksContainer.classList.add('show-mobile-authenticated-user-links')

        if(linksContainer.classList.contains('show-mobile-authenticated-user-links')){
            chevronDown.style.transform = 'rotate(180deg)'
        }else{
            chevronDown.style.transform = 'rotate(0deg)'
        }
    }

    const windowResizeEvent = function(e) {
        setShowNavLinks(false)
        setWindowWidth(e.target.innerWidth)
        const bgOverlay = document.querySelector('.bg-overlay')

        if(bgOverlay) {
            if(!bgOverlay.classList.contains('hide-bg-overlay')) {
                bgOverlay.classList.add('hide-bg-overlay')
                document.body.style.overflow = 'auto'
            }
        }
        return window.removeEventListener('resize', windowResizeEvent)
    }

    const logout = function() {
        const bgOverlay = document.querySelector('.bg-overlay')
        bgOverlay.classList.add('hide-bg-overlay')
        setShowNavLinks(false)
        navigate('/logout')
    }
   
    useEffect(()=> {
        window.addEventListener('resize', windowResizeEvent)
    }, [windowWidth])

    useEffect(()=> {
        const getTopics = async()=> {
            const data = await getTopicData(`${url}/api/topics/`)
            setTopics(data)
          }
          getTopics()
    }, [])

    return (
        <div id='navbar-container' className="navbar-container">
            <nav className="navbar-wrapper">
                <Link to='/' className='navbar-brand-link'>
                    <img className='navbar-brand-logo' src={paw} alt="paw" />
                    <h2 className='navbar-brand-name'>Canine Blog</h2>
                </Link>
                <button
                    onClick={()=> {
                        setShowNavLinks(true)
                        document.querySelector('.bg-overlay').classList.remove('hide-bg-overlay')
                        document.body.style.overflow = 'hidden'
                        window.scrollTo({top:0})
                    }} 
                    className='navbar-show-navlink-btn'
                >
                    <i className="fa fa-bars"></i>
                </button>

                {/* MOBILE NAVLINKS */}
                <div className={showNavLinks?"navbar-show-navlinks navbar-navlinks":"navbar-navlinks"}>
                    <button
                        onClick={()=> {
                            setShowNavLinks(false)
                            document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                            document.body.style.overflow = 'auto'
                        }} 
                        className='navbar-hide-navlink-btn'
                    >
                        <i className="fa fa-times"></i>
                    </button>
                    {/* Authenticated user container */}
                        {isAuthenticated &&
                            <div className="mobile-navlinks-authenticated-user-container">
                                <button onClick={handleAuthenticatedUserNavLinks} className="mobile-navlinks-authenticated-user">
                                    <img src={isAuthenticated.image_url} alt="" />
                                    <span>{isAuthenticated.username}</span>
                                    <i className="fa fa-chevron-down mobile-navlinks-authenticated-user-chevron"></i>
                                </button>
                                <div className='mobile-authenticated-user-links'>
                                    <NavLink
                                        to='/my-posts'
                                        onClick={()=> {
                                            setShowNavLinks(false)
                                            document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                            document.body.style.overflow = 'auto'
                                        }} 
                                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                                    >
                                        My Posts
                                    </NavLink>
                                    <NavLink 
                                        to='/my-comments'
                                        className={({isActive})=>isActive ? 'navbar-active-navlink navbar-navlink' : 'navbar-navlink'}
                                        onClick={()=> {
                                            setShowNavLinks(false)
                                            document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                            document.body.style.overflow = 'auto'
                                        }}
                                    >
                                        My Comments
                                    </NavLink>
                                    <NavLink 
                                        onClick={()=> {
                                            setShowNavLinks(false)
                                            document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                            document.body.style.overflow = 'auto'
                                        }}
                                        to='/create/post'
                                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                                    >
                                        Create Post
                                    </NavLink>
                                </div>
                            </div>
                        }
                    {/* END */}
                    <NavLink 
                        onClick={()=> {
                            setShowNavLinks(false)
                            document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                            document.body.style.overflow = 'auto'
                        }} 
                        to='/' className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Home
                    </NavLink>
                    <div 
                        id='mobile-topics'
                        className='navbar-navlink'
                        onClick={handleMobileTopics} 
                    >
                        <div className='navbar-topic'>
                            <span>Topics</span>
                            <i className="fa fa-chevron-down mobile-topics-chevron-down"></i>
                        </div>
                        {<NavbarTopics topics={topics} setShowNavLinks={setShowNavLinks} />}

                    </div>
                    <NavLink 
                        onClick={()=> {
                            setShowNavLinks(false)
                            document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                            document.body.style.overflow = 'auto'
                        }}
                        to='/posts' 
                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Posts
                    </NavLink>
                    {isAuthenticated ?
                        <div className='navbar-navlink-logout-btn-container'>
                            <button onClick={logout} className='navbar-navlink-logout-btn'>
                                Logout
                            </button>
                        </div>
                    :
                        <>
                            <NavLink 
                                onClick={()=> {
                                    setShowNavLinks(false)
                                    document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                    document.body.style.overflow = 'auto'
                                }}
                                to='/login' 
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Login
                            </NavLink>
                            <NavLink 
                                onClick={()=> {
                                    setShowNavLinks(false)
                                    document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                    document.body.style.overflow = 'auto'
                                }}
                                to='/register' 
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Register
                            </NavLink>
                        </>   
                    }
                </div>
                {/* END */}

                {/* LARGE NAVLINKS */}
                <div className='lg-navbar-navlinks' >
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
                            navbarTopics.classList.toggle('show-navbar-topics')

                            if(chevronDown) {
                                chevronDown.style.transform = 'rotate(0deg)'
                            }
                            
                            if(navbarTopics.classList.contains('show-navbar-topics')) {
                                lgTopicChevron.style.transform = 'rotate(180deg)'
                            }else {
                                lgTopicChevron.style.transform = 'rotate(0deg)'
                            }
                        }}
                        id='topics'
                        className='navbar-navlink'
                    >
                        <div className='navbar-topic'>
                            <span>Topics</span>
                            <i className="fa fa-chevron-down lg-topic-chevron"></i>
                        </div>
                        {<NavbarTopics topics={topics} />}
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
                                onClick={()=> {
                                    const navbarTopics = [...document.querySelectorAll('.navbar-topics')][1]
                                    const lgAuthenticatedUser = document.querySelector('.lg-authenticated-user')
                                    const chevronDown = document.querySelector('.lg-chevron')
                                    const lgTopicChevron = document.querySelector('.lg-topic-chevron')
                                    
                                    lgAuthenticatedUser.classList.toggle('show-lg-authenticated-user')
                                    navbarTopics.classList.remove('show-navbar-topics')
                                    lgTopicChevron.style.transform = 'rotate(0deg)'

                                    if(lgAuthenticatedUser.classList.contains('show-lg-authenticated-user')){
                                        chevronDown.style.transform = 'rotate(180deg)'

                                    }else {
                                        chevronDown.style.transform = 'rotate(0deg)'
                                    }
                                }}
                                className="lg-authenticated-user-container navbar-navlink"
                            >
                                <img src={isAuthenticated.image_url} alt="" />
                                <span>{isAuthenticated.username}</span>
                                <i className="fa fa-chevron-down lg-chevron"></i>
                                <div className="lg-authenticated-user">
                                    <NavLink 
                                        to='/my-posts'
                                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                                    >
                                        My Posts
                                    </NavLink>
                                    <NavLink 
                                        to='/my-comments'
                                        className={({isActive})=>isActive ? 'navbar-active-navlink navbar-navlink' : 'navbar-navlink'}
                                    >
                                        My Comments
                                    </NavLink>
                                    <NavLink 
                                        to='/create/post'
                                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                                    >
                                        Create Post
                                    </NavLink>
                                </div>
                            </div>
                            <button 
                                onClick={()=>logout()} 
                                className='navbar-navlink navbar-button' 
                                style={{border:'none',background:'none'}}
                            >
                                Logout
                            </button>
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

                </div>
                {/* END */}
            </nav>
        </div>
    )
}

