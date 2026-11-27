import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Sofa, Zap, Hammer, Droplets, Layers, Ruler, HardHat, Building2, Settings,
  ArrowRight, ChevronRight, Phone, ChevronDown, CheckCircle2,
  BadgeCheck, Wallet, MapPin, ShieldCheck, PhoneCall, Headphones,
  Search, MousePointerClick, ClipboardCheck, HelpCircle, Plus,
} from "lucide-react";
import ResidentialConstruction from "../../assets/ourservices/ResidentialConstruction.png";
import InteriorConstructionAndDesign from "../../assets/ourservices/InteriorConstructionAndDesign.png";
import ElectricalAndPlumbing from "../../assets/ourservices/ElectricalAndPlumbing.png";
import RenovationAndRepair from "../../assets/ourservices/RenovationAndRepair.png";
import WaterproofingAndProtection from "../../assets/ourservices/WaterproofingAndProtection.png";
import ExteriorAndLandscaping from "../../assets/ourservices/ExteriorAndLandscaping.png";
import ArchitecturalEngineering from "../../assets/ourservices/ArchitecturalEngineering.png";



/* ---------- Theme ----------
  dark teal : #0f5e54   teal : #1a7a6d   mint : #e8f1ee
  light bg  : #f8fafc   deep green : #1c3b34   ink : #12281f

  Breakpoints: base | sm 640 | md 768 | lg 1024 | xl 1280 | 2xl 1536
------------------------------ */

const BANNER_IMG =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

