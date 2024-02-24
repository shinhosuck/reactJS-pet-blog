import { Link, NavLink, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import paw from '../images/paw.webp'




export function Navbar(props) {
    const [topics, setTopics] = useState(props.topics)
    const [showNavLinks, setShowNavLinks] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    let isAuthenticated = JSON.parse(localStorage.getItem('auth')) || null
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
        window.removeEventListener('resize', windowResizeEvent)
    }

    const logout = function() {
        setShowNavLinks(true)
        localStorage.removeItem('auth')
        navigate(
            '/login', 
            {
                replace:true, 
                // state:{message:'Successfully logged out!'}
            }
        )
    }
   
    useEffect(()=> {
        window.addEventListener('resize', windowResizeEvent)
    }, [windowWidth])

    useEffect(()=> {
        setTopics(props.topics)
    }, [props])

    return (
        <div className="navbar-container">
            <nav className="navbar-wrapper">
                <Link to='/posts' className='navbar-brand-link'>
                    <img className='navbar-brand-logo' src={paw} alt="paw" />
                    <h2 className='navbar-brand-name'>PawPals</h2>
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
                                    <img src={isAuthenticated.profile_image_url} alt="" />
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
                    {/*  */}
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
                        <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                            <span>Topics</span>
                            <i style={{fontSize:'0.9rem', marginTop:'0.25rem'}} className="fa fa-chevron-down mobile-topics-chevron-down"></i>
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
                    <div id='topics'className='navbar-navlink'>
                        <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                            <span>Topics</span>
                            <i style={{fontSize:'0.9rem', marginTop:'0.25rem'}} className="fa fa-chevron-down"></i>
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

                            <div className="lg-authenticated-user-container navbar-navlink">
                                <img src={isAuthenticated.profile_image_url} alt="" />
                                <span>{isAuthenticated.username}</span>
                                <i className="fa fa-chevron-down"></i>
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




function NavbarTopics(props) {
    const { topics, setShowNavLinks } = props

    return (
        <>
            <div className='navbar-topics'>
                {topics && topics.map((topic)=> {
                    return (
                        <NavLink 
                            onClick={()=> {
                                setShowNavLinks && setShowNavLinks(false)
                                document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                document.body.style.overflow = 'auto'
                            }}
                            className={({isActive})=>isActive?'active-navbar-topic-link navbar-topic-link':'navbar-topic-link'}
                            to={`/topic/${topic.name}/posts/?filter=${topic.name}`} state={{topic:topic.name}} key={topic.id}
                        >
                            {topic.name}
                        </NavLink>
                    )
                })}
            </div>
        </>
    )
}