import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productsData from '../data/products.json'
import { useGlobal } from '../context/GlobalContext.jsx'
import useCurrency from '../hooks/useCurrency.js'
import ProductCard from '../components/ProductCard.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const product = productsData.find(p => String(p.id) === String(id))
  const { addToCart, toggleWishlist, wishlist, pushRecentlyViewed } = useGlobal()
  const { convert, format } = useCurrency()

  useEffect(() => {
    if (product) pushRecentlyViewed(product)
  }, [id])

  if (!product) return <div>Product not found.</div>
  const isWish = wishlist.some(w => w.id === product.id)
  const related = productsData.filter(p => p.category === product.category && p.id !== product.id).slice(0,4)

  return (
    <div className="space-y-8">
      <section className="grid md:grid-cols-2 gap-6">
        <ImageWithFallback src={product.image} alt={product.name} className="w-full rounded border border-slate-200 dark:border-slate-700" />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-slate-500">{product.category}</div>
          <div className="mt-2 text-xl font-semibold">{format(convert(product.priceINR))}</div>
          <p className="mt-4 text-slate-700 dark:text-slate-200">{product.description}</p>
          <div className="mt-4 flex items-center gap-2">{product.colors?.map(c=> (
            <span key={c} title={c} className="h-4 w-4 rounded-full border" style={{ background: c.toLowerCase() }} />
          ))}</div>
          <div className="mt-6 flex gap-3">
            <button onClick={()=>addToCart(product,1)} className="px-5 py-2 rounded bg-handloom-teal text-white hover:opacity-90">Add to Cart</button>
            <button onClick={()=>toggleWishlist(product)} className={`px-5 py-2 rounded border ${isWish?'border-handloom-red text-handloom-red':'border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{isWish?'Wishlisted':'Add to Wishlist'}</button>
          </div>
        </div>
      </section>

      {related.length>0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">You might also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}


