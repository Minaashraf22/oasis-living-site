import React from 'react'
import { listings } from '../data.js'
import { egp } from '../finance.js'

const ROWS = [['Price (EGP)', l => egp(l.price)], ['Bedrooms', l => l.beds], ['Size (m²)', l => l.size], ['Price per m²', l => egp(l.price / l.size)]]

export default function Compare({ ids }) {
  const items = ids.map(id => listings.find(l => l.id === id))
  return (
    <>
      <section className="compare" aria-label="Comparison"><h2>Compare ({ids.length}/3)</h2>
        <table><thead><tr><th /> {items.map(l => <th key={l.id}>{l.title}</th>)}</tr></thead><tbody>
          {ROWS.map(([n, f]) => <tr key={n}><td>{n}</td>{items.map(l => <td key={l.id}>{f(l)}</td>)}</tr>)}</tbody></table></section>
      {ids.length === 3 && <p className="hint">Maximum of 3 properties to compare.</p>}
    </>
  )
}
