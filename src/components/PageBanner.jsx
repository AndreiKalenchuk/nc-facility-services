import { Link } from 'react-router-dom'
import './PageBanner.css'

export default function PageBanner({ eyebrow, title, subtitle, crumbs = [] }) {
  return (
    <section className="page-banner">
      <div className="container">
        {eyebrow && <p className="page-banner-eyebrow">{eyebrow}</p>}
        <h1 className="page-banner-title">{title}</h1>
        {subtitle && <p className="page-banner-sub">{subtitle}</p>}
        <nav className="breadcrumbs">
          <Link to="/">Home</Link>
          {crumbs.map((c, i) => (
            <span key={c.label}>
              <span className="crumb-sep">/</span>
              {c.to && i < crumbs.length - 1 ? (
                <Link to={c.to}>{c.label}</Link>
              ) : (
                <span className="crumb-current">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  )
}
