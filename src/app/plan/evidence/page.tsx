'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Camera,
  MessageSquare,
  Mic,
  ClipboardList,
  Shield,
  AlertTriangle,
  Lock,
  Scale,
  Plus,
  Trash2,
  Copy,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

/* ────────────────────────────────────────────────────────
   Evidence types
   ──────────────────────────────────────────────────────── */

const EVIDENCE_TYPES = [
  {
    icon: Camera,
    title: 'Photos of Injuries',
    tips: [
      'Take photos as soon as safely possible after each incident',
      'Include a close-up of the injury and a wider shot showing your face for identification',
      'Place a coin or ruler next to injuries to show scale',
      'Modern phone photos include date, time, and location metadata -- this is powerful evidence',
      'Take follow-up photos as bruises develop (they often look worse 2-3 days later)',
      'Email photos to a trusted friend or a separate email account your partner does not know about',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Screenshots of Threatening Messages',
    tips: [
      'Screenshot texts, emails, social media messages, and voicemails',
      'Make sure screenshots show the sender\'s name or number and the date',
      'Screenshot entire conversation threads for context, not just individual messages',
      'Forward them to a trusted person or a separate email address',
      'Do not delete the originals if it is safe to keep them -- courts may want to see the original device',
    ],
  },
  {
    icon: Mic,
    title: 'Audio Recordings',
    tips: [
      'Check your state\'s recording laws -- some states require one-party consent, others require both parties',
      'Voicemails can be recorded using another phone -- play on speaker and record on a second device',
      'Many phones have built-in voice memo apps that can record discreetly',
      'Store recordings in a secure cloud account or email them to a safe address',
      'Even in states where recordings are not admissible, they can help build your case and support your credibility',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Medical Records',
    tips: [
      'Go to a doctor or emergency room after incidents, even if injuries seem minor',
      'Tell medical staff honestly how you were injured -- they are required to document it',
      'Ask for copies of all medical records related to your injuries',
      'Request a body map showing the location and extent of injuries',
      'Medical records with dates and descriptions create a documented timeline that courts trust',
    ],
  },
  {
    icon: Shield,
    title: 'Police Reports',
    tips: [
      'Call 911 during or after incidents when it is safe to do so',
      'Request a copy of every police report filed',
      'If officers do not file a report, ask for the incident number and officer badge numbers',
      'You can file a report after the fact at your local police station',
      'Police reports create an official record that strengthens protective order petitions and custody cases',
    ],
  },
  {
    icon: FileText,
    title: 'Witness Statements',
    tips: [
      'Ask trusted witnesses (neighbors, friends, family) to write down what they saw or heard',
      'Statements should include the date, time, location, and specific details',
      'Witnesses do not need to have seen the abuse directly -- hearing screams, seeing injuries, or noticing changes in your behavior all count',
      'Written statements can be notarized for added credibility',
      'Witnesses may also be willing to testify in court on your behalf',
    ],
  },
];

/* ────────────────────────────────────────────────────────
   Safe storage options
   ──────────────────────────────────────────────────────── */

const STORAGE_OPTIONS = [
  {
    label: 'Trusted Friend or Family Member',
    description:
      'Give copies of evidence to someone you trust completely. This ensures your evidence survives even if your abuser finds and destroys your copies.',
  },
  {
    label: 'Safety Deposit Box',
    description:
      'A safety deposit box at a bank your partner does not use provides a secure, private location. Costs are typically $25-75 per year.',
  },
  {
    label: 'Secure Email to Yourself',
    description:
      'Create an email account your partner does not know about. Email evidence to yourself to create a timestamped, cloud-stored record. Use a strong unique password and two-factor authentication.',
  },
  {
    label: 'Cloud Storage Account',
    description:
      'Set up a Google Drive, iCloud, or Dropbox account your partner does not know about. Upload photos, recordings, and documents. Make sure auto-sync does not save to a shared device.',
  },
  {
    label: 'Your Attorney or DV Advocate',
    description:
      'Give copies to your attorney or domestic violence advocate. They can store evidence securely and advise you on what additional documentation would strengthen your case.',
  },
];

/* ────────────────────────────────────────────────────────
   Legal admissibility tips
   ──────────────────────────────────────────────────────── */

const LEGAL_TIPS = [
  'Keep original evidence whenever possible -- copies are useful but originals carry more weight',
  'Document the chain of custody -- note when you took or received each piece of evidence',
  'Date and label everything clearly',
  'Do not alter evidence in any way -- no editing photos, no deleting parts of message threads',
  'Audio and video recording laws vary by state -- check your state\'s consent requirements',
  'Medical records and police reports are highly credible in court',
  'Consistent, dated journal entries show a pattern that judges take seriously',
  'Screenshots should show the sender\'s identity and timestamp whenever possible',
];

/* ────────────────────────────────────────────────────────
   Evidence log entry
   ──────────────────────────────────────────────────────── */

interface EvidenceEntry {
  id: number;
  date: string;
  type: string;
  description: string;
  evidenceCollected: string;
}

const INCIDENT_TYPES = [
  'Physical violence',
  'Verbal/emotional abuse',
  'Threats',
  'Property destruction',
  'Sexual abuse',
  'Financial abuse',
  'Stalking/monitoring',
  'Violation of protective order',
  'Other',
];

/* ────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────── */

export default function EvidencePage() {
  const [entries, setEntries] = useState<EvidenceEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Omit<EvidenceEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    type: '',
    description: '',
    evidenceCollected: '',
  });
  const [forwardEmail, setForwardEmail] = useState('');
  const [copied, setCopied] = useState(false);

  function addEntry() {
    if (!currentEntry.date || !currentEntry.description) return;
    setEntries((prev) => [
      ...prev,
      { ...currentEntry, id: Date.now() },
    ]);
    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      type: '',
      description: '',
      evidenceCollected: '',
    });
  }

  function removeEntry(id: number) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function generateEmailText(): string {
    if (entries.length === 0) return '';
    let text = 'EVIDENCE LOG -- CONFIDENTIAL\n';
    text += '========================================\n\n';
    entries.forEach((entry, i) => {
      text += `INCIDENT ${i + 1}\n`;
      text += `Date: ${entry.date}\n`;
      if (entry.type) text += `Type: ${entry.type}\n`;
      text += `Description: ${entry.description}\n`;
      if (entry.evidenceCollected) text += `Evidence Collected: ${entry.evidenceCollected}\n`;
      text += '\n----------------------------------------\n\n';
    });
    text += 'This log was generated by HAVEN. No data was stored on the device or server.\n';
    return text;
  }

  function copyToClipboard() {
    const text = generateEmailText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <Link
        href="/plan"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to safety plan
      </Link>

      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10 animate-safe-fade-in">
          <div className="w-14 h-14 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-haven-purple" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Evidence Documentation
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            Your story matters. Evidence matters. This guide will help you document what is
            happening safely and effectively.
          </p>
        </div>

        {/* ── Safety Warning ── */}
        <div className="p-5 rounded-2xl bg-haven-emergency/5 border border-haven-emergency/20 mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-haven-emergency flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-1">
                Safety First
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Only document evidence when it is safe to do so. If documenting puts you in more
                danger, do not do it. Your safety is more important than evidence. A domestic
                violence advocate can help you document safely. Never confront your abuser with
                evidence you have collected.
              </p>
            </div>
          </div>
        </div>

        {/* ── Types of Evidence ── */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-5">
            Types of Evidence
          </h2>

          <div className="space-y-5">
            {EVIDENCE_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="p-5 rounded-2xl bg-white border border-border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-haven-purple" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-text-primary">
                      {type.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {type.tips.map((tip) => (
                      <li
                        key={tip}
                        className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                      >
                        <span className="text-haven-purple font-bold mt-0.5 flex-shrink-0">
                          -
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── How to Document ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              How to Document
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              For every incident, record the following details as soon as it is safe to do so.
              The more specific and consistent your records, the stronger your case.
            </p>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">
                  1
                </span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-text-primary">Date and time</strong> -- Be as specific
                  as possible. &ldquo;Tuesday, March 12, around 11pm&rdquo; is better than
                  &ldquo;last week.&rdquo;
                </p>
              </div>
              <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">
                  2
                </span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-text-primary">What happened</strong> -- Write down
                  exactly what was said and done. Use direct quotes when you can remember them.
                </p>
              </div>
              <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">
                  3
                </span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-text-primary">Injuries or damage</strong> -- Describe
                  any physical injuries, damaged property, or emotional impact.
                </p>
              </div>
              <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">
                  4
                </span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-text-primary">Witnesses</strong> -- Note anyone who
                  was present or who saw or heard anything.
                </p>
              </div>
              <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">
                  5
                </span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-text-primary">Evidence collected</strong> -- Photos
                  taken, screenshots saved, recordings made, medical visits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Where to Store Evidence ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Where to Store Evidence Safely
            </h2>
          </div>

          <div className="space-y-4">
            {STORAGE_OPTIONS.map((option) => (
              <div
                key={option.label}
                className="p-5 rounded-2xl bg-white border border-border"
              >
                <h3 className="font-serif text-base font-semibold text-text-primary mb-1">
                  {option.label}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-haven-emergency/5 border border-haven-emergency/20">
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong className="text-text-primary">Never store evidence</strong> where your
              abuser might find it -- not on a shared computer, a shared cloud account, or in a
              place they have access to. If they find your evidence, it could escalate the
              danger.
            </p>
          </div>
        </section>

        {/* ── Legal Admissibility ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Scale className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Legal Admissibility Tips
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border">
            <ul className="space-y-2">
              {LEGAL_TIPS.map((tip) => (
                <li
                  key={tip}
                  className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                >
                  <span className="text-haven-purple font-bold mt-0.5 flex-shrink-0">-</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Evidence Log ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Evidence Log
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-haven-emergency/5 border border-haven-emergency/20 mb-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-haven-emergency flex-shrink-0 mt-0.5" />
              <p className="text-text-secondary text-sm leading-relaxed">
                <strong className="text-text-primary">This data is NOT saved.</strong> Everything
                you enter here exists only while this page is open. When you close or refresh
                this page, all entries are permanently deleted. HAVEN stores nothing.
              </p>
            </div>
          </div>

          {/* Existing entries */}
          {entries.length > 0 && (
            <div className="space-y-3 mb-6">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-white border border-border"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-text-muted text-xs font-medium">
                          #{index + 1}
                        </span>
                        <span className="text-text-primary text-sm font-medium">
                          {entry.date}
                        </span>
                        {entry.type && (
                          <span className="text-xs text-haven-purple bg-haven-purple-soft px-2 py-0.5 rounded-full">
                            {entry.type}
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {entry.description}
                      </p>
                      {entry.evidenceCollected && (
                        <p className="text-text-muted text-xs mt-1">
                          Evidence: {entry.evidenceCollected}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="p-2 rounded-lg text-text-muted hover:text-haven-emergency hover:bg-haven-emergency/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Remove entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New entry form */}
          <div className="p-5 rounded-2xl bg-white border-2 border-haven-purple/20">
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-4">
              Add an Incident
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="entry-date"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Date
                </label>
                <input
                  id="entry-date"
                  type="date"
                  value={currentEntry.date}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="entry-type"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Type of Incident
                </label>
                <select
                  id="entry-type"
                  value={currentEntry.type}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base appearance-none"
                >
                  <option value="">Select type...</option>
                  {INCIDENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="entry-description"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Description
                </label>
                <textarea
                  id="entry-description"
                  rows={4}
                  value={currentEntry.description}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe what happened in your own words. Include what was said, what was done, who was there, and any injuries."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base leading-relaxed resize-y"
                />
              </div>

              <div>
                <label
                  htmlFor="entry-evidence"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Evidence Collected
                </label>
                <input
                  id="entry-evidence"
                  type="text"
                  value={currentEntry.evidenceCollected}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({
                      ...prev,
                      evidenceCollected: e.target.value,
                    }))
                  }
                  placeholder="e.g., Photos taken, screenshot saved, saw doctor"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
                />
              </div>

              <button
                onClick={addEntry}
                disabled={!currentEntry.date || !currentEntry.description}
                className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-colors min-h-[48px] ${
                  currentEntry.date && currentEntry.description
                    ? 'bg-haven-purple text-white hover:bg-haven-purple/90'
                    : 'bg-border text-text-muted cursor-not-allowed'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add to Log
              </button>
            </div>
          </div>
        </section>

        {/* ── Forward to Safe Email ── */}
        {entries.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-haven-purple" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary">
                Forward to Safe Email
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Copy your evidence log as formatted text, then paste it into an email to a
                trusted account. This creates a timestamped record outside of this device.
              </p>

              <div className="mb-4">
                <label
                  htmlFor="forward-email"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Safe Email Address (for your reference)
                </label>
                <input
                  id="forward-email"
                  type="email"
                  value={forwardEmail}
                  onChange={(e) => setForwardEmail(e.target.value)}
                  placeholder="your-safe-email@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
                />
              </div>

              <div className="p-3 rounded-xl bg-bg-safe border border-border mb-4 max-h-48 overflow-y-auto">
                <pre className="text-text-secondary text-xs leading-relaxed whitespace-pre-wrap font-sans">
                  {generateEmailText()}
                </pre>
              </div>

              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors min-h-[48px]"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}
              </button>

              <p className="text-text-muted text-xs mt-3 text-center">
                Open your safe email account and paste this text into a new message. HAVEN does
                not send emails -- you remain in full control.
              </p>
            </div>
          </section>
        )}

        {/* Bottom */}
        <div className="text-center py-8 border-t border-border-light">
          <p className="font-serif text-lg text-text-primary leading-relaxed italic max-w-md mx-auto">
            Documenting what is happening to you is an act of courage. You are building the
            foundation for your freedom.
          </p>
        </div>
      </div>
    </div>
  );
}
