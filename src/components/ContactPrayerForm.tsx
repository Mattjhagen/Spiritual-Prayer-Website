import React, { useState, useEffect } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { PrayerInquiry } from '../types';
import { Send, Flame, CheckCircle, Shield, Mail, Lock } from 'lucide-react';

const INTENTIONS: Array<PrayerInquiry['intentionCategory']> = [
  'Healing & Health',
  'Grief & Comfort',
  'Guidance & Clarity',
  'Family & Relationships',
  'Gratitude & Peace',
  'Other',
];

export const ContactPrayerForm: React.FC = () => {
  const { content, submitInquiry, selectedServiceForContact, setSelectedServiceForContact } = useSanctuary();

  const [seekerName, setSeekerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intentionCategory, setIntentionCategory] = useState<PrayerInquiry['intentionCategory']>('Healing & Health');
  const [serviceRequested, setServiceRequested] = useState('');
  const [message, setMessage] = useState('');
  const [candleLit, setCandleLit] = useState(true);
  const [agreedConfidential, setAgreedConfidential] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<PrayerInquiry | null>(null);
  const [validationError, setValidationError] = useState('');

  // Sync selected service if clicked from Services section
  useEffect(() => {
    if (selectedServiceForContact) {
      setServiceRequested(selectedServiceForContact);
    }
  }, [selectedServiceForContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!seekerName.trim()) {
      setValidationError('Please share your name or how you wish to be named in prayer.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid email address so we may send your prayer reflection.');
      return;
    }

    if (!message.trim()) {
      setValidationError('Please write a brief message or prayer intention.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const created = submitInquiry({
        seekerName: seekerName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        intentionCategory,
        serviceRequested: serviceRequested || undefined,
        message: message.trim(),
        candleLit,
      });

      setSubmittedInquiry(created);
      setIsSubmitting(false);
      // Reset form
      setSeekerName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSelectedServiceForContact(null);
    }, 400);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-stone-200/70 bg-[#FAF9F5]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs tracking-widest uppercase font-semibold text-amber-900/80 mb-2">
            {content.contact.sectionKicker}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-tight tracking-tight text-balance mb-4">
            {content.contact.title}
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            {content.contact.description}
          </p>
        </div>

        {submittedInquiry ? (
          /* Peaceful Confirmation Card */
          <div className="bg-white border border-stone-200/90 rounded-2xl p-8 sm:p-12 shadow-xs text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-amber-50 text-amber-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-200">
              <CheckCircle className="w-7 h-7" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-amber-900/70 block mb-1">
              Sanctuary Reference #{submittedInquiry.id}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold mb-3">
              Your prayer intention is received.
            </h3>

            <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
              Thank you, <span className="font-semibold text-stone-900">{submittedInquiry.seekerName}</span>. Your intention for <span className="font-medium text-amber-900">“{submittedInquiry.intentionCategory}”</span> has been brought before the altar.
              {submittedInquiry.candleLit && ' A beeswax candle has been lit in quiet dedication for you.'}
            </p>

            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/70 text-left text-xs text-stone-600 mb-8 space-y-2">
              <div className="flex items-center gap-2 font-medium text-stone-800">
                <Mail className="w-4 h-4 text-amber-800" />
                <span>Next Steps for Your Request</span>
              </div>
              <p>
                A contemplative written prayer reflection and pastoral note will be sent to{' '}
                <span className="font-medium text-stone-900">{submittedInquiry.email}</span> within 24 to 48 hours.
              </p>
              <p className="text-stone-500">
                All information submitted remains completely confidential and held in sacred trust.
              </p>
            </div>

            <button
              onClick={() => setSubmittedInquiry(null)}
              className="px-6 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md border border-stone-300 transition-colors cursor-pointer"
            >
              Submit Another Prayer Request
            </button>
          </div>
        ) : (
          /* Minimalist Contact Form */
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-10 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-6">
              {validationError && (
                <div className="p-3 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-md">
                  {validationError}
                </div>
              )}

              {/* Service Indicator if preselected */}
              {serviceRequested && (
                <div className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-md text-xs">
                  <div>
                    <span className="text-stone-500">Selected Offering: </span>
                    <span className="font-semibold text-stone-800">{serviceRequested}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setServiceRequested('');
                      setSelectedServiceForContact(null);
                    }}
                    className="text-stone-400 hover:text-stone-700 underline text-[11px] cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Seeker Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="seekerName" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Your Name <span className="text-amber-800">*</span>
                  </label>
                  <input
                    id="seekerName"
                    type="text"
                    required
                    value={seekerName}
                    onChange={(e) => setSeekerName(e.target.value)}
                    placeholder="First name or full name"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-800 transition-all text-stone-900"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Email Address <span className="text-amber-800">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-800 transition-all text-stone-900"
                  />
                </div>
              </div>

              {/* Phone (Optional) & Selected Service Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Phone Number <span className="text-stone-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-800 transition-all text-stone-900"
                  />
                </div>

                <div>
                  <label htmlFor="serviceSelect" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Prayer Offering Category
                  </label>
                  <select
                    id="serviceSelect"
                    value={serviceRequested}
                    onChange={(e) => setServiceRequested(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-800 transition-all text-stone-900"
                  >
                    <option value="">General Spiritual Prayer</option>
                    {content.services.offerings.map((o) => (
                      <option key={o.id} value={o.title}>
                        {o.title} ({o.durationOrSchedule})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Intention Segmented Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  What is the primary nature of your prayer need?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {INTENTIONS.map((intention) => (
                    <button
                      key={intention}
                      type="button"
                      onClick={() => setIntentionCategory(intention)}
                      className={`px-3 py-2 text-xs font-medium rounded-md border text-left transition-colors cursor-pointer ${
                        intentionCategory === intention
                          ? 'bg-amber-950/10 border-amber-900 text-stone-900 font-semibold'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {intention}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message / Prayer Request */}
              <div>
                <label htmlFor="prayerMessage" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Prayer Intention or Guidance Request <span className="text-amber-800">*</span>
                </label>
                <textarea
                  id="prayerMessage"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share as much or as little as you feel called to share. You may include names of loved ones, health specifics, or simply the prayer you hold in your heart..."
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50/50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-800 transition-all text-stone-900 leading-relaxed"
                />
              </div>

              {/* Candle Lighting Option & Sacred Confidentiality Check */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={candleLit}
                    onChange={(e) => setCandleLit(e.target.checked)}
                    className="mt-1 w-4 h-4 text-amber-800 rounded border-stone-300 focus:ring-amber-800 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-700" />
                      Light a Virtual Altar Candle for this Intention
                    </span>
                    <p className="text-stone-500 mt-0.5">
                      A beeswax candle will be physically lit during our daily quiet morning vigil.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedConfidential}
                    onChange={(e) => setAgreedConfidential(e.target.checked)}
                    className="mt-1 w-4 h-4 text-amber-800 rounded border-stone-300 focus:ring-amber-800 cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-700" />
                      Sacred Confidentiality Guarantee
                    </span>
                    <p className="text-stone-500 mt-0.5">
                      {content.contact.confidentialityNotice}
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting to Sanctuary...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Prayer Request</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-stone-400 mt-2.5">
                  {content.contact.responsePledge}
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
