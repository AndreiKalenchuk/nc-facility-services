import { company } from '../data/company.js'
import PageBanner from '../components/PageBanner.jsx'
import RequestQuoteBlock from '../components/RequestQuoteBlock.jsx'
import './ServiceAreas.css'

const areaDetails = {
  Spokane: 'Our home base. Full-service commercial cleaning for offices, retail, and medical facilities throughout the city.',
  'Spokane Valley': 'Reliable janitorial and floor care for the Valley\'s growing business and retail corridors.',
  'Liberty Lake': 'Office and commercial cleaning for Liberty Lake\'s business parks and professional suites.',
  'Airway Heights': 'Dependable cleaning services for west-side commercial, retail, and industrial spaces.',
}

export default function ServiceAreas() {
  return (
    <>
      <PageBanner
        eyebrow="Service Areas"
        title="Where We Work"
        subtitle={company.serving}
      />

      <section className="section">
        <div className="container">
          <div className="areas-intro">
            <p className="section-eyebrow">Coverage</p>
            <h2 className="section-title">Serving Eastern Washington</h2>
            <div className="section-divider" />
            <p className="areas-intro-text">
              {company.name} proudly serves businesses across the greater Spokane
              region. If you don't see your city listed, reach out anyway. We
              regularly service surrounding communities.
            </p>
          </div>

          <div className="areas-grid">
            {company.serviceAreas.map((area) => (
              <div className="area-card" key={area}>
                <div className="area-card-head">
                  <PinIcon />
                  <h3>{area}</h3>
                </div>
                <p>{areaDetails[area]}</p>
              </div>
            ))}
          </div>

          <p className="areas-note">
            ...and surrounding areas throughout Eastern Washington.
          </p>
        </div>
      </section>

      <RequestQuoteBlock
        heading="Serving Your Area"
        blurb="Tell us where your facility is located and what you need cleaned, and we'll provide a free quote."
      />
    </>
  )
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
