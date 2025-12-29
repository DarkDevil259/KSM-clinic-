import { Link } from "react-router-dom";
import { CLINIC } from "../constants/clinic";
import { IMAGES } from "../constants/images";
import { Mail, MapPin, Phone, Clock, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
  ];

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="container-page py-6 md:py-8">
        {/* Main Footer Content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Clinic Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="h-16 w-16 transition-transform group-hover:scale-110 group-hover:rotate-3">
                <img src={IMAGES.logo} alt="KSM Dental Clinic" className="h-full w-full object-contain" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-navy-900 transition-colors group-hover:text-brand-600">{CLINIC.name}</div>
                <div className="text-xs font-medium text-slate-500">Dental Clinic</div>
              </div>
            </Link>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-600">
              Clean, modern dentistry with a gentle approach. We're committed to providing exceptional dental care and helping you achieve a healthy, beautiful smile.
            </p>

            {/* Contact Info */}
            <div className="mt-3 space-y-1.5 text-xs">
              <a
                className="flex items-start gap-3 text-slate-700 transition hover:text-brand-600"
                href={`tel:${CLINIC.phoneTel}`}
              >
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                <span>{CLINIC.phoneDisplay}</span>
              </a>
              <a
                className="flex items-start gap-3 text-slate-700 transition hover:text-brand-600"
                href={`mailto:${CLINIC.ownerEmail}`}
              >
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                <span>{CLINIC.ownerEmail}</span>
              </a>
              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                <div>
                  {CLINIC.addressLines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Follow Us
              </div>
              <div className="flex items-center gap-1.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-brand-300 hover:bg-brand-50 ${social.color} shadow-sm hover:shadow-md hover:-translate-y-0.5`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
              Quick Links
            </div>
            <nav className="space-y-1.5">
              <Link
                className="block text-xs text-slate-600 transition hover:text-navy-900 hover:translate-x-1"
                to="/"
              >
                Home
              </Link>
              <Link
                className="block text-xs text-slate-600 transition hover:text-navy-900 hover:translate-x-1"
                to="/about"
              >
                About Us
              </Link>
              <Link
                className="block text-xs text-slate-600 transition hover:text-navy-900 hover:translate-x-1"
                to="/services"
              >
                Services
              </Link>
              <Link
                className="block text-xs text-slate-600 transition hover:text-navy-900 hover:translate-x-1"
                to="/testimonials"
              >
                Testimonials
              </Link>
              <Link
                className="block text-xs text-slate-600 transition hover:text-navy-900 hover:translate-x-1"
                to="/gallery"
              >
                Gallery
              </Link>
              <Link
                className="block text-xs text-slate-600 transition hover:text-navy-900 hover:translate-x-1"
                to="/contact"
              >
                Contact
              </Link>
              <Link
                className="block text-xs font-semibold text-dental-600 transition hover:text-dental-700 hover:translate-x-1"
                to="/appointment"
              >
                Book Appointment
              </Link>
            </nav>
          </div>

          {/* Hours */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
              Opening Hours
            </div>
            <div className="space-y-1.5">
              {CLINIC.hours.map((h) => (
                <div key={h.label} className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-dental-600" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-700">{h.label}</div>
                    <div className="text-xs text-slate-500">{h.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 border-t border-slate-200 pt-4">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="text-center text-xs text-slate-600 md:text-left">
              <p>
                © {currentYear} <span className="font-semibold text-navy-900">{CLINIC.name}</span>. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              <Link to="/" className="transition hover:text-navy-900">
                Privacy Policy
              </Link>
              <Link to="/" className="transition hover:text-navy-900">
                Terms of Service
              </Link>
              <Link to="/" className="transition hover:text-navy-900">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


