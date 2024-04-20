import React, { useEffect, useState } from 'react'
import { Link, useLocation, Navigate, useNavigate, useOutletContext} from 'react-router-dom'
import { loginInfoValidation  } from '../utils/validators'
import { login } from '../utils/api'
import { url } from '../utils/urls'
import LoadingPage from './LoadingPage'


function Login() {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({username:'',password:''})
    const [frontendErrorMessage, setFrontendErrorMessage] = useState(null)
    const [backendAuthError, setBackendAuthError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null) 
    const [isLogingin, setIsLogingin] = useState(false)
    const {isAuthenticated, setIsAuthenticated} = useOutletContext()
    window.history.replaceState({state:null}, '', '/login')
    const {state} = useLocation()
    const navigate = useNavigate()
   

    
    const handleForm = async function(e) {
        e.preventDefault()
        setBackendAuthError(null)
        setFrontendErrorMessage(null)
    
        const isNotValid = loginInfoValidation (user)
        if(isNotValid) {
            setFrontendErrorMessage(isNotValid)
        }else{
            setIsLogingin(true)
            const data = await login(`${url}/api/auth/login/`, user)
            if(data.error) {
                setIsLogingin(false)
                setBackendAuthError(data.error)
            }else {
                setIsLogingin(false)
                localStorage.setItem('auth', JSON.stringify(data))
                setIsAuthenticated(data)
                navigate(`${state && state.redirect?state.redirect:'/posts'}`, {replace:true, state:{message:data.message}})
            }
        }
    }

    const handleChange = function(e) {
        const {name, value} = e.target  
        setUser((prev)=> ({...prev, [name]:value}))
    }

    useEffect(()=> {
        state && state.message && setSuccessMessage({registered:state.message})
        const timeoutID = setTimeout(()=>{
            if(state && state.message) {
                const message = document.querySelector('.user-login__message')
                setSuccessMessage(null)
                if(message) {
                    message.style.disply = 'none'
                }
            }else if(state && state.error) {
                const error = document.querySelector('.user-login__error-message')
                if(error) {
                    error.style.display = 'none'
                }
            }
            clearTimeout(timeoutID)
        }, 5000)

    }, [state])


    useEffect(()=> {
        const timeoutId = setTimeout(()=> {
            if(document.readyState === 'complete') {
                setIsLoading(false)
                clearTimeout(timeoutId)
            }else {
                clearTimeout(timeoutId)
            }
        }, 100)
    }, [])

    if(isAuthenticated) {
        return (
            <Navigate to='/posts' replace={true} state={{error:'You are logged in already!'}} />
        )
    }

    if(isLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div className="user-login-main-container">
            <div className="user-login-container">
                {/* {successMessage && successMessage.registered && <p className='user-login__message'>{successMessage.registered}</p>} */}
                {state && state.error && <p className='user-login__error-message'>{state.error}</p>}
                <div className='user-login'>
                    <h2 className='user-login__header'>Sign In</h2>
                    {backendAuthError && <p className='user-register__error'>{backendAuthError}</p>}
                    <form className='user-login__form' onSubmit={handleForm}>
                        {frontendErrorMessage && frontendErrorMessage.username === 'null' && <p className='user-register__error'>This field is required.</p>}
                        <input 
                            onChange={handleChange} 
                            value={user.username} 
                            className='user-login__input' 
                            name='username' 
                            type="text" 
                            placeholder='Username'
                        />
                        {frontendErrorMessage && frontendErrorMessage.password === 'null' && <p className='user-register__error'>This field is required.</p>}
                        <input 
                            onChange={handleChange} 
                            value={user.password} 
                            className='user-login__input' 
                            name='password' 
                            type="password" 
                            placeholder='Password'
                        />
                        <button className='user-login__btn' type='submit'>
                            {isLogingin ? <div style={{display:'flex',gap:'0.3rem',alignItems:'center'}}>Logging in...<p className='registering-animation'></p></div> : 'Login'}
                        </button>
                    </form>
                    <div className="user-login__not-yet-registered">
                        <p>Not yet registered? </p>
                        <Link to='/register'>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login