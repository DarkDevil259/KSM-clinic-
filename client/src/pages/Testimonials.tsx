import { Quote, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

const testimonials = [
  {
    name: "Aditi S.",
    text: "Very clean clinic and super gentle cleaning. Booking was quick and they confirmed fast!",
    rating: 5,
  },
  {
    name: "Rahul K.",
    text: "Root canal was explained clearly and the procedure was comfortable. Great experience.",
    rating: 5,
  },
  {
    name: "Meera P.",
    text: "Loved the whitening results. The team was friendly and professional.",
    rating: 5,
  },
  {
    name: "Sanjay M.",
    text: "Transparent pricing and no pressure. Highly recommend for family dental care.",
    rating: 5,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={[
            "h-4 w-4",
            i < n ? "fill-brand-500 text-brand-500" : "text-slate-200",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <div>
      {/* Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-500">
        <div className="container-page py-8 md:py-12">
          <Reveal delay={0.1}>
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
              Testimonials
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-2 max-w-xl text-base text-white/90">
              Reviews that reflect real care.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="container-page py-12 md:py-16">
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => {
              const initials = t.name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((p) => p[0]?.toUpperCase())
                .join("");

              return (
                <Reveal key={t.name} delay={i * 0.1} width="100%">
                  <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl">
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-brand-100 opacity-60 blur-2xl transition duration-500 group-hover:bg-brand-200" />
                    <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-dental-100 opacity-60 blur-2xl transition duration-500 group-hover:bg-dental-200" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-sm font-black text-white">
                            {initials || "★"}
                          </div>
                          <div>
                            <div className="text-sm font-extrabold text-navy-900">{t.name}</div>
                            <Stars n={t.rating} />
                          </div>
                        </div>
                        <Quote className="h-5 w-5 text-brand-300" />
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-slate-700">
                        "{t.text}"
                      </p>

                      <div className="mt-4 border-t border-slate-100 pt-3">
                        <div className="text-xs font-semibold text-slate-500">
                          Verified patient feedback
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


