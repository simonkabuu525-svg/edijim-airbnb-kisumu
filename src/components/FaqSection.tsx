import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Phone, MessageSquare, ShieldCheck, Clock, Ban, Dog, Flame, Droplet, Wifi } from 'lucide-react';
import { playBeep, playPhoneBuzz } from '../utils/audio';

interface FaqItem {
  id: string;
  category: 'Policies' | 'Stay & Timing' | 'Amenities & Location';
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: 'pet-policy',
    category: 'Policies',
    question: 'Are pets allowed at Edijim AirBnB Kisumu?',
    answer:
      'To maintain pristine cleanliness, hygiene, and a hypoallergenic environment for all our guests, pets are generally not permitted inside the apartments. Certified service animals may be accommodated with prior coordination with the property management desk.',
    icon: <Dog className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'smoking-policy',
    category: 'Policies',
    question: 'What is the smoking policy inside the apartments?',
    answer:
      'All indoor suites—including bedrooms, living rooms, and private bathrooms—are strictly 100% smoke-free to ensure a fresh, welcoming space. Guests who wish to smoke may do so in designated outdoor open-air areas on the compound grounds or designated open verandas.',
    icon: <Ban className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'late-checkout-early-checkin',
    category: 'Stay & Timing',
    question: 'Can I arrange for early check-in or late check-out?',
    answer:
      'Standard check-in begins at 12:00 PM (noon) and standard check-out is at 10:00 AM. We gladly accommodate early check-in and extended late check-out requests whenever scheduling permits between departures and cleanings. Simply notify our manager on WhatsApp (0720 558431) in advance, and complimentary secure luggage holding is always available.',
    icon: <Clock className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'self-checkin',
    category: 'Stay & Timing',
    question: 'How does the contactless self-check-in system work?',
    answer:
      'Our seamless self-check-in allows you to arrive flexibly at any hour after 12:00 PM. Prior to your arrival, our manager sends you your private entrance instructions and digital lockbox code via WhatsApp or SMS, so you can settle in immediately without waiting for a key handover.',
    icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'water-hot-shower',
    category: 'Amenities & Location',
    question: 'Is there guaranteed hot water and backup water supply?',
    answer:
      'Yes! Every suite is fitted with an instant water heater providing reliable, high-pressure hot showers anytime. In addition, Cassabela Apartments features dedicated large-capacity backup water storage tanks, guaranteeing uninterrupted 24/7 water supply throughout your entire stay in Kisumu.',
    icon: <Droplet className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'study-desk-workspace',
    category: 'Amenities & Location',
    question: 'Is there a quiet study desk and dedicated workspace for reading and work?',
    answer:
      'Yes! Every suite includes a solid wooden study desk and comfortable chair with good natural lighting from the window, offering a calm, uncluttered space for reading, laptop work, and personal studies.',
    icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'parking-security',
    category: 'Amenities & Location',
    question: 'Is parking available and how secure is the compound?',
    answer:
      'Ample free on-site parking is available inside the compound. The property is secured with 24/7 gated security guards, perimeter boundary walls, and CCTV surveillance, ensuring complete safety for your vehicle and belongings.',
    icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'direct-booking-benefits',
    category: 'Policies',
    question: 'What are the benefits of booking directly with the Edijim manager?',
    answer:
      'Booking directly via our phone or WhatsApp (0720 558431) eliminates platform commission surcharges, gives you direct access to the on-site manager, allows tailored long-stay rates (weekly/monthly), and supports fast local payment methods including M-Pesa.',
    icon: <Flame className="w-4 h-4 text-amber-400" />,
  },
];

interface FaqSectionProps {
  onOpenInquiry?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenInquiry }) => {
  const [openId, setOpenId] = useState<string | null>('pet-policy');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Policies', 'Stay & Timing', 'Amenities & Location'];

  const handleToggle = (id: string) => {
    playBeep(620, 0.04);
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQS_DATA.filter(
    (faq) => selectedCategory === 'All' || faq.category === selectedCategory
  );

  return (
    <section
      id="faq-section"
      className="py-20 bg-neutral-900/60 border-t border-neutral-800 relative overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[11px] sm:text-xs font-mono uppercase tracking-widest font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guest Information & Policies</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about staying at Edijim AirBnB Kisumu—from our pet and smoking policies to flexible late check-out, instant hot showers, and self-check-in.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playBeep(560, 0.03);
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                  : 'bg-neutral-950/80 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3" role="region" aria-label="FAQ Accordion">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-950 border-amber-400/50 shadow-xl shadow-amber-500/5'
                    : 'bg-neutral-950/70 border-neutral-800/90 hover:border-neutral-700'
                }`}
              >
                <button
                  onClick={() => handleToggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                          : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                      }`}
                    >
                      {faq.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400 bg-amber-400/10' : 'text-neutral-500 bg-neutral-900'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pl-14 sm:pl-16">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have more questions banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-xs sm:text-sm font-bold text-white">
              Have a specific question or custom travel request?
            </div>
            <div className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
              Our Kisumu hospitality desk is reachable 24/7 on WhatsApp or direct phone.
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://wa.me/254720558431?text=Hello%20Edijim%20AirBnB,%20I%20have%20a%20question%20regarding%20my%20upcoming%20stay%20in%20Kisumu."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playPhoneBuzz()}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask via WhatsApp</span>
            </a>

            <a
              href="tel:0720558431"
              onClick={() => playPhoneBuzz()}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>0720 558431</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
