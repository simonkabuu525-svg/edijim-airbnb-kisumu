import React, { useState, useRef } from 'react';
import {
  Star,
  ExternalLink,
  Award,
  Quote,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviews';
import { playBeep, playChime } from '../utils/audio';
import { Review } from '../types';

const GOOGLE_PROFILE_URL =
  'https://www.google.com/maps/place/Kisumu+Edijim+AirBnB/@-0.0850107,34.7627748,19z/data=!3m1!4b1!4m6!3m5!1s0x182aa56da7c91eff:0xdb5d063d14c2fca6!8m2!3d-0.0850107!4d34.7639925!16s%2Fg%2F11v03mpwsx?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D';

// Duplicate the array once for seamless -50% infinite translation
const MARQUEE_REVIEWS = [...REVIEWS_DATA, ...REVIEWS_DATA];

export const ReviewsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const togglePause = () => {
    playBeep(480, 0.05);
    setIsPaused((prev) => !prev);
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    playBeep(520, 0.05);
    // If user clicks arrow, pause the auto-marquee so they can inspect manually
    setIsPaused(true);
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleReviewClick = (review: Review) => {
    playBeep(560, 0.04);
    setSelectedReview(review);
  };

  return (
    <section
      id="reviews"
      aria-label="Guest Reviews and Testimonials"
      className="py-12 sm:py-16 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        {/* Header with verified rating summary and controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase mb-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Guest Experiences</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight">
              Loved by Travelers in Kisumu
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-white text-sm font-sans font-extrabold">4.5</span>
                <span>/ 5.0</span>
              </div>
              <span className="text-neutral-600">·</span>
              <span>12 Verified Reviews on Google Maps</span>
              <span className="text-neutral-600">·</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                100% Authentic Stays
              </span>
            </div>
          </div>

          {/* Action buttons & Marquee controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={togglePause}
              aria-label={isPaused ? 'Resume reviews auto-scroll' : 'Pause reviews auto-scroll'}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all active:scale-95"
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Pause</span>
                </>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleManualScroll('left')}
                aria-label="Scroll reviews left"
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleManualScroll('right')}
                aria-label="Scroll reviews right"
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playChime()}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>View on Google</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>

      {/* Marquee Track Container with Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Gradient Fade Mask */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 inset-y-0 w-8 sm:w-24 md:w-36 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-10"
        />

        {/* Right Gradient Fade Mask */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 inset-y-0 w-8 sm:w-24 md:w-36 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent z-10"
        />

        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar scroll-smooth"
          tabIndex={0}
          role="region"
          aria-label="Guest testimonials carousel"
        >
          <div
            className={`flex items-stretch gap-4 sm:gap-5 px-4 sm:px-6 py-2 animate-marquee ${
              isPaused ? 'marquee-paused' : ''
            }`}
          >
            {MARQUEE_REVIEWS.map((review, idx) => (
              <article
                key={`${review.id}-${idx}`}
                onClick={() => handleReviewClick(review)}
                className="w-[290px] sm:w-[360px] md:w-[390px] shrink-0 bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800/90 hover:border-amber-400/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer select-none"
              >
                <div>
                  {/* Card Top: Stars & Meta */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {review.isLocalGuide && (
                        <span className="text-[10px] font-mono font-medium text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          Local Guide
                        </span>
                      )}
                      <Quote className="w-4 h-4 text-neutral-600" />
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic line-clamp-4">
                    "{review.content}"
                  </p>
                </div>

                {/* Card Bottom: Author info */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center shrink-0 shadow-sm"
                      aria-hidden="true"
                    >
                      {review.author.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-xs sm:text-sm text-white truncate">
                        {review.author}
                      </h3>
                      <div className="text-[10px] text-neutral-400 font-mono truncate">
                        {review.stayType || 'Verified Stay'} · {review.date}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-500 hover:text-amber-400 transition-colors shrink-0">
                    Google Review
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Subtext info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
        <span className="hidden sm:inline">Tip: Hover or tap any testimonial card to pause the scroll</span>
        <a
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-400 transition-colors ml-auto flex items-center gap-1"
        >
          Read all guest stories on Google Maps
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Detail Modal when user clicks any review to read full text comfortably */}
      {selectedReview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Review by ${selectedReview.author}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedReview(null)}
              aria-label="Close review dialog"
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-neutral-950 font-bold text-sm flex items-center justify-center">
                {selectedReview.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <span>{selectedReview.author}</span>
                  {selectedReview.isLocalGuide && (
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      Local Guide
                    </span>
                  )}
                </h4>
                <div className="text-xs text-neutral-400 font-mono">
                  {selectedReview.stayType || 'Verified Stay'} · {selectedReview.date}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(selectedReview.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-neutral-400 font-mono ml-2">
                {selectedReview.rating}.0 / 5.0 Rating
              </span>
            </div>

            <blockquote className="text-sm sm:text-base text-neutral-200 leading-relaxed italic border-l-2 border-amber-400/60 pl-4 py-1 mb-6">
              "{selectedReview.content}"
            </blockquote>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-800">
              <span className="text-xs text-neutral-400">Google Verified Review</span>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playChime()}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                <span>Open Google Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
