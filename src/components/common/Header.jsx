import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Home, Building2, TrendingUp, Landmark, Settings, Info, Mail,
  LogIn, UserPlus, Menu, X, ChevronDown, Star, ArrowLeft, Shield,
  Building, HardHat, Paintbrush, Sparkles, Droplets, User,
  Mail as MailIcon, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, Phone, MapPin
} from "lucide-react";

// TODO: set this to your real logo path (e.g. import logo from "../assets/logo.png")
const LOGO_SRC = "/logo.png";
const EMPTY_FORM = { email: "", mobile: "", password: "", name: "", company: "", city: "", otp: "", newPassword: "", confirmPassword: "" };

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [customerPortalOpen, setCustomerPortalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ---------- LOGIN MODAL STATE ----------
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState(null); // null | "customer" | "vendor" | "forgot"
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [loginMethod, setLoginMethod] = useState("email"); // "email" | "mobile"
  const [forgotStep, setForgotStep] = useState("request"); // "request" | "verify" | "done"
  const [forgotFrom, setForgotFrom] = useState("customer");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);

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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    navigate(path);
  };

  // ---------- LOGIN MODAL HANDLERS ----------
  const openLoginModal = () => {
    setAuthMode("login");
    setLoginModalOpen(true);
    setLoginRole(null);
    setLoginMethod("email");
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
    const basePath = loginRole === "vendor" ? "/vendor/dashboard" : "/customer/dashboard";
    // TODO: call your auth API here
    console.log(`Login as ${loginRole}:`, formData);
    closeLoginModal();
    navigate(basePath);
  };

  const customerPortalServices = [
    { name: "Construction Services", path: "/customer-portal/construction", icon: HardHat },
    { name: "Interior Services", path: "/customer-portal/interior", icon: Building2 },
    { name: "Painting Services", path: "/customer-portal/painting", icon: Paintbrush },
    { name: "Cleaning Services", path: "/customer-portal/cleaning", icon: Sparkles },
    { name: "Plumbing Services", path: "/customer-portal/plumbing", icon: Droplets },
  ];

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Customer Portal", path: "/customer-portal", icon: Building2, dropdown: true, isCustomerPortal: true },
    { name: "Post Your Services", path: "/post-services", icon: TrendingUp, dropdown: true },
    { name: "Our Services", path: "/services", icon: Settings },
    { name: "Loan & Insurance", path: "/loan-insurance", icon: Landmark, dropdown: true },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Contact Us", path: "/contact", icon: Mail },
  ];

  const navLinkClass = ({ isActive }) =>
    `group relative flex items-center gap-2 xl:gap-2.5 whitespace-nowrap px-4 xl:px-5 py-4 text-[17px] xl:text-[18px] font-bold tracking-wide transition-all duration-200
    ${
      isActive
        ? "border-b-[4px] border-yellow-400 bg-black/10 text-white"
        : "border-b-[4px] border-transparent text-white hover:bg-black/10 hover:border-yellow-400"
    }`;

  const openCustomerPortal = () => {
    if (customerPortalTimeout.current) clearTimeout(customerPortalTimeout.current);
    setCustomerPortalOpen(true);
  };

  const closeCustomerPortal = () => {
    customerPortalTimeout.current = setTimeout(() => {
      setCustomerPortalOpen(false);
    }, 150);
  };

  // ---------- SHARED LOGIN PIECES ----------
  const inputClass =
    "w-full rounded-2xl border-2 border-[#CDEBE2] bg-[#F3FAF7] py-4 pl-12 pr-4 text-[20px] text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#2AA396] focus:bg-white focus:ring-4 focus:ring-[#2AA396]/15";
  const labelClass = "mb-2 block text-[18px] font-bold tracking-wide text-gray-700";
  const primaryBtnClass =
    "mt-1 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#0B6E63] to-[#2AA396] py-4 text-[20px] font-bold tracking-wide text-white shadow-[0_10px_24px_rgba(15,111,100,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,111,100,0.45)] active:translate-y-0";

  const renderModalHeader = (title, subtitle) => (
    <div className="login-head flex items-center justify-between px-6 py-6 sm:px-8">
      <div className="flex items-center gap-4">
        <div className="flex h-[66px] w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/80 bg-[#1B8577] shadow-md">
          <img src={LOGO_SRC} alt="Eliteinova" className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="text-[30px] font-bold leading-tight tracking-tight text-white">{title}</h2>
          <p className="mt-0.5 text-[17px] tracking-wide text-teal-50">{subtitle}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={closeLoginModal}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition hover:rotate-90 hover:bg-white/30"
      >
        <X size={22} />
      </button>
    </div>
  );

  const renderMethodTabs = () => (
    <div className="mb-5 flex rounded-2xl bg-[#F1F8F4] p-1.5">
      {[
        { key: "email", label: "Email" },
        { key: "mobile", label: "Mobile Number" },
      ].map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => setLoginMethod(t.key)}
          className={`flex-1 rounded-xl py-3 text-[18px] font-bold tracking-wide transition-all ${
            loginMethod === t.key ? "bg-white text-[#0F6F64] shadow-md" : "text-gray-500 hover:text-gray-700"
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
          <MailIcon size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
        ) : (
          <UserPlus size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
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
        <Lock size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
        <input
          type={showPassword ? "text" : "password"}
          required
          value={formData[key]}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          placeholder={placeholder}
          className={`${inputClass} pr-12`}
        />
        {withEye && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#2AA396]"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        )}
      </div>
    </div>
  );

  // ---------- LOGIN FORM (Customer + Vendor) ----------
  const renderLoginForm = ({ title, subtitle, emailPlaceholder, submitLabel, footerText, footerLink }) => (
    <div className="animate-slide-up">
      {renderModalHeader(title, subtitle)}

      <div className="px-6 pb-8 pt-6 sm:px-8">
        {renderMethodTabs()}

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
          {renderIdentifierField(emailPlaceholder)}
          {renderPasswordField("Password", "password", "Enter your password")}

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-[17px]">
            <label className="flex cursor-pointer items-center gap-2.5 tracking-wide text-gray-600">
              <input type="checkbox" className="h-5 w-5 rounded border-gray-300 accent-[#0F6F64]" />
              Remember me
            </label>
            <button type="button" onClick={openForgot} className="font-bold tracking-wide text-[#1FA091] hover:underline">
              Forgot password?
            </button>
          </div>

          <button type="submit" className={primaryBtnClass}>
            {submitLabel} <ArrowRight size={22} />
          </button>
        </form>

        <p className="mt-6 text-center text-[17px] tracking-wide text-gray-500">
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
        <Icon size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
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
          isVendor ? "Create your account to post properties" : "Create your account to find properties"
        )}

        <div className="px-6 pb-8 pt-6 sm:px-8">
                    <form onSubmit={handleRegisterSubmit} className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
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

            {formError && <p className="text-[16px] font-semibold text-red-600 sm:col-span-2">{formError}</p>}

            <label className="flex cursor-pointer items-center gap-2.5 text-[17px] tracking-wide text-gray-600 sm:col-span-2">
              <input type="checkbox" required className="h-5 w-5 rounded border-gray-300 accent-[#0F6F64]" />
              I agree to the Terms &amp; Conditions
            </label>

            <button type="submit" className={`${primaryBtnClass} sm:col-span-2`}>
              {isVendor ? "Register as Vendor" : "Create Account"} <ArrowRight size={22} />
            </button>
          </form>

          <p className="mt-6 text-center text-[17px] tracking-wide text-gray-500">
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

        <div className="px-6 pb-8 pt-6 sm:px-8">
          {forgotStep === "request" && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
              {renderMethodTabs()}
              {renderIdentifierField("your@email.com")}
              <button type="submit" className={primaryBtnClass}>
                Send OTP <ArrowRight size={22} />
              </button>
            </form>
          )}

          {forgotStep === "verify" && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
              <div>
                <label className={labelClass}>Enter OTP</label>
                <div className="relative">
                  <Shield size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2AA396]" />
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

              {formError && <p className="text-[16px] font-semibold text-red-600">{formError}</p>}

              <button type="submit" className={primaryBtnClass}>
                Reset Password <ArrowRight size={22} />
              </button>

              <button
                type="button"
                onClick={handleSendOtp}
                className="text-center text-[17px] font-bold text-[#1FA091] hover:underline"
              >
                Resend OTP
              </button>
            </form>
          )}

          {forgotStep === "done" && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <CheckCircle2 size={64} className="text-[#2AA396]" strokeWidth={1.8} />
              <p className="text-[18px] text-gray-600">Your password has been changed successfully.</p>
              <button type="button" onClick={backToLogin} className={primaryBtnClass}>
                Back to Login <ArrowRight size={22} />
              </button>
            </div>
          )}

          {forgotStep !== "done" && (
            <button
              type="button"
              onClick={backToLogin}
              className="mt-6 flex w-full items-center justify-center gap-2 text-[17px] font-bold text-gray-500 transition hover:text-[#1FA091]"
            >
              <ArrowLeft size={20} /> Back to Login
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
        className={`w-full font-sans shadow-md relative z-50 transition-all duration-300 ${
          scrolled ? "shadow-xl" : ""
        }`}
      >
        {/* TOP BRAND HEADER */}
        <div className="relative bg-gradient-to-r from-[#1B8577] via-[#289287] to-[#1B8577] bg-[length:200%_auto]">
          <div className="mx-auto flex min-h-[90px] md:min-h-[100px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
            {/* LOGO AND BRAND TEXT */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-5">
              <Link to="/" className="shrink-0 group">
                <div className="animate-logo flex h-[65px] w-[65px] sm:h-[75px] sm:w-[75px] lg:h-[80px] lg:w-[80px] items-center justify-center rounded-full border-[3px] border-[#D9B44A] bg-[#1B8577] shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
                  <span className="text-[10px] font-bold text-white text-center leading-tight tracking-tight">
                    Eliteinova<br />Logo
                  </span>
                </div>
              </Link>

              <div className="flex flex-col justify-center -mt-1 sm:-mt-1.5 pt-2">
                <h1 className="whitespace-nowrap leading-none text-[#F4F4E8] pt-1 sm:pt-2" style={{ fontFamily: "'Pacifico', cursive" }}>
                  <span className="text-[23px] sm:text-[36px] md:text-[30px] lg:text-[38px] tracking-wide">Eliteinova Properties</span>
                  <span className="text-[20px] sm:text-[28px] md:text-[28px] lg:text-[30px] ml-2 sm:ml-3 tracking-wide">Services</span>
                </h1>

                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pl-1 mt-1 sm:mt-1.5">
                  <span className="text-[16px] sm:text-[19px] lg:text-[21px] text-[#eaecdf] tracking-wide" style={{ fontFamily: "'Pacifico', cursive" }}>
                    No Brokerage
                  </span>
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#4C9F93] bg-[#0F766E] px-2 sm:px-2.5 py-0.5 sm:py-1 shadow-sm transition-all duration-300 hover:bg-[#0d655e] hover:scale-105">
                    <Star size={12} className="animate-star sm:w-[14px] sm:h-[14px] fill-[#FACC15] text-[#FACC15]" />
                    <span className="text-[11px] sm:text-[13px] text-[#F4F4E8] mt-0.5 pr-1 tracking-wide" style={{ fontFamily: "'Pacifico', cursive" }}>
                      Trusted
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE BUTTONS */}
            <div className="flex shrink-0 items-center gap-2.5 sm:gap-3 md:gap-3.5">
              <button
                type="button"
                onClick={goToProperties}
                className="hidden sm:inline-flex items-center justify-center gap-2 rounded-lg border border-[#66b9b0] bg-[#3d8a80] px-4 sm:px-5 py-2.5 sm:py-3 text-[14px] sm:text-[16px] font-bold text-white transition-all duration-300 hover:bg-[#156b60] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 min-w-[140px] group tracking-wide"
              >
                <ArrowLeft size={18} className="sm:w-[20px] sm:h-[20px] transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Back to Properties</span>
              </button>

              {/* LOGIN BUTTON */}
              <button
                type="button"
                onClick={openLoginModal}
                className="hidden sm:inline-flex items-center justify-center gap-2 rounded-lg border border-[#66b9b0] bg-[#4c978d] px-5 py-2.5 sm:py-3 text-[15px] sm:text-[17px] font-bold text-white transition-all duration-300 hover:bg-[#156b60] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 min-w-[118px] group tracking-wide"
              >
                <LogIn size={18} className="sm:w-[20px] sm:h-[20px] transition-transform duration-300 group-hover:translate-x-0.5" />
                <span>Login</span>
              </button>

              <button
                type="button"
                onClick={openRegisterModal}
                className="hidden sm:inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FDE047] to-[#F59E0B] px-5 py-2.5 sm:py-3 text-[15px] sm:text-[17px] font-bold text-[#3d9178] shadow-sm transition-all duration-300 hover:from-[#FCD34D] hover:to-[#D97706] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 min-w-[125px] group tracking-wide"
              >
                <UserPlus size={18} className="sm:w-[20px] sm:h-[20px] transition-transform duration-300 group-hover:scale-110" />
                <span>Register</span>
              </button>

              {/* HAMBURGER BUTTON */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#3A9D91] bg-transparent text-white transition-all duration-300 hover:bg-[#156b60] hover:rotate-90 ml-1"
                >
                  {menuOpen ? <X size={22} className="sm:w-[24px] sm:h-[24px]" /> : <Menu size={22} className="sm:w-[24px] sm:h-[24px]" />}
                </button>

                {menuOpen && (
                  <div className="animate-dropdown absolute top-[120%] right-0 mt-2 w-[200px] sm:w-[250px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden z-50 border border-gray-100">
                    <div className="px-5 pt-5 pb-3">
                      <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">
                        STAFF ACCESS
                      </p>
                    </div>

                    <div className="px-3 pb-4 flex flex-col gap-1.5">
                      <button
                        onClick={() => handleNavigation("/admin")}
                        className="group flex w-full items-center gap-4 rounded-xl p-2 transition-all duration-200 hover:bg-gray-50 hover:translate-x-1"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E6F2F0] transition-all duration-200 group-hover:bg-[#d8ebe8] group-hover:rotate-6">
                          <Shield className="text-[#1B8577]" size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-[18px] font-bold text-[#0f3d38] transition-colors duration-200 group-hover:text-[#1B8577] tracking-tight">
                          Admin Panel
                        </span>
                      </button>

                      <button
                        onClick={() => handleNavigation("/office")}
                        className="group flex w-full items-center gap-4 rounded-xl p-2 transition-all duration-200 hover:bg-[#F4F7F6] hover:translate-x-1"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E6F2F0] transition-all duration-200 group-hover:bg-[#d8ebe8] group-hover:rotate-6">
                          <Building className="text-[#1B8577]" size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-[18px] font-bold text-[#0f3d38] transition-colors duration-200 group-hover:text-[#1B8577] tracking-tight">
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
          <div className="mx-auto flex flex-wrap items-center justify-start xl:justify-between px-2 xl:px-8">
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
                      onClick={() => setCustomerPortalOpen(false)}
                    >
                      <Icon size={18} className="xl:w-[20px] xl:h-[20px] transition-transform duration-300 group-hover:scale-110" strokeWidth={2.2} />
                      <span>{item.name}</span>
                      <ChevronDown
                        size={16}
                        className={`xl:w-[18px] xl:h-[18px] ml-0.5 transition-transform duration-300 ${
                          customerPortalOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2.5}
                      />
                    </NavLink>

                    {customerPortalOpen && (
                      <div className="animate-dropdown absolute top-full left-0 mt-2 w-[280px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] overflow-hidden z-50 border border-gray-100">
                        <div className="px-4 pt-4 pb-2">
                          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                            OUR SERVICES
                          </p>
                        </div>

                        <div className="item-stagger px-2 pb-3 flex flex-col gap-1">
                          {customerPortalServices.map((service) => {
                            const ServiceIcon = service.icon;
                            return (
                              <button
                                key={service.name}
                                onClick={() => handleNavigation(service.path)}
                                className="group flex w-full items-center gap-3 rounded-xl px-2 py-2 transition-all duration-200 hover:bg-[#E6F2F0] hover:translate-x-1"
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E6F2F0] transition-all duration-300 group-hover:bg-[#1B8577] group-hover:rotate-6 group-hover:scale-110">
                                  <ServiceIcon
                                    className="text-[#1B8577] group-hover:text-white transition-colors duration-200"
                                    size={17}
                                    strokeWidth={2.3}
                                  />
                                </div>
                                <span className="text-[15px] font-semibold text-[#0f3d38] transition-colors duration-200 group-hover:text-[#1B8577] tracking-tight">
                                  {service.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink key={item.name} to={item.path} className={navLinkClass}>
                  <Icon size={18} className="xl:w-[20px] xl:h-[20px] transition-transform duration-300 group-hover:scale-110" strokeWidth={2.2} />
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown size={16} className="xl:w-[18px] xl:h-[18px] ml-0.5 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.5} />}
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
          {/* Narrower width: 440px for forms, 480px for role selection */}
          <div
            ref={modalRef}
            className={`login-modal relative w-full max-h-[92vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl ${
            loginRole === null ? "max-w-[580px]" : authMode === "register" ? "max-w-[680px]" : "max-w-[540px]"
            }`}
          >
            {/* STEP 1: ROLE SELECTION */}
            {loginRole === null && (
              <div className="p-7 sm:p-8 animate-fade-in">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5 text-[#1B8577]">
                    {authMode === "register" ? <UserPlus size={24} strokeWidth={2.5} /> : <LogIn size={24} strokeWidth={2.5} />}
                    <h2 className="text-[24px] font-extrabold tracking-tight">
                      {authMode === "register" ? "Register as" : "Login as"}
                    </h2>
                  </div>
                  <button onClick={closeLoginModal} className="text-gray-400 hover:text-gray-700 transition-colors">
                    <X size={24} strokeWidth={2.5} />
                  </button>
                </div>
                <p className="text-[17px] text-gray-500 mb-7 font-medium tracking-wide">Choose your role to continue</p>

                <div className="grid grid-cols-2 gap-4">
                  {/* Customer Card */}
                  <button
                    type="button"
                    onClick={() => setLoginRole("customer")}
                    className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-[3px] border-[#9eb8ec] bg-[#F3F7FF] py-7 px-3 text-center transition-all duration-300 hover:border-[#0a5adb] hover:bg-[#EBF2FF] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E2E9FE] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <User size={26} className="text-[#1E3A8A]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[21px] font-bold text-[#1E3A8A] mt-1 tracking-tight">Customer</p>
                      <p className="text-[15px] text-gray-600 mt-1 tracking-wide">Looking for properties</p>
                    </div>
                  </button>

                  {/* Vendor Card */}
                  <button
                    type="button"
                    onClick={() => setLoginRole("vendor")}
                    className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-[3px] border-[#99e4d3] bg-[#F2FBF4] py-7 px-3 text-center transition-all duration-300 hover:border-[#47c2ad] hover:bg-[#E8F7EB] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DCFCE7] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Building size={26} className="text-[#166534]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[21px] font-bold text-[#166534] mt-1 tracking-tight">Vendor</p>
                      <p className="text-[15px] text-gray-600 mt-1 tracking-wide">Sell or rent properties</p>
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
                subtitle: "Post and manage your properties",
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