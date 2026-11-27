import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Home, Building2, TrendingUp, Landmark, Settings, Info, Mail,
  LogIn, UserPlus, Menu, X, ChevronDown, ChevronRight, Star, ArrowLeft, Shield,
  Building, HardHat, Droplets, User, Sofa, Zap, Hammer, Layers, Ruler,
  Mail as MailIcon, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, Phone, MapPin
} from "lucide-react";

// TODO: set this to your real logo path (e.g. import logo from "../assets/logo.png")
const LOGO_SRC = "/logo.png";
const EMPTY_FORM = { email: "", mobile: "", password: "", name: "", company: "", city: "", otp: "", newPassword: "", confirmPassword: "" };

/* ---------- Customer Portal: categories + sub categories (same slugs as OurServicesPage) ---------- */
const PORTAL_CATEGORIES = [
  {
    slug: "residential-construction",
    short: "Residential Construction",
    icon: Home,
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
    icon: Sofa,
    items: [
      "Residential Interior Design", "Commercial Interior Design",
      "Modular Interior Services", "Interior Finishing Services", "Interior Design Styles",
    ],
  },
  {
    slug: "electrical-plumbing",
    short: "Electrical & Plumbing",
    icon: Zap,
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
    icon: Hammer,
    items: [
      "Complete House Renovation", "Apartment Renovation", "Kitchen Renovation",
      "Bathroom Renovation", "Office Renovation", "Building Extension",
      "Structural Repair", "Roof Repair", "Crack Repair", "Repainting & Refurbishment",
    ],
  },
  {
    slug: "waterproofing-protection",
    short: "Waterproofing & Protection",
    icon: Droplets,
    items: [
      "Terrace Waterproofing", "Bathroom Waterproofing", "Basement Waterproofing",
      "Roof Waterproofing", "External Wall Waterproofing", "Water Leakage Repair",
      "Damp Proofing", "Expansion Joint Waterproofing",
    ],
  },
  {
    slug: "exterior-landscaping",
    short: "Exterior & Landscaping",
    icon: Layers,
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
    icon: Ruler,
    items: [
      "Architectural Design", "Building Plan Preparation", "3D Elevation Design",
      "Structural Design", "Soil Testing", "Site Survey", "Quantity Surveying",
      "BOQ Preparation", "Building Approval Assistance", "Construction Project Planning",
    ],
  },
  {
    slug: "civil-structural-construction",
    short: "Civil & Structural",
    icon: HardHat,
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
    icon: Building2,
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
    icon: Settings,
    items: [
      "Pre-Engineered Building Construction", "Prefabricated House Construction",
      "Steel Structure Construction", "Industrial Shed Construction",
      "Solar Panel Mounting Structures", "Fire Safety System Installation",
      "Lift & Elevator Installation", "HVAC Installation", "Acoustic Treatment",
      "Green Building Solutions",
    ],
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [customerPortalOpen, setCustomerPortalOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(null); // category whose sub-services are shown in the flyout
  const [scrolled, setScrolled] = useState(false);

  // ---------- LOGIN MODAL STATE ----------
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState(null); // null | "customer" | "vendor" | "forgot"
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [loginMethod, setLoginMethod] = useState("mobile"); // "email" | "mobile"
  const [forgotStep, setForgotStep] = useState("request"); // "request" | "verify" | "done"
  const [forgotFrom, setForgotFrom] = useState("customer");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  // Set when the popup is opened from a "Post Your ... Service" button: { label, redirectTo }
  const [postContext, setPostContext] = useState(null);

  const dropdownRef = useRef(null);
  const customerPortalRef = useRef(null);
  const customerPortalTimeout = useRef(null);
  const modalRef = useRef(null);

  const navigate = useNavigate();

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (customerPortalRef.current && !customerPortalRef.current.contains(event.target)) {
        setCustomerPortalOpen(false);
        setActiveCat(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open the login popup from "Post Your ... Service" buttons (PostServicesPage)
  useEffect(() => {
    const handler = (e) => {
      setAuthMode("login");
      setLoginRole(null);
      setLoginMethod("mobile");
      setFormError("");
      setFormData(EMPTY_FORM);
      setShowPassword(false);
      setPostContext(e.detail || null);
      setLoginModalOpen(true);
    };
    window.addEventListener("open-auth-modal", handler);
    return () => window.removeEventListener("open-auth-modal", handler);
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeLoginModal();
    };
    if (loginModalOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [loginModalOpen]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = loginModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loginModalOpen]);

  // Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToProperties = () => {
    window.location.href = "https://eliteinovapropertieshub.in/";
  };

  const handleNavigation = (path) => {
    setMenuOpen(false);
    setCustomerPortalOpen(false);
    setActiveCat(null);
    navigate(path);
  };

  // ---------- LOGIN MODAL HANDLERS ----------
  const openLoginModal = () => {
    setPostContext(null);
    setAuthMode("login");
    setLoginModalOpen(true);
    setLoginRole(null);
    setLoginMethod("mobile");
    setFormError("");
    setFormData(EMPTY_FORM);
    setShowPassword(false);
  };

  // Register button: same modal, register mode
  const openRegisterModal = () => {
    openLoginModal();
    setAuthMode("register");
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
    setPostContext(null);
    setLoginRole(null);
    setFormData(EMPTY_FORM);
    setShowPassword(false);
  };

  const openForgot = () => {
    setForgotFrom(loginRole);
    setLoginRole("forgot");
    setForgotStep("request");
    setFormData({ ...EMPTY_FORM, [loginMethod]: formData[loginMethod] });
    setShowPassword(false);
    setFormError("");
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    // TODO: call your API to send OTP
    console.log("Send OTP:", loginMethod, formData[loginMethod]);
    setForgotStep("verify");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (formData.newPassword.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    // TODO: call your API to verify OTP and reset password
    console.log("Reset password:", formData.otp);
    setFormError("");
    setForgotStep("done");
  };

  const backToLogin = () => {
    setLoginRole(forgotFrom || "customer");
    setFormData(EMPTY_FORM);
    setShowPassword(false);
    setFormError("");
  };

  const switchToRegister = () => {
    setAuthMode("register");
    setFormData(EMPTY_FORM);
    setShowPassword(false);
    setFormError("");
  };

  const switchToLogin = () => {
    setAuthMode("login");
    setFormData(EMPTY_FORM);
    setShowPassword(false);
    setFormError("");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    // TODO: call your register API here
    console.log(`Register as ${loginRole}:`, formData);
    switchToLogin(); // after registering, show that role's login form
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const basePath =
      postContext?.redirectTo || (loginRole === "vendor" ? "/vendor/dashboard" : "/customer/dashboard");
    // TODO: call your auth API here
    console.log(`Login as ${loginRole}:`, formData);
    closeLoginModal();
    navigate(basePath);
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Customer Portal", path: "/customer-portal", icon: Building2, dropdown: true, isCustomerPortal: true },
    { name: "Post Your Services", path: "/post-services", icon: TrendingUp, dropdown: true },
    { name: "Our Services", path: "/services", icon: Settings },
    { name: "Loan & Insurance", path: "/loan-insurance", icon: Landmark, dropdown: true },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Contact Us", path: "/contact", icon: Mail },
  ];

  // NAV LINK: smaller text, tighter padding so all 7 items fit in one row
  const navLinkClass = ({ isActive }) =>
    `group relative flex items-center gap-1.5 xl:gap-2 whitespace-nowrap px-2 xl:px-3 py-2.5 text-[12px] xl:text-[13.5px] font-bold tracking-wide transition-all duration-200
    ${
      isActive
        ? "border-b-[2px] border-yellow-400 bg-black/10 text-white"
        : "border-b-[2px] border-transparent text-white hover:bg-black/10 hover:border-yellow-400"
    }`;

  const openCustomerPortal = () => {
    if (customerPortalTimeout.current) clearTimeout(customerPortalTimeout.current);
    setCustomerPortalOpen(true);
  };

  const closeCustomerPortal = () => {
    customerPortalTimeout.current = setTimeout(() => {
      setCustomerPortalOpen(false);
      setActiveCat(null);
    }, 150);
  };

  // ---------- SHARED LOGIN PIECES (reduced sizes) ----------
  const inputClass =
    "w-full rounded-xl border-2 border-[#CDEBE2] bg-[#F3FAF7] py-3 pl-11 pr-4 text-[16px] text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#2AA396] focus:bg-white focus:ring-4 focus:ring-[#2AA396]/15";
  const labelClass = "mb-1.5 block text-[14px] font-bold tracking-wide text-gray-700";
  const primaryBtnClass =
    "mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B6E63] to-[#2AA396] py-3 text-[16px] font-bold tracking-wide text-white shadow-[0_8px_20px_rgba(15,111,100,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,111,100,0.45)] active:translate-y-0";

  const renderModalHeader = (title, subtitle) => (
    <div className="login-head flex items-center justify-between px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/80 bg-[#1B8577] shadow-md">
          <img src={LOGO_SRC} alt="Eliteinova" className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="text-[22px] font-bold leading-tight tracking-tight text-white">{title}</h2>
          <p className="mt-0.5 text-[14px] tracking-wide text-teal-50">{subtitle}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={closeLoginModal}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition hover:rotate-90 hover:bg-white/30"
      >
        <X size={18} />
      </button>
    </div>
  );

  const renderMethodTabs = () => (
  <div className="mb-4 flex rounded-xl bg-[#F1F8F4] p-1">
    {[
      { key: "mobile", label: "Mobile Number" },
      { key: "email", label: "Email" },
    ].map((t) => (
      <button
        key={t.key}
        type="button"
        onClick={() => setLoginMethod(t.key)}
        className={`flex-1 rounded-lg py-2 text-[15px] font-bold tracking-wide transition-all ${
          loginMethod === t.key
            ? "bg-white text-[#0F6F64] shadow-md"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

  const renderIdentifierField = (emailPlaceholder) => (
    <div>
      <label className={labelClass}>{loginMethod === "email" ? "Email Address" : "Mobile Number"}</label>
      <div className="relative">
        {loginMethod === "email" ? (
          <MailIcon size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
        ) : (
          <UserPlus size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
        )}
        <input
          type={loginMethod === "email" ? "email" : "tel"}
          required
          value={loginMethod === "email" ? formData.email : formData.mobile}
          onChange={(e) => setFormData({ ...formData, [loginMethod]: e.target.value })}
          placeholder={loginMethod === "email" ? emailPlaceholder : "+91 98765 43210"}
          className={inputClass}
        />
      </div>
    </div>
  );

  const renderPasswordField = (label, key, placeholder, withEye = true) => (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
        <input
          type={showPassword ? "text" : "password"}
          required
          value={formData[key]}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          placeholder={placeholder}
          className={`${inputClass} pr-11`}
        />
        {withEye && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#2AA396]"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );

  // ---------- LOGIN FORM (Customer + Vendor) ----------
  const renderLoginForm = ({ title, subtitle, emailPlaceholder, submitLabel, footerText, footerLink }) => (
    <div className="animate-slide-up">
      {renderModalHeader(title, subtitle)}

      <div className="px-5 pb-6 pt-5 sm:px-6">
        {renderMethodTabs()}

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          {renderIdentifierField(emailPlaceholder)}
          {renderPasswordField("Password", "password", "Enter your password")}

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-[14px]">
            <label className="flex cursor-pointer items-center gap-2 tracking-wide text-gray-600">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-[#0F6F64]" />
              Remember me
            </label>
            <button type="button" onClick={openForgot} className="font-bold tracking-wide text-[#1FA091] hover:underline">
              Forgot password?
            </button>
          </div>

          <button type="submit" className={primaryBtnClass}>
            {submitLabel} <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-5 text-center text-[14px] tracking-wide text-gray-500">
          {footerText}{" "}
          <button type="button" onClick={switchToRegister} className="font-bold text-[#1FA091] hover:underline">
            {footerLink}
          </button>
        </p>
      </div>
    </div>
  );

  // ---------- REGISTRATION FORM (Customer + Vendor) ----------
  const renderTextField = (label, key, placeholder, Icon, type = "text") => (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <Icon size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
        <input
          type={type}
          required
          value={formData[key]}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          placeholder={placeholder}
          className={inputClass}
        />
      </div>
    </div>
  );

  const renderRegisterForm = (role) => {
    const isVendor = role === "vendor";
    return (
      <div className="animate-slide-up">
        {renderModalHeader(
          isVendor ? "Vendor Registration" : "Customer Registration",
          isVendor
            ? postContext
              ? `Create your account to post ${postContext.label} services`
              : "Create your account to post properties"
            : "Create your account to find properties"
        )}

        <div className="px-5 pb-6 pt-5 sm:px-6">
          <form onSubmit={handleRegisterSubmit} className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            {isVendor ? (
              <>
                {renderTextField("Contact Person Name", "name", "Enter your full name", User)}
                {renderTextField("Company / Business Name", "company", "Enter company name", Building)}
                {renderTextField("Email Address", "email", "vendor@company.com", MailIcon, "email")}
                {renderTextField("Mobile Number", "mobile", "+91 98765 43210", Phone, "tel")}
                <div className="sm:col-span-2">{renderTextField("City", "city", "Enter your city", MapPin)}</div>
              </>
            ) : (
              <>
                <div className="sm:col-span-2">{renderTextField("Full Name", "name", "Enter your full name", User)}</div>
                {renderTextField("Email Address", "email", "your@email.com", MailIcon, "email")}
                {renderTextField("Mobile Number", "mobile", "+91 98765 43210", Phone, "tel")}
              </>
            )}
            {renderPasswordField("Password", "password", "Create a password")}
            {renderPasswordField("Confirm Password", "confirmPassword", "Re-enter your password", false)}

            {formError && <p className="text-[14px] font-semibold text-red-600 sm:col-span-2">{formError}</p>}

            <label className="flex cursor-pointer items-center gap-2 text-[14px] tracking-wide text-gray-600 sm:col-span-2">
              <input type="checkbox" required className="h-4 w-4 rounded border-gray-300 accent-[#0F6F64]" />
              I agree to the Terms &amp; Conditions
            </label>

            <button type="submit" className={`${primaryBtnClass} sm:col-span-2`}>
              {isVendor ? "Register as Vendor" : "Create Account"} <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-5 text-center text-[14px] tracking-wide text-gray-500">
            Already have an account?{" "}
            <button type="button" onClick={switchToLogin} className="font-bold text-[#1FA091] hover:underline">
              Login here
            </button>
          </p>
        </div>
      </div>
    );
  };

  // ---------- FORGOT PASSWORD FLOW ----------
  // Step 1: enter email/mobile -> Step 2: enter OTP + new password -> Step 3: success
  const renderForgotPassword = () => {
    const target = loginMethod === "email" ? formData.email : formData.mobile;
    const headings = {
      request: ["Forgot Password", "We'll send a verification code to you"],
      verify: ["Reset Password", `Code sent to ${target}`],
      done: ["Password Updated", "You can now sign in"],
    };
    const [title, subtitle] = headings[forgotStep];

    return (
      <div className="animate-slide-up">
        {renderModalHeader(title, subtitle)}

        <div className="px-5 pb-6 pt-5 sm:px-6">
          {forgotStep === "request" && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              {renderMethodTabs()}
              {renderIdentifierField("your@email.com")}
              <button type="submit" className={primaryBtnClass}>
                Send OTP <ArrowRight size={18} />
              </button>
            </form>
          )}

          {forgotStep === "verify" && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>Enter OTP</label>
                <div className="relative">
                  <Shield size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, "") })}
                    placeholder="6-digit code"
                    className={`${inputClass} tracking-[0.3em]`}
                  />
                </div>
              </div>

              {renderPasswordField("New Password", "newPassword", "Enter new password")}
              {renderPasswordField("Confirm Password", "confirmPassword", "Re-enter new password", false)}

              {formError && <p className="text-[14px] font-semibold text-red-600">{formError}</p>}

              <button type="submit" className={primaryBtnClass}>
                Reset Password <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={handleSendOtp}
                className="text-center text-[14px] font-bold text-[#1FA091] hover:underline"
              >
                Resend OTP
              </button>
            </form>
          )}

          {forgotStep === "done" && (
            <div className="flex flex-col items-center gap-3 py-3 text-center">
              <CheckCircle2 size={52} className="text-[#2AA396]" strokeWidth={1.8} />
              <p className="text-[15px] text-gray-600">Your password has been changed successfully.</p>
              <button type="button" onClick={backToLogin} className={primaryBtnClass}>
                Back to Login <ArrowRight size={18} />
              </button>
            </div>
          )}

          {forgotStep !== "done" && (
            <button
              type="button"
              onClick={backToLogin}
              className="mt-5 flex w-full items-center justify-center gap-2 text-[14px] font-bold text-gray-500 transition hover:text-[#1FA091]"
            >
              <ArrowLeft size={16} /> Back to Login
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{fontStyle}</style>

      <header
        className={`fixed top-0 left-0 w-full font-sans shadow-md z-[1000] transition-all duration-300 ${
          scrolled ? "shadow-xl" : ""
        }`}
      >
        {/* TOP BRAND HEADER */}
        <div className="relative bg-gradient-to-r from-[#177A6E] via-[#2e9b8e] to-[#177A6E]">
          <div className="mx-auto flex min-h-[64px] md:min-h-[82px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-2">
            {/* LOGO AND BRAND TEXT */}
            <div className="flex min-w-0 items-center gap-3 lg:gap-4">
              <Link to="/" className="shrink-0 group">
                <div className="animate-logo flex h-[46px] w-[46px] sm:h-[50px] sm:w-[50px] lg:h-[54px] lg:w-[54px] items-center justify-center rounded-full border-[2.5px] border-[#D9B44A] bg-[#1B8577] shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
                  <span className="text-[7px] sm:text-[8px] font-bold text-white text-center leading-tight tracking-tight">
                    Eliteinova<br />Logo
                  </span>
                </div>
              </Link>

              <div className="flex flex-col justify-center -mt-0.5">
                <h1 className="whitespace-nowrap leading-none text-[#F4F4E8]" style={{ fontFamily: "'Pacifico', cursive" }}>
                  <span className="text-[16px] sm:text-[22px] md:text-[21px] lg:text-[26px] tracking-wide">Eliteinova Properties</span>
                  <span className="text-[13px] sm:text-[17px] md:text-[17px] lg:text-[19px] ml-1.5 sm:ml-2 tracking-wide">Services</span>
                </h1>

                <div className="flex flex-wrap items-center gap-2 pl-1 mt-1">
                  <span className="text-[12px] sm:text-[13px] lg:text-[15px] text-[#eaecdf] tracking-wide" style={{ fontFamily: "'Pacifico', cursive" }}>
                    No Brokerage
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#4C9F93] bg-[#0F766E] px-2 py-0.5 shadow-sm transition-all duration-300 hover:bg-[#0d655e] hover:scale-105">
                    <Star size={10} className="animate-star fill-[#FACC15] text-[#FACC15]" />
                    <span className="text-[9px] sm:text-[10px] text-[#F4F4E8] pr-0.5 tracking-wide" style={{ fontFamily: "'Pacifico', cursive" }}>
                      Trusted
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE BUTTONS */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={goToProperties}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#66b9b0] bg-[#3d8a80] px-3 py-2 text-[12px] sm:text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#156b60] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 min-w-[108px] group tracking-wide"
              >
                <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Back to Properties</span>
              </button>

              {/* LOGIN BUTTON */}
              <button
                type="button"
                onClick={openLoginModal}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#66b9b0] bg-[#4c978d] px-3.5 py-2 text-[12px] sm:text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#156b60] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 min-w-[78px] group tracking-wide"
              >
                <LogIn size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                <span>Login</span>
              </button>

              <button
                type="button"
                onClick={openRegisterModal}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#FDE047] to-[#F59E0B] px-3.5 py-2 text-[12px] sm:text-[13px] font-bold text-[#3d9178] shadow-sm transition-all duration-300 hover:from-[#FCD34D] hover:to-[#D97706] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 min-w-[88px] group tracking-wide"
              >
                <UserPlus size={14} className="transition-transform duration-300 group-hover:scale-110" />
                <span>Register</span>
              </button>

              {/* HAMBURGER BUTTON */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#3A9D91] bg-transparent text-white transition-all duration-300 hover:bg-[#156b60] hover:rotate-90 ml-0.5"
                >
                  {menuOpen ? <X size={17} /> : <Menu size={17} />}
                </button>

                {menuOpen && (
                  <div className="animate-dropdown absolute top-[120%] right-0 mt-2 w-[190px] sm:w-[220px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden z-50 border border-gray-100">
                    <div className="px-4 pt-4 pb-2">
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                        STAFF ACCESS
                      </p>
                    </div>

                    <div className="px-2.5 pb-3 flex flex-col gap-1">
                      <button
                        onClick={() => handleNavigation("/admin")}
                        className="group flex w-full items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-gray-50 hover:translate-x-1"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F2F0] transition-all duration-200 group-hover:bg-[#d8ebe8] group-hover:rotate-6">
                          <Shield className="text-[#1B8577]" size={17} strokeWidth={2.5} />
                        </div>
                        <span className="text-[15px] font-bold text-[#0f3d38] transition-colors duration-200 group-hover:text-[#1B8577] tracking-tight">
                          Admin Panel
                        </span>
                      </button>

                      <button
                        onClick={() => handleNavigation("/office")}
                        className="group flex w-full items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-[#F4F7F6] hover:translate-x-1"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F2F0] transition-all duration-200 group-hover:bg-[#d8ebe8] group-hover:rotate-6">
                          <Building className="text-[#1B8577]" size={17} strokeWidth={2.5} />
                        </div>
                        <span className="text-[15px] font-bold text-[#0f3d38] transition-colors duration-200 group-hover:text-[#1B8577] tracking-tight">
                          Office Panel
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden w-full bg-[#15726a] lg:block">
          <div className="mx-auto flex flex-nowrap items-center justify-between px-2 xl:px-8">
            {navItems.map((item) => {
              const Icon = item.icon;

              if (item.isCustomerPortal) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    ref={customerPortalRef}
                    onMouseEnter={openCustomerPortal}
                    onMouseLeave={closeCustomerPortal}
                  >
                    <NavLink
                      to={item.path}
                      className={navLinkClass}
                      onClick={() => {
                        setCustomerPortalOpen(false);
                        setActiveCat(null);
                      }}
                    >
                      <Icon size={15} className="xl:w-[16px] xl:h-[16px] transition-transform duration-300 group-hover:scale-110" strokeWidth={2.2} />
                      <span>{item.name}</span>
                      <ChevronDown
                        size={13}
                        className={`xl:w-[14px] xl:h-[14px] ml-0.5 transition-transform duration-300 ${
                          customerPortalOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.5}
                      />
                    </NavLink>

                    {/* CATEGORIES DROPDOWN + SUB CATEGORY FLYOUT */}
                    {customerPortalOpen && (
                      <div className="animate-dropdown absolute left-0 top-full z-50 pt-2">
                        <div className="relative w-[260px]">
                          {/* categories */}
                          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
                            <div className="px-4 pb-2 pt-3">
                              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">OUR SERVICES</p>
                            </div>
                            <div className="flex flex-col gap-0.5 px-2 pb-3">
                              {PORTAL_CATEGORIES.map((cat) => {
                                const CatIcon = cat.icon;
                                const active = activeCat?.slug === cat.slug;
                                return (
                                  <button
                                    key={cat.slug}
                                    type="button"
                                    onMouseEnter={() => setActiveCat(cat)}
                                    onClick={() => handleNavigation(`/services/${cat.slug}`)}
                                    className={`group flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-all duration-200 ${
                                      active ? "bg-[#E6F2F0]" : "hover:bg-[#E6F2F0]"
                                    }`}
                                  >
                                    <span
                                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                                        active ? "bg-[#1B8577] text-white" : "bg-[#E6F2F0] text-[#1B8577]"
                                      }`}
                                    >
                                      <CatIcon size={15} strokeWidth={2.3} />
                                    </span>
                                    <span className={`flex-1 text-[14px] font-semibold tracking-tight ${active ? "text-[#1B8577]" : "text-[#0f3d38]"}`}>
                                      {cat.short}
                                    </span>
                                    <ChevronRight size={15} className={`transition-transform duration-200 ${active ? "translate-x-0.5 text-[#1B8577]" : "text-gray-400"}`} />
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* sub categories flyout */}
                          {activeCat && (
                            <div key={activeCat.slug} className="animate-dropdown absolute left-full top-0 pl-2">
                              <div className="max-h-[70vh] w-[260px] overflow-y-auto rounded-2xl border border-gray-100 bg-white py-2 shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
                                <button
                                  type="button"
                                  onClick={() => handleNavigation(`/services/${activeCat.slug}`)}
                                  className="block w-full border-b border-gray-100 px-4 py-2 text-left text-[14px] font-extrabold text-[#1B8577] transition hover:bg-[#E6F2F0]"
                                >
                                  All {activeCat.short}
                                </button>
                                {activeCat.items.map((label) => (
                                  <button
                                    key={label}
                                    type="button"
                                    onClick={() =>
                                      handleNavigation(`/services/${activeCat.slug}?service=${encodeURIComponent(label)}`)
                                    }
                                    className="block w-full px-4 py-2 text-left text-[13.5px] font-medium text-[#0f3d38] transition-all duration-200 hover:translate-x-1 hover:bg-[#E6F2F0] hover:text-[#1B8577]"
                                  >
                                    {label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink key={item.name} to={item.path} className={navLinkClass}>
                  <Icon size={15} className="xl:w-[16px] xl:h-[16px] transition-transform duration-300 group-hover:scale-110" strokeWidth={2.2} />
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown size={13} className="xl:w-[14px] xl:h-[14px] ml-0.5 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.5} />}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ============================================ */}
      {/*            LOGIN MODAL                       */}
      {/* ============================================ */}
      {loginModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
        >
          <div
            ref={modalRef}
            className={`login-modal relative w-full max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl ${
              loginRole === null ? "max-w-[460px]" : authMode === "register" ? "max-w-[560px]" : "max-w-[440px]"
            }`}
          >
            {/* LOGIN / REGISTER CHOICE (opened from "Post Your ... Service") */}
            {loginRole === null && postContext && (
              <div className="p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-[#1B8577]">
                    <LogIn size={20} strokeWidth={2.5} />
                    <h2 className="text-[20px] font-extrabold tracking-tight">Post Your {postContext.label} Service</h2>
                  </div>
                  <button onClick={closeLoginModal} className="text-gray-400 hover:text-gray-700 transition-colors">
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </div>
                <p className="text-[14px] text-gray-500 mb-5 font-medium tracking-wide">Login or register to continue</p>

                <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                  {/* Login card */}
                  <button
                    type="button"
                    onClick={() => { setAuthMode("login"); setLoginRole("vendor"); }}
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border-[2.5px] border-[#9eb8ec] bg-[#F3F7FF] py-5 px-3 text-center transition-all duration-300 hover:border-[#0a5adb] hover:bg-[#EBF2FF] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2E9FE] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <LogIn size={22} className="text-[#1E3A8A]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[17px] font-bold text-[#1E3A8A] tracking-tight">Login</p>
                      <p className="text-[13px] text-gray-600 mt-0.5 tracking-wide">Already have an account</p>
                    </div>
                  </button>

                  {/* Register card */}
                  <button
                    type="button"
                    onClick={() => { setAuthMode("register"); setLoginRole("vendor"); }}
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border-[2.5px] border-[#99e4d3] bg-[#F2FBF4] py-5 px-3 text-center transition-all duration-300 hover:border-[#47c2ad] hover:bg-[#E8F7EB] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <UserPlus size={22} className="text-[#166534]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[17px] font-bold text-[#166534] tracking-tight">Register</p>
                      <p className="text-[13px] text-gray-600 mt-0.5 tracking-wide">Create a new account</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: ROLE SELECTION (normal Login / Register buttons) */}
            {loginRole === null && !postContext && (
              <div className="p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-[#1B8577]">
                    {authMode === "register" ? <UserPlus size={20} strokeWidth={2.5} /> : <LogIn size={20} strokeWidth={2.5} />}
                    <h2 className="text-[20px] font-extrabold tracking-tight">
                      {authMode === "register" ? "Register as" : "Login as"}
                    </h2>
                  </div>
                  <button onClick={closeLoginModal} className="text-gray-400 hover:text-gray-700 transition-colors">
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </div>
                <p className="text-[14px] text-gray-500 mb-5 font-medium tracking-wide">Choose your role to continue</p>

                <div className="grid grid-cols-2 gap-3">
                  {/* Customer Card */}
                  <button
                    type="button"
                    onClick={() => setLoginRole("customer")}
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border-[2.5px] border-[#9eb8ec] bg-[#F3F7FF] py-5 px-3 text-center transition-all duration-300 hover:border-[#0a5adb] hover:bg-[#EBF2FF] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2E9FE] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <User size={22} className="text-[#1E3A8A]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[17px] font-bold text-[#1E3A8A] tracking-tight">Customer</p>
                      <p className="text-[13px] text-gray-600 mt-0.5 tracking-wide">Looking for properties</p>
                    </div>
                  </button>

                  {/* Vendor Card */}
                  <button
                    type="button"
                    onClick={() => setLoginRole("vendor")}
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border-[2.5px] border-[#99e4d3] bg-[#F2FBF4] py-5 px-3 text-center transition-all duration-300 hover:border-[#47c2ad] hover:bg-[#E8F7EB] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Building size={22} className="text-[#166534]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[17px] font-bold text-[#166534] tracking-tight">Vendor</p>
                      <p className="text-[13px] text-gray-600 mt-0.5 tracking-wide">Sell or rent properties</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CUSTOMER LOGIN */}
            {authMode === "login" && loginRole === "customer" &&
              renderLoginForm({
                title: "Customer Login",
                subtitle: "Welcome back! Sign in to your account",
                emailPlaceholder: "your@email.com",
                submitLabel: "Sign In",
                footerText: "Don't have an account?",
                footerLink: "Register here",
              })}

            {/* STEP 3: VENDOR LOGIN */}
            {authMode === "login" && loginRole === "vendor" &&
              renderLoginForm({
                title: "Vendor Portal",
                subtitle: postContext
                  ? `Sign in to post your ${postContext.label} service`
                  : "Post and manage your properties",
                emailPlaceholder: "vendor@company.com",
                submitLabel: "Sign In as Vendor",
                footerText: "Don't have a vendor account?",
                footerLink: "Register as Vendor",
              })}

            {/* REGISTRATION FORMS */}
            {authMode === "register" && (loginRole === "customer" || loginRole === "vendor") &&
              renderRegisterForm(loginRole)}

            {/* STEP 4: FORGOT PASSWORD */}
            {loginRole === "forgot" && renderForgotPassword()}
          </div>
        </div>
      )}
    </>
  );
};

// Import Pacifico font + custom keyframe animations
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

  @keyframes dropdownFadeIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes slideInItem {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes logoPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(217, 180, 74, 0.45); }
    50%      { box-shadow: 0 0 0 10px rgba(217, 180, 74, 0); }
  }
  @keyframes starTwinkle {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
    50%      { transform: scale(1.25) rotate(15deg); opacity: 0.85; }
  }
  @keyframes modalPopIn {
    from { opacity: 0; transform: translateY(18px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(15px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-dropdown { animation: dropdownFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-logo     { animation: logoPulse 3s ease-in-out infinite; }
  .animate-star     { animation: starTwinkle 2.5s ease-in-out infinite; }
  .item-stagger > * { opacity: 0; animation: slideInItem 0.3s ease-out forwards; }
  .item-stagger > *:nth-child(1) { animation-delay: 0.04s; }
  .item-stagger > *:nth-child(2) { animation-delay: 0.08s; }
  .item-stagger > *:nth-child(3) { animation-delay: 0.12s; }
  .item-stagger > *:nth-child(4) { animation-delay: 0.16s; }
  .item-stagger > *:nth-child(5) { animation-delay: 0.20s; }
  .login-modal      { animation: modalPopIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-fade-in  { animation: fadeIn 0.3s ease-out forwards; }
  .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
  .login-head       { background: linear-gradient(100deg, #0B6E63 0%, #1B9084 45%, #2AA396 70%, #0F7A6F 100%); }
`;

export default Header;