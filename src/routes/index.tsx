import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: BakeryHome,
})

/* ─────────────────────────────────────────────
    Navigation
───────────────────────────────────────────── */
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
    { href: '#contatti', label: 'Contattaci' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-amber-950 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-playfair text-white text-2xl font-bold tracking-wide">Panificio Melfi</a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-amber-100 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider">
              {l.label}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────
    Hero Section
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-amber-900 text-center px-6">
      <div className="relative z-10">
        <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold mb-6">Forno Artigianale <span className="text-amber-300">Melfi</span></h1>
        <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-10">Pane fragrante e dolci genuini, rispettando le ricette di famiglia dal 1952.</p>
        <a href="#prodotti" className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-4 rounded-full transition-all">Scopri i Prodotti</a>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
    Products Section
───────────────────────────────────────────── */
const products = [
  { id: 1, name: 'Pane di Casa', description: "Crosta croccante e lievito madre.", badge: 'Classico' },
  { id: 2, name: 'Focaccia Genovese', description: "Olio extravergine e sale grosso.", badge: 'Top' },
  { id: 3, name: 'Torta della Nonna', description: "Crema pasticcera e pinoli.", badge: 'Tradizione' },
]

function ProductsSection() {
  return (
    <section id="prodotti" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center font-playfair text-4xl font-bold mb-12">I Nostri Prodotti</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <span className="text-amber-600 font-bold text-xs uppercase">{p.badge}</span>
              <h3 className="text-xl font-bold my-2">{p.name}</h3>
              <p className="text-stone-500">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
    History Section
───────────────────────────────────────────── */
function HistorySection() {
  const milestones = [
    { year: '1952', title: 'Le Origini', text: 'Nonno Giuseppe apre il primo forno.' },
    { year: '1971', title: 'La Crescita', text: "Nasce la pasticceria artigianale." },
    { year: 'Oggi', title: 'Tradizione Viva', text: "La terza generazione porta avanti il sogno." },
  ]

  return (
    <section id="storia" className="py-20 bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-4xl font-bold mb-12">La Nostra Storia</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {milestones.map((m) => (
            <div key={m.year} className="p-6 border border-amber-800 rounded-xl">
              <div className="text-amber-400 text-2xl font-bold mb-2">{m.year}</div>
              <h3 className="font-bold mb-2">{m.title}</h3>
              <p className="text-amber-200 text-sm">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
    Main Component (L'INSIEME DI TUTTO)
───────────────────────────────────────────── */
export default function BakeryHome() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <HistorySection />
      <footer className="bg-stone-900 text-white py-10 text-center">
        <p>© {new Date().getFullYear()} Panificio Melfi. Artigiani del gusto.</p>
      </footer>
    </div>
  )
}
