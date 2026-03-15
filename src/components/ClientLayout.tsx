'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/language-context';
import UniversalLanguageSelector from '@/components/UniversalLanguageSelector';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <UniversalLanguageSelector />
    </LanguageProvider>
  );
}
