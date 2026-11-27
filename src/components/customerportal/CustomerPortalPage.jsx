import React, { useRef, useState, useEffect } from "react";
import {
  Home,
  Sofa,
  Zap,
  Hammer,
  Droplets,
  Layers,
  Ruler,
  HardHat,
  Building2,
  Settings,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";


const BANNER_IMG =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80";

const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

const buildItems = (names, pool, startId) =>
  names.map((title, i) => ({
    id: startId + i,
    title,
    img: img(pool[i % pool.length]),
  }));

const SERVICES = [
  {
    key: "residential-construction",
    tab: "Residential Construction",
    name: "Residential Construction Services",
    icon: Home,
    items: buildItems(
      [
        "Individual House Construction", "Villa Construction", "Bungalow Construction",
        "Apartment Construction", "Row House Construction", "Farmhouse Construction",
        "Duplex House Construction", "Independent Floor Construction",
        "Rental House Construction", "Residential Building Construction",
      ],
      ["photo-1503387762-592deb58ef4e", "photo-1504307651254-35680f356dfd", "photo-1581094794329-c8112a89af12"],
      100
    ),
  },
  {
    key: "interior-construction-design",
    tab: "Interior & Design",
    name: "Interior Construction & Design Services",
    icon: Sofa,
    items: buildItems(
      [
        "Residential Interior Design", "Commercial Interior Design",
        "Modular Interior Services", "Interior Finishing Services", "Interior Design Styles",
      ],
      ["photo-1618221195710-dd6b41faaea6", "photo-1497366811353-6870744d04b2", "photo-1556911220-e15b29be8c8f", "photo-1600210492486-724fe5c67fb0", "photo-1616594039964-ae9021a400a0"],
      200
    ),
  },
  {
    key: "electrical-plumbing",
    tab: "Electrical & Plumbing",
    name: "Electrical & Plumbing Services",
    icon: Zap,
    items: buildItems(
      [
        "Residential Electrical Installation", "Commercial Electrical Installation",
        "Wiring & Rewiring", "Electrical Panel Installation", "Lighting Installation",
        "Plumbing Installation", "Water Tank Installation", "Bathroom Plumbing",
        "Drainage Pipe Installation", "Sanitary Fittings Installation",
      ],
      ["photo-1621905252507-b35492cc74b4", "photo-1581244277943-fe4a9c777189", "photo-1607472586893-edb57bdc0e39", "photo-1585704032915-c3400ca199e7", "photo-1585129918930-eab99ee4f2f5"],
      300
    ),
  },
  {
    key: "renovation-repair",
    tab: "Renovation & Repair",
    name: "Renovation & Repair Services",
    icon: Hammer,
    items: buildItems(
      [
        "Complete House Renovation", "Apartment Renovation", "Kitchen Renovation",
        "Bathroom Renovation", "Office Renovation", "Building Extension",
        "Structural Repair", "Roof Repair", "Crack Repair", "Repainting & Refurbishment",
      ],
      ["photo-1581094794329-c8112a89af12", "photo-1562259949-e8e7689d7828", "photo-1513694203232-719a280e022f", "photo-1534237710431-e2fc698436d0"],
      400
    ),
  },
  {
    key: "waterproofing-protection",
    tab: "Waterproofing & Protection",
    name: "Waterproofing & Protection Services",
    icon: Droplets,
    items: buildItems(
      [
        "Terrace Waterproofing", "Bathroom Waterproofing", "Basement Waterproofing",
        "Roof Waterproofing", "External Wall Waterproofing", "Water Leakage Repair",
        "Damp Proofing", "Expansion Joint Waterproofing",
      ],
      ["photo-1572981779307-38b8cabb2407", "photo-1589939705384-5185137a7f0f", "photo-1534237710431-e2fc698436d0"],
      500
    ),
  },
  {
    key: "exterior-landscaping",
    tab: "Exterior & Landscaping",
    name: "Exterior & Landscaping Services",
    icon: Layers,
    items: buildItems(
      [
        "Compound Wall Construction", "Gate Installation", "Driveway Construction",
        "Paver Block Installation", "Garden Landscaping", "Terrace Garden Development",
        "Outdoor Seating Construction", "Swimming Pool Construction", "Rainwater Harvesting",
        "External Painting", "Boundary Wall Repair", "Outdoor Lighting Installation",
      ],
      ["photo-1589939705384-5185137a7f0f", "photo-1513694203232-719a280e022f", "photo-1558317374-067fb5f30001"],
      600
    ),
  },
  {
    key: "architectural-engineering",
    tab: "Architectural & Engineering",
    name: "Architectural & Engineering Services",
    icon: Ruler,
    items: buildItems(
      [
        "Architectural Design", "Building Plan Preparation", "3D Elevation Design",
        "Structural Design", "Soil Testing", "Site Survey", "Quantity Surveying",
        "BOQ Preparation", "Building Approval Assistance", "Construction Project Planning",
      ],
      ["photo-1554224155-6726b3ff858f", "photo-1503387762-592deb58ef4e", "photo-1581094794329-c8112a89af12"],
      700
    ),
  },
  {
    key: "civil-structural-construction",
    tab: "Civil & Structural",
    name: "Civil & Structural Construction Services",
    icon: HardHat,
    items: buildItems(
      [
        "Site Excavation", "Soil Filling & Leveling", "Foundation Construction",
        "RCC Construction", "Column Construction", "Beam Construction", "Slab Construction",
        "Brickwork", "Blockwork", "Masonry Work", "Plastering Work", "Structural Steel Work",
        "Concrete Flooring", "Retaining Wall Construction", "Structural Strengthening",
      ],
      ["photo-1504307651254-35680f356dfd", "photo-1503387762-592deb58ef4e", "photo-1581094794329-c8112a89af12"],
      800
    ),
  },
  {
    key: "commercial-construction",
    tab: "Commercial Construction",
    name: "Commercial Construction Services",
    icon: Building2,
    items: buildItems(
      [
        "Office Building Construction", "Shopping Complex Construction",
        "Retail Shop Construction", "Hotel Construction", "Restaurant Construction",
        "Hospital Construction", "School Building Construction", "Warehouse Construction",
        "Showroom Construction", "Commercial Complex Construction",
      ],
      ["photo-1497366811353-6870744d04b2", "photo-1504307651254-35680f356dfd", "photo-1554224155-6726b3ff858f"],
      900
    ),
  },
  {
    key: "specialized-construction",
    tab: "Specialized Construction",
    name: "Specialized Construction Services",
    icon: Settings,
    items: buildItems(
      [
        "Pre-Engineered Building Construction", "Prefabricated House Construction",
        "Steel Structure Construction", "Industrial Shed Construction",
        "Solar Panel Mounting Structures", "Fire Safety System Installation",
        "Lift & Elevator Installation", "HVAC Installation", "Acoustic Treatment",
        "Green Building Solutions",
      ],
      ["photo-1581244277943-fe4a9c777189", "photo-1504307651254-35680f356dfd", "photo-1621905252507-b35492cc74b4"],
      1000
    ),
  },
];

const TRUST = [
  { title: "Verified Professionals", desc: "Every technician is background-checked and skill-tested.", link: "Learn More", img: img("photo-1504307651254-35680f356dfd") },
  { title: "Transparent Pricing", desc: "Clear quotes up front — no hidden charges", link: "See How", img: img("photo-1554224155-6726b3ff858f") },
  { title: "Free Site Inspection", desc: "Book a visit for any service below, at no cost", link: "Book a Visit", img: img("photo-1503387762-592deb58ef4e") },
  { title: "Instant Booking Updates", desc: "Get notified when your service is scheduled and started.", link: "Set Alerts", img: img("photo-1618221195710-dd6b41faaea6") },
];

const POPULAR = [
  { id: 1, title: "Villa Construction", service: "Residential Construction", price: "Get a Quote", tag: "Popular", img: img("photo-1503387762-592deb58ef4e") },
  { id: 2, title: "Modular Interior Services", service: "Interior & Design", price: "Get a Quote", tag: "Popular", img: img("photo-1556911220-e15b29be8c8f") },
  { id: 3, title: "Kitchen Renovation", service: "Renovation & Repair", price: "Get a Quote", tag: "New", img: img("photo-1581094794329-c8112a89af12") },
  { id: 4, title: "Terrace Waterproofing", service: "Waterproofing & Protection", price: "Get a Quote", tag: "Offer", img: img("photo-1572981779307-38b8cabb2407") },
  { id: 5, title: "Lighting Installation", service: "Electrical & Plumbing", price: "Get a Quote", tag: "Offer", img: img("photo-1621905252507-b35492cc74b4") },
];

const TILTS = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[0.7deg]"];

const hideScrollbar =
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const PAD = "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20";
const SECTION_Y = "py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20";
const INNER = "mx-auto w-full max-w-[1920px]";


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

/* ---------- Hook: Trigger animations when element enters viewport ---------- */
const useInView = ({ threshold = 0.1, rootMargin = "0px" } = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isInView];
};

