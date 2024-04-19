import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { register } from '../utils/api'
import { passwordCheck, newUserInfoCheck } from '../utils/validators'
import LoadingPage from './LoadingPage'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout' 



function Register() {
    const [windowLoaded, setWindowLoaded] = useState(document.readyState === 'interactive')
    const [isLoading, setIsLoading] = useState(true)
    const [newUser, setNewUser] = useState({username:'', password:'', passwordConfirmation:''})
    const [userInfoError, setUserInfoError] = useState(null)
    const [passwordValidated, setPasswordValidated] = useState(true)
    const [backendAuthError, setBackendAuthError] = useState(null)
    const {isAuthenticated} = useContext(ContentLayoutContext)
    const navigate = useNavigate()

    
    const handleForm = async function(e) {
        e.preventDefault()
        setUserInfoError(null)
        setPasswordValidated(true)
        setBackendAuthError(null)

        const userInfo = newUserInfoCheck(newUser)

        if(userInfo !== 'validated') {
            setUserInfoError(userInfo)

        }else{
            const isValid = passwordCheck(newUser.password)
            if(!isValid) {
                setPasswordValidated(false)

            }else {
                const body = {username:newUser.username, password:newUser.password}
                const data = await register(`${url}/api/auth/register/`, body)
                if(data.message.toLowerCase() === 'successfully registered!') {
                    setNewUser({username:'',password:'',passwordConfirmation:''})
                    navigate('/login', {replace:true, state:{message:data.message}})

                }else if(data && data.error){
                    setBackendAuthError(data)
                }
            }
        }
    }

    const handleChange = function(e) {
        const {name, value} = e.target  
        setNewUser((prev)=> ({...prev, [name]:value}))
    }

    useEffect(()=> {
        setIsLoading(false)
    }, [windowLoaded])

    if(isAuthenticated) {
        return (
            <Navigate to='/posts' replace={true} state={{error:'You are registered and logged in already!'}}/>
        )
    }

    if(isLoading) {
        return (
            <LoadingPage />
        )
    }
    
    return (
        <div className="user-register-main-container">
            <div className="user-register-container">
                <div className='user-register'>
                    <h2 className='user-register__header'>Register</h2>
                    <form className='user-register__form' onSubmit={handleForm}>
                        {backendAuthError && <p className='user-register__error'>{backendAuthError.error}</p>}
                        {!passwordValidated && <p className='user-register__error'>Password must contain number, upper and lower case characters. </p>}
                        {userInfoError && Object.keys(userInfoError).includes('username') &&
                            <p className='user-register__error'>{userInfoError.username}</p>
                        }
                        <input
                            className='user-register__input' 
                            onChange={handleChange} 
                            name='username' 
                            value={newUser.username.replaceAll(' ', '')} 
                            type="text" 
                            placeholder='Username'
                        />
                        {userInfoError && Object.keys(userInfoError).includes('password') &&
                            <p className='user-register__error'>{userInfoError.password}</p>
                        }
                        <input
                            className='user-register__input' 
                            onChange={handleChange} 
                            name='password' 
                            value={newUser.password} 
                            type="password" 
                            placeholder='Password'
                        />
                        {userInfoError && 
                            <div>
                                {userInfoError && Object.keys(userInfoError).includes('passwordConfirmation') &&
                                    <p className='user-register__error'>{userInfoError.passwordConfirmation}</p>
                                }
                                {userInfoError && Object.keys(userInfoError).includes('passwordMismatch') &&
                                    <p className='user-register__error'>{userInfoError.passwordMismatch}</p>
                                }
                            </div>
                        }
                        <input
                            className='user-register__input' 
                            onChange={handleChange} 
                            name='passwordConfirmation' 
                            value={newUser.passwordConfirmation} 
                            type="password" 
                            placeholder='Confirm password'
                        />
                        <button className='user-register__btn' type='submit'>Regster</button>
                    </form>
                    <div className="user-register__already-registered">
                        <p>Already registered? </p>
                        <Link to='/login'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register