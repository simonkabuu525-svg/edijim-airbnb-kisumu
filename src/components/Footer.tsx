import React from 'react';
import { MapPin, Phone, MessageSquare, Star, ArrowUp, Navigation } from 'lucide-react';
import { PageView } from '../types';
import { playBeep, playPhoneBuzz } from '../utils/audio';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    playBeep(880, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (p: PageView) => {
    playBeep(640, 0.04);
    onNavigate(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-neutral-950 font-black text-sm">
                KE
              </div>
              <span className="font-display font-bold text-lg text-white">
                Edijim AirBnB Kisumu
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Modern furnished residences at Cassabela Apartments, opposite Metropark Hotel, Tom Mboya Estate, Kisumu. Self-check-in, 24/7 backup water storage, fast Wi-Fi, and 24/7 security.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-amber-400 font-bold font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.5 / 5.0</span>
              </span>
              <span>·</span>
              <span>12 Verified Google Business Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">
              Explore
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('apartments')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Apartment Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('location')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Cassabela Location Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blogs')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Kisumu SEO Travel Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact Us & Direct Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNav('home');
                    setTimeout(() => {
                      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Guest FAQs & Policies
                </button>
              </li>
            </ul>
          </div>

          {/* Location Details */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">
              Physical Location
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Cassabela Apartments (Opposite Metropark Hotel)<br />
              Tom Mboya Estate<br />
              1-min walk to Victoria Comfort Inn & Pinecone Hotel<br />
              Kisumu, Kenya
            </p>
            <div className="text-amber-400 font-mono text-[11px]">
              Plus Code: WQ77+XH Kisumu
            </div>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">
              Host Hotline
            </div>
            <div className="space-y-2">
              <a
                href="tel:0720558431"
                onClick={() => playPhoneBuzz()}
                className="flex items-center gap-2 text-white font-mono hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>0720 558431</span>
              </a>
              <a
                href="https://wa.me/254720558431?text=Hello%20Kisumu%20Edijim%20AirBnB"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playPhoneBuzz()}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Message</span>
              </a>
            </div>
          </div>
        </div>

        {/* SEO Tag Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Kisumu Edijim AirBnB · Cassabela Apartments, Tom Mboya Estate, Kisumu. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
