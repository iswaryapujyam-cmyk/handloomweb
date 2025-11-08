import { Link } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext.jsx'
import useCurrency from '../hooks/useCurrency.js'
import ImageWithFallback from './ImageWithFallback.jsx'

export default function ProductCard({ product }) {
  const { toggleWishlist, addToCart, wishlist, language } = useGlobal()
  const { convert, format } = useCurrency()
  const isWish = wishlist.some(w => w.id === product.id)

  return (
    <div className="group border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 flex flex-col">
      <Link to={`/product/${product.id}`} className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
        <ImageWithFallback src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </Link>
      <div className="p-3 flex-1 flex flex-col">
        <Link to={`/product/${product.id}`} className="font-semibold line-clamp-1 hover:text-handloom-gold">{product.name}</Link>
        <div className="text-sm text-slate-500">{product.category}</div>
        <div className="mt-1 font-semibold">{format(convert(product.priceINR))}</div>
        <div className="mt-2 flex items-center gap-2">
          {product.colors?.slice(0,4).map(c => (
            <span key={c} title={c} className="h-3 w-3 rounded-full border" style={{ background: c.toLowerCase() }} />
          ))}
        </div>
        <div className="mt-auto pt-3 flex items-center gap-2">
          <button onClick={()=>addToCart(product,1)} className="flex-1 px-3 py-1.5 rounded bg-handloom-teal text-white hover:opacity-90">{language==='hi'?'कार्ट में जोड़ें':'Add to Cart'}</button>
          <button aria-label="wishlist" onClick={()=>toggleWishlist(product)} className={`px-3 py-1.5 rounded border ${isWish?'border-handloom-red text-handloom-red':'border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>❤</button>
        </div>
      </div>
    </div>
  )
}


