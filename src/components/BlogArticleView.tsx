import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Check, Copy, MessageSquare, Star, ArrowRight, HelpCircle } from 'lucide-react';
import { BlogPost, Property } from '../types';
import { playBeep, playChime, playPhoneBuzz } from '../utils/audio';
import { LazyImage } from './LazyImage';

interface BlogArticleViewProps {
  post: BlogPost;
  onBack: () => void;
  onSelectProperty?: (propertyId: string) => void;
  onOpenQuickInquiry: () => void;
}

export const BlogArticleView: React.FC<BlogArticleViewProps> = ({
  post,
  onBack,
  onOpenQuickInquiry,
}) => {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleShareCopy = () => {
    playBeep(880, 0.08);
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Read this helpful Kisumu travel & accommodation guide: "${post.title}" - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <article className="min-h-screen bg-neutral-950 pt-28 pb-20 text-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back navigation */}
        <div>
          <button
            onClick={() => {
              playBeep(520, 0.05);
              onBack();
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>
        </div>

        {/* Article Meta Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            <span className="text-amber-400 font-semibold uppercase tracking-wider">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishDate}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
            {post.excerpt}
          </p>

          {/* Author info & share buttons */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                loading="lazy"
                decoding="async"
                className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
              />
              <div>
                <div className="text-xs font-bold text-white">{post.author.name}</div>
                <div className="text-[11px] text-neutral-400">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareCopy}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Copy Article Link'}</span>
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 hover:border-emerald-600 text-xs text-emerald-300 flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Share via WhatsApp</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Cover Image with Lazy Loading */}
        <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
          <LazyImage
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
        </div>

        {/* SEO Keywords Notice */}
        <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-400 font-mono text-[11px]">Key Topics:</span>
          {post.keywords.map((kw, i) => (
            <span key={i} className="text-amber-300/90 bg-neutral-800/80 px-2 py-0.5 rounded text-[11px]">
              #{kw}
            </span>
          ))}
        </div>

        {/* Article Body Content */}
        <div className="space-y-10 text-neutral-300 leading-relaxed font-sans text-sm sm:text-base">
          {post.content.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight pt-2 border-t border-neutral-800/60">
                {section.sectionTitle}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}

              {section.subsections && (
                <div className="space-y-4 pl-0 sm:pl-4 mt-4 border-l-0 sm:border-l sm:border-neutral-800">
                  {section.subsections.map((sub, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <h3 className="text-base sm:text-lg font-semibold text-amber-400">
                        {sub.title}
                      </h3>
                      {sub.body.map((b, bIdx) => (
                        <p key={bIdx} className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {b}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Interactive FAQ Section for Schema Rich Results */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="pt-8 border-t border-neutral-800 space-y-4">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Frequently Asked Questions (Kisumu Stays)</span>
            </h3>
            <div className="space-y-3">
              {post.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      playBeep(640, 0.04);
                      setOpenFaq(openFaq === fIdx ? null : fIdx);
                    }}
                    className="w-full text-left p-4 text-xs sm:text-sm font-semibold text-white flex items-center justify-between gap-4"
                  >
                    <span>{faq.question}</span>
                    <span className="text-amber-400 text-lg font-mono">
                      {openFaq === fIdx ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === fIdx && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action Box for Booking */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 text-center space-y-4 shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Kisumu Edijim Experience</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-white">
            Ready to Experience Luxury Living in Tom Mboya Estate?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Book directly at Cassabela Apartments for the best rates, fast confirmation, and dedicated 24/7 host care.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                playPhoneBuzz();
                onOpenQuickInquiry();
              }}
              className="px-6 py-3 rounded-xl font-bold text-xs text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>Inquire & Reserve Your Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:0720558431"
              onClick={() => playPhoneBuzz()}
              className="px-5 py-3 rounded-xl font-medium text-xs text-white bg-neutral-900 border border-neutral-700 hover:border-amber-400 transition-colors"
            >
              Call Host: 0720 558431
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