/* ---------- Horizontal carousel with round arrows (+ optional edge fades & progress bar) ---------- */
const Carousel = ({ children, showArrows = true, center = false, progress = false }) => {
  const ref = useRef(null);
  const [pct, setPct] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const scroll = (dir) =>
    ref.current &&
      ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScroll(max > 8);
    setPct(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    if (!progress) return;
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [progress]);

  return (
    <div className="relative group/carousel">
      <div
        ref={ref}
        onScroll={progress ? update : undefined}
        className={`flex gap-3 overflow-x-auto scroll-smooth px-1 py-3 snap-x snap-mandatory sm:gap-4 md:gap-5 xl:gap-6 2xl:gap-8 ${hideScrollbar} ${
          center ? "justify-center" : ""
        }`}
      >
        {children}
      </div>

      {/* soft edge fades */}
      {progress && canScroll && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#e6f0ed] to-transparent transition-opacity duration-300 sm:w-12 ${
              pct > 0.02 ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#e6f0ed] to-transparent transition-opacity duration-300 sm:w-12 ${
              pct < 0.98 ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}

      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className="absolute left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-[#12281f] shadow-lg transition-all duration-300 hover:bg-[#0f5e54] hover:text-white hover:shadow-[0_0_15px_rgba(26,122,109,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] sm:flex lg:h-10 lg:w-10 2xl:h-12 2xl:w-12 opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="h-[18px] w-[18px] 2xl:h-6 2xl:w-6" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll(1)}
            className="absolute right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-[#12281f] shadow-lg transition-all duration-300 hover:bg-[#0f5e54] hover:text-white hover:shadow-[0_0_15px_rgba(26,122,109,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] sm:flex lg:h-10 lg:w-10 2xl:h-12 2xl:w-12 opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="h-[18px] w-[18px] 2xl:h-6 2xl:w-6" />
          </button>
        </>
      )}

      {/* scroll progress track */}
      {progress && canScroll && (
        <div className="mx-auto mt-1 h-1 w-24 overflow-hidden rounded-full bg-[#0f5e54]/15 sm:w-32">
          <div
            className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#0f5e54] to-[#7fe0c5] transition-transform duration-150"
            style={{ transform: `translateX(${pct * 200}%)` }}
          />
        </div>
      )}
    </div>
  );
};


