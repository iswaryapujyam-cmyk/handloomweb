import { Link } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext.jsx'
import WishlistItem from '../components/WishlistItem.jsx'

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useGlobal()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {wishlist.length===0 && (
        <div className="py-16 text-center text-slate-500">No items yet. <Link to="/products" className="text-handloom-teal underline">Explore products</Link></div>
      )}
      {wishlist.map(item => (
        <WishlistItem
          key={item.id}
          item={item}
          onRemove={()=>toggleWishlist(item)}
          onAddToCart={()=>addToCart(item,1)}
        />
      ))}
    </div>
  )
}


