import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Sofa, Zap, Hammer, Droplets, Layers, Ruler, HardHat, Building2, Settings,
  ArrowRight, ChevronRight, Phone, ChevronDown, CheckCircle2,
  BadgeCheck, Wallet, MapPin, ShieldCheck, PhoneCall, Headphones,
} from "lucide-react";
import ResidentialConstruction from "../../assets/ourservices/ResidentialConstruction.png";
import InteriorConstructionAndDesign from "../../assets/ourservices/InteriorConstructionAndDesign.png";
import ElectricalAndPlumbing from "../../assets/ourservices/ElectricalAndPlumbing.png";
import RenovationAndRepair from "../../assets/ourservices/RenovationAndRepair.png";


/* ---------- Theme ----------
  dark teal : #0f5e54   teal : #1a7a6d   mint : #e8f1ee
  light bg  : #f8fafc   deep green : #1c3b34   ink : #12281f

  Breakpoints: base | sm 640 | md 768 | lg 1024 | xl 1280 | 2xl 1536
------------------------------ */

const BANNER_IMG =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

const SUPPORT_PHONE = "+91 73972 60093";
const SUPPORT_TEL = "tel:+917397260093";

const WRAP = "mx-auto w-full max-w-[1200px] 2xl:max-w-[1360px]";
const SECTION_PAD = "px-4 sm:px-6 lg:px-8 xl:px-12";

/* ---------- Service categories + sub categories ---------- */
const CATEGORIES = [
  {
    slug: "residential-construction",
    short: "Residential Construction",
    name: "Residential Construction Services",
    icon: Home,
    img: ResidentialConstruction,
    items: [
      "Individual House Construction", "Villa Construction", "Bungalow Construction",
      "Apartment Construction", "Row House Construction", "Farmhouse Construction",
      "Duplex House Construction", "Independent Floor Construction",
      "Rental House Construction", "Residential Building Construction",
    ],
  },
  {
    slug: "interior-construction-design",
    short: "Interior & Design",
    name: "Interior Construction & Design Services",
    icon: Sofa,
    img:InteriorConstructionAndDesign,
    items: [
      "Residential Interior Design", "Commercial Interior Design",
      "Modular Interior Services", "Interior Finishing Services", "Interior Design Styles",
    ],
  },
  {
    slug: "electrical-plumbing",
    short: "Electrical & Plumbing",
    name: "Electrical & Plumbing Services",
    icon: Zap,
    img:ElectricalAndPlumbing,
    items: [
      "Residential Electrical Installation", "Commercial Electrical Installation",
      "Wiring & Rewiring", "Electrical Panel Installation", "Lighting Installation",
      "Plumbing Installation", "Water Tank Installation", "Bathroom Plumbing",
      "Drainage Pipe Installation", "Sanitary Fittings Installation",
    ],
  },
  {
    slug: "renovation-repair",
    short: "Renovation & Repair",
    name: "Renovation & Repair Services",
    icon: Hammer,
    img:RenovationAndRepair,
    items: [
      "Complete House Renovation", "Apartment Renovation", "Kitchen Renovation",
      "Bathroom Renovation", "Office Renovation", "Building Extension",
      "Structural Repair", "Roof Repair", "Crack Repair", "Repainting & Refurbishment",
    ],
  },
  {
    slug: "waterproofing-protection",
    short: "Waterproofing & Protection",
    name: "Waterproofing & Protection Services",
    icon: Droplets,
    img: img("photo-1572981779307-38b8cabb2407"),
    items: [
      "Terrace Waterproofing", "Bathroom Waterproofing", "Basement Waterproofing",
      "Roof Waterproofing", "External Wall Waterproofing", "Water Leakage Repair",
      "Damp Proofing", "Expansion Joint Waterproofing",
    ],
  },
  {
    slug: "exterior-landscaping",
    short: "Exterior & Landscaping",
    name: "Exterior & Landscaping Services",
    icon: Layers,
    img: img("photo-1589939705384-5185137a7f0f"),
    items: [
      "Compound Wall Construction", "Gate Installation", "Driveway Construction",
      "Paver Block Installation", "Garden Landscaping", "Terrace Garden Development",
      "Outdoor Seating Construction", "Swimming Pool Construction", "Rainwater Harvesting",
      "External Painting", "Boundary Wall Repair", "Outdoor Lighting Installation",
    ],
  },
  {
    slug: "architectural-engineering",
    short: "Architectural & Engineering",
    name: "Architectural & Engineering Services",
    icon: Ruler,
    img: img("photo-1554224155-6726b3ff858f"),
    items: [
      "Architectural Design", "Building Plan Preparation", "3D Elevation Design",
      "Structural Design", "Soil Testing", "Site Survey", "Quantity Surveying",
      "BOQ Preparation", "Building Approval Assistance", "Construction Project Planning",
    ],
  },
  {
    slug: "civil-structural-construction",
    short: "Civil & Structural",
    name: "Civil & Structural Construction Services",
    icon: HardHat,
    img: img("photo-1504307651254-35680f356dfd"),
    items: [
      "Site Excavation", "Soil Filling & Leveling", "Foundation Construction",
      "RCC Construction", "Column Construction", "Beam Construction", "Slab Construction",
      "Brickwork", "Blockwork", "Masonry Work", "Plastering Work", "Structural Steel Work",
      "Concrete Flooring", "Retaining Wall Construction", "Structural Strengthening",
    ],
  },
  {
    slug: "commercial-construction",
    short: "Commercial Construction",
    name: "Commercial Construction Services",
    icon: Building2,
    img: img("photo-1497366811353-6870744d04b2"),
    items: [
      "Office Building Construction", "Shopping Complex Construction",
      "Retail Shop Construction", "Hotel Construction", "Restaurant Construction",
      "Hospital Construction", "School Building Construction", "Warehouse Construction",
      "Showroom Construction", "Commercial Complex Construction",
    ],
  },
  {
    slug: "specialized-construction",
    short: "Specialized Construction",
    name: "Specialized Construction Services",
    icon: Settings,
    img: img("photo-1581244277943-fe4a9c777189"),
    items: [
      "Pre-Engineered Building Construction", "Prefabricated House Construction",
      "Steel Structure Construction", "Industrial Shed Construction",
      "Solar Panel Mounting Structures", "Fire Safety System Installation",
      "Lift & Elevator Installation", "HVAC Installation", "Acoustic Treatment",
      "Green Building Solutions",
    ],
  },
];

