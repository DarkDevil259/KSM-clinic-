import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Reveal } from "../components/Reveal";

const servicesData: Record<string, {
  title: string;
  image: string;
  overview: string;
  whatIs: { title: string; content: string };
  whyNeeded: { title: string; points: string[] };
  benefits: string[];
}> = {
  "teeth-cleaning": {
    title: "Teeth Cleaning",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    overview: "Professional teeth cleaning, also known as prophylaxis, is a preventive dental procedure that removes plaque, tartar, and stains from your teeth. Regular cleaning helps prevent gum disease, cavities, and keeps your breath fresh. The procedure typically takes 30-60 minutes and is recommended every 6 months.",
    whatIs: {
      title: "What is Teeth Cleaning?",
      content: "Teeth cleaning is a professional dental procedure performed by a dentist or dental hygienist. It involves the removal of dental plaque and tartar (calculus) from teeth to prevent cavities, gingivitis, and periodontal disease. During the procedure, special instruments are used to gently remove deposits without harming the teeth. The process also includes polishing to remove stains and make your teeth smooth and shiny.",
    },
    whyNeeded: {
      title: "Why is Teeth Cleaning Important?",
      points: [
        "Prevents gum disease by removing plaque buildup",
        "Helps detect early signs of oral health problems",
        "Removes surface stains for a brighter smile",
        "Eliminates bad breath caused by bacteria",
        "Saves money by preventing costly dental treatments",
        "Maintains overall oral and systemic health",
      ],
    },
    benefits: [
      "Fresh breath and cleaner mouth feel",
      "Brighter, stain-free teeth",
      "Early detection of dental issues",
      "Prevention of gum disease",
    ],
  },
  "teeth-whitening": {
    title: "Teeth Whitening",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    overview: "Teeth whitening is a cosmetic dental procedure that lightens teeth and helps remove stains and discoloration. It is one of the most popular cosmetic dental procedures because it can greatly improve how your teeth look. The procedure can be done in-office or with take-home kits prescribed by your dentist.",
    whatIs: {
      title: "What is Teeth Whitening?",
      content: "Teeth whitening is a bleaching process that lightens discoloration of enamel and dentin. The procedure uses peroxide-based bleaching agents. In-office whitening uses a higher concentration of peroxide for faster results, while take-home kits use lower concentrations over a longer period. The treatment can make your teeth several shades lighter, giving you a more confident smile.",
    },
    whyNeeded: {
      title: "Why Consider Teeth Whitening?",
      points: [
        "Removes stains from coffee, tea, wine, and tobacco",
        "Reverses discoloration caused by aging",
        "Boosts self-confidence and self-esteem",
        "Creates a more youthful appearance",
        "Safe and effective when done professionally",
        "Quick results with minimal discomfort",
      ],
    },
    benefits: [
      "Visibly whiter teeth in one session",
      "Long-lasting results with proper care",
      "Non-invasive cosmetic improvement",
      "Enhanced smile aesthetics",
    ],
  },
  "root-canal": {
    title: "Root Canal Treatment",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    overview: "Root canal treatment is a dental procedure used to treat infection at the center of a tooth. It's needed when the blood or nerve supply of the tooth (the pulp) is infected through decay or injury. The treatment saves the tooth by removing the infected pulp, cleaning the canal, and sealing it to prevent further infection.",
    whatIs: {
      title: "What is Root Canal Treatment?",
      content: "A root canal is a treatment to repair and save a badly damaged or infected tooth instead of removing it. The procedure involves removing the damaged area of the tooth (the pulp), cleaning and disinfecting it, then filling and sealing it. The common causes affecting the pulp are a cracked tooth, deep cavity, repeated dental treatment, or trauma. The term 'root canal' comes from cleaning the canals inside the tooth's root.",
    },
    whyNeeded: {
      title: "Why is Root Canal Treatment Needed?",
      points: [
        "Severe tooth pain when chewing or applying pressure",
        "Prolonged sensitivity to hot or cold temperatures",
        "Darkening or discoloration of the tooth",
        "Swelling and tenderness in nearby gums",
        "Persistent pimple on the gums",
        "Deep decay or damage reaching the tooth pulp",
      ],
    },
    benefits: [
      "Saves your natural tooth",
      "Eliminates pain and infection",
      "Prevents spread of infection",
      "Restores normal biting force",
    ],
  },
  "braces-aligners": {
    title: "Braces & Aligners",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    overview: "Braces and aligners are orthodontic devices used to straighten teeth and correct bite issues. Traditional braces use metal brackets and wires, while clear aligners are removable plastic trays. Both methods gradually move teeth into proper position over time, typically 12-24 months depending on the complexity of the case.",
    whatIs: {
      title: "What are Braces and Aligners?",
      content: "Braces are dental tools that help correct problems with your teeth, like crowding, crooked teeth, or teeth that are out of alignment. They work by putting steady pressure on your teeth over time. Clear aligners are an alternative to braces that use a series of clear, removable plastic trays to gradually straighten teeth. Both options can achieve excellent results when properly used.",
    },
    whyNeeded: {
      title: "Why Consider Orthodontic Treatment?",
      points: [
        "Correct crooked or misaligned teeth",
        "Fix bite problems (overbite, underbite, crossbite)",
        "Close gaps between teeth",
        "Improve overall dental health",
        "Enhance facial appearance and smile",
        "Prevent future dental problems",
      ],
    },
    benefits: [
      "Straighter, more attractive smile",
      "Improved bite function",
      "Easier to clean teeth",
      "Better long-term oral health",
    ],
  },
  "crowns-bridges": {
    title: "Crowns & Bridges",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    overview: "Dental crowns and bridges are fixed prosthetic devices cemented onto existing teeth or implants. A crown is used to cover a damaged tooth, while a bridge is used to replace one or more missing teeth. Both restore the function and appearance of your natural teeth and can last many years with proper care.",
    whatIs: {
      title: "What are Crowns and Bridges?",
      content: "A dental crown is a tooth-shaped 'cap' that is placed over a tooth to restore its shape, size, strength, and appearance. A dental bridge literally bridges the gap created by one or more missing teeth. A bridge is made up of two or more crowns for the teeth on either side of the gap and a false tooth/teeth in between. These are called pontics and can be made from gold, alloys, porcelain, or a combination.",
    },
    whyNeeded: {
      title: "When are Crowns & Bridges Needed?",
      points: [
        "Protect a weak tooth from breaking",
        "Restore an already broken or worn tooth",
        "Cover and support a tooth with a large filling",
        "Hold a dental bridge in place",
        "Cover a dental implant",
        "Replace missing teeth to restore your smile",
      ],
    },
    benefits: [
      "Restores natural tooth appearance",
      "Improves chewing and speaking",
      "Maintains facial shape",
      "Long-lasting dental solution",
    ],
  },
  "dental-implants": {
    title: "Dental Implants",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
    overview: "Dental implants are artificial tooth roots that provide a permanent base for fixed replacement teeth. They are an effective long-term solution for people who suffer from missing teeth, failing teeth, or chronic dental problems. Implants look, feel, and function like natural teeth and can last a lifetime with proper care.",
    whatIs: {
      title: "What are Dental Implants?",
      content: "A dental implant is a surgical component that interfaces with the bone of the jaw or skull to support a dental prosthesis such as a crown, bridge, or denture. The implant itself is a titanium screw that serves as a replacement for the root of a missing tooth. Over time, the implant fuses with the jawbone in a process called osseointegration, providing stable support for artificial teeth.",
    },
    whyNeeded: {
      title: "Why Choose Dental Implants?",
      points: [
        "Permanent solution for missing teeth",
        "Preserves jawbone and prevents bone loss",
        "Does not affect adjacent healthy teeth",
        "Looks and functions like natural teeth",
        "High success rate (95-98%)",
        "Improves speech and eating ability",
      ],
    },
    benefits: [
      "Lifetime solution with proper care",
      "Natural look and feel",
      "No slipping or clicking",
      "Easy to maintain like natural teeth",
    ],
  },
  "wisdom-tooth": {
    title: "Wisdom Tooth Extraction",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    overview: "A person may be required to remove their wisdom tooth if it causes pain, or discomfort, grows in a crooked direction, and leads to oral health conditions. The dentist may recommend removing the tooth sometimes before it creates issues within the oral cavity. The procedure takes an hour to complete and the person recovers within two weeks.",
    whatIs: {
      title: "What are Wisdom Teeth?",
      content: "Wisdom teeth are also known as third molars and are located at the back of a person's mouth. They usually emerge between the age of 17 to 25 years. Some people possess four wisdom teeth that are present in the lower left, lower right, upper left, and upper right areas of the mouth. The presence or absence of wisdom teeth doesn't indicate any complications. Scientifically the wisdom teeth are vestigial parts in the human body, meaning they are no longer required.",
    },
    whyNeeded: {
      title: "Why Should the Wisdom Tooth Be Extracted?",
      points: [
        "The tooth grows at an angle in the direction of the adjacent tooth which is the second molar",
        "The tooth grows toward the back of the mouth",
        "It grows at a right angle toward the other teeth and appears horizontal",
        "Grows straight like the other teeth but remains stuck within the jaw bone",
        "Causes pain, infection, or damage to neighboring teeth",
        "Creates difficulty in cleaning, leading to decay",
      ],
    },
    benefits: [
      "Relief from pain and discomfort",
      "Prevention of damage to other teeth",
      "Reduced risk of infection",
      "Better oral hygiene",
    ],
  },
  "smile-design": {
    title: "Smile Design",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    overview: "Smile design, also known as smile makeover, is a comprehensive approach to improving the appearance of your smile through one or more cosmetic dentistry procedures. It considers your facial appearance, skin tone, hair color, teeth, gum tissue, and lips to develop your ideal smile. The process is customized to your unique features and desires.",
    whatIs: {
      title: "What is Smile Design?",
      content: "Smile design is a multi-faceted approach to creating the perfect smile. It involves a careful analysis of your face and smile to create a personalized treatment plan. Using digital imaging and advanced planning software, your dentist can show you what your new smile will look like before treatment begins. The process may include whitening, veneers, crowns, orthodontics, or implants depending on your needs.",
    },
    whyNeeded: {
      title: "Why Consider Smile Design?",
      points: [
        "Correct multiple aesthetic issues at once",
        "Customized to your unique facial features",
        "Preview results before treatment begins",
        "Boost confidence and self-esteem",
        "Create a harmonious, natural-looking smile",
        "Address both cosmetic and functional concerns",
      ],
    },
    benefits: [
      "Complete smile transformation",
      "Personalized treatment plan",
      "Natural-looking results",
      "Improved confidence",
    ],
  },
};


