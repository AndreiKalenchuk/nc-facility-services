import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container">
        <p className="notfound-code">404</p>
        <h1>Page Not Found</h1>
        <p className="notfound-text">
          Sorry, the page you're looking for doesn't exist or has moved.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-navy">Back to Home</Link>
          <Link to="/services" className="btn btn-outline-navy">View Services</Link>
        </div>
      </div>
    </section>
  )
}
