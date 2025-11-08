import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage.js'

const GlobalContext = createContext(null)

export function GlobalProvider({ children }) {
  // Preferences
  const [language, setLanguage] = useLocalStorage('hl_language', 'en') // 'en' | 'hi'
  const [currency, setCurrency] = useLocalStorage('hl_currency', 'INR') // 'INR' | 'USD' | 'EUR'
  const [theme, setTheme] = useLocalStorage('hl_theme', 'light') // 'light' | 'dark'

  // Store
  const [cart, setCart] = useLocalStorage('hl_cart', [])
  const [wishlist, setWishlist] = useLocalStorage('hl_wishlist', [])
  const [selectedCategory, setSelectedCategory] = useLocalStorage('hl_category', 'All')
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('hl_recent', [])

  // Search & filters
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ price: 'all', color: 'all', sort: 'relevance' })

  // Currency rates
  const [rates, setRates] = useLocalStorage('hl_rates', { USD: 0.012, EUR: 0.011, INR: 1 })
  const [isRatesLoading, setIsRatesLoading] = useState(false)
  const [ratesError, setRatesError] = useState('')

  const isMountedRef = useRef(false)

  // Theme effect
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  // Fetch currency conversion rates (INR base)
  const fetchRates = async () => {
    try {
      setIsRatesLoading(true)
      setRatesError('')
      const { data } = await axios.get('https://api.exchangerate.host/latest', {
        params: { base: 'INR', symbols: 'USD,EUR,INR' },
      })
      if (data && data.rates) {
        setRates({
          USD: data.rates.USD ?? rates.USD,
          EUR: data.rates.EUR ?? rates.EUR,
          INR: 1,
        })
      }
    } catch (err) {
      setRatesError('Failed to fetch rates. Using cached values.')
    } finally {
      setIsRatesLoading(false)
    }
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      fetchRates()
    }
  }, [])

  // Cart operations
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => (p.id === product.id ? { ...p, qty: Math.min((p.qty || 1) + qty, product.stock || 99) } : p))
      }
      return [...prev, { ...product, qty }]
    })
  }

  const updateCartQty = (productId, qty) => {
    setCart(prev => prev.map(p => (p.id === productId ? { ...p, qty } : p)))
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId))
  }

  const clearCart = () => setCart([])

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id)
      if (exists) return prev.filter(p => p.id !== product.id)
      return [...prev, product]
    })
  }

  // Recently viewed
  const pushRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id)
      const next = [product, ...filtered].slice(0, 10)
      return next
    })
  }

  const totals = useMemo(() => {
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0)
    const subtotalINR = cart.reduce((sum, item) => sum + (item.priceINR * (item.qty || 1)), 0)
    return { count, subtotalINR }
  }, [cart])

  const value = {
    // prefs
    language, setLanguage,
    currency, setCurrency,
    theme, setTheme,

    // store
    cart, addToCart, updateCartQty, removeFromCart, clearCart,
    wishlist, toggleWishlist,
    selectedCategory, setSelectedCategory,
    recentlyViewed, pushRecentlyViewed,

    // search/filters
    searchQuery, setSearchQuery,
    filters, setFilters,

    // currency
    rates, isRatesLoading, ratesError, fetchRates,

    // totals
    totals,
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobal = () => useContext(GlobalContext)


