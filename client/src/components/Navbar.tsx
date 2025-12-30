import { NavLink, Link } from "react-router-dom";
import { CLINIC } from "../constants/clinic";
import { IMAGES } from "../constants/images";
import { Menu, X, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "relative px-4 py-2.5 text-sm font-semibold transition-all duration-300 group",
          isActive
            ? "text-brand-600"
            : "text-slate-600 hover:text-brand-600",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {/* Animated underline */}
          <span
            className={`absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-brand-500 to-dental-500 transition-all duration-300 ease-out ${isActive
              ? "w-3/4 -translate-x-1/2"
              : "w-0 -translate-x-1/2 group-hover:w-3/4"
              }`}
          />
        </>
      )}
    </NavLink>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-900/5 border-b border-slate-100"
        : "bg-white/70 backdrop-blur-md border-b border-transparent"
        }`}
    >
      {/* Gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 via-dental-500 to-brand-500 opacity-80" />

      <div className="container-page">
        <div className="flex h-20 items-center justify-between">
          {/* Logo with premium hover effect */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-100/50 to-dental-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative h-16 w-16 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <img src={IMAGES.logo} alt="KSM Dental Clinic" className="h-full w-full object-contain drop-shadow-md" />
            </div>
            <div className="relative leading-tight">
              <div className="text-base font-extrabold bg-gradient-to-r from-navy-900 to-navy-700 bg-clip-text text-transparent transition-all group-hover:from-brand-600 group-hover:to-dental-600">
                {CLINIC.name}
              </div>
              <div className="text-xs font-medium text-slate-500 tracking-wide uppercase">
                Dental Clinic
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <NavItem key={n.to} to={n.to} label={n.label} />
            ))}
          </nav>

          {/* CTA Section */}
          <div className="hidden items-center gap-5 lg:flex">
            {/* Premium Book Appointment Button with glow */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-dental-500 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
              <Link
                to="/appointment"
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-dental-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5"
              >
                Book Appointment
              </Link>
            </div>

            {/* Divider with gradient */}
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />

            {/* Hours with enhanced styling */}
            <div className="flex items-center gap-3 text-sm group cursor-default bg-slate-50/80 rounded-xl px-4 py-2.5 border border-slate-100 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                <Clock className="relative h-4 w-4 text-brand-600 transition-transform group-hover:rotate-[360deg] duration-1000" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-navy-900">{CLINIC.hours[0]?.label}</div>
                <div className="text-xs text-slate-500">{CLINIC.hours[0]?.value}</div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`relative inline-flex items-center justify-center rounded-xl p-2.5 lg:hidden transition-all duration-300 ${open
              ? "bg-brand-100 text-brand-600 border border-brand-200"
              : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200"
              }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="relative h-5 w-5">
              <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
              <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu with staggered animations */}
        <div
          className={`absolute left-0 right-0 top-full z-50 overflow-hidden lg:hidden transition-all duration-500 ease-out ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="border-t border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
            <div className="container-page py-4">
              <div className="grid gap-1">
                {nav.map((n, i) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${isActive
                        ? "bg-gradient-to-r from-brand-50 to-dental-50 text-brand-600 border border-brand-100"
                        : "text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                      }`
                    }
                    style={{
                      transitionDelay: open ? `${i * 50}ms` : "0ms",
                      transform: open ? "translateX(0)" : "translateX(-10px)",
                      opacity: open ? 1 : 0,
                    }}
                  >
                    {n.label}
                  </NavLink>
                ))}

                {/* Mobile CTA Section */}
                <div
                  className="mt-3 rounded-2xl bg-gradient-to-r from-brand-50 via-dental-50 to-brand-50 p-4 border border-brand-100"
                  style={{
                    transitionDelay: open ? `${nav.length * 50}ms` : "0ms",
                    transform: open ? "translateY(0)" : "translateY(10px)",
                    opacity: open ? 1 : 0,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-10 w-10 rounded-xl bg-white/80 border border-brand-100 grid place-items-center shadow-sm">
                        <Clock className="h-4 w-4 text-brand-600" />
                      </div>
                      <div>
                        <div className="font-bold text-navy-900">{CLINIC.hours[0]?.label}</div>
                        <div className="text-xs text-slate-500">{CLINIC.hours[0]?.value}</div>
                      </div>
                    </div>
                    <Link
                      to="/appointment"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-xl transition-all duration-300"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {open && (
        <div
          className="fixed inset-0 top-20 bg-navy-900/20 backdrop-blur-sm lg:hidden -z-10"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}


