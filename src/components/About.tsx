import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { Heart, Compass, SunMedium } from 'lucide-react';

export const About: React.FC = () => {
  const { content } = useSanctuary();

  return (
    <section id="about" className="py-16 md:py-24 border-b border-stone-200/70 bg-[#FAF9F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Asset & Practitioner Spotlight */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-xl overflow-hidden border border-stone-200/80 shadow-xs aspect-4/3 bg-stone-100">
              <img
                src="/src/assets/images/about_contemplative_prayer_1792339743785.jpg"
                alt="Practitioner in quiet contemplative prayer in courtyard at dawn"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 rounded-lg bg-white/70 border border-stone-200/80">
              <div className="text-xs uppercase tracking-wider text-amber-900/80 font-semibold mb-1">
                Sanctuary Minister
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-semibold">
                {content.about.practitionerName}
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                {content.about.practitionerRole}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed italic border-t border-stone-100 pt-3">
                “To hold another human being in prayer is to honor the eternal light within them, especially when their own candle feels dim.”
              </p>
            </div>
          </div>

          {/* Right Column: Narrative, Mission, Values */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs tracking-widest uppercase font-semibold text-amber-900/80 mb-2">
                {content.about.sectionKicker}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-tight tracking-tight text-balance mb-6">
                {content.about.title}
              </h2>
            </div>

            {/* Story narrative paragraphs */}
            <div className="space-y-4 text-stone-600 text-base leading-relaxed">
              {content.about.narrativeParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Mission Statement Callout */}
            <div className="p-6 rounded-lg bg-amber-950/5 border border-amber-900/15">
              <h3 className="text-xs uppercase tracking-wider text-amber-900 font-semibold mb-2">
                Our Sacred Mission
              </h3>
              <p className="font-serif text-stone-900 text-lg leading-snug">
                “{content.about.missionStatement}”
              </p>
            </div>

            {/* Core Values */}
            <div className="pt-2">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-900 mb-4">
                Core Sanctuary Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {content.about.values.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md border border-stone-200/80 bg-white/50"
                  >
                    <div className="mb-2">
                      {idx === 0 && <Heart className="w-4 h-4 text-amber-800" />}
                      {idx === 1 && <Compass className="w-4 h-4 text-amber-800" />}
                      {idx === 2 && <SunMedium className="w-4 h-4 text-amber-800" />}
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 mb-1">
                      {val.title}
                    </h4>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
