import { useParams, Link } from 'react-router-dom'
import { getService, services } from '../data/services.js'
import PageBanner from '../components/PageBanner.jsx'
import RequestQuoteBlock from '../components/RequestQuoteBlock.jsx'
import NotFound from './NotFound.jsx'
import './ServiceDetail.css'

const steps = [
  { n: '01', title: 'Reach Out', text: 'Call or submit a quick request telling us about your space and cleaning goals.' },
  { n: '02', title: 'Free Walkthrough', text: 'We assess your facility, discuss priorities, and provide a transparent, no-obligation quote.' },
  { n: '03', title: 'Custom Plan', text: 'We build a cleaning checklist and schedule tailored to your needs and budget.' },
  { n: '04', title: 'Consistent Service', text: 'Our trained team delivers dependable results, with ongoing quality checks and easy communication.' },
]

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <NotFound />

  const related = services.filter((s) => s.slug !== slug).slice(0, 4)

  return (
    <>
      <PageBanner
        eyebrow="Our Services"
        title={service.title}
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
      />

      <section className="section detail-top">
        <div className="container detail-grid">
          <div className="detail-main">
            <p className="section-eyebrow eyebrow-left">Overview</p>
            <h2 className="detail-heading">{service.title}</h2>
            <div className="section-divider divider-left" />
            <p className="detail-intro">{service.intro}</p>

            <h3 className="detail-subheading">What's Included</h3>
            <ul className="check-list detail-included">
              {service.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="detail-side">
            <div className="detail-benefits-card">
              <h3>Why Clients Choose Us</h3>
              <ul>
                {service.benefits.map((b) => (
                  <li key={b}>
                    <Check />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="detail-cta-card">
              <h3>Ready to Get Started?</h3>
              <p>Get a free, customized quote for {service.title.toLowerCase()}.</p>
              <a href="#request-quote" className="btn btn-primary detail-cta-btn">
                Request a Quote
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section detail-process">
        <div className="container">
          <p className="section-eyebrow">How It Works</p>
          <h2 className="section-title">Our Simple Process</h2>
          <div className="section-divider" />
          <div className="process-grid">
            {steps.map((s) => (
              <div className="process-step" key={s.n}>
                <span className="process-num">{s.n}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section detail-faq-section">
        <div className="container detail-faq-inner">
          <div className="detail-faq-head">
            <p className="section-eyebrow eyebrow-left">FAQ</p>
            <h2 className="detail-heading">Frequently Asked Questions</h2>
            <div className="section-divider divider-left" />
            <p className="detail-faq-lead">
              Have a question that is not answered here? Reach out any time and
              we will be happy to help.
            </p>
          </div>
          <div className="faq-list">
            {service.faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section related-section">
        <div className="container">
          <h2 className="section-title">Explore Other Services</h2>
          <div className="section-divider" />
          <div className="related-grid">
            {related.map((s) => (
              <Link to={`/services/${s.slug}`} className="related-card" key={s.slug}>
                <img src={s.icon} alt="" />
                <span>{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RequestQuoteBlock
        heading={`Request a Quote for ${service.title}`}
        blurb="Fill out the form and our team will follow up with a customized quote for your facility."
        serviceName={service.title}
      />
    </>
  )
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