const ServiceTab = ({
  image,
  label,
  count,
  Icon,
  index,
  active,
  onClick,
  tabRef,
}) => (
  <button
    ref={tabRef}
    type="button"
    onClick={onClick}
    aria-pressed={active}
    style={{ animationDelay: `${index * 70}ms` }}
    className={`svc-tab group flex w-[105px] shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-1 pb-2 pt-2 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00695C] sm:w-[115px] ${
      active
        ? "border-[#26A69A]/40 bg-[#e8f1ee] shadow-inner"
        : "border-transparent hover:border-[#26A69A]/30 hover:bg-[#f1f8f6]"
    }`}
  >
    <div
      className={`relative h-[66px] w-[66px] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 sm:h-[72px] sm:w-[72px] ${
        active ? "-translate-y-1" : ""
      }`}
    >
      <span
        className={`svc-ring absolute -inset-[4px] rounded-full transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      <div
        className={`relative h-full w-full overflow-hidden rounded-full border-2 bg-white p-[3px] transition-all duration-300 ${
          active
            ? "border-[#00695C] shadow-[0_5px_16px_rgba(0,105,92,0.25)]"
            : "border-[#26A69A] shadow-[0_2px_8px_rgba(0,105,92,0.12)] group-hover:border-[#00695C] group-hover:shadow-[0_5px_16px_rgba(0,105,92,0.20)]"
        }`}
      >
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <span
        className={`absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full text-white shadow ring-2 ring-white transition-all duration-300 sm:h-[26px] sm:w-[26px] ${
          active
            ? "bg-[#00695C]"
            : "bg-[#00695C] group-hover:bg-[#26A69A]"
        }`}
      >
        <Icon size={13} strokeWidth={2.4} />
      </span>
    </div>
    <span
      className={`min-h-[30px] w-full px-1 text-[11px] leading-[14px] transition-colors duration-300 sm:text-xs sm:leading-[16px] ${
        active
          ? "font-bold text-[#00695C]"
          : "font-semibold text-[#00695C] group-hover:font-bold group-hover:text-[#26A69A]"
      }`}
    >
      {label}
    </span>
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 ${
        active
          ? "bg-[#00695C] text-white"
          : "bg-[#e8f1ee] text-[#0f5e54] group-hover:bg-[#26A69A] group-hover:text-white"
      }`}
    >
      {count} services
    </span>
  </button>
);


