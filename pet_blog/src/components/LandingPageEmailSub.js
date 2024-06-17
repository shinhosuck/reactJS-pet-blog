import React, { useState, useEffect} from 'react'
import { handleMessage } from '../utils/api'
import { url } from '../utils/urls'



function LandingPageEmailSub() {
    const [subscriber, setSubscriber] = useState({first:'', last:'', email:''})
    const [successMessage, setSuccessMessage] = useState(null)
    const [isError, setIsError] = useState(null)
    const [submiting, setSubmiting] = useState(false)

    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(subscriber.first && subscriber.last && subscriber.email) {
            setSubmiting(true)
            const data = await handleMessage(`${url}/api/news-letter-subscription/`, subscriber)
            if(data.error) {
                setIsError(data.error)
                
            }else {
                setSuccessMessage(data.message)
                setSubscriber({first:'', last:'', email:''})
            }
            setSubmiting(false)
        }
    }

    const handleChange = (e)=> {
        const {name, value} = e.target
        setSubscriber((prev)=> ({...prev, [name]:value}))
    }


    useEffect(()=> {
        const timeoutID = setTimeout(()=> {
        setSuccessMessage(null)
        setIsError(null)
        clearTimeout(timeoutID)
        }, 7000)
    },[isError, successMessage])


    return (
        <div className='landing-page-email-sub-form-wrapper'>
            <div className="landing-page-email-form-contents">
                <div className="landing-page-email-form-text-container">
                    <h1 className="landing-page-email-form-header">Stay Informed</h1>
                    <p className="landing-page-email-form-text">
                        Enter your name and email to subscribe to 
                        our blog and never miss out on valuable updates.
                    </p>
                </div>
                <form className='landing-page-email-sub-form' onSubmit={handleSubmit}>
                    {successMessage && <p className='success-message'>{successMessage}</p> || isError && <p className='error-message'>{isError}</p>}
                    <label htmlFor="firstName">First Name</label>
                    <input id='firstName' onChange={handleChange} value={subscriber.first} name='first' type="text"/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id='lastName' onChange={handleChange} value={subscriber.last} name='last' type="text"/>
                    <label htmlFor="email">Email</label>
                    <input id='email' onChange={handleChange} value={subscriber.email} name='email' type="email"/>
                    <button className='landing-page-email-sub-btn' type='submit'>
                        {submiting ? <div style={{display:'flex',gap:'0.3rem',alignItems:'center'}}>Submiting...<p className='registering-animation'></p></div> : 'Subscribe'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LandingPageEmailSub