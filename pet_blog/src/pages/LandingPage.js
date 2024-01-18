import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import paw from '../images/paw.webp'




function LandingPage() {
    const [showNavLinks, setShowNavLinks] = useState(true)
    const auth = localStorage.getItem('auth') || null
    const navigate = useNavigate()

    useEffect(()=>{
        if(auth) {
            navigate('forum', {replace:true})
        }
    }, [auth])

    return (
        <header className='landing-page-header'>
            <div className="landing-page-navbar-container">
                <nav className="landing-page-navbar-wrapper">
                    <Link to='/forums' className='landing-page-navbar-brand-link'>
                        <img className='landing-page-navbar-brand-logo' src={paw} alt="paw" />
                        <div className="landing-page-navbar-brand-verticla-line"></div>
                        <div className='landing-page-navbar-brand-name-container'>
                            <span className='landing-page-navbar-brand-name-lg-text'>PawPals</span>
                            <span className='landing-page-navbar-brand-name-sm-text'>BlogForum</span>
                        </div>
                    </Link>
                    <div className="landing-page-navlinks-toggle-btns">
                        {showNavLinks ?
                            <button onClick={()=>setShowNavLinks(!showNavLinks)} className='landing-page-toggle-btn landing-page-show-navlink-btn'>
                                <i className="fa fa-bars"></i>
                            </button>
                    
                         :
                            <button onClick={()=>setShowNavLinks(!showNavLinks)} className='landing-page-toggle-btn landing-page-hide-navlink-btn'>
                                <i className="fa fa-times"></i>
                            </button>
                        }
                    </div>
                    <div className={!showNavLinks?"show-landing-page-nav-links landing-page-navlinks":"landing-page-navlinks"}>
                        <Link to='/forums' className='landing-page-navlink'>Forums</Link>
                        <Link to='/login' className='landing-page-navlink'>Login</Link>
                        <Link to='/register' className='landing-page-navlink'>Register</Link>
                    </div>
                </nav>
                <div className="landing-page-hero-text-container">
                    <div className="landing-page-hero-text-wrapper">
                        <h1 className='landing-page-hero-header'>Love Me, Love My Dog</h1>
                        <p className='landing-page-hero-paragraph'>
                            Please join to share your expertise, issues, concerns, and thoughts. 
                        </p>
                        <Link to='/register' className='landing-page-join-btn'>Register</Link>
                        <p className='landing-page-already-registered'>Already registered? <Link to='/login'>Login</Link></p>
                    </div>
                    
                </div>
            </div>
        </header>
    )
}

export default LandingPage