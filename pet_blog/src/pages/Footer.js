import React, { useEffect } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import paw from '../images/paw.webp'




function Footer(prop) {
  const { isAuthenticated } = prop

  return (
    <div className='footer-container'>
        <div className="footer-container__contents">
          <div className='footer-container__brand-container'>
              <div className="footer-container__logo">
                <img className='footer-container__brand-logo' src={paw} alt="paw" />
                <h2 className='footer-container__brand-name'>PawPals</h2>
              </div>
              <div className="footer-container__brand-text">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Illo ad neque repellat, voluptatum exercitationem voluptate. 
                  Quae expedita assumenda tempora enim.
                </p>
              </div>
          </div>
          <div className='footer-container__quick-links'>
            <h2 className='quick-links-header'>Quick Links</h2>
            <ul className='quick-links'>
              <li className='quick-nav-link'>
                <NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/'>Home</NavLink>
              </li>
              <li className='quick-nav-link'>
                <NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/posts'>Posts</NavLink>
              </li>
              {!isAuthenticated ?
              <>

                <li className='quick-nav-link'>
                  <NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/login'>Login</NavLink>
                </li>
                <li className='quick-nav-link'>
                  <NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/register'>Register</NavLink>
                </li>
              </>
              :
              <>
                <li className='quick-nav-link'>
                  <NavLink className={({isActive})=>isActive? 'active-quick-link quick-link': 'quick-link'} to='/my-posts'>My Posts</NavLink>
                </li>
                <li className='quick-nav-link'>
                  <NavLink className={({isActive})=>isActive? 'active-quick-link quick-link': 'quick-link'} to='/my-comments'>My Comments</NavLink>
                </li>
                <li className='quick-nav-link'><NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/logout'>Logout</NavLink></li>
              </>
              }
            </ul>
          </div>
          <div className="social-links">
            <h2 className='social-links-header'>External Links</h2>
            <div className="social-links-container">
              <Link to="https://github.com/shinhosuck" target="_blank"><i className="fab fa-github"></i></Link>
              <Link to="https://www.linkedin.com/in/eric-anderson-a6b906214/" target="_blank"><i className="fab fa-linkedin-in"></i></Link>
            </div>
          </div>
          <div className="contact-us-container">
            <h2 className='contact-us-header'>Contact US</h2>
            <div className='contacts'>
              <div className='contact'>
                <div className="address">
                  <i className="fa-solid fa-address-book"></i>
                  <p>96 Imelda Village 5A Baguio City, Benguet, PH 2600</p>
                </div>
                <div className="email">
                  <i className="fa-solid fa-envelope"></i>
                  <Link to="malito:shinhosuck1973@gmail.com">shinhosuck1973@gmail.com</Link>
                </div>
                <div className="phone">
                  <i className="fa-solid fa-phone"></i>
                  <Link to="tel:+639693527097">+63 969 352 7097</Link>
                </div>
              </div>
              <div className='contact-form-container'>
                <form className='contact-form' action="">
                  <label htmlFor="email">Email<span style={{fontSize:'1.4rem',color:'hsl(9, 100%, 64%)'}}>*</span></label>
                  <input type="email" id='email' name='email' required/>
                  <label htmlFor="message">Message<span style={{fontSize:'1.4rem',color:'hsl(9, 100%, 64%)'}}>*</span></label>
                  <textarea name="message" id="message" required></textarea>
                  <button type='submit'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right">
            <p className="copy-right-text">&copy;Copyright 2024 DRF ReactJS Blog Team. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer