import { NavLink, Link } from "react-router-dom";
import { Button } from "./Button";
import { CLINIC } from "../constants/clinic";
import { IMAGES } from "../constants/images";
import { Menu, Clock } from "lucide-react";
import { useState } from "react";

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
          "rounded-lg px-4 py-2.5 text-sm font-semibold transition",
          isActive ? "text-navy-900 bg-slate-50" : "text-slate-600 hover:text-navy-900 hover:bg-slate-50",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="container-page">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-20 w-20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <img src={IMAGES.logo} alt="KSM Dental Clinic" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-extrabold text-navy-900 transition-colors group-hover:text-brand-600">{CLINIC.name}</div>
              <div className="text-sm font-medium text-slate-500">Dental Clinic</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <NavItem key={n.to} to={n.to} label={n.label} />
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Button to="/appointment" variant="primary" className="animate-fade-in-up">
              Book Appointment
            </Button>
            <div className="h-10 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-sm group cursor-default">
              <Clock className="h-4 w-4 text-brand-600 transition-transform group-hover:rotate-180 duration-700" />
              <div className="leading-tight">
                <div className="font-semibold text-navy-900">{CLINIC.hours[0]?.label}</div>
                <div className="text-xs text-slate-500">{CLINIC.hours[0]?.value}</div>
              </div>
            </div>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden hover:bg-slate-50 active:scale-95 transition-all"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-full border-t border-slate-100 bg-white/95 backdrop-blur-md shadow-xl lg:hidden animate-slide-down">
            <div className="container-page py-4">
              <div className="grid gap-1">
                {nav.map((n) => (
                  <NavItem
                    key={n.to}
                    to={n.to}
                    label={n.label}
                    onClick={() => setOpen(false)}
                  />
                ))}
                <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-brand-50 p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-brand-600" />
                    <div>
                      <div className="font-semibold text-navy-900">{CLINIC.hours[0]?.label}</div>
                      <div className="text-xs text-slate-500">{CLINIC.hours[0]?.value}</div>
                    </div>
                  </div>
                  <Button to="/appointment" size="sm" onClick={() => setOpen(false)}>
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


