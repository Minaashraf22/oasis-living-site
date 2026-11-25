import React, { useEffect, useState } from 'react'
import { listings } from './data.js'
import { monthly, egp } from './finance.js'

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

export default function App() {
  const [type, setType] = useState('All')
  const [maxPrice, setMaxPrice] = useState(13000000)
  const [beds, setBeds] = useState(0)
  const [sort, setSort] = useState('featured')
  const [favs, setFavs] = useState(() => load('ol-favs', []))
  const [cmp, setCmp] = useState([])
  const [detail, setDetail] = useState(null)
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(22)
  const [years, setYears] = useState(15)
  const [showFavs, setShowFavs] = useState(false)
  useEffect(() => localStorage.setItem('ol-favs', JSON.stringify(favs)), [favs])

  let list = listings.filter(l => (type === 'All' || l.type === type) && l.price <= maxPrice && l.beds >= beds && (!showFavs || favs.includes(l.id)))
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
  if (sort === 'size') list = [...list].sort((a, b) => b.size - a.size)
  const toggle = (arr, set, id, max) => set(arr.includes(id) ? arr.filter(x => x !== id) : arr.length >= (max || 99) ? arr : [...arr, id])
  const types = ['All', ...new Set(listings.map(l => l.type))]

  const sel = detail ? listings.find(l => l.id === detail) : null
  const dp = Math.min(90, Math.max(0, Number(down) || 0))
  const loan = sel ? sel.price * (1 - dp / 100) : 0
  const pay = sel ? monthly(loan, rate, years) : 0

  return (
    <div>
      <header><div className="brand"><img src="logo.svg" alt="" /><b>Oasis Living</b><small>real estate demo</small></div>
        <button className={'favbtn' + (showFavs ? ' on' : '')} onClick={() => setShowFavs(!showFavs)}>Saved ({favs.length})</button></header>
      <section className="hero"><h1>Find a home that fits your life.</h1><p>Fictional listings for a portfolio demo. Photos are AI-generated.</p></section>
      <section className="filters">
        <div className="chips">{types.map(t => <button key={t} className={t === type ? 'chip on' : 'chip'} onClick={() => setType(t)}>{t}</button>)}</div>
        <label>Max price: <b>{egp(maxPrice)} EGP</b><input type="range" min="1000000" max="13000000" step="250000" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} aria-label="Max price" /></label>
        <label>Bedrooms
          <select value={beds} onChange={e => setBeds(+e.target.value)} aria-label="Bedrooms">{[0, 1, 2, 3, 4, 5].map(b => <option key={b} value={b}>{b === 0 ? 'Any' : b + '+'}</option>)}</select></label>
        <label>Sort
          <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="size">Largest first</option></select></label>
      </section>
      <p className="count" data-testid="count">{list.length} {list.length === 1 ? 'property' : 'properties'}</p>
      <main className="grid">
        {list.map(l => (
          <article className="card" key={l.id}>
            <div className="ph" onClick={() => setDetail(l.id)}><img src={l.img} alt={l.title} loading="lazy" /><span className="tag">{l.type}</span></div>
            <div className="body">
              <div className="top"><h3>{l.title}</h3><button className={'heart' + (favs.includes(l.id) ? ' on' : '')} aria-label={'Save ' + l.title} onClick={() => toggle(favs, setFavs, l.id)}>♥</button></div>
              <p className="area">{l.area}</p><p className="price">{egp(l.price)} EGP</p>
              <p className="facts">{l.beds} bd · {l.baths} ba · {l.size} m²</p>
              <div className="act"><button onClick={() => setDetail(l.id)}>Details</button>
                <label className="cmp"><input type="checkbox" checked={cmp.includes(l.id)} onChange={() => toggle(cmp, setCmp, l.id, 3)} />Compare</label></div>
            </div>
          </article>))}
        {!list.length && <p className="none">No properties match. Try a higher price or fewer filters.</p>}
      </main>

      {cmp.length >= 2 && <section className="compare" aria-label="Comparison"><h2>Compare ({cmp.length}/3)</h2>
        <table><thead><tr><th /> {cmp.map(id => <th key={id}>{listings.find(l => l.id === id).title}</th>)}</tr></thead><tbody>
          {[['Price (EGP)', l => egp(l.price)], ['Bedrooms', l => l.beds], ['Size (m²)', l => l.size], ['Price per m²', l => egp(l.price / l.size)]].map(([n, f]) =>
            <tr key={n}><td>{n}</td>{cmp.map(id => <td key={id}>{f(listings.find(l => l.id === id))}</td>)}</tr>)}</tbody></table></section>}
      {cmp.length === 3 && <p className="hint">Maximum of 3 properties to compare.</p>}

      {sel && <div className="modal" onClick={() => setDetail(null)}><div className="dlg" role="dialog" aria-label={sel.title} onClick={e => e.stopPropagation()}>
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
          <button className="close" onClick={() => setDetail(null)}>Close</button>
        </div></div></div>}
      <footer>Oasis Living is a fictional agency for a portfolio demo.</footer>
    </div>
  )
}
