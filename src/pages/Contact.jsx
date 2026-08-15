import { company } from '../data/company.js'
import PageBanner from '../components/PageBanner.jsx'
import RequestQuoteBlock from '../components/RequestQuoteBlock.jsx'
import './Contact.css'

export default function Contact() {
  const cards = [
    {
      icon: <PhoneIcon />,
      title: 'Call Us',
      lines: [{ text: company.phone, href: company.phoneHref }],
    },
    {
      icon: <MailIcon />,
      title: 'Email Us',
      lines: [{ text: company.email, href: `mailto:${company.email}` }],
    },
    {
      icon: <PinIcon />,
      title: 'Location',
      lines: [{ text: company.location }, { text: 'Serving WA & North ID' }],
    },
    {
      icon: <ClockIcon />,
      title: 'Hours',
      lines: company.hours.map((h) => ({ text: h })),
    },
  ]

  return (
    <>
      <PageBanner
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Questions or ready for a free quote? We'd love to hear about your facility and how we can help."
      />

      <section className="section contact-cards-section">
        <div className="container contact-cards">
          {cards.map((c) => (
            <div className="contact-card" key={c.title}>
              <div className="contact-card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              {c.lines.map((l, i) =>
                l.href ? (
                  <a key={i} href={l.href}>{l.text}</a>
                ) : (
                  <p key={i}>{l.text}</p>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      <RequestQuoteBlock
        heading="Send Us a Message"
        blurb="Fill out the form and a member of our team will get back to you shortly with a customized quote."
      />
    </>
  )
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  )
}
