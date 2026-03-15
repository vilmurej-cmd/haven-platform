'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  DollarSign,
  CheckSquare,
  Square,
  Briefcase,
  Building,
  Heart,
  FileText,
  CreditCard,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

/* ────────────────────────────────────────────────────────
   Checklist data
   ──────────────────────────────────────────────────────── */

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
}

const SAFETY_CHECKLIST: ChecklistItem[] = [
  {
    id: 'bank',
    label: 'Open a separate bank account',
    description:
      'Choose a bank your partner does not use. Use a trusted friend\'s address or a P.O. Box for statements. Set all communications to email-only with a private email address.',
  },
  {
    id: 'documents',
    label: 'Gather financial documents',
    description:
      'Make copies of bank statements, tax returns, pay stubs, mortgage papers, car titles, insurance policies, and investment account statements. Store copies somewhere safe outside the home.',
  },
  {
    id: 'credit',
    label: 'Learn your credit score',
    description:
      'Visit annualcreditreport.com for a free credit report from each bureau. This shows every account and debt in your name, including any accounts opened without your knowledge.',
  },
  {
    id: 'employment',
    label: 'Research employment resources',
    description:
      'Your local American Job Center (careeronestop.org) offers free job search help, resume writing, and skills training. Libraries provide free internet access for job searching.',
  },
  {
    id: 'save',
    label: 'Start saving small amounts of cash',
    description:
      'Even $5 or $10 at a time adds up. Keep cash with a trusted friend, in a locker, or hidden safely. Small ATM withdrawals or cash back at the grocery store are harder to notice.',
  },
  {
    id: 'pobox',
    label: 'Set up a P.O. Box',
    description:
      'A P.O. Box gives you a safe mailing address for financial documents, legal papers, and personal correspondence. Many post offices offer small boxes for under $30 for six months.',
  },
];

const DOCUMENTS_TO_SECURE: { category: string; items: string[] }[] = [
  {
    category: 'Identification',
    items: [
      'Birth certificate (yours and children)',
      'Social Security card',
      'Passport',
      "Driver's license or state ID",
      'Green card or immigration documents',
    ],
  },
  {
    category: 'Financial',
    items: [
      'Bank statements (checking, savings, investment)',
      'Tax returns (at least 3 years)',
      'Pay stubs or proof of income',
      'Credit card statements',
      'Retirement or pension account statements',
    ],
  },
  {
    category: 'Insurance & Property',
    items: [
      'Health insurance cards and policy documents',
      'Life insurance policies',
      'Auto insurance documents',
      'Property deeds or mortgage statements',
      'Vehicle titles and registration',
      'Lease or rental agreements',
    ],
  },
  {
    category: 'Legal',
    items: [
      'Marriage certificate',
      'Custody orders or agreements',
      'Protective orders',
      'Divorce papers (if applicable)',
      'Power of attorney documents',
    ],
  },
];

const EMERGENCY_RESOURCES = [
  {
    name: 'TANF (Temporary Assistance for Needy Families)',
    description:
      'Monthly cash payments to help with rent, utilities, and basic needs. DV survivors often receive fast-tracked applications. Your shelter or advocate can help you apply.',
  },
  {
    name: 'WIC (Women, Infants, and Children)',
    description:
      'Nutritious food, formula, and nutrition education for pregnant women and children under 5. Walk-in appointments are usually available at local WIC offices.',
  },
  {
    name: 'SNAP (Food Assistance)',
    description:
      'Helps you buy groceries. Apply online, by phone, or in person at your local Department of Social Services. If fleeing DV, you may qualify for expedited processing.',
  },
  {
    name: 'Emergency Assistance Programs',
    description:
      'Many states and counties offer one-time emergency cash assistance for rent, utilities, and basic needs. Contact 211 (call or text) to find local emergency funds near you.',
  },
  {
    name: 'Unemployment Benefits',
    description:
      'If you had to leave your job because of domestic violence, many states allow you to claim unemployment benefits. Some states have specific DV exemptions.',
  },
  {
    name: 'Medicaid',
    description:
      'Free or low-cost healthcare coverage, including mental health services and therapy. You can apply as a single-person household regardless of marital status. Coverage can begin immediately in many states.',
  },
];

/* ────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────── */

export default function FinancialPage() {
  const [checkedSafety, setCheckedSafety] = useState<Set<string>>(new Set());
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  function toggleSafety(id: string) {
    setCheckedSafety((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleDoc(item: string) {
    setCheckedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  const allDocItems = DOCUMENTS_TO_SECURE.flatMap((c) => c.items);

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
            <DollarSign className="w-7 h-7 text-haven-purple" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Financial Independence
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            Financial control is one of the most common tools of abuse. Abusers use money to
            maintain power -- controlling what you spend, preventing you from working, and
            keeping you dependent. Taking even small steps toward independence is an act of
            courage.
          </p>
        </div>

        {/* ── Financial Safety Checklist ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <CheckSquare className="w-5 h-5 text-haven-purple" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary">
                Financial Safety Checklist
              </h2>
              <p className="text-text-secondary text-sm">
                {checkedSafety.size} of {SAFETY_CHECKLIST.length} completed
              </p>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-border mb-6">
            <div
              className="h-2 rounded-full bg-haven-green transition-all duration-500"
              style={{
                width: `${
                  SAFETY_CHECKLIST.length > 0
                    ? (checkedSafety.size / SAFETY_CHECKLIST.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="space-y-3">
            {SAFETY_CHECKLIST.map((item) => {
              const checked = checkedSafety.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleSafety(item.id)}
                  className="w-full text-left p-4 rounded-2xl bg-white border border-border hover:border-haven-purple/20 transition-all min-h-[56px]"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      {checked ? (
                        <CheckSquare className="w-5 h-5 text-haven-green" />
                      ) : (
                        <Square className="w-5 h-5 text-text-muted" />
                      )}
                    </div>
                    <div>
                      <span
                        className={`block font-medium text-sm ${
                          checked ? 'text-haven-green line-through' : 'text-text-primary'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="block text-text-secondary text-xs leading-relaxed mt-1">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {checkedSafety.size === SAFETY_CHECKLIST.length && (
            <div className="mt-4 p-4 rounded-2xl bg-haven-green/10 border border-haven-green/30 text-center">
              <p className="text-text-primary text-sm font-medium font-serif">
                You have completed every step. You are building a foundation of freedom.
              </p>
            </div>
          )}

          <p className="text-text-muted text-xs mt-3 text-center">
            This checklist is not saved anywhere. It exists only while this page is open.
          </p>
        </section>

        {/* ── Documents to Secure ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-haven-purple" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary">
                Documents to Secure
              </h2>
              <p className="text-text-secondary text-sm">
                {checkedDocs.size} of {allDocItems.length} gathered
              </p>
            </div>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            Make copies of these documents and store them somewhere safe -- with a trusted
            friend, in a safety deposit box, or in a secure cloud account your partner does not
            know about. You do not need all of these. Gather what you can, when it is safe to do
            so.
          </p>

          <div className="w-full h-2 rounded-full bg-border mb-6">
            <div
              className="h-2 rounded-full bg-haven-purple transition-all duration-500"
              style={{
                width: `${
                  allDocItems.length > 0 ? (checkedDocs.size / allDocItems.length) * 100 : 0
                }%`,
              }}
            />
          </div>

          <div className="space-y-5">
            {DOCUMENTS_TO_SECURE.map((category) => (
              <div
                key={category.category}
                className="p-5 rounded-2xl bg-white border border-border"
              >
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((item) => {
                    const checked = checkedDocs.has(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleDoc(item)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors min-h-[44px] ${
                          checked
                            ? 'bg-haven-green/10 border border-haven-green/30'
                            : 'bg-bg-safe border border-transparent hover:border-border'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {checked ? (
                            <CheckSquare className="w-4 h-4 text-haven-green" />
                          ) : (
                            <Square className="w-4 h-4 text-text-muted" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            checked
                              ? 'text-text-primary line-through'
                              : 'text-text-secondary'
                          }`}
                        >
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Building Financial Independence ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Building Financial Independence
            </h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-haven-purple-soft/50 border border-haven-purple/10 text-center">
              <p className="font-serif text-lg text-text-primary leading-relaxed font-medium">
                You have skills. You have value. Financial independence is possible.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-haven-purple" />
                <h3 className="font-serif text-lg font-semibold text-text-primary">
                  Budgeting Basics
                </h3>
              </div>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  List your essential expenses: housing, food, transportation, childcare, phone
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Many costs are lower than you think when you are budgeting for just yourself
                  and your children
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Free budgeting apps can help (use a private email to set up accounts)
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Your DV advocate can help you create a realistic budget for independent living
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                Building Credit
              </h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  If you have no credit history, a secured credit card is the easiest way to
                  start -- you deposit money as collateral, and the card limit equals your deposit
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Pay the balance in full each month to build a positive credit history
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Check your credit report for accounts opened in your name without your
                  knowledge -- financial abuse often includes identity theft
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  You can dispute unauthorized accounts and file an identity theft report at
                  identitytheft.gov
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-haven-purple" />
                <h3 className="font-serif text-lg font-semibold text-text-primary">
                  Job Resources
                </h3>
              </div>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  <strong>American Job Centers</strong> (careeronestop.org) -- free job search
                  help, resume writing, and skills training
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  <strong>Dress for Success</strong> -- professional clothing, coaching, and
                  career development for women entering or re-entering the workforce
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Community colleges offer free or low-cost certificate programs that lead to
                  employment in weeks, not years
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Libraries offer free computer classes, resume help, and internet access
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Remote work options: customer service, data entry, transcription, online
                  tutoring, virtual assistance -- use a private email and separate bank account
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Emergency Financial Resources ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Emergency Financial Resources
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-haven-green/10 border border-haven-green/30 mb-5 text-center">
            <p className="font-serif text-base text-text-primary leading-relaxed font-medium">
              You deserve these resources. They exist for exactly this situation.
            </p>
          </div>

          <div className="space-y-4">
            {EMERGENCY_RESOURCES.map((resource) => (
              <div
                key={resource.name}
                className="p-5 rounded-2xl bg-white border border-border"
              >
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                  {resource.name}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 p-5 rounded-2xl bg-haven-purple-soft/50 border border-haven-purple/10">
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
              How to Apply
            </h3>
            <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                Visit <strong>benefits.gov</strong> to see which programs you qualify for
              </li>
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                Call <strong>211</strong> to find local emergency assistance programs
              </li>
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                DV shelters and advocates can help with paperwork and often expedite your
                applications
              </li>
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                You do not need a permanent address to apply -- shelters count
              </li>
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                Many programs have address confidentiality options for safety
              </li>
            </ul>
          </div>
        </section>

        {/* Bottom */}
        <div className="text-center py-8 border-t border-border-light">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-haven-purple" />
          </div>
          <p className="font-serif text-lg text-text-primary leading-relaxed italic max-w-md mx-auto">
            Financial independence is not just about money. It is about choice. Every small step
            you take is a step toward freedom.
          </p>
        </div>
      </div>
    </div>
  );
}
