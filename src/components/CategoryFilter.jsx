import { useGlobal } from '../context/GlobalContext.jsx'

const CATEGORIES = [
  'All',
  // Women's Categories
  'Sarees',
  'Ethnic Wear',
  'Women\'s Western Wear',
  'Women\'s Kurthi Sets',
  'Dupattas',
  'Shawls & Stoles',
  'Scarves',
  // Men's Categories
  'Men\'s Shirts',
  'Men\'s Pants',
  'Men\'s Belts',
  // Kids Category
  'Kids Wear',
  // Accessories
  'Bags',
  'Clutches',
  'College Bags',
  'Baskets',
  'Water Bottle Holders',
  // Other Categories
  'Fabrics',
  'Home Décor'
]

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useGlobal()
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={()=>setSelectedCategory(cat)}
          className={`px-3 py-1.5 rounded border ${selectedCategory===cat? 'bg-handloom-gold text-white border-handloom-gold':'border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >{cat}</button>
      ))}
    </div>
  )
}


