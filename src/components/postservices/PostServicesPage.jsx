import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HardHat, Building2, PaintRoller, Sparkles, Droplets, House, Sofa, Zap, Wrench, ShieldCheck, Trees, DraftingCompass, Pickaxe, Store, Factory, ArrowLeft, ArrowRight, Phone, Headphones, BadgeCheck, Users, Wallet, PhoneCall,LayoutDashboard,CheckCircle2,
} from "lucide-react";

/* ---------- Theme ----------
  dark teal : #0f5e54   teal : #1a7a6d   mint : #e8f1ee
  light bg  : #f8fafc   deep green : #1c3b34   ink : #12281f

  Breakpoints used on every section:
  base (mobile) | sm 640 | md 768 | lg 1024 | xl 1280 | 2xl 1536
------------------------------ */

const HERO_IMG =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80";

const SUPPORT_PHONE = "+91 73972 60093";
const SUPPORT_TEL = "tel:+917397260093";

/* Shared page container: same side padding + max width for every section */
const WRAP = "mx-auto w-full max-w-[1200px] 2xl:max-w-[1360px]";
const SECTION_PAD = "px-4 sm:px-6 lg:px-8 xl:px-12";

/* ---------- Service categories (replace with API data) ---------- */

const CATEGORIES = [
  {
    key: "residential-construction",
    name: "Residential Construction Services",
    short: "Residential Construction",
    icon: House,
    desc: "Professional construction services for individual houses, villas, apartments and residential buildings.",
    items: [
      "Individual House Construction",
      "Villa Construction",
      "Bungalow Construction",
      "Apartment Construction",
      "Row House Construction",
      "Farmhouse Construction",
      "Duplex House Construction",
      "Independent Floor Construction",
      "Rental House Construction",
      "Residential Building Construction",
    ],
  },
  {
    key: "interior-construction-design",
    name: "Interior Construction & Design Services",
    short: "Interior Design",
    icon: Sofa,
    desc: "Creative residential, commercial and modular interior design and finishing solutions.",
    items: [
      "Residential Interior Design",
      "Commercial Interior Design",
      "Modular Interior Services",
      "Interior Finishing Services",
      "Interior Design Styles",
    ],
  },
  {
    key: "electrical-plumbing",
    name: "Electrical & Plumbing Services",
    short: "Electrical & Plumbing",
    icon: Zap,
    desc: "Complete electrical installation, wiring, plumbing, water systems and sanitary fitting services.",
    items: [
      "Residential Electrical Installation",
      "Commercial Electrical Installation",
      "Wiring & Rewiring",
      "Electrical Panel Installation",
      "Lighting Installation",
      "Plumbing Installation",
      "Water Tank Installation",
      "Bathroom Plumbing",
      "Drainage Pipe Installation",
      "Sanitary Fittings Installation",
    ],
  },
  {
    key: "renovation-repair",
    name: "Renovation & Repair Services",
    short: "Renovation & Repair",
    icon: Wrench,
    desc: "House, apartment and commercial renovation, structural repair and refurbishment solutions.",
    items: [
      "Complete House Renovation",
      "Apartment Renovation",
      "Kitchen Renovation",
      "Bathroom Renovation",
      "Office Renovation",
      "Building Extension",
      "Structural Repair",
      "Roof Repair",
      "Crack Repair",
      "Repainting & Refurbishment",
    ],
  },
  {
    key: "waterproofing-protection",
    name: "Waterproofing & Protection Services",
    short: "Waterproofing",
    icon: ShieldCheck,
    desc: "Protect buildings from water leakage, moisture, dampness and structural water damage.",
    items: [
      "Terrace Waterproofing",
      "Bathroom Waterproofing",
      "Basement Waterproofing",
      "Roof Waterproofing",
      "External Wall Waterproofing",
      "Water Leakage Repair",
      "Damp Proofing",
      "Expansion Joint Waterproofing",
    ],
  },
  {
    key: "exterior-landscaping",
    name: "Exterior & Landscaping Services",
    short: "Exterior & Landscaping",
    icon: Trees,
    desc: "Exterior development, compound walls, landscaping, outdoor spaces and garden construction.",
    items: [
      "Compound Wall Construction",
      "Gate Installation",
      "Driveway Construction",
      "Paver Block Installation",
      "Garden Landscaping",
      "Terrace Garden Development",
      "Outdoor Seating Construction",
      "Swimming Pool Construction",
      "Rainwater Harvesting",
      "External Painting",
      "Boundary Wall Repair",
      "Outdoor Lighting Installation",
    ],
  },
  {
    key: "architectural-engineering",
    name: "Architectural & Engineering Services",
    short: "Architecture & Engineering",
    icon: DraftingCompass,
    desc: "Professional architectural planning, building designs, engineering and construction consultancy.",
    items: [
      "Architectural Design",
      "Building Plan Preparation",
      "3D Elevation Design",
      "Structural Design",
      "Soil Testing",
      "Site Survey",
      "Quantity Surveying",
      "BOQ Preparation",
      "Building Approval Assistance",
      "Construction Project Planning",
    ],
  },
  {
    key: "civil-structural",
    name: "Civil & Structural Construction Services",
    short: "Civil & Structural",
    icon: Pickaxe,
    desc: "Complete civil works, foundation, RCC, masonry, concrete and structural construction services.",
    items: [
      "Site Excavation",
      "Soil Filling & Leveling",
      "Foundation Construction",
      "RCC Construction",
      "Column Construction",
      "Beam Construction",
      "Slab Construction",
      "Brickwork",
      "Blockwork",
      "Masonry Work",
      "Plastering Work",
      "Structural Steel Work",
      "Concrete Flooring",
      "Retaining Wall Construction",
      "Structural Strengthening",
    ],
  },
  {
    key: "commercial-construction",
    name: "Commercial Construction Services",
    short: "Commercial Construction",
    icon: Store,
    desc: "Construction solutions for offices, shopping complexes, hotels, hospitals and commercial buildings.",
    items: [
      "Office Building Construction",
      "Shopping Complex Construction",
      "Retail Shop Construction",
      "Hotel Construction",
      "Restaurant Construction",
      "Hospital Construction",
      "School Building Construction",
      "Warehouse Construction",
      "Showroom Construction",
      "Commercial Complex Construction",
    ],
  },
  {
    key: "specialized-construction",
    name: "Specialized Construction Services",
    short: "Specialized Construction",
    icon: Factory,
    desc: "Advanced construction solutions including prefabricated buildings, industrial structures and specialized installations.",
    items: [
      "Pre-Engineered Building Construction",
      "Prefabricated House Construction",
      "Steel Structure Construction",
      "Industrial Shed Construction",
      "Solar Panel Mounting Structures",
      "Fire Safety System Installation",
      "Lift & Elevator Installation",
      "HVAC Installation",
      "Acoustic Treatment",
      "Green Building Solutions",
    ],
  },
];

