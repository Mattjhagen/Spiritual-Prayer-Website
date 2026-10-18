import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { ArrowRight, ShieldCheck, HeartHandshake, Compass, Clock } from 'lucide-react';

export const Hero: React.FC = () => {
  const { content } = useSanctuary();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 border-b border-stone-200/70">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Text & Value Proposition */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs tracking-widest uppercase font-semibold text-amber-900/80 mb-3">
            {content.hero.badgeText}
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.12] tracking-tight text-balance mb-6">
            {content.hero.headline}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mb-8">
            {content.hero.subheadline}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>{content.hero.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('services')}
              className="px-6 py-3 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200/90 rounded-md transition-colors cursor-pointer"
            >
              {content.hero.secondaryCtaText}
            </button>
          </div>
        </div>

        {/* Hero Visual Asset: High-impact 16:9 Photography */}
        <div className="relative rounded-xl overflow-hidden border border-stone-200/80 shadow-xs mb-12 aspect-16/9 bg-stone-100">
          <img
            src="/src/assets/images/hero_sanctuary_light_1792339743220.jpg"
            alt="Tranquil spiritual sanctuary with warm morning sunlight through arched windows"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle natural scrim for serene depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="max-w-xl text-stone-100">
              <blockquote className="font-serif text-lg sm:text-xl md:text-2xl italic leading-snug mb-2 text-stone-100">
                {content.hero.quoteText}
              </blockquote>
              <p className="text-xs sm:text-sm text-stone-300 tracking-wide font-medium">
                — {content.hero.quoteAuthor}
              </p>
            </div>
          </div>
        </div>

        {/* Quiet Trust & Sacred Promise Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-stone-200/70">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Strictly Confidential</h3>
              <p className="text-xs text-stone-500 mt-0.5">Your intentions and privacy are held in sacred trust.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Held by Name</h3>
              <p className="text-xs text-stone-500 mt-0.5">Every prayer is carried individually in daily morning vigils.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Compass className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Open to All Faiths</h3>
              <p className="text-xs text-stone-500 mt-0.5">Welcoming all seekers, backgrounds, and seasons of life.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-stone-900">Within 24–48 Hours</h3>
              <p className="text-xs text-stone-500 mt-0.5">Every inquiry receives a personal, thoughtful reply.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
