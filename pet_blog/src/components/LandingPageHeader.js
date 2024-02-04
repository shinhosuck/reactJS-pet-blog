import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import paw from '../images/paw.webp'






function LandingPageHeader() {
    const [showNavLinks, setShowNavLinks] = useState(false)


    useEffect(()=>{
        if(showNavLinks) {
            window.scrollTo({top:0})
            document.body.style.overflowY = 'hidden'

        }else if(!showNavLinks) {
            document.body.style.overflowY = 'scroll'
        }
    }, [showNavLinks, !showNavLinks])

    return (
        <React.Fragment>
            <div className="landing-page-navbar-container">
                <nav className="landing-page-navbar-wrapper">
                    <Link to='/posts' className='landing-page-navbar-brand-link'>
                        <img className='landing-page-navbar-brand-logo' src={paw} alt="paw" />
                        <div className="landing-page-navbar-brand-verticla-line"></div>
                        <div className='landing-page-navbar-brand-name-container'>
                            <span className='landing-page-navbar-brand-name-lg-text'>PawPals</span>
                            <span className='landing-page-navbar-brand-name-sm-text'>BlogForum</span>
                        </div>
                    </Link>
                    <div className="landing-page-navlinks-toggle-btns">
                        <button onClick={()=>setShowNavLinks(true)} className='landing-page-toggle-btn landing-page-show-navlink-btn'>
                            <i className="fa fa-bars"></i>
                        </button>
                    </div>
                    <div className={showNavLinks?"show-landing-page-nav-links landing-page-navlinks":"landing-page-navlinks"}>
                        <button onClick={()=>setShowNavLinks(false)} className='landing-page-toggle-btn landing-page-hide-navlink-btn'>
                            <i className="fa fa-times"></i>
                        </button>
                        <Link
                            to='/topics' 
                            className='landing-page-navlink'
                            onClick={()=> {
                                document.body.style.overflowY = 'scroll'
                                setShowNavLinks(false)
                            }}
                        >
                            Topics
                        </Link>
                        <Link
                            to='/posts' 
                            className='landing-page-navlink'
                            onClick={()=> {
                                document.body.style.overflowY = 'scroll'
                                setShowNavLinks(false)
                            }}
                        >
                            Posts
                        </Link>
                        <Link
                            to='/login' 
                            className='landing-page-navlink landing-page-login-btn'
                            onClick={()=> {
                                document.body.style.overflowY = 'scroll'
                                setShowNavLinks(false)
                            }}
                        >
                            Login
                        </Link>
                    </div>
                </nav>
            </div>
            <div className='mobile-landing-page-hero-wrapper'>
                <div className="mobile-landing-page-hero-text-wrapper">
                    <h1 className='mobile-landing-page-hero-header'>We are Canine Blog Site</h1>
                    <p className='mobile-landing-page-hero-paragraph'>
                        Request suggestions and share your experience and expertise on various canines's health issues.
                    </p>
                    <Link to='/register' className='mobile-landing-page-join-btn'>Join now</Link>
                </div>
            </div>
            <div className='lg-landing-page-hero-wrapper'>
                <div className="landing-page-hero-container">
                    <div className="landing-page-hero-text-wrapper">
                        <h1 className='landing-page-hero-header'>We are Canine Blog Site</h1>
                        <p className='landing-page-hero-paragraph'>
                            Request suggestions and share your experience and expertise on various canines's health issues.
                        </p>
                        <Link to='/register' className='landing-page-join-btn'>Join now</Link>
                    </div>
                </div>
            </div>
            <div className={showNavLinks ? 'bg-overlay' : 'hide-bg-overlay'}></div>
        </React.Fragment>
    )
}

export default LandingPageHeader