/* ---------- Why choose us ---------- */
const BENEFITS = [
  { icon: Users, title: "More Customer Enquiries", desc: "Connect with customers looking for residential construction, commercial projects, interior design, renovation and specialized building services." },
  { icon: BadgeCheck, title: "Verified Partner Badge", desc: "Build trust instantly with a verified badge shown on every one of your service listings." },
  { icon: Wallet, title: "Zero Commission", desc: "Keep 100% of what you earn. No brokerage and no hidden charges on any job." },
  { icon: PhoneCall, title: "Direct Customer Contact", desc: "Customers call or message you directly, so you can quote and close deals faster." },
  { icon: LayoutDashboard, title: "Easy Vendor Dashboard", desc: "Manage listings, enquiries and bookings from one simple dashboard." },
  { icon: Headphones, title: "Dedicated Support", desc: "Our team helps you set up your profile and publish your first service." },
];

/* ---------- How it works ---------- */
const STEPS = [
  {
    no: "1",
    title: "Choose Your Service Category",
    desc: "Select from 10 service categories, including residential, commercial, interior, civil and specialized construction."
  },
  {
    no: "2",
    title: "Register & Add Service Details",
    desc: "Create your service provider account and add your subcategories, pricing, project photos and service locations."
  },
  {
    no: "3",
    title: "Connect With Customers",
    desc: "Showcase your services, receive direct customer enquiries and grow your construction business."
  },
];

/* ---------- Section heading ---------- */
const SectionHead = ({ badge, badgeClass, title, subtitle, live = false }) => (
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
  </div>
);

/* ---------- Scroll reveal (fade + slide up when visible) ---------- */
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
      { threshold: 0.12 }
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

