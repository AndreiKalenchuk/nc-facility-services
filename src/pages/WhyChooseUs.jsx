import { Link } from 'react-router-dom'
import { company } from '../data/company.js'
import { services, getService } from '../data/services.js'
import PageBanner from '../components/PageBanner.jsx'
import RequestQuoteBlock from '../components/RequestQuoteBlock.jsx'
import './WhyChooseUs.css'

const reasons = [
  {
    icon: ShieldIcon,
    title: 'Licensed, Insured & Vetted',
    text: 'Fully licensed and insured with background-checked, trained staff — never unvetted subcontractors handling your facility.',
  },
  {
    icon: ClipboardIcon,
    title: 'Customized Cleaning Plans',
    text: 'No one-size-fits-all packages. We build a scope around your square footage, foot traffic, industry, and budget.',
  },
  {
    icon: SearchIcon,
    title: 'Quality Inspections',
    text: 'Routine walk-throughs and checklist-based quality checks keep results consistent visit after visit.',
  },
  {
    icon: ClockIcon,
    title: 'Flexible Scheduling',
    text: 'Daytime, after-hours, evening, and weekend service so cleaning happens without disrupting your operations.',
  },
  {
    icon: ChatIcon,
    title: 'Responsive Communication',
    text: 'A dependable point of contact and fast follow-up — if something needs attention, we make it right, quickly.',
  },
  {
    icon: LeafIcon,
    title: 'Health-First & Eco Options',
    text: 'EPA-registered disinfectants for high-touch areas, with green product options available on request.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Walkthrough & Consult',
    text: 'We assess your space, priorities, and problem areas to understand exactly what your facility needs.',
  },
  {
    num: '02',
    title: 'Custom Cleaning Plan',
    text: 'You get a tailored scope and checklist with a clear schedule and a transparent, no-surprises quote.',
  },
  {
    num: '03',
    title: 'Trained Crew Delivers',
    text: 'A dedicated, background-checked team executes the plan with professional-grade equipment and products.',
  },
  {
    num: '04',
    title: 'Inspect & Improve',
    text: 'Regular quality checks and open communication keep standards high and adapt the plan as you grow.',
  },
]

const stats = [
  { stat: '100%', label: 'Satisfaction Focused' },
  { stat: 'Licensed', label: '& Fully Insured' },
  { stat: '7 Days', label: 'Flexible Scheduling' },
  { stat: 'Local', label: 'Owned & Operated' },
]

const commercialFocus = [
  'commercial-office-cleaning',
  'janitorial-services',
  'retail-commercial-cleaning',
  'apartment-common-area-cleaning',
]
  .map(getService)
  .filter(Boolean)

export default function WhyChooseUs() {
  return (
    <>
      <PageBanner
        eyebrow="Why Choose Us"
        title="Why Businesses Choose NC Facility Services"
        subtitle="Specific standards, accountable service, and cleaning plans built around your facility — not a generic checklist."
      />

      {/* Value proposition */}
      <section className="section">
        <div className="container">
          <div className="wcu-intro-head">
            <p className="section-eyebrow">The Difference</p>
            <h2 className="wcu-heading">A Cleaning Partner You Can Actually Rely On</h2>
            <div className="section-divider" />
          </div>
          <div className="wcu-intro-grid">
            <div className="wcu-intro-copy">
              <p>
                {company.name} specializes in commercial cleaning and janitorial
                services for offices, retail spaces, apartment communities, and
                commercial properties across Eastern Washington. A clean facility
                protects the health of your team and customers, extends the life
                of your building, and reflects the professionalism of your brand.
              </p>
              <p>
                We keep our promises specific: trained and vetted crews,
                customized plans, documented quality checks, and communication
                you can count on. That is what turns a cleaning vendor into a
                long-term partner.
              </p>
              <div className="wcu-intro-actions">
                <a href={company.phoneHref} className="btn btn-navy">
                  Call {company.phone}
                </a>
                <Link to="/#request-quote" className="btn btn-outline-navy">
                  Request a Quote
                </Link>
              </div>
            </div>
            <div className="wcu-intro-media">
              <img
                src="/assets/janitorial-cart.jpg"
                alt="Janitorial cart stocked with cleaning equipment in an office"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reasons grid */}
      <section className="section wcu-reasons-section">
        <div className="container">
          <p className="section-eyebrow">What Sets Us Apart</p>
          <h2 className="section-title">Reasons to Work With Us</h2>
          <div className="section-divider" />
          <div className="wcu-reasons-grid">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div className="wcu-reason-card" key={title}>
                <div className="wcu-reason-icon">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial cleaning accent */}
      <section className="section wcu-commercial">
        <div className="container wcu-commercial-inner">
          <div className="wcu-commercial-copy">
            <p className="section-eyebrow eyebrow-left">Our Specialty</p>
            <h2 className="wcu-heading">Built for Commercial Cleaning</h2>
            <div className="section-divider divider-left" />
            <p>
              Commercial spaces have higher standards, tighter schedules, and more
              at stake than a typical clean. That is our focus. We understand
              after-hours access, multi-site consistency, high-traffic areas, and
              the appearance that keeps clients, tenants, and customers coming
              back.
            </p>
            <ul className="check-list wcu-commercial-list">
              <li>Recurring janitorial programs for busy facilities</li>
              <li>Consistent standards across multiple locations</li>
              <li>After-hours and weekend service with zero disruption</li>
              <li>Dedicated crews who learn your building</li>
            </ul>
            <div className="wcu-commercial-services">
              {commercialFocus.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="wcu-service-chip"
                >
                  <img src={s.icon} alt="" />
                  <span>{s.title}</span>
                </Link>
              ))}
            </div>
            <p className="wcu-commercial-note">
              We bring the same commercial standard to every service we offer —
              from deep cleaning to floor care.{' '}
              <Link to="/services" className="wcu-inline-link">
                See all services
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">How We Work</p>
          <h2 className="section-title">A Simple, Accountable Process</h2>
          <div className="section-divider" />
          <div className="wcu-steps-grid">
            {steps.map((s) => (
              <div className="wcu-step" key={s.num}>
                <span className="wcu-step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="wcu-stats">
        <div className="container wcu-stats-grid">
          {stats.map((s) => (
            <div className="wcu-stat" key={s.label}>
              <div className="wcu-stat-num">{s.stat}</div>
              <div className="wcu-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee */}
      <section className="section wcu-guarantee">
        <div className="container wcu-guarantee-inner">
          <div className="wcu-guarantee-icon">
            <ShieldIcon />
          </div>
          <div>
            <h2 className="wcu-heading">Our Satisfaction Promise</h2>
            <p>
              If something is not right, tell us and we will return to make it
              right — no hassle. We would rather earn a long-term partnership than
              chase a one-time job, and every visit is backed by that commitment.
            </p>
          </div>
        </div>
      </section>

      {/* All services reference */}
      <section className="section wcu-all-services">
        <div className="container">
          <p className="section-eyebrow">The Full Range</p>
          <h2 className="section-title">Every Service, One Standard</h2>
          <div className="section-divider" />
          <div className="wcu-services-tags">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="wcu-service-tag"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RequestQuoteBlock
        heading="See the Difference for Yourself"
        blurb="Tell us about your facility and we'll build a customized cleaning plan with a free, no-obligation quote."
      />
    </>
  )
}

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}
function ClipboardIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z" />
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  )
}
function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}
function LeafIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  )
}
