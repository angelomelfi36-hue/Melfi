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

      {/* Mobile dropdown */}
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
      {/*
        INSERT IMAGE HERE — Hero background
        Descrizione: Foto d'atmosfera del forno con pane appena sfornato o bancone con dolci.
        Dimensioni consigliate: 1920×1080 px, formato WebP o JPG ottimizzato.
        Come aggiungere: carica l'immagine nella cartella public/ e imposta il percorso
        come valore della prop `src` dell'elemento <img> sottostante, oppure come
        proprietà CSS `background-image` sul div contenitore.
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900">
        {/* Sostituire questo div con un <img> o con uno sfondo CSS una volta disponibile l'immagine */}
        {/* INSERT IMAGE HERE - Immagine hero: interno del forno artigianale, 1920×1080 px WebP */}
      </div>

      {/* Overlay scuro per leggibilità */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Decorative wheat pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, #f5deb3 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Bakery logo / emblem placeholder */}
        {/*
          INSERT IMAGE HERE — Logo del forno
          Descrizione: Logo o stemma del Forno Bianchi, preferibilmente su sfondo trasparente.
          Dimensioni consigliate: 200×200 px, formato PNG con trasparenza.
        */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-amber-300 flex items-center justify-center bg-amber-900/60">
            {/* INSERT IMAGE HERE - Logo forno, 200×200 px PNG trasparente */}
            <span className="text-amber-300 text-3xl">🌾</span>
          </div>
        </div>

        <p className="text-amber-300 text-sm font-lato tracking-[0.3em] uppercase mb-4">
          Dal 1952 · Tradizione Artigianale
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold leading-tight mb-6">
          Forno Artigianale<br />
          <span className="text-amber-300">Bianchi</span>
        </h1>
        <p className="text-amber-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-lato font-light">
          Pane fragrante, dolci genuini e pasticceria tradizionale italiana.
          Ogni giorno inforniamo con passione, rispettando le ricette di famiglia
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
    description: 'Il nostro pane quotidiano: crosta croccante, mollica soffice e profumo irresistibile di lievito madre. Sfornato ogni mattina all\'alba.',
    badge: 'Classico',
  },
  {
    id: 2,
    name: 'Focaccia Genovese',
    description: 'Soffice e dorata, condita con olio extravergine d\'oliva e sale grosso. Perfetta per ogni momento della giornata.',
    badge: 'Più Amato',
  },
  {
    id: 3,
    name: 'Cornetti Artigianali',
    description: 'Pasta sfoglia lavorata a mano, burro selezionato, farcitura di crema, marmellata o cioccolato. La colazione ideale.',
    badge: 'Colazione',
  },
  {
    id: 4,
    name: 'Torta della Nonna',
    description: 'La ricetta originale di nonna Maria: pasta frolla friabile, crema pasticcera vellutata e pinoli tostati in superficie.',
    badge: 'Tradizione',
  },
  {
    id: 5,
    name: 'Biscotti al Burro',
    description: 'Biscotteria fine realizzata con burro di alta qualità, lavorata secondo antiche ricette piemontesi. Ideali con il tè.',
    badge: 'Pasticceria',
  },
  {
    id: 6,
    name: 'Panettone Artigianale',
    description: 'Il nostro panettone stagionale, preparato con lievito madre e uvetta sultanina, canditi d\'arancia e cedro.',
    badge: 'Stagionale',
  },
]

