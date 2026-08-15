import { Link } from 'react-router-dom'
import { services } from '../data/services.js'
import PageBanner from '../components/PageBanner.jsx'
import RequestQuoteBlock from '../components/RequestQuoteBlock.jsx'
import './Services.css'

export default function Services() {
  return (
    <>
      <PageBanner
        eyebrow="Our Services"
        title="Commercial Cleaning Services"
        subtitle="From daily janitorial to specialized deep cleaning, we tailor a program to keep your facility spotless, healthy, and professional."
      />

      <section className="section">
        <div className="container">
          <div className="services-intro">
            <p className="section-eyebrow">What We Offer</p>
            <h2 className="section-title">A Complete Range of Cleaning Solutions</h2>
            <div className="section-divider" />
            <p className="services-intro-text">
              Every business is different. That is why we build a customized
              cleaning plan around your space, schedule, and budget. Explore our
              core services below and click any service to learn what is included.
            </p>
          </div>

          <div className="services-list">
            {services.map((s) => (
              <article className="service-list-card" key={s.slug}>
                <div className="slc-icon">
                  <img src={s.icon} alt="" />
                </div>
                <div className="slc-body">
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <Link to={`/services/${s.slug}`} className="slc-link">
                    Learn More
                    <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RequestQuoteBlock
        heading="Not Sure Which Service You Need?"
        blurb="Tell us about your space and we'll recommend the right cleaning program and provide a free, customized quote."
      />
    </>
  )
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
