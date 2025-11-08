import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      {submitted ? (
        <div className="p-3 rounded border border-green-300 text-green-700">Thanks! We will get back to you soon.</div>
      ) : (
        <form onSubmit={(e)=>{e.preventDefault(); setSubmitted(true)}} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea value={form.message} onChange={(e)=>setForm(f=>({...f,message:e.target.value}))} className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" rows={4} required />
          </div>
          <button className="px-5 py-2 rounded bg-handloom-teal text-white">Send</button>
        </form>
      )}
    </div>
  )
}