/* ---------- Extra animations for the category section ---------- */
const pspAnim = `
  @keyframes pspFloat   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  @keyframes pspShine   { 0% { transform: translateX(-120%); } 100% { transform: translateX(380%); } }
  @keyframes pspRing    { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.5); opacity: 0; } }
  @keyframes pspBlob    { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,20px) scale(1.12); } }
  @keyframes pspGrow    { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes pspShimmer { 0% { left: -60%; } 60%,100% { left: 130%; } }

  .psp-float   { animation: pspFloat 3s ease-in-out infinite; }
  .psp-bar::after { content: ""; position: absolute; inset: 0; width: 30%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent); animation: pspShine 3.2s ease-in-out infinite; }
  .psp-card:hover .psp-ring { animation: pspRing 1.2s ease-out infinite; }
  .psp-blob    { animation: pspBlob 12s ease-in-out infinite; }
  .psp-blob-2  { animation: pspBlob 15s ease-in-out infinite reverse; }
  .psp-grow    { transform-origin: center; animation: pspGrow .9s ease-out both .3s; }
  .psp-shimmer { animation: pspShimmer 3.5s ease-in-out infinite; }

  @media (prefers-reduced-motion: reduce) {
    .psp-float, .psp-bar::after, .psp-blob, .psp-blob-2, .psp-grow, .psp-shimmer, .psp-card:hover .psp-ring { animation: none; }
  }
`;

