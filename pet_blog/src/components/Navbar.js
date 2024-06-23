import { Link, NavLink, useNavigate } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import paw from '../images/paw.webp'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import NavbarTopics from './NavarTopics'
import { url } from '../utils/urls'
import { getTopicData } from '../utils/api'
import SearchForm from './SearchForm'
import MobileNavLinks from './MobileNavLinks'
import DesktopNavLinks from './DesktopNavLinks'


export function Navbar() {
    const [ showMenuBtn, setShowMenuBtn] = useState(true)
    const [ showCloseBtn, setShowCloseBtn] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useContext(ContentLayoutContext)
    const [ showSearchForm, setShowSearchForm ] = useState(false)
    const [showTopics, setShowTopics] = useState(false)
    const [topics, setTopics] = useState(null)
    const [showNavLinks, setShowNavLinks] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const navigate = useNavigate()


    const handleMobileTopics = ()=> {
        const mobileTopics = document.querySelector('.mobile-topics-container > .navbar-topics')
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

    const handleMobileAuthenticatedUserNavLinks = ()=> {
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
        setShowCloseBtn(false)
        setShowMenuBtn(true)
        setWindowWidth(e.target.innerWidth)
        return window.removeEventListener('resize', windowResizeEvent)
    }

    const logout = function() {
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
            {showSearchForm && <SearchForm setShowSearchForm={setShowSearchForm}/>}
            <nav className="navbar-wrapper">
                <div className='navbar-top-row'>
                    <Link to='/' className='navbar-brand-link'>
                        <img className='navbar-brand-logo' src={paw} alt="paw" />
                        <h2 className='navbar-brand-name'>
                            <span>Canine</span>
                            <span>Blog</span>
                        </h2>
                    </Link>
                    <button onClick={()=> {
                        setShowSearchForm(!showSearchForm)
                        setShowNavLinks(false)
                        setShowCloseBtn(false)
                        setShowMenuBtn(true)
                    }}
                        className='mobile-search-btn'
                    >
                        Search
                    </button>
                    {showMenuBtn && 
                        <button
                            onClick={()=> {
                                setShowNavLinks(true)
                                setShowSearchForm(false)
                                setShowCloseBtn(true)
                                setShowMenuBtn(false)
                                window.scrollTo({top:0})
                            }} 
                            className='mobile-show-navlink-btn'
                        >
                            <i className="fa fa-bars"></i>
                        </button>
                    }
                    {showCloseBtn && 
                        <button
                            onClick={()=> {
                                setShowNavLinks(false)
                                setShowMenuBtn(true)
                                setShowCloseBtn(false)
                            }} 
                            className='mobile-hide-navlinks-btn'
                        >
                            <i className="fa fa-times"></i>
                        </button>
                    }
                </div>

                <div className='mobile-navlinks-container'>
                    <MobileNavLinks 
                        showNavLinks={showNavLinks}
                        setShowNavLinks={setShowNavLinks}
                        isAuthenticated={isAuthenticated}
                        handleMobileAuthenticatedUserNavLinks={handleMobileAuthenticatedUserNavLinks}
                        handleMobileTopics={handleMobileTopics}
                        NavbarTopics={NavbarTopics}
                        setShowCloseBtn={setShowCloseBtn}
                        topics={topics}
                        logout={logout}
                        setShowMenuBtn={setShowMenuBtn}

                    />
                </div>

                <DesktopNavLinks 
                    logout={logout}
                    topics={topics && topics}
                    isAuthenticated={isAuthenticated}
                    setShowSearchForm={setShowSearchForm}
                    showSearchForm={showSearchForm}
                />
            </nav>
        </div>
    )
}

