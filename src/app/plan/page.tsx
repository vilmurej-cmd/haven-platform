'use client';

import {
  Shield,
  Heart,
  Scale,
  Wallet,
  Users,
  Flower2,
  FileText,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    title: 'Safety Planning',
    description: 'Build your personal safety plan step by step',
    icon: Shield,
    href: '/plan/safety',
    color: 'text-haven-purple',
  },
  {
    title: 'Understanding Abuse',
    description: "What's happening to you has a name",
    icon: Heart,
    href: '/plan/understanding-abuse',
    color: 'text-haven-purple',
  },
  {
    title: 'Legal Resources',
    description: 'Know your rights and options',
    icon: Scale,
    href: '/plan/legal',
    color: 'text-haven-purple',
  },
  {
    title: 'Financial Independence',
    description: 'Build your financial freedom',
    icon: Wallet,
    href: '/plan/financial',
    color: 'text-haven-purple',
  },
  {
    title: 'For Children & Teens',
    description: 'You are not alone. This is not your fault.',
    icon: Users,
    href: '/plan/children',
    color: 'text-haven-purple',
  },
  {
    title: 'Healing',
    description: 'Trauma recovery and support',
    icon: Flower2,
    href: '/plan/healing',
    color: 'text-haven-purple',
  },
];

export default function PlanPage() {
  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-8 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to safety
      </Link>

      {/* Header */}
      <div className="text-center mb-10 animate-safe-fade-in">
        <div className="w-16 h-16 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-haven-purple" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
          Your Safety Plan
        </h1>
        <p className="text-text-secondary text-base max-w-lg mx-auto leading-relaxed">
          You&apos;re here because you&apos;re thinking ahead. That takes incredible courage.
        </p>
      </div>

      {/* Section Grid */}
      <div
        className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 animate-safe-fade-in"
        style={{ animationDelay: '0.15s' }}
      >
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href} className="block group">
              <div className="h-full p-5 rounded-2xl bg-white border border-border-light border-l-4 border-l-haven-purple/40 transition-all hover:shadow-md hover:border-l-haven-purple">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-lg font-semibold text-text-primary mb-1 group-hover:text-haven-purple transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-haven-purple transition-colors flex-shrink-0 mt-2" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Additional links */}
      <div
        className="w-full max-w-3xl mx-auto space-y-3 animate-safe-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
          Additional Tools
        </h3>

        <Link
          href="/plan/evidence"
          className="flex items-center gap-3 w-full p-4 rounded-xl bg-white border border-border hover:border-haven-purple/30 hover:shadow-sm transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-haven-purple" />
          </div>
          <div className="flex-1">
            <span className="block font-medium text-text-primary text-base">
              Evidence Documentation
            </span>
            <span className="block text-text-secondary text-sm">
              How to safely document what is happening
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-text-muted flex-shrink-0" />
        </Link>

        <Link
          href="/danger-assessment"
          className="flex items-center gap-3 w-full p-4 rounded-xl bg-white border border-border hover:border-haven-purple/30 hover:shadow-sm transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-haven-rose/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-haven-emergency" />
          </div>
          <div className="flex-1">
            <span className="block font-medium text-text-primary text-base">
              Danger Assessment
            </span>
            <span className="block text-text-secondary text-sm">
              Understand your level of risk
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-text-muted flex-shrink-0" />
        </Link>
      </div>

      {/* Reassurance */}
      <div
        className="mt-12 text-center animate-safe-fade-in"
        style={{ animationDelay: '0.45s' }}
      >
        <p className="text-text-secondary text-base max-w-md mx-auto leading-relaxed font-serif italic">
          Every step you take, no matter how small, is a step toward freedom.
          HAVEN is here for as long as you need.
        </p>
      </div>
    </div>
  );
}
