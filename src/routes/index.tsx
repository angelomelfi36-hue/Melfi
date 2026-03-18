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
    { href: '#specialita', label: 'Specialità di Stagione' },
    { href: '#contatti', label: 'Contattaci' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-amber-950 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-1 relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Menu
            <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute top-12 right-0 bg-amber-950 border border-amber-800 rounded-xl shadow-2xl py-2 min-w-52">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-5 py-3 text-amber-100 hover:bg-amber-800 hover:text-white transition-colors text-sm">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-amber-950 border-t border-amber-800 pb-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-6 py-3 text-amber-100 hover:bg-amber-800 transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src="/hero-bg.webp" alt="Interno Panificio Melfi" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-amber-300 flex items-center justify-center bg-amber-900/60 p-3 shadow-xl">
             <img src="/logo-forno.png" alt="Logo Panificio Melfi" className="w-full h-full object-contain" />
          </div>
        </div>

        <p className="text-amber-300 text-sm font-lato tracking-[0.3em] uppercase mb-6">
          Dal 1952 · Tradizione Artigianale
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold leading-tight mb-6">
          Forno Artigianale
          <br />
          <span className="text-amber-300">Melfi</span>
        </h1>
        <p className="text-amber-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-lato font-light">
          Pane fragrante, dolci genuini e pasticceria tradizionale italiana.<br />
          Ogni giorno inforniamo con passione, rispettando le ricette di famiglia tramandate di generazione in generazione.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#prodotti" className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-4 rounded-full transition-colors text-lg">
            Scopri i Nostri Prodotti
          </a>
          <a href="#contatti" className="border-2 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-950 font-bold px-8 py-4 rounded-full transition-colors text-lg">
            Vieni a Trovarci
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Products section
───────────────────────────────────────────── */
const products = [
  { id: 1, name: 'Pane di Casa', description: 'Il nostro pane quotidiano: crosta croccante e lievito madre.', badge: 'Classico', image: '/prod-pane.webp' },
  { id: 2, name: 'Focaccia Genovese', description: 'Soffice e dorata, condita con olio extravergine d\'oliva.', badge: 'Più Amato', image: '/prod-focaccia.webp' },
  { id: 3, name: 'Cornetti Artigianali', description: 'Pasta sfoglia lavorata a mano, burro selezionato.', badge: 'Colazione', image: '/prod-cornetto.webp' },
  { id: 4, name: 'Torta della Nonna', description: 'Ricetta originale: pasta frolla e crema pasticcera.', badge: 'Tradizione', image: '/prod-torta.webp' },
  { id: 5, name: 'Biscotti al Burro', description: 'Biscotteria fine realizzata con burro di alta qualità.', badge: 'Pasticceria', image: '/prod-biscotti.webp' },
  { id: 6, name: 'Panettone Artigianale', description: 'Il nostro panettone stagionale con lievito madre.', badge: 'Stagionale', image: '/prod-panettone.webp' },
]

function ProductsSection() {
  return (
    <section id="prodotti" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-amber-950 font-bold mb-4">I Nostri Prodotti</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-md group">
              <div className="h-52 overflow-hidden bg-amber-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-amber-950 mb-2">{p.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   History section
───────────────────────────────────────────── */
function HistorySection() {
  const milestones = [
    { year: '1952', title: 'Le Origini', text: 'Nonno Giuseppe Melfi apre il primo forno.' },
    { year: '1971', title: 'La Crescita', text: 'Pietro Melfi introduce la pasticceria.' },
    { year: '1995', title: 'Nuovi Sapori', text: 'Apertura del secondo punto vendita.' },
    { year: 'Oggi', title: 'Tradizione Viva', text: 'La terza generazione custodisce le ricette.' },
  ]

  return (
    <section id="storia" className="py-24 bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">La Nostra Storia</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <img src="/history-forno.webp" alt="Storia" className="rounded-3xl shadow-xl" />
          <p className="text-amber-100 text-lg font-light leading-relaxed">
            Tutto è iniziato con una manciata di farina e il sogno di nonno Giuseppe. 
            Da tre generazioni, impastiamo con la stessa passione di una volta.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m) => (
            <div key={m.year} className="bg-amber-900/50 p-6 rounded-2xl border border-amber-800">
              <div className="text-amber-400 font-bold text-2xl mb-2">{m.year}</div>
              <div className="font-bold mb-2">{m.title}</div>
              <p className="text-sm text-amber-200/80">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
function BakeryHome() {
  return (
    <div className="bakery-site">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <HistorySection />
      <footer id="contatti" className="py-12 bg-stone-100 text-center">
        <p className="text-stone-500">© Panificio Melfi - Qualità dal 1952</p>
      </footer>
    </div>
  )
}
