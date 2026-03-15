'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { panicExit, handleEscapeKey, setDisguisedTitle } from '@/lib/safety';

/**
 * THE MOST IMPORTANT COMPONENT IN HAVEN
 *
 * Always visible. Always accessible. One tap to safety.
 * Disguised as a simple close button so it looks benign
 * to someone glancing over her shoulder.
 */
export default function PanicExit() {
  useEffect(() => {
    // Set disguised page title
    setDisguisedTitle();

    // Listen for double-escape
    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <button
      onClick={panicExit}
      className="fixed top-3 right-3 z-[9999] w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border border-border hover:bg-white transition-colors shadow-sm no-print"
      aria-label="Exit quickly"
      title="Exit"
    >
      <X className="w-5 h-5 text-text-secondary" />
    </button>
  );
}
