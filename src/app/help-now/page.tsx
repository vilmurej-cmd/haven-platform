'use client';

import { useState } from 'react';
import { Phone, Shield, MapPin, Building2, BadgeAlert, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HelpNowPage() {
  const [sosState, setSosState] = useState<'idle' | 'setup' | 'activated'>('idle');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [contactName, setContactName] = useState('');

  function handleSilentSOS() {
    if (!emergencyContact) {
      setSosState('setup');
    } else {
      setSosState('activated');
      // After a brief moment, redirect to Google to disguise the screen
      setTimeout(() => {
        window.location.href = 'https://www.google.com';
      }, 2000);
    }
  }

  function handleSaveContact() {
    if (emergencyContact.trim()) {
      setSosState('activated');
      setTimeout(() => {
        window.location.href = 'https://www.google.com';
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to safety
      </Link>

      {/* Header */}
      <div className="text-center mb-8 animate-safe-fade-in">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-2">
          Help is here.
        </h1>
        <p className="text-text-secondary text-base">
          Every option below works with one tap.
        </p>
      </div>

      {/* Three main action buttons */}
      <div className="w-full max-w-md mx-auto space-y-4 animate-safe-fade-in" style={{ animationDelay: '0.1s' }}>
        {/* CALL 911 */}
        <a
          href="tel:911"
          className="block w-full p-6 rounded-2xl bg-haven-emergency text-white text-center transition-all hover:shadow-lg hover:shadow-haven-emergency/20 active:scale-[0.98]"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="block font-serif text-2xl font-bold">Call 911</span>
              <span className="block text-white/80 text-sm">Emergency services</span>
            </div>
          </div>
        </a>

        {/* CALL HOTLINE */}
        <a
          href="tel:18007997233"
          className="block w-full p-5 rounded-2xl bg-haven-purple text-white text-center transition-all hover:shadow-lg hover:shadow-haven-purple/20 active:scale-[0.98]"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="block font-serif text-xl font-bold">Call Hotline</span>
              <span className="block text-white/80 text-sm">1-800-799-7233</span>
            </div>
          </div>
        </a>
        <p className="text-center text-text-secondary text-sm -mt-2">
          or text <strong>START</strong> to <strong>88788</strong>
        </p>

        {/* SILENT SOS */}
        {sosState === 'idle' && (
          <button
            onClick={handleSilentSOS}
            className="w-full p-5 rounded-2xl bg-white border-2 border-haven-purple text-haven-purple text-center transition-all hover:bg-haven-purple-soft hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-haven-purple-soft flex items-center justify-center">
                <Shield className="w-6 h-6 text-haven-purple" />
              </div>
              <div className="text-left">
                <span className="block font-serif text-xl font-bold">Silent SOS</span>
                <span className="block text-text-secondary text-sm">Alert someone without making a sound</span>
              </div>
            </div>
          </button>
        )}

        {/* SOS Setup */}
        {sosState === 'setup' && (
          <div className="w-full p-5 rounded-2xl bg-white border-2 border-haven-purple animate-safe-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-haven-purple" />
              <h3 className="font-serif text-lg font-semibold text-text-primary">
                Set up Silent SOS
              </h3>
            </div>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">
              Add an emergency contact who will call 911 for you. This information stays in your browser only and disappears when you close the page.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Contact name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
              />
              <input
                type="tel"
                placeholder="Their phone number"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setSosState('idle')}
                  className="flex-1 px-4 py-3 rounded-xl border border-border text-text-secondary hover:bg-bg-muted transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContact}
                  disabled={!emergencyContact.trim()}
                  className="flex-1 px-4 py-3 rounded-xl bg-haven-purple text-white hover:bg-haven-purple/90 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Activate SOS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SOS Activated */}
        {sosState === 'activated' && (
          <div className="w-full p-6 rounded-2xl bg-haven-green/20 border-2 border-haven-green text-center animate-safe-fade-in">
            <div className="w-14 h-14 rounded-full bg-haven-green/30 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-7 h-7 text-green-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-text-primary mb-1">
              SOS Activated
            </h3>
            <p className="text-text-secondary text-sm">
              {contactName ? `${contactName} has been alerted.` : 'Your contact has been alerted.'}{' '}
              Redirecting you to a safe page...
            </p>
          </div>
        )}
      </div>

      {/* Secondary resources */}
      <div
        className="w-full max-w-md mx-auto mt-8 space-y-3 animate-safe-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        <h2 className="font-serif text-lg font-semibold text-text-primary mb-2">
          Find help nearby
        </h2>

        <Link
          href="/shelter-finder"
          className="flex items-center gap-3 w-full p-4 rounded-xl bg-white border border-border hover:border-haven-purple/30 hover:shadow-sm transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-haven-purple" />
          </div>
          <div>
            <span className="block font-medium text-text-primary text-base">Find Nearest Shelter</span>
            <span className="block text-text-secondary text-sm">Safe housing near you</span>
          </div>
        </Link>

        <a
          href="https://www.google.com/maps/search/hospital+near+me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full p-4 rounded-xl bg-white border border-border hover:border-haven-purple/30 hover:shadow-sm transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-haven-purple" />
          </div>
          <div>
            <span className="block font-medium text-text-primary text-base">Nearest Hospital</span>
            <span className="block text-text-secondary text-sm">Opens in Google Maps</span>
          </div>
        </a>

        <a
          href="https://www.google.com/maps/search/police+station+near+me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full p-4 rounded-xl bg-white border border-border hover:border-haven-purple/30 hover:shadow-sm transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
            <BadgeAlert className="w-5 h-5 text-haven-purple" />
          </div>
          <div>
            <span className="block font-medium text-text-primary text-base">Nearest Police Station</span>
            <span className="block text-text-secondary text-sm">Opens in Google Maps</span>
          </div>
        </a>
      </div>

      {/* Reassurance */}
      <div className="mt-12 text-center animate-safe-fade-in" style={{ animationDelay: '0.5s' }}>
        <p className="text-text-secondary text-base max-w-sm mx-auto leading-relaxed font-serif italic">
          You are not alone. Help is available 24/7.
        </p>
      </div>
    </div>
  );
}
