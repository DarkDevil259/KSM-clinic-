import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { useState } from "react";
import { IMAGES } from "../constants/images";

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

const servicesData: Record<string, {
  title: string;
  image: string;
  overview: string;
  whatIs: { title: string; content: string };
  whyNeeded: { title: string; points: string[] };
  benefits: string[];
  faq?: { question: string; answer: string }[];
}> = {
  "teeth-cleaning": {
    title: "Teeth Cleaning",
    image: IMAGES.services.teethCleaning,
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
    faq: [
      {
        question: "Is teeth cleaning painful?",
        answer: "No — the procedure is generally comfortable. Those with sensitive gums may feel slight pressure, but numbing options are available if needed.",
      },
      {
        question: "How often should I get teeth cleaning done?",
        answer: "Every 6 months, or every 3–4 months if you have gum disease or frequent plaque buildup.",
      },
      {
        question: "Will cleaning make my teeth whiter?",
        answer: "It removes surface stains and makes teeth appear cleaner and brighter, but it does not change tooth color like whitening treatment does.",
      },
      {
        question: "Can I skip teeth cleaning if I brush daily?",
        answer: "No — brushing cannot remove hardened tartar. Professional cleaning is essential to maintain gum and tooth health.",
      },
    ],
  },
  "teeth-whitening": {
    title: "Teeth Whitening",
    image: IMAGES.services.teethWhitening,
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
    faq: [
      {
        question: "How long do whitening results last?",
        answer: "Results typically last 6–12 months, depending on diet and oral habits. Avoiding staining foods and smoking helps maintain results longer.",
      },
      {
        question: "Is teeth whitening painful or sensitive?",
        answer: "Some patients may experience temporary sensitivity, but it usually settles within 24 hours. Desensitizing gels can be used if needed.",
      },
      {
        question: "Can whitening damage teeth?",
        answer: "Professional whitening is safe and does not harm enamel. Dentist-supervised treatments use medically approved products.",
      },
      {
        question: "How is whitening different from teeth cleaning?",
        answer: "Cleaning removes plaque and tartar for oral health, while whitening changes tooth shade for cosmetic improvement. Both can be done together for best results.",
      },
    ],
  },
  "root-canal": {
    title: "Root Canal Treatment",
    image: IMAGES.services.rootCanal,
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
    faq: [
      {
        question: "Is a root canal painful?",
        answer: "No — modern techniques make the procedure comfortable and nearly painless. It actually relieves the pain caused by infection.",
      },
      {
        question: "Do I need a crown after a root canal?",
        answer: "Yes — most root canal–treated teeth become weak over time. A crown helps protect and prolong the life of the tooth.",
      },
      {
        question: "How many visits are required?",
        answer: "Most cases need 1–2 appointments. Severe infections may require an additional visit.",
      },
      {
        question: "What happens if I avoid treatment?",
        answer: "The infection may spread, causing swelling, pain, bone loss, and eventually tooth loss. Early treatment helps preserve your tooth.",
      },
    ],
  },

  "crowns-bridges": {
    title: "Crowns & Bridges",
    image: IMAGES.services.crowns,
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
    faq: [
      {
        question: "How long do crowns and bridges last?",
        answer: "With proper care, they typically last 10–15 years or more.",
      },
      {
        question: "Does getting a crown or bridge hurt?",
        answer: "The procedure is done under local anesthesia and is generally painless. Mild sensitivity may occur afterward but settles quickly.",
      },
      {
        question: "How many visits are required?",
        answer: "Usually 2 visits — one for shaping and measurements, and another to fit the permanent crown or bridge.",
      },
      {
        question: "Can I eat normally after the procedure?",
        answer: "Yes — once the permanent crown or bridge is placed, you can eat normally. Avoid very hard foods initially to prolong longevity.",
      },
    ],
  },
  "dental-implants": {
    title: "Dental Implants",
    image: IMAGES.services.implants,
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
    faq: [
      {
        question: "How long do dental implants last?",
        answer: "With proper oral care, implants can last 15–20+ years, often a lifetime.",
      },
      {
        question: "Is the procedure painful?",
        answer: "It is done under local anesthesia, making it comfortable. Mild soreness afterward is normal and temporary.",
      },
      {
        question: "How long does the process take?",
        answer: "From placement to final crown, treatment can take 3–6 months, depending on healing and bone support.",
      },
      {
        question: "Am I a candidate for implants?",
        answer: "Most healthy adults with sufficient jawbone are eligible. Patients with diabetes, smoking habits, or bone loss may require evaluation or grafting before placement.",
      },
    ],
  },
  "wisdom-tooth": {
    title: "Wisdom Tooth Extraction",
    image: IMAGES.services.wisdomTooth,
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
    faq: [
      {
        question: "Does wisdom tooth removal hurt?",
        answer: "No — the area is numbed fully before extraction. Mild swelling or soreness may occur afterward but is temporary.",
      },
      {
        question: "How long is the recovery?",
        answer: "Most patients recover in 2–4 days, while full gum healing may take a couple of weeks. Ice packs and soft foods are recommended during the first 24 hours.",
      },
      {
        question: "When should wisdom teeth be removed?",
        answer: "Removal is recommended when there is pain, swelling, infection, decay, food trapping, or if X-rays show impaction that may cause future problems.",
      },
      {
        question: "Can I eat normally after extraction?",
        answer: "Start with soft foods for the first day (juice, yogurt, rice, mashed foods). Avoid straw drinking, smoking, and hard foods for a few days to promote healing.",
      },
    ],
  },
  "smile-design": {
    title: "Smile Design",
    image: IMAGES.services.smileDesign,
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
    faq: [
      {
        question: "How long does a smile design take?",
        answer: "It depends on the type of treatment involved. Some results are achieved in 1 visit (whitening), while full makeovers involving veneers or orthodontics may take weeks to months.",
      },
      {
        question: "Is smile design painful?",
        answer: "Most procedures are minimally invasive and comfortable. Local anesthesia is used only when needed, such as for veneers or gum reshaping.",
      },
      {
        question: "Will the results look natural?",
        answer: "Yes — materials are shade-matched and shaped to look natural while enhancing aesthetics. Digital planning ensures the smile suits your face and personality.",
      },
      {
        question: "Who is a good candidate?",
        answer: "Anyone unhappy with stained, chipped, uneven, crooked, or spaced teeth is a great candidate. A dental evaluation will confirm if gums and supporting structures are healthy enough to proceed.",
      },
    ],
  },
  "clear-aligners": {
    title: "Clear Aligners",
    image: IMAGES.services.clearAligners,
    overview: "Clear aligners are modern, transparent, removable trays used to straighten teeth without the need for metal braces. Designed to gradually shift teeth into their proper position, aligners offer a discreet, comfortable, and lifestyle-friendly solution for teens and adults who want a straighter smile. Treatment duration varies based on individual needs and typically ranges from 6–18 months.",
    whatIs: {
      title: "What Are Clear Aligners?",
      content: "Clear aligners are custom-made, transparent plastic trays that fit snugly over your teeth and apply gentle pressure to move them gradually. Unlike traditional braces, aligners have no wires, no brackets, and no dietary restrictions. Patients wear a new set of trays every 10–14 days as their smile improves over time. They can be removed while eating, brushing, or during special occasions—making them a convenient orthodontic option.",
    },
    whyNeeded: {
      title: "Who Is Clear Aligner Treatment For?",
      points: [
        "Crooked or crowded teeth",
        "Gaps or spacing between teeth",
        "Mild-to-moderate bite issues (overbite, underbite, crossbite)",
        "Patients looking for a cosmetic and comfortable alternative to braces",
      ],
    },
    benefits: [
      "Nearly invisible — confidence to smile during treatment",
      "Removable — eat whatever you like, maintain oral hygiene easily",
      "Smooth & comfortable — no metal wires causing irritation",
      "Reduced clinic visits — aligners require fewer adjustments",
      "Designed digitally — predictable results through smile simulation",
      "Perfect for students, working professionals, and adults",
    ],
    faq: [
      {
        question: "Is the treatment painful?",
        answer: "You may feel mild pressure when switching to a new tray, but it is much more comfortable compared to traditional metal braces.",
      },
      {
        question: "How long should aligners be worn daily?",
        answer: "For best results, wear aligners 20–22 hours a day, removing them only for eating, brushing, and hot drinks.",
      },
      {
        question: "How long does treatment take?",
        answer: "Most patients complete treatment in 6–18 months, based on how severe the alignment issue is.",
      },
      {
        question: "Can I eat with my aligners on?",
        answer: "No — aligners must be removed while eating to avoid cracks or stains. You may drink normal-temperature water while wearing them.",
      },
    ],
  },
  "laser-gum-treatment": {
    title: "Laser Gum Treatment",
    image: IMAGES.services.laserGumTreatment,
    overview: "Laser gum treatment is a modern, minimally invasive dental procedure that uses advanced laser technology to treat gum infections, reduce inflammation, remove excess gum tissue and promote faster healing. It is a popular alternative to traditional surgical gum treatment because it involves no blades, no stitches, minimal bleeding, and very little discomfort.",
    whatIs: {
      title: "What Is Laser Gum Treatment?",
      content: "Laser gum therapy uses a focused light beam to target and remove infected or inflamed gum tissue while disinfecting the area at the same time. It helps eliminate bacteria deep below the gumline, encourages tissue regeneration, and improves gum health. This technique is highly precise, making it ideal for treating gum disease, bleeding gums, swollen gums, and gummy smiles. The procedure is safe, gentle, and often completed in a single visit depending on the severity of the condition.",
    },
    whyNeeded: {
      title: "Why Choose Laser Gum Treatment?",
      points: [
        "Painless, stitch-free procedure",
        "Faster healing and less bleeding",
        "Highly precise — protects healthy tissues",
        "Ideal for gum disease, bleeding gums, and gummy smile correction",
        "Quick procedure with minimal post-treatment downtime",
      ],
    },
    benefits: [
      "Minimally invasive and gentle",
      "Reduces bacterial infection",
      "Promotes natural tissue regeneration",
      "Enhances smile aesthetics",
    ],
    faq: [
      {
        question: "Is laser gum treatment painful?",
        answer: "No — it is generally painless and requires little to no anesthesia. Most patients feel only warmth or a mild tingling sensation.",
      },
      {
        question: "How long is the recovery time?",
        answer: "Recovery is fast — most patients resume normal routine the same day, with minor soreness lasting only 24–48 hours.",
      },
      {
        question: "How many sessions are needed?",
        answer: "Mild cases may need just one sitting, while advanced gum disease may require 2–3 sessions depending on the diagnosis.",
      },
      {
        question: "Can laser treatment cure gum disease completely?",
        answer: "Laser therapy removes infection and promotes healing, but long-term results depend on oral hygiene and regular dental checkups.",
      },
    ],
  },
  "cosmetic-dentistry": {
    title: "Cosmetic Dentistry",
    image: IMAGES.services.cosmeticDentistry,
    overview: "Cosmetic dentistry focuses on improving the appearance of your smile by enhancing the color, shape, size, and alignment of your teeth. Whether you're looking to fix chipped or stained teeth, close gaps, straighten your smile, or achieve a complete smile makeover, cosmetic dentistry offers advanced, painless, and natural-looking solutions that boost confidence and improve oral appearance.",
    whatIs: {
      title: "What Is Cosmetic Dentistry?",
      content: "Cosmetic dentistry includes a wide range of aesthetic dental treatments such as teeth whitening, veneers, smile design, tooth-colored fillings, clear aligners, and crown or bridge restorations. These procedures are tailored to each patient using digital smile-planning tools, ensuring that results look natural and match facial features and personality. Cosmetic dentistry can be done gradually or as a full transformation, depending on your goals.",
    },
    whyNeeded: {
      title: "Why Choose Cosmetic Dentistry?",
      points: [
        "Enhances smile aesthetics and boosts self-confidence",
        "Improves tooth shape, alignment, and color",
        "Natural-looking results with modern materials",
        "Digital smile preview available before treatment",
        "Safe, minimally invasive & customized to your facial features",
      ],
    },
    benefits: [
      "Visibly improved smile aesthetics",
      "Boosted self-confidence",
      "Long-lasting, natural-looking results",
      "Personalized treatment plan",
    ],
    faq: [
      {
        question: "Is cosmetic dentistry only about looks?",
        answer: "No — many cosmetic treatments also improve function, protect teeth, and support long-term oral health.",
      },
      {
        question: "How long do results last?",
        answer: "Depending on the treatment, results may last 5–15 years or more with proper care, hygiene, and follow-up visits.",
      },
      {
        question: "Does it require multiple visits?",
        answer: "Some treatments such as veneers, smile design, or aligners require 2–3 visits, while whitening can be done in one session.",
      },
      {
        question: "Is cosmetic dentistry suitable for everyone?",
        answer: "Most adults can undergo cosmetic procedures, but some patients may need gum or cavity treatment first to ensure a healthy foundation.",
      },
    ],
  },
  "orthodontic-treatment": {
    title: "Orthodontic Treatment",
    image: IMAGES.services.orthodonticTreatment,
    overview: "Orthodontic treatment focuses on correcting misaligned teeth and jaw positions to improve both appearance and function. It helps straighten crowded or crooked teeth, close gaps, and correct bite problems such as overbite, underbite, and crossbite. Treatment options include traditional metal braces, ceramic braces, self-ligating braces, and modern clear aligners, offering solutions for every age group—from teens to adults.",
    whatIs: {
      title: "What Is Orthodontic Treatment?",
      content: "Orthodontics uses braces or aligner systems to apply gentle, continuous pressure on teeth over time, guiding them into proper alignment. Braces may use metal or ceramic brackets with wires, while clear aligners use transparent removable trays. A detailed clinical and digital assessment is done before the start of treatment to plan tooth movement, treatment duration, and expected results. Depending on the case, treatment usually lasts between 12 and 24 months.",
    },
    whyNeeded: {
      title: "Why Choose Orthodontic Treatment?",
      points: [
        "Straightens teeth for a confident, even smile",
        "Corrects bite issues for better chewing, speaking, and jaw comfort",
        "Prevents long-term dental problems like wear, cavities, and gum issues",
        "Multiple treatment options based on lifestyle and budget",
        "Suitable for teens and adults",
      ],
    },
    benefits: [
      "Perfectly aligned, confident smile",
      "Improved oral hygiene and health",
      "Better bite function",
      "Long-term dental stability",
    ],
    faq: [
      {
        question: "How long does orthodontic treatment take?",
        answer: "Most cases take 1–2 years, depending on the severity of alignment and bite concerns.",
      },
      {
        question: "Are braces painful?",
        answer: "Mild discomfort may occur for a few days after tightening or changing wires, but it settles quickly. Modern braces are smoother and more comfortable than older systems.",
      },
      {
        question: "What is the best age for orthodontic treatment?",
        answer: "The ideal age is 12–16 years, but adults can also get braces or aligners successfully—age is not a barrier.",
      },
      {
        question: "Do I need to avoid certain foods?",
        answer: "If using braces, hard and sticky foods should be avoided. With clear aligners, there are no food restrictions because trays are removable.",
      },
    ],
  },
  "paediatric-dentistry": {
    title: "Paediatric Dentistry",
    image: IMAGES.services.paediatricDentistry,
    overview: "Paediatric dentistry focuses on the oral health of infants, children, and teens. It includes preventive care, cavity treatment, early orthodontic evaluation, and habit correction to ensure healthy teeth and gums during childhood. A child-friendly environment, gentle approach, and early dental visits help build positive dental habits and prevent long-term oral problems.",
    whatIs: {
      title: "What Is Paediatric Dentistry?",
      content: "This branch of dentistry is dedicated to treating children’s dental needs—from the eruption of the first baby tooth to teenage years. Services include dental checkups, cleaning, fluoride application, fillings, sealants, space maintainers, habit-breaking appliances, and emergency care. Paediatric dentists are trained to handle children with anxiety and use behavior-guided techniques to ensure treatment is comfortable and stress-free.",
    },
    whyNeeded: {
      title: "Why Choose Paediatric Dental Care?",
      points: [
        "Prevents cavities and early childhood tooth decay",
        "Encourages healthy habits from a young age",
        "Detects alignment and bite problems early",
        "Helps children feel safe and confident at the dentist",
        "Supports proper chewing, speech development, and overall oral health",
      ],
    },
    benefits: [
      "Healthy foundation for permanent teeth",
      "Positive dental experiences for children",
      "Early detection of oral issues",
      "specialized care for growing smiles",
    ],
    faq: [
      {
        question: "When should a child first visit the dentist?",
        answer: "Experts recommend the first dental visit by age 1 or when the first tooth appears.",
      },
      {
        question: "How often should children get dental checkups?",
        answer: "Every 6 months unless otherwise advised for cavity-prone or special needs children.",
      },
      {
        question: "Are baby teeth really important if they fall out?",
        answer: "Yes — baby teeth guide permanent teeth into position, help chewing and speech, and prevent infection. Untreated decay can affect permanent teeth too.",
      },
      {
        question: "How do you manage kids who are afraid of dental treatment?",
        answer: "Paediatric dentists use gentle communication, distraction, play techniques, and parents’ presence to make visits relaxed. For anxious cases, sedation options may be considered.",
      },
    ],
  },
  "periodontics": {
    title: "Periodontics",
    image: IMAGES.services.periodontics,
    overview: "Periodontics is a specialized branch of dentistry focused on the prevention, diagnosis, and treatment of gum disease and conditions affecting the tissues that support the teeth. Healthy gums are the foundation of a healthy smile, and untreated gum infections can lead to tooth mobility, bone loss, bad breath, and eventually tooth loss. Early gum care helps preserve natural teeth and improve long-term oral health.",
    whatIs: {
      title: "What Is Periodontic Treatment?",
      content: "Periodontic treatment includes procedures such as deep cleaning (scaling and root planing), laser gum therapy, periodontal flap surgery, gum grafts, and maintenance care. These treatments remove infection-causing bacteria from beneath the gumline, reduce inflammation, regenerate lost bone or tissue, and improve gum health. Periodontists also manage cosmetic gum concerns such as gummy smiles and receding gums. Treatment type depends on the severity of gum disease—from early gingivitis to advanced periodontitis.",
    },
    whyNeeded: {
      title: "Why Choose Periodontic Treatment?",
      points: [
        "Stops gum bleeding, swelling, and infection",
        "Prevents tooth loosening and tooth loss",
        "Eliminates bad breath caused by gum bacteria",
        "Supports healthier heart & systemic wellness",
        "Helps restore strong gums and bone support",
        "Specialized care for long-term oral stability",
      ],
    },
    benefits: [
      "Healthy gums and bone support",
      "Prevention of tooth loss",
      "Elimination of bad breath",
      "Improved overall health",
    ],
    faq: [
      {
        question: "What are the signs that I need gum treatment?",
        answer: "Common signs include bleeding gums, persistent bad breath, swollen or receding gums, tooth sensitivity, or teeth that feel loose or shifting.",
      },
      {
        question: "Is gum treatment painful?",
        answer: "Deep cleaning and laser treatment are generally comfortable and can be performed with minimal anesthesia. Discomfort, if any, is mild and temporary.",
      },
      {
        question: "Can gum disease be cured completely?",
        answer: "Early gingivitis can be reversed with timely care. Advanced periodontitis can be controlled and stabilized, but long-term maintenance is required to prevent recurrence.",
      },
      {
        question: "How often should I return for maintenance?",
        answer: "Patients with gum disease typically need periodontal maintenance every 3–4 months, unlike regular cleanings every 6 months.",
      },
    ],
  },
  "restorative-dentistry": {
    title: "Restorative Dentistry",
    image: IMAGES.services.restorativeDentistry,
    overview: "Restorative dentistry focuses on repairing damaged, decayed, or missing teeth to restore function, appearance, and oral health. Whether your tooth has a cavity, crack, wear, or has been lost entirely, restorative treatments help bring back strength, proper chewing, and a natural-looking smile. The goal is to preserve as much natural tooth structure as possible while offering long-lasting, comfortable results.",
    whatIs: {
      title: "What Is Restorative Dentistry?",
      content: "Restorative dentistry includes procedures such as tooth-colored fillings, dental crowns, bridges, inlays/onlays, root canal treatment, and dentures. These treatments rebuild decayed or broken teeth, replace missing teeth, and help prevent further complications. Digital imaging and modern materials are used to ensure that restorations look natural, blend seamlessly, and function like normal teeth.",
    },
    whyNeeded: {
      title: "Why Choose Restorative Dentistry?",
      points: [
        "Saves and protects natural teeth",
        "Restores function – chewing, speaking, and bite balance",
        "Prevents tooth pain, infection, and future dental issues",
        "Improves smile appearance with tooth-colored, natural results",
        "Long-lasting solutions tailored to each patient’s needs",
      ],
    },
    benefits: [
      "Restored chewing function",
      "Natural-looking smile",
      "Prevention of further decay",
      "Long-lasting durability",
    ],
    faq: [
      {
        question: "Is restorative treatment painful?",
        answer: "Most procedures are done under local anesthesia, making them painless. Any mild sensitivity after treatment typically settles within a few days.",
      },
      {
        question: "How long do restorations last?",
        answer: "Fillings can last 5–10 years, while crowns and bridges may last 10–15 years or more with good oral care.",
      },
      {
        question: "Do I need a crown or just a filling?",
        answer: "Small cavities only need fillings, but teeth that are cracked, large decay, or root canal–treated often require crowns for strength and protection. Your dentist will evaluate and recommend the best option.",
      },
      {
        question: "Can restorative dentistry fix missing teeth?",
        answer: "Yes — options such as bridges, dentures, and dental implants help replace missing teeth, restore chewing ability, and maintain jawbone health.",
      },
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
      <div className="relative h-[35vh] min-h-[280px] overflow-hidden">
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
              <h1 className="text-2xl sm:text-3xl font-black text-white md:text-5xl">
                {service.title}
              </h1>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-page py-8 sm:py-12 md:py-16 px-4 sm:px-0">
        <div className="mx-auto max-w-4xl">
          {/* Overview */}
          <section>
            <Reveal width="100%">
              <h2 className="text-xl sm:text-2xl font-black text-brand-600">OVERVIEW:</h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
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
          <section className="mt-8 sm:mt-12">
            <Reveal width="100%">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-brand-600">
                {service.whatIs.title}
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                {service.whatIs.content}
              </p>
            </Reveal>
          </section>

          {/* Why Needed */}
          <section className="mt-8 sm:mt-12">
            <Reveal width="100%">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-brand-600">
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

          {/* FAQ */}
          {service.faq && (
            <section className="mt-8 sm:mt-12">
              <Reveal width="100%">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-brand-600">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6">
                  {service.faq.map((item, i) => (
                    <FAQItem key={i} question={item.question} answer={item.answer} />
                  ))}
                </div>
              </Reveal>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

