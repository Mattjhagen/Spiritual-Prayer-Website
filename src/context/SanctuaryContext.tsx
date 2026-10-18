import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, PrayerInquiry, PrayerOffering } from '../types';
import { initialSiteContent, sampleInquiries } from '../data/initialContent';

const STORAGE_KEY_CONTENT = 'selah_sanctuary_content_v1';
const STORAGE_KEY_INQUIRIES = 'selah_prayer_inquiries_v1';

interface SanctuaryContextType {
  content: SiteContent;
  inquiries: PrayerInquiry[];
  selectedServiceForContact: string | null;
  setSelectedServiceForContact: (serviceTitle: string | null) => void;
  isCmsOpen: boolean;
  setIsCmsOpen: (isOpen: boolean) => void;
  submitInquiry: (data: Omit<PrayerInquiry, 'id' | 'createdAt' | 'status'>) => PrayerInquiry;
  updateInquiry: (id: string, updates: Partial<PrayerInquiry>) => void;
  deleteInquiry: (id: string) => void;
  updateContent: (newContent: SiteContent) => void;
  updateOffering: (offering: PrayerOffering) => void;
  addOffering: (offering: PrayerOffering) => void;
  deleteOffering: (id: string) => void;
  resetAllDefaults: () => void;
  exportDataJson: () => void;
  importDataJson: (jsonStr: string) => { success: boolean; error?: string };
}

const SanctuaryContext = createContext<SanctuaryContextType | undefined>(undefined);

export const SanctuaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return initialSiteContent;
  });

  const [inquiries, setInquiries] = useState<PrayerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return sampleInquiries;
  });

  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string | null>(null);
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);

  // Sync content to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(content));
    } catch (e) {
      console.warn('Could not save content to localStorage', e);
    }
  }, [content]);

  // Sync inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Could not save inquiries to localStorage', e);
    }
  }, [inquiries]);

  const submitInquiry = (data: Omit<PrayerInquiry, 'id' | 'createdAt' | 'status'>): PrayerInquiry => {
    const newInquiry: PrayerInquiry = {
      ...data,
      id: `req-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiry = (id: string, updates: Partial<PrayerInquiry>) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  const updateOffering = (offering: PrayerOffering) => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        offerings: prev.services.offerings.map((item) =>
          item.id === offering.id ? offering : item
        ),
      },
    }));
  };

  const addOffering = (offering: PrayerOffering) => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        offerings: [...prev.services.offerings, offering],
      },
    }));
  };

  const deleteOffering = (id: string) => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        offerings: prev.services.offerings.filter((item) => item.id !== id),
      },
    }));
  };

  const resetAllDefaults = () => {
    setContent(initialSiteContent);
    setInquiries(sampleInquiries);
    localStorage.removeItem(STORAGE_KEY_CONTENT);
    localStorage.removeItem(STORAGE_KEY_INQUIRIES);
  };

  const exportDataJson = () => {
    const exportBundle = {
      content,
      inquiries,
      exportedAt: new Date().toISOString(),
      app: 'Selah Sanctuary CMS',
    };
    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `selah_sanctuary_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJson = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.content && parsed.content.branding && parsed.content.hero) {
        setContent(parsed.content);
        if (Array.isArray(parsed.inquiries)) {
          setInquiries(parsed.inquiries);
        }
        return { success: true };
      } else {
        return { success: false, error: 'Invalid backup file structure.' };
      }
    } catch {
      return { success: false, error: 'Could not parse JSON file. Please check file format.' };
    }
  };

  return (
    <SanctuaryContext.Provider
      value={{
        content,
        inquiries,
        selectedServiceForContact,
        setSelectedServiceForContact,
        isCmsOpen,
        setIsCmsOpen,
        submitInquiry,
        updateInquiry,
        deleteInquiry,
        updateContent,
        updateOffering,
        addOffering,
        deleteOffering,
        resetAllDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </SanctuaryContext.Provider>
  );
};

export const useSanctuary = () => {
  const context = useContext(SanctuaryContext);
  if (!context) {
    throw new Error('useSanctuary must be used within a SanctuaryProvider');
  }
  return context;
};
