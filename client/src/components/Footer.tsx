import { Link } from "react-router-dom";
import { CLINIC } from "../constants/clinic";
import { IMAGES } from "../constants/images";
import { Mail, Phone, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    const currentYear = 2026;

    const socialLinks = [
        { icon: Facebook, href: "https://www.facebook.com/share/17ned7ZF52/", label: "Facebook", color: "hover:text-blue-600" },
        { icon: Instagram, href: "https://www.instagram.com/ksmdentalcare26?utm_source=qr&igsh=aG5reXBraGQzdWRt", label: "Instagram", color: "hover:text-pink-600" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/umayal-mohan-a01576a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn", color: "hover:text-blue-700" },
    ];

    return (
        <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white text-xs md:text-sm">
            <div className="container-page py-3 md:py-5">
                {/* Main Footer Content */}
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    {/* Clinic Info */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-2 group">
                            <div className="h-12 w-12 md:h-14 md:w-14 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                <img src={IMAGES.logo} alt="KSM Dental Clinic" className="h-full w-full object-contain" />
                            </div>
                            <div className="leading-tight">
                                <div className="text-sm md:text-base font-extrabold text-navy-900 transition-colors group-hover:text-brand-600">{CLINIC.name}</div>
                                <div className="text-xs font-medium text-slate-500">Dental Clinic</div>
                            </div>
                        </Link>
                        <p className="mt-1.5 max-w-sm text-xs leading-normal text-slate-600 md:text-sm">
                            Clean, modern dentistry with a gentle approach.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-3 space-y-2 text-sm font-medium">
                            <a
                                className="flex items-center gap-3 text-slate-700 transition hover:text-brand-600"
                                href={`tel:${CLINIC.phoneTel}`}
                            >
                                <Phone className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-brand-500" />
                                <span className="text-sm md:text-base">{CLINIC.phoneDisplay}</span>
                            </a>
                            <a
                                className="flex items-center gap-3 text-slate-700 transition hover:text-brand-600"
                                href={`mailto:${CLINIC.ownerEmail}`}
                            >
                                <Mail className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-brand-500" />
                                <span className="text-sm md:text-base">{CLINIC.ownerEmail}</span>
                            </a>
                        </div>

                        {/* Social Media Icons */}
                        <div className="mt-4 flex items-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-brand-300 hover:bg-brand-50 ${social.color} shadow-sm hover:shadow-md hover:-translate-y-0.5`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                            Quick Links
                        </div>
                        <nav className="space-y-1 text-xs md:text-sm">
                            <Link className="block text-slate-600 transition hover:text-navy-900 hover:translate-x-1" to="/">Home</Link>
                            <Link className="block text-slate-600 transition hover:text-navy-900 hover:translate-x-1" to="/about">About Us</Link>
                            <Link className="block text-slate-600 transition hover:text-navy-900 hover:translate-x-1" to="/services">Services</Link>
                            <Link className="block text-slate-600 transition hover:text-navy-900 hover:translate-x-1" to="/testimonials">Testimonials</Link>
                            <Link className="block text-slate-600 transition hover:text-navy-900 hover:translate-x-1" to="/gallery">Gallery</Link>
                            <Link className="block text-slate-600 transition hover:text-navy-900 hover:translate-x-1" to="/contact">Contact</Link>
                            <Link className="block font-semibold text-dental-600 transition hover:text-dental-700 hover:translate-x-1" to="/appointment">Book Appointment</Link>
                        </nav>
                    </div>

                    {/* Hours */}
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                            Opening Hours
                        </div>
                        <div className="space-y-1 text-xs md:text-sm">
                            {CLINIC.hours.map((h) => (
                                <div key={h.label} className="flex items-start gap-2">
                                    <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-dental-600" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-slate-700">{h.label}</div>
                                        <div className="text-slate-500">{h.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-4 border-t border-slate-200 pt-3">
                    <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                        <div className="text-center text-xs text-slate-500 md:text-left">
                            <p>
                                © {currentYear} <span className="font-semibold text-navy-900">{CLINIC.name}</span>. All rights reserved.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
                            <Link to="/" className="transition hover:text-navy-900">Privacy Policy</Link>
                            <Link to="/" className="transition hover:text-navy-900">Terms</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
