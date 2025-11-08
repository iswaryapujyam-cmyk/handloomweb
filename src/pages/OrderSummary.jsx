import { Link } from 'react-router-dom'
import useCurrency from '../hooks/useCurrency.js'

export default function OrderSummary() {
  const orderRaw = sessionStorage.getItem('hl_last_order')
  const order = orderRaw ? JSON.parse(orderRaw) : null
  const { convert, format } = useCurrency()

  if (!order) return (
    <div className="text-center py-20">
      <div className="text-slate-500 mb-4">No recent order found.</div>
      <Link to="/products" className="text-handloom-teal underline">Continue shopping</Link>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Thank you for your purchase!</h1>
      <div className="text-slate-500 mb-6">Order ID: {order.id}</div>
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between text-sm mb-1">
            <span>{item.name} × {item.qty||1}</span>
            <span>{format(convert(item.priceINR*(item.qty||1)))}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold mt-2 border-t border-slate-200 dark:border-slate-700 pt-2">
          <span>Total</span><span>{format(convert(order.totalINR))}</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <Link to="/products" className="px-5 py-2 rounded bg-handloom-teal text-white">Continue Shopping</Link>
      </div>
    </div>
  )
}


