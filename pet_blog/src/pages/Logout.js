import React from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'



function Logout() {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useOutletContext()


    const logout = ()=> {
        setIsAuthenticated(null)
        localStorage.removeItem('auth')
        navigate('/login', {state:{message:'Successfully logged out.'}})
    }

    return (
        <div style={{height:'50dvh', width:'90%', maxWidth:'1000px', margin:'0 auto'}}>
            <h1>Are you sure you want to logout?</h1>
            <button onClick={logout}>Yes, log me out</button>
            <Link to='/posts'>No, take me back home</Link>
        </div>
    )
}

export default Logout