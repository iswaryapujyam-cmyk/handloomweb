import useCurrency from '../hooks/useCurrency.js'
import ImageWithFallback from './ImageWithFallback.jsx'

export default function CartItem({ item, onQty, onRemove }) {
  const { convert, format } = useCurrency()
  return (
    <div className="flex gap-3 py-3 border-b border-slate-200 dark:border-slate-700">
      <ImageWithFallback src={item.image} alt={item.name} className="h-20 w-28 object-cover rounded" />
      <div className="flex-1">
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm text-slate-500">{item.category}</div>
        <div className="mt-1">{format(convert(item.priceINR * (item.qty||1)))}</div>
        <div className="mt-2 flex items-center gap-2">
          <select value={item.qty||1} onChange={(e)=>onQty(Number(e.target.value))} className="px-2 py-1 rounded border border-slate-300 dark:border-slate-600">
            {Array.from({length: Math.min(10, item.stock||10)}).map((_,i)=> (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
          <button onClick={onRemove} className="px-3 py-1.5 rounded border border-red-400 text-red-600 hover:bg-red-50">Remove</button>
        </div>
      </div>
    </div>
  )
}


