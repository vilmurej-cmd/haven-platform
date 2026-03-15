'use client';

import {
  Shield, Heart, Brain, Briefcase, Wifi,
  Building2, ArrowLeft, HandHeart, Megaphone, DollarSign,
  Fingerprint, DoorOpen, Flower2, UtensilsCrossed, TreePine,
  Users, Palette, PersonStanding, GraduationCap, Landmark,
  Lock, Laptop, BookOpen,
} from 'lucide-react';

const pillars = [
  {
    name: 'Safety',
    icon: Shield,
    color: 'text-haven-emergency',
    bgColor: 'bg-haven-emergency/10',
    borderColor: 'border-haven-emergency/20',
    description: 'Physical safety is the foundation. Every design decision starts with the question: does this keep residents safe?',
    features: [
      { icon: Fingerprint, label: 'Biometric Entry', desc: 'Fingerprint and facial recognition entry systems. No keys to steal, no codes to coerce. Access is revoked instantly if needed.' },
      { icon: DoorOpen, label: 'Safe Rooms', desc: 'Every unit has a reinforced interior room with a separate lock, phone line, and panic button that alerts staff and law enforcement.' },
      { icon: Lock, label: 'Secure Perimeter', desc: 'Trauma-informed security: no visible razor wire or prison aesthetics. High walls with climbing deterrents, motion sensors, and 24/7 monitored cameras.' },
      { icon: Shield, label: '24/7 Staff', desc: 'Trained security and counseling staff available around the clock. Residents are never alone unless they choose to be.' },
    ],
  },
  {
    name: 'Dignity',
    icon: Heart,
    color: 'text-haven-purple',
    bgColor: 'bg-haven-purple-soft',
    borderColor: 'border-haven-purple/10',
    description: 'Shelters should feel like homes, not institutions. Dignity is not a luxury — it is a necessity for healing.',
    features: [
      { icon: DoorOpen, label: 'Private Rooms', desc: 'Individual rooms with real beds, closets, and locks on the doors. Each resident controls their own space.' },
      { icon: UtensilsCrossed, label: 'Communal Kitchen', desc: 'A full kitchen where residents can prepare meals for themselves and their children — restoring normalcy and routine.' },
      { icon: TreePine, label: 'Gardens & Outdoor Space', desc: 'Enclosed gardens, play areas for children, and quiet outdoor spaces for reflection. Nature is healing.' },
      { icon: Flower2, label: 'Beautiful Interiors', desc: 'Warm colors, natural light, art on the walls. Every detail designed to say: you matter, and you deserve beauty.' },
    ],
  },
  {
    name: 'Healing',
    icon: Brain,
    color: 'text-haven-blue',
    bgColor: 'bg-haven-blue/10',
    borderColor: 'border-haven-blue/20',
    description: 'Trauma recovery requires more than a roof. It requires professional support, creative expression, and time.',
    features: [
      { icon: Users, label: 'On-Site Counseling', desc: 'Licensed trauma therapists available for individual and group sessions. Specializing in PTSD, complex trauma, and children\'s therapy.' },
      { icon: Palette, label: 'Art Therapy', desc: 'Creative expression studios for painting, writing, music, and other therapeutic arts. Proven to reduce PTSD symptoms.' },
      { icon: PersonStanding, label: 'Yoga & Movement', desc: 'Trauma-sensitive yoga classes, meditation rooms, and movement therapy. Reconnecting the mind and body after violence.' },
      { icon: Heart, label: 'Support Groups', desc: 'Facilitated peer support groups where survivors share experiences and build community. You are not alone in this.' },
    ],
  },
  {
    name: 'Empowerment',
    icon: Briefcase,
    color: 'text-haven-gold',
    bgColor: 'bg-haven-gold/10',
    borderColor: 'border-haven-gold/20',
    description: 'Leaving is only the beginning. True freedom requires the tools to build an independent life.',
    features: [
      { icon: GraduationCap, label: 'Job Training', desc: 'Vocational training, resume workshops, interview coaching, and job placement partnerships with local employers.' },
      { icon: DollarSign, label: 'Financial Literacy', desc: 'Classes on budgeting, saving, building credit, and financial independence. Many survivors have been denied access to their own money.' },
      { icon: Landmark, label: 'Legal Clinic', desc: 'On-site legal aid for protective orders, divorce proceedings, custody cases, immigration issues, and housing rights.' },
      { icon: BookOpen, label: 'Education Support', desc: 'GED preparation, college enrollment assistance, and scholarship connections. Education is the pathway to permanent independence.' },
    ],
  },
  {
    name: 'Technology',
    icon: Wifi,
    color: 'text-green-600',
    bgColor: 'bg-haven-green/20',
    borderColor: 'border-haven-green/30',
    description: 'Technology should protect, not expose. Residents need safe digital access to rebuild their lives.',
    features: [
      { icon: Wifi, label: 'Secure Wi-Fi', desc: 'Encrypted, monitored Wi-Fi that blocks location-tracking and spyware. Residents can safely access email, job boards, and resources.' },
      { icon: Lock, label: 'Device Security', desc: 'Staff trained to sweep devices for spyware, stalkerware, and tracking apps. New devices available for residents who need them.' },
      { icon: Laptop, label: 'Digital Literacy', desc: 'Classes on online safety, social media privacy, secure communications, and protecting digital identity from abusers.' },
      { icon: Shield, label: 'HAVEN Platform Access', desc: 'In-shelter access to the full HAVEN platform for safety planning, legal resources, and connection to the national network.' },
    ],
  },
];

