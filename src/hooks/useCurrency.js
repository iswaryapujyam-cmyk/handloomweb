import { useMemo } from 'react'
import { useGlobal } from '../context/GlobalContext.jsx'

export default function useCurrency() {
  const { currency, rates } = useGlobal()

  const convert = useMemo(() => {
    return (priceINR) => {
      const rate = rates?.[currency] ?? 1
      return priceINR * rate
    }
  }, [currency, rates])

  const format = useMemo(() => {
    return (amount) => {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
    }
  }, [currency])

  return { currency, convert, format }
}


