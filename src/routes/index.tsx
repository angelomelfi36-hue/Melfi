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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-amber-950 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-playfair text-white text-2xl font-bold tracking-wide">Panificio Melfi</a>
        <div className="hidden md:flex items-center gap-1 relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Menu
            <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute top-12 right-0 bg-amber-950 border border-amber-800 rounded-xl shadow-2xl py-2 min-w-52">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-5 py-3 text-amber-100 hover:bg-amber-800 hover:text-white transition-colors text-sm">{l.label}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-amber-900">
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-amber-300 text-sm font-lato tracking-[0.3em] uppercase mb-4">Dal 1952 · Tradizione Artigianale</p>
        <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold mb-6">Forno Artigianale<br /><span className="text-amber-300">Melfi</span></h1>
        <p className="text-amber-100 text-lg md:text-xl mb-10 font-lato font-light">Pane fragrante, dolci genuini e pasticceria tradizionale italiana. Ogni giorno inforniamo con passione.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#prodotti" className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-4 rounded-full transition-colors">Scopri i Prodotti</a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Products Section
───────────────────────────────────────────── */
const products = [
  { id: 1, name: 'Pane di Casa', description: "Il nostro pane quotidiano: crosta croccante, mollica soffice e profumo irresistibile di lievito madre.", badge: 'Classico' },
  { id: 2, name: 'Focaccia Genovese', description: "Soffice e dorata, condita con olio extravergine d'oliva e sale grosso. Perfetta per ogni momento.", badge: 'Più Amato' },
  { id: 3, name: 'Cornetti Artigianali', description: "Pasta sfoglia lavorata a mano, burro selezionato, farcitura di crema o cioccolato.", badge: 'Colazione' },
  { id: 4, name: 'Torta della Nonna', description: "La ricetta originale di nonna Maria: pasta frolla friabile, crema pasticcera e pinoli.", badge: 'Tradizione' },
]

function ProductsSection() {
  return (
    <section id="prodotti" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-4xl text-center text-amber-950 font-bold mb-12">I Nostri Prodotti</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-3xl shadow-md border border-stone-100">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>
              <h3 className="font-playfair text-xl font-bold text-amber-950 mt-4 mb-2">{p.name}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{p.description}</p>
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
    {
      year: '1952',
      title: 'Le Origini',
      text: 'Nonno Giuseppe Bianchi apre il primo forno in via della Fornace, nel cuore del borgo antico. Con farina locale e lievito madre, inizia una storia di pane e passione.',
    },
    {
      year: '1971',
      title: 'La Crescita',
      text: "La seconda generazione, con Pietro Bianchi, amplia l'attività introducendo la pasticceria artigianale. Nascono le ricette di biscotti e crostate.",
    },
    {
      year: '1995',
      title: 'Nuovi Sapori',
      text: 'Apertura del secondo punto vendita. La famiglia Bianchi inizia a partecipare alle fiere gastronomiche regionali.',
    },
    {
      year: 'Oggi',
      title: 'Tradizione Viva',
      text: "La terza generazione custodisce con orgoglio le ricette di famiglia e le arricchisce con tecniche moderne, mantenendo l'anima artigianale che da sempre ci distingue.",
    }
  ]

  return (
    <section id="storia" className="py-24 bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-4xl text-center font-bold mb-16 text-amber-300">La Nostra Storia</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((m) => (
            <div key={m.year} className="bg-amber-900/50 border border-amber-800 p-6 rounded-2xl">
              <div className="text-amber-400 font-playfair text-3xl font-bold mb-2">{m.year}</div>
              <h3 className="text-white font-bold text-lg mb-3">{m.title}</h3>
              <p className="text-amber-200 text-sm leading-relaxed font-light">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Main Page Component
───────────────────────────────────────────── */
export default function BakeryHome() {
  return (
    <div className="bakery-site">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <HistorySection />
      <footer className="bg-stone-900 text-stone-400 py-12 text-center text-sm">
        <p>© {new Date().getFullYear()} Panificio Melfi. Tradizione di famiglia.</p>
      </footer>
    </div>
  )
}
