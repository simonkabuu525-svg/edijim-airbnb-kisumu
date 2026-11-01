import React, { useState } from 'react';
import { Heart, Star, MapPin, Bed, Bath, Users, Wifi, Tv, Flame, Utensils, Key, Droplet, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../types';
import { playBeep, playChime } from '../utils/audio';
import { LazyImage } from './LazyImage';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onQuickBook: (property: Property) => void;
  singleImageOnly?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onQuickBook,
  singleImageOnly = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // User requirement: Featured suites have only one realistic image for maximum performance
  const showSingleImage = singleImageOnly || property.featured || property.images.length <= 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBeep(520, 0.05);
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBeep(560, 0.05);
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    playChime();
    setIsFavorite(!isFavorite);
  };

  return (
    <article
      onClick={() => {
        playBeep(640, 0.06);
        onSelect(property);
      }}
      className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Visual Image Showcase */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-950">
        <LazyImage
          src={showSingleImage ? property.images[0] : (property.images[currentImageIndex] || property.images[0])}
          alt={`${property.title} in ${property.location}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          containerClassName="w-full h-full"
        />

        {/* Ambient Top & Bottom Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30 pointer-events-none" />

        {/* Featured / Status Badge matching Sorelike style */}
        {property.featured ? (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#e5a800] text-neutral-950 text-[11px] sm:text-xs font-bold shadow-md">
            <span>👑</span>
            <span>Featured</span>
          </div>
        ) : (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-neutral-900/90 border border-amber-400/40 text-amber-300 text-[10px] sm:text-[11px] font-bold shadow-md backdrop-blur-md">
            <span>✦</span>
            <span>Coming Soon</span>
          </div>
        )}

        {/* Favorite Heart Toggle */}
        <button
          onClick={handleFavorite}
          aria-label={isFavorite ? 'Remove from saved' : 'Save suite to favorites'}
          className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-neutral-950/60 backdrop-blur-md text-white hover:text-red-400 hover:scale-110 active:scale-95 transition-all border border-white/10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
            }`}
          />
        </button>

        {/* Left / Right Carousel Controls only when not single image mode */}
        {!showSingleImage && property.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="Previous property image"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-neutral-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900 focus:opacity-100 z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Next property image"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-neutral-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900 focus:opacity-100 z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
              {property.images.slice(0, 2).map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  aria-label={`Jump to image ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header row: Title + Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded text-amber-400 text-xs font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{property.rating}</span>
            </div>
          </div>

          {/* Location Landmark: Opposite Metropark Hotel, 1-min walk to Victoria Comfort Inn */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">Opposite Metropark Hotel · 1-min to Victoria Comfort Inn</span>
          </div>

          {/* Specs: Bed, Bath, Guests */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-neutral-300 mt-3 pt-3 border-t border-neutral-800/80">
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>1 Bath</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{property.guests} Guests</span>
            </span>
          </div>

          {/* Unit Amenities - For Airbnb Executive unit, Wi-Fi is omitted per user instruction */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3">
            {property.id === 'edijim-executive-one-bedroom' ? (
              <>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md">
                  <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Hot Shower</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md">
                  <Key className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Self Check-In</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md">
                  <Droplet className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>24/7 Water</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400 font-mono">
                  +3 more
                </span>
              </>
            ) : property.id === 'edijim-studio-apartment' ? (
              <>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md">
                  <Key className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Self Check-In</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md">
                  <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Hot Shower</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md">
                  <Droplet className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>24/7 Water</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400 font-mono">
                  +2 more
                </span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md">
                  <Key className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Self Check-In</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md">
                  <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Hot Shower</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-md">
                  <Droplet className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>24/7 Water</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-neutral-400 font-mono">
                  +4 more
                </span>
              </>
            )}
          </div>
        </div>

        {/* Footer Row: Price Placeholder & View & Book CTA */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm sm:text-base font-bold text-amber-400 font-mono tracking-tight truncate">
              {property.pricePlaceholderText}
            </div>
            <div className="text-[10px] sm:text-[11px] text-neutral-400 truncate">
              {property.indicativeRangeKes}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              playChime();
              onQuickBook(property);
            }}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm active:scale-95 whitespace-nowrap shrink-0"
          >
            View & Book
          </button>
        </div>
      </div>
    </article>
  );
};
