import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { SlidersHorizontal, Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { content, setIsCmsOpen } = useSanctuary();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-16 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl text-stone-100 font-semibold tracking-tight">
              {content.branding.siteName}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {content.branding.tagline}. Dedicated spiritual prayer, personal intercessory vigils, and contemplative accompaniment for life’s sacred journey.
            </p>
            <div className="text-xs text-stone-500 pt-2 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>{content.branding.locationNote}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              Sanctuary
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('approach')}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Prayer Approach
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  About Our Ministry
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Prayer Offerings & Vigils
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Submit a Request
                </button>
              </li>
            </ul>
          </div>

          {/* Reach Out & Ministry Management */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              Direct Contact
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              For pastoral questions, personalized vigil arrangements, or spiritual accompaniment:
            </p>
            <a
              href={`mailto:${content.branding.contactEmail}`}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-block underline underline-offset-4"
            >
              {content.branding.contactEmail}
            </a>

            <div className="pt-3">
              <button
                onClick={() => setIsCmsOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs text-stone-300 bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
                <span>Sanctuary CMS Studio (Edit Content)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} {content.branding.siteName}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Carried with reverence and prayer</span>
            <Heart className="w-3 h-3 text-amber-700/80 inline fill-amber-700/80" />
          </div>
        </div>
      </div>
    </footer>
  );
};
