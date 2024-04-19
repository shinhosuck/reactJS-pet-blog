import React, { useState, useEffect} from 'react'
import { handleMessage } from '../utils/api'
import { url } from '../utils/urls'



function LandingPageEmailSub() {
    const [subscriber, setSubscriber] = useState({first:'', last:'', email:''})
    const [successMessage, setSuccessMessage] = useState(null)
    const [isError, setIsError] = useState(null)

    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(subscriber.first && subscriber.last && subscriber.email) {
            console.log(subscriber)
            const data = await handleMessage(`${url}/api/news-letter-subscription/`, subscriber)
            if(data.error) {
                setIsError(data.error)

            }else {
                setSuccessMessage(data.message)
                setSubscriber({first:'', last:'', email:''})
            }
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
                    <h1 className="landing-page-email-form-header">Stay Informed About Canine Care</h1>
                    <p className="landing-page-email-form-text">
                        Subscribe to our blog for regular updates and valuable
                        tips on caring for your furry friend.
                    </p>
                </div>
                <form className='landing-page-email-sub-form' onSubmit={handleSubmit}>
                    {successMessage && <p className='success-message'>{successMessage}</p> || isError && <p className='error-message'>{isError}</p>}
                    <input onChange={handleChange} value={subscriber.first} name='first' type="text" placeholder='First name'/>
                    <input onChange={handleChange} value={subscriber.last} name='last' type="text" placeholder='Last name'/>
                    <input onChange={handleChange} value={subscriber.email} name='email' type="email" placeholder='example@mail.com'/>
                    <button className='landing-page-email-sub-btn' type='submit'>Subscribe</button>
                </form>
            </div>
        </div>
    )
}

export default LandingPageEmailSub