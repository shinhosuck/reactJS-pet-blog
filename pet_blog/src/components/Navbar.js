import { Link, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import paw from '../images/paw.webp'
import profileImage from '../images/default.png'


export function Navbar() {
    const [showNavLinks, setShowNavLinks] = useState(true)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [navbarWidth, setNabarWidth] = useState('')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    let isAuthenticated = JSON.parse(localStorage.getItem('auth')) || null

    const navigate = useNavigate()

    const windowResizeEvent = function(e) {
        setShowUserMenu(false)
        setShowNavLinks(true)
        setWindowWidth(e.target.innerWidth)

        const navbarWrapper = document.querySelector('.navbar-wrapper ')
        navbarWrapper && setNabarWidth(navbarWrapper.offsetWidth)
        window.removeEventListener('resize', windowResizeEvent)
    }
   
    useEffect(()=> {
        const navbarWrapper = document.querySelector('.navbar-wrapper ')
        navbarWrapper && setNabarWidth(navbarWrapper.offsetWidth)
        window.addEventListener('resize', windowResizeEvent)
    }, [windowWidth])

    const logout = function() {
        setShowUserMenu(false)
        setShowNavLinks(true)
        localStorage.removeItem('auth')
        navigate('/posts', {replace:true, state:{message:'Successfully logged out!'}})
    }

    const hideUserMenu = function() {
        setShowUserMenu(false)
    }

    return (
        <div className="navbar-container">
            <nav className="navbar-wrapper">
                <Link to='/forums' className='navbar-brand-link'>
                    <img className='navbar-brand-logo' src={paw} alt="paw" />
                    <div className="navbar-brand-verticla-line"></div>
                    <div className='navbar-brand-name-container'>
                        <span className='navbar-brand-name-lg-text'>PawPals</span>
                        <span className='navbar-brand-name-sm-text'>BlogForum</span>
                    </div>
                </Link>
                <div className='navbar-navlinks-toggle-btns'>
                    {showNavLinks ?
                        <button onClick={()=>setShowNavLinks(!showNavLinks)} className='navbar-toggle-btn navbar-show-navlink-btn'>
                            <i className="fa fa-bars"></i>
                        </button>
                
                        :
                        <button onClick={()=>setShowNavLinks(!showNavLinks)} className='navbar-toggle-btn navbar-hide-navlink-btn'>
                            <i className="fa fa-times"></i>
                        </button>
                    }
                </div>

                {/* MOBILE NAVLINKS */}
                <div className={!showNavLinks?"navbar-show-navlinks navbar-navlinks":"navbar-navlinks"}>
                    { isAuthenticated &&
                        <div className="navbar-user-account">
                            <div onClick={()=>setShowUserMenu(!showUserMenu)} className="navbar-user-account-image-container">
                                <div className='nav-bar-user-image'>
                                    <img className='navbar-user-profile-image' src={profileImage} alt="" />
                                    <span className='navbar-user-useranme'>{isAuthenticated.username}</span>
                                </div>
                                <div className="navbar-user-account-menu-toggle-btns">
                                    {!showUserMenu ? 
                                        <button onClick={()=>setShowUserMenu(true)} className='navbar-user-menu-tobble-btn'>
                                            <i className="fa fa-chevron-down"></i>
                                        </button>
                                    : 
                                        <button onClick={()=>setShowUserMenu(false)} className='navbar-user-menu-tobble-btn'>
                                            <i className="fa fa-chevron-up"></i>
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className={showUserMenu?'navbar-user-account-menu show-navbar-user-account-menu':'navbar-user-account-menu'}>
                                <NavLink
                                    to='/my-posts'
                                    onClick={()=>setShowNavLinks(true)} 
                                    className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                                >
                                    My Posts
                                </NavLink>
                                <NavLink 
                                    to='/my-comments'
                                    className={({isActive})=>isActive ? 'navbar-active-navlink navbar-navlink' : 'navbar-navlink'}
                                    onClick={()=>setShowNavLinks(true)}
                                >
                                    Comments
                                </NavLink>
                                <NavLink 
                                    onClick={()=>setShowNavLinks(true)}
                                    to='/create/post'
                                    className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                                >
                                    Create Post
                                </NavLink>
                                <button onClick={logout} className='navbar-navlink' style={{border:'none',background:'none'}}>
                                    Logout
                                </button>
                            </div>
                        
                        </div>
                    }
                    <NavLink 
                        onClick={()=>setShowNavLinks(true)} 
                        to='/forums' className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Forums
                    </NavLink>
                    <NavLink 
                        onClick={()=>setShowNavLinks(true)}
                        to='/posts' 
                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Posts
                    </NavLink>

                    {!isAuthenticated &&
                        <>
                            <NavLink 
                                onClick={()=>setShowNavLinks(true)}
                                to='/login' 
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Login
                            </NavLink>
                            <NavLink 
                                onClick={()=>setShowNavLinks(true)}
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
                        onClick={hideUserMenu}
                        to='/forums' className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Forums
                    </NavLink>
                    <NavLink 
                       onClick={hideUserMenu}
                        to='/posts' 
                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Posts
                    </NavLink>
                    {!isAuthenticated &&
                        <>
                            <NavLink 
                                onClick={hideUserMenu}
                                to='/login' 
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Login
                            </NavLink>
                            <NavLink 
                                onClick={hideUserMenu}
                                to='/register' 
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Register
                            </NavLink>
                        </>
                    }
                    {isAuthenticated &&
                        <div className="lg-navbar-user-account">
                            <div onClick={()=>setShowUserMenu(!showUserMenu)} className="navbar-user-account-image-container">
                                <div className='nav-bar-user-image'>
                                    <img className='navbar-user-profile-image' src={profileImage} alt="" />
                                    <span className='navbar-user-useranme'>{isAuthenticated.username}</span>
                                </div>
                                
                                <div className="navbar-user-account-menu-toggle-btns">
                                    {!showUserMenu ? 
                                        <button onClick={()=>setShowUserMenu(true)} className='navbar-user-menu-tobble-btn'>
                                            <i className="fa fa-chevron-down"></i>
                                        </button>
                                    : 
                                        <button onClick={()=>setShowUserMenu(false)} className='navbar-user-menu-tobble-btn'>
                                            <i className="fa fa-chevron-up"></i>
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className={showUserMenu?'navbar-user-account-menu show-navbar-user-account-menu':'navbar-user-account-menu'}>
                                <NavLink 
                                    onClick={hideUserMenu}
                                    style={{right:`calc((100vw - ${navbarWidth}) / 2)`}}
                                    to='/my-posts'
                                    className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                                >
                                    My Posts
                                </NavLink>
                                <NavLink 
                                    to='/my-comments'
                                    className={({isActive})=>isActive ? 'navbar-active-navlink navbar-navlink' : 'navbar-navlink'}
                                    onClick={hideUserMenu}
                                >
                                    Comments
                                </NavLink>
                                <NavLink 
                                    onClick={hideUserMenu}
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
                            </div>
                        </div>
                     }

                </div>
                {/* END */}
            </nav>
        </div>
    )
}