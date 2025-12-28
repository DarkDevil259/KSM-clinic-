import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CLINIC } from "../constants/clinic";
import { Reveal } from "../components/Reveal";

export function About() {
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
              About Us
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-2 max-w-xl text-base text-white/90">
              Dedicated professionals committed to your smile
            </p>
          </Reveal>
        </div>
      </div>

      {/* Doctor About Section */}
      <section className="bg-white">
        <div className="container-page py-12 md:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div>
              <Reveal delay={0.2} width="100%">
                <p className="text-lg leading-relaxed text-slate-700">
                  The Director of {CLINIC.name}, a Dental Implantologist and Periodontist has finished his Bachelor's degree in Dentistry and has obtained advanced certifications in modern dental procedures. With more than a decade of experience in the dental field, he pioneers in most advanced dental treatments such as Dental Implants, LASER assisted dental treatments, full mouth rehabilitation, crown and bridges, etc.
                </p>
              </Reveal>
              <Reveal delay={0.3} width="100%">
                <p className="mt-5 text-lg leading-relaxed text-slate-700">
                  {CLINIC.doctor.name}'s extensive training in Dental Implant Treatment has driven his passion towards replacement of missing teeth, which he believes is the key factor for any individual to eat well and thereby have a healthy life.
                </p>
              </Reveal>
              <Reveal delay={0.4} width="100%">
                <p className="mt-5 text-lg leading-relaxed text-slate-700">
                  {CLINIC.doctor.name} helps in giving back to the community through various camps that he organizes regularly and executes with his team at various locations. He is also a consultant in other cities and is committed to spreading awareness about dental health.
                </p>
              </Reveal>

              {/* Quote */}
              <Reveal delay={0.5} width="100%">
                <blockquote className="mt-8 border-l-4 border-brand-500 pl-6 bg-brand-50/50 py-4 pr-4 rounded-r-xl">
                  <p className="text-xl italic leading-relaxed text-brand-700">
                    "It's heart warming to see and know people can eat well and stay healthy with a good set of teeth at our clinics!!"
                  </p>
                </blockquote>
              </Reveal>
            </div>

            {/* Doctor Photo */}
            <Reveal direction="right" width="100%">
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200 via-dental-100 to-brand-100 opacity-50 blur-2xl" />
                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-dental-50 shadow-xl">
                  <img
                    src={CLINIC.doctor.photoUrl}
                    alt={CLINIC.doctor.name}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-black text-brand-700">{CLINIC.doctor.name}</h3>
                  <p className="mt-1 text-slate-600">{CLINIC.doctor.credentials}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-slate-50">
        <div className="container-page py-12 md:py-16">
          {/* Section Title */}
          <Reveal width="100%">
            <h2 className="text-center text-3xl font-black text-navy-900 md:text-4xl">
              Vision & Mission
            </h2>
          </Reveal>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Dental Tools Image */}
            <div className="relative order-2 lg:order-1">
              <Reveal direction="left" width="100%">
                <img
                  src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80"
                  alt="Dental tools and equipment"
                  className="w-full rounded-2xl object-cover shadow-lg"
                />
              </Reveal>
            </div>

            {/* Mission & Vision Content */}
            <div className="order-1 lg:order-2">
              {/* Mission */}
              <Reveal delay={0.2} width="100%">
                <div>
                  <h3 className="text-xl font-black text-navy-900">Our Mission</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    At {CLINIC.name}, we aim at prioritizing our patient's necessities and guiding them with world-class dental treatment options by implementing expert knowledge, specialist skills and high-end technology. We are devoted in giving our time and energy to provide comfortable and safe treatment environment along with patient education, helping us in lifelong Doctor-Patient relationship created over trust and honesty.
                  </p>
                </div>
              </Reveal>

              {/* Divider */}
              <div className="my-6 h-px bg-slate-200" />

              {/* Vision */}
              <Reveal delay={0.3} width="100%">
                <div>
                  <h3 className="text-xl font-black text-navy-900">Our Vision</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    To be the most professional and sought out dental care provider by offering the best, ethical and uncompromised treatment to every patient at affordable price. We envision a community where everyone has access to quality dental care and understands the importance of oral health in overall well-being.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
