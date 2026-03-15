'use client';

import { useState } from 'react';
import { ArrowLeft, Scale, Shield, FileText, Globe, Camera, Phone, ChevronDown, AlertTriangle, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming','District of Columbia'
];

export default function LegalResourcesPage() {
  const [selectedState, setSelectedState] = useState('');

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
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
            <Scale className="w-7 h-7 text-haven-purple" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Legal Resources
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            The law is on your side. You have more options than you may realize, and none of them require his permission.
          </p>
        </div>

        {/* ── Protective Orders ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">Protective Orders</h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">What a Protective Order Does</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                A protective order (sometimes called a restraining order) is a court order that legally requires your abuser to stay away from you, your home, your workplace, and your children. It can also grant you temporary custody, require them to leave a shared home, and prohibit contact of any kind.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                <strong className="text-text-primary">An honest note:</strong> A protective order is a legal tool, not a physical barrier. It gives law enforcement the power to arrest your abuser immediately if they violate it. But it works best as part of a larger safety plan. If you feel you are in immediate danger, always call 911 first.
              </p>
            </div>

            {/* State Selector */}
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Your State&apos;s Process</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Every state has its own process for obtaining a protective order. Select your state to see guidance specific to where you live.
              </p>
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg-safe text-text-primary focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base appearance-none cursor-pointer"
                >
                  <option value="">Select your state...</option>
                  {US_STATES.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {selectedState && (
                <div className="mt-4 p-4 rounded-xl bg-haven-purple-soft/50 border border-haven-purple/10">
                  <h4 className="font-semibold text-text-primary text-sm mb-2">Protective Orders in {selectedState}</h4>
                  <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                    <li>In {selectedState}, you can file for a protective order at your local courthouse. There is <strong>no fee</strong> for domestic violence protective orders in any state.</li>
                    <li>You do not need an attorney to file, though having one can help. Many courthouses have victim advocates who can walk you through the paperwork.</li>
                    <li>Most courts in {selectedState} can issue an emergency (ex parte) order the same day you file, which takes effect immediately -- even before a full hearing.</li>
                    <li>A full hearing is typically scheduled within 10-21 days, where a judge will decide whether to extend the order (often for 1-2 years or longer).</li>
                    <li>Contact your local {selectedState} courthouse clerk&apos;s office or call the National DV Hotline (1-800-799-7233) for specific filing locations and victim advocate services near you.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">What to Include in Your Petition</h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Specific dates and descriptions of abuse incidents (be as detailed as possible)</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Any injuries you sustained, with photos if available</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Threats made against you, your children, or your pets</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Prior police reports or 911 calls</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Weapons your abuser owns or has access to</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Names and ages of children involved</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Any previous protective orders</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">What Happens at the Hearing</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                You will tell the judge your story. You may bring witnesses, photos, messages, medical records, and any other evidence. Your abuser will have a chance to respond. The judge will then decide whether to grant a longer-term order.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                You can bring a victim advocate or attorney with you. Many survivors find it helpful to write out what they want to say ahead of time. The judge has heard stories like yours before. You will be believed.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-haven-emergency/5 border border-haven-emergency/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-haven-emergency flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-lg font-semibold text-text-primary mb-1">If the Order Is Violated</h3>
                  <p className="text-text-primary text-sm leading-relaxed font-medium mb-2">
                    Call 911 immediately. Every violation is a crime.
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Any contact -- a text, a phone call, showing up at your work, driving past your house, contacting you through a friend -- is a violation. You do not need to wait for physical violence. Document the violation and call police. Keep a copy of your protective order with you at all times.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Custody & Divorce ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">Custody & Divorce</h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Emergency Custody Orders</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                If your children are in danger, you can request an emergency custody order at the same time you file for a protective order. This grants you temporary sole custody immediately, without waiting for a full hearing. Judges take child safety extremely seriously. If there is evidence of abuse, the court will act quickly to protect your children.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">How Documentation Affects Custody</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                Every police report, every photo, every medical record, every text message you have saved strengthens your custody case. Courts consider documented abuse as a major factor in custody decisions. In many states, there is a presumption against giving custody to a parent with a history of domestic violence.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Start documenting now. Even if you are not ready to leave yet, the documentation you gather today will protect your children tomorrow.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Legal Aid Resources</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                You do not need money to get a lawyer. Legal aid organizations provide free representation to domestic violence survivors for protective orders, custody, and divorce proceedings.
              </p>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>LawHelp.org</strong> -- Find free legal help in your state</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>WomensLaw.org</strong> -- Legal information and court preparation</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>National DV Hotline</strong> (1-800-799-7233) -- Can connect you with local legal advocates</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Your local courthouse may have free victim advocates on-site</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-haven-purple-soft/50 border border-haven-purple/10">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">If He Threatens to Take the Children</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                This is one of the most common threats abusers make. It is designed to keep you trapped. Here is what you need to know:
              </p>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Courts do not reward abusers. A documented history of abuse works against him, not you.</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Leaving an abusive situation is not abandonment. It is protecting your children.</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> If he takes the children without your consent, call 911. If you have a custody order, this may be a crime.</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Get a custody order as soon as possible. Without a court order, both parents have equal legal rights to the children.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Immigration Resources ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">Immigration Resources</h2>
          </div>

          <div className="p-5 rounded-2xl bg-haven-green/10 border border-haven-green/30 mb-5">
            <p className="text-text-primary text-base leading-relaxed font-medium text-center font-serif">
              Your immigration status does not prevent you from getting help. You have rights.
            </p>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">VAWA Self-Petition</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                The Violence Against Women Act (VAWA) allows you to petition for legal immigration status on your own, <strong>without your abuser&apos;s knowledge or cooperation</strong>. If you are married to or the child of a U.S. citizen or permanent resident who has abused you, you may be eligible.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                You can get legal status without your abuser&apos;s cooperation. He does not need to sign anything. He will not be notified that you filed. This process is confidential.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">U-Visa for Crime Victims</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                If you have been a victim of domestic violence and have cooperated (or are willing to cooperate) with law enforcement, you may be eligible for a U-visa. This provides temporary legal status and a path to a green card. You do not need to be married to your abuser to qualify. Filing a police report is an important first step.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Get Help Now</h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>National Immigrant Women&apos;s Advocacy Project</strong> -- Free legal assistance</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>CASA de Esperanza</strong> -- Bilingual DV resources (1-651-772-1611)</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>National DV Hotline</strong> -- Interpreters available in 200+ languages (1-800-799-7233)</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Calling the police or seeking a protective order will <strong>not</strong> trigger immigration enforcement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Evidence Documentation ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Camera className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">Evidence Documentation</h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Photographing Injuries</h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Take photos as soon as safely possible after each incident</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Include a close-up of the injury and a wider shot showing your face for identification</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Place a coin or ruler next to injuries to show scale</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Modern phone photos include date, time, and location metadata -- this is powerful evidence</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Take follow-up photos as bruises develop (they often look worse 2-3 days later)</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Email photos to a trusted friend or a separate email account he does not know about</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Saving Threatening Messages</h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Screenshot texts, emails, social media messages, and voicemails</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Make sure screenshots show the sender&apos;s name/number and the date</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Forward them to a trusted person or a separate email address</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Do not delete the originals if it is safe to keep them</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Voicemails can be recorded using another phone -- play the voicemail on speaker and record on a second device</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Keeping a Dated Journal</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                A written record of abuse is powerful evidence. For each incident, write down the date, time, what happened, what was said, any injuries, and any witnesses. Courts take contemporaneous journals seriously because they show a pattern.
              </p>
              <Link
                href="/plan/evidence"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-haven-purple-soft text-haven-purple text-sm font-medium hover:bg-haven-purple/15 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Use the secure evidence journal
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Medical Documentation</h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Go to a doctor or emergency room after incidents, even if injuries seem minor</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Tell them honestly how you were injured -- they are required to document it in your medical records</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Ask for copies of all medical records related to your injuries</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Request a body map showing the location and extent of injuries</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Medical records with dates and descriptions of injuries create a documented timeline that courts trust</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Legal Aid Directory ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">Legal Aid Directory</h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">National Legal Aid Hotlines</h3>
              <div className="space-y-3">
                <a
                  href="tel:18007997233"
                  className="flex items-center gap-3 p-3 rounded-xl bg-bg-safe hover:bg-haven-purple-soft/50 transition-colors"
                >
                  <Phone className="w-5 h-5 text-haven-purple flex-shrink-0" />
                  <div>
                    <span className="block font-medium text-text-primary text-sm">National DV Hotline</span>
                    <span className="block text-text-secondary text-xs">1-800-799-7233 (24/7, free, confidential)</span>
                  </div>
                </a>
                <a
                  href="tel:18005277233"
                  className="flex items-center gap-3 p-3 rounded-xl bg-bg-safe hover:bg-haven-purple-soft/50 transition-colors"
                >
                  <Phone className="w-5 h-5 text-haven-purple flex-shrink-0" />
                  <div>
                    <span className="block font-medium text-text-primary text-sm">Legal Services Corporation</span>
                    <span className="block text-text-secondary text-xs">1-800-527-7233 (free legal aid referrals)</span>
                  </div>
                </a>
                <a
                  href="tel:18006567647"
                  className="flex items-center gap-3 p-3 rounded-xl bg-bg-safe hover:bg-haven-purple-soft/50 transition-colors"
                >
                  <Phone className="w-5 h-5 text-haven-purple flex-shrink-0" />
                  <div>
                    <span className="block font-medium text-text-primary text-sm">National Legal Aid & Defender Association</span>
                    <span className="block text-text-secondary text-xs">1-800-656-7647</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-haven-purple-soft/50 border border-haven-purple/10">
              <p className="text-text-secondary text-sm leading-relaxed">
                <strong className="text-text-primary">Call your state bar association</strong> and ask for pro bono domestic violence attorneys. Most state bar associations maintain lists of lawyers who volunteer their time specifically for domestic violence cases. You deserve legal representation, and there are people who want to help you get it -- for free.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom reassurance */}
        <div className="text-center py-8 border-t border-border-light">
          <p className="font-serif text-lg text-text-primary leading-relaxed italic max-w-md mx-auto">
            The legal system can feel overwhelming. But you do not have to navigate it alone. One phone call can connect you with someone who will walk beside you through every step.
          </p>
        </div>
      </div>
    </div>
  );
}
