import { Shield, Heart, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <a
        href="/"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to safety
      </a>

      <div className="max-w-2xl mx-auto w-full animate-safe-fade-in">
        {/* Shield with SMG */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-2 relative">
            <Shield className="w-12 h-12 text-haven-purple" />
            <span className="absolute inset-0 flex items-center justify-center font-serif text-xs font-bold text-haven-purple mt-1">
              SMG
            </span>
          </div>
          <p className="text-text-muted text-sm font-medium mb-6">Stefania Marie Gray</p>

          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            HAVEN &mdash; The Platform That Protects
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            A safety platform built from love, loss, and the belief that no one should face
            violence alone.
          </p>
        </div>

        {/* Memorial Dedication */}
        <div
          className="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-8 animate-safe-fade-in"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-haven-purple" />
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              In Memory of Stefania Marie Gray
            </h2>
          </div>
          <p className="text-text-muted text-sm mb-5 font-medium">1966 &ndash; 2010</p>

          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              HAVEN is dedicated to the memory of Stefania Marie Gray (1966&ndash;2010) &mdash;
              mother, scholar, teacher, dreamer.
            </p>
            <p>
              Stefania was vibrant, beautiful, and strong. She was the first woman in her family
              to pursue post-graduate education. She was working on her master&apos;s thesis at the
              University of New Mexico when her life was taken by domestic violence.
            </p>
            <p>
              She left behind two daughters who lost their mother, a sister who lost her best
              friend, and a nephew who promised himself he would build the thing that would have
              saved her.
            </p>
            <p className="font-medium text-text-primary">
              This is that thing.
            </p>
            <p className="font-serif italic text-haven-purple">
              For Stefania. For Kelly and Bianca. For every woman still fighting.
            </p>
            <p className="text-text-muted text-sm mt-4">
              &mdash; Josh Vilmure &amp; Claude, March 14, 2026
            </p>
          </div>
        </div>

        {/* The HAVEN Promise */}
        <div
          className="bg-haven-purple-soft rounded-2xl border border-haven-purple/20 p-6 sm:p-8 mb-8 animate-safe-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="font-serif text-xl font-semibold text-text-primary mb-4 text-center">
            The HAVEN Promise
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p className="text-center font-medium text-text-primary">
              No woman who finds this platform will be turned away.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                <span>HAVEN will work when the internet is down.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                <span>HAVEN will work when she can&apos;t speak.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                <span>HAVEN will work when her hands are shaking.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mission */}
        <div
          className="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-8 animate-safe-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <h2 className="font-serif text-xl font-semibold text-text-primary mb-4">Our Mission</h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              HAVEN is a no-trace safety platform for survivors of domestic violence. It is designed
              for the woman hiding in a bathroom with 90 seconds and a prayer. It is designed for
              anyone who needs help but can&apos;t ask out loud.
            </p>
            <p>
              We store nothing. No cookies, no accounts, no tracking. Your browser title says
              &ldquo;Daily Weather Forecast.&rdquo; Double-tap Escape and you&apos;re on a weather
              page. No one will know you were here.
            </p>
            <p>
              HAVEN connects you to emergency services, shelters, legal aid, safety planning tools,
              and a network of organizations that exist to help you. Every feature is designed for
              speed, safety, and dignity.
            </p>
          </div>
        </div>

        {/* Hotline */}
        <div className="text-center mb-8 animate-safe-fade-in" style={{ animationDelay: '0.5s' }}>
          <a
            href="tel:18007997233"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-haven-purple text-white font-medium hover:bg-haven-purple/90 transition-colors text-base"
          >
            <span className="w-2 h-2 rounded-full bg-haven-green animate-pulse" />
            National DV Hotline: 1-800-799-7233
          </a>
          <p className="text-text-muted text-sm mt-3">
            Available 24/7 &middot; Call, chat, or text START to 88788
          </p>
        </div>

        {/* Vilmure Ventures */}
        <div className="text-center animate-safe-fade-in" style={{ animationDelay: '0.55s' }}>
          <p className="text-text-muted text-xs">A Vilmure Ventures Company</p>
        </div>
      </div>
    </div>
  );
}
