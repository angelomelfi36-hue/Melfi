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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / brand name */}
        <a href="#home" className="font-playfair text-white text-2xl font-bold tracking-wide">
          Panificio Melfi
        </a>

        {/* Desktop navigation — right side */}
        <div className="hidden md:flex items-center gap-1 relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            aria-haspopup="true"
            aria-expanded={open}
          >
            Menu
            <svg
              className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute top-12 right-0 bg-amber-950 border border-amber-800 rounded-xl shadow-2xl py-2 min-w-52">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-amber-100 hover:bg-amber-800 hover:text-white transition-colors text-sm"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Apri menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-amber-950 border-t border-amber-800 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-amber-100 hover:bg-amber-800 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─────────────────────────────────────────────
   Hero / Home section
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900"></div>

      {/* Overlay scuro per leggibilità */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Decorative wheat pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #f5deb3 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <img src="/logo-forno.png" alt="Logo Forno Melfi" className="mx-auto mb-6 w-32 h-32 object-contain" />
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-amber-300 flex items-center justify-center bg-amber-900/60">
            <span className="text-amber-300 text-3xl">🌾</span>
          </div>
        </div>

        <p className="text-amber-300 text-sm font-lato tracking-[0.3em] uppercase mb-4">
          Dal 1952 · Tradizione Artigianale
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold leading-tight mb-6">
          Forno Artigianale
          <br />
          <br />
          <span className="text-amber-300">Melfi</span>
        </h1>
        <p className="text-amber-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-lato font-light">
          Pane fragrante, dolci genuini e pasticceria tradizionale italiana.
          <br />
          Ogni giorno inforniamo con passione, rispettando le ricette di famiglia
          <br />
          tramandate di generazione in generazione.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#prodotti"
            className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-4 rounded-full transition-colors text-lg"
          >
            Scopri i Nostri Prodotti
          </a>
          <a
            href="#contatti"
            className="border-2 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-950 font-bold px-8 py-4 rounded-full transition-colors text-lg"
          >
            Vieni a Trovarci
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Products section
───────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: 'Pane di Casa',
    description:
      "Il nostro pane quotidiano: crosta croccante, mollica soffice e profumo irresistibile di lievito madre. Sfornato ogni mattina all'alba.",
    badge: 'Classico',
  },
  {
    id: 2,
    name: 'Focaccia Genovese',
    description:
      'Soffice e dorata, condita con olio extravergine d\'oliva e sale grosso. Perfetta per ogni momento della giornata.',
    badge: 'Più Amato',
  },
  {
    id: 3,
    name: 'Cornetti Artigianali',
    description:
      'Pasta sfoglia lavorata a mano, burro selezionato, farcitura di crema, marmellata o cioccolato. La colazione ideale.',
    badge: 'Colazione',
  },
  {
    id: 4,
    name: 'Torta della Nonna',
    description:
      'La ricetta originale di nonna Maria: pasta frolla friabile, crema pasticcera vellutata e pinoli tostati in superficie.',
    badge: 'Tradizione',
  },
  {
    id: 5,
    name: 'Biscotti al Burro',
    description:
      'Biscotteria fine realizzata con burro di alta qualità, lavorata secondo antiche ricette piemontesi. Ideali con il tè.',
    badge: 'Pasticceria',
  },
  {
    id: 6,
    name: 'Panettone Artigianale',
    description:
      "Il nostro panettone stagionale, preparato con lievito madre e uvetta sultanina, canditi d'arancia e cedro.",
    badge: 'Stagionale',
  },
]

function ProductsSection() {
  return (
    <section id="prodotti" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm tracking-[0.3em] uppercase font-lato mb-3">
            Fatto con amore ogni giorno
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-amber-950 font-bold mb-4">I Nostri Prodotti</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          <p className="mt-6 text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Dalla prima sfornata mattutina alle delizie del pomeriggio: tutto quello che trovate nel nostro banco è
            preparato artigianalmente, senza conservanti, con ingredienti freschi e selezionati.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="relative bg-amber-100 h-52 flex items-center justify-center overflow-hidden">
                <span className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-300">🍞</span>
                <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {p.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-amber-950 mb-2">{p.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-stone-500 italic font-lato">
          Venite a scoprire l'intero assortimento direttamente nelle nostre filiali.
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   History section
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
      text: "La seconda generazione, con Pietro Bianchi, amplia l'attività introducendo la pasticceria artigianale. Nascono le ricette di biscotti e crostate che ancora oggi portiamo avanti.",
    },
    {
      year: '1995',
      title: 'Nuovi Sapori',
      text: 'Apertura del secondo punto vendita. La famiglia Bianchi inizia a partecipare alle fiere gastronomiche regionali, ottenendo numerosi riconoscimenti per la qualità dei prodotti.',
    },
]
}

