import { Resend } from 'resend'

const TO_EMAIL = process.env.QUOTE_TO_EMAIL || 'ncfacilityserv@gmail.com'
const FROM_EMAIL =
  process.env.QUOTE_FROM_EMAIL || 'NC Facility Services <onboarding@resend.dev>'

// Shown to site visitors when anything goes wrong on our side. Never leak
// upstream provider errors to the browser — they expose internal config.
const GENERIC_FAILURE =
  "We couldn't submit your request right now. Please call us at 509-290-8461 or email ncfacilityserv@gmail.com and we'll get right back to you."

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const row = (label, value) =>
  value
    ? `<tr>
         <td style="padding:8px 14px;background:#f4f6f9;font-weight:600;color:#10244f;white-space:nowrap;">${label}</td>
         <td style="padding:8px 14px;color:#2b3648;">${escapeHtml(value)}</td>
       </tr>`
    : ''

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[send-quote] RESEND_API_KEY is not set')
    return json(500, { error: GENERIC_FAILURE })
  }

  // Resend's shared test sender can only deliver to the account owner's own
  // address. Surface this in the function logs so it isn't mistaken for a bug.
  if (FROM_EMAIL.includes('onboarding@resend.dev')) {
    console.warn(
      '[send-quote] Sending from the Resend test sender (onboarding@resend.dev). ' +
        'Delivery to ' +
        TO_EMAIL +
        ' will fail unless it is the Resend account owner address. ' +
        'Verify a domain at https://resend.com/domains and set QUOTE_FROM_EMAIL.'
    )
  }

  let data
  try {
    data = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid request.' })
  }

  const { name, phone, email } = data
  if (!name || !phone || !email) {
    return json(400, { error: 'Name, phone, and email are required.' })
  }

  const subjectService = data.serviceName ? ` - ${data.serviceName}` : ''
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:#10244f;color:#fff;padding:22px 26px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0;font-size:20px;">New Quote Request</h2>
        <p style="margin:6px 0 0;color:#c7d3e8;font-size:14px;">NC Facility Services LLC website</p>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e4e9f0;border-top:none;">
        ${row('Name', data.name)}
        ${row('Company', data.company)}
        ${row('Phone', data.phone)}
        ${row('Email', data.email)}
        ${row('Property Address', data.address)}
        ${row('Type of Facility', data.facility)}
        ${row('Approx. Square Footage', data.squareFootage)}
        ${row('Cleaning Frequency', data.frequency)}
        ${row('Preferred Start Date', data.startDate)}
        ${row('Service of Interest', data.serviceName)}
        ${row('Additional Details', data.details)}
      </table>
    </div>`

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Quote Request from ${name}${subjectService}`,
      html,
    })

    if (error) {
      console.error('[send-quote] Resend rejected the send:', {
        from: FROM_EMAIL,
        to: TO_EMAIL,
        name: error.name,
        message: error.message,
      })
      return json(502, { error: GENERIC_FAILURE })
    }
    return json(200, { ok: true })
  } catch (err) {
    console.error('[send-quote] Unexpected failure:', err)
    return json(502, { error: GENERIC_FAILURE })
  }
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}