function ProductsSection() {
  return (
    <section id="prodotti" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm tracking-[0.3em] uppercase font-lato mb-3">
            Fatto con amore ogni giorno
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-amber-950 font-bold mb-4">
            I Nostri Prodotti
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          <p className="mt-6 text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Dalla prima sfornata mattutina alle delizie del pomeriggio: tutto quello che
            trovate nel nostro banco è preparato artigianalmente, senza conservanti, con
            ingredienti freschi e selezionati.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              {/*
                INSERT IMAGE HERE — Foto prodotto: {p.name}
                Descrizione: Fotografia professionale del prodotto su sfondo neutro o nel contesto del banco del forno.
                Dimensioni consigliate: 600×450 px, formato WebP o JPG.
                Come aggiungere: sostituire il div placeholder qui sotto con un tag <img src="..." alt="{p.name}" className="w-full h-full object-cover" />.
              */}
              <div className="relative bg-amber-100 h-52 flex items-center justify-center overflow-hidden">
                {/* INSERT IMAGE HERE - Foto di {p.name}, 600×450 px WebP */}
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
      text: 'La seconda generazione, con Pietro Bianchi, amplia l\'attività introducendo la pasticceria artigianale. Nascono le ricette di biscotti e crostate che ancora oggi portiamo avanti.',
    },
    {
      year: '1995',
      title: 'Nuovi Sapori',
      text: 'Apertura del secondo punto vendita. La famiglia Bianchi inizia a partecipare alle fiere gastronomiche regionali, ottenendo numerosi riconoscimenti per la qualità dei prodotti.',
    },
    {
      year: 'Oggi',
      title: 'Tradizione Viva',
      text: 'La terza generazione custodisce con orgoglio le ricette di famiglia e le arricchisce con tecniche moderne, mantenendo l\'anima artigianale che da sempre ci distingue.',
    },
  ]

  return (
    <section id="storia" className="py-24 bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase font-lato mb-3">
            Più di 70 anni di passione
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            La Nostra Storia
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Story image placeholder */}
          <div className="order-2 md:order-1">
            {/*
              INSERT IMAGE HERE — Foto storica del forno
              Descrizione: Fotografia d'epoca o in bianco e nero del forno originale o della famiglia Bianchi.
              Dimensioni consigliate: 800×600 px, formato WebP o JPG.
              Come aggiungere: sostituire il div placeholder con un tag <img>.
            */}
            <div className="bg-amber-800 rounded-3xl h-80 flex flex-col items-center justify-center gap-4 border border-amber-700">
              {/* INSERT IMAGE HERE - Foto storica del Forno Bianchi, 800×600 px WebP */}
              <span className="text-6xl opacity-50">📸</span>
              <p className="text-amber-400 text-sm italic">Foto storica del Forno Bianchi</p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="text-amber-100 text-lg leading-relaxed mb-6 font-lato font-light">
              Tutto è iniziato con una manciata di farina, acqua di sorgente e il sogno di
              nonno Giuseppe: portare sulle tavole italiane il gusto autentico del pane fatto
              in casa. Da quel lontano 1952, il Forno Bianchi non si è mai fermato.
            </p>
            <p className="text-amber-200 leading-relaxed font-lato font-light">
              Tre generazioni, la stessa dedizione. Ogni mattina, ancora prima dell'alba,
              le nostre mani impastano con cura gli stessi ingredienti semplici e genuini
              che i nostri nonni ci hanno insegnato a rispettare. Perché per noi la
              panificazione non è solo un mestiere — è una vocazione.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <div className="bg-amber-900 border border-amber-700 rounded-2xl p-6 h-full">
                <div className="text-amber-400 font-playfair text-3xl font-bold mb-2">{m.year}</div>
                <h3 className="text-white font-bold text-lg mb-3">{m.title}</h3>
                <p className="text-amber-200 text-sm leading-relaxed font-lato font-light">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Family photo placeholder */}
        <div className="mt-16">
          {/*
            INSERT IMAGE HERE — Foto della famiglia Bianchi oggi
            Descrizione: Ritratto delle tre generazioni della famiglia davanti al forno o all'interno del laboratorio.
            Dimensioni consigliate: 1200×500 px, formato WebP panoramico.
            Come aggiungere: sostituire il div placeholder con un tag <img className="w-full h-full object-cover rounded-3xl">.
          */}
          <div className="bg-amber-900 border border-amber-700 rounded-3xl h-64 flex flex-col items-center justify-center gap-3">
            {/* INSERT IMAGE HERE - Ritratto famiglia Bianchi, 1200×500 px WebP */}
            <span className="text-5xl opacity-40">👨‍👩‍👧‍👦</span>
            <p className="text-amber-400 text-sm italic">La famiglia Bianchi — tre generazioni di maestri panificatori</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Seasonal Specials section (creative addition)
───────────────────────────────────────────── */
const specials = [
  {
    season: 'Primavera',
    icon: '🌸',
    items: ['Colomba Pasquale artigianale', 'Crostata di fragole fresche', 'Focaccia con fiori di zucca', 'Ciambelle alla crema di limone'],
    color: 'from-rose-700 to-amber-700',
  },
  {
    season: 'Estate',
    icon: '☀️',
    items: ['Granite di frutta artigianali', 'Crostata di pesche e albicocche', 'Pane alla curcuma e semi', 'Biscotti al limone di Amalfi'],
    color: 'from-yellow-700 to-amber-600',
  },
  {
    season: 'Autunno',
    icon: '🍂',
    items: ['Pane di castagne', 'Torta di mele e cannella', 'Biscotti alle nocciole del Piemonte', 'Focaccia con uva e rosmarino'],
    color: 'from-amber-800 to-orange-700',
  },
  {
    season: 'Inverno',
    icon: '❄️',
    items: ['Panettone con lievito madre', 'Pandoro soffice fatto in casa', 'Struffoli napoletani', 'Biscotti di Natale speziati'],
    color: 'from-stone-700 to-amber-800',
  },
]

