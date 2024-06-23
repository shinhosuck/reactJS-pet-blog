import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { ContentLayoutContext } from '../layouts/ContentLayout'


function UserDashboard() {
    const { isAuthenticated} = useContext(ContentLayoutContext)
    const { pathname, state } = useLocation()
    const navigate = useNavigate()


    useEffect(()=> {
        document.title = 'Dashboard'
    }, [])

    if (!isAuthenticated) {
        return (
            <Navigate to='/login' state={{error:'You are not logged in.'}}/>
        )
    }

    return (
        <div className='dashboard-container'>
            <h1 className='landing-page-posts-header'>Dashboard</h1>
            <div className='dashboard-contents'>
                <div className="left-side-menu">
                    <img src={isAuthenticated && isAuthenticated.image_url} alt="" />
                    <NavLink to='.' end={true} className={({isActive})=> isActive?'active-dashboar-link dashboard-link':'dashboard-link'}>Home</NavLink>
                    <NavLink to='posts' className={({isActive})=> isActive?'active-dashboar-link dashboard-link':'dashboard-link'}>Posts</NavLink>
                    <NavLink to='comments' className={({isActive})=> isActive?'active-dashboar-link dashboard-link':'dashboard-link'}>Comments</NavLink>
                    <NavLink to='profile' className={({isActive})=> isActive?'active-dashboar-link dashboard-link':'dashboard-link'}>Profile</NavLink>
                    <NavLink to='contact' className={({isActive})=> isActive?'active-dashboar-link dashboard-link':'dashboard-link'}>Contact</NavLink>
                </div>
                <div className="right-side-contents">
                    <div className='right-side-menu'>
                        <p>Hello, {isAuthenticated && isAuthenticated.username}</p>
                    </div>
                    <div className="right-side-content">
                        {isAuthenticated && 
                            <Outlet />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard