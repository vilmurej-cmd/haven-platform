'use client';

import { useState } from 'react';
import {
  Shield,
  ArrowLeft,
  ArrowRight,
  Users,
  MessageSquare,
  Backpack,
  Route,
  Baby,
  Smartphone,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';

/* ────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────── */

interface SafeContact {
  name: string;
  phone: string;
  role: string;
}

interface EscapeAnswers {
  safestExit: string;
  carLocation: string;
  firstDestination: string;
  safestTime: string;
  blockedPlan: string;
}

/* ────────────────────────────────────────────────────────
   Go-Bag checklist data
   ──────────────────────────────────────────────────────── */

interface ChecklistCategory {
  label: string;
  items: string[];
}

const GO_BAG_CATEGORIES: ChecklistCategory[] = [
  {
    label: 'Identification',
    items: [
      "Driver's license or state ID",
      'Passport',
      'Birth certificates (you and children)',
      'Social security cards',
    ],
  },
  {
    label: 'Financial',
    items: [
      'Cash (small bills)',
      'Bank cards or debit cards',
      'Checkbook from separate account',
    ],
  },
  {
    label: 'Legal',
    items: [
      'Protective order copies',
      'Police report copies',
      'Custody documents',
      'Marriage certificate',
    ],
  },
  {
    label: 'Medical',
    items: [
      'Medications (yours and children)',
      'Insurance cards',
      'Immunization records',
    ],
  },
  {
    label: 'Personal',
    items: [
      'Phone charger',
      'Change of clothes (you and children)',
      'Comfort items for children',
    ],
  },
  {
    label: 'Keys',
    items: ['Car key', 'House key', 'Safety deposit box key'],
  },
  {
    label: 'Evidence',
    items: [
      'Photos of injuries',
      'Screenshots of threats',
      'Dated journal of incidents',
    ],
  },
  {
    label: 'Pets',
    items: ['Leash and collar', 'Food (3-day supply)', 'Carrier or crate', 'Vet records'],
  },
];

const ALL_ITEMS = GO_BAG_CATEGORIES.flatMap((c) => c.items);

/* ────────────────────────────────────────────────────────
   Steps metadata
   ──────────────────────────────────────────────────────── */

const STEPS = [
  { label: 'Your Safe People', icon: Users },
  { label: 'Your Code Word', icon: MessageSquare },
  { label: 'Your Go Bag', icon: Backpack },
  { label: 'Your Escape Route', icon: Route },
  { label: "Your Children's Safety", icon: Baby },
  { label: 'Your Digital Safety', icon: Smartphone },
];

/* ────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────── */

export default function SafetyPlanPage() {
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1 — Safe People
  const [contacts, setContacts] = useState<SafeContact[]>([
    { name: '', phone: '', role: 'Emergency Contact 1 (will call 911)' },
    { name: '', phone: '', role: 'Emergency Contact 2' },
    { name: '', phone: '', role: 'Trusted Friend' },
    { name: '', phone: '', role: 'Therapist or Counselor' },
  ]);

  // Step 2 — Code Word
  const [codeWord, setCodeWord] = useState('');

  // Step 3 — Go Bag
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(GO_BAG_CATEGORIES.map((c) => c.label))
  );

  // Step 4 — Escape Route
  const [escapeAnswers, setEscapeAnswers] = useState<EscapeAnswers>({
    safestExit: '',
    carLocation: '',
    firstDestination: '',
    safestTime: '',
    blockedPlan: '',
  });

  /* helpers */
  function updateContact(index: number, field: keyof SafeContact, value: string) {
    setContacts((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function toggleItem(item: string) {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  function toggleCategory(label: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function goNext() {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
  }
  function goBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  /* ────────────────────────────────────────────────────────
     Render
     ──────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      {/* Back */}
      <Link
        href="/plan"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to plan
      </Link>

      {/* Header */}
      <div className="text-center mb-6 animate-safe-fade-in">
        <div className="w-14 h-14 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-3">
          <Shield className="w-7 h-7 text-haven-purple" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-2">
          Safety Plan Builder
        </h1>
        <p className="text-text-secondary text-base max-w-md mx-auto leading-relaxed">
          Take it one step at a time. There is no rush.
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mx-auto mb-2">
        <div className="flex items-center justify-between text-sm text-text-muted mb-1.5">
          <span>
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span>{STEPS[currentStep].label}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-haven-purple-soft overflow-hidden">
          <div
            className="h-full rounded-full bg-haven-purple transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step tabs (mobile scrollable) */}
      <div className="w-full max-w-2xl mx-auto flex gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const active = i === currentStep;
          return (
            <button
              key={step.label}
              onClick={() => setCurrentStep(i)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                active
                  ? 'bg-haven-purple text-white'
                  : 'bg-white border border-border text-text-secondary hover:border-haven-purple/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{i + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Privacy note */}
      <div className="w-full max-w-2xl mx-auto mb-6">
        <p className="text-xs text-text-muted text-center bg-haven-purple-soft/50 rounded-lg px-4 py-2">
          Your plan is not saved anywhere unless you choose to save it.
          When you close this page, everything disappears.
        </p>
      </div>

      {/* Step content */}
      <div className="w-full max-w-2xl mx-auto flex-1 animate-safe-fade-in" key={currentStep}>
        {/* ─── Step 1: Safe People ─── */}
        {currentStep === 0 && (
          <div className="space-y-5">
            <p className="text-text-secondary leading-relaxed">
              These are the people you can call when you need help. Choose people you trust
              completely &mdash; people who will believe you, act fast, and keep your confidence.
            </p>

            {contacts.map((contact, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-border-light"
              >
                <h3 className="font-serif text-base font-semibold text-text-primary mb-3">
                  {contact.role}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={contact.name}
                    onChange={(e) => updateContact(i, 'name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={contact.phone}
                    onChange={(e) => updateContact(i, 'phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
                  />
                </div>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-haven-green/10 border border-haven-green/30">
              <p className="text-text-secondary text-sm leading-relaxed">
                <strong className="text-text-primary">Tip:</strong> Consider choosing
                people in different locations. If one person is unavailable, another can
                help. Let each person know their role ahead of time if it is safe to do so.
              </p>
            </div>
          </div>
        )}

        {/* ─── Step 2: Code Word ─── */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <p className="text-text-secondary leading-relaxed">
              A code word is a simple, everyday phrase that signals to your safe person
              that you need help &mdash; without alerting anyone else in the room.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-border-light">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                Choose Your Code Word
              </h3>
              <input
                type="text"
                placeholder="Your code word or phrase"
                value={codeWord}
                onChange={(e) => setCodeWord(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base mb-4"
              />
              <p className="text-text-muted text-sm">
                Choose something that sounds completely normal in a phone call or text.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-haven-purple-soft/50 border border-haven-purple/10">
              <h3 className="font-serif text-base font-semibold text-text-primary mb-3">
                Example Phrases
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    phrase: '"Can you pick up milk on your way?"',
                    meaning: 'Sounds like a grocery request. Means: I need you to come get me.',
                  },
                  {
                    phrase: '"I need that recipe you mentioned."',
                    meaning: 'Sounds like a cooking question. Means: Call 911 to my address.',
                  },
                  {
                    phrase: '"Is Aunt Linda feeling better?"',
                    meaning: 'Sounds like a family check-in. Means: I am not safe right now.',
                  },
                  {
                    phrase: '"Did you feed the cat?"',
                    meaning: 'Sounds like a pet question. Means: Come pick me up immediately.',
                  },
                ].map((example) => (
                  <li key={example.phrase} className="flex gap-3 text-sm">
                    <span className="text-haven-purple font-medium flex-shrink-0">&bull;</span>
                    <div>
                      <span className="block text-text-primary font-medium">
                        {example.phrase}
                      </span>
                      <span className="block text-text-muted">{example.meaning}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-haven-green/10 border border-haven-green/30">
              <h4 className="font-serif text-base font-semibold text-text-primary mb-2">
                How It Works
              </h4>
              <ol className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li>
                  <strong>1.</strong> Share your code word with your safe person ahead of time.
                </li>
                <li>
                  <strong>2.</strong> Agree on exactly what they should do when they hear it &mdash;
                  call 911, come pick you up, or both.
                </li>
                <li>
                  <strong>3.</strong> Practice using it in a casual call or text so it feels natural.
                </li>
                <li>
                  <strong>4.</strong> If you need to use it, stay as calm as you can. Your safe person
                  will know what it means.
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* ─── Step 3: Go Bag ─── */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <p className="text-text-secondary leading-relaxed">
              A go bag is a bag you can grab quickly if you need to leave in a hurry.
              Keep it somewhere safe &mdash; at a friend&apos;s house, in your car, or somewhere
              your partner does not look.
            </p>

            {/* Progress */}
            <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-white border border-border-light">
              <span className="text-text-secondary">
                Items packed: <strong className="text-haven-purple">{checkedItems.size}</strong> of{' '}
                {ALL_ITEMS.length}
              </span>
              <div className="w-32 h-2 rounded-full bg-haven-purple-soft overflow-hidden">
                <div
                  className="h-full rounded-full bg-haven-purple transition-all duration-300"
                  style={{
                    width: `${ALL_ITEMS.length > 0 ? (checkedItems.size / ALL_ITEMS.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {GO_BAG_CATEGORIES.map((category) => {
              const expanded = expandedCategories.has(category.label);
              const catChecked = category.items.filter((i) => checkedItems.has(i)).length;
              return (
                <div
                  key={category.label}
                  className="rounded-2xl bg-white border border-border-light overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(category.label)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-base font-semibold text-text-primary">
                        {category.label}
                      </span>
                      <span className="text-xs text-text-muted bg-bg-muted px-2 py-0.5 rounded-full">
                        {catChecked}/{category.items.length}
                      </span>
                    </div>
                    {expanded ? (
                      <ChevronUp className="w-4 h-4 text-text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-text-muted" />
                    )}
                  </button>

                  {expanded && (
                    <div className="px-4 pb-4 space-y-2">
                      {category.items.map((item) => {
                        const checked = checkedItems.has(item);
                        return (
                          <label
                            key={item}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                              checked
                                ? 'bg-haven-green/10 border border-haven-green/30'
                                : 'bg-bg-safe border border-transparent hover:border-border'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${
                                checked
                                  ? 'bg-haven-purple border-haven-purple'
                                  : 'border-border bg-white'
                              }`}
                            >
                              {checked && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleItem(item)}
                              className="sr-only"
                            />
                            <span
                              className={`text-sm ${
                                checked ? 'text-text-primary' : 'text-text-secondary'
                              }`}
                            >
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="p-4 rounded-xl bg-haven-green/10 border border-haven-green/30">
              <p className="text-text-secondary text-sm leading-relaxed">
                <strong className="text-text-primary">Tip:</strong> You do not need
                everything on this list. Pack what you can. Even just your ID, some cash,
                and your phone charger is a strong start.
              </p>
            </div>
          </div>
        )}

        {/* ─── Step 4: Escape Route ─── */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <p className="text-text-secondary leading-relaxed">
              Thinking through your escape route ahead of time can make the difference between
              hesitation and action. Answer these questions honestly &mdash; only you will
              see the answers.
            </p>

            {[
              {
                key: 'safestExit' as const,
                question: 'Which exit from your home is safest?',
                placeholder: 'e.g., back door through the kitchen, bedroom window...',
              },
              {
                key: 'carLocation' as const,
                question: 'Where is your car parked? Are your keys accessible?',
                placeholder: 'e.g., driveway, keys on hook by front door...',
              },
              {
                key: 'firstDestination' as const,
                question: 'Where will you go first?',
                placeholder: "e.g., sister's house, shelter on 4th St, friend's apartment...",
              },
              {
                key: 'safestTime' as const,
                question: 'What time of day is safest to leave?',
                placeholder: 'e.g., when they leave for work at 8am, during their night shift...',
              },
              {
                key: 'blockedPlan' as const,
                question: 'What if your planned route is blocked?',
                placeholder: 'e.g., go to neighbor\'s house, walk to gas station on Main St...',
              },
            ].map((q) => (
              <div key={q.key} className="p-5 rounded-2xl bg-white border border-border-light">
                <label className="block font-serif text-base font-semibold text-text-primary mb-2">
                  {q.question}
                </label>
                <textarea
                  value={escapeAnswers[q.key]}
                  onChange={(e) =>
                    setEscapeAnswers((prev) => ({ ...prev, [q.key]: e.target.value }))
                  }
                  placeholder={q.placeholder}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base resize-none"
                />
              </div>
            ))}

            <div className="p-5 rounded-2xl bg-haven-purple-soft/50 border border-haven-purple/10">
              <h4 className="font-serif text-base font-semibold text-text-primary mb-2">
                Practice the route in your mind.
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                Close your eyes and walk through it. Picture yourself picking up your bag,
                gathering your children, walking to the door, getting in the car, driving
                to safety. The more you rehearse, the calmer you will feel when the moment
                comes. Your body remembers what your mind practices.
              </p>
            </div>
          </div>
        )}

        {/* ─── Step 5: Children's Safety ─── */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <p className="text-text-secondary leading-relaxed">
              If children are part of your safety plan, these considerations can help keep
              everyone safe. Every family is different &mdash; take what applies and leave
              what does not.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-border-light">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                What to Tell Them
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Use age-appropriate language. Young children need simple reassurance:
                    &ldquo;We are going on a trip to stay safe.&rdquo;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Older children may understand more. Be honest without burdening them:
                    &ldquo;I am making a plan to keep our family safe. I need your help.&rdquo;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Reassure them: &ldquo;This is not your fault. Nothing you did caused
                    this. I love you and I am going to protect you.&rdquo;
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border-light">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                Keeping Children Quiet During Escape
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Practice a &ldquo;quiet game&rdquo; or &ldquo;whisper game&rdquo; regularly so
                    it feels familiar and not scary.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Have a favorite toy, blanket, or pacifier ready to go in your bag.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    For infants, time your departure around their sleep schedule if possible.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border-light">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                School Notification
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Once you are safe, notify the school. Provide a copy of any
                    protective order.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Update the authorized pickup list. Make sure only you and your
                    trusted contacts can pick up your children.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Ask the school counselor to check in with your children periodically.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border-light">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                Custody Documentation
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Keep copies of birth certificates, custody orders, and any court
                    documents in your go bag.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    If you do not have a custody order yet, leaving with your children
                    is generally legal. Consult a DV advocate or attorney as soon as
                    you are safe.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Document any abuse the children have witnessed or experienced. Dates,
                    details, and any evidence will help your case.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ─── Step 6: Digital Safety ─── */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <p className="text-text-secondary leading-relaxed">
              Your digital footprint can reveal your plans. These steps help you stay safe
              online and on your devices.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-border-light">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                Check for Spyware
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Look for apps you did not install. On iPhone, check all home screens
                    and the App Library. On Android, go to Settings &gt; Apps.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Watch for signs: battery draining fast, phone getting hot, higher
                    data usage than normal.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Check if location sharing is turned on: Settings &gt; Privacy &gt;
                    Location Services. Disable sharing with anyone you do not trust.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border-light">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                Browse Safely
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Use <strong>private or incognito mode</strong> when researching shelters,
                    legal help, or safety plans. This prevents your searches from appearing
                    in browser history.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    If you forget, delete your search history selectively &mdash; remove only
                    specific entries rather than clearing everything, which may raise suspicion.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Consider using a <strong>library computer</strong> or a
                    <strong> trusted friend&apos;s phone</strong> for sensitive searches.
                    Public library computers do not save your history.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border-light">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                Protect Your Accounts
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Create a <strong>separate email account</strong> that your partner does
                    not know about. Use it for communicating with advocates, attorneys, and
                    shelters.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Use a strong, unique password. Do not reuse passwords from shared accounts.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Turn on two-factor authentication if possible, but use an authenticator
                    app rather than text messages (texts can be intercepted on shared phone plans).
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border-light">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                Hide Apps Safely
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    <strong>iPhone:</strong> Long-press an app &gt; Remove App &gt;
                    Remove from Home Screen. It stays in the App Library but not on your
                    visible screens.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    <strong>Android:</strong> Some launchers let you hide apps. Or place
                    safety apps inside a folder with an innocuous name like &ldquo;Utilities.&rdquo;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-haven-purple font-bold flex-shrink-0">&bull;</span>
                  <span>
                    Bookmark HAVEN as a weather website name in your browser for quick,
                    discreet access.
                  </span>
                </li>
              </ul>
            </div>

            {/* Completion message */}
            <div className="p-5 rounded-2xl bg-haven-green/10 border border-haven-green/30 text-center">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                You have completed your safety plan.
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto">
                You have done something incredibly brave today. Remember: you do not have to
                do everything at once. Even one step forward is progress. HAVEN will be here
                whenever you need to come back.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between mt-8 pt-6 border-t border-border-light">
        <button
          onClick={goBack}
          disabled={currentStep === 0}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
            currentStep === 0
              ? 'text-text-muted cursor-not-allowed'
              : 'text-text-secondary hover:text-haven-purple hover:bg-haven-purple-soft'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={goNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors"
          >
            Back to Plan
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
