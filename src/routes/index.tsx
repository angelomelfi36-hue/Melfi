import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: BakeryHome,
})

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#prodotti', label: 'I Nostri Prodotti' },
    { href: '#storia', label: 'La Nostra Storia' },
    { href: '#specialita', label: 'Specialità di Stagione' },
    { href: '#contatti', label: 'Contattaci' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-amber-950 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
        <div className="hidden md:flex items-center gap-1 relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Menu
            <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute top-12 right-0 bg-amber-950 border border-amber-800 rounded-xl shadow-2xl py-2 min-w-52 text-right">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-5 py-3 text-amber-100 hover:bg-amber-800 hover:text-white transition-colors text-sm font-medium">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-amber-950 border-t border-amber-800">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-6 py-4 text-amber-100 border-b border-amber-900/50">{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src="/hero-bg.webp" alt="Sfondo" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-amber-300 flex items-center justify-center bg-amber-900/60 p-3 shadow-xl">
             <img src="/logo-forno.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        <p className="text-amber-300 text-sm tracking-[0.3em] uppercase mb-6">Dal 1952 · Tradizione Artigianale</p>
        <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold leading-tight mb-6">Forno Artigianale<br /><span className="text-amber-300">Melfi</span></h1>
        <p className="text-amber-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">Pane fragrante, dolci genuini e pasticceria tradizionale ogni giorno.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#prodotti" className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-4 rounded-full text-lg">I Nostri Prodotti</a>
          <a href="#contatti" className="border-2 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-950 font-bold px-8 py-4 rounded-full text-lg">Vieni a Trovarci</a>
        </div>
      </div>
    </section>
  )
}

function ProductsSection() {
  const products = [
    { id: 1, name: 'Pane di Casa', desc: 'Crosta croccante e lievito madre.', image: '/prod-pane.webp' },
    { id: 2, name: 'Focaccia Genovese', desc: 'Soffice, dorata e con olio EVO.', image: '/prod-focaccia.webp' },
    { id: 3, name: 'Cornetti Artigianali', desc: 'Sfoglia lavorata a mano e burro.', image: '/prod-cornetto.webp' }
  ]
  return (
    <section id="prodotti" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-4xl text-amber-950 font-bold mb-12">I Nostri Prodotti</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-200">
              <img src={p.image} className="h-52 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-xl text-amber-950 mb-2">{p.name}</h3>
                <p className="text-stone-500 text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HistorySection() {
  return (
    <section id="storia" className="py-24 bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-4xl font-bold mb-8">La Nostra Storia</h2>
        <p className="max-w-2xl mx-auto text-amber-100 font-light leading-relaxed mb-12">Dal 1952, tre generazioni di passione per il pane artigianale.</p>
        <div className="grid md:grid-cols-2 gap-8 items-center text-left">
          <img src="/history-forno.webp" className="rounded-3xl border-4 border-amber-800" />
          <div className="bg-amber-900/50 p-8 rounded-3xl border border-amber-800">
            <h3 className="text-amber-400 font-bold text-2xl mb-4">Un'eredità di sapore</h3>
            <p className="text-amber-100 font-light italic">"Impastiamo ogni giorno con la stessa passione insegnataci dai nostri nonni."</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BakeryHome() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <HistorySection />
      <footer id="contatti" className="py-12 bg-amber-950 text-amber-200 text-center">
        <p>© 2024 Panificio Melfi - Tradizione e Passione</p>
      </footer>
    </main>
  )
}
