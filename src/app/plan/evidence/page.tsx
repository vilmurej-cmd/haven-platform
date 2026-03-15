'use client';

import { useState } from 'react';
import { Camera, MessageSquare, FileText, Printer, ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function EvidencePage() {
  const [journalEntry, setJournalEntry] = useState('');
  const [journalDate, setJournalDate] = useState(new Date().toISOString().split('T')[0]);

  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <Link
        href="/plan"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-8 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to plan
      </Link>

      {/* Header */}
      <div className="text-center mb-10 animate-safe-fade-in">
        <div className="w-16 h-16 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-haven-purple" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
          Evidence Documentation
        </h1>
        <p className="text-text-secondary text-base max-w-lg mx-auto leading-relaxed">
          Your story matters. Evidence matters. This guide will help you document
          what is happening safely and effectively.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Safety Warning */}
        <div className="p-5 rounded-2xl bg-haven-rose/10 border border-haven-rose/30 animate-safe-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-haven-emergency flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-1">
                Safety First
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Only document evidence when it is safe to do so. If documenting puts you in more
                danger, do not do it. Your safety is more important than evidence. A domestic
                violence advocate can help you document safely.
              </p>
            </div>
          </div>
        </div>

        {/* Photographing Injuries */}
        <section className="p-6 rounded-2xl bg-white border border-border-light animate-safe-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Camera className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              Photographing Injuries
            </h2>
          </div>
          <ul className="space-y-3 text-text-secondary text-base leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Include a date reference</strong> in the photo — a newspaper, a phone screen showing the date, or write the date on a piece of paper next to the injury.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Take multiple angles.</strong> Photograph the injury close up, then from a distance to show location on the body.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Use good lighting.</strong> Natural light is best. Make sure bruises and marks are clearly visible.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Photograph healing over time.</strong> Bruises change color as they heal. Take follow-up photos over several days.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Store photos safely.</strong> Email them to a trusted person, upload to a secure cloud account your abuser does not know about, or give them to an advocate.</span>
            </li>
          </ul>
        </section>

        {/* Saving Threatening Messages */}
        <section className="p-6 rounded-2xl bg-white border border-border-light animate-safe-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              Saving Threatening Messages
            </h2>
          </div>
          <ul className="space-y-3 text-text-secondary text-base leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Screenshot text messages</strong> showing the sender&apos;s name/number, the date and time, and the full conversation context.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Save voicemails.</strong> Many phones let you save voicemails as audio files. Email them to a trusted account.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Document social media threats.</strong> Screenshot posts, messages, and comments with timestamps visible.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Email evidence to yourself</strong> at an account your abuser does not know about. This creates a timestamped record.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
              <span><strong>Do not delete the originals</strong> unless you fear for your safety. Courts may want to see the original device.</span>
            </li>
          </ul>
        </section>

        {/* Journal */}
        <section className="p-6 rounded-2xl bg-white border-2 border-haven-purple/20 animate-safe-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              Your Journal
            </h2>
          </div>

          <p className="text-text-secondary text-base leading-relaxed mb-4">
            Write down what happened, when it happened, and how it made you feel.
            Include details: what was said, who was present, any injuries.
            Your words are powerful evidence.
          </p>

          <div className="p-4 rounded-xl bg-haven-warm border border-haven-gold/20 mb-5">
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong>This entry is NOT saved</strong> unless you explicitly choose to encrypt and save it.
              When you close this page, it disappears. HAVEN stores nothing.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label htmlFor="journal-date" className="block text-sm font-medium text-text-primary mb-1">
                Date
              </label>
              <input
                id="journal-date"
                type="date"
                value={journalDate}
                onChange={(e) => setJournalDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
              />
            </div>
            <div>
              <label htmlFor="journal-entry" className="block text-sm font-medium text-text-primary mb-1">
                What happened
              </label>
              <textarea
                id="journal-entry"
                rows={6}
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Describe what happened in your own words. Include what was said, what was done, who was there, and any injuries. Your words matter."
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base leading-relaxed resize-y"
              />
            </div>
          </div>

          {journalEntry.trim() && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-haven-purple text-white hover:bg-haven-purple/90 transition-colors text-sm font-medium"
              >
                <Printer className="w-4 h-4" />
                Export as PDF
              </button>
            </div>
          )}
        </section>

        {/* Legal Resources Link */}
        <div className="text-center animate-safe-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/plan/legal"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-haven-purple-soft text-haven-purple text-sm font-medium hover:bg-haven-purple/15 transition-colors"
          >
            Learn about your legal options
          </Link>
        </div>

        {/* Reassurance */}
        <div className="text-center pb-4 animate-safe-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-text-secondary text-base max-w-md mx-auto leading-relaxed font-serif italic">
            Documenting what is happening to you is an act of courage. You are building the foundation
            for your freedom.
          </p>
        </div>
      </div>
    </div>
  );
}
