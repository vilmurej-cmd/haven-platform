'use client';

import { Shield, Heart } from 'lucide-react';
import Link from 'next/link';

/**
 * HAVEN Homepage
 *
 * Two buttons. Nothing else.
 * A woman with 90 seconds doesn't need a hero section.
 * She needs the right button immediately.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* The Shield */}
      <div className="mb-8 flex flex-col items-center animate-safe-fade-in">
        <div className="w-16 h-16 rounded-full bg-haven-purple-soft flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-haven-purple" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-text-primary text-center font-semibold mb-2">
          You are safe here.
        </h1>
        <p className="text-text-secondary text-center max-w-md text-base leading-relaxed">
          This page leaves no trace on your device. No one will know you were here.
        </p>
      </div>

      {/* Two choices */}
      <div className="w-full max-w-md space-y-4 animate-safe-fade-in" style={{ animationDelay: '0.2s' }}>
        {/* I NEED HELP NOW */}
        <Link href="/help-now" className="block">
          <div className="w-full p-6 rounded-2xl bg-haven-emergency text-white text-center transition-all hover:shadow-lg hover:shadow-haven-emergency/20 active:scale-[0.98]">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-1">I Need Help Now</h2>
            <p className="text-white/80 text-sm">Emergency resources, hotlines, silent SOS</p>
          </div>
        </Link>

        {/* I NEED TO PLAN */}
        <Link href="/plan" className="block">
          <div className="w-full p-6 rounded-2xl bg-white border-2 border-haven-purple/20 text-center transition-all hover:border-haven-purple/40 hover:shadow-lg active:scale-[0.98]">
            <div className="w-12 h-12 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-text-primary mb-1">I Need to Plan</h2>
            <p className="text-text-secondary text-sm">Safety planning, legal help, resources, healing</p>
          </div>
        </Link>
      </div>

      {/* Reassurance */}
      <div className="mt-12 text-center animate-safe-fade-in" style={{ animationDelay: '0.4s' }}>
        <p className="text-text-muted text-sm max-w-sm mx-auto leading-relaxed">
          Double-tap <strong>Escape</strong> at any time to instantly leave this page.
          The <strong>X</strong> in the top corner does the same.
        </p>
      </div>

      {/* Quick hotline */}
      <div className="mt-8 animate-safe-fade-in" style={{ animationDelay: '0.5s' }}>
        <a
          href="tel:18007997233"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-haven-purple-soft text-haven-purple text-sm font-medium hover:bg-haven-purple/15 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-haven-green animate-pulse" />
          National DV Hotline: 1-800-799-7233
        </a>
      </div>
    </div>
  );
}