/* ---------- How it works ---------- */
const STEPS = [
  { no: "1", title: "Browse Categories", desc: "Explore every construction, interior, repair and engineering service in one place." },
  { no: "2", title: "Pick a Service", desc: "Open a category to see all its sub-services and choose what you need." },
  { no: "3", title: "Get in Touch", desc: "Contact verified service providers directly - no brokerage, no middlemen." },
  { no: "4", title: "Get It Done", desc: "Book a free site inspection, finalise the quote and start your project." },
];

/* ---------- Why choose us ---------- */
const BENEFITS = [
  { icon: BadgeCheck, title: "Verified Professionals", desc: "Choose service providers who carry a Verified Partner badge." },
  { icon: Wallet, title: "Transparent Pricing", desc: "Clear quotes up front - no brokerage and no hidden charges." },
  { icon: MapPin, title: "Free Site Inspection", desc: "Book a site visit for any service before you decide, at no cost." },
  { icon: ShieldCheck, title: "Quality Workmanship", desc: "From foundation to finishing, find skilled teams for every stage." },
  { icon: PhoneCall, title: "Direct Contact", desc: "Talk to service providers directly and close your deal faster." },
  { icon: Headphones, title: "Dedicated Support", desc: "Our team helps you pick the right category and provider." },
];

/* ---------- FAQ ---------- */
const FAQS = [
  { q: "How do I find the right service?", a: "Browse the categories above, hover over a card (or tap it on mobile) to see every sub-service, then click View All Services to continue." },
  { q: "Is there any brokerage or commission?", a: "No. Eliteinova Properties Services is a no-brokerage platform - you deal with service providers directly." },
  { q: "Are the service providers verified?", a: "Providers on our platform carry a Verified Partner badge so you can choose with confidence." },
  { q: "Can I request a site inspection before booking?", a: "Yes. You can book a free site visit for any service before you make a decision." },
  { q: "What if I can't find the service I need?", a: "Call our team and we'll help you find the right category and the right provider." },
];

