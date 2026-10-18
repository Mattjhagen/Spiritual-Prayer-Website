import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { SiteContent, PrayerInquiry, PrayerOffering } from '../types';
import {
  X,
  Inbox,
  Edit3,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Flame,
  Search,
  Mail,
  ExternalLink,
  Save,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const CmsStudioModal: React.FC = () => {
  const {
    content,
    inquiries,
    isCmsOpen,
    setIsCmsOpen,
    updateInquiry,
    deleteInquiry,
    updateContent,
    updateOffering,
    addOffering,
    deleteOffering,
    resetAllDefaults,
    exportDataJson,
    importDataJson,
  } = useSanctuary();

  const [activeTab, setActiveTab] = useState<'inbox' | 'content' | 'offerings' | 'hosting'>('inbox');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<'all' | PrayerInquiry['status']>('all');

  // Local draft state for site content editing
  const [draftContent, setDraftContent] = useState<SiteContent>(content);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Editing a specific offering state
  const [editingOfferingId, setEditingOfferingId] = useState<string | null>(null);
  const [offeringDraft, setOfferingDraft] = useState<PrayerOffering | null>(null);

  // New offering draft state
  const [isCreatingOffering, setIsCreatingOffering] = useState(false);
  const [newOfferingDraft, setNewOfferingDraft] = useState<Partial<PrayerOffering>>({
    title: '',
    subtitle: '',
    category: 'Special Vigil',
    description: '',
    durationOrSchedule: '3 Days',
    whatIsIncluded: ['Personal morning prayer vigil', 'Sanctuary candle dedicated', 'Written prayer blessing'],
    contribution: 'Free-will donation',
    isFeatured: false,
  });

  if (!isCmsOpen) return null;

  const showNotification = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 3000);
  };

  const handleSaveContent = () => {
    updateContent(draftContent);
    showNotification('Site content changes saved successfully!');
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    const matchesSearch =
      inq.seekerName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.message.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.intentionCategory.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Export inquiries to CSV
  const handleExportCsv = () => {
    const headers = ['ID', 'Date', 'Status', 'Seeker Name', 'Email', 'Phone', 'Category', 'Offering', 'Candle Lit', 'Message', 'Spiritual Notes'];
    const rows = inquiries.map((i) => [
      i.id,
      i.createdAt,
      i.status,
      `"${i.seekerName.replace(/"/g, '""')}"`,
      i.email,
      i.phone || '',
      `"${i.intentionCategory}"`,
      `"${(i.serviceRequested || '').replace(/"/g, '""')}"`,
      i.candleLit ? 'Yes' : 'No',
      `"${i.message.replace(/"/g, '""')}"`,
      `"${(i.spiritualNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `selah_prayer_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const resultStr = event.target?.result as string;
      const res = importDataJson(resultStr);
      if (res.success) {
        showNotification('Backup successfully restored!');
      } else {
        alert(res.error || 'Failed to import backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF9F5] border border-stone-300 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-bold text-stone-900">
              Sanctuary CMS Studio
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono">
              Live Content & Inquiries
            </span>
          </div>

          <div className="flex items-center gap-2">
            {saveNotification && (
              <span className="text-xs text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {saveNotification}
              </span>
            )}
            <button
              onClick={() => setIsCmsOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
              title="Close CMS Studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-stone-200 bg-stone-50 flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inbox'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Prayer Inquiries Inbox</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-800 text-[10px]">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => {
              setDraftContent(content);
              setActiveTab('content');
            }}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'content'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Site Content Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('offerings')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'offerings'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Prayer Offerings ({content.services.offerings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hosting')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'hosting'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Backup & Hosting</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: PRAYER INQUIRIES INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-stone-200">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search by seeker, email, or intention..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-700"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={inquiryStatusFilter}
                    onChange={(e) => setInquiryStatusFilter(e.target.value as any)}
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none"
                  >
                    <option value="all">All Inquiries ({inquiries.length})</option>
                    <option value="new">New ({inquiries.filter((i) => i.status === 'new').length})</option>
                    <option value="in_prayer">Currently In Prayer ({inquiries.filter((i) => i.status === 'in_prayer').length})</option>
                    <option value="completed">Completed ({inquiries.filter((i) => i.status === 'completed').length})</option>
                    <option value="archived">Archived ({inquiries.filter((i) => i.status === 'archived').length})</option>
                  </select>

                  <button
                    onClick={handleExportCsv}
                    className="px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Export Inquiries to CSV Spreadsheet"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Inquiries List */}
              {filteredInquiries.length === 0 ? (
                <div className="text-center py-14 bg-white rounded-xl border border-stone-200">
                  <Inbox className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-stone-700">No prayer inquiries found</p>
                  <p className="text-xs text-stone-400 mt-1">
                    {inquirySearch ? 'Try a different search query' : 'New inquiries from visitors will appear here automatically.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-white border border-stone-200/90 rounded-xl p-5 shadow-2xs hover:border-stone-300 transition-all space-y-4"
                    >
                      {/* Top Header of Card */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-stone-900">{inq.seekerName}</span>
                          <span className="text-xs text-stone-400">·</span>
                          <a
                            href={`mailto:${inq.email}?subject=Regarding your prayer intention: ${inq.intentionCategory}`}
                            className="text-xs text-amber-800 hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            <span>{inq.email}</span>
                          </a>
                          {inq.phone && (
                            <>
                              <span className="text-xs text-stone-400">·</span>
                              <span className="text-xs text-stone-500">{inq.phone}</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          {/* Status badge */}
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize ${
                              inq.status === 'new'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                                : inq.status === 'in_prayer'
                                ? 'bg-stone-800 text-white'
                                : inq.status === 'completed'
                                ? 'bg-stone-100 text-stone-700 border border-stone-300'
                                : 'bg-stone-50 text-stone-400'
                            }`}
                          >
                            {inq.status.replace('_', ' ')}
                          </span>

                          <span className="text-stone-400 text-[11px]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Request Details */}
                      <div>
                        <div className="flex items-center gap-3 text-xs mb-2 text-stone-500">
                          <span className="font-medium text-stone-800">
                            Category: {inq.intentionCategory}
                          </span>
                          {inq.serviceRequested && (
                            <>
                              <span>·</span>
                              <span>Offering: {inq.serviceRequested}</span>
                            </>
                          )}
                          {inq.candleLit && (
                            <>
                              <span>·</span>
                              <span className="inline-flex items-center gap-1 text-amber-800 font-medium">
                                <Flame className="w-3 h-3" />
                                Candle Lit
                              </span>
                            </>
                          )}
                        </div>

                        <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-md border border-stone-100 leading-relaxed italic">
                          “{inq.message}”
                        </p>
                      </div>

                      {/* Spiritual Notes & Pastor Management */}
                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Add private spiritual notes or date prayed (press enter to save)..."
                            defaultValue={inq.spiritualNotes || ''}
                            onBlur={(e) => {
                              updateInquiry(inq.id, { spiritualNotes: e.target.value });
                              showNotification('Note saved');
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                updateInquiry(inq.id, { spiritualNotes: (e.target as HTMLInputElement).value });
                                showNotification('Note saved');
                              }
                            }}
                            className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600"
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {inq.status === 'new' && (
                            <button
                              onClick={() => {
                                updateInquiry(inq.id, { status: 'in_prayer' });
                                showNotification('Marked as Currently In Prayer');
                              }}
                              className="px-2.5 py-1.5 text-[11px] font-medium bg-amber-900 text-white rounded hover:bg-amber-950 transition-colors cursor-pointer"
                            >
                              Carry in Prayer
                            </button>
                          )}

                          {inq.status === 'in_prayer' && (
                            <button
                              onClick={() => {
                                updateInquiry(inq.id, { status: 'completed' });
                                showNotification('Marked as Completed');
                              }}
                              className="px-2.5 py-1.5 text-[11px] font-medium bg-stone-800 text-white rounded hover:bg-stone-900 transition-colors cursor-pointer"
                            >
                              Mark Completed
                            </button>
                          )}

                          {inq.status !== 'archived' ? (
                            <button
                              onClick={() => {
                                updateInquiry(inq.id, { status: 'archived' });
                                showNotification('Inquiry archived');
                              }}
                              className="px-2 py-1.5 text-[11px] text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded transition-colors cursor-pointer"
                            >
                              Archive
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                updateInquiry(inq.id, { status: 'new' });
                                showNotification('Restored to new');
                              }}
                              className="px-2 py-1.5 text-[11px] text-stone-500 hover:text-stone-800 rounded transition-colors cursor-pointer"
                            >
                              Restore
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (window.confirm('Delete this inquiry permanently?')) {
                                deleteInquiry(inq.id);
                                showNotification('Inquiry deleted');
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-700 rounded transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SITE CONTENT EDITOR */}
          {activeTab === 'content' && (
            <div className="space-y-8 bg-white p-6 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900">
                    Edit Live Website Content
                  </h3>
                  <p className="text-xs text-stone-500">
                    Modify text, scripture anchors, story, and contact details. Click Save Changes when ready.
                  </p>
                </div>
                <button
                  onClick={handleSaveContent}
                  className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>

              {/* Branding Section */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-900">
                  1. Ministry Identity & Branding
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Sanctuary / Site Name
                    </label>
                    <input
                      type="text"
                      value={draftContent.branding.siteName}
                      onChange={(e) =>
                        setDraftContent({
                          ...draftContent,
                          branding: { ...draftContent.branding, siteName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={draftContent.branding.tagline}
                      onChange={(e) =>
                        setDraftContent({
                          ...draftContent,
                          branding: { ...draftContent.branding, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={draftContent.branding.contactEmail}
                      onChange={(e) =>
                        setDraftContent({
                          ...draftContent,
                          branding: { ...draftContent.branding, contactEmail: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Location / Online Note
                    </label>
                    <input
                      type="text"
                      value={draftContent.branding.locationNote}
                      onChange={(e) =>
                        setDraftContent({
                          ...draftContent,
                          branding: { ...draftContent.branding, locationNote: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-900">
                  2. Hero Section
                </h4>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Top Kicker / Badge
                  </label>
                  <input
                    type="text"
                    value={draftContent.hero.badgeText}
                    onChange={(e) =>
                      setDraftContent({
                        ...draftContent,
                        hero: { ...draftContent.hero, badgeText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={draftContent.hero.headline}
                    onChange={(e) =>
                      setDraftContent({
                        ...draftContent,
                        hero: { ...draftContent.hero, headline: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Subheadline
                  </label>
                  <textarea
                    rows={2}
                    value={draftContent.hero.subheadline}
                    onChange={(e) =>
                      setDraftContent({
                        ...draftContent,
                        hero: { ...draftContent.hero, subheadline: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Hero Scripture Quote
                    </label>
                    <input
                      type="text"
                      value={draftContent.hero.quoteText}
                      onChange={(e) =>
                        setDraftContent({
                          ...draftContent,
                          hero: { ...draftContent.hero, quoteText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Scripture Citation / Source
                    </label>
                    <input
                      type="text"
                      value={draftContent.hero.quoteAuthor}
                      onChange={(e) =>
                        setDraftContent({
                          ...draftContent,
                          hero: { ...draftContent.hero, quoteAuthor: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-900">
                  3. About Us & Personal Story
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Practitioner Name
                    </label>
                    <input
                      type="text"
                      value={draftContent.about.practitionerName}
                      onChange={(e) =>
                        setDraftContent({
                          ...draftContent,
                          about: { ...draftContent.about, practitionerName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Practitioner Title / Calling
                    </label>
                    <input
                      type="text"
                      value={draftContent.about.practitionerRole}
                      onChange={(e) =>
                        setDraftContent({
                          ...draftContent,
                          about: { ...draftContent.about, practitionerRole: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Mission Statement
                  </label>
                  <input
                    type="text"
                    value={draftContent.about.missionStatement}
                    onChange={(e) =>
                      setDraftContent({
                        ...draftContent,
                        about: { ...draftContent.about, missionStatement: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Personal Story Paragraphs
                  </label>
                  {draftContent.about.narrativeParagraphs.map((para, pIdx) => (
                    <div key={pIdx} className="mb-2">
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const updated = [...draftContent.about.narrativeParagraphs];
                          updated[pIdx] = e.target.value;
                          setDraftContent({
                            ...draftContent,
                            about: { ...draftContent.about, narrativeParagraphs: updated },
                          });
                        }}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  onClick={handleSaveContent}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PRAYER OFFERINGS / SERVICES MANAGER */}
          {activeTab === 'offerings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 bg-white p-4 rounded-xl">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900">
                    Manage Prayer Offerings & Vigils
                  </h3>
                  <p className="text-xs text-stone-500">
                    Add, edit, or adjust pricing & descriptions for the prayer services displayed on the public site.
                  </p>
                </div>
                <button
                  onClick={() => setIsCreatingOffering(true)}
                  className="px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Offering</span>
                </button>
              </div>

              {/* Form to create new offering */}
              {isCreatingOffering && (
                <div className="bg-amber-50/50 border border-amber-300 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs uppercase font-semibold text-amber-900">
                    Create New Prayer Offering
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Memorial Remembrance Vigil"
                        value={newOfferingDraft.title || ''}
                        onChange={(e) => setNewOfferingDraft({ ...newOfferingDraft, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Subtitle</label>
                      <input
                        type="text"
                        placeholder="e.g. Honoring loved ones who have passed"
                        value={newOfferingDraft.subtitle || ''}
                        onChange={(e) => setNewOfferingDraft({ ...newOfferingDraft, subtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Memorial / Transition"
                        value={newOfferingDraft.category || ''}
                        onChange={(e) => setNewOfferingDraft({ ...newOfferingDraft, category: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Duration or Schedule</label>
                      <input
                        type="text"
                        placeholder="e.g. 3-Day Vigil"
                        value={newOfferingDraft.durationOrSchedule || ''}
                        onChange={(e) => setNewOfferingDraft({ ...newOfferingDraft, durationOrSchedule: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-medium text-stone-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Detailed explanation of what the seeker will experience..."
                      value={newOfferingDraft.description || ''}
                      onChange={(e) => setNewOfferingDraft({ ...newOfferingDraft, description: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Contribution / Pricing Note</label>
                      <input
                        type="text"
                        placeholder="e.g. Free-will donation or Suggested $40"
                        value={newOfferingDraft.contribution || ''}
                        onChange={(e) => setNewOfferingDraft({ ...newOfferingDraft, contribution: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newOfferingDraft.isFeatured || false}
                          onChange={(e) => setNewOfferingDraft({ ...newOfferingDraft, isFeatured: e.target.checked })}
                          className="rounded"
                        />
                        <span className="font-medium text-stone-800">Feature this offering on top</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsCreatingOffering(false)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!newOfferingDraft.title) {
                          alert('Please enter an offering title.');
                          return;
                        }
                        const completeOffering: PrayerOffering = {
                          id: `serv-${Date.now()}`,
                          title: newOfferingDraft.title,
                          subtitle: newOfferingDraft.subtitle || '',
                          category: newOfferingDraft.category || 'Special Offering',
                          description: newOfferingDraft.description || '',
                          durationOrSchedule: newOfferingDraft.durationOrSchedule || 'Flexible',
                          whatIsIncluded: newOfferingDraft.whatIsIncluded || ['Dedicated prayer vigil', 'Personal reflection'],
                          contribution: newOfferingDraft.contribution || 'Free-will offering',
                          isFeatured: newOfferingDraft.isFeatured || false,
                        };
                        addOffering(completeOffering);
                        setIsCreatingOffering(false);
                        showNotification('New prayer offering added!');
                      }}
                      className="px-4 py-1.5 text-xs bg-stone-900 text-white rounded hover:bg-stone-800"
                    >
                      Add Offering
                    </button>
                  </div>
                </div>
              )}

              {/* List of existing offerings */}
              <div className="space-y-4">
                {content.services.offerings.map((offering) => (
                  <div
                    key={offering.id}
                    className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs"
                  >
                    {editingOfferingId === offering.id && offeringDraft ? (
                      /* Inline editor */
                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">Title</label>
                            <input
                              type="text"
                              value={offeringDraft.title}
                              onChange={(e) => setOfferingDraft({ ...offeringDraft, title: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">Subtitle</label>
                            <input
                              type="text"
                              value={offeringDraft.subtitle}
                              onChange={(e) => setOfferingDraft({ ...offeringDraft, subtitle: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-stone-600 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={offeringDraft.description}
                            onChange={(e) => setOfferingDraft({ ...offeringDraft, description: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">Schedule / Duration</label>
                            <input
                              type="text"
                              value={offeringDraft.durationOrSchedule}
                              onChange={(e) => setOfferingDraft({ ...offeringDraft, durationOrSchedule: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-1">Contribution</label>
                            <input
                              type="text"
                              value={offeringDraft.contribution}
                              onChange={(e) => setOfferingDraft({ ...offeringDraft, contribution: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            onClick={() => {
                              setEditingOfferingId(null);
                              setOfferingDraft(null);
                            }}
                            className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              updateOffering(offeringDraft);
                              setEditingOfferingId(null);
                              setOfferingDraft(null);
                              showNotification('Offering updated!');
                            }}
                            className="px-4 py-1.5 bg-stone-900 text-white rounded hover:bg-stone-800"
                          >
                            Save Offering
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display card with edit button */
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <span className="font-semibold text-stone-800">{offering.title}</span>
                            <span>·</span>
                            <span>{offering.durationOrSchedule}</span>
                            <span>·</span>
                            <span className="text-amber-800">{offering.contribution}</span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
                            {offering.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingOfferingId(offering.id);
                              setOfferingDraft({ ...offering });
                            }}
                            className="px-3 py-1.5 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete prayer offering "${offering.title}"?`)) {
                                deleteOffering(offering.id);
                                showNotification('Offering deleted');
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-700 rounded transition-colors cursor-pointer"
                            title="Delete Offering"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BACKUP & HOSTING TOOLS */}
          {activeTab === 'hosting' && (
            <div className="space-y-6">
              {/* CMS & Hosting Overview */}
              <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-stone-900">
                  Ready on Your Hosting & Self-Managed CMS
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  As requested, this sanctuary website is built to be completely self-manageable without requiring complex technical setups.
                  All content edits and visitor inquiries are stored instantly in browser persistence, and full backups can be exported or imported anytime.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                    <h4 className="text-xs font-semibold text-stone-900 mb-1">
                      1. Instant Live Updates
                    </h4>
                    <p className="text-xs text-stone-500">
                      Changes made in the CMS Studio update the live site immediately with zero build wait time.
                    </p>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                    <h4 className="text-xs font-semibold text-stone-900 mb-1">
                      2. Real Inquiries Inbox
                    </h4>
                    <p className="text-xs text-stone-500">
                      Incoming seeker requests arrive in real time, ready for you to mark In Prayer and reply directly via email.
                    </p>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                    <h4 className="text-xs font-semibold text-stone-900 mb-1">
                      3. On-Page SEO & Mobile
                    </h4>
                    <p className="text-xs text-stone-500">
                      Pre-configured Schema.org JSON-LD structured data, OpenGraph cards, fast loading, and fluid responsive design.
                    </p>
                  </div>
                </div>
              </div>

              {/* Backup & Data Actions */}
              <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
                <h3 className="font-serif text-base font-semibold text-stone-900">
                  Data Backup & Migration Tools
                </h3>
                <p className="text-xs text-stone-500">
                  Download a complete JSON snapshot of all your site content, prayer offerings, and inquiries, or import an existing backup.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={exportDataJson}
                    className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Backup (.json)</span>
                  </button>

                  <label className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-colors flex items-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Restore from Backup (.json)</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJsonFile}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => {
                      if (window.confirm('Reset all site content and sample inquiries to default original text?')) {
                        resetAllDefaults();
                        setDraftContent(content);
                        showNotification('Reset to defaults completed');
                      }
                    }}
                    className="px-3.5 py-2 text-xs font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 border border-transparent rounded-md transition-colors flex items-center gap-1.5 ml-auto cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>Selah Sanctuary Management Suite</span>
            <span>·</span>
            <span>All inquiries encrypted & private</span>
          </div>
          <button
            onClick={() => setIsCmsOpen(false)}
            className="px-4 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-100 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
