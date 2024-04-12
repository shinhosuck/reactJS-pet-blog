import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import paw from '../images/paw.webp'






function LandingPageHeader() {
    const [showNavLinks, setShowNavLinks] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const authenticated = window.localStorage.getItem('auth')
    const navigate = useNavigate()


    const logout = function() {
        setShowNavLinks(false)
        localStorage.removeItem('auth')
        navigate('/login', {replace:true, state:{message:'Successfully logged out!'}})
    }

    
    const getWindowWidth = ()=> {
        setWidth(window.innerWidth)
        setShowNavLinks(false)
        window.removeEventListener('resize', getWindowWidth)
    }

    useEffect(()=> {
        window.addEventListener('resize', getWindowWidth)
    }, [width])

    useEffect(()=>{
        if(showNavLinks) {
            window.scrollTo({top:0})
            document.body.style.overflowY = 'hidden'

        }else if(!showNavLinks) {
            document.body.style.overflowY = 'auto'
        }
    }, [showNavLinks, !showNavLinks])

    return (
        <React.Fragment>
            <div className="landing-page-navbar-container">
                <nav className="landing-page-navbar-wrapper">
                    <Link to='/posts' className='landing-page-navbar-brand-link'>
                        <img className='landing-page-navbar-brand-logo' src={paw} alt="paw" />
                        <h2 className='landing-page-navbar-brand-name'>PawPals</h2>
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
                            to='/posts' 
                            className='landing-page-navlink'
                            onClick={()=> {
                                document.body.style.overflowY = 'auto'
                                setShowNavLinks(false)
                            }}
                        >
                            Posts
                        </Link>
                        {!authenticated ?
                            <Link
                                to='/login' 
                                className='landing-page-navlink landing-page-login-btn'
                                onClick={()=> {
                                    document.body.style.overflowY = 'auto'
                                    setShowNavLinks(false)
                                }}
                            >
                                Login
                            </Link>
                        :
                            <button 
                                onClick={()=>logout()} 
                                className='landing-page-navlink navbar-button' 
                                style={{border:'none',background:'none'}}
                            >
                                Logout
                            </button>
                         }
                    </div>
                </nav>
            </div>
            <div className={showNavLinks ? 'bg-overlay' : 'hide-bg-overlay'}></div>
        </React.Fragment>
    )
}

export default LandingPageHeader