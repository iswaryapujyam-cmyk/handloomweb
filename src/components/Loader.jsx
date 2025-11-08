export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-5 w-5 mr-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></div>
      <span className="text-slate-500">{label}</span>
    </div>
  )
}


