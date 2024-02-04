import React from 'react'





function LandingPageEmailSub() {
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
            <form className='landing-page-email-sub-form'>
                <input type="text" placeholder='First name'/>
                <input type="text" placeholder='Last name'/>
                <input type="email" placeholder='example@mail.com'/>
                <button className='landing-page-email-sub-btn' type='submit'>Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default LandingPageEmailSub