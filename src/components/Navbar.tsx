import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { Menu, X, SlidersHorizontal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { content, setIsCmsOpen, inquiries } = useSanctuary();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display serif) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="font-serif text-2xl tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-900 transition-colors"
        >
          {content.branding.siteName}
        </a>

        {/* Zone 2: Navigation Links (Clean single-line text links with subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => scrollToSection('home')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('approach')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Prayer Approach
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact & Requests
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Discrete CMS Studio Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCmsOpen(true)}
            title="Open Sanctuary Studio CMS & Inquiries Manager"
            className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 border border-stone-200/90 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sanctuary CMS</span>
            {newInquiriesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-semibold bg-amber-800 text-white rounded">
                {newInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2.5 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Prayer
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF9F5] px-6 py-6 shadow-lg space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-stone-700">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('approach')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              Prayer Approach
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              Services & Offerings
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 hover:text-stone-950 transition-colors"
            >
              Contact & Prayer Request
            </button>
          </div>
          <div className="pt-4 border-t border-stone-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCmsOpen(true);
              }}
              className="w-full py-2.5 px-4 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Sanctuary CMS Studio (Admin)</span>
              {newInquiriesCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] bg-amber-800 text-white rounded">
                  {newInquiriesCount} new
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