/* ---------- Polaroid card (image + italic caption) ---------- */
const PolaroidCard = ({ item, tilt, onSelect, index, isInView, Icon }) => (
  <button
    type="button"
    onClick={() => onSelect?.(item)}
    style={{ transitionDelay: isInView ? `${index * 60}ms` : '0ms' }}
    className={`group relative w-[200px] shrink-0 snap-center rounded-md bg-white p-3 pb-4 text-center shadow-md transition-all duration-700 ease-out hover:-translate-y-1 hover:rotate-0 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] min-[400px]:w-[220px] sm:w-[240px] md:w-[250px] lg:w-[260px] xl:w-[280px] 2xl:w-[320px] ${
      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    } ${tilt}`}
  >
    <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#1a7a6d] ring-4 ring-[#e8f1ee]" />

    <div className="relative h-40 w-full overflow-hidden rounded bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] min-[400px]:h-44 sm:h-48 xl:h-52 2xl:h-64">
      <Img src={item.img} alt={item.title} className="transition-transform duration-700 ease-out group-hover:scale-105" />

      {Icon && (
        <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#0f5e54] shadow backdrop-blur-sm">
          <Icon size={14} strokeWidth={2.4} />
        </span>
      )}
    </div>

    <p className="mt-3 flex min-h-[2.8rem] items-center justify-center font-serif text-sm font-bold italic leading-snug text-[#0f5e54] transition-colors duration-300 group-hover:text-[#1a7a6d] sm:text-base xl:text-lg 2xl:min-h-[3.4rem] 2xl:text-xl">
      {item.title}
    </p>
  </button>
);