export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-navy-900">Service not found</h1>
        <Link to="/services" className="mt-4 inline-block text-brand-600 hover:underline">
          ← Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-page pb-10">
            <Reveal delay={0.1}>
              <Link
                to="/services"
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Services
              </Link>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-3xl font-black text-white md:text-5xl">
                {service.title}
              </h1>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Overview */}
          <section>
            <Reveal width="100%">
              <h2 className="text-2xl font-black text-brand-600">OVERVIEW:</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">
                <span className="float-left mr-2 text-5xl font-black text-navy-900">
                  {service.overview.charAt(0)}
                </span>
                {service.overview.slice(1)}
              </p>
            </Reveal>
          </section>

          {/* Thumbnail Image */}
          <Reveal delay={0.2} width="100%">
            <div className="mt-10 overflow-hidden rounded-2xl shadow-xl">
              <img
                src={service.image.replace("w=800", "w=1200")}
                alt={service.title}
                className="h-auto w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </Reveal>

          {/* What Is */}
          <section className="mt-12">
            <Reveal width="100%">
              <h2 className="text-2xl font-black uppercase tracking-wide text-brand-600">
                {service.whatIs.title}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-700">
                {service.whatIs.content}
              </p>
            </Reveal>
          </section>

          {/* Why Needed */}
          <section className="mt-12">
            <Reveal width="100%">
              <h2 className="text-2xl font-black uppercase tracking-wide text-brand-600">
                {service.whyNeeded.title}
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.whyNeeded.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <span className="text-sm text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}

