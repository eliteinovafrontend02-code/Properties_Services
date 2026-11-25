import React, { useRef } from "react";
import {
  HardHat,
  Building2,
  PaintRoller,
  Sparkles,
  Droplets,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

/* ---------- Theme ----------
  dark teal : #0f5e54
  teal      : #1a7a6d
  mint bg   : #e8f1ee
  light bg  : #f8fafc
  deep green: #1c3b34   (trust section)
  ink       : #12281f
------------------------------ */

const BANNER_IMG =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80";

const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

/* ---------- Services data (replace with API data) ---------- */
const SERVICES = [
  {
    key: "construction",
    tab: "Construction",
    name: "Construction Services",
    icon: HardHat,
    items: [
      { id: 1, title: "House Construction", img: img("photo-1503387762-592deb58ef4e") },
      { id: 2, title: "Commercial Building", img: img("photo-1504307651254-35680f356dfd") },
      { id: 3, title: "Renovation & Extension", img: img("photo-1581094794329-c8112a89af12") },
    ],
  },
  {
    key: "interior",
    tab: "Interior",
    name: "Interior Services",
    icon: Building2,
    items: [
      { id: 4, title: "Modular Kitchen", img: img("photo-1556911220-e15b29be8c8f") },
      { id: 5, title: "Living Room Interiors", img: img("photo-1618221195710-dd6b41faaea6") },
      { id: 6, title: "Wardrobes & Storage", img: img("photo-1595428774223-ef52624120d2") },
      { id: 7, title: "Bedroom Interiors", img: img("photo-1616594039964-ae9021a400a0") },
      { id: 8, title: "False Ceiling & Lighting", img: img("photo-1600210492486-724fe5c67fb0") },
      { id: 9, title: "Office Interiors", img: img("photo-1497366811353-6870744d04b2") },
    ],
  },
  {
    key: "painting",
    tab: "Painting",
    name: "Painting Services",
    icon: PaintRoller,
    items: [
      { id: 10, title: "Interior Painting", img: img("photo-1562259949-e8e7689d7828") },
      { id: 11, title: "Exterior Painting", img: img("photo-1589939705384-5185137a7f0f") },
      { id: 12, title: "Waterproof Coating", img: img("photo-1572981779307-38b8cabb2407") },
      { id: 13, title: "Texture & Wall Designs", img: img("photo-1513694203232-719a280e022f") },
      { id: 14, title: "Wood & Metal Polish", img: img("photo-1534237710431-e2fc698436d0") },
    ],
  },
  {
    key: "cleaning",
    tab: "Cleaning",
    name: "Cleaning Services",
    icon: Sparkles,
    items: [
      { id: 15, title: "Deep Home Cleaning", img: img("photo-1581578731548-c64695cc6952") },
      { id: 16, title: "Office Cleaning", img: img("photo-1527515637462-cff94eecc1ac") },
      { id: 17, title: "Post-Construction Cleaning", img: img("photo-1558317374-067fb5f30001") },
      { id: 18, title: "Kitchen & Bathroom Cleaning", img: img("photo-1584622650111-993a426fbf0a") },
      { id: 19, title: "Sofa & Carpet Cleaning", img: img("photo-1527515545081-5db817172677") },
    ],
  },
  {
    key: "plumbing",
    tab: "Plumbing",
    name: "Plumbing Services",
    icon: Droplets,
    items: [
      { id: 20, title: "Leak Repair", img: img("photo-1607472586893-edb57bdc0e39") },
      { id: 21, title: "Bathroom Fitting", img: img("photo-1585704032915-c3400ca199e7") },
      { id: 22, title: "Water Tank & Pipeline", img: img("photo-1621905252507-b35492cc74b4") },
      { id: 23, title: "Drainage Cleaning", img: img("photo-1585129918930-eab99ee4f2f5") },
      { id: 24, title: "Motor & Pump Setup", img: img("photo-1581244277943-fe4a9c777189") },
    ],
  },
];

/* ---------- "Why customers trust us" ---------- */
const TRUST = [
  { title: "Verified Professionals", desc: "Every technician is background-checked and skill-tested.", link: "Learn More", img: img("photo-1504307651254-35680f356dfd") },
  { title: "Transparent Pricing", desc: "Clear quotes up front — no hidden charges", link: "See How", img: img("photo-1554224155-6726b3ff858f") },
  { title: "Free Site Inspection", desc: "Book a visit for any service below, at no cost", link: "Book a Visit", img: img("photo-1503387762-592deb58ef4e") },
  { title: "Instant Booking Updates", desc: "Get notified when your service is scheduled and started.", link: "Set Alerts", img: img("photo-1618221195710-dd6b41faaea6") },
];

/* ---------- Popular services ---------- */
const POPULAR = [
  { id: 1, title: "Modular Kitchen", service: "Interior", price: "From ₹85,000", tag: "Popular", img: img("photo-1556911220-e15b29be8c8f") },
  { id: 2, title: "Deep Home Cleaning", service: "Cleaning", price: "From ₹3,500", tag: "Offer", img: img("photo-1581578731548-c64695cc6952") },
  { id: 3, title: "Exterior Painting", service: "Painting", price: "₹22 / sqft", tag: "Popular", img: img("photo-1589939705384-5185137a7f0f") },
  { id: 4, title: "House Construction", service: "Construction", price: "₹1,800 / sqft", tag: "New", img: img("photo-1503387762-592deb58ef4e") },
  { id: 5, title: "Leak Repair", service: "Plumbing", price: "From ₹499", tag: "Offer", img: img("photo-1607472586893-edb57bdc0e39") },
];

const TILTS = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[0.7deg]"];

const hideScrollbar =
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/* ---------- Image with gradient fallback ---------- */
const Img = ({ src, alt, className = "" }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    onError={(e) => (e.currentTarget.style.display = "none")}
    className={`h-full w-full object-cover ${className}`}
  />
);

/* ---------- Horizontal carousel with round arrows ---------- */
const Carousel = ({ children, showArrows = true, center = false }) => {
  const ref = useRef(null);
  const scroll = (dir) =>
    ref.current &&
      ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={ref}
        className={`flex gap-4 overflow-x-auto scroll-smooth px-2 py-6 snap-x snap-mandatory sm:gap-6 2xl:gap-8 ${hideScrollbar} ${
          center ? "justify-center" : ""
        }`}
      >
        {children}
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className="absolute left-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#12281f] shadow-md transition hover:bg-[#0f5e54] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] sm:flex"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll(1)}
            className="absolute right-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#12281f] shadow-md transition hover:bg-[#0f5e54] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] sm:flex"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
};

