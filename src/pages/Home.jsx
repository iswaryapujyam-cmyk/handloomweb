import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGlobal } from '../context/GlobalContext.jsx'
import productsData from '../data/products.json'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const { recentlyViewed, language } = useGlobal()
  const featured = productsData.slice(0, 8)

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl overflow-hidden bg-gradient-to-r from-handloom-cream to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700"
      >
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {language==='hi' ? 'भारतीय हैंडलूम की खूबसूरती' : 'Celebrate the Beauty of Indian Handlooms'}
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {language==='hi' ? 'हाथ से बुने प्रामाणिक शिल्प और वस्त्र, अब वैश्विक खरीदारों के लिए।' : 'Authentic handwoven crafts and textiles, curated for global buyers.'}
            </p>
            <div className="mt-5 flex gap-3">
              <Link to="/products" className="px-5 py-2 rounded bg-handloom-red text-white hover:opacity-90">{language==='hi'?'खरीदारी शुरू करें':'Shop Now'}</Link>
              <Link to="/about" className="px-5 py-2 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">{language==='hi'?'और जानें':'Learn More'}</Link>
            </div>
          </div>
          <div className="relative bg-[url('https://images.unsplash.com/photo-1625180262882-b6a2a26c6f0e?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center min-h-[220px]"></div>
        </div>
      </motion.section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{language==='hi'?'विशेष उत्पाद':'Featured Products'}</h2>
          <Link to="/products" className="text-handloom-teal hover:underline">{language==='hi'?'सभी देखें':'View all'}</Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {recentlyViewed?.length>0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">{language==='hi'?'हाल ही में देखे गए':'Recently Viewed'}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentlyViewed.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}


