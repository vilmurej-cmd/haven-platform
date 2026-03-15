'use client';

import { ShieldCheck, EyeOff, Cookie, BarChart3, Database, UserX, LogOut, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const privacyItems = [
  {
    icon: Cookie,
    title: 'No Cookies',
    description:
      'HAVEN does not set any cookies on your device. There is no way for anyone to see that you visited this site through cookie inspection.',
  },
  {
    icon: BarChart3,
    title: 'No Analytics or Tracking',
    description:
      'We do not use Google Analytics, Meta Pixel, or any third-party tracking service. No one is watching what you do here. No heatmaps, no session recordings, nothing.',
  },
  {
    icon: Database,
    title: 'No Data Storage',
    description:
      'HAVEN does not store any information about you. There are no databases recording your visits, searches, or interactions. Everything stays in your browser and vanishes when you leave.',
  },
  {
    icon: EyeOff,
    title: 'Disguised Browser Title',
    description:
      'Your browser tab says "Daily Weather Forecast" while you are on HAVEN. If someone glances at your screen or checks your open tabs, they will see a weather page title, not a safety resource.',
  },
  {
    icon: UserX,
    title: 'No Account Creation',
    description:
      'You will never be asked to create an account, provide an email, or sign in. HAVEN works immediately with zero personal information required.',
  },
  {
    icon: LogOut,
    title: 'Panic Exit',
    description:
      'Double-tap the Escape key or tap the X button to instantly leave HAVEN. The page replaces itself in your browser history with a weather website, so there is no trace in your back button history.',
  },
  {
    icon: Lock,
    title: 'Journal Entries Stay Local',
    description:
      'If you use the safety journal feature, your entries are encrypted locally within your browser session only. They are never transmitted to any server. When you close the page, they are gone forever.',
  },
  {
    icon: ShieldCheck,
    title: 'No Third-Party Trackers',
    description:
      'HAVEN does not embed any third-party scripts, social media widgets, or advertising networks. The only external connections are to Google Fonts for typography and direct links to resource organizations you choose to visit.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to safety
      </Link>

      <div className="max-w-2xl mx-auto w-full animate-safe-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-haven-purple" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            HAVEN is built on a no-trace architecture. Your safety is the priority &mdash; including your digital safety.
          </p>
        </div>

        {/* Core promise */}
        <div className="bg-haven-purple-soft rounded-2xl p-6 sm:p-8 mb-8 text-center animate-safe-fade-in" style={{ animationDelay: '0.1s' }}>
          <p className="font-serif italic text-lg text-text-primary leading-relaxed">
            &ldquo;We built HAVEN so that no one &mdash; not an abuser checking your phone, not a tech-savvy
            stalker, not a data broker &mdash; can ever know you were here.&rdquo;
          </p>
        </div>

        {/* Privacy items */}
        <div className="space-y-4 mb-10">
          {privacyItems.map((item, i) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-border p-5 sm:p-6 animate-safe-fade-in"
              style={{ animationDelay: `${0.15 + i * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-haven-purple" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-text-primary mb-1">
                    {item.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* History replacement */}
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-8 animate-safe-fade-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">
            History Replacement on Exit
          </h2>
          <p className="text-text-secondary leading-relaxed">
            When you leave HAVEN through the panic exit, we use browser history replacement to overwrite your
            visit with a neutral page. This means pressing the back button will not bring someone back to HAVEN.
            For maximum safety, we recommend using a private or incognito browser window, and clearing your
            browser history after visiting any safety resource.
          </p>
        </div>

        {/* Summary */}
        <div className="text-center mb-4 animate-safe-fade-in" style={{ animationDelay: '0.65s' }}>
          <p className="text-text-muted text-sm leading-relaxed max-w-md mx-auto">
            HAVEN collects zero data. We have no servers storing your information. We have no analytics
            dashboards. We have nothing to hand over because we have nothing. That is by design.
          </p>
        </div>
      </div>
    </div>
  );
}
