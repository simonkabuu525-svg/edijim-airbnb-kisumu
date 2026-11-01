import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Phone, MessageSquare, Menu, X, Sparkles } from 'lucide-react';
import { PageView } from '../types';
import { isSoundEnabled, setSoundEnabled, playBeep, playPhoneBuzz } from '../utils/audio';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenQuickInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenQuickInquiry,
}) => {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) {
      playBeep(780, 0.1);
    }
  };

  const handleNavClick = (page: PageView) => {
    playBeep(640, 0.06);
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCallHost = (e: React.MouseEvent) => {
    playPhoneBuzz();
    // Allow default tel link to open or proceed
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full overflow-x-clip ${
        scrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-2.5 sm:py-3.5'
          : 'bg-neutral-950/85 backdrop-blur-sm border-b border-neutral-800/50 py-3 sm:py-4'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* Zone 1: Single element Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left font-bold tracking-tight text-white shrink flex items-center gap-2 sm:gap-2.5 focus:outline-none min-w-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-neutral-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
              KE
            </div>
            <div className="min-w-0">
              <span className="font-display tracking-tight text-white group-hover:text-amber-400 transition-colors text-xs xs:text-sm sm:text-base lg:text-lg block leading-tight truncate">
                Edijim AirBnB Kisumu
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-amber-400/90 block font-sans font-semibold leading-tight truncate">
                Cassabela Apartments
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Responsive: compact on lg, expanded on xl) */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-7 text-xs xl:text-sm font-medium text-neutral-300 shrink min-w-0">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap py-1 ${
                currentPage === 'home' ? 'text-amber-400 font-semibold border-b border-amber-400' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('apartments')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap py-1 ${
                currentPage === 'apartments' ? 'text-amber-400 font-semibold border-b border-amber-400' : ''
              }`}
            >
              <span className="xl:inline hidden">Suites & Apartments</span>
              <span className="xl:hidden">Suites</span>
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap py-1 ${
                currentPage === 'location' ? 'text-amber-400 font-semibold border-b border-amber-400' : ''
              }`}
            >
              <span className="xl:inline hidden">Location & Estate</span>
              <span className="xl:hidden">Location</span>
            </button>
            <button
              onClick={() => handleNavClick('blogs')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap py-1 ${
                currentPage === 'blogs' || currentPage === 'blog-detail' ? 'text-amber-400 font-semibold border-b border-amber-400' : ''
              }`}
            >
              <span className="xl:inline hidden">Kisumu Journal & SEO</span>
              <span className="xl:hidden">Journal</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap py-1 ${
                currentPage === 'contact' ? 'text-amber-400 font-semibold border-b border-amber-400' : ''
              }`}
            >
              <span className="xl:inline hidden">Contact Us</span>
              <span className="xl:hidden">Contact</span>
            </button>
          </nav>

          {/* Zone 3: Actions + Sound Toggle + Inquire CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Interactive Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundOn ? 'Interactive Audio ON (Click to Mute)' : 'Interactive Audio Muted (Click to Enable)'}
              aria-label="Toggle sound and haptics"
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border transition-all text-xs flex items-center gap-1.5 shrink-0 ${
                soundOn
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-500 hover:text-neutral-400'
              }`}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span className="hidden md:inline text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">
                {soundOn ? 'FX ON' : 'FX OFF'}
              </span>
            </button>

            {/* Quick Phone Call link (displayed on wide screens to prevent laptop overcrowding) */}
            <a
              href="tel:0720558431"
              onClick={handleCallHost}
              title="Call Kisumu Edijim Host: 0720 558431"
              className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-all hover:shadow-lg hover:shadow-amber-500/5 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono">0720 558431</span>
            </a>

            {/* Primary Action Button: Inquire & Reserve (Always 100% visible on mobile & desktop) */}
            <button
              onClick={() => {
                playPhoneBuzz();
                onOpenQuickInquiry();
              }}
              className="px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/25 active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1 sm:gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="inline sm:hidden font-bold">Inquire</span>
              <span className="hidden sm:inline font-bold">Inquire & Reserve</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-neutral-300 hover:text-white rounded-lg focus:outline-none shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 text-base font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 hover:text-amber-400 ${
                currentPage === 'home' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('apartments')}
              className={`text-left py-2 hover:text-amber-400 ${
                currentPage === 'apartments' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              Suites & Apartments Catalog
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className={`text-left py-2 hover:text-amber-400 ${
                currentPage === 'location' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              Cassabela Location & Estate Guide
            </button>
            <button
              onClick={() => handleNavClick('blogs')}
              className={`text-left py-2 hover:text-amber-400 ${
                currentPage === 'blogs' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              Kisumu Travel & SEO Journal
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2 hover:text-amber-400 ${
                currentPage === 'contact' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-3 space-y-3 border-t border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                playPhoneBuzz();
                onOpenQuickInquiry();
              }}
              className="w-full py-3 px-4 text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-98 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Inquire & Reserve Apartment</span>
            </button>

            <div className="flex items-center justify-between pt-1">
              <a
                href="tel:0720558431"
                onClick={handleCallHost}
                className="flex items-center gap-2 text-xs text-amber-400 font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>Call 0720 558431</span>
              </a>
              <a
                href="https://wa.me/254720558431?text=Hello%20Kisumu%20Edijim%20AirBnB,%20I%20would%20like%20to%20inquire%20about%20availability%20at%20Cassabela%20Apartments."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playPhoneBuzz()}
                className="flex items-center gap-1.5 text-xs bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Host</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
