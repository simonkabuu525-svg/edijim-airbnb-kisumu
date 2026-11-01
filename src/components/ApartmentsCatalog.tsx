import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, MapPin, Check, SlidersHorizontal } from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES_DATA } from '../data/properties';
import { PropertyCard } from './PropertyCard';
import { playBeep, playChime } from '../utils/audio';

interface ApartmentsCatalogProps {
  initialFilter?: { estate: string; type: string; guests: number } | null;
  onSelectProperty: (property: Property) => void;
  onQuickBook: (property: Property) => void;
}

export const ApartmentsCatalog: React.FC<ApartmentsCatalogProps> = ({
  initialFilter,
  onSelectProperty,
  onQuickBook,
}) => {
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>(
    initialFilter?.estate || 'All'
  );
  const [selectedType, setSelectedType] = useState<string>(
    initialFilter?.type || 'All'
  );
  const [selectedGuests, setSelectedGuests] = useState<number>(
    initialFilter?.guests || 0
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'size'>('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const availableAmenities = [
    'Self-check-in system',
    '24/7 water supply',
    'Fully equipped kitchen',
    'Dedicated wooden study desk',
    'Hot shower with instant water heater',
    'Comfortable bed with fresh linen',
    'Ample parking with 24/7 security',
  ];

  const handleToggleAmenity = (amenity: string) => {
    playBeep(640, 0.04);
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    playBeep(480, 0.06);
    setSearch('');
    setSelectedLocation('All');
    setSelectedType('All');
    setSelectedGuests(0);
    setSelectedAmenities([]);
    setSortBy('recommended');
  };

  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => {
      // Search
      const searchMatch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.estate.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());

      // Location / Estate
      const locationMatch =
        selectedLocation === 'All' ||
        p.estate.toLowerCase() === selectedLocation.toLowerCase() ||
        p.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // Property Type
      const typeMatch = selectedType === 'All' || p.propertyType === selectedType;

      // Guests
      const guestMatch = selectedGuests === 0 || p.guests >= selectedGuests;

      // Amenities
      const amenityMatch =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) =>
          p.amenities.some((pAmenity) =>
            pAmenity.toLowerCase().includes(a.toLowerCase())
          )
        );

      return searchMatch && locationMatch && typeMatch && guestMatch && amenityMatch;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'size') return b.squareMeters - a.squareMeters;
      return b.featured ? 1 : -1;
    });
  }, [search, selectedLocation, selectedType, selectedGuests, selectedAmenities, sortBy]);

  return (
    <section className="relative py-24 bg-neutral-950 text-neutral-100 min-h-screen">
      {/* Visible Ambient Top Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-80 overflow-hidden pointer-events-none opacity-30">
        <img
          src="/assets/images/sorelike_style_hero_1793474939989.jpg"
          alt="Edijim Staycation Suites Kisumu"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/80 to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="mb-8 sm:mb-10 space-y-2">
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
            <span>Cassabela Apartments · Tom Mboya Estate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
            Furnished Apartments & Suites in Kisumu
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Explore authentic residences with neat interiors, high-speed fibre Wi-Fi, and 24/7 security near Kenya Breweries, Kisumu.
          </p>
        </div>

        {/* Main Grid: Filters Sidebar + Catalog Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
            <span className="text-xs text-neutral-300 font-medium">
              Showing {filteredProperties.length} suites
            </span>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="px-3 py-1.5 rounded-lg bg-amber-400 text-neutral-950 text-xs font-semibold flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showMobileFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>

          {/* Filters Sidebar (Sorelike Homes Layout) */}
          <aside
            className={`lg:col-span-3 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-6 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Filter className="w-4 h-4 text-amber-400" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Location
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: 'All Kisumu', val: 'All' },
                  { label: 'Tom Mboya Estate (Cassabela)', val: 'Tom Mboya Estate' },
                  { label: 'Kisumu CBD', val: 'CBD' },
                  { label: 'Milimani', val: 'Milimani' },
                  { label: 'Dunga Lakeside', val: 'Dunga' },
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => {
                      playBeep(600, 0.03);
                      setSelectedLocation(item.val);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedLocation === item.val
                        ? 'bg-amber-400/10 text-amber-400 font-semibold border border-amber-400/20'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedLocation === item.val && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2 pt-3 border-t border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Property Type
              </label>
              <div className="space-y-1.5 text-xs">
                {['All', 'Studio', '1 Bedroom', '2 Bedroom', 'Penthouse'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      playBeep(620, 0.03);
                      setSelectedType(type);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedType === type
                        ? 'bg-amber-400/10 text-amber-400 font-semibold border border-amber-400/20'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <span>{type === 'All' ? 'All Types' : type}</span>
                    {selectedType === type && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms / Guests */}
            <div className="space-y-2 pt-3 border-t border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Min. Guest Capacity
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 1, 2, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      playBeep(640, 0.03);
                      setSelectedGuests(count);
                    }}
                    className={`py-1.5 text-xs font-mono font-bold rounded-lg transition-colors border ${
                      selectedGuests === count
                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {count === 0 ? 'Any' : `${count}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-2 pt-3 border-t border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Key Amenities
              </label>
              <div className="space-y-2">
                {availableAmenities.map((amenity) => {
                  const active = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      onClick={() => handleToggleAmenity(amenity)}
                      className="w-full flex items-center gap-2 text-left text-xs group cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                          active
                            ? 'bg-amber-400 border-amber-400 text-neutral-950'
                            : 'bg-neutral-950 border-neutral-700 group-hover:border-neutral-500'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={active ? 'text-amber-300 font-medium' : 'text-neutral-400'}>
                        {amenity}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pricing Note */}
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
              <span className="text-amber-400 font-semibold block">Host Direct Rates</span>
              <span>All suites feature customized rates for short or extended stays. Inquire directly for current promotions.</span>
            </div>
          </aside>

          {/* Right Column: Search + Sort Bar + Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 bg-neutral-900 border border-neutral-800 rounded-2xl">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by suite title, estate (e.g. Tom Mboya), or features..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-neutral-400 whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    playBeep(600, 0.04);
                    setSortBy(e.target.value as 'recommended' | 'rating' | 'size');
                  }}
                  className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="recommended">Featured First</option>
                  <option value="rating">Top Rated (4.9+)</option>
                  <option value="size">Largest Floor Area</option>
                </select>
              </div>
            </div>

            {/* Active Filters count summary */}
            <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
              <span>
                Showing <strong className="text-white">{filteredProperties.length}</strong> matching apartments in Kisumu
              </span>
              {(selectedLocation !== 'All' || selectedType !== 'All' || selectedAmenities.length > 0 || search) && (
                <button
                  onClick={handleResetFilters}
                  className="text-amber-400 hover:underline"
                >
                  Clear active filters
                </button>
              )}
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={onSelectProperty}
                  onQuickBook={onQuickBook}
                />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-4">
                <p className="text-neutral-300 text-sm">
                  No properties matched your current filter criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-neutral-950 text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
