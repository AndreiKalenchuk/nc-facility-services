import { Link } from 'react-router-dom'
import { company } from '../data/company.js'
import PageBanner from '../components/PageBanner.jsx'
import RequestQuoteBlock from '../components/RequestQuoteBlock.jsx'
import './About.css'

const values = [
  {
    title: 'Reliability',
    text: 'We show up on schedule, every time, and deliver consistent results you can count on.',
  },
  {
    title: 'Attention to Detail',
    text: 'From baseboards to high-touch points, we sweat the small stuff that makes a big difference.',
  },
  {
    title: 'Accountability',
    text: 'Quality checks, open communication, and a satisfaction guarantee back every visit.',
  },
  {
    title: 'Local Commitment',
    text: 'Locally owned and operated, we take pride in keeping our community\'s businesses shining.',
  },
]

const stats = [
  { stat: '100%', label: 'Satisfaction Focused' },
  { stat: 'Licensed', label: '& Fully Insured' },
  { stat: '7 Days', label: 'Flexible Scheduling' },
  { stat: 'Local', label: 'Owned & Operated' },
]

export default function About() {
  return (
    <>
      <PageBanner
        eyebrow="About Us"
        title="Cleaner Spaces. Better Environments."
        subtitle={`${company.name} is your trusted partner for commercial cleaning across Eastern Washington and North Idaho.`}
      />

      <section className="section">
        <div className="container about-grid">
          <div className="about-media">
            <img src="/assets/hero-office.png" alt="Clean, modern office maintained by NC Facility Services" />
            <div className="about-media-badge">
              <span className="amb-stat">Est.</span>
              <span className="amb-label">Spokane, WA</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="section-eyebrow eyebrow-left">Who We Are</p>
            <h2 className="about-heading">Professional Cleaning You Can Rely On</h2>
            <div className="section-divider divider-left" />
            <p>
              {company.name} provides reliable commercial cleaning and janitorial
              services for offices, retail spaces, apartment communities, and
              commercial properties throughout the Spokane and Coeur d'Alene
              regions. We keep your business clean, healthy, and welcoming so you
              can focus on what you do best.
            </p>
            <p>
              We know that a clean environment is more than appearances. It
              protects the health of your employees and customers, extends the
              life of your facility, and reflects the professionalism of your
              brand. Every account gets a customized plan, trained staff, and a
              commitment to doing the job right.
            </p>
            <div className="about-contact">
              <a href={company.phoneHref} className="btn btn-navy">
                Call {company.phone}
              </a>
              <Link to="/#request-quote" className="btn btn-outline-navy">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container about-stats-grid">
          {stats.map((s) => (
            <div className="about-stat" key={s.label}>
              <div className="about-stat-num">{s.stat}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Our Values</p>
          <h2 className="section-title">What Drives Us</h2>
          <div className="section-divider" />
          <div className="values-grid">
            {values.map((v) => (
              <div className="value-card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-mission">
        <div className="container about-mission-inner">
          <div>
            <p className="section-eyebrow eyebrow-left">Our Mission</p>
            <h2 className="about-heading">We Keep Your Business Shining</h2>
            <div className="section-divider divider-left" />
            <p>
              Our mission is simple: deliver dependable, high-quality cleaning
              that makes your space healthier and your day easier. We build
              lasting partnerships with the businesses we serve, earning trust
              one spotless visit at a time.
            </p>
          </div>
          <ul className="check-list about-mission-list">
            <li>Trained, background-checked, and professional staff</li>
            <li>Customized cleaning plans for every facility</li>
            <li>Flexible day, evening, and weekend scheduling</li>
            <li>Quality inspections and responsive communication</li>
            <li>Eco-friendly product options on request</li>
            <li>Satisfaction-focused, locally owned service</li>
          </ul>
        </div>
      </section>

      <RequestQuoteBlock />
    </>
  )
}
