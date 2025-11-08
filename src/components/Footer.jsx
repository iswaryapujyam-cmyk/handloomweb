export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-6 text-sm grid md:grid-cols-3 gap-4">
        <div>
          <div className="font-semibold mb-2">About</div>
          <p className="text-slate-600 dark:text-slate-300">Promoting Indian handloom heritage to global buyers with authentic crafts.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300">
            <li>Shipping & Returns</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <p className="text-slate-600 dark:text-slate-300">support@handloomweb.example</p>
        </div>
      </div>
      <div className="text-center text-xs py-3 text-slate-500">© {new Date().getFullYear()} Handloom Store</div>
    </footer>
  )
}


