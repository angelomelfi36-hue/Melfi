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
        <div className="md:hidden bg-amber-950 border-t border-amber-800 pb-4">
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
        <p className="text-amber-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-lato font-light">
          Pane fragrante, dolci genuini e pasticceria tradizionale italiana.<br />
          Ogni giorno inforniamo con passione, rispettando le ricette di famiglia tramandate di generazione in generazione.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#prodotti" className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105">Scopri i Nostri Prodotti</a>
          <a href="#contatti" className="border-2 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-950 font-bold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105">Vieni a Trovarci</a>
        </div>
      </div>
    </section>
  )
}

function ProductsSection() {
  const products = [
    { id: 1, name: 'Pane di Casa', desc: 'Il nostro pane quotidiano: crosta croccante, mollica soffice e profumo irresistibile di lievito madre. Sfornato ogni mattina all\'alba.', badge: 'Classico', image: '/prod-pane.webp' },
    { id: 2, name: 'Focaccia Genovese', desc: 'Soffice e dorata, condita con olio extravergine d\'oliva e sale grosso. Perfetta per ogni momento della giornata.', badge: 'Più Amato', image: '/prod-focaccia.webp' },
    { id: 3, name: 'Cornetti Artigianali', desc: 'Pasta sfoglia lavorata a mano, burro selezionato, farcitura di crema, marmellata o cioccolato. La colazione ideale.', badge: 'Colazione', image: '/prod-cornetto.webp' },
    { id: 4, name: 'Torta della Nonna', desc: 'La ricetta originale di nonna Maria: pasta frolla friabile, crema pasticcera vellutata e pinoli tostati in superficie.', badge: 'Tradizione', image: '/prod-torta.webp' },
    { id: 5, name: 'Biscotti al Burro', desc: 'Biscotteria fine realizzata con burro di alta qualità, lavorata secondo antiche ricette piemontesi. Ideali con il tè.', badge: 'Pasticceria', image: '/prod-biscotti.webp' },
    { id: 6, name: 'Panettone Artigianale', desc: 'Il nostro panettone stagionale, preparato con lievito madre e uvetta sultanina, canditi d\'arancia e cedro.', badge: 'Stagionale', image: '/prod-panettone.webp' },
  ]
  return (
    <section id="prodotti" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-4xl text-amber-950 font-bold mb-12">I Nostri Prodotti</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 group">
              <div className="h-52 overflow-hidden bg-amber-100 relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-amber-950 mb-2">{p.name}</h3>
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
  const milestones = [
    { year: '1952', title: 'Le Origini', text: 'Nonno Giuseppe Melfi apre il primo forno in via della Fornace, nel cuore del borgo antico. Con farina locale e lievito madre, inizia una storia di pane e passione.' },
    { year: '1971', title: 'La Crescita', text: 'La seconda generazione, con Pietro Melfi, amplia l\'attività introducendo la pasticceria artigianale. Nascono le ricette di biscotti e crostate che ancora oggi portiamo avanti.' },
    { year: '1995', title: 'Nuovi Sapori', text: 'Apertura del secondo punto vendita. La famiglia Melfi inizia a partecipare alle fiere gastronomiche regionali, ottenendo numerosi riconoscimenti per la qualità dei prodotti.' },
    { year: 'Oggi', title: 'Tradizione Viva', text: 'La terza generazione custodisce con orgoglio le ricette di famiglia e le arricchisce con tecniche moderne, mantenendo l\'anima artigianale che da sempre ci distingue.' },
  ]
  return (
    <section id="storia" className="py-24 bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-4xl font-bold mb-8">La Nostra Storia</h2>
        <p className="max-w-2xl mx-auto text-amber-100 font-light leading-relaxed mb-12">Dalla prima sfornata mattutina alle delizie del pomeriggio: tutto quello che trovate nel nostro banco è preparato artigianalmente, senza conservanti, con ingredienti freschi e selezionati.</p>
        <div className="grid md:grid-cols-2 gap-8 items-center text-left mb-16 border-t border-amber-800 pt-16">
          <img src="/history-forno.webp" alt="Storia" className="rounded-3xl border-4 border-amber-800" />
          <div className="text-left bg-amber-900/50 p-8 rounded-3xl border border-amber-800 font-lato">
            <h3 className="text-amber-400 font-bold text-2xl mb-4">Un'eredità di sapore</h3>
            <p className="text-amber-100 font-light italic">"Tutto è iniziato con una manciata di farina, acqua di sorgente e il sogno di nonno Giuseppe: portare sulle tavole italiane il gusto autentico del pane fatto in casa."</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map(m => (
            <div key={m.year} className="bg-amber-900/50 p-6 rounded-2xl border border-amber-800">
              <div className="text-amber-400 font-bold text-2xl mb-2">{m.year}</div>
              <div className="text-white font-bold mb-2">{m.title}</div>
              <p className="text-sm text-amber-200/80 font-light font-lato">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SpecialsSection() {
  const specials = [
    { season: 'Primavera', icon: '🌸', items: ['Colomba Pasquale artigianale', 'Crostata di fragole fresche', 'Focaccia con fiori di zucca', 'Ciambelle alla crema di limone'], color: 'from-rose-700 to-amber-700' },
    { season: 'Estate', icon: '☀️', items: ['Granite di frutta artigianali', 'Crostata di pesche e albicocche', 'Pane alla curcuma e semi', 'Biscotti al limone di Amalfi'], color: 'from-yellow-700 to-amber-600' },
    { season: 'Autunno', icon: '🍂', items: ['Pane di castagne', 'Torta di apples e cannella', 'Biscotti alle nocciole del Piemonte', 'Focaccia con uva e rosmarino'], color: 'from-amber-800 to-orange-700' },
    { season: 'Inverno', icon: '❄️', items: ['Panettone con lievito madre', 'Pandoro soffice fatto in casa', 'Struffoli napoletani', 'Biscotti di Natale speziati'], color: 'from-stone-700 to-amber-800' },
  ]
  return (
    <section id="specialita" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-4xl text-amber-950 font-bold mb-12">Specialità di Stagione</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map(s => (
            <div key={s.season} className={`bg-gradient-to-br ${s.color} rounded-3xl p-6 text-white text-left`}>
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-playfair text-xl font-bold mb-4">{s.season}</h3>
              <ul className="space-y-2 text-amber-100 text-sm font-lato font-light">
                {s.items.map(item => <li key={item} className="flex gap-2"><span>✦</span>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const branches = [
    { name: 'Sede Principale — Borgo Antico', address: 'Via della Fornace, 12 — 10121 Torino (TO)', hours: 'Lun–Sab 06:30–19:30 · Dom 07:00–13:00', phone: '+39 011 123 4567' },
    { name: 'Filiale Nord', address: 'Corso Garibaldi, 88 — 10152 Torino (TO)', hours: 'Lun–Sab 07:00–19:00 · Dom chiuso', phone: '+39 011 765 4321' },
    { name: 'Filiale Est', address: 'Via Roma, 45 — 10124 Torino (TO)', hours: 'Mar–Dom 06:30–18:30 · Lun chiuso', phone: '+39 011 987 6543' },
  ]
  return (
    <section id="contatti" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-4xl text-amber-950 font-bold mb-16 text-center">Vieni a Trovarci</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {branches.map(b => (
              <div key={b.name} className="bg-white p-6 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-lg text-amber-950 mb-2">{b.name}</h3>
                <p className="text-stone-500 text-sm mb-1">📍 {b.address}</p>
                <p className="text-stone-500 text-sm mb-3">🕐 {b.hours}</p>
                <a href={`tel:${b.phone.replace(/\s/g
