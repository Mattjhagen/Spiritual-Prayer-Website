import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { Check, ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  const { content, setSelectedServiceForContact } = useSanctuary();

  const handleSelectService = (title: string) => {
    setSelectedServiceForContact(title);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 border-b border-stone-200/70 bg-[#FAF9F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header with visual introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-center">
          <div className="lg:col-span-8">
            <p className="text-xs tracking-widest uppercase font-semibold text-amber-900/80 mb-2">
              {content.services.sectionKicker}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-tight tracking-tight text-balance mb-4">
              {content.services.title}
            </h2>
            <p className="text-stone-600 text-base leading-relaxed max-w-2xl">
              {content.services.description}
            </p>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="rounded-xl overflow-hidden border border-stone-200/80 shadow-xs aspect-4/3 bg-stone-100">
              <img
                src="/src/assets/images/services_sacred_candles_1792339744151.jpg"
                alt="Natural beeswax candles and river stones on prayer altar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.services.offerings.map((offering) => (
            <div
              key={offering.id}
              className={`flex flex-col justify-between p-8 rounded-xl border transition-all ${
                offering.isFeatured
                  ? 'bg-white border-amber-900/30 shadow-sm'
                  : 'bg-white/70 border-stone-200/80 hover:bg-white hover:border-stone-300'
              }`}
            >
              <div>
                {/* Unboxed metadata without static pills */}
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-2">
                  <span>{offering.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{offering.durationOrSchedule}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-semibold mb-1">
                  {offering.title}
                </h3>
                <p className="text-xs text-stone-500 italic mb-4">
                  {offering.subtitle}
                </p>

                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                  {offering.description}
                </p>

                {/* What is included */}
                <div className="mb-6 pt-4 border-t border-stone-100 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                    What this includes:
                  </p>
                  <ul className="space-y-2">
                    {offering.whatIsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-600">
                        <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Contribution & Action */}
              <div className="pt-6 border-t border-stone-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block">
                    Contribution
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800">
                    {offering.contribution}
                  </span>
                </div>

                <button
                  onClick={() => handleSelectService(offering.title)}
                  className="px-4 py-2.5 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-900 hover:text-white border border-stone-300 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Request This Prayer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Free-will offering policy assurance */}
        <div className="mt-12 p-6 rounded-lg bg-stone-100/60 border border-stone-200/80 text-center max-w-2xl mx-auto">
          <h4 className="text-sm font-semibold text-stone-900 mb-1">
            Our Principle of Gracious Accessibility
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Financial hardship should never stand between a soul and prayer. If you cannot afford a suggested offering, please simply indicate so in the contact form—your request will always be received with equal love and devoted prayer.
          </p>
        </div>
      </div>
    </section>
  );
};
