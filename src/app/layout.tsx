import type { Metadata } from 'next';
import './globals.css';
import PanicExit from '@/components/PanicExit';

export const metadata: Metadata = {
  title: 'Daily Weather Forecast',
  description: 'Your daily weather and planning resource.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-safe text-text-primary min-h-screen antialiased">
        <PanicExit />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="no-print border-t border-border-light mt-16 py-8 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-sm">
          <a href="tel:18007997233" className="text-haven-purple hover:underline font-medium">
            National DV Hotline: 1-800-799-7233
          </a>
          <span className="text-border">|</span>
          <span className="text-text-muted">Text START to 88788</span>
          <span className="text-border">|</span>
          <span className="text-text-muted">Crisis Text Line: Text HOME to 741741</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-text-muted mb-3">
          <a href="/about" className="hover:text-text-secondary">About</a>
          <a href="/privacy" className="hover:text-text-secondary">Privacy</a>
          <a href="/terms" className="hover:text-text-secondary">Terms</a>
          <a href="/network" className="hover:text-text-secondary">Resources</a>
        </div>
        <p className="text-xs text-text-muted leading-relaxed max-w-lg mx-auto">
          If you are in immediate danger, call 911. HAVEN does not store your information.
          Your visit leaves no trace. You are not alone.
        </p>
        <p className="text-[11px] text-text-muted mt-3">A Vilmure Ventures Company</p>
      </div>
    </footer>
  );
}