function SpecialsSection() {
  return (
    <section id="specialita" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm tracking-[0.3em] uppercase font-lato mb-3">
            Ogni stagione porta nuovi sapori
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-amber-950 font-bold mb-4">
            Specialità di Stagione
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          <p className="mt-6 text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Seguiamo il ritmo delle stagioni e della tradizione: ogni periodo dell'anno
            porta con sé ingredienti speciali e ricette uniche che celebrano la ricchezza
            della cucina italiana.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((s) => (
            <div key={s.season} className={`bg-gradient-to-br ${s.color} rounded-3xl p-6 text-white`}>
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-playfair text-xl font-bold mb-4">{s.season}</h3>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-amber-100 flex items-start gap-2 font-lato font-light">
                    <span className="mt-0.5 text-amber-300 shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Seasonal banner image placeholder */}
        <div className="mt-16 rounded-3xl overflow-hidden">
          {/*
            INSERT IMAGE HERE — Banner stagionale
            Descrizione: Foto panoramica di prodotti da forno stagionali disposti artisticamente su un tavolo in legno.
            Dimensioni consigliate: 1200×400 px, formato WebP.
            Come aggiungere: sostituire il div placeholder con un tag <img className="w-full h-full object-cover">.
          */}
          <div className="bg-amber-100 h-56 flex flex-col items-center justify-center gap-3">
            {/* INSERT IMAGE HERE - Assortimento stagionale su tavolo in legno, 1200×400 px WebP */}
            <span className="text-5xl opacity-40">🎂</span>
            <p className="text-amber-700 text-sm italic">Specialità stagionali del Forno Bianchi</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Contact section
───────────────────────────────────────────── */
const branches = [
  {
    name: 'Sede Principale — Borgo Antico',
    address: 'Via della Fornace, 12 — 10121 Torino (TO)',
    hours: 'Lun–Sab 06:30–19:30 · Dom 07:00–13:00',
    phone: '+39 011 123 4567',
  },
  {
    name: 'Filiale Nord',
    address: 'Corso Garibaldi, 88 — 10152 Torino (TO)',
    hours: 'Lun–Sab 07:00–19:00 · Dom chiuso',
    phone: '+39 011 765 4321',
  },
  {
    name: 'Filiale Est',
    address: 'Via Roma, 45 — 10124 Torino (TO)',
    hours: 'Mar–Dom 06:30–18:30 · Lun chiuso',
    phone: '+39 011 987 6543',
  },
]

function ContactSection() {
  return (
    <section id="contatti" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm tracking-[0.3em] uppercase font-lato mb-3">
            Vieni a trovarci
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-amber-950 font-bold mb-4">
            Contattaci
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h3 className="font-playfair text-2xl text-amber-950 font-bold mb-6">
              Rimaniamo in contatto
            </h3>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Hai domande sui nostri prodotti, vuoi ordinare una torta personalizzata
              o semplicemente curiosare tra le nostre novità? Chiamaci, scrivici
              o seguici sui social!
            </p>

            {/* Phone */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-stone-500 text-xs uppercase tracking-widest mb-1">Telefono principale</p>
                <a
                  href="tel:+390111234567"
                  className="text-amber-700 font-bold text-xl hover:text-amber-600 transition-colors"
                >
                  +39 011 123 4567
                </a>
              </div>
            </div>

            {/* Social media */}
            <div className="mb-8">
              <p className="text-stone-500 text-sm uppercase tracking-widest mb-4">Seguici sui Social</p>
              <div className="flex gap-4">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/fornobianchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white px-5 py-3 rounded-xl hover:opacity-90 transition-opacity font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/fornobianchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-blue-700 hover:bg-blue-600 text-white px-5 py-3 rounded-xl transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            {/*
              INSERT IMAGE HERE — Mappa o foto esterna del forno principale
              Descrizione: Screenshot di Google Maps con la posizione del forno, oppure foto esterna dell'insegna.
              Dimensioni consigliate: 600×350 px, formato WebP o JPG.
              Come aggiungere: sostituire il div placeholder con un <img> o con un iframe di Google Maps.
            */}
            <div className="bg-amber-200 rounded-2xl h-40 flex flex-col items-center justify-center gap-2">
              {/* INSERT IMAGE HERE - Mappa o foto esterna sede principale, 600×350 px WebP */}
              <span className="text-3xl opacity-50">🗺️</span>
              <p className="text-amber-700 text-sm italic">Mappa — Sede Principale</p>
            </div>
          </div>

          {/* Branches */}
          <div>
            <h3 className="font-playfair text-2xl text-amber-950 font-bold mb-6">
              Le Nostre Filiali
            </h3>
            <div className="space-y-5">
              {branches.map((b) => (
                <div
                  key={b.name}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:border-amber-300 transition-colors"
                >
                  <h4 className="font-playfair font-bold text-amber-900 text-lg mb-2">{b.name}</h4>
                  <p className="text-stone-600 text-sm mb-1 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">📍</span>
                    {b.address}
                  </p>
                  <p className="text-stone-500 text-sm mb-3 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">🕐</span>
                    {b.hours}
                  </p>
                  <a
                    href={`tel:${b.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-600 font-medium text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {b.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-200 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-playfair text-2xl text-white font-bold mb-2">Forno Artigianale Bianchi</p>
        <p className="text-amber-400 text-sm mb-6">Dal 1952 · Tradizione, Passione, Genuinità</p>
        <div className="flex justify-center gap-6 text-sm mb-8">
          {['#home', '#prodotti', '#storia', '#specialita', '#contatti'].map((href) => (
            <a key={href} href={href} className="hover:text-white transition-colors capitalize">
              {href.replace('#', '')}
            </a>
          ))}
        </div>
        <p className="text-amber-700 text-xs">
          © {new Date().getFullYear()} Forno Artigianale Bianchi. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   Main page component
───────────────────────────────────────────── */
function BakeryHome() {
  return (
    <div className="bakery-site">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <HistorySection />
      <SpecialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
