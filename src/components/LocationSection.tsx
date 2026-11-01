import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Plane, Train, Car, Copy, CheckCheck, Clock, ExternalLink, Shield } from 'lucide-react';
import { playBeep, playChime } from '../utils/audio';

const GOOGLE_MAPS_LOCATION_URL =
  'https://www.google.com/maps/place/Kisumu+Edijim+AirBnB/@-0.0850107,34.7627748,19z/data=!3m1!4b1!4m6!3m5!1s0x182aa56da7c91eff:0xdb5d063d14c2fca6!8m2!3d-0.0850107!4d34.7639925!16s%2Fg%2F11v03mpwsx?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D';

export const LocationSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'airport' | 'car' | 'train'>('airport');

  const handleCopy = () => {
    playBeep(880, 0.08);
    navigator.clipboard.writeText('WQ77+XH Kisumu');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const openGoogleMaps = () => {
    playChime();
    window.open(GOOGLE_MAPS_LOCATION_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Location Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-amber-400 text-[11px] sm:text-xs font-mono uppercase tracking-widest font-semibold mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Prime Residential Location</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                Edijim Staycation · Cassabela Apartments
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed">
                Strategically located opposite <strong className="text-white">Metropark Hotel</strong> in Tom Mboya Estate, near Kenya Breweries, Kisumu. Enjoy peaceful surroundings with instant access to dining, shopping, and fast local transit.
              </p>
            </div>

            {/* Quick Details Box */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-neutral-400 font-mono uppercase">Full Physical Address</div>
                  <div className="text-sm font-semibold text-white mt-1">
                    Cassabela Apartments (Opposite Metropark Hotel)
                  </div>
                  <div className="text-xs text-neutral-400">Tom Mboya Estate, Near Kenya Breweries, Kisumu, Kenya</div>
                </div>
                <button
                  onClick={openGoogleMaps}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1 shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </button>
              </div>

              {/* Immediate walking distance landmarks */}
              <div className="pt-3 border-t border-neutral-800 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                  Immediate 1-Minute Access
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Victoria Comfort Inn (1 min walk)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Pinecone Hotel (1 min walk)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Nearby gym & fitness</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Shops & retail outlets</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Salon & barbershop</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Boda Boda transport readily available</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-neutral-400 font-mono">Google Maps Plus Code</div>
                  <div className="text-sm font-bold text-amber-400 font-mono">WQ77+XH Kisumu</div>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            {/* Commute Times Matrix */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Key Commute Distances
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                  <span className="text-neutral-300">Kisumu CBD</span>
                  <span className="font-mono font-bold text-amber-400">5–7 Mins</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                  <span className="text-neutral-300">Kisumu Airport (KIS)</span>
                  <span className="font-mono font-bold text-amber-400">12 Mins</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                  <span className="text-neutral-300">Dunga Hill Camp</span>
                  <span className="font-mono font-bold text-amber-400">10 Mins</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                  <span className="text-neutral-300">Impala Sanctuary</span>
                  <span className="font-mono font-bold text-amber-400">8 Mins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Photo + Interactive Pin */}
          <div className="lg:col-span-7 space-y-6">
            {/* Map Visual Component using authentic photo from Google Maps */}
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
              <img
                src="/assets/images/kisumu_google_map_pin_1793474960357.jpg"
                alt="Google Map Satellite and Street View of Kisumu Edijim Staycation Tom Mboya Estate"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* Subtle scrim for pin legibility while keeping image clearly visible */}
              <div className="absolute inset-0 bg-neutral-950/35 backdrop-blur-[1px]" />

              {/* Graphical overlay representing Kisumu coordinates & pin */}
              <div className="absolute inset-0 p-3 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <div className="bg-neutral-950/90 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl border border-neutral-700 text-[10px] sm:text-xs text-white flex items-center gap-1.5 sm:gap-2 shadow-lg min-w-0">
                    <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                    <span className="font-mono font-medium truncate">Tom Mboya · Near Kenya Breweries</span>
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 sm:px-3 sm:py-1 rounded-xl text-[10px] sm:text-xs font-semibold flex items-center gap-1 backdrop-blur-md shrink-0">
                    <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">24/7 Gated Security</span>
                    <span className="sm:hidden">24/7 Security</span>
                  </div>
                </div>

                {/* Central Pin */}
                <div className="self-center bg-neutral-950/95 border-2 border-amber-400 rounded-2xl p-3.5 sm:p-5 shadow-2xl shadow-amber-400/20 max-w-xs sm:max-w-sm text-center transform hover:scale-105 transition-transform backdrop-blur-md mx-2">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-amber-400 text-neutral-950 font-bold flex items-center justify-center mx-auto mb-2 shadow-lg shadow-amber-400/30">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 fill-neutral-950" />
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white">Kisumu Edijim Staycation</h4>
                  <p className="text-[11px] sm:text-xs text-amber-300 font-medium mt-0.5">Opposite Metropark Hotel</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-1">Tom Mboya Estate · Near Kenya Breweries, Kisumu</p>
                  <button
                    onClick={openGoogleMaps}
                    className="mt-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom indicators */}
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-300 bg-neutral-950/85 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-neutral-800">
                  <span className="font-mono text-amber-400">Plus Code: WQ77+XH</span>
                  <span className="truncate">Lake Victoria: 4.2 km · Airport: 7.8 km</span>
                </div>
              </div>
            </div>

            {/* Transit Arrival Tabs */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                <button
                  onClick={() => setActiveTab('airport')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'airport'
                      ? 'bg-amber-400 text-neutral-950'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>Arriving by Air (KIS)</span>
                </button>
                <button
                  onClick={() => setActiveTab('car')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'car'
                      ? 'bg-amber-400 text-neutral-950'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Driving / Taxi / Uber</span>
                </button>
                <button
                  onClick={() => setActiveTab('train')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'train'
                      ? 'bg-amber-400 text-neutral-950'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Train className="w-3.5 h-3.5" />
                  <span>Train / SGR Transit</span>
                </button>
              </div>

              {activeTab === 'airport' && (
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Kisumu International Airport (KIS) is approximately 12 minutes drive away. Uber, Bolt, and pre-arranged airport transfers drop you directly at the main entrance gate of Cassabela Apartments in Tom Mboya Estate.
                </p>
              )}

              {activeTab === 'car' && (
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Head towards Kenya Breweries in Kisumu. Turn into Tom Mboya Estate; Cassabela Apartments is clearly signposted with secure double-gate access and ample paved internal parking bays.
                </p>
              )}

              {activeTab === 'train' && (
                <p className="text-xs text-neutral-300 leading-relaxed">
                  From the Kisumu Railway Station, take a 7-minute ride through the CBD straight into Tom Mboya Estate. Host luggage assistance is available upon request.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
