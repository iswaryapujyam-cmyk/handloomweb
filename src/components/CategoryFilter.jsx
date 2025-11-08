import { useGlobal } from '../context/GlobalContext.jsx'

const CATEGORIES = ['All','Sarees','Ethnic Wear','Dupattas','Shawls & Stoles','Fabrics','Bags','Scarves','Home Décor']

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


