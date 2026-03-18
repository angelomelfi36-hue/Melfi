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
      <div className="hidden md:flex items-center gap-1 relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900"></div>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #f5deb3 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <img src="/logo-forno.png" alt="Logo Forno Melfi" className="mx-auto mb-6 w-32 h-32 object-contain" />
        <p className="text-amber-300 text-sm font-lato tracking-[0.3em] uppercase mb-4">
          Dal 1952 · Tradizione Artigianale
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold leading-tight mb-6">
          Forno Artigianale<br /><br /><span className="text-amber-300">Melfi</span>
        </h1>
        <p className="text-amber-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-lato font-light">
          Pane fragrante, dolci genuini e pasticceria tradizionale italiana.
          <br />
          Ogni giorno inforniamo con passione, rispettando le ricette di famiglia
          <br />
          tramandate di generazione in generazione.
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
   Products Section
───────────────────────────────────────────── */
const products = [
  { id: 1, name: 'Pane di Casa', badge: 'Classico', description: "Il nostro pane quotidiano: crosta croccante, mollica soffice e profumo irresistibile di lievito madre. Sfornato ogni mattina all'alba." },
  { id: 2, name: 'Focaccia Genovese', badge: 'Più Amato', description: "Soffice e dorata, condita con olio extravergine d'oliva e sale grosso. Perfetta per ogni momento della giornata." },
  { id: 3, name: 'Cornetti Artigianali', badge: 'Colazione', description: "Pasta sfoglia lavorata a mano, burro selezionato, farcitura di crema, marmellata o cioccolato. La colazione ideale." },
  { id: 4, name: 'Torta della Nonna', badge: 'Tradizione', description: "La ricetta originale di nonna Maria: pasta frolla friabile, crema pasticcera vellutata e pinoli tostati in superficie." },
  { id: 5, name: 'Biscotti al Burro', badge: 'Pasticceria', description: "Biscotteria fine realizzata con burro di alta qualità, lavorata secondo antiche ricette piemontesi. Ideali con il tè." },
  { id: 6, name: 'Panettone Artigianale', badge: 'Stagionale', description: "Il nostro panettone stagionale, preparato con lievito madre e uvetta sultanina, canditi d'arancia e cedro." },
]

function ProductsSection() {
  return (
    <section id="prodotti" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-amber-950 font-bold mb-4">I Nostri Prodotti</h2>
          <p className="mt-6 text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Dalla prima sfornata mattutina alle delizie del pomeriggio: tutto quello che trovate nel nostro banco è preparato artigianalmente.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl p-6 shadow-md border border-stone-100">
              <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>
              <h3 className="font-playfair text-xl font-bold text-amber-950 mt-4 mb-2">{p.name}</h3>
              <p className="text-stone-500 text-sm">{p.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-12 text-stone-500 italic font-lato">Venite a scoprire l'intero assortimento direttamente nelle nostre filiali.</p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   History Section
───────────────────────────────────────────── */
function HistorySection() {
  const milestones = [
    { year: '1952', title: 'Le Origini', text: "Nonno Giuseppe Bianchi apre il primo forno in via della Fornace, nel cuore del borgo antico. Con farina locale e lievito madre, inizia una storia di pane e passione." },
    { year: '1971', title: 'La Crescita', text: "La seconda generazione, con Pietro Bianchi, amplia l'attività introducendo la pasticceria artigianale. Nascono le ricette di biscotti e crostate." },
    { year: '1995', title: 'Nuovi Sapori', text: "Apertura del secondo punto vendita. La famiglia Bianchi inizia a partecipare alle fiere gastronomiche regionali." },
    { year: 'Oggi', title: 'Tradizione Viva', text: "La terza generazione custodisce con orgoglio le ricette di famiglia e le arricchisce con tecniche moderne, mantenendo l'anima artigianale che da sempre ci distingue." },
  ]

  return (
    <section id="storia" className="py-24 bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-4xl text-center font-bold mb-16 text-amber-300">La Nostra Storia</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((m) => (
            <div key={m.year} className="bg-amber-900 border border-amber-800 p-6 rounded-2xl">
              <div className="text-amber-400 font-playfair text-3xl font-bold mb-2">{m.year}</div>
              <h3 className="text-white font-bold text-lg mb-3">{m.title}</h3>
              <p className="text-amber-200 text-sm font-light leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Specials Section
───────────────────────────────────────────── */
const specials = [
  { season: 'Primavera', icon: '🌸', items: ['Colomba Pasquale', 'Crostata di fragole', 'Focaccia con fiori di zucca'], color: 'from-rose-700 to-amber-700' },
  { season: 'Estate', icon: '☀️', items: ['Granite artigianali', 'Crostata di pesche', 'Pane alla curcuma'], color: 'from-yellow-700 to-amber-600' },
  { season: 'Autunno', icon: '🍂', items: ['Pane di castagne', 'Torta di mele', 'Biscotti alle nocciole'], color: 'from-amber-800 to-orange-700' },
  { season: 'Inverno', icon: '❄️', items: ['Panettone lievito madre', 'Pandoro soffice', 'Struffoli napoletani'], color: 'from-stone-700 to-amber-800' },
]

function SpecialsSection() {
  return (
    <section id="specialita" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-4xl text-center text-amber-950 font-bold mb-12">Specialità di Stagione</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((s) => (
            <div key={s.season} className={`bg-gradient-to-br ${s.color} rounded-3xl p-6 text-white`}>
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-playfair text-xl font-bold mb-4">{s.season}</h3>
              <ul className="space-y-2 text-sm text-amber-100">
                {s.items.map((item) => <li key={item}>✦ {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Contact Section
───────────────────────────────────────────── */
const branches = [
  { name: 'Sede Principale', address: 'Via della Fornace, 12 — Torino', hours: '06:30–19:30', phone: '+39 011 123 4567' },
  { name: 'Filiale Nord', address: 'Corso Garibaldi, 88 — Torino', hours: '07:00–19:00', phone: '+39 011 765 4321' },
  { name: 'Filiale Est', address: 'Via Roma, 45 — Torino', hours: '06:30–18:30', phone: '+39 011 987 6543' },
]

function ContactSection() {
  return (
    <section id="contatti" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-4xl text-center text-amber-950 font-bold mb-16">Contattaci</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-6">Rimaniamo in contatto</h3>
            <p className="text-stone-600 mb-8">Chiamaci per ordini personalizzati o seguici sui social!</p>
            <div className="flex gap-4 mb-8">
              <a href="#" className="bg-pink-600 text-white px-5 py-2 rounded-xl text-sm">Instagram</a>
              <a href="#" className="bg-blue-700 text-white px-5 py-2 rounded-xl text-sm">Facebook</a>
            </div>
          </div>
          <div className="space-y-5">
            {branches.map((b) => (
              <div key={b.name} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <h4 className="font-bold text-amber-900 mb-2">{b.name}</h4>
                <p className="text-stone-600 text-sm">📍 {b.address}</p>
                <p className="text-stone-500 text-sm">🕐 {b.hours}</p>
                <p className="text-amber-700 font-bold mt-2">{b.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function BakeryHome() {
  return (
    <div className="bakery-site">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <HistorySection />
      <SpecialsSection />
      <ContactSection />
      <footer className="bg-amber-950 text-amber-200 py-12 text-center">
        <p className="font-playfair text-white text-xl font-bold">Forno Artigianale Melfi</p>
        <p className="text-xs mt-4">© {new Date().getFullYear()} Tutti i diritti riservati.</p>
      </footer>
    </div>
  )
}