/* ---------- Parallelogram tab ---------- */
const ServiceTab = ({ icon: Icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-12 w-[calc(50%-0.375rem)] items-center justify-center gap-2 [clip-path:polygon(12%_0,100%_0,88%_100%,0_100%)] bg-gradient-to-r from-[#0f5e54] to-[#1a7a6d] px-4 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] sm:h-14 sm:w-[220px] sm:text-base lg:w-auto lg:flex-1 2xl:h-16 2xl:text-lg"
  >
    <Icon size={20} />
    {label}
  </button>
);

/* ---------- Polaroid card (image + italic caption) ---------- */
const PolaroidCard = ({ item, tilt, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect?.(item)}
    className={`relative w-[260px] shrink-0 snap-center rounded-md bg-white p-4 pb-5 text-center shadow-md transition hover:rotate-0 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] sm:w-[280px] lg:w-[300px] 2xl:w-[360px] ${tilt}`}
  >
    <span className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#1a7a6d] ring-4 ring-[#e8f1ee]" />

    <div className="h-52 w-full overflow-hidden rounded sm:h-56 2xl:h-72 bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d]">
      <Img src={item.img} alt={item.title} />
    </div>

    <p className="mt-4 font-serif text-lg font-bold italic 2xl:text-2xl text-[#0f5e54]">
      {item.title}
    </p>
  </button>
);

/* ---------- Trust card (image + dark overlay) ---------- */
const TrustCard = ({ t }) => (
  <a
    href="#"
    className="group relative block h-56 overflow-hidden rounded-lg bg-[#0f5e54] sm:h-60 2xl:h-72 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fe0c5]"
  >
    <Img src={t.img} alt={t.title} className="transition duration-500 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
    <div className="absolute inset-x-0 bottom-0 p-5">
      <h3 className="text-xl font-bold text-white">{t.title}</h3>
      <p className="mt-1.5 text-sm leading-snug text-white/85">{t.desc}</p>
      <span className="mt-2 inline-flex items-center gap-1 text-base font-semibold text-[#7fe0c5]">
        {t.link} <ArrowRight size={16} />
      </span>
    </div>
  </a>
);

/* ---------- Popular service card ---------- */
const PopularCard = ({ p, onBook }) => (
  <article className="w-[300px] shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl sm:w-[320px] lg:w-[340px] 2xl:w-[400px]">
    <div className="relative h-44 bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] sm:h-48 2xl:h-60">
      <Img src={p.img} alt={p.title} />
      <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#e8f1ee] px-3 py-1 text-xs font-semibold text-[#0f5e54]">
        <BadgeCheck size={14} /> Verified Partner
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-[#1a7a6d] px-3 py-1 text-xs font-bold text-white">
        {p.tag}
      </span>
    </div>

    <div className="p-4">
      <p className="text-sm font-semibold text-[#1a7a6d]">{p.service}</p>
      <h3 className="mt-0.5 text-xl font-bold text-[#12281f]">{p.title}</h3>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-lg font-bold text-[#0f5e54]">{p.price}</span>
        <button
          type="button"
          onClick={() => onBook?.(p)}
          className="rounded-md bg-[#0f5e54] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a7a6d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] focus-visible:ring-offset-2"
        >
          Book Now
        </button>
      </div>
    </div>
  </article>
);

/* ---------- Page ---------- */
const CustomerPortalPage = () => {
  const sectionRefs = useRef({});

  const scrollTo = (key) =>
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Hook these up to your routing / enquiry modal / API
  const handleSelect = (item) => console.log("Selected:", item.title);
  const handleBook = (p) => console.log("Book:", p.title);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8fafc] font-sans text-[#12281f]">
      {/* ===== Banner ===== */}
      <section className="relative h-[220px] w-full overflow-hidden sm:h-[300px] lg:h-[380px] 2xl:h-[460px]">
        <img
          src={BANNER_IMG}
          alt="Residential towers"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 top-0 h-1 bg-[#0f5e54]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow sm:text-6xl lg:text-7xl 2xl:text-8xl">
            Customer Portal
          </h1>
          <p className="mt-3 text-base text-white drop-shadow sm:text-xl lg:text-2xl 2xl:text-3xl">
            Find your dream property with us - No brokerage, No hassle
          </p>
        </div>
      </section>

      {/* ===== Service tabs ===== */}
      <section className="w-full bg-[#f8fafc] px-4 py-10 sm:px-8 sm:py-16 lg:px-12 2xl:px-20">
        <div className="flex w-full flex-wrap justify-center gap-3 sm:gap-4 lg:flex-nowrap">
          {SERVICES.map((s) => (
            <ServiceTab
              key={s.key}
              icon={s.icon}
              label={s.tab}
              onClick={() => scrollTo(s.key)}
            />
          ))}
        </div>
      </section>

      {/* ===== Browse by service ===== */}
      <section className="w-full bg-[#e8f1ee] px-4 py-10 sm:px-8 sm:py-14 lg:px-12 2xl:px-20">
        <div className="w-full">
          <h2 className="text-center text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl 2xl:text-6xl">
            Browse by service
          </h2>
          <p className="mt-3 text-center text-base text-slate-500 sm:text-lg 2xl:text-xl">
            Tap a card to view that service
          </p>

          {SERVICES.map((s) => (
            <div
              key={s.key}
              ref={(el) => (sectionRefs.current[s.key] = el)}
              className="scroll-mt-6 pt-12"
            >
              <h3 className="text-center text-2xl font-extrabold uppercase tracking-wide sm:text-3xl 2xl:text-4xl">
                {s.tab}
              </h3>
              <div className="mx-auto mt-2 h-1 w-16 bg-[#1a7a6d]" />

              <div className="mt-6">
                <Carousel showArrows={s.items.length > 4} center={s.items.length <= 4}>
                  {s.items.map((item, i) => (
                    <PolaroidCard
                      key={item.id}
                      item={item}
                      tilt={TILTS[i % TILTS.length]}
                      onSelect={handleSelect}
                    />
                  ))}
                </Carousel>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Why customers trust us ===== */}
      <section className="w-full bg-[#1c3b34] px-4 py-10 sm:px-8 sm:py-12 lg:px-12 2xl:px-20">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase text-white sm:text-3xl lg:text-4xl 2xl:text-5xl">
              Why customers trust us
            </h2>
            <span className="text-sm tracking-[0.25em] text-[#7fb8aa]">OUR PROMISE</span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-8">
            {TRUST.map((t) => (
              <TrustCard key={t.title} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Popular services ===== */}
      <section className="w-full bg-white px-4 py-10 sm:px-8 sm:py-14 lg:px-12 2xl:px-20">
        <div className="w-full">
          <h2 className="text-center text-3xl font-black uppercase tracking-tight text-[#1a7a6d] sm:text-4xl lg:text-5xl 2xl:text-6xl">
            Popular services
          </h2>
          <p className="mt-2 text-center text-lg text-slate-500">
            Booked by customers near you
          </p>
          <div className="mx-auto mt-4 h-1 w-16 bg-[#1a7a6d]" />

          <div className="mt-6">
            <Carousel showArrows>
              {POPULAR.map((p) => (
                <PopularCard key={p.id} p={p} onBook={handleBook} />
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerPortalPage;