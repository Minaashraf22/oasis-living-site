import React, { useState } from 'react'
import { monthly, egp } from '../finance.js'

export default function DetailDialog({ sel, onClose }) {
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(22)
  const [years, setYears] = useState(15)
  const dp = Math.min(90, Math.max(0, Number(down) || 0))
  const loan = sel.price * (1 - dp / 100)
  const pay = monthly(loan, rate, years)
  return (
    <div className="modal" onClick={onClose}><div className="dlg" role="dialog" aria-label={sel.title} onClick={e => e.stopPropagation()}>
      <img src={sel.img} alt={sel.title} />
      <div className="dbody"><h2>{sel.title}</h2><p className="area">{sel.area} · {sel.size} m² · {sel.beds} bd · {sel.baths} ba</p><p>{sel.text}</p>
        <h3>Mortgage estimate</h3>
        <div className="mort">
          <label>Down payment %<input type="number" value={down} onChange={e => setDown(e.target.value)} aria-label="Down payment" /></label>
          <label>Interest % / year<input type="number" step="0.5" value={rate} onChange={e => setRate(e.target.value)} aria-label="Interest" /></label>
          <label>Years<input type="number" value={years} onChange={e => setYears(Math.min(30, Math.max(1, +e.target.value || 1)))} aria-label="Years" /></label>
        </div>
        <p className="loan">Loan: {egp(loan)} EGP</p>
        <p className="pay" data-testid="pay">Monthly payment: <b>{egp(pay)} EGP</b></p>
        <small>Illustrative estimate with a fixed rate. Not financial advice.</small>
        <button className="close" onClick={onClose}>Close</button>
      </div></div></div>
  )
}
