import './PageBanner.css'

export default function PageBanner({ eyebrow, title, subtitle }) {
  return (
    <section className="page-banner">
      <div className="container">
        {eyebrow && <p className="page-banner-eyebrow">{eyebrow}</p>}
        <h1 className="page-banner-title">{title}</h1>
        {subtitle && <p className="page-banner-sub">{subtitle}</p>}
      </div>
    </section>
  )
}
