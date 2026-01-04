import { MousePointer, User, ShieldCheck, Award, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { CLINIC } from "../constants/clinic";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { Reveal } from "../components/Reveal";
import { apiGet } from "../lib/api";

const heroImages = [
  "/hero-slide.jpg",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=80"
];

const steps = [
  {
    icon: MousePointer,
    step: "Step 1",
    title: "Register & Book",
    desc: "Fill the online form and book your appointment.",
  },
  {
    icon: User,
    step: "Step 2",
    title: "Confirm Time",
    desc: "We'll confirm the best time for your visit.",
  },
  {
    icon: ShieldCheck,
    step: "Step 3",
    title: "Meet Your Doctor",
    desc: "Visit the clinic and get expert dental care.",
  },
];

// Stats will be loaded dynamically from API
const defaultStats = [
  { value: 20, suffix: "+", label: "Reviews" },
  { value: 18, suffix: "+", label: "Years of Experience" },
  { value: 400, suffix: "+", label: "Happy Patients" },
];

const faqs = [
  {
    question: "What are your clinic hours?",
    answer: "We are open Monday to Saturday from 9:00 AM to 9:00 PM. We are closed on Sundays. For emergencies, please call our helpline.",
  },
  {
    question: "Do I need to book an appointment in advance?",
    answer: "While walk-ins are welcome, we recommend booking an appointment online or via phone to ensure minimal waiting time and personalized attention.",
  },
  {
    question: "Is teeth cleaning painful?",
    answer: "Professional teeth cleaning is generally painless. You may feel slight pressure or vibration, but our gentle approach ensures maximum comfort throughout the procedure.",
  },
  {
    question: "How often should I visit the dentist?",
    answer: "We recommend visiting every 6 months for regular check-ups and cleaning. This helps prevent dental problems and keeps your smile healthy.",
  },
  {
    question: "Do you offer emergency dental services?",
    answer: "Yes, we handle dental emergencies. Call us immediately if you experience severe pain, broken teeth, or other urgent dental issues.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between gap-3 sm:gap-4 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-left transition-all duration-300 shadow-sm ${isOpen
          ? "bg-brand-600 text-white shadow-md"
          : "bg-white text-slate-700 hover:bg-slate-50 hover:text-brand-600"
          }`}
      >
        <span className="text-sm sm:text-base font-bold pr-2">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-b-xl bg-slate-50 px-4 sm:px-6 py-3 sm:py-4 border-x border-b border-slate-100">
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stats, setStats] = useState(defaultStats);

  // Fetch stats from API
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await apiGet<{ stats: { reviews: number; yearsExperience: number; happyPatients: number } }>("/api/stats");
        // eslint-disable-next-line no-console
        console.log("Fetched stats from API:", response);
        if (response && response.stats) {
          // Ensure all values are valid numbers, fallback to defaults if invalid
          const reviews = typeof response.stats.reviews === 'number' && !isNaN(response.stats.reviews)
            ? response.stats.reviews
            : 20;
          const yearsExperience = typeof response.stats.yearsExperience === 'number' && !isNaN(response.stats.yearsExperience)
            ? response.stats.yearsExperience
            : 18;
          const happyPatients = typeof response.stats.happyPatients === 'number' && !isNaN(response.stats.happyPatients)
            ? response.stats.happyPatients
            : 400;

          const newStats = [
            { value: reviews, suffix: "+", label: "Reviews" },
            { value: yearsExperience, suffix: "+", label: "Years of Experience" },
            { value: happyPatients, suffix: "+", label: "Happy Patients" },
          ];
          // eslint-disable-next-line no-console
          console.log("Setting stats to:", newStats);
          setStats(newStats);
        } else {
          // eslint-disable-next-line no-console
          console.warn("No stats in response, using defaults:", response);
          // Keep default stats
        }
      } catch (err) {
        // Use default stats if API fails
        // eslint-disable-next-line no-console
        console.error("Failed to fetch stats, using defaults:", err);
        // Default stats are already set in useState
      }
    }
    fetchStats();
    // Refresh stats every 60 seconds to get updated patient count (reduced frequency)
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="relative min-h-[90vh] overflow-hidden bg-slate-900">
        {/* Carousel Background */}
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-40" : "opacity-0"
              }`}
          >
            <img
              src={img}
              alt={`Dental clinic slide ${index + 1}`}
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-800/50 to-transparent" />

        {/* Content Overlay */}
        <div className="relative z-10 container-page flex min-h-[90vh] items-center py-12 md:py-20">
          <div className="max-w-2xl">
            <Reveal delay={0.2}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md shadow-lg">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                Same-day appointments available
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl drop-shadow-sm">
                {CLINIC.tagline}
              </h1>
            </Reveal>

            <Reveal delay={0.6}>
              <p className="mt-6 max-w-xl text-base md:text-lg text-slate-100 font-medium leading-relaxed">
                Book your appointment in seconds — our team will confirm your slot instantly and ensure you receive the right, personalized care.
              </p>
            </Reveal>

            <Reveal delay={0.8}>
              <div className="mt-8 md:mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
                <Button to="/appointment" variant="primary" className="text-base h-12 px-8 w-full sm:w-auto justify-center shadow-xl shadow-brand-900/20">
                  Book Appointment
                </Button>
                <Button to="/contact" variant="ghost" className="text-base h-12 px-8 w-full sm:w-auto justify-center border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40">
                  Contact Us
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-2 transition-all duration-500 rounded-full ${idx === currentImageIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Doctor About Section */}
      <section className="bg-slate-50 py-12 md:py-24 overflow-hidden">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="right" width="100%">
              <div className="relative group">
                <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-200 to-dental-200 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                <img
                  src={CLINIC.doctor.photoUrl}
                  alt={CLINIC.doctor.name}
                  className="w-full max-h-[500px] rounded-[2rem] object-cover object-top shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </Reveal>

            <div>
              <Reveal delay={0.2}>
                <h2 className="text-2xl font-black tracking-tight text-navy-900 sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                  Your Trusted <span className="text-brand-600">Family</span> Dental Clinic
                </h2>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-600 leading-relaxed px-4 sm:px-0">
                  KSM Dental Care is a modern family dental clinic committed to delivering ethical, gentle, and advanced oral care for patients of all ages. From gum disease treatment and routine cleanings to smile design, aligners, implants, and pediatric dentistry, we combine expertise with compassion to ensure a comfortable and stress-free experience. With a patient-first approach, transparent treatment plans, and a warm, welcoming environment, we focus on long-term oral health, confident smiles, and exceptional care you can trust.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-8 rounded-2xl border-l-4 border-brand-500 bg-white p-6 shadow-sm">
                  <p className="font-bold font-branding text-brand-600 text-lg">
                    "Healthy teeth. Happy life."
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="mt-10 flex items-center gap-5">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-navy-900">{CLINIC.doctor.name}</div>
                    <div className="text-base font-medium text-brand-600">{CLINIC.doctor.designation}</div>
                    <div className="text-sm text-slate-500">{CLINIC.doctor.credentials}</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps Section */}
      <section className="bg-white py-12 md:py-24">
        <div className="container-page">
          <div className="text-center">
            <Reveal width="100%" direction="up">
              <div className="text-sm font-bold uppercase tracking-wider text-brand-600">
                Register Online Before You Arrive
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-navy-900 sm:text-3xl md:text-4xl lg:text-5xl">
                We Look Forward to Welcoming You
              </h2>
              <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-slate-600 text-base sm:text-lg px-4">
                Our complete current fees guide is on display in the reception area.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 sm:mt-16 grid gap-6 md:grid-cols-3 md:gap-10 px-4 sm:px-0">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.2} direction="up" width="100%">
                <div className="group text-center p-6 rounded-3xl transition-all duration-300 hover:bg-brand-50/50">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-brand-100 text-brand-600 shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <s.icon className="h-9 w-9" />
                  </div>
                  <div className="mt-6 text-sm font-bold text-brand-500">{s.step}</div>
                  <h3 className="mt-2 text-xl font-extrabold text-navy-900">{s.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-brand-900 py-12 sm:py-16 md:py-20 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        <div className="container-page relative z-10">
          <div className="grid gap-6 sm:gap-8 text-center md:grid-cols-3 md:gap-10 px-4 sm:px-0">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} direction="up" width="100%">
                <div className="group p-4">
                  <div className="text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tabular-nums">
                    <AnimatedCounter key={`${stat.label}-${stat.value}`} end={stat.value} suffix={stat.suffix} duration={2500} />
                  </div>
                  <div className="mt-2 text-sm sm:text-base md:text-lg font-medium text-brand-100 uppercase tracking-widest">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-12 md:py-24">
        <div className="container-page">
          {/* Title */}
          <div className="text-center mb-10 md:mb-16">
            <Reveal width="100%">
              <div className="text-sm font-bold uppercase tracking-wider text-brand-600">
                Frequently Asked Questions
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-navy-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Got questions? We've got answers.
              </h2>
            </Reveal>
          </div>

          {/* Content Grid */}
          <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 px-4 sm:px-0">
            {/* FAQ Questions - Left Side */}
            <div>
              <div className="space-y-3 sm:space-y-4">
                {faqs.slice(0, 4).map((faq, i) => (
                  <Reveal key={faq.question} delay={i * 0.1} direction="left" width="100%">
                    <FAQItem question={faq.question} answer={faq.answer} />
                  </Reveal>
                ))}
              </div>
              <div className="mt-6 sm:mt-8">
                <Reveal delay={0.4}>
                  <Button to="/contact" variant="primary" className="w-full sm:w-auto shadow-xl shadow-brand-500/20">
                    Have more questions? Contact us
                  </Button>
                </Reveal>
              </div>
            </div>

            {/* FAQ Image - Right Side */}
            <div className="relative hidden lg:block">
              <Reveal direction="right" width="100%">
                <div className="relative">
                  <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-slate-100 rotate-3" />
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                    alt="Dental consultation"
                    className="w-full rounded-3xl object-cover shadow-2xl"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
