import { Link, useNavigate } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext.jsx'
import CartItem from '../components/CartItem.jsx'
import useCurrency from '../hooks/useCurrency.js'

export default function Cart() {
  const { cart, updateCartQty, removeFromCart, totals } = useGlobal()
  const { convert, format } = useCurrency()
  const navigate = useNavigate()

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <section className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length===0 && (
          <div className="py-16 text-center text-slate-500">
            Cart is empty. <Link to="/products" className="text-handloom-teal underline">Browse products</Link>
          </div>
        )}
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onQty={(qty)=>updateCartQty(item.id, qty)}
            onRemove={()=>removeFromCart(item.id)}
          />
        ))}
      </section>
      <aside className="md:col-span-1 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-fit">
        <h2 className="font-semibold mb-3">Order Summary</h2>
        <div className="flex justify-between text-sm mb-1"><span>Items</span><span>{totals.count}</span></div>
        <div className="flex justify-between text-sm mb-1"><span>Subtotal</span><span>{format(convert(totals.subtotalINR))}</span></div>
        <div className="flex justify-between text-sm mb-1"><span>Shipping</span><span>{format(0)}</span></div>
        <div className="flex justify-between font-semibold mt-2 border-t border-slate-200 dark:border-slate-700 pt-2">
          <span>Total</span><span>{format(convert(totals.subtotalINR))}</span>
        </div>
        <button disabled={cart.length===0} onClick={()=>navigate('/checkout')} className="mt-4 w-full px-4 py-2 rounded bg-handloom-red text-white disabled:opacity-50">Proceed to Checkout</button>
      </aside>
    </div>
  )
}


