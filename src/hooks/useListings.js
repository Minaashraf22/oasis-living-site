import { useEffect, useState } from 'react'
import { listings } from '../data.js'

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

export function useListings() {
  const [type, setType] = useState('All')
  const [maxPrice, setMaxPrice] = useState(13000000)
  const [beds, setBeds] = useState(0)
  const [sort, setSort] = useState('featured')
  const [favs, setFavs] = useState(() => load('ol-favs', []))
  const [cmp, setCmp] = useState([])
  const [showFavs, setShowFavs] = useState(false)
  useEffect(() => localStorage.setItem('ol-favs', JSON.stringify(favs)), [favs])

  let list = listings.filter(l => (type === 'All' || l.type === type) && l.price <= maxPrice && l.beds >= beds && (!showFavs || favs.includes(l.id)))
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
  if (sort === 'size') list = [...list].sort((a, b) => b.size - a.size)
  const toggle = (arr, set, id, max) => set(arr.includes(id) ? arr.filter(x => x !== id) : arr.length >= (max || 99) ? arr : [...arr, id])
  const types = ['All', ...new Set(listings.map(l => l.type))]
  return { type, setType, maxPrice, setMaxPrice, beds, setBeds, sort, setSort, favs, cmp, showFavs, setShowFavs, list, types,
    toggleFav: id => toggle(favs, setFavs, id), toggleCmp: id => toggle(cmp, setCmp, id, 3) }
}
