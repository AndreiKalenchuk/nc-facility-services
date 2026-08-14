import { Link } from 'react-router-dom'
import './ServiceCard.css'

export default function ServiceCard({ service, linked = true }) {
  const inner = (
    <>
      <div className="sc-icon">
        <img src={service.icon} alt="" />
      </div>
      <h3 className="sc-title">{service.title}</h3>
    </>
  )

  if (!linked) {
    return <div className="service-card">{inner}</div>
  }

  return (
    <Link to={`/services/${service.slug}`} className="service-card">
      {inner}
    </Link>
  )
}
