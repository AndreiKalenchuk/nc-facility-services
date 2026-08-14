import { useState } from 'react'
import './QuoteForm.css'

const initialState = {
  name: '',
  company: '',
  phone: '',
  email: '',
  address: '',
  facility: '',
  squareFootage: '',
  frequency: '',
  startDate: '',
  details: '',
}

const facilityOptions = [
  'Office Building',
  'Retail Store',
  'Medical / Clinic',
  'Apartment / Multi-Family',
  'Warehouse / Industrial',
  'Restaurant',
  'School / Education',
  'Post-Construction Site',
  'Other',
]

const frequencyOptions = [
  'One-Time',
  'Daily',
  'Weekly',
  'Bi-Weekly',
  'Monthly',
  'Not Sure Yet',
]

export default function QuoteForm({ defaultFacility = '', serviceName = '' }) {
  const [form, setForm] = useState({
    ...initialState,
    facility: defaultFacility,
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/.netlify/functions/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, serviceName }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
      setForm({ ...initialState, facility: defaultFacility })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (status === 'success') {
    return (
      <div className="quote-form quote-success">
        <div className="quote-success-icon">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3>Thank you!</h3>
        <p>
          Your request has been sent. A member of our team will get back to you
          shortly with a customized quote.
        </p>
        <button className="btn btn-primary" onClick={() => setStatus('idle')}>
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="qf-grid">
        <input name="name" placeholder="Your Name*" required value={form.name} onChange={update} />
        <input name="company" placeholder="Company Name" value={form.company} onChange={update} />

        <input name="phone" placeholder="Phone Number*" required value={form.phone} onChange={update} />
        <input name="email" type="email" placeholder="Email Address*" required value={form.email} onChange={update} />

        <input className="qf-full" name="address" placeholder="Property Address" value={form.address} onChange={update} />

        <select name="facility" required value={form.facility} onChange={update} className={form.facility ? '' : 'placeholder'}>
          <option value="" disabled>Type of Facility*</option>
          {facilityOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <input name="squareFootage" placeholder="Approx. Square Footage" value={form.squareFootage} onChange={update} />

        <select name="frequency" required value={form.frequency} onChange={update} className={form.frequency ? '' : 'placeholder'}>
          <option value="" disabled>Cleaning Frequency*</option>
          {frequencyOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <input name="startDate" type="date" placeholder="Preferred Start Date" value={form.startDate} onChange={update} className={form.startDate ? '' : 'placeholder'} />

        <textarea className="qf-full" name="details" rows="3" placeholder="Additional Details — tell us about your cleaning needs..." value={form.details} onChange={update} />
      </div>

      {status === 'error' && <p className="qf-error">{errorMsg}</p>}

      <button className="btn btn-navy qf-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Submit Request'}
      </button>
    </form>
  )
}