/* ---------- Category card ---------- */
const CategoryCard = ({ cat, index, onPost }) => {
  const Icon = cat.icon;
  const half = Math.ceil(cat.items.length / 2);
  const groups = [cat.items.slice(0, half), cat.items.slice(half)];

  return (
    <article className="psp-card group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#cfe8df] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-14px_rgba(15,94,84,0.35)] hover:ring-[#1a7a6d]/60 sm:rounded-3xl">
      {/* top bar with moving shine */}
      <div className="psp-bar relative h-1.5 w-full overflow-hidden bg-gradient-to-r from-[#0f5e54] to-[#1a7a6d]" />

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6 2xl:p-7">
        {/* logo + title (same line) */}
        <div className="flex items-center gap-3">
          <div className="psp-float relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-white shadow-lg shadow-[#0f5e54]/25 transition duration-300 group-hover:rotate-6 group-hover:scale-110 sm:h-12 sm:w-12">
            <span className="psp-ring pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-2 ring-[#1a7a6d]/60" />
            <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2} />
          </div>
          <h3 className="relative pb-1 text-base font-extrabold leading-tight tracking-tight text-[#12281f] sm:text-lg 2xl:text-xl">
            {cat.name}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-[#1a7a6d] transition-all duration-500 group-hover:w-full" />
          </h3>
        </div>

        {/* description */}
        <p className="mt-3 text-[13px] leading-relaxed text-slate-500 md:min-h-[42px] 2xl:text-sm">
          {cat.desc}
        </p>

        {/* divider */}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-[#1a7a6d]/40 via-slate-200 to-transparent" />

        {/* label + count pill */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-[11px]">
            Our {cat.short} Services
          </p>
          <span className="inline-flex shrink-0 whitespace-nowrap items-center rounded-full bg-[#e8f1ee] px-2.5 py-1 text-[10px] font-bold text-[#0f5e54] transition group-hover:bg-[#0f5e54] group-hover:text-white">
            {cat.items.length} services
          </span>
        </div>

        {/* sub-services: two sections */}
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
          {groups.map((group, i) => (
            <ul key={i} className="flex flex-col gap-2.5">
              {group.map((label) => (
                <li
                  key={label}
                  className="group/li flex cursor-default items-start gap-2 text-[12.5px] font-semibold leading-snug text-[#12281f] transition-all duration-200 hover:translate-x-1 hover:text-[#0f5e54] 2xl:text-[13.5px]"
                >
                  <span className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-[#1a7a6d] ring-4 ring-[#e8f1ee] transition-all duration-200 group-hover/li:scale-125 group-hover/li:bg-[#0f5e54] group-hover/li:ring-[#cfe8df]" />
                  {label}
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* post button (always at the bottom) */}
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={() => onPost(cat)}
            className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#e8f5ec] py-2.5 text-[13px] font-bold text-[#0f5e54] transition duration-300 hover:bg-gradient-to-r hover:from-[#0f5e54] hover:to-[#1a7a6d] hover:text-white hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] focus-visible:ring-offset-2 sm:rounded-2xl sm:py-3 sm:text-sm"
          >
            <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/30 transition-all duration-700 group-hover/btn:left-[150%]" />
            <span className="relative">Post Your {cat.short} Service</span>
            <ArrowRight size={16} className="relative transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
};

/* ---------- Benefit card (Why choose us) ---------- */
const BenefitCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="psp-card group relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-[#f8fafc] p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_22px_40px_-14px_rgba(15,94,84,0.45)] lg:p-6">
      {/* teal fill slides up on hover */}
      <span className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] transition-transform duration-500 ease-out group-hover:translate-y-0" />

      {/* check chip pops in on hover */}
      <span className="absolute right-4 top-4 z-10 flex h-6 w-6 scale-0 items-center justify-center rounded-full bg-white/20 text-white transition duration-300 group-hover:scale-100">
        <CheckCircle2 size={14} />
      </span>

      <div className="relative z-10">
        <div className="psp-float relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-white shadow-md transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:from-white group-hover:to-[#e8f1ee] group-hover:text-[#0f5e54] sm:h-11 sm:w-11">
          <span className="psp-ring pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-2 ring-white/70" />
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mt-4 text-[15px] font-bold text-[#12281f] transition-colors duration-300 group-hover:text-white sm:text-base lg:text-lg">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-white/85 sm:text-sm">
          {item.desc}
        </p>

        {/* line grows on hover */}
        <span className="mt-4 block h-0.5 w-8 rounded-full bg-[#1a7a6d]/40 transition-all duration-500 group-hover:w-20 group-hover:bg-[#7fe0c5]" />
      </div>
    </div>
  );
};

/* ---------- Page ---------- */
const PostServicesPage = () => {
  const navigate = useNavigate();

  const scrollToCategories = () =>
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth", block: "start" });

  // "Post Your ... Service" click -> open the Header's Login / Register popup.
  // After login, Header navigates to the redirectTo path.
  const handlePost = (cat) => {
    window.dispatchEvent(
      new CustomEvent("open-auth-modal", {
        detail: { label: cat.short, redirectTo: `/post-services/${cat.key}` },
      })
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8fafc] font-sans text-[#12281f]">
      {/* ===== 1. BANNER ===== */}
      <section className="relative w-full overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Eliteinova Properties Services"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-[#0b3d36]" />

        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/60 sm:left-6 sm:top-5 sm:text-[13px] lg:left-8"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="relative z-10 mx-auto flex min-h-[280px] max-w-5xl flex-col items-center justify-center px-4 pb-10 pt-16 text-center sm:min-h-[320px] sm:px-6 md:min-h-[360px] lg:min-h-[400px] xl:min-h-[430px] 2xl:min-h-[480px]">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur sm:text-[11px]">
            <BadgeCheck size={13} className="text-[#7fe0c5]" /> Eliteinova Properties Services
          </span>

           <h1 className="text-2xl font-extrabold leading-tight text-[#35b8a6] drop-shadow sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">
            Professional Construction & Building Services
            </h1>

            <p className="mt-3 max-w-3xl text-[13px] text-white/95 sm:text-sm md:text-base lg:text-lg 2xl:text-xl">
            Build, Design, Renovate & Transform Your Spaces with Expert Service Providers.
            </p>

            <p className="mt-1.5 max-w-2xl text-[11px] text-white/80 sm:text-xs md:text-sm 2xl:text-base">
            Explore Residential, Commercial, Interior, Electrical, Plumbing, Renovation, Architectural and Specialized Construction Services. No Brokerage, No Hassle.
            </p>

          <button
            type="button"
            onClick={scrollToCategories}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-wide text-[#0f5e54] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:mt-6 sm:px-6 sm:py-3 sm:text-xs md:text-sm"
          >
            Post Your Service Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="w-full bg-[#0f5e54]">
        <div className={`${WRAP} ${SECTION_PAD} grid grid-cols-2 gap-y-4 py-4 text-center sm:grid-cols-4 sm:py-5`}>
          {[
            ["10", "Service Categories"],
            ["100", "Sub-Services"],
            ["0%", "Commission"],
            ["100%", "Direct Enquiries"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="text-lg font-extrabold text-white sm:text-xl lg:text-2xl">{num}</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-[#a9dccf] sm:text-[11px] lg:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 2. SERVICE CATEGORIES ===== */}
      <section
        id="categories"
        className={`relative w-full scroll-mt-4 overflow-hidden bg-gradient-to-b from-[#eef7f3] to-[#f8fafc] ${SECTION_PAD} py-8 sm:py-10 lg:py-14`}
      >
        <style>{pspAnim}</style>

        {/* background decoration */}
        <span className="psp-blob pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#1a7a6d]/10 blur-3xl" />
        <span className="psp-blob-2 pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#0f5e54]/10 blur-3xl" />
        <span className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#1a7a6d_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

        <Reveal className="relative z-10">
          <SectionHead
            live
            badge="Step 1 - Start Here"
            badgeClass="bg-[#cfe8df] text-[#0f5e54]"
            title="Choose Your Service Category"
            subtitle="Pick the service you provide - each category shows the services you can post."
          />
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="psp-grow h-1 w-12 rounded-full bg-gradient-to-r from-transparent to-[#1a7a6d]" />
            <span className="h-2 w-2 rotate-45 bg-[#1a7a6d]" />
            <span className="psp-grow h-1 w-12 rounded-full bg-gradient-to-l from-transparent to-[#1a7a6d]" />
          </div>
        </Reveal>

        {/* 1 col mobile | 2 cols sm-lg | 3 cols xl+ */}
        <div className={`${WRAP} relative z-10 mt-7 grid grid-cols-1 items-stretch gap-4 sm:mt-9 sm:gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3`}>
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.key} delay={(i % 3) * 120} className="h-full">
              <CategoryCard cat={cat} index={i} onPost={handlePost} />
            </Reveal>
          ))}

          {/* Not sure card */}
<Reveal delay={240} className="h-full">
  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b4a41] to-[#0f6b5e] p-5 shadow-lg transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-14px_rgba(11,74,65,0.6)] sm:rounded-3xl sm:p-6 2xl:p-7">
    {/* decoration */}
    <span className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-125" />
    <span className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-125" />
    <span className="pointer-events-none absolute right-6 top-6 h-2 w-2 animate-pulse rounded-full bg-[#7fe0c5]" />

    <div className="relative z-10 flex items-center gap-3">
      <div className="psp-float relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white sm:h-12 sm:w-12">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-white/10" />
        <Headphones className="relative h-5 w-5 sm:h-[22px] sm:w-[22px]" />
      </div>
      <h3 className="text-base font-extrabold leading-tight text-white sm:text-lg 2xl:text-xl">
        Not sure which to choose?
      </h3>
    </div>

    <p className="relative z-10 mt-3 text-[13px] leading-relaxed text-white/85 2xl:text-sm">
      Talk to our team - we'll help you pick the right category and post your first service.
    </p>

    {/* NEW: Checklist to fill empty space */}
    <ul className="relative z-10 mt-5 flex flex-col gap-3 text-[13px] text-white/90">
      <li className="flex items-center gap-2">
        <CheckCircle2 size={16} className="text-[#7fe0c5]" /> Free consultation
      </li>
      <li className="flex items-center gap-2">
        <CheckCircle2 size={16} className="text-[#7fe0c5]" /> Get matched with the right category
      </li>
      <li className="flex items-center gap-2">
        <CheckCircle2 size={16} className="text-[#7fe0c5]" /> Setup help in under 5 mins
      </li>
    </ul>

    <div className="relative z-10 mt-auto pt-6">
      <a
        href={SUPPORT_TEL}
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white py-2.5 text-[13px] font-bold text-[#0f5e54] transition duration-300 hover:bg-[#e8f1ee] hover:shadow-lg active:scale-[0.98] sm:rounded-2xl sm:py-3 sm:text-sm"
      >
        <span className="psp-shimmer pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#0f5e54]/15 to-transparent" />
        <Phone size={16} className="relative" /> <span className="relative">Call {SUPPORT_PHONE}</span>
      </a>
    </div>
  </div>
</Reveal>
        </div>
      </section>

     {/* ===== 3. WHY CHOOSE US ===== */}
<section className={`relative w-full overflow-hidden bg-white ${SECTION_PAD} py-8 sm:py-10 lg:py-14`}>
  <style>{pspAnim}</style>

  {/* background decoration */}
  <span className="psp-blob pointer-events-none absolute -right-24 top-6 h-72 w-72 rounded-full bg-[#1a7a6d]/10 blur-3xl" />
  <span className="psp-blob-2 pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[#0f5e54]/10 blur-3xl" />
  <span className="pointer-events-none absolute inset-0 opacity-[0.3] [background-image:radial-gradient(#1a7a6d_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,transparent_95%)]" />

  <Reveal className="relative z-10">
    <SectionHead
      live
      badge="Why Service Providers Choose Us"
      badgeClass="bg-[#cfe8df] text-[#0f5e54]"
      title="Why Choose Eliteinova Properties Services?"
      subtitle="More enquiries, direct customer contacts and zero commission - everything you need to grow your service business."
    />
    <div className="mx-auto mt-4 flex items-center justify-center gap-2">
      <span className="psp-grow h-1 w-12 rounded-full bg-gradient-to-r from-transparent to-[#1a7a6d]" />
      <span className="h-2 w-2 rotate-45 bg-[#1a7a6d]" />
      <span className="psp-grow h-1 w-12 rounded-full bg-gradient-to-l from-transparent to-[#1a7a6d]" />
    </div>
  </Reveal>

  <div className={`${WRAP} relative z-10 mt-7 grid grid-cols-1 gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6`}>
    {BENEFITS.map((item, i) => (
      <Reveal key={item.title} delay={(i % 3) * 120} className="h-full">
        {/* ── THEME-BASED BENEFIT CARD ── */}
        <article className="psp-card group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#cfe8df] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-14px_rgba(15,94,84,0.35)] hover:ring-[#1a7a6d]/60 sm:rounded-3xl">

          {/* top bar with moving shine */}
          <div className="psp-bar relative h-1.5 w-full overflow-hidden bg-gradient-to-r from-[#0f5e54] to-[#1a7a6d]" />

          {/* teal fill slides up on hover */}
          <span className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] transition-transform duration-500 ease-out group-hover:translate-y-0" />

          {/* check chip pops in on hover */}
          <span className="absolute right-4 top-5 z-20 flex h-6 w-6 scale-0 items-center justify-center rounded-full bg-white/20 text-white transition duration-300 group-hover:scale-100">
            <CheckCircle2 size={14} />
          </span>

          <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6 lg:p-6 2xl:p-7">
            {/* icon */}
            <div className="psp-float relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] text-white shadow-lg shadow-[#0f5e54]/25 transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:from-white group-hover:to-[#e8f1ee] group-hover:text-[#0f5e54] sm:h-12 sm:w-12">
              <span className="psp-ring pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-2 ring-white/70" />
              <item.icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2} />
            </div>

            {/* title */}
            <h3 className="mt-4 text-[15px] font-extrabold leading-tight tracking-tight text-[#12281f] transition-colors duration-300 group-hover:text-white sm:text-base lg:text-lg 2xl:text-xl">
              {item.title}
            </h3>

            {/* description */}
            <p className="mt-2 text-[13px] leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-white/85 sm:text-sm">
              {item.desc}
            </p>

            {/* line grows on hover */}
            <span className="mt-auto block pt-5">
              <span className="block h-0.5 w-8 rounded-full bg-[#1a7a6d]/40 transition-all duration-500 group-hover:w-20 group-hover:bg-[#7fe0c5]" />
            </span>
          </div>
        </article>
      </Reveal>
    ))}
  </div>

  {/* bottom call-to-action bar */}
  <Reveal delay={200} className="relative z-10">
    <div className={`${WRAP} mt-8 sm:mt-10`}>
      <div className="relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f5e54] to-[#1a7a6d] px-5 py-5 text-center shadow-lg sm:flex-row sm:px-8 sm:text-left">
        <span className="psp-shimmer pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="relative">
          <h3 className="text-base font-extrabold text-white sm:text-lg lg:text-xl">
            Ready to grow your service business?
          </h3>
          <p className="mt-0.5 text-[13px] text-[#cfeae2] sm:text-sm">
            Post your first service in minutes - no brokerage, no hidden charges.
          </p>
        </div>
        <button
          type="button"
          onClick={scrollToCategories}
          className="group/cta relative inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-[13px] font-extrabold text-[#0f5e54] shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] sm:text-sm"
        >
          Post Your Service
          <ArrowRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
        </button>
      </div>
    </div>
  </Reveal>
</section>

               {/* ===== 4. HOW IT WORKS ===== */}
      <section className="relative w-full overflow-hidden bg-[#e8f1ee] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14 xl:px-12">
        <style>{pspAnim}</style>

        {/* Background decoration */}
        <span className="psp-blob pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#1a7a6d]/10 blur-3xl" />
        <span className="psp-blob-2 pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#0f5e54]/10 blur-3xl" />
        <span className="pointer-events-none absolute inset-0 opacity-[0.3] [background-image:radial-gradient(#1a7a6d_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,transparent_95%)]" />

        <Reveal className="relative z-10">
          <SectionHead
            live
            badge="Simple Process"
            badgeClass="bg-[#cfe8df] text-[#0f5e54]"
            title="How It Works"
            subtitle="Start receiving customer enquiries in three easy steps."
          />
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="psp-grow h-1 w-12 rounded-full bg-gradient-to-r from-transparent to-[#1a7a6d]" />
            <span className="h-2 w-2 rotate-45 bg-[#1a7a6d]" />
            <span className="psp-grow h-1 w-12 rounded-full bg-gradient-to-l from-transparent to-[#1a7a6d]" />
          </div>
        </Reveal>

        {/* Steps Grid */}
        <div className={`${WRAP} relative z-10 mt-7 grid grid-cols-1 gap-4 sm:mt-9 sm:gap-5 md:grid-cols-3 lg:gap-6`}>
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 150} className="h-full">
              
              {/* Card Container */}
              <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-[#cfe8df] border-t-[3px] border-t-[#0f5e54] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-14px_rgba(15,94,84,0.35)] lg:p-8">
                
                {/* Number Circle */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a7a6d] text-xl font-extrabold text-white shadow-[0_6px_12px_-2px_rgba(15,94,84,0.4)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 sm:h-16 sm:w-16 sm:text-2xl">
                  {s.no}
                </div>

                {/* Text Content */}
                <h3 className="mt-5 text-base font-extrabold text-[#0f5e54] sm:text-lg lg:text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500 sm:text-sm">
                  {s.desc}
                </p>

                {/* Solid line at bottom */}
                <span className="mt-6 block h-1 w-16 rounded-full bg-[#1a7a6d] transition-all duration-500 group-hover:w-24" />
              </div>
              
            </Reveal>
          ))}
        </div>
      </section>

           {/* ===== 5. FINAL CTA ===== */}
      <section className="relative w-full overflow-hidden bg-[#1c3b34] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:px-12">
        <style>{pspAnim}</style>

        {/* --- BACKGROUND (Ready for your image later) --- */}
        {/* When you have the image, uncomment the div below and add your URL */}
        {/* <div className="absolute inset-0 z-0 bg-[url('YOUR_IMAGE_URL_HERE')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay" /> */}
        
        {/* Default Background Theme (Current) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f5e54] via-[#1c3b34] to-[#0b2b25]" />
        
        {/* Animated Background Glows */}
        <span className="psp-blob pointer-events-none absolute -left-20 top-0 z-0 h-72 w-72 rounded-full bg-[#1a7a6d]/20 blur-3xl" />
        <span className="psp-blob-2 pointer-events-none absolute -right-20 bottom-0 z-0 h-80 w-80 rounded-full bg-[#FDE047]/10 blur-3xl" />
        
        {/* Dotted Pattern Overlay */}
        <span className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        {/* --- CONTENT --- */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          
          <Reveal>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl lg:text-5xl">
            Grow Your Construction & Building Services Business With Us!
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-[#bfe3d9] sm:text-sm md:text-base lg:text-lg">
            Join Eliteinova Properties Services and showcase your construction, interior design, renovation, electrical, plumbing, landscaping and specialized building services. Connect directly with customers and grow your business.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[13px] font-medium text-white/90 sm:text-sm">
              {["Free to register", "Zero commission", "Verified badge"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#7fe0c5]" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={300} className="w-full sm:w-auto">
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:mt-10 sm:w-auto sm:flex-row">
              
              {/* Primary Button */}
              <button
                type="button"
                onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FDE047] to-[#F59E0B] px-6 py-3 text-[13px] font-extrabold text-[#12281f] shadow-[0_8px_20px_-6px_rgba(245,158,11,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-6px_rgba(245,158,11,0.6)] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-3.5 sm:text-sm"
              >
                {/* Button Shine Effect */}
                <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/40 transition-all duration-700 group-hover:left-[150%]" />
                <span className="relative">Post Your Service</span>
                <ArrowRight size={18} className="relative transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary Button */}
              <a
                href={SUPPORT_TEL}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 active:scale-[0.98] sm:w-auto sm:px-8 sm:py-3.5 sm:text-sm"
              >
                <Phone size={16} className="text-white/80 transition-colors group-hover:text-white" /> 
                <span>{SUPPORT_PHONE}</span>
              </a>

            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default PostServicesPage;