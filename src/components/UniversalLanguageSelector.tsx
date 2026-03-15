'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Globe, Search, Check, X, ArrowRight } from 'lucide-react';
import { useLanguage, LANGUAGES, POPULAR_CODES, type LanguageInfo } from '@/lib/language-context';

export default function UniversalLanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestedLang, setSuggestedLang] = useState<LanguageInfo | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Auto-detect browser language on first visit (no localStorage — HAVEN no-trace)
  const [suggestionDismissed, setSuggestionDismissed] = useState(false);
  useEffect(() => {
    if (suggestionDismissed) return;
    const browserLang = navigator.language?.split('-')[0];
    if (browserLang && browserLang !== 'en') {
      const match = LANGUAGES.find(
        (l) => l.code === browserLang || l.code.startsWith(browserLang)
      );
      if (match) {
        setSuggestedLang(match);
        setShowSuggestion(true);
      }
    }
  }, [suggestionDismissed]);

  // Recent languages tracked in-memory only (no localStorage — HAVEN no-trace)
  const [recentLangs, setRecentLangs] = useState<string[]>([]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Focus search on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  // Close on click outside
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (code: string) => {
      setLanguage(code);
      setRecentLangs((prev) => [code, ...prev.filter((c) => c !== code)].slice(0, 3));
      setIsOpen(false);
    },
    [setLanguage]
  );

  const handleDismissSuggestion = useCallback(() => {
    setShowSuggestion(false);
    setSuggestionDismissed(true);
  }, []);

  const handleAcceptSuggestion = useCallback(() => {
    if (suggestedLang) {
      setLanguage(suggestedLang.code);
      setRecentLangs((prev) => [suggestedLang.code, ...prev.filter((c) => c !== suggestedLang.code)].slice(0, 3));
    }
    setShowSuggestion(false);
    setSuggestionDismissed(true);
  }, [suggestedLang, setLanguage]);

  // Filter languages
  const searchLower = search.toLowerCase();
  const filtered = search
    ? LANGUAGES.filter(
        (l) =>
          l.name.toLowerCase().includes(searchLower) ||
          l.nativeName.toLowerCase().includes(searchLower) ||
          l.code.toLowerCase().includes(searchLower)
      )
    : LANGUAGES;

  const popularLangs = LANGUAGES.filter((l) => POPULAR_CODES.includes(l.code));
  const recentLangInfos = recentLangs
    .map((code) => LANGUAGES.find((l) => l.code === code))
    .filter(Boolean) as LanguageInfo[];

  const currentLang = LANGUAGES.find((l) => l.code === language);

  return (
    <>
      {/* Suggestion Banner */}
      {showSuggestion && suggestedLang && (
        <div className="fixed bottom-20 left-4 z-[50] animate-in">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-[#7C3AED]/20 rounded-xl shadow-lg max-w-sm">
            <Globe className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
            <p className="text-sm text-gray-600">
              It looks like you speak{' '}
              <span className="text-[#7C3AED] font-semibold">{suggestedLang.nativeName}</span>.
              Switch?
            </p>
            <button
              onClick={handleAcceptSuggestion}
              className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/30 rounded-lg hover:bg-[#7C3AED]/20 transition-colors"
            >
              Switch <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={handleDismissSuggestion}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Globe Button - positioned bottom-left to avoid PanicExit at top-right */}
      <button
        onClick={() => setIsOpen(true)}
        className="no-print fixed bottom-4 left-4 z-[40] flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-[#7C3AED] bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-[#7C3AED]/30 rounded-full shadow-sm hover:shadow-md transition-all"
        title={`Language: ${currentLang?.nativeName || 'English'}`}
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium">
          {currentLang?.code?.toUpperCase() || 'EN'}
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            className="w-full max-w-lg bg-[#FFFBF5] border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#7C3AED]" />
                <h2 className="font-bold text-lg text-gray-800">
                  Language
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search languages..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED]/40 focus:ring-1 focus:ring-[#7C3AED]/20"
                />
              </div>
            </div>

            {/* Language List */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              {/* Recently Used */}
              {!search && recentLangInfos.length > 0 && (
                <div className="px-5 pt-4 pb-2">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Recently Used
                  </p>
                  <div className="space-y-0.5">
                    {recentLangInfos.map((lang) => (
                      <LangRow
                        key={lang.code}
                        lang={lang}
                        isActive={lang.code === language}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Popular */}
              {!search && (
                <div className="px-5 pt-4 pb-2">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Popular Languages
                  </p>
                  <div className="space-y-0.5">
                    {popularLangs.map((lang) => (
                      <LangRow
                        key={lang.code}
                        lang={lang}
                        isActive={lang.code === language}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All / Search Results */}
              <div className="px-5 pt-4 pb-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {search ? `Results (${filtered.length})` : 'All Languages'}
                </p>
                <div className="space-y-0.5">
                  {filtered.map((lang) => (
                    <LangRow
                      key={lang.code}
                      lang={lang}
                      isActive={lang.code === language}
                      onSelect={handleSelect}
                    />
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-sm text-gray-400 py-4 text-center">
                      No languages found for &ldquo;{search}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* -- Language Row ----------------------------------------- */
function LangRow({
  lang,
  isActive,
  onSelect,
}: {
  lang: LanguageInfo;
  isActive: boolean;
  onSelect: (code: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(lang.code)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
        isActive
          ? 'bg-[#7C3AED]/10 border border-[#7C3AED]/20'
          : 'hover:bg-gray-100 border border-transparent'
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              isActive ? 'text-[#7C3AED]' : 'text-gray-800'
            }`}
          >
            {lang.nativeName}
          </span>
          {lang.rtl && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 font-mono">
              RTL
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400">{lang.name}</span>
      </div>
      <span className="text-[10px] font-mono text-gray-400">{lang.code}</span>
      {isActive && <Check className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />}
    </button>
  );
}