export default function ShelterModelPage() {
  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <a
        href="/"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to safety
      </a>

      <div className="max-w-3xl mx-auto w-full animate-safe-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-haven-purple" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Building a HAVEN Shelter
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            A blueprint for what a modern domestic violence shelter should look like &mdash; designed
            around safety, dignity, and the belief that every survivor deserves more than a cot in a
            crowded room.
          </p>
        </div>

        {/* Vision */}
        <div
          className="bg-haven-purple-soft rounded-2xl p-6 sm:p-8 mb-10 animate-safe-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">The Vision</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Most domestic violence shelters are underfunded, overcrowded, and designed for survival
            rather than recovery. They serve a critical purpose, but they are not enough. Survivors
            deserve a place that is not just safe, but healing. Not just functional, but beautiful.
            Not just temporary, but transformative.
          </p>
          <p className="text-text-secondary leading-relaxed">
            A HAVEN shelter is built on five pillars. Each one is essential. Together, they create a
            place where a woman fleeing violence can not only survive, but begin to rebuild her life
            with dignity, support, and hope.
          </p>
        </div>

        {/* Five Pillars */}
        <div className="space-y-8 mb-12">
          {pillars.map((pillar, i) => {
            const PillarIcon = pillar.icon;
            return (
              <div
                key={pillar.name}
                className="animate-safe-fade-in"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                {/* Pillar header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${pillar.bgColor} flex items-center justify-center`}
                  >
                    <PillarIcon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                      Pillar {i + 1}
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-text-primary">
                      {pillar.name}
                    </h2>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed mb-4">{pillar.description}</p>

                {/* Features grid */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {pillar.features.map((feature) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div
                        key={feature.label}
                        className={`p-4 rounded-xl ${pillar.bgColor} border ${pillar.borderColor}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <FeatureIcon className={`w-4 h-4 ${pillar.color}`} />
                          <h3 className="font-medium text-text-primary text-sm">{feature.label}</h3>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floor Plan Concept */}
        <div
          className="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-10 animate-safe-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <h2 className="font-serif text-xl font-semibold text-text-primary mb-4">
            Floor Plan Concept
          </h2>
          <div className="space-y-3 text-text-secondary leading-relaxed">
            <p>
              <strong className="text-text-primary">Ground Floor:</strong> Welcome center with
              biometric entry, administrative offices, communal kitchen and dining area,
              children&apos;s playroom, laundry facilities, and a secure outdoor courtyard with
              garden space.
            </p>
            <p>
              <strong className="text-text-primary">Second Floor:</strong> 12&ndash;16 private
              residential units, each with a bedroom, bathroom, and small living space. Every unit
              includes a reinforced safe room with a panic button. Family units have space for
              children.
            </p>
            <p>
              <strong className="text-text-primary">Third Floor:</strong> Healing center with
              counseling offices, group therapy rooms, art therapy studio, yoga and meditation room,
              and a quiet library with secure computer stations.
            </p>
            <p>
              <strong className="text-text-primary">Empowerment Wing:</strong> Job training center
              with computers and printers, financial literacy classroom, legal clinic with private
              consultation rooms, and a childcare center so parents can attend sessions.
            </p>
          </div>
        </div>

        {/* How to Help */}
        <div className="mb-10 animate-safe-fade-in" style={{ animationDelay: '0.65s' }}>
          <h2 className="font-serif text-2xl font-semibold text-text-primary text-center mb-6">
            How to Help
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-border p-6 text-center hover:border-haven-purple/20 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-haven-purple" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Donate</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Every dollar helps build safe spaces. Fund construction, operations, staffing, and
                programs that change lives.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6 text-center hover:border-haven-purple/20 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-3">
                <HandHeart className="w-6 h-6 text-haven-purple" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Volunteer</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Shelters need counselors, teachers, lawyers, cooks, childcare workers, and people
                who care. Your time saves lives.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6 text-center hover:border-haven-purple/20 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-3">
                <Megaphone className="w-6 h-6 text-haven-purple" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Advocate</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Push for policy changes, increased shelter funding, and stronger domestic violence
                laws in your community and state.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="bg-haven-purple rounded-2xl p-6 sm:p-8 text-center text-white mb-8 animate-safe-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          <h2 className="font-serif text-2xl font-bold mb-3">
            Build a HAVEN in Your Community
          </h2>
          <p className="text-white/85 leading-relaxed max-w-lg mx-auto mb-4">
            Every community deserves a HAVEN shelter. Whether you are a city planner, a nonprofit
            leader, a philanthropist, or someone who simply believes that survivors deserve better
            &mdash; this blueprint is yours. Take it. Build it. Save lives.
          </p>
          <p className="text-white/70 text-sm">
            For partnership inquiries, contact us through the National Domestic Violence Hotline.
          </p>
        </div>

        {/* Hotline */}
        <div className="text-center animate-safe-fade-in" style={{ animationDelay: '0.75s' }}>
          <a
            href="tel:18007997233"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-haven-purple-soft text-haven-purple text-sm font-medium hover:bg-haven-purple/15 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-haven-green animate-pulse" />
            National DV Hotline: 1-800-799-7233
          </a>
        </div>
      </div>
    </div>
  );
}
