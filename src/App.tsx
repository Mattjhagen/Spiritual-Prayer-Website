/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SanctuaryProvider, useSanctuary } from './context/SanctuaryContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Approach } from './components/Approach';
import { About } from './components/About';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { ContactPrayerForm } from './components/ContactPrayerForm';
import { Footer } from './components/Footer';
import { CmsStudioModal } from './components/CmsStudioModal';
import { SlidersHorizontal } from 'lucide-react';

const SanctuaryApp: React.FC = () => {
  const { setIsCmsOpen, inquiries } = useSanctuary();
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-800 selection:bg-amber-100 selection:text-amber-900 font-sans">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Approach />
        <About />
        <Services />
        <Testimonials />
        <ContactPrayerForm />
      </main>

      <Footer />

      {/* Owner CMS Studio Modal */}
      <CmsStudioModal />

      {/* Floating Owner Quick-Access Badge for CMS */}
      <div className="fixed bottom-5 right-5 z-30">
        <button
          onClick={() => setIsCmsOpen(true)}
          title="Sanctuary CMS Studio – Edit content & manage prayer inquiries"
          className="group flex items-center gap-2 bg-stone-900/90 hover:bg-stone-900 text-stone-100 px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all border border-stone-700/80 cursor-pointer backdrop-blur-xs text-xs font-medium"
        >
          <SlidersHorizontal className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline">Sanctuary CMS</span>
          {newInquiriesCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] bg-amber-700 text-white rounded-full font-semibold">
              {newInquiriesCount} new
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <SanctuaryProvider>
      <SanctuaryApp />
    </SanctuaryProvider>
  );
}
