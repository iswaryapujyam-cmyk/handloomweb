import { useGlobal } from '../context/GlobalContext.jsx'

export default function LanguageSelector() {
  const { language, setLanguage } = useGlobal()
  return (
    <select
      aria-label="Language"
      className="px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
      value={language}
      onChange={(e)=>setLanguage(e.target.value)}
    >
      <option value="en">EN</option>
      <option value="hi">हिं</option>
    </select>
  )
}