/* ---------- Animations + flip styles ---------- */
const ospStyle = `
  @keyframes ospFloat   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  @keyframes ospMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes ospGrow    { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes ospShimmer { 0% { left: -60%; } 60%,100% { left: 130%; } }
  @keyframes ospRing    { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.5); opacity: 0; } }

  .osp-float   { animation: ospFloat 3s ease-in-out infinite; }
  /* running category strip */
  .osp-track   { animation: ospMarquee 45s linear infinite; }
  .osp-marquee:hover .osp-track,
  .osp-marquee:focus-within .osp-track,
  .osp-marquee:active .osp-track { animation-play-state: paused; }
  .osp-grow    { transform-origin: center; animation: ospGrow .9s ease-out both .3s; }
  .osp-shimmer { animation: ospShimmer 3.5s ease-in-out infinite; }
  .osp-hover-ring:hover .osp-ring { animation: ospRing 1.2s ease-out infinite; }

  /* ---- flip card (Flipkart style) ---- */
  .osp-scene { perspective: 1200px; -webkit-tap-highlight-color: transparent; }
  .osp-inner { transition: transform .7s cubic-bezier(.4,.2,.2,1); transform-style: preserve-3d; }
  .osp-face  { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
  .osp-back  { transform: rotateY(180deg); }

  /* desktop: hover anywhere on the card flips it */
  @media (hover: hover) {
    .osp-scene:hover .osp-inner { transform: rotateY(180deg); }
  }
  /* touch: tap flips it */
  @media (hover: none) {
    .osp-scene.is-flipped .osp-inner { transform: rotateY(180deg); }
  }
  /* keyboard: tabbing onto the card flips it */
  .osp-scene:focus-visible .osp-inner { transform: rotateY(180deg); }
  .osp-scene:focus-visible { outline: none; }

  /* thin scrollbar for the sub-category list */
  .osp-scroll { scrollbar-width: thin; scrollbar-color: #1a7a6d rgba(15,94,84,.12); }
  .osp-scroll::-webkit-scrollbar { width: 5px; }
  .osp-scroll::-webkit-scrollbar-track { background: rgba(15,94,84,.12); border-radius: 999px; }
  .osp-scroll::-webkit-scrollbar-thumb { background: #1a7a6d; border-radius: 999px; }

  @media (prefers-reduced-motion: reduce) {
    .osp-float, .osp-track, .osp-grow, .osp-shimmer, .osp-hover-ring:hover .osp-ring { animation: none; }
    .osp-marquee { overflow-x: auto; }
    .osp-inner { transition-duration: .01s; }
  }
`;

/* ---------- Scroll reveal ---------- */
const Reveal = ({ delay = 0, className = "", children }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out motion-reduce:transition-none ${
        seen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ---------- Section heading ---------- */
const SectionHead = ({ badge, badgeClass = "bg-[#cfe8df] text-[#0f5e54]", title, subtitle, live = false }) => (
  <div className="mx-auto max-w-3xl text-center">
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider sm:px-3.5 sm:text-[11px] ${badgeClass}`}
    >
      {live && (
        <span className="relative mr-1.5 inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1a7a6d] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1a7a6d]" />
        </span>
      )}
      {badge}
    </span>
    <h2 className="mt-3 text-xl font-extrabold leading-tight tracking-tight text-[#12281f] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[2.6rem]">
      {title}
    </h2>
    <p className="mt-2 text-[13px] text-slate-500 sm:text-sm md:text-base">{subtitle}</p>
    <div className="mx-auto mt-4 flex items-center justify-center gap-2">
      <span className="osp-grow h-1 w-12 rounded-full bg-gradient-to-r from-transparent to-[#1a7a6d]" />
      <span className="h-2 w-2 rotate-45 bg-[#1a7a6d]" />
      <span className="osp-grow h-1 w-12 rounded-full bg-gradient-to-l from-transparent to-[#1a7a6d]" />
    </div>
  </div>
);

/* ---------- Flip card ---------- */
const ServiceFlipCard = ({ cat, onViewAll }) => {
  const [flipped, setFlipped] = useState(false); // used on touch devices
  const Icon = cat.icon;

  const stop = (e) => e.stopPropagation();
  const goAll = (e) => {
    e.stopPropagation();
    onViewAll(cat);
  };

  return (
    <div
      className={`osp-scene h-[350px] cursor-pointer sm:h-[360px] 2xl:h-[380px] ${flipped ? "is-flipped" : ""}`}
      tabIndex={0}
      role="group"
      aria-label={`${cat.name} - hover or tap to see all services`}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setFlipped(false);
      }}
    >
      <div className="osp-inner relative h-full w-full">
        {/* ===== FRONT : image on top, name + button below ===== */}
        <div className="osp-face absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#e8f1ee] to-[#d3eae2] shadow-md ring-1 ring-[#bfdcd2] sm:rounded-3xl">
          {/* image */}
          <div className="relative h-[66%] w-full overflow-hidden bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d]">
            <img
              src={cat.img}
              alt={cat.name}
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />

            {/* small chips on the image */}
            <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-[#0f5e54] shadow">
              <Icon size={16} />
            </div>
            <span className="absolute right-3 top-3 rounded-full bg-[#0f5e54]/85 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
              {cat.items.length} Services
            </span>
          </div>

          {/* name + button */}
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-3.5 pb-3.5 pt-2.5">
            <h3 className="flex min-h-[2.4rem] items-center text-center text-[13px] font-bold leading-snug text-[#0f3d38] sm:text-sm">
              {cat.name}
            </h3>
            <button
              type="button"
              onClick={goAll}
              className="group/f relative flex w-full items-center justify-center gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-[#0f5e54] to-[#1a7a6d] py-2 text-xs font-bold text-white shadow-sm transition hover:shadow-md active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover/f:left-[150%]" />
              <span className="relative">View Services</span>
              <ChevronRight size={14} className="relative transition-transform group-hover/f:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* ===== BACK : sub categories + View All button ===== */}
        <div className="osp-face osp-back absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#e8f1ee] to-[#d3eae2] shadow-xl ring-1 ring-[#1a7a6d]/40 sm:rounded-3xl">
          <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#0f5e54] to-[#1a7a6d]" />

          <div className="flex flex-1 flex-col overflow-hidden p-5">
            {/* header */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-white shadow-md">
                <Icon size={19} />
              </div>
              <h3 className="text-[15px] font-extrabold leading-tight text-[#12281f] sm:text-base">{cat.name}</h3>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Services included</p>
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#0f5e54]">
                {cat.items.length}
              </span>
            </div>
            <div className="mt-2 h-px w-full bg-gradient-to-r from-[#1a7a6d]/40 via-[#1a7a6d]/15 to-transparent" />

            {/* scrollable list */}
            <ul
              onClick={stop}
              className="osp-scroll mt-3 flex-1 space-y-2 overflow-y-auto overscroll-contain pb-3 pr-2"
            >
              {cat.items.map((label) => (
                <li
                  key={label}
                  className="group/li flex items-start gap-2 text-[12.5px] font-semibold leading-snug text-[#12281f] transition-all duration-200 hover:translate-x-1 hover:text-[#0f5e54]"
                >
                  <span className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-[#1a7a6d] ring-4 ring-white transition-all duration-200 group-hover/li:scale-125 group-hover/li:bg-[#0f5e54]" />
                  {label}
                </li>
              ))}
            </ul>

            {/* view all button */}
            <button
              type="button"
              onClick={goAll}
              className="group/b relative mt-2 flex w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#0f5e54] to-[#1a7a6d] py-2.5 text-[13px] font-bold text-white shadow-md transition duration-300 hover:shadow-lg active:scale-[0.98] sm:text-sm"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover/b:left-[150%]" />
              <span className="relative">View All Services</span>
              <ArrowRight size={16} className="relative transition-transform duration-300 group-hover/b:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Benefit card ---------- */
const BenefitCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="osp-hover-ring group relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-[#f8fafc] p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_22px_40px_-14px_rgba(15,94,84,0.45)] lg:p-6">
      <span className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] transition-transform duration-500 ease-out group-hover:translate-y-0" />
      <span className="absolute right-4 top-4 z-10 flex h-6 w-6 scale-0 items-center justify-center rounded-full bg-white/20 text-white transition duration-300 group-hover:scale-100">
        <CheckCircle2 size={14} />
      </span>

      <div className="relative z-10">
        <div className="osp-float relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-white shadow-md transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:from-white group-hover:to-[#e8f1ee] group-hover:text-[#0f5e54] sm:h-11 sm:w-11">
          <span className="osp-ring pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-2 ring-white/70" />
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-[15px] font-bold text-[#12281f] transition-colors duration-300 group-hover:text-white sm:text-base lg:text-lg">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-white/85 sm:text-sm">
          {item.desc}
        </p>
        <span className="mt-4 block h-0.5 w-8 rounded-full bg-[#1a7a6d]/40 transition-all duration-500 group-hover:w-20 group-hover:bg-[#7fe0c5]" />
      </div>
    </div>
  );
};

/* ---------- Page ---------- */
const OurServicesPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const scrollToServices = () =>
    document.getElementById("our-services")?.scrollIntoView({ behavior: "smooth", block: "start" });

  // "View All Services" -> category page
  const handleViewAll = (cat) => navigate(`/services/${cat.slug}`);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8fafc] font-sans text-[#12281f]">
      <style>{ospStyle}</style>

      {/* ===== 1. BANNER ===== */}
      <section className="relative h-[210px] w-full overflow-hidden sm:h-[250px] md:h-[280px] lg:h-[320px] xl:h-[340px] 2xl:h-[400px]">
        <img src={BANNER_IMG} alt="Our Services" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-0 top-0 h-1 bg-[#0f5e54]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-6 text-center">
          <h1 className="bg-gradient-to-r from-[#b7f5e3] via-[#7fe0c5] to-[#34c3a8] bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-lg sm:text-5xl lg:text-6xl 2xl:text-7xl">
            Our Services
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-white drop-shadow sm:text-lg lg:text-xl 2xl:text-2xl">
            Construction, interior, repair and engineering - everything for your property in one place
          </p>
          <button
            type="button"
            onClick={scrollToServices}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[11px] font-extrabold uppercase tracking-wide text-[#0f5e54] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:text-xs"
          >
            Explore Services <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ===== BROWSE ALL SERVICES (floating bar, running chips - hover to pause, click to open) ===== */}
      <section className="relative z-20 -mt-7 px-3 pb-2 sm:px-5 lg:px-6">
        <div className="mx-auto flex w-full max-w-[1480px] items-stretch 2xl:max-w-[1700px] overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_-12px_rgba(15,94,84,0.45)] ring-1 ring-[#cfe8df]">
          {/* fixed label */}
          <div className="flex shrink-0 items-center gap-2 bg-gradient-to-br from-[#0b3b34] to-[#1c3b34] px-3.5 py-3 text-white sm:px-5">
            <Layers size={18} className="shrink-0" />
            <div className="leading-tight">
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#a9dccf]">Browse</p>
              <p className="text-xs font-extrabold sm:text-sm">All Services</p>
            </div>
          </div>

          {/* running chips */}
          <div className="osp-marquee min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className="osp-track flex h-full w-max items-center">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center gap-3 py-2.5 pl-3 pr-0"
                  aria-hidden={copy === 1}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={`${cat.slug}-${copy}`}
                      type="button"
                      tabIndex={copy === 1 ? -1 : 0}
                      onClick={() => handleViewAll(cat)}
                      className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#0f5e54] to-[#1a7a6d] py-1 pl-1 pr-4 text-xs font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:from-[#0b3b34] hover:to-[#1c3b34] hover:text-[#7fe0c5] hover:shadow-md hover:ring-2 hover:ring-[#7fe0c5]/60 active:scale-95 sm:text-[13px]"
                    >
                      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] ring-2 ring-white">
                        <img
                          src={cat.img}
                          alt=""
                          loading="lazy"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </span>
                      {cat.short}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. OUR SERVICES (flip cards) ===== */}
      <section
        id="our-services"
        className={`relative w-full scroll-mt-4 overflow-hidden bg-gradient-to-b from-[#eef7f3] to-[#f8fafc] ${SECTION_PAD} py-8 sm:py-10 lg:py-14`}
      >

        <Reveal className="relative z-10">
          <SectionHead
            live
            badge="Browse by category"
            title="Our Service Categories"
            subtitle="Hover over a card to see all its services - tap the card on mobile."
          />
        </Reveal>

        <div className={`${WRAP} relative z-10 mt-7 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4`}>
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 4) * 100}>
              <ServiceFlipCard cat={cat} onViewAll={handleViewAll} />
            </Reveal>
          ))}
        </div>

      </section>

      {/* ===== 3. HOW IT WORKS ===== */}
      <section className={`w-full bg-white ${SECTION_PAD} py-8 sm:py-10 lg:py-14`}>
        <Reveal>
          <SectionHead
            badge="Simple Process"
            title="How It Works"
            subtitle="Find and book the service you need in four easy steps."
          />
        </Reveal>

        <div className={`${WRAP} mt-7 grid grid-cols-1 gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6`}>
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 100} className="h-full">
              <div className="group relative h-full rounded-2xl border border-slate-100 bg-[#f8fafc] p-5 text-center transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_22px_40px_-14px_rgba(15,94,84,0.35)] lg:p-6">
                <div className="osp-float mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-base font-extrabold text-white shadow-lg transition duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:text-lg">
                  {s.no}
                </div>
                <h3 className="mt-4 text-[15px] font-bold sm:text-base lg:text-lg">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 sm:text-sm">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 4. WHY CHOOSE US ===== */}
      <section className={`relative w-full overflow-hidden bg-[#e8f1ee] ${SECTION_PAD} py-8 sm:py-10 lg:py-14`}>

        <Reveal className="relative z-10">
          <SectionHead
            live
            badge="Why Choose Us"
            badgeClass="bg-white text-[#0f5e54]"
            title="Why Choose Eliteinova Properties Services?"
            subtitle="Trusted professionals, clear pricing and direct contact - everything you need for a smooth project."
          />
        </Reveal>

        <div className={`${WRAP} relative z-10 mt-7 grid grid-cols-1 gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6`}>
          {BENEFITS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 120} className="h-full">
              <BenefitCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 5. FAQ ===== */}
      <section className={`w-full bg-white ${SECTION_PAD} py-8 sm:py-10 lg:py-14`}>
        <Reveal>
          <SectionHead
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Quick answers about finding and booking services."
          />
        </Reveal>

        <div className="mx-auto mt-7 flex max-w-3xl flex-col gap-3 sm:mt-9">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <Reveal key={f.q} delay={i * 80}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    open ? "border-[#1a7a6d]/50 bg-[#f4faf7] shadow-md" : "border-slate-100 bg-[#f8fafc]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
                  >
                    <span className="text-sm font-bold text-[#12281f] sm:text-base">{f.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        open ? "rotate-180 bg-[#0f5e54] text-white" : "bg-[#e8f1ee] text-[#0f5e54]"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{ maxHeight: open ? 200 : 0, opacity: open ? 1 : 0 }}
                  >
                    <p className="px-4 pb-4 text-[13px] leading-relaxed text-slate-500 sm:px-5 sm:text-sm">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== 6. FINAL CTA ===== */}
      <section className={`relative w-full overflow-hidden bg-[#1c3b34] ${SECTION_PAD} py-10 sm:py-12 lg:py-16`}>

        <Reveal className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-xl font-extrabold leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
              Can't find the service you need?
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] text-[#bfe3d9] sm:text-sm md:text-base">
              Talk to our team - we'll help you choose the right category and connect you with the right provider.
            </p>

            <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-white/90 sm:gap-x-6 sm:text-sm">
              {["No brokerage", "Verified providers", "Free site inspection"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#7fe0c5]" /> {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row">
              <a
                href={SUPPORT_TEL}
                className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FDE047] to-[#F59E0B] px-6 py-2.5 text-[13px] font-extrabold text-[#12281f] shadow-lg transition hover:-translate-y-0.5 sm:w-auto sm:px-7 sm:py-3 sm:text-sm"
              >
                <span className="osp-shimmer pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <Phone size={16} className="relative" /> <span className="relative">Call {SUPPORT_PHONE}</span>
              </a>
              <button
                type="button"
                onClick={() => navigate("/post-services")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-2.5 text-[13px] font-bold text-white transition hover:bg-white/10 sm:w-auto sm:px-7 sm:py-3 sm:text-sm"
              >
                Post Your Service <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default OurServicesPage;