import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { IMAGES } from "../constants/images";

const services = [
  {
    title: "Periodontics",
    slug: "periodontics",
    image: IMAGES.services.periodontics,
  },
  {
    title: "Root Canal Treatment",
    slug: "root-canal",
    image: IMAGES.services.rootCanal,
  },
  {
    title: "Crowns & Bridges",
    slug: "crowns-bridges",
    image: IMAGES.services.crowns,
  },
  {
    title: "Restorative Dentistry",
    slug: "restorative-dentistry",
    image: IMAGES.services.restorativeDentistry,
  },
  {
    title: "Orthodontic Treatment",
    slug: "orthodontic-treatment",
    image: IMAGES.services.orthodonticTreatment,
  },
  {
    title: "Paediatric Dentistry",
    slug: "paediatric-dentistry",
    image: IMAGES.services.paediatricDentistry,
  },
  {
    title: "Dental Implants",
    slug: "dental-implants",
    image: IMAGES.services.implants,
  },
  {
    title: "Laser Gum Treatment",
    slug: "laser-gum-treatment",
    image: IMAGES.services.laserGumTreatment,
  },
  {
    title: "Clear Aligners",
    slug: "clear-aligners",
    image: IMAGES.services.clearAligners,
  },
  {
    title: "Smile Design",
    slug: "smile-design",
    image: IMAGES.services.smileDesign,
  },
  {
    title: "Wisdom Tooth Extraction",
    slug: "wisdom-tooth",
    image: IMAGES.services.wisdomTooth,
  },
];

export function Services() {
  return (
    <div>
      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-dental-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container-page py-8 md:py-12 px-4 sm:px-0">
          <Reveal delay={0.1}>
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-2xl sm:text-3xl font-black text-white md:text-4xl lg:text-5xl">
              Our Services
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">
              We offer a wide range of dental treatments to keep your smile healthy and beautiful.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page py-8 sm:py-12 md:py-16 px-4 sm:px-0">
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.05} direction="up" width="100%">
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative block rounded-3xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Arrow button */}
                  <div className="absolute -right-2 -top-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-white shadow-lg transition duration-300 group-hover:bg-brand-600 group-hover:scale-110">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>

                  {/* Circular image */}
                  <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-full border-4 border-slate-50 shadow-md">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-center text-base font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                    {service.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
