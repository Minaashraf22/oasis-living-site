import React from 'react'
import { egp } from '../finance.js'

export default function ListingCard({ l, fav, inCmp, onFav, onCmp, onOpen }) {
  return (
    <article className="card">
      <div className="ph" onClick={onOpen}><img src={l.img} alt={l.title} loading="lazy" /><span className="tag">{l.type}</span></div>
      <div className="body">
        <div className="top"><h3>{l.title}</h3><button className={'heart' + (fav ? ' on' : '')} aria-label={'Save ' + l.title} onClick={onFav}>♥</button></div>
        <p className="area">{l.area}</p><p className="price">{egp(l.price)} EGP</p>
        <p className="facts">{l.beds} bd · {l.baths} ba · {l.size} m²</p>
        <div className="act"><button onClick={onOpen}>Details</button>
          <label className="cmp"><input type="checkbox" checked={inCmp} onChange={onCmp} />Compare</label></div>
      </div>
    </article>
  )
}
