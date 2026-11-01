import React, { useState } from 'react';
import { Star, MapPin, Calendar, Users, Home, Search, ArrowRight, ShieldCheck, Sparkles, Wifi, Car, Coffee, PhoneCall } from 'lucide-react';
import { playBeep, playChime, playPhoneBuzz } from '../utils/audio';

interface HeroSectionProps {
  onSearch: (filters: { estate: string; type: string; guests: number }) => void;
  onExploreSuites: () => void;
  onOpenContact: () => void;
}

// Single AI-generated hero image inspired by sorelikehomes.com (no looping slideshow)
const HERO_IMAGE = '/assets/images/sorelike_style_hero_1793474939989.jpg';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onExploreSuites,
  onOpenContact,
}) => {
  const [selectedEstate, setSelectedEstate] = useState('Tom Mboya Estate');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedGuests, setSelectedGuests] = useState(2);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playChime();
    onSearch({
      estate: selectedEstate,
      type: selectedType,
      guests: selectedGuests,
    });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 overflow-hidden bg-neutral-950">
      {/* Single Static Realistic Luxury Interior Hero Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Edijim Staycation Luxury Interior in Kisumu"
          className="w-full h-full object-cover object-center scale-100"
          loading="eager"
          decoding="async"
          // React expects camelCase fetchPriority
          fetchPriority="high"
        />

        {/* Refined contrast scrim: ensures text is crisp on both mobile and desktop while preserving warm lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/60 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          {/* Trust Badge & Google Rating */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-neutral-950/90 border border-neutral-700/80 backdrop-blur-md text-[11px] sm:text-xs shadow-xl flex-wrap">
            <span className="flex items-center gap-1 text-amber-400 font-bold font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.5 / 5.0</span>
            </span>
            <span className="text-neutral-500" aria-hidden="true">·</span>
            <span className="text-neutral-300 font-medium">12 Google Verified Reviews</span>
            <span className="text-neutral-500 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-amber-400 font-medium hidden sm:inline">Edijim Staycation</span>
          </div>

          {/* Hero Headline - Responsive mobile typography */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15] text-balance drop-shadow-md">
            Edijim Staycation in{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Kisumu
            </span>
          </h1>

          {/* Value proposition & exact location */}
          <p className="text-xs sm:text-base lg:text-lg text-neutral-200 leading-relaxed font-sans max-w-2xl drop-shadow">
            Modern self-check-in apartments strategically located{' '}
            <span className="text-white font-semibold underline decoration-amber-400/80 underline-offset-4">
              opposite Metropark Hotel
            </span>{' '}
            in Tom Mboya Estate (1-min walk to Victoria Comfort Inn & Pinecone Hotel). Equipped with 24/7 backup water storage, instant hot showers, comfortable study tables, and fully equipped kitchens.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <button
              onClick={() => {
                playChime();
                onExploreSuites();
              }}
              className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Explore Available Units</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playPhoneBuzz();
                onOpenContact();
              }}
              className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-medium text-xs sm:text-sm text-white bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-700/80 backdrop-blur-md transition-all hover:border-amber-400/50 flex items-center justify-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Contact Us: 0720 558431</span>
            </button>
          </div>
        </div>

        {/* Interactive Booking & Availability Search Bar */}
        <div className="mt-10 bg-neutral-950/90 backdrop-blur-xl border border-neutral-700/90 rounded-2xl p-4 sm:p-5 shadow-2xl">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location selector */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Location</span>
              </label>
              <select
                value={selectedEstate}
                onChange={(e) => {
                  playBeep(600, 0.04);
                  setSelectedEstate(e.target.value);
                }}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="Tom Mboya Estate" className="bg-neutral-900">Tom Mboya (Opp. Metropark Hotel)</option>
                <option value="All" className="bg-neutral-900">All Kisumu</option>
              </select>
            </div>

            {/* Suite Type */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                <span>Unit Type</span>
              </label>
              <select
                value={selectedType}
                onChange={(e) => {
                  playBeep(620, 0.04);
                  setSelectedType(e.target.value);
                }}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-neutral-900">All Available Units</option>
                <option value="Studio" className="bg-neutral-900">Studio Apartment (Max 2)</option>
                <option value="1 Bedroom" className="bg-neutral-900">One-Bedroom Apartment (Max 2)</option>
                <option value="2 Bedroom" className="bg-neutral-900">Two-Bedroom Apartment (Max 4)</option>
              </select>
            </div>

            {/* Guests */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Guest Count</span>
              </label>
              <select
                value={selectedGuests}
                onChange={(e) => {
                  playBeep(640, 0.04);
                  setSelectedGuests(Number(e.target.value));
                }}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-neutral-900">1 Guest (Studio / 1-Bed)</option>
                <option value={2} className="bg-neutral-900">2 Guests (Studio / 1-Bed)</option>
                <option value={3} className="bg-neutral-900">3 Guests (Two-Bedroom)</option>
                <option value={4} className="bg-neutral-900">4 Guests (Two-Bedroom)</option>
              </select>
            </div>

            {/* Search Action */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2 h-[46px]"
              >
                <Search className="w-4 h-4" />
                <span>Check Availability</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Amenity Highlights Strip - Fully responsive on mobile screens */}
      <div className="relative z-10 border-t border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md pt-4 pb-3 sm:pt-5 sm:pb-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-[11px] sm:text-xs text-neutral-300">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-white truncate">High-Speed Fibre WiFi</div>
                <div className="text-[10px] sm:text-[11px] text-neutral-400 truncate">Reliable for video calls</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-white truncate">24/7 Gated Security</div>
                <div className="text-[10px] sm:text-[11px] text-neutral-400 truncate">CCTV & manned guard gate</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-white truncate">Free Secure Parking</div>
                <div className="text-[10px] sm:text-[11px] text-neutral-400 truncate">Dedicated parking bays</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-white truncate">Equipped Kitchens</div>
                <div className="text-[10px] sm:text-[11px] text-neutral-400 truncate">Full cooking appliances</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
