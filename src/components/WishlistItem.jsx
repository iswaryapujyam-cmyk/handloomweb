import { Link } from 'react-router-dom'
import useCurrency from '../hooks/useCurrency.js'
import ImageWithFallback from './ImageWithFallback.jsx'

export default function WishlistItem({ item, onRemove, onAddToCart }) {
  const { convert, format } = useCurrency()
  return (
    <div className="flex gap-3 py-3 border-b border-slate-200 dark:border-slate-700">
      <ImageWithFallback src={item.image} alt={item.name} className="h-20 w-28 object-cover rounded" />
      <div className="flex-1">
        <Link to={`/product/${item.id}`} className="font-semibold hover:text-handloom-gold">{item.name}</Link>
        <div className="text-sm text-slate-500">{item.category}</div>
        <div className="mt-1">{format(convert(item.priceINR))}</div>
        <div className="mt-2 flex items-center gap-2">
          <button onClick={onAddToCart} className="px-3 py-1.5 rounded bg-handloom-teal text-white hover:opacity-90">Add to Cart</button>
          <button onClick={onRemove} className="px-3 py-1.5 rounded border border-red-400 text-red-600 hover:bg-red-50">Remove</button>
        </div>
      </div>
    </div>
  )
}


