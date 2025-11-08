import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext.jsx'
import useCurrency from '../hooks/useCurrency.js'

export default function Checkout() {
  const { cart, totals, clearCart } = useGlobal()
  const { convert, format } = useCurrency()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', address:'', country:'', payment:'COD' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.address || !form.country) {
      setError('Please fill all required fields.')
      return
    }
    const order = {
      id: 'HL'+Date.now(),
      items: cart,
      totalINR: totals.subtotalINR,
      customer: form,
      placedAt: new Date().toISOString(),
    }
    sessionStorage.setItem('hl_last_order', JSON.stringify(order))
    clearCart()
    navigate('/order-summary')
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        {error && <div className="p-2 rounded bg-red-50 text-red-700 border border-red-200">{error}</div>}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Country</label>
            <input value={form.country} onChange={(e)=>setForm(f=>({...f,country:e.target.value}))} className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Address</label>
            <textarea value={form.address} onChange={(e)=>setForm(f=>({...f,address:e.target.value}))} className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" rows={3} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Payment Mode</label>
            <select value={form.payment} onChange={(e)=>setForm(f=>({...f,payment:e.target.value}))} className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
              <option>COD</option>
              <option>Card</option>
              <option>UPI</option>
            </select>
          </div>
        </div>
        <button type="submit" className="px-5 py-2 rounded bg-handloom-red text-white">Place Order</button>
      </form>
      <aside className="md:col-span-1 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-fit">
        <h2 className="font-semibold mb-3">Order Summary</h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between text-sm mb-1">
            <span>{item.name} × {item.qty||1}</span>
            <span>{format(convert(item.priceINR*(item.qty||1)))}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold mt-2 border-t border-slate-200 dark:border-slate-700 pt-2">
          <span>Total</span><span>{format(convert(totals.subtotalINR))}</span>
        </div>
      </aside>
    </div>
  )
}


