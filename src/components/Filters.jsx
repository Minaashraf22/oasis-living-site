import React from 'react'
import { egp } from '../finance.js'

export default function Filters({ types, type, setType, maxPrice, setMaxPrice, beds, setBeds, sort, setSort }) {
  return (
    <section className="filters">
      <div className="chips">{types.map(t => <button key={t} className={t === type ? 'chip on' : 'chip'} onClick={() => setType(t)}>{t}</button>)}</div>
      <label>Max price: <b>{egp(maxPrice)} EGP</b><input type="range" min="1000000" max="13000000" step="250000" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} aria-label="Max price" /></label>
      <label>Bedrooms
        <select value={beds} onChange={e => setBeds(+e.target.value)} aria-label="Bedrooms">{[0, 1, 2, 3, 4, 5].map(b => <option key={b} value={b}>{b === 0 ? 'Any' : b + '+'}</option>)}</select></label>
      <label>Sort
        <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="size">Largest first</option></select></label>
    </section>
  )
}
