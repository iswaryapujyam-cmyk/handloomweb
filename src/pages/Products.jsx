import { useEffect, useMemo, useState } from 'react'
import productsData from '../data/products.json'
import { useGlobal } from '../context/GlobalContext.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Products() {
  const { selectedCategory, searchQuery, filters, setFilters } = useGlobal()
  const [visible, setVisible] = useState([])

  useEffect(() => {
    setVisible(productsData)
  }, [])

  const filtered = useMemo(() => {
    let list = visible
    if (selectedCategory !== 'All') list = list.filter(p => p.category === selectedCategory)
    if (searchQuery) list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    if (filters.color !== 'all') list = list.filter(p => (p.colors||[]).map(c=>c.toLowerCase()).includes(filters.color.toLowerCase()))
    if (filters.price !== 'all') {
      const [min,max] = filters.price.split('-').map(Number)
      list = list.filter(p => p.priceINR >= (min||0) && p.priceINR <= (max||Infinity))
    }
    if (filters.sort === 'price-asc') list = [...list].sort((a,b)=>a.priceINR-b.priceINR)
    if (filters.sort === 'price-desc') list = [...list].sort((a,b)=>b.priceINR-a.priceINR)
    return list
  }, [visible, selectedCategory, searchQuery, filters])

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <aside className="md:col-span-1 space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Categories</h3>
          <CategoryFilter />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Filters</h3>
          <div className="space-y-2">
            <select className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600" value={filters.price} onChange={(e)=>setFilters(f=>({...f, price: e.target.value}))}>
              <option value="all">All Prices</option>
              <option value="0-2000">Below ₹2000</option>
              <option value="2000-5000">₹2000 - ₹5000</option>
              <option value="5000-10000">₹5000 - ₹10000</option>
              <option value="10000-50000">₹10000 - ₹50000</option>
            </select>
            <select className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600" value={filters.color} onChange={(e)=>setFilters(f=>({...f, color: e.target.value}))}>
              <option value="all">All Colors</option>
              <option>Red</option>
              <option>Gold</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Black</option>
            </select>
            <select className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600" value={filters.sort} onChange={(e)=>setFilters(f=>({...f, sort: e.target.value}))}>
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </aside>
      <section className="md:col-span-3">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {filtered.length===0 && (
          <div className="text-center text-slate-500 py-20">No products found.</div>
        )}
      </section>
    </div>
  )
}


