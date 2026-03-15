'use client';

import { FileText, AlertTriangle, Phone, Info, ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            <FileText className="w-8 h-8 text-haven-purple" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Terms of Service
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            Please read these terms carefully. Your safety matters more than any legal document.
          </p>
        </div>

        {/* Emergency warning */}
        <div className="bg-haven-emergency/10 border border-haven-emergency/30 rounded-2xl p-5 sm:p-6 mb-8 animate-safe-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-haven-emergency/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Phone className="w-5 h-5 text-haven-emergency" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-text-primary mb-1">
                If You Are in Immediate Danger
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Call <a href="tel:911" className="text-haven-emergency font-semibold hover:underline">911</a> immediately.
                HAVEN is not a substitute for emergency services. If you or someone you know is in immediate physical
                danger, contact law enforcement right away.
              </p>
            </div>
          </div>
        </div>

        {/* Terms sections */}
        <div className="space-y-6 mb-10">
          <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 animate-safe-fade-in" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-haven-gold flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-lg font-semibold text-text-primary mb-2">
                  Not a Substitute for Professional Help
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  HAVEN provides safety resources, information, and connections to organizations that can help.
                  It is not a substitute for professional counseling, legal advice, medical treatment, or emergency
                  services. The information provided on this platform is for informational and educational purposes
                  only. Always consult with qualified professionals for advice specific to your situation.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 animate-safe-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-haven-blue flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-lg font-semibold text-text-primary mb-2">
                  Resources Provided for Informational Purposes
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  HAVEN links to external organizations, shelters, legal aid providers, hotlines, and other
                  resources. These links are provided for your convenience and do not constitute an endorsement.
                  We make every effort to ensure the information is accurate and up to date, but organizations
                  may change their hours, services, contact information, or availability without notice.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 animate-safe-fade-in" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-haven-purple flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-lg font-semibold text-text-primary mb-2">
                  No Liability for Accuracy of Information
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  While we strive to provide accurate shelter locations, legal information, and resource details,
                  HAVEN and its creators cannot guarantee the accuracy, completeness, or timeliness of any
                  information presented on this platform. We are not liable for any actions taken or not taken
                  based on information found on HAVEN. Shelter availability, legal processes, and resource access
                  vary by location and circumstance.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 animate-safe-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-text-muted flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-lg font-semibold text-text-primary mb-2">
                  No Data Collection
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  As outlined in our <Link href="/privacy" className="text-haven-purple hover:underline">Privacy Policy</Link>,
                  HAVEN does not collect, store, or transmit any personal data. There is no account creation,
                  no cookies, no analytics, and no tracking of any kind. This means we cannot recover any
                  information for you, and we have no records of your use of this platform.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 animate-safe-fade-in" style={{ animationDelay: '0.35s' }}>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-text-muted flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-lg font-semibold text-text-primary mb-2">
                  Use at Your Own Risk
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  HAVEN is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied.
                  Your use of this platform is at your own risk. We strongly encourage you to use a private
                  or incognito browser window and to clear your browser history after visiting any safety
                  resource.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotline */}
        <div className="text-center mb-6 animate-safe-fade-in" style={{ animationDelay: '0.4s' }}>
          <a
            href="tel:18007997233"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-haven-purple-soft text-haven-purple text-sm font-medium hover:bg-haven-purple/15 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-haven-green animate-pulse" />
            National DV Hotline: 1-800-799-7233
          </a>
        </div>

        {/* Footer note */}
        <div className="text-center animate-safe-fade-in" style={{ animationDelay: '0.45s' }}>
          <p className="text-text-muted text-xs">A Vilmure Ventures Company</p>
        </div>
      </div>
    </div>
  );
}
