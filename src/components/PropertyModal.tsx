import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Users, Wifi, Tv, Flame, Shield, Check, Phone, MessageSquare, Copy, CheckCheck, Key, Droplet, Dumbbell, ShoppingBag, Scissors, Bike, Send } from 'lucide-react';
import { Property } from '../types';
import { playBeep, playChime, playPhoneBuzz } from '../utils/audio';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  if (!property) return null;

  const [activeImage, setActiveImage] = useState(0);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(Math.min(2, property.guests));
  const [specialRequest, setSpecialRequest] = useState('');

  // Exactly 2 curated images per showcase for fast and smooth operation
  const displayImages = property.images.slice(0, 2);

  const handleCopyCode = () => {
    playBeep(880, 0.08);
    navigator.clipboard.writeText('WQ77+XH Kisumu');
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2500);
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    playPhoneBuzz();

    const message = encodeURIComponent(
      `Hello Edijim Staycation,\nI would like to book "${property.title}" (opposite Metropark Hotel, Tom Mboya Estate, Kisumu).\n\nDetails:\n- Name: ${guestName || 'Guest'}\n- Phone: ${guestPhone || 'Not provided'}\n- Check-in: ${checkIn || 'To be confirmed'}\n- Check-out: ${checkOut || 'To be confirmed'}\n- Guests: ${guestsCount}\n- Special Request: ${specialRequest || 'None'}\n\nPlease share the available rates and confirmation details.`
    );

    const url = `https://wa.me/254720558431?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectCall = () => {
    playPhoneBuzz();
    window.location.href = 'tel:0720558431';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-neutral-100 max-h-[92vh] flex flex-col my-auto">
        {/* Header bar */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-neutral-800 flex items-start justify-between gap-3 bg-neutral-950/95 sticky top-0 z-20">
          <div className="min-w-0 flex-1">
            <h2 className="font-display font-bold text-base sm:text-xl text-white leading-snug break-words">
              {property.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-neutral-400 mt-1">
              <span className="shrink-0">Edijim Staycation</span>
              <span className="hidden xs:inline text-neutral-600">·</span>
              <span className="text-amber-400 font-medium">Opposite Metropark Hotel, Tom Mboya Estate</span>
            </div>
          </div>
          <button
            onClick={() => {
              playBeep(440, 0.05);
              onClose();
            }}
            aria-label="Close dialog"
            className="p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors shrink-0 -mr-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 flex-1">
          {/* Two-image showcase (clean, fast, responsive) */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <img
                src={displayImages[activeImage] || displayImages[0]}
                alt={property.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 bg-neutral-950/85 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono text-neutral-300 border border-white/10 shadow-lg">
                Photo {activeImage + 1} of {displayImages.length}
              </div>
            </div>

            {/* Two-image selection buttons (grid on small screens, flex on larger to prevent overlapping) */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playBeep(600, 0.04);
                    setActiveImage(idx);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all justify-center sm:justify-start ${
                    idx === activeImage
                      ? 'border-amber-400 bg-amber-400/10 text-amber-400 shadow-sm'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${property.title} thumbnail ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-6 object-cover rounded shrink-0"
                  />
                  <span className="truncate">Showcase View {idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar adhering to owner's exact units */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-center">
            <div>
              <div className="text-xs text-neutral-400">Bedrooms</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Bathroom</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">1 Private Bath</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Capacity</div>
              <div className="text-base font-bold text-amber-400 font-mono mt-0.5">Max {property.guests} Guests</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Access</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">Self-Check-In</div>
            </div>
          </div>

          {/* Description & Convenient Location Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">About This Staycation Unit</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">{property.description}</p>
              </div>

              {/* Verified Owner Amenities & Features */}
              <div>
                <h4 className="font-semibold text-sm text-amber-400 mb-3 uppercase tracking-wider text-xs">
                  Amenities & Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800 text-xs text-neutral-200">
                    <Key className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Self-check-in system for convenient access</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800 text-xs text-neutral-200">
                    <Droplet className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>24/7 water supply with backup water storage</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800 text-xs text-neutral-200">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Fully equipped kitchen</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800 text-xs text-neutral-200">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Dedicated study desk & comfortable chair</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800 text-xs text-neutral-200">
                    <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Hot shower with instant water heater</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800 text-xs text-neutral-200">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Comfortable bed with fresh linen</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800 text-xs text-neutral-200 sm:col-span-2">
                    <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Ample parking with 24/7 security</span>
                  </div>
                </div>
              </div>

              {/* Owner's Strategic Location Matrix */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <MapPin className="w-4 h-4" />
                    <span>Strategically Located Opposite Metropark Hotel</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-300 font-mono transition-colors"
                  >
                    {copiedPlusCode ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPlusCode ? 'Copied WQ77+XH' : 'Plus Code: WQ77+XH'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 pt-1">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Victoria Comfort Inn – 1-min walk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pinecone Hotel – 1-min walk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nearby gym & fitness facilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Shops & shopping outlets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scissors className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nearby salon and barbershop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bike className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Boda Boda transport readily available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Booking & Price Inquiry Form */}
            <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
                  Direct Staycation Reservation
                </div>
                <div className="text-xl font-bold font-mono text-white">
                  {property.pricePlaceholderText}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Direct booking with manager. No middleman commissions.
                </div>

                <form onSubmit={handleWhatsAppBooking} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Simon Kabuu"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0720 558431"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                      Guests (Max {property.guests})
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {Array.from({ length: property.guests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n} className="bg-neutral-900">
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                      Special Request or Inquiries
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Late self check-in PIN request, extra towels..."
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg font-semibold text-xs text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Booking</span>
                  </button>
                </form>

                <div className="mt-3 pt-3 border-t border-neutral-800 text-center">
                  <button
                    onClick={handleDirectCall}
                    className="w-full py-2 rounded-lg text-xs font-semibold text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Host: 0720 558431</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
