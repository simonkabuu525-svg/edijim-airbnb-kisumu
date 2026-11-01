/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, Property, BlogPost } from './types';
import { PROPERTIES_DATA } from './data/properties';
import { BLOGS_DATA } from './data/blogs';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { ApartmentsCatalog } from './components/ApartmentsCatalog';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { BlogArticleView } from './components/BlogArticleView';
import { ConciergeSection } from './components/ConciergeSection';
import { Footer } from './components/Footer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { ArrowRight, Star, Shield, Sparkles, Key, Tv, Flame, Utensils, Award } from 'lucide-react';
import { playBeep, playChime, playPhoneBuzz } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [quickInquiryOpen, setQuickInquiryOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState<{ estate: string; type: string; guests: number } | null>(null);

  // SEO Page Title synchronization
  useEffect(() => {
    if (currentPage === 'home') {
      document.title = 'Edijim AirBnB Kisumu | Luxury Furnished Apartments Cassabela';
    } else if (currentPage === 'apartments') {
      document.title = 'Available Units | Edijim AirBnB Kisumu';
    } else if (currentPage === 'location') {
      document.title = 'Location & Metropark Hotel Guide | Edijim AirBnB Kisumu';
    } else if (currentPage === 'blogs') {
      document.title = 'Kisumu Travel & Living Journal | Edijim AirBnB Kisumu';
    } else if (currentPage === 'blog-detail' && selectedBlog) {
      document.title = `${selectedBlog.metaTitle} | Edijim AirBnB Kisumu`;
    } else if (currentPage === 'contact') {
      document.title = 'Contact Us & Direct Booking | Edijim AirBnB Kisumu';
    }
  }, [currentPage, selectedBlog]);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = (filters: { estate: string; type: string; guests: number }) => {
    setSearchFilter(filters);
    setCurrentPage('apartments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleQuickBookProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedBlog(post);
    setCurrentPage('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950 w-full overflow-x-clip">
      {/* Universal Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuickInquiry={() => setQuickInquiryOpen(true)}
      />

      {/* Main Page View Switcher */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="space-y-0">
            {/* 1. Cinematic Hero Section */}
            <HeroSection
              onSearch={handleHeroSearch}
              onExploreSuites={() => handleNavigate('apartments')}
              onOpenContact={() => handleNavigate('contact')}
            />

            {/* 2. Featured Units Showcase (Single Realistic Image Mode) */}
            <section className="py-20 bg-neutral-950 border-t border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
                  <div>
                    <div className="text-amber-400 text-[11px] sm:text-xs font-mono uppercase tracking-widest font-semibold mb-2">
                      Edijim Staycation · Cassabela Apartments
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                      Available Staycation Units
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl leading-relaxed">
                      Studio (max 2), One-Bedroom (max 2), and Two-Bedroom (max 4) apartments. Each with private bathroom, self-check-in, and 24/7 water backup.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      playBeep(640, 0.04);
                      handleNavigate('apartments');
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider shrink-0"
                  >
                    <span>View All Units ({PROPERTIES_DATA.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3-Column Grid with single realistic image per card */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PROPERTIES_DATA.filter((p) => p.featured).map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={handleSelectProperty}
                      onQuickBook={handleQuickBookProperty}
                      singleImageOnly={true}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Distinctive Hospitality Experience - Owner Amenities */}
            <section className="py-20 bg-neutral-900 border-t border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Edijim Standard</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                    Every Unit Includes
                  </h2>
                  <p className="text-sm text-neutral-400">
                    Thoughtfully curated comfort and security at Cassabela Apartments, opposite Metropark Hotel.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 hover:border-amber-400/40 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                      <Key className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Self-Check-In & Study Space
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Convenient contactless self-check-in system for seamless arrival, paired with dedicated solid wooden study desks and quiet work areas.
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 hover:border-amber-400/40 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                      <Flame className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      24/7 Water Supply & Hot Shower
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Guaranteed 24/7 water supply with dedicated backup water storage tanks, and instant hot water shower heaters in every unit.
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 hover:border-amber-400/40 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Ample Parking & 24/7 Security
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Secure gated compound with 24/7 security. Just 1-minute walk to Victoria Comfort Inn and Pinecone Hotel with Boda Boda transport readily available.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Google Reviews Showcase */}
            <ReviewsSection />

            {/* 5. Location Section Explorer */}
            <LocationSection />

            {/* 6. Frequently Asked Questions (SEO Optimized) */}
            <FaqSection onOpenInquiry={() => setQuickInquiryOpen(true)} />

            {/* 7. Blog Highlights Preview */}
            <section className="py-20 bg-neutral-950 border-t border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <div className="text-amber-400 text-xs font-mono uppercase tracking-widest font-semibold mb-2">
                      Local Insight & SEO Guides
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                      Kisumu Travel & Living Journal
                    </h2>
                    <p className="text-sm text-neutral-400 mt-2 max-w-xl">
                      Read our curated destination guides covering Lake Victoria sunsets, best neighborhoods, and executive workations.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      playBeep(640, 0.04);
                      handleNavigate('blogs');
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider shrink-0"
                  >
                    <span>Read All Articles</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {BLOGS_DATA.slice(0, 2).map((post) => (
                    <div
                      key={post.slug}
                      onClick={() => handleSelectBlogPost(post)}
                      className="group p-6 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-amber-400/40 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="text-xs text-amber-400 font-mono font-semibold uppercase">
                          {post.category} · {post.readTime}
                        </div>
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                        <span>{post.publishDate}</span>
                        <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <span>Read Guide</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Direct Booking Concierge Strip */}
            <section className="py-16 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-t border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Ready to Book Your Stay at Cassabela Apartments?
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Direct phone & WhatsApp contact with the manager on <strong className="text-white font-mono">0720 558431</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      playPhoneBuzz();
                      setQuickInquiryOpen(true);
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-xs text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md active:scale-95"
                  >
                    Inquire Online
                  </button>
                  <a
                    href="tel:0720558431"
                    onClick={() => playPhoneBuzz()}
                    className="px-5 py-3 rounded-xl font-medium text-xs text-white bg-neutral-900 border border-neutral-700 hover:border-amber-400 transition-colors"
                  >
                    Call 0720 558431
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'apartments' && (
          <ApartmentsCatalog
            initialFilter={searchFilter}
            onSelectProperty={handleSelectProperty}
            onQuickBook={handleQuickBookProperty}
          />
        )}

        {currentPage === 'location' && (
          <div className="pt-20">
            <LocationSection />
          </div>
        )}

        {currentPage === 'blogs' && (
          <div className="pt-10">
            <BlogSection onSelectPost={handleSelectBlogPost} />
          </div>
        )}

        {currentPage === 'blog-detail' && selectedBlog && (
          <BlogArticleView
            post={selectedBlog}
            onBack={() => setCurrentPage('blogs')}
            onOpenQuickInquiry={() => setQuickInquiryOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <div className="pt-10">
            <ConciergeSection />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Property Details Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      {/* Quick Booking & WhatsApp Inquiry Modal */}
      <QuickInquiryModal
        isOpen={quickInquiryOpen}
        onClose={() => setQuickInquiryOpen(false)}
      />

      {/* Persistent Floating WhatsApp Action Button */}
      <WhatsAppFab />
    </div>
  );
}
