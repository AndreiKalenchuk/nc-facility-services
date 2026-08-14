import { company } from '../data/company.js'
import QuoteForm from './QuoteForm.jsx'
import './RequestQuoteBlock.css'

export default function RequestQuoteBlock({
  heading = 'Request a Free Quote',
  blurb = "Tell us about your cleaning needs and we'll provide a customized quote.",
  defaultFacility = '',
  serviceName = '',
}) {
  return (
    <section className="request-quote" id="request-quote">
      <div className="container rq-inner">
        <div className="rq-info">
          <p className="section-eyebrow eyebrow-left">Get Started</p>
          <h2 className="rq-heading">{heading}</h2>
          <div className="section-divider divider-left" />
          <p className="rq-blurb">{blurb}</p>

          <ul className="rq-contact">
            <li>
              <PhoneIcon />
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
            <li>
              <MailIcon />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <PinIcon />
              <span>{company.location}</span>
            </li>
            <li>
              <ClockIcon />
              <span>
                {company.hours.map((h) => (
                  <span key={h} className="rq-hours-line">{h}</span>
                ))}
              </span>
            </li>
          </ul>

          <div className="rq-badges">
            <span>Licensed</span>
            <span>Insured</span>
            <span>Reliable</span>
          </div>
        </div>

        <div className="rq-form-card">
          <QuoteForm defaultFacility={defaultFacility} serviceName={serviceName} />
        </div>
      </div>
    </section>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  )
}
