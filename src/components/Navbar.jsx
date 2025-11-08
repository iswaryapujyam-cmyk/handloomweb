import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext.jsx'
import SearchBar from './SearchBar.jsx'
import LanguageSelector from './LanguageSelector.jsx'
import CurrencySelector from './CurrencySelector.jsx'

export default function Navbar() {
  const { totals, theme, setTheme, language } = useGlobal()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          {/* Logo image placed in public as /logo.png */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src="/logo.png" className="h-8 w-8 rounded object-cover" onError={(e)=>{e.currentTarget.style.display='none'}} />
          <span className="font-bold text-lg">Handloom Store</span>
        </Link>
        <nav className="ml-6 hidden md:flex gap-4 text-sm">
          <NavLink to="/" className={({isActive})=>isActive? 'font-semibold text-handloom-gold':'hover:text-handloom-gold'}>Home</NavLink>
          <NavLink to="/products" className={({isActive})=>isActive? 'font-semibold text-handloom-gold':'hover:text-handloom-gold'}>Products</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive? 'font-semibold text-handloom-gold':'hover:text-handloom-gold'}>{language==='hi'?'हैंडलूम':'About'}</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive? 'font-semibold text-handloom-gold':'hover:text-handloom-gold'}>{language==='hi'?'संपर्क':'Contact'}</NavLink>
        </nav>
        <div className="flex-1" />
        <div className="hidden md:block w-80"><SearchBar /></div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <CurrencySelector />
          <button
            aria-label="Toggle theme"
            className="px-3 py-1 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={()=>setTheme(theme==='dark'?'light':'dark')}
          >{theme==='dark'?'🌙':'☀️'}</button>
          <button onClick={()=>navigate('/wishlist')} className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">❤</button>
          <button onClick={()=>navigate('/cart')} className="relative px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
            🛒
            {totals.count>0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-handloom-red text-white rounded-full px-1.5 py-0.5">{totals.count}</span>
            )}
          </button>
        </div>
      </div>
      <div className="md:hidden container mx-auto px-4 pb-3"><SearchBar /></div>
    </header>
  )
}


