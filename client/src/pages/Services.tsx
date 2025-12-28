import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

const services = [
  {
    title: "Teeth Cleaning",
    slug: "teeth-cleaning",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80",
  },
  {
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80",
  },
  {
    title: "Root Canal Treatment",
    slug: "root-canal",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80",
  },
  {
    title: "Braces & Aligners",
    slug: "braces-aligners",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=80",
  },
  {
    title: "Crowns & Bridges",
    slug: "crowns-bridges",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80",
  },
  {
    title: "Dental Implants",
    slug: "dental-implants",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80",
  },
  {
    title: "Wisdom Tooth Extraction",
    slug: "wisdom-tooth",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80",
  },
  {
    title: "Smile Design",
    slug: "smile-design",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
  },
];

export function Services() {
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
              Our Services
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-2 max-w-xl text-base text-white/90">
              We offer a wide range of dental treatments to keep your smile healthy and beautiful.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page py-12 md:py-16">
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.05} direction="up" width="100%">
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative block rounded-3xl border border-slate-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
