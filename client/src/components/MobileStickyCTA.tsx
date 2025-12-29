import { Link } from "react-router-dom";
import { Calendar, Phone } from "lucide-react";
import { CLINIC } from "../constants/clinic";

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="container-page py-3">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`tel:${CLINIC.phoneTel}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-navy-900"
          >
            <Phone className="h-4 w-4 text-dental-600" />
            Call Now
          </a>
          <Link
            to="/appointment"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3 text-sm font-bold text-white shadow-soft"
          >
            <Calendar className="h-4 w-4" />
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}



