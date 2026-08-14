import { Link } from 'react-router-dom'
import { company } from '../data/company.js'
import { services } from '../data/services.js'
import ServiceCard from '../components/ServiceCard.jsx'
import RequestQuoteBlock from '../components/RequestQuoteBlock.jsx'
import './Home.css'

const bullets = [
  'Reliable & Professional Team',
  'Customized Cleaning Plans',
  'Flexible Scheduling',
  'Attention to Detail',
  'Quality-Focused Service',
  'Locally Owned & Operated',
]

const benefits = [
  { icon: '/assets/benefit-satisfaction.svg', stat: '100%', label: 'Customer Satisfaction' },
  { icon: '/assets/benefit-licensed.svg', stat: 'Fully', label: 'Licensed & Insured' },
  { icon: '/assets/benefit-flexible.svg', stat: 'Flexible', label: 'Scheduling Options' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">{company.name}</p>
            <h1 className="hero-title">
              CLEANER SPACES.
              <br />
              BETTER ENVIRONMENTS.
            </h1>
            <p className="hero-sub">
              Reliable commercial cleaning and janitorial services for offices,
              retail spaces, and commercial properties.
            </p>
            <div className="hero-actions">
              <Link to="/#request-quote" className="btn btn-navy">
                Request a Free Quote
              </Link>
              <a href={company.phoneHref} className="btn btn-outline-navy hero-call">
                <PhoneIcon /> Call Now: {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section services-section">
        <div className="container">
          <p className="section-eyebrow">Our Services</p>
          <h2 className="section-title">Cleaning Solutions for Every Need</h2>
          <div className="section-divider" />
          <div className="services-grid">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why" id="why-choose-us">
        <div className="container">
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="section-title why-heading">
            Your Property. Our Priority.
          </h2>
          <div className="section-divider" />
          <div className="why-panel">
            <div className="why-list">
              <ul className="why-bullets">
                {bullets.map((b) => (
                  <li key={b}>
                    <CheckCircle />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="why-benefits">
              {benefits.map((b) => (
                <div className="benefit" key={b.label}>
                  <img src={b.icon} alt="" className="benefit-icon" />
                  <div className="benefit-stat">{b.stat}</div>
                  <div className="benefit-label">{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RequestQuoteBlock />
    </>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function CheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  )
}
