import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { content } = useSanctuary();

  return (
    <section className="py-16 md:py-24 border-b border-stone-200/70 bg-[#F5F3EF]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs tracking-widest uppercase font-semibold text-amber-900/80 mb-2">
            {content.testimonials.sectionKicker}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-tight tracking-tight text-balance">
            {content.testimonials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.testimonials.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-8 rounded-xl bg-white border border-stone-200/80 shadow-xs"
            >
              <div>
                <Quote className="w-6 h-6 text-amber-800/40 mb-4" />
                <p className="text-stone-700 text-sm leading-relaxed mb-6 italic">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <p className="text-xs font-semibold text-stone-900">
                  {item.seekerName}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                  <span>{item.locationOrContext}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.intentionSummary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
