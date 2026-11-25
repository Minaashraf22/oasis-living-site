import React, { useState } from 'react'
import { listings } from './data.js'
import { useListings } from './hooks/useListings.js'
import Filters from './components/Filters.jsx'
import ListingCard from './components/ListingCard.jsx'
import Compare from './components/Compare.jsx'
import DetailDialog from './components/DetailDialog.jsx'

export default function App() {
  const s = useListings()
  const [detail, setDetail] = useState(null)
  const sel = detail ? listings.find(l => l.id === detail) : null
  const { list } = s
  return (
    <div>
      <header><div className="brand"><img src="logo.svg" alt="" /><b>Oasis Living</b><small>real estate demo</small></div>
        <button className={'favbtn' + (s.showFavs ? ' on' : '')} onClick={() => s.setShowFavs(!s.showFavs)}>Saved ({s.favs.length})</button></header>
      <section className="hero"><h1>Find a home that fits your life.</h1><p>Fictional listings for a portfolio demo. Photos are AI-generated.</p></section>
      <Filters {...s} />
      <p className="count" data-testid="count">{list.length} {list.length === 1 ? 'property' : 'properties'}</p>
      <main className="grid">
        {list.map(l => <ListingCard key={l.id} l={l} fav={s.favs.includes(l.id)} inCmp={s.cmp.includes(l.id)}
          onFav={() => s.toggleFav(l.id)} onCmp={() => s.toggleCmp(l.id)} onOpen={() => setDetail(l.id)} />)}
        {!list.length && <p className="none">No properties match. Try a higher price or fewer filters.</p>}
      </main>
      {s.cmp.length >= 2 && <Compare ids={s.cmp} />}
      {sel && <DetailDialog key={sel.id} sel={sel} onClose={() => setDetail(null)} />}
      <footer>Oasis Living is a fictional agency for a portfolio demo.</footer>
    </div>
  )
}
