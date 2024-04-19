import React from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'



function Logout() {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useOutletContext()


    const logout = ()=> {
        setIsAuthenticated(null)
        localStorage.removeItem('auth')
        navigate('/login', {state:{message:'Successfully logged out.'}, replace:true})
    }

    return (
        <div className='logout-container'>
            <h2>Are you sure you want to logout?</h2>
            <Link to='/posts'><i className="fa fa-arrow-left"></i>No, take me back home</Link>
            <button onClick={logout}>Log me out</button>
        </div>
    )
}

export default Logout