const CTA_BG_IMG = "";

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
    img:WaterproofingAndProtection,
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
    img:ExteriorAndLandscaping,
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
    img:ArchitecturalEngineering,
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
  { no: "1", icon: Search, title: "Browse Categories", desc: "Explore every construction, interior, repair and engineering service in one place." },
  { no: "2", icon: MousePointerClick, title: "Pick a Service", desc: "Open a category to see all its sub-services and choose what you need." },
  { no: "3", icon: PhoneCall, title: "Get in Touch", desc: "Contact verified service providers directly - no brokerage, no middlemen." },
  { no: "4", icon: ClipboardCheck, title: "Get It Done", desc: "Book a free site inspection, finalise the quote and start your project." },
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
            <h3 className="flex min-h-[2.4rem] items-center text-center text-[13px] font-bold leading-snug text-[#0f3d38] sm:text-[15px]">
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
    <div className="group relative h-full overflow-hidden rounded-2xl border border-[#cfe8df] bg-gradient-to-b from-white to-[#eef7f3] p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#1a7a6d]/50 hover:shadow-[0_24px_44px_-16px_rgba(15,94,84,0.5)] lg:p-6">
      {/* top line */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0f5e54] via-[#1a7a6d] to-[#34c3a8]" />
      {/* corner glow */}
      <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7fe0c5]/30 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#7fe0c5]/50" />
      {/* corner dots */}
      <span
        className="pointer-events-none absolute bottom-2 right-2 h-14 w-14 opacity-60"
        style={{ backgroundImage: "radial-gradient(#1a7a6d66 1.2px, transparent 1.2px)", backgroundSize: "8px 8px" }}
      />
      {/* shine sweep on hover */}
      <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-1000 group-hover:left-[150%]" />
      {/* bottom glow line on hover */}
      <span className="pointer-events-none absolute inset-x-8 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#1a7a6d] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* tick badge on hover */}
      <span className="absolute right-3 top-4 z-10 flex h-6 w-6 scale-0 items-center justify-center rounded-full bg-[#0f5e54] text-white shadow transition duration-300 group-hover:scale-100">
        <CheckCircle2 size={14} />
      </span>

      <div className="relative z-10">
        <div className="osp-float relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-white shadow-lg ring-4 ring-white transition duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-[0_10px_24px_-6px_rgba(15,94,84,0.7)]">
          <span className="osp-pulse pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-[#1a7a6d]/60" />
          <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
        </div>
        <h3 className="mt-4 text-[15px] font-bold text-[#12281f] transition-colors duration-300 group-hover:text-[#0f5e54] sm:text-base lg:text-lg">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-700 sm:text-sm">
          {item.desc}
        </p>
        <span className="mt-4 block h-0.5 w-8 rounded-full bg-[#1a7a6d]/40 transition-all duration-500 group-hover:w-24 group-hover:bg-[#1a7a6d]" />
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
      <section className={`relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f1f8f5] to-white ${SECTION_PAD} py-6 sm:py-8 lg:py-10`}>
        {/* grid pattern */}
        <span
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(#1a7a6d14 1px, transparent 1px), linear-gradient(90deg, #1a7a6d14 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        {/* dotted pattern */}
        <span
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: "radial-gradient(#1a7a6d55 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
            maskImage: "linear-gradient(to right, black, transparent 35%, transparent 65%, black)",
            WebkitMaskImage: "linear-gradient(to right, black, transparent 35%, transparent 65%, black)",
          }}
        />
        {/* soft blobs */}
        <span className="osp-blob pointer-events-none absolute -left-24 top-4 h-64 w-64 rounded-full bg-[#1a7a6d]/15 blur-3xl" />
        <span
          className="osp-blob pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#7fe0c5]/30 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        {/* floating shapes */}
        <span className="osp-spin pointer-events-none absolute left-[6%] top-[14%] hidden h-14 w-14 rounded-full border-2 border-dashed border-[#1a7a6d]/30 md:block" />
        <span className="osp-spin pointer-events-none absolute bottom-[10%] right-[7%] hidden h-20 w-20 rounded-full border-2 border-dashed border-[#1a7a6d]/25 md:block" />
        <span className="osp-blob pointer-events-none absolute right-[12%] top-[12%] hidden h-4 w-4 rotate-45 bg-[#1a7a6d]/30 md:block" style={{ animationDelay: "1s" }} />
        <span className="osp-blob pointer-events-none absolute bottom-[18%] left-[10%] hidden h-3 w-3 rotate-45 bg-[#34c3a8]/50 md:block" style={{ animationDelay: "3s" }} />
        {/* twinkling dots */}
        {[
          ["8%", "40%", "0s"], ["16%", "70%", "0.8s"], ["26%", "12%", "1.6s"],
          ["38%", "86%", "0.4s"], ["62%", "6%", "1.2s"], ["74%", "92%", "2s"],
          ["88%", "30%", "0.6s"], ["92%", "62%", "1.8s"],
        ].map(([top, left, delay]) => (
          <span
            key={`${top}-${left}`}
            className="osp-twinkle pointer-events-none absolute hidden h-1.5 w-1.5 rounded-full bg-[#1a7a6d] md:block"
            style={{ top, left, animationDelay: delay }}
          />
        ))}

        <Reveal className="relative z-10">
          <SectionHead
            live
            badge="Simple Process"
            title="How It Works"
            subtitle="Find and book the service you need in four easy steps."
          />
        </Reveal>

        <div className={`${WRAP} relative z-10 mt-6 sm:mt-7`}>
          {/* animated connector (desktop) */}
          <div className="osp-flow pointer-events-none absolute left-[12.5%] right-[12.5%] top-[52px] hidden h-0.5 lg:block" />

          <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.no} delay={i * 120} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-[#cfe8df] bg-gradient-to-b from-[#f1f8f5] to-[#dfeee8] p-4 pt-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#1a7a6d]/50 hover:from-white hover:to-[#f1f8f5] hover:shadow-[0_24px_44px_-16px_rgba(15,94,84,0.5)] lg:p-5 lg:pt-6">
                    {/* top line */}
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0f5e54] via-[#1a7a6d] to-[#34c3a8]" />
                    {/* shine sweep on hover */}
                    <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-1000 group-hover:left-[150%]" />
                    {/* bottom glow line on hover */}
                    <span className="pointer-events-none absolute inset-x-8 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#1a7a6d] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10">
                      <div className="osp-float relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-lg font-extrabold text-white shadow-lg ring-4 ring-white transition duration-500 group-hover:scale-110 group-hover:shadow-[0_10px_24px_-6px_rgba(15,94,84,0.7)]">
                        <span className="osp-pulse pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#1a7a6d]/60" />
                        <span className="absolute transition-all duration-500 group-hover:rotate-90 group-hover:scale-0 group-hover:opacity-0">
                          {s.no}
                        </span>
                        <Icon
                          size={22}
                          className="absolute -rotate-90 scale-0 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100"
                        />
                      </div>

                      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a7a6d]">
                        Step {s.no}
                      </p>
                      <h3 className="mt-0.5 text-[15px] font-bold text-[#12281f] transition-colors duration-300 group-hover:text-[#0f5e54] sm:text-base lg:text-lg">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-700 sm:text-sm">
                        {s.desc}
                      </p>
                      <span className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-[#1a7a6d]/40 transition-all duration-500 group-hover:w-24 group-hover:bg-[#1a7a6d]" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

         {/* ===== 4. WHY CHOOSE US ===== */}
      <section className={`relative w-full overflow-hidden bg-gradient-to-b from-[#e8f1ee] via-[#dcece6] to-[#e8f1ee] ${SECTION_PAD} py-8 sm:py-10 lg:py-12`}>
        {/* dotted pattern */}
        <span
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: "radial-gradient(#1a7a6d55 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(ellipse at center, transparent 35%, black 90%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, transparent 35%, black 90%)",
          }}
        />
        {/* soft blobs */}
        <span className="osp-blob pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#1a7a6d]/20 blur-3xl" />
        <span
          className="osp-blob pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#7fe0c5]/40 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        {/* floating shapes */}
        <span className="osp-spin pointer-events-none absolute right-[5%] top-[10%] hidden h-20 w-20 rounded-full border-2 border-dashed border-[#1a7a6d]/30 md:block" />
        <span className="osp-spin pointer-events-none absolute bottom-[8%] left-[4%] hidden h-14 w-14 rounded-full border-2 border-dashed border-[#1a7a6d]/30 md:block" />
        <span className="osp-blob pointer-events-none absolute left-[9%] top-[14%] hidden h-4 w-4 rotate-45 bg-[#1a7a6d]/30 md:block" style={{ animationDelay: "1s" }} />
        <span className="osp-blob pointer-events-none absolute bottom-[16%] right-[10%] hidden h-3 w-3 rotate-45 bg-[#34c3a8]/50 md:block" style={{ animationDelay: "3s" }} />
        {/* twinkling dots */}
        {[
          ["10%", "30%", "0s"], ["18%", "78%", "0.8s"], ["46%", "4%", "1.6s"],
          ["54%", "95%", "0.4s"], ["82%", "22%", "1.2s"], ["90%", "70%", "2s"],
        ].map(([top, left, delay]) => (
          <span
            key={`${top}-${left}`}
            className="osp-twinkle pointer-events-none absolute hidden h-1.5 w-1.5 rounded-full bg-[#1a7a6d] md:block"
            style={{ top, left, animationDelay: delay }}
          />
        ))}

        <Reveal className="relative z-10">
          <SectionHead
            live
            badge="Why Choose Us"
            badgeClass="bg-white text-[#0f5e54]"
            title="Why Choose Eliteinova Properties Services?"
            subtitle="Trusted professionals, clear pricing and direct contact - everything you need for a smooth project."
          />
        </Reveal>

        <div className={`${WRAP} relative z-10 mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5`}>
          {BENEFITS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 120} className="h-full">
              <BenefitCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

           {/* ===== 5. FAQ ===== */}
      <section className={`relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f1f8f5] to-white ${SECTION_PAD} py-4 sm:py-5 lg:py-6`}>
        {/* dotted pattern */}
        <span
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: "radial-gradient(#1a7a6d55 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
            maskImage: "linear-gradient(to right, black, transparent 30%, transparent 70%, black)",
            WebkitMaskImage: "linear-gradient(to right, black, transparent 30%, transparent 70%, black)",
          }}
        />
        {/* soft blobs */}
        <span className="osp-blob pointer-events-none absolute -left-24 top-4 h-64 w-64 rounded-full bg-[#1a7a6d]/15 blur-3xl" />
        <span
          className="osp-blob pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#7fe0c5]/30 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        {/* floating shapes */}
        <span className="osp-spin pointer-events-none absolute right-[5%] top-[8%] hidden h-14 w-14 rounded-full border-2 border-dashed border-[#1a7a6d]/30 md:block" />
        <span className="osp-spin pointer-events-none absolute bottom-[6%] left-[4%] hidden h-12 w-12 rounded-full border-2 border-dashed border-[#1a7a6d]/30 md:block" />
        <span className="osp-blob pointer-events-none absolute left-[8%] top-[12%] hidden h-3.5 w-3.5 rotate-45 bg-[#1a7a6d]/30 md:block" style={{ animationDelay: "1s" }} />
        {[
          ["12%", "26%", "0s"], ["22%", "90%", "0.8s"], ["60%", "3%", "1.6s"],
          ["78%", "96%", "0.4s"], ["92%", "40%", "1.2s"],
        ].map(([top, left, delay]) => (
          <span
            key={`${top}-${left}`}
            className="osp-twinkle pointer-events-none absolute hidden h-1.5 w-1.5 rounded-full bg-[#1a7a6d] md:block"
            style={{ top, left, animationDelay: delay }}
          />
        ))}

        <Reveal className="relative z-10">
          <SectionHead
            live
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Quick answers about finding and booking services."
          />
        </Reveal>

        <div className={`${WRAP} relative z-10 mt-4 grid gap-3 sm:mt-5 lg:grid-cols-[300px_1fr] lg:gap-4 xl:grid-cols-[340px_1fr]`}>
          {/* ---- help panel ---- */}
          <Reveal className="lg:self-start">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f5e54] via-[#1a7a6d] to-[#34c3a8] p-4 text-center shadow-[0_14px_30px_-14px_rgba(15,94,84,0.6)] lg:sticky lg:top-6 lg:p-5 lg:text-left">
              <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
              <span className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#7fe0c5]/30 blur-2xl" />
              <span
                className="pointer-events-none absolute bottom-2 right-2 h-14 w-14 opacity-50"
                style={{ backgroundImage: "radial-gradient(#ffffff 1.2px, transparent 1.2px)", backgroundSize: "8px 8px" }}
              />
              <div className="osp-float relative mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0f5e54] shadow-lg ring-4 ring-white/30 lg:mx-0">
                <span className="osp-pulse pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/60" />
                <HelpCircle size={22} />
              </div>
              <h3 className="relative mt-2 text-lg font-extrabold text-white">Still have questions?</h3>
              <p className="relative mt-0.5 text-[13px] leading-snug text-white/90">
                Our team will help you pick the right category and the right provider.
              </p>
              <a
                href={SUPPORT_TEL}
                className="relative mt-3 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FDE047] to-[#F59E0B] px-4 py-2 text-[13px] font-extrabold text-[#12281f] shadow-lg transition hover:-translate-y-0.5"
              >
                <span className="osp-shimmer pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <Phone size={15} className="relative" /> <span className="relative">{SUPPORT_PHONE}</span>
              </a>
            </div>
          </Reveal>

          {/* ---- accordion ---- */}
          <div className="flex flex-col gap-2">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 80}>
                  <div
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                      open
                        ? "border-[#1a7a6d]/50 bg-gradient-to-b from-white to-[#eef7f3] shadow-[0_14px_30px_-14px_rgba(15,94,84,0.45)]"
                        : "border-[#cfe8df] bg-gradient-to-b from-[#f8fcfa] to-[#eaf4f0] hover:-translate-y-0.5 hover:border-[#1a7a6d]/40 hover:shadow-md"
                    }`}
                  >
                    {/* left accent bar */}
                    <span
                      className={`pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#0f5e54] via-[#1a7a6d] to-[#34c3a8] transition-all duration-300 ${
                        open ? "opacity-100" : "opacity-40 group-hover:opacity-100"
                      }`}
                    />
                    {/* shine sweep on hover */}
                    <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-all duration-1000 group-hover:left-[150%]" />

                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      aria-expanded={open}
                      className="relative flex w-full items-center gap-3 py-2 pl-4 pr-3 text-left sm:pl-5 sm:pr-4"
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-extrabold transition-all duration-300 ${
                          open
                            ? "bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-white shadow-md"
                            : "bg-white text-[#0f5e54] ring-1 ring-[#cfe8df] group-hover:bg-[#e8f1ee]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 text-sm font-bold transition-colors duration-300 sm:text-[15px] ${
                          open ? "text-[#0f5e54]" : "text-[#12281f]"
                        }`}
                      >
                        {f.q}
                      </span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          open ? "rotate-180 bg-[#0f5e54] text-white" : "bg-white text-[#0f5e54] ring-1 ring-[#cfe8df] group-hover:bg-[#e8f1ee]"
                        }`}
                      >
                        <ChevronDown size={15} />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="relative pb-2.5 pl-[3.5rem] pr-4 text-[13px] leading-snug text-slate-600 sm:pl-[3.75rem] sm:pr-6 sm:text-sm">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

          {/* ===== 6. FINAL CTA ===== */}
      <section className={`relative w-full overflow-hidden bg-[#0b3b34] ${SECTION_PAD} py-8 sm:py-10 lg:py-12`}>
        {/* background image slot (set CTA_BG_IMG) */}
        {CTA_BG_IMG && (
          <img src={CTA_BG_IMG} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )}
        {/* theme overlay */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b3b34]/95 via-[#12493f]/88 to-[#1a7a6d]/80" />
        {/* diagonal stripes */}
        <span
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, #7fe0c510 0, #7fe0c510 1px, transparent 1px, transparent 18px)",
          }}
        />
        {/* left accent bar */}
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#7fe0c5] via-[#34c3a8] to-[#0f5e54]" />
        {/* glow blobs */}
        <span className="osp-blob pointer-events-none absolute -left-20 -top-10 h-72 w-72 rounded-full bg-[#34c3a8]/25 blur-3xl" />
        <span
          className="osp-blob pointer-events-none absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-[#7fe0c5]/25 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        {/* floating shapes */}
        <span className="osp-spin pointer-events-none absolute right-[4%] top-[10%] hidden h-20 w-20 rounded-full border-2 border-dashed border-[#7fe0c5]/30 md:block" />
        <span className="osp-spin pointer-events-none absolute bottom-[10%] left-[40%] hidden h-12 w-12 rounded-full border-2 border-dashed border-[#7fe0c5]/25 md:block" />
        <span className="osp-blob pointer-events-none absolute left-[46%] top-[14%] hidden h-3.5 w-3.5 rotate-45 bg-[#7fe0c5]/40 md:block" style={{ animationDelay: "1s" }} />
        {[
          ["16%", "8%", "0s"], ["84%", "12%", "0.8s"], ["50%", "52%", "1.6s"],
          ["24%", "92%", "0.4s"], ["88%", "70%", "1.2s"],
        ].map(([top, left, delay]) => (
          <span
            key={`${top}-${left}`}
            className="osp-twinkle pointer-events-none absolute hidden h-1.5 w-1.5 rounded-full bg-[#7fe0c5] md:block"
            style={{ top, left, animationDelay: delay }}
          />
        ))}

        <div className={`${WRAP} relative z-10 grid items-center gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10`}>
          {/* ---- left: content ---- */}
          <Reveal>
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b7f5e3] ring-1 ring-white/20 backdrop-blur sm:text-[11px]">
                <span className="relative mr-1.5 inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7fe0c5] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7fe0c5]" />
                </span>
                We are here to help
              </span>

              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-4xl">
                Can't find the{" "}
                <span className="bg-gradient-to-r from-[#b7f5e3] via-[#7fe0c5] to-[#34c3a8] bg-clip-text text-transparent">
                  service you need?
                </span>
              </h2>
              <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-[#7fe0c5] to-transparent lg:mx-0" />
              <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-[#bfe3d9] sm:text-sm md:text-base lg:max-w-lg">
                Talk to our team - we'll help you choose the right category and connect you with the right provider.
              </p>

              <div className="mt-5 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
                <a
                  href={SUPPORT_TEL}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FDE047] to-[#F59E0B] px-6 py-2.5 text-[13px] font-extrabold text-[#12281f] shadow-[0_12px_28px_-8px_rgba(245,158,11,0.6)] transition duration-300 hover:-translate-y-1 sm:w-auto sm:px-7 sm:py-3 sm:text-sm"
                >
                  <span className="osp-shimmer pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <Phone size={16} className="relative transition-transform duration-300 group-hover:rotate-12" />
                  <span className="relative">Call {SUPPORT_PHONE}</span>
                </a>
                <button
                  type="button"
                  onClick={() => navigate("/post-services")}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/30 bg-white/5 px-6 py-2.5 text-[13px] font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#7fe0c5]/70 hover:bg-white/15 sm:w-auto sm:px-7 sm:py-3 sm:text-sm"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[150%]" />
                  <span className="relative">Post Your Service</span>
                  <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* ---- right: glass card ---- */}
          <Reveal delay={150}>
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md lg:ml-auto">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#7fe0c5] via-[#34c3a8] to-[#0f5e54]" />
              <span
                className="pointer-events-none absolute bottom-2 right-2 h-16 w-16 opacity-40"
                style={{ backgroundImage: "radial-gradient(#7fe0c5 1.2px, transparent 1.2px)", backgroundSize: "8px 8px" }}
              />

              <div className="flex items-center gap-3">
                <div className="osp-float relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0f5e54] shadow-lg ring-4 ring-white/20">
                  <span className="osp-pulse pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/60" />
                  <Headphones size={22} />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7fe0c5]">Talk to our team</p>
                  <a href={SUPPORT_TEL} className="text-lg font-extrabold text-white transition hover:text-[#7fe0c5] sm:text-xl">
                    {SUPPORT_PHONE}
                  </a>
                </div>
              </div>

              <div className="my-4 h-px w-full bg-gradient-to-r from-white/30 via-white/10 to-transparent" />

              <ul className="space-y-2">
                {[
                  { icon: BadgeCheck, t: "No brokerage" },
                  { icon: ShieldCheck, t: "Verified providers" },
                  { icon: MapPin, t: "Free site inspection" },
                ].map(({ icon: I, t }) => (
                  <li
                    key={t}
                    className="group flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-[13px] font-semibold text-white/90 ring-1 ring-white/10 transition duration-300 hover:translate-x-1 hover:bg-white/15 hover:ring-[#7fe0c5]/50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-[#b7f5e3] shadow transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <I size={16} />
                    </span>
                    <span className="flex-1">{t}</span>
                    <CheckCircle2 size={15} className="text-[#7fe0c5]" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

/* ---------- Animations + flip styles ---------- */
const ospStyle = `
  @keyframes ospFloat   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  @keyframes ospMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes ospGrow    { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes ospShimmer { 0% { left: -60%; } 60%,100% { left: 130%; } }
  @keyframes ospRing    { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.5); opacity: 0; } }
  @keyframes ospFlow    { from { background-position: 0 0; } to { background-position: 16px 0; } }
  @keyframes ospBlob    { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-16px) scale(1.08); } }
  @keyframes ospSpin    { to { transform: rotate(360deg); } }
  @keyframes ospTwinkle { 0%,100% { opacity: .15; transform: scale(.8); } 50% { opacity: .9; transform: scale(1.6); } }

  .osp-float   { animation: ospFloat 3s ease-in-out infinite; }
  /* running category strip */
  .osp-track   { animation: ospMarquee 45s linear infinite; }
  .osp-marquee:hover .osp-track,
  .osp-marquee:focus-within .osp-track,
  .osp-marquee:active .osp-track { animation-play-state: paused; }
  .osp-grow    { transform-origin: center; animation: ospGrow .9s ease-out both .3s; }
  .osp-shimmer { animation: ospShimmer 3.5s ease-in-out infinite; }
  .osp-hover-ring:hover .osp-ring { animation: ospRing 1.2s ease-out infinite; }

  /* ---- how it works ---- */
  .osp-flow    { background-image: linear-gradient(90deg, #1a7a6d 50%, transparent 50%); background-size: 16px 100%; animation: ospFlow 1s linear infinite; }
  .osp-pulse   { animation: ospRing 2.2s ease-out infinite; }
  .osp-blob    { animation: ospBlob 9s ease-in-out infinite; }
  .osp-spin    { animation: ospSpin 18s linear infinite; }
  .osp-twinkle { animation: ospTwinkle 3s ease-in-out infinite; }

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
    .osp-float, .osp-track, .osp-grow, .osp-shimmer, .osp-flow, .osp-pulse, .osp-blob, .osp-spin, .osp-twinkle, .osp-hover-ring:hover .osp-ring { animation: none; }
    .osp-marquee { overflow-x: auto; }
    .osp-inner { transition-duration: .01s; }
  }
`;

export default OurServicesPage;