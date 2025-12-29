import { ArrowLeft, Award, Users, Heart, Zap, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
                            Trusted dental care in Madurai since years
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* About KSM Dental Care Section */}
            <section className="bg-white">
                <div className="container-page py-12 md:py-16">
                    <Reveal delay={0.2} width="100%">
                        <h2 className="text-3xl font-black text-navy-900 md:text-4xl mb-8 text-center">
                            About KSM Dental Care
                        </h2>
                    </Reveal>

                    {/* Content Block 1 - Image Right */}
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 mb-16">
                        <div>
                            <Reveal delay={0.2} width="100%">
                                <p className="text-lg leading-relaxed text-slate-700">
                                    Welcome to KSM Dental Care, a trusted dental clinic in Madurai, known for delivering comprehensive and ethical oral healthcare for individuals and families. With a team of experienced dentists specializing in various branches of dentistry, we provide complete dental solutions under one roof—focused on comfort, quality, and long-term results.
                                </p>
                            </Reveal>
                            <Reveal delay={0.3} width="100%">
                                <p className="mt-5 text-lg leading-relaxed text-slate-700">
                                    Our clinic is equipped with advanced dental technology, modern armamentarium, and laser dentistry to ensure precise, minimally invasive, and pain-free treatments. We maintain the highest standards of hygiene and sterilization, creating a safe and welcoming environment where patient comfort and satisfaction come first.
                                </p>
                            </Reveal>
                        </div>
                        <Reveal direction="right" width="100%">
                            <div className="relative">
                                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200 via-dental-100 to-brand-100 opacity-50 blur-2xl" />
                                <img
                                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                                    alt="Modern dental clinic interior"
                                    className="w-full rounded-3xl object-cover shadow-xl h-[350px]"
                                />
                            </div>
                        </Reveal>
                    </div>

                    {/* Content Block 2 - Image Left */}
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        <Reveal direction="left" width="100%">
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-dental-200 via-brand-100 to-dental-100 opacity-50 blur-2xl" />
                                <img
                                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
                                    alt="Dental care treatment"
                                    className="w-full rounded-3xl object-cover shadow-xl h-[350px]"
                                />
                            </div>
                        </Reveal>
                        <div className="order-1 lg:order-2">
                            <Reveal delay={0.2} width="100%">
                                <p className="text-lg leading-relaxed text-slate-700">
                                    At KSM Dental Care, our approach goes beyond treating dental problems. We emphasize preventive care and personalized treatment planning to promote lasting oral health and reduce the risk of recurrence. From routine check-ups and restorative procedures to advanced cosmetic treatments, every service is tailored to meet your unique needs.
                                </p>
                            </Reveal>
                            <Reveal delay={0.3} width="100%">
                                <p className="mt-5 text-lg leading-relaxed text-slate-700 font-medium">
                                    Experience expert care, advanced technology, and compassionate dentistry in one place. Visit KSM Dental Care, Madurai, and discover why we are considered among the best dental clinics in Madurai—where your smile is cared for with precision and trust.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="bg-slate-50">
                <div className="container-page py-12 md:py-16">
                    <Reveal delay={0.2} width="100%">
                        <h2 className="text-3xl font-black text-navy-900 md:text-4xl mb-12 text-center">
                            Meet Our Team
                        </h2>
                    </Reveal>

                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        {/* Doctor Photo */}
                        <Reveal direction="left" width="100%">
                            <div className="relative">
                                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200 via-dental-100 to-brand-100 opacity-50 blur-2xl" />
                                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-dental-50 shadow-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
                                        alt="Dr. M.Umayal"
                                        className="h-auto w-full object-cover"
                                    />
                                </div>
                                <div className="mt-6 text-center">
                                    <h3 className="text-2xl font-black text-brand-700">Dr. M.Umayal</h3>
                                    <p className="mt-1 text-slate-600">Periodontist & Founder</p>
                                    <p className="text-sm text-slate-500">BDS, MDS (Periodontology)</p>
                                </div>
                            </div>
                        </Reveal>

                        {/* Doctor Content */}
                        <div>
                            <Reveal delay={0.2} width="100%">
                                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                                    About Dr. M.Umayal – Periodontist & Founder
                                </h3>
                                <p className="text-lg leading-relaxed text-slate-700">
                                    Dr.M.Umayal is a highly trusted Periodontist with over 18 years of experience in advanced gum care, dental education, and comprehensive oral health management. With a strong academic background and extensive clinical exposure, she brings excellence, precision, and compassion to every patient she treats.
                                </p>
                            </Reveal>
                            <Reveal delay={0.3} width="100%">
                                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                                    She completed her BDS in 2008 from Saveetha Dental College and earned her MDS in Periodontology from SRM Dental College, Ramapuram in 2014. Her passion for dentistry and teaching led her to an accomplished academic career at Best Dental Science College, where she served from 2015 to 2025, progressing from Senior Lecturer to Professor.
                                </p>
                            </Reveal>
                            <Reveal delay={0.4} width="100%">
                                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                                    Now, as the Founder, Dr.M.Umayal is committed to delivering ethical, advanced, and patient-centric dental care in a warm and comfortable environment. Her approach focuses not just on treating dental problems, but on preventing disease, preserving natural teeth, and creating healthy, confident smiles for life.
                                </p>
                            </Reveal>

                            {/* Why Patients Choose */}
                            <Reveal delay={0.5} width="100%">
                                <div className="mt-6 bg-brand-50 rounded-2xl p-6">
                                    <h4 className="text-lg font-bold text-navy-900 mb-4">Why Patients Choose Dr.M.Umayal</h4>
                                    <div className="grid gap-3">
                                        {[
                                            "18+ years of clinical and academic excellence",
                                            "Specialist in gum diseases & periodontal care",
                                            "Professor & mentor to future dentists",
                                            "Consultant across Tamil Nadu",
                                            "Ethical, gentle & personalized treatment approach",
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-brand-600 flex-shrink-0" />
                                                <span className="text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-white">
                <div className="container-page py-12 md:py-16">
                    <Reveal delay={0.2} width="100%">
                        <h2 className="text-3xl font-black text-navy-900 md:text-4xl mb-4 text-center">
                            Why Visit KSM Dental Care?
                        </h2>
                        <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-12">
                            Choose KSM Dental Care, Madurai, where expert care, advanced technology, and genuine compassion come together to create healthy, confident smiles.
                        </p>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Award,
                                title: "Expert Dental Care",
                                desc: "Your smile is in the hands of experienced dentists with expertise across multiple specialties. Every treatment is planned and delivered with precision, ethics, and clinical excellence.",
                            },
                            {
                                icon: Users,
                                title: "All-in-One Dental Care",
                                desc: "From routine check-ups and preventive care to advanced cosmetic and restorative procedures, we offer complete dental solutions under one roof—saving you time while ensuring continuity of care.",
                            },
                            {
                                icon: Heart,
                                title: "Patient-Centred Approach",
                                desc: "We listen, understand, and personalize every treatment. Our focus is on your comfort, clarity, and long-term oral health, ensuring you feel confident and informed at every step.",
                            },
                            {
                                icon: Zap,
                                title: "Latest Dental Technology",
                                desc: "We use advanced dental equipment and modern treatment techniques, including minimally invasive and laser-based procedures, to deliver accurate, efficient, and pain-free results.",
                            },
                            {
                                icon: Shield,
                                title: "High-Tech Sterilization & Hygiene",
                                desc: "Your safety is our priority. We follow strict, hospital-grade sterilization protocols using advanced systems to maintain the highest standards of cleanliness and infection control.",
                            },
                        ].map((item, i) => (
                            <Reveal key={i} delay={0.1 * (i + 1)} width="100%">
                                <div className="bg-slate-50 rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                                        <item.icon className="h-6 w-6 text-brand-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="bg-slate-50">
                <div className="container-page py-12 md:py-16">
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                        {/* Image */}
                        <div className="relative order-2 lg:order-1">
                            <Reveal direction="left" width="100%">
                                <img
                                    src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80"
                                    alt="Dental tools and equipment"
                                    className="w-full rounded-2xl object-cover shadow-lg"
                                />
                            </Reveal>
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2">
                            <Reveal delay={0.2} width="100%">
                                <h2 className="text-3xl font-black text-navy-900 md:text-4xl mb-8">
                                    Our Mission & Vision
                                </h2>
                                <p className="text-lg leading-relaxed text-slate-700 mb-6">
                                    At KSM Dental Care, our mission is to elevate oral and aesthetic health by delivering precise, ethical, and personalized care rooted in evidence-based dentistry and advanced technology.
                                </p>

                                <h3 className="text-xl font-bold text-navy-900 mb-5">
                                    We are committed to:
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Setting uncompromising standards in quality, safety, and hygiene",
                                        "Combining specialist expertise with gentle, patient-focused care",
                                        "Preserving natural teeth while enhancing function, beauty, and confidence",
                                        "Creating a calm, transparent, and respectful treatment experience",
                                        "Continuously evolving through education, innovation, and clinical excellence",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100">
                                                <span className="text-brand-600 text-sm font-bold">✓</span>
                                            </div>
                                            <span className="text-lg text-slate-700 leading-relaxed pt-0.5">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="mt-8 text-lg leading-relaxed text-slate-700 font-medium">
                                    Our goal is not just to treat dental conditions, but to build lifelong trust, lasting smiles, and meaningful well-being for every patient we serve.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
