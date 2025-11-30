import { Link } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext.jsx'
import useCurrency from '../hooks/useCurrency.js'
import ImageWithFallback from './ImageWithFallback.jsx'

export default function ProductCard({ product }) {
  const { toggleWishlist, addToCart, wishlist, language } = useGlobal()
  const { convert, format } = useCurrency()
  const isWish = wishlist.some(w => w.id === product.id)
  const inStock = product.stock > 0

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group relative fade-in">
      {/* Sale/Stock Badge */}
      {!inStock && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          {language === 'hi' ? 'खत्म' : 'SOLD OUT'}
        </div>
      )}
      
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
          <ImageWithFallback 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </Link>
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
            className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transform transition-all duration-300 hover:scale-110 ${isWish ? 'text-red-500' : 'text-gray-700'}`}
            aria-label={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWish ? '❤' : '♡'}
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product, 1) }}
            disabled={!inStock}
            className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transform transition-all duration-300 hover:scale-110 ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Add to cart"
          >
            🛒
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 bg-amber-100 text-amber-800">
          {product.category}
        </span>
        
        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors duration-200 line-clamp-2 h-12">
            {product.name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{format(convert(product.priceINR))}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">{format(convert(product.originalPrice))}</span>
            )}
          </div>
          
          {/* Color Swatches */}
          <div className="flex -space-x-1">
            {product.colors?.slice(0, 3).map((color, index) => (
              <span 
                key={index}
                className="w-4 h-4 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors?.length > 3 && (
              <span className="w-4 h-4 rounded-full bg-gray-100 text-[8px] flex items-center justify-center border">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart(product, 1)}
          disabled={!inStock}
          className={`mt-4 w-full py-2 px-4 rounded-full font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            inStock 
              ? 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-md' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {inStock 
            ? (language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart')
            : (language === 'hi' ? 'उपलब्ध नहीं' : 'Out of Stock')}
        </button>
      </div>
    </div>
  )
}


