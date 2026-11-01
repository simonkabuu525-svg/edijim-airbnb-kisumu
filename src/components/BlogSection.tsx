import React, { useState } from 'react';
import { Search, Clock, Calendar, ArrowRight, BookOpen, Compass, Sparkles } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOGS_DATA } from '../data/blogs';
import { playBeep, playChime } from '../utils/audio';
import { LazyImage } from './LazyImage';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Travel & Accommodation Guide', 'Property Spotlight', 'Kisumu Sightseeing & Lifestyle', 'Remote Work & Business'];

  const filteredPosts = BLOGS_DATA.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-amber-400 text-xs font-mono uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Kisumu Travel, Living & Accommodation Journal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              SEO Guides & Kisumu Living
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              In-depth articles optimized for travelers exploring short stays, local attractions, and executive accommodations in Kisumu, Kenya.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, Tom Mboya, WiFi, fish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playBeep(580, 0.04);
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-neutral-950 font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              onClick={() => {
                playChime();
                onSelectPost(post);
              }}
              className="group bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-400/5 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
                <LazyImage
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-md bg-neutral-950/80 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-medium uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{post.readTime}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{post.publishDate}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags & Action Link */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      loading="lazy"
                      decoding="async"
                      className="w-6 h-6 rounded-full object-cover border border-amber-400/30"
                    />
                    <span className="text-neutral-400 text-[11px] truncate max-w-[120px]">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
            <p className="text-neutral-400 text-sm">No articles matched your search query. Try searching for "Tom Mboya", "Kisumu", or "WiFi".</p>
          </div>
        )}
      </div>
    </section>
  );
};