/* ---------- Trust card (image + dark overlay) ---------- */
const TrustCard = ({ t }) => (
  <a
    href="#"
    className="group relative block h-44 overflow-hidden rounded-lg bg-[#0f5e54] shadow-lg transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(26,122,109,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fe0c5] sm:h-48 md:h-52 xl:h-56 2xl:h-64"
  >
    <Img src={t.img} alt={t.title} className="transition duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
    <div className="absolute inset-x-0 bottom-0 p-4 2xl:p-5">
      <h3 className="text-base font-bold text-white sm:text-lg 2xl:text-xl">{t.title}</h3>
      <p className="mt-1 text-[13px] leading-snug text-white/85 2xl:text-sm">{t.desc}</p>
      <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-[#7fe0c5] transition-colors duration-300 group-hover:text-white 2xl:text-base">
        {t.link} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </a>
);

/* ---------- Popular service card ---------- */
const PopularCard = ({ p, onBook }) => (
  <article className="group w-[240px] shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-[400px]:w-[260px] sm:w-[280px] md:w-[290px] lg:w-[300px] xl:w-[320px] 2xl:w-[360px]">
    <div className="relative h-32 bg-gradient-to-br from-[#0f5e54] to-[#1a7a6d] sm:h-40 xl:h-44 2xl:h-56">
      <Img src={p.img} alt={p.title} className="transition-transform duration-500 group-hover:scale-105" />
      <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#e8f1ee]/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-[#0f5e54]">
        <BadgeCheck size={12} /> Verified Partner
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-[#1a7a6d] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
        {p.tag}
      </span>
    </div>

    <div className="p-3.5 2xl:p-5">
      <p className="text-[13px] font-semibold text-[#1a7a6d] 2xl:text-sm">{p.service}</p>
      <h3 className="mt-0.5 text-base font-bold leading-snug text-[#12281f] sm:text-lg 2xl:text-xl">{p.title}</h3>
      <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <span className="text-sm font-bold text-[#0f5e54] sm:text-base 2xl:text-lg">{p.price}</span>
        <button
          type="button"
          onClick={() => onBook?.(p)}
          className="rounded-md bg-[#0f5e54] px-3.5 py-2 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#1a7a6d] hover:shadow-[0_0_12px_rgba(26,122,109,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] focus-visible:ring-offset-2 2xl:px-5 2xl:py-2.5 2xl:text-sm"
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
  const barRef = useRef(null);
  const tabRefs = useRef({});
  const [active, setActive] = useState(null);

  // Hook for the entire "Browse by service" section to trigger its main animations
  const [browseRef, browseInView] = useInView({ threshold: 0 });

  const scrollTo = (key) => {
    setActive(key);
    sectionRefs.current[key]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSelect = (item) => console.log("Selected:", item.title);
  const handleBook = (p) => console.log("Book:", p.title);

  useEffect(() => {
    const bar = barRef.current;
    const tab = tabRefs.current[active];
    if (!bar || !tab) return;
    bar.scrollTo({
      left: tab.offsetLeft - bar.clientWidth / 2 + tab.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  const activeIndex = SERVICES.findIndex((s) => s.key === active);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8fafc] font-sans text-[#12281f]">
      <style>{STRIP_CSS}</style>

      {/* ===== Banner ===== */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#082f29] via-[#0f5e54] to-[#1a7a6d]">
        {/* blueprint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(127,224,197,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(127,224,197,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 60%)",
            maskImage: "linear-gradient(to right, transparent, black 60%)",
          }}
        />
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#7fe0c5]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#26A69A]/25 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7fe0c5] via-[#26A69A] to-[#7fe0c5]" />

        <div className={`relative ${INNER} ${PAD} grid items-center gap-8 pb-12 pt-6 sm:pb-14 sm:pt-8 lg:grid-cols-2 lg:gap-8 lg:pb-14 lg:pt-8 2xl:pb-16 2xl:pt-12`}>
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#c9f3e6] backdrop-blur sm:text-sm">
              <BadgeCheck size={15} /> No brokerage, no hassle
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
               Customer <span className="text-[#7fe0c5]">Portal</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 sm:text-base md:text-lg lg:mx-0 2xl:max-w-2xl 2xl:text-2xl">
              Find your dream property with us. Book trusted professionals for building, interiors, repairs and more.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={() => scrollTo(SERVICES[0].key)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0f5e54] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e8f1ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fe0c5] sm:text-base"
              >
                Browse services <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => console.log("Free quote")}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fe0c5] sm:text-base"
              >
                Get a free quote
              </button>
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-white/80 sm:text-sm lg:justify-start">
              {["Verified professionals", "Transparent pricing", "Free site inspection"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <BadgeCheck size={15} className="text-[#7fe0c5]" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: image collage */}
          <div className="relative mx-auto hidden h-[260px] w-full max-w-[500px] lg:block xl:h-[290px] 2xl:h-[360px] 2xl:max-w-[600px]">
            <div className="absolute right-0 top-0 h-full w-[58%] overflow-hidden rounded-t-[999px] rounded-b-3xl border-4 border-white/90 shadow-2xl">
              <img src={BANNER_IMG} alt="Residential towers" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 h-[55%] w-[46%] -rotate-3 overflow-hidden rounded-2xl border-4 border-white/90 shadow-2xl">
              <img src={img("photo-1503387762-592deb58ef4e")} alt="Construction site" className="h-full w-full object-cover" />
            </div>
            <div className="absolute left-[6%] top-[8%] h-[30%] w-[34%] rotate-3 overflow-hidden rounded-2xl border-4 border-white/90 shadow-xl">
              <img src={img("photo-1618221195710-dd6b41faaea6")} alt="Interior design" className="h-full w-full object-cover" />
            </div>

            <div className="animate-float absolute bottom-6 right-2 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f5e54] to-[#26A69A] text-white">
                <BadgeCheck size={20} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-extrabold text-[#0f5e54]">Verified Pros</p>
                <p className="text-xs text-slate-500">Background-checked</p>
              </div>
            </div>
          </div>
        </div>

        {/* curved bottom edge into the category bar */}
        <svg
          className="absolute inset-x-0 bottom-0 h-8 w-full sm:h-12"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,48 L0,28 C240,0 480,0 720,16 C960,32 1200,40 1440,12 L1440,48 Z" fill="#ffffff" fillOpacity="0.94" />
        </svg>
      </section>

      {/* ===== Animated Service Categories ===== */}
      <section
        className="sticky top-0 z-30 w-full border-b border-[#e0eeeb] px-4 pb-4 pt-4 shadow-[0_10px_24px_-14px_rgba(15,94,84,0.45)] backdrop-blur sm:px-6 sm:pt-5 md:px-8 lg:px-10"
        style={{
          backgroundColor: "rgba(255,255,255,0.94)",
          backgroundImage:
            "radial-gradient(rgba(26,122,109,0.07) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        <div className="svc-shimmer absolute inset-x-0 top-0 h-[3px]" />
        <div className={INNER}>
          <div
            ref={barRef}
            className={`relative overflow-x-auto scroll-smooth ${hideScrollbar}`}
          >
            <div className="flex w-full min-w-max items-start justify-between gap-1 lg:min-w-0">
              {SERVICES.map((s, i) => (
                <ServiceTab
                  key={s.key}
                  index={i}
                  Icon={s.icon}
                  image={s.items[0]?.img}
                  label={s.tab}
                  count={s.items.length}
                  active={active === s.key}
                  tabRef={(el) => (tabRefs.current[s.key] = el)}
                  onClick={() => scrollTo(s.key)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#e8f1ee]">
          <div
            className="h-full rounded-r-full bg-gradient-to-r from-[#0f5e54] to-[#7fe0c5] transition-all duration-500 ease-out"
            style={{
              width: `${activeIndex < 0 ? 0 : ((activeIndex + 1) / SERVICES.length) * 100}%`,
            }}
          />
        </div>
      </section>

      {/* ===== Browse by service ===== */}
      <section
        className={`relative w-full overflow-hidden bg-gradient-to-b from-[#e8f1ee] via-[#dcebe6] to-[#e8f1ee] ${PAD} py-6 sm:py-8 md:py-10 xl:py-12`}
      >
        {/* decorative background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(15,94,84,0.10) 1.2px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* blueprint grid fading out downward */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,94,84,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,94,84,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            maskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#26A69A]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-[#0f5e54]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/4 h-64 w-64 rounded-full bg-[#7fe0c5]/20 blur-3xl" />

        <div className={`relative ${INNER}`}>
          {/* Header */}
          <div
            ref={browseRef}
            className={`mb-4 flex flex-col items-center justify-center text-center transition-all duration-1000 sm:mb-6 ${
              browseInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1a7a6d]/25 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a7a6d] shadow-sm backdrop-blur sm:text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#1a7a6d]" />
              What we offer
            </span>

            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-[#0f5e54] sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl">
              Browse by <span className="bg-gradient-to-r from-[#0f5e54] to-[#26A69A] bg-clip-text text-transparent">service</span>
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-1 w-10 rounded-full bg-gradient-to-r from-transparent to-[#26A69A] sm:w-16" />
              <span className="h-2.5 w-2.5 rotate-45 bg-[#0f5e54]" />
              <span className="h-1 w-10 rounded-full bg-gradient-to-l from-transparent to-[#26A69A] sm:w-16" />
            </div>

            <p className="mt-4 max-w-2xl text-sm text-slate-600 sm:text-lg 2xl:text-xl">
              Tap a card to view that service
            </p>

          </div>

          {SERVICES.map((s, idx) => (
            <React.Fragment key={s.key}>
              {idx > 0 && <SectionDivider />}
              <ServiceCategorySection
                s={s}
                index={idx}
                sectionRefs={sectionRefs}
                handleSelect={handleSelect}
              />
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ===== Why customers trust us ===== */}
      <section className={`w-full bg-[#1c3b34] ${PAD} py-8 sm:py-10 lg:py-12 2xl:py-16`}>
        <div className={INNER}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-black uppercase text-white sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
              Why customers trust us
            </h2>
            <span className="text-[11px] tracking-[0.25em] text-[#7fb8aa] sm:text-xs 2xl:text-sm">OUR PROMISE</span>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5 2xl:gap-8">
            {TRUST.map((t) => (
              <TrustCard key={t.title} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Popular services ===== */}
      <section className={`w-full bg-white ${PAD} ${SECTION_Y}`}>
        <div className={INNER}>
          <h2 className="text-center text-2xl font-black uppercase tracking-tight text-[#1a7a6d] sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl">
            Popular services
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500 sm:text-base 2xl:text-xl">
            Booked by customers near you
          </p>
          <div className="mx-auto mt-3 h-1 w-14 bg-[#1a7a6d] 2xl:w-20" />
          <div className="mt-4 sm:mt-5">
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

/* ---------- Divider between categories ---------- */
const SectionDivider = () => (
  <div className="mt-4 flex items-center justify-center gap-3 sm:mt-6 xl:mt-8" aria-hidden="true">
    <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(15,94,84,0.35)_0_6px,transparent_6px_12px)]" />
    <span className="h-2 w-2 rotate-45 bg-[#26A69A]" />
    <span className="h-3 w-3 rotate-45 border-2 border-[#0f5e54]" />
    <span className="h-2 w-2 rotate-45 bg-[#26A69A]" />
    <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(15,94,84,0.35)_0_6px,transparent_6px_12px)]" />
  </div>
);

/* ---------- Sub-component to handle individual category entrance animation ---------- */
const ServiceCategorySection = ({ s, index, sectionRefs, handleSelect }) => {
  const [ref, isInView] = useInView({ threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
  const Icon = s.icon;
  const flip = index % 2 === 1;

  return (
    <div
      ref={(el) => {
        ref.current = el;
        sectionRefs.current[s.key] = el;
      }}
      data-key={s.key}
      className="scroll-mt-40 mt-4 sm:mt-6 xl:mt-8"
    >
      <div
        className={`group/cat relative overflow-hidden rounded-3xl border border-white/80 p-3 shadow-[0_10px_40px_-15px_rgba(15,94,84,0.35)] backdrop-blur-sm sm:p-4 xl:p-5 ${
          flip
            ? "bg-gradient-to-bl from-white/60 via-white/40 to-[#7fe0c5]/15"
            : "bg-gradient-to-br from-white/60 via-white/40 to-[#26A69A]/10"
        }`}
      >
        {/* left accent bar */}
        <span className="absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#0f5e54] via-[#26A69A] to-[#7fe0c5]" />

        {/* giant watermark icon */}
        <Icon
          aria-hidden="true"
          strokeWidth={1}
          className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-[#0f5e54]/[0.06] transition-transform duration-700 group-hover/cat:rotate-6 group-hover/cat:scale-110 sm:h-56 sm:w-56"
        />

        {/* Category header */}
        <div
          className={`relative mb-0 flex flex-col items-center gap-3 text-center transition-all duration-1000 sm:flex-row sm:justify-between sm:text-left ${
            isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f5e54] to-[#26A69A] text-white shadow-lg sm:h-14 sm:w-14">
              <span className="svc-pulse absolute inset-0 rounded-2xl" />
              <Icon size={24} strokeWidth={2.2} className="relative" />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-[#0f5e54] shadow ring-2 ring-[#26A69A]/40">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-wide text-[#0f5e54] sm:text-xl md:text-2xl xl:text-3xl">
                {s.name}
              </h3>
              <div className="mt-1.5 h-1 w-16 rounded-full bg-gradient-to-r from-[#0f5e54] to-[#7fe0c5] max-sm:mx-auto" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1a7a6d]/25 bg-white px-3.5 py-1.5 text-xs font-bold text-[#0f5e54] shadow-sm sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#26A69A]" />
              {s.items.length} services
            </span>
            <button
              type="button"
              onClick={() => handleSelect({ title: s.name })}
              className="hidden items-center gap-1.5 rounded-full bg-[#0f5e54] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#1a7a6d] hover:shadow-[0_0_12px_rgba(26,122,109,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a7a6d] focus-visible:ring-offset-2 sm:inline-flex sm:text-sm"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          className={`relative transition-all duration-1000 delay-200 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <Carousel
            showArrows={s.items.length > 4}
            center={s.items.length <= 4}
            progress={s.items.length > 4}
          >
            {s.items.map((item, i) => (
              <PolaroidCard
                key={item.id}
                item={item}
                index={i}
                isInView={isInView}
                Icon={Icon}
                tilt={TILTS[i % TILTS.length]}
                onSelect={handleSelect}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

/* ---------- Global Animations & Effects ---------- */
const STRIP_CSS = `
@keyframes svcIn {
  from { opacity: 0; transform: translateY(16px) scale(.88); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes svcSpin { to { transform: rotate(360deg); } }
@keyframes svcPulse {
  0%   { box-shadow: 0 0 0 0 rgba(26,122,109,.45); }
  100% { box-shadow: 0 0 0 14px rgba(26,122,109,0); }
}
@keyframes svcShimmer {
  0%   { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}
@keyframes floatUp {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.svc-tab   { animation: svcIn .55s cubic-bezier(.22,1,.36,1) both; }
.svc-ring  { background: conic-gradient(from 0deg, #0f5e54, #7fe0c5, #1a7a6d, #e8f1ee, #0f5e54); animation: svcSpin 3.2s linear infinite; }
.svc-pulse { animation: svcPulse 1.8s ease-out infinite; }
.svc-shimmer {
  background: linear-gradient(90deg, #0f5e54, #7fe0c5, #1a7a6d, #0f5e54);
  background-size: 200% 100%;
  animation: svcShimmer 5s linear infinite;
}
.animate-float {
  animation: floatUp 3s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .svc-tab, .svc-ring, .svc-pulse, .svc-shimmer, .animate-float { animation: none !important; }
  .transition-all { transition-duration: 0.01ms !important; }
}
`;

export default CustomerPortalPage;