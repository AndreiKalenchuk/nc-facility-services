import { Link } from 'react-router-dom'
import { company } from '../data/company.js'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/assets/logo-white.png" alt="NC Facility Services LLC" />
          <p>
            Reliable commercial cleaning and janitorial services for offices,
            retail spaces, and commercial properties.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/why-choose-us">Why Choose Us</Link></li>
            <li><Link to="/service-areas">Service Areas</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Service Areas</h4>
          <p className="footer-areas">
            {company.serviceAreas.join('  |  ')}
            <br />
            and surrounding areas
          </p>
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul className="footer-contact">
            <li>
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>{company.location}</li>
          </ul>
          <a
            className="footer-social"
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          &copy; {year} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
