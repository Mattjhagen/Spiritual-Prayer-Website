import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { Sparkles } from 'lucide-react';

export const Approach: React.FC = () => {
  const { content } = useSanctuary();

  return (
    <section id="approach" className="py-16 md:py-24 border-b border-stone-200/70 bg-[#FAF9F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs tracking-widest uppercase font-semibold text-amber-900/80 mb-2">
            {content.approach.sectionKicker}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-tight tracking-tight text-balance mb-4">
            {content.approach.title}
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            {content.approach.description}
          </p>
        </div>

        {/* 4 Pillars with human editorial numbering and clean layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {content.approach.pillars.map((pillar, index) => {
            const indexStr = (index + 1).toString().padStart(2, '0');
            return (
              <div
                key={pillar.id}
                className="p-8 rounded-lg border border-stone-200/80 bg-white/70 hover:bg-white transition-all shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl text-amber-900/60 font-medium">
                    {indexStr}.
                  </span>
                  <Sparkles className="w-4 h-4 text-stone-400" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quiet contemplative note */}
        <div className="mt-12 p-6 rounded-lg bg-stone-100/80 border border-stone-200/70 text-center max-w-2xl mx-auto">
          <p className="text-xs text-stone-500 uppercase tracking-widest font-medium mb-1">
            A Moment of Stillness
          </p>
          <p className="font-serif text-stone-800 text-lg italic">
            “Prayer does not change God, but it changes him who prays.”
          </p>
          <p className="text-xs text-stone-500 mt-1">— Søren Kierkegaard</p>
        </div>
      </div>
    </section>
  );
};
