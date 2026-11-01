import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, Send, CheckCircle, Smartphone, HelpCircle } from 'lucide-react';
import { playBeep, playChime, playPhoneBuzz } from '../utils/audio';

export const ConciergeSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dates, setDates] = useState('');
  const [suiteType, setSuiteType] = useState('Executive 1-Bedroom at Cassabela');
  const [nights, setNights] = useState(2);
  const [message, setMessage] = useState('');
  const [buzzActive, setBuzzActive] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleSimulateCall = () => {
    setBuzzActive(true);
    playPhoneBuzz();
    setTimeout(() => {
      setBuzzActive(false);
      window.location.href = 'tel:0720558431';
    }, 900);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    playPhoneBuzz();

    const formatted = encodeURIComponent(
      `Hello Kisumu Edijim Manager,\n\nI want to inquire about booking at Cassabela Apartments (Tom Mboya Estate, Kisumu).\n\n- Name: ${name || 'Guest'}\n- Phone: ${phone || 'Not provided'}\n- Suite: ${suiteType}\n- Planned Duration: ${nights} Night(s)\n- Preferred Dates: ${dates || 'To be scheduled'}\n- Note: ${message || 'Standard inquiry'}\n\nPlease share availability and booking confirmation.`
    );

    window.open(`https://wa.me/254720558431?text=${formatted}`, '_blank');
  };

  const faqs = [
    {
      q: 'How do I check in upon arrival at Cassabela Apartments?',
      a: 'Check-in is effortless! We offer flexible self-check-in anytime after 12:00 PM. Entrance instructions and digital codes are provided directly on WhatsApp, and the on-site team is available if you need any assistance.',
    },
    {
      q: 'What payment options are accepted for reservations?',
      a: 'We accept M-Pesa (Buy Goods / Paybill), direct bank transfers (Pesalink / RTGS), and standard card payments. No booking fees or hidden charges.',
    },
    {
      q: 'Is there a dedicated study desk and workspace in the apartment?',
      a: 'Yes! The apartments feature a solid wooden study desk and chair with natural window daylight, ideal for reading, laptop work, and quiet studying.',
    },
    {
      q: 'Is on-site parking safe and free?',
      a: 'Yes, Cassabela Apartments features secure perimeter fencing with electric wires, 24/7 security guards, and free reserved parking inside the gated compound.',
    },
  ];

  return (
    <section className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Contact Us & Direct Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Connect Directly with the Host
          </h2>
          <p className="text-sm text-neutral-400">
            Skip OTA platform commissions and book directly with Kisumu Edijim AirBnB. Responsive 24/7 assistance for questions, special requests, and instant confirmation.
          </p>
        </div>

        {/* Contact Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Phone Buzz Card & Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Phone Buzz Card */}
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 relative overflow-hidden shadow-2xl">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">
                  Host Hotline · Call / SMS / WhatsApp
                </div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white font-mono">
                  0720 558431
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  International callers: <span className="text-neutral-200 font-mono">+254 720 558431</span>. Manager available for immediate inquiries and luggage check-in coordination.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSimulateCall}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      buzzActive
                        ? 'bg-amber-300 text-neutral-950 scale-95 animate-pulse'
                        : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md shadow-amber-400/20 active:scale-95'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{buzzActive ? 'Buzzing Phone...' : 'Call 0720 558431'}</span>
                  </button>

                  <a
                    href="https://wa.me/254720558431?text=Hello%20Kisumu%20Edijim%20AirBnB,%20I%20would%20like%20to%20inquire%20about%20booking%20at%20Cassabela%20Apartments."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playPhoneBuzz()}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Physical Location</div>
                  <div className="text-neutral-400 mt-0.5">
                    Cassabela Apartments, Opposite Metropark Hotel, Tom Mboya Estate, Kisumu
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">
                    1-min walk to Victoria Comfort Inn & Pinecone Hotel · Boda Boda transport available
                  </div>
                  <div className="text-amber-400/90 font-mono mt-1 text-[11px]">Plus Code: WQ77+XH Kisumu</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-neutral-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Operating Hours</div>
                  <div className="text-neutral-400 mt-0.5">
                    Front Desk & Inquiries: 24/7 Available
                  </div>
                  <div className="text-neutral-400">Check-in: 12:00 PM | Check-out: 10:00 AM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Dispatch Inquiry Form */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-6">
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Send a Direct Booking Request
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Fill out your details to receive instant rates and availability directly via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Simon Kabuu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0720 558431"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Apartment Preference
                  </label>
                  <select
                    value={suiteType}
                    onChange={(e) => setSuiteType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Edijim Studio Apartment (Max 2 Guests)">Edijim Studio Apartment (Max 2 Guests)</option>
                    <option value="Edijim Executive One-Bedroom (Max 2 Guests)">Edijim Executive One-Bedroom (Max 2 Guests)</option>
                    <option value="Edijim Two-Bedroom Apartment (Max 4 Guests)">Edijim Two-Bedroom Apartment (Max 4 Guests)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Number of Nights
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Target Travel Dates
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next weekend, 15th to 18th November"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Notes or Inquiries
                </label>
                <textarea
                  rows={3}
                  placeholder="Need airport pickup? Cooking essentials? High-speed workstation?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Booking</span>
              </button>
            </form>
          </div>
        </div>

        {/* Guest FAQs */}
        <div className="mt-20 pt-12 border-t border-neutral-800 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Everything you need to know about booking and staying with Kisumu Edijim AirBnB.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/70 overflow-hidden"
              >
                <button
                  onClick={() => {
                    playBeep(620, 0.04);
                    setFaqOpen(faqOpen === idx ? null : idx);
                  }}
                  className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <span className="text-amber-400 font-mono text-base">
                    {faqOpen === idx ? '−' : '+'}
                  </span>
                </button>
                {faqOpen === idx && (
                  <div className="p-4 pt-0 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
