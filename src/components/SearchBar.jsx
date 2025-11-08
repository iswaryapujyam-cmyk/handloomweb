import { useRef } from 'react'
import { useGlobal } from '../context/GlobalContext.jsx'

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useGlobal()
  const ref = useRef(null)
  return (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        placeholder="Search handloom products..."
        className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-handloom-gold"
      />
      <span className="absolute left-2 top-2.5 text-slate-400">🔎</span>
    </div>
  )
}


