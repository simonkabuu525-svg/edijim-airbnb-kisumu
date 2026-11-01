import React, { useState } from 'react';
import { X, Sparkles, MessageSquare, Phone, Check, Send } from 'lucide-react';
import { PROPERTIES_DATA } from '../data/properties';
import { playBeep, playPhoneBuzz } from '../utils/audio';

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [suiteId, setSuiteId] = useState(PROPERTIES_DATA[0].id);
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPhoneBuzz();

    const selectedProp = PROPERTIES_DATA.find((p) => p.id === suiteId) || PROPERTIES_DATA[0];
    const msg = encodeURIComponent(
      `Hello Edijim Staycation,\n\nI want to reserve a unit at Cassabela Apartments (Opposite Metropark Hotel, Tom Mboya Estate, Kisumu).\n- Unit: ${selectedProp.title}\n- Name: ${name || 'Guest'}\n- Phone: ${phone || 'Not provided'}\n- Dates: ${dates || 'To be decided'}\n- Guests: ${guests}\n\nPlease confirm availability and rates.`
    );

    window.open(`https://wa.me/254720558431?text=${msg}`, '_blank');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-neutral-100">
        <button
          onClick={() => {
            playBeep(440, 0.05);
            onClose();
          }}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Host Inquiry</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">
            Reserve Your Edijim Staycation
          </h2>
          <p className="text-xs text-neutral-400">
            Direct reservation opposite Metropark Hotel, Tom Mboya Estate, Kisumu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Select Suite
            </label>
            <select
              value={suiteId}
              onChange={(e) => setSuiteId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {PROPERTIES_DATA.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.propertyType})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Simon Kabuu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                WhatsApp Phone
              </label>
              <input
                type="tel"
                required
                placeholder="0720 558431"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Travel Dates
              </label>
              <input
                type="text"
                placeholder="e.g. Nov 14 - Nov 18"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Booking</span>
          </button>

          <div className="text-center pt-2">
            <a
              href="tel:0720558431"
              onClick={() => playPhoneBuzz()}
              className="text-xs text-amber-400 hover:text-amber-300 font-mono inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Or Call Host Directly: 0720 558431</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
