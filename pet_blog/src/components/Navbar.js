import { Link, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import paw from '../images/paw.webp'
import profileImage from '../images/default.png'


export function Navbar() {
    const [showNavLinks, setShowNavLinks] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    let isAuthenticated = JSON.parse(localStorage.getItem('auth')) || null

    const navigate = useNavigate()


    const windowResizeEvent = function(e) {
        setShowNavLinks(false)
        setWindowWidth(e.target.innerWidth)
        const bgOverlay = document.querySelector('.bg-overlay')

        if(bgOverlay) {
            if(!bgOverlay.classList.contains('hide-bg-overlay')) {
                bgOverlay.classList.add('hide-bg-overlay')
                // document.body.style.overflow = 'scroll'
            }
        }
        window.removeEventListener('resize', windowResizeEvent)
    }
   
    useEffect(()=> {
        window.addEventListener('resize', windowResizeEvent)
    }, [windowWidth])

    const logout = function() {
        setShowNavLinks(true)
        localStorage.removeItem('auth')
        navigate('/posts', {replace:true, state:{message:'Successfully logged out!'}})
    }

    return (
        <div className="navbar-container">
            <nav className="navbar-wrapper">
                <Link to='/posts' className='navbar-brand-link'>
                    <img className='navbar-brand-logo' src={paw} alt="paw" />
                    <div className="navbar-brand-verticla-line"></div>
                    <div className='navbar-brand-name-container'>
                        <span className='navbar-brand-name-lg-text'>PawPals</span>
                        <span className='navbar-brand-name-sm-text'>BlogForum</span>
                    </div>
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
                            document.body.style.overflow = 'scroll'
                        }} 
                        className='navbar-hide-navlink-btn'
                    >
                        <i className="fa fa-times"></i>
                    </button>
                    <NavLink 
                        onClick={()=> {
                            setShowNavLinks(false)
                            document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                            document.body.style.overflow = 'scroll'
                        }} 
                        to='/topics' className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Topics
                    </NavLink>
                    <NavLink 
                        onClick={()=> {
                            setShowNavLinks(false)
                            document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                            document.body.style.overflow = 'scroll'
                        }}
                        to='/posts' 
                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Posts
                    </NavLink>
                    {isAuthenticated ?
                        <>
                            <NavLink
                                to='/my-posts'
                                onClick={()=> {
                                    setShowNavLinks(false)
                                    document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                    document.body.style.overflow = 'scroll'
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
                                    document.body.style.overflow = 'scroll'
                                }}
                            >
                                My Comments
                            </NavLink>
                            <NavLink 
                                onClick={()=> {
                                    setShowNavLinks(false)
                                    document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                    document.body.style.overflow = 'scroll'
                                }}
                                to='/create/post'
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Create Post
                            </NavLink>
                            <div className='navbar-navlink-logout-btn-container'>
                                <button onClick={logout} className='navbar-navlink-logout-btn'>
                                    Logout
                                </button>
                            </div>
                        </>
                        
                    :
                        <>
                            <NavLink 
                                onClick={()=> {
                                    setShowNavLinks(false)
                                    document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                    document.body.style.overflow = 'scroll'
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
                                    document.body.style.overflow = 'scroll'
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
                        to='/topics' className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Topics
                    </NavLink>
                    <NavLink
                        to='/posts' 
                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Posts
                    </NavLink>
                    {isAuthenticated ?
                        <>
                            {/* <div className="navbar-user-account-image-container">
                                <div className='nav-bar-user-image'>
                                    <img className='navbar-user-profile-image' src={profileImage} alt="" />
                                    <span className='navbar-user-useranme'>{isAuthenticated.username}</span>
                                </div>
                            </div> */}
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