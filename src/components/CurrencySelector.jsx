import { useGlobal } from '../context/GlobalContext.jsx'

export default function CurrencySelector() {
  const { currency, setCurrency } = useGlobal()
  return (
    <select
      aria-label="Currency"
      className="px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
      value={currency}
      onChange={(e)=>setCurrency(e.target.value)}
    >
      <option value="INR">INR</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
  )
}


