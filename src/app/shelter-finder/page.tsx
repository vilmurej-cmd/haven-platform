'use client';

import { useState, useMemo } from 'react';
import { Search, Phone, MapPin, ArrowLeft, Baby, PawPrint, Languages, Accessibility, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

interface Shelter {
  id: number;
  name: string;
  distance: string;
  distanceMiles: number;
  phone: string;
  address: string;
  services: string[];
  availability: 'available' | 'limited' | 'call';
  tags: string[];
}

const DEMO_SHELTERS: Shelter[] = [
  {
    id: 1,
    name: 'Safe Haven Family Shelter',
    distance: '2.3 mi',
    distanceMiles: 2.3,
    phone: '15555550101',
    address: '1200 Oak Street',
    services: ['Emergency housing', 'Case management', 'Children\'s program'],
    availability: 'available',
    tags: ['children', 'pets'],
  },
  {
    id: 2,
    name: 'Hope House',
    distance: '4.1 mi',
    distanceMiles: 4.1,
    phone: '15555550102',
    address: '340 Maple Avenue',
    services: ['Crisis counseling', 'Legal advocacy', 'Support groups'],
    availability: 'limited',
    tags: ['children', 'bilingual'],
  },
  {
    id: 3,
    name: "Women's Resource Center",
    distance: '6.8 mi',
    distanceMiles: 6.8,
    phone: '15555550103',
    address: '789 Elm Boulevard',
    services: ['24/7 intake', 'Transitional housing', 'Job training'],
    availability: 'available',
    tags: [],
  },
  {
    id: 4,
    name: 'New Beginnings Shelter',
    distance: '8.2 mi',
    distanceMiles: 8.2,
    phone: '15555550104',
    address: '456 Pine Road',
    services: ['Emergency shelter', 'Substance abuse support', 'Pet kennels'],
    availability: 'call',
    tags: ['pets'],
  },
  {
    id: 5,
    name: 'Harbor House',
    distance: '12.1 mi',
    distanceMiles: 12.1,
    phone: '15555550105',
    address: '2100 Harbor Drive',
    services: ['ADA accessible rooms', 'Medical referrals', 'Transportation assistance'],
    availability: 'available',
    tags: ['ada'],
  },
];

const TAG_LABELS: Record<string, { label: string; icon: typeof Baby }> = {
  children: { label: 'Accepts children', icon: Baby },
  pets: { label: 'Accepts pets', icon: PawPrint },
  bilingual: { label: 'Bilingual staff', icon: Languages },
  ada: { label: 'ADA accessible', icon: Accessibility },
};

function AvailabilityBadge({ status }: { status: Shelter['availability'] }) {
  const styles = {
    available: 'bg-haven-green/20 text-green-700',
    limited: 'bg-haven-gold/20 text-amber-700',
    call: 'bg-haven-purple-soft text-haven-purple',
  };
  const labels = {
    available: 'Beds available',
    limited: 'Limited availability',
    call: 'Call for availability',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'available' ? 'bg-green-500' : status === 'limited' ? 'bg-amber-500' : 'bg-haven-purple'}`} />
      {labels[status]}
    </span>
  );
}

export default function ShelterFinderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  }

  function toggleFilter(tag: string) {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((f) => f !== tag) : [...prev, tag]
    );
  }

  const filteredShelters = useMemo(() => {
    if (!hasSearched) return [];
    if (activeFilters.length === 0) return DEMO_SHELTERS;
    return DEMO_SHELTERS.filter((shelter) =>
      activeFilters.every((filter) => shelter.tags.includes(filter))
    );
  }, [hasSearched, activeFilters]);

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/help-now"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Help Now
        </Link>

        {/* Header */}
        <div className="text-center mb-8 animate-safe-fade-in">
          <div className="w-14 h-14 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-7 h-7 text-haven-purple" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-2">
            Find a Safe Place
          </h1>
          <p className="text-text-secondary text-base max-w-md mx-auto">
            Shelters near you that can help. All calls are confidential.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6 animate-safe-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Enter your ZIP code or city"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-24 py-4 rounded-2xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        {hasSearched && (
          <div className="mb-6 animate-safe-fade-in">
            <p className="text-text-secondary text-sm mb-2">Filter by:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(TAG_LABELS).map(([tag, { label, icon: Icon }]) => (
                <button
                  key={tag}
                  onClick={() => toggleFilter(tag)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilters.includes(tag)
                      ? 'bg-haven-purple text-white'
                      : 'bg-white border border-border text-text-secondary hover:border-haven-purple/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Safety note */}
        {hasSearched && (
          <div className="mb-6 p-4 rounded-xl bg-haven-warm border border-haven-gold/20 animate-safe-fade-in">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-haven-gold flex-shrink-0 mt-0.5" />
              <p className="text-text-secondary text-sm leading-relaxed">
                <strong className="text-text-primary">Call before visiting</strong> — for your safety, let the shelter know you are coming. They can help you arrive safely.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="space-y-4 animate-safe-fade-in" style={{ animationDelay: '0.1s' }}>
            <p className="text-text-secondary text-sm">
              {filteredShelters.length} shelter{filteredShelters.length !== 1 ? 's' : ''} found near &ldquo;{searchQuery}&rdquo;
            </p>

            {filteredShelters.map((shelter) => (
              <div
                key={shelter.id}
                className="p-5 rounded-2xl bg-white border border-border hover:border-haven-purple/20 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-text-primary">
                      {shelter.name}
                    </h3>
                    <div className="flex items-center gap-2 text-text-secondary text-sm mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{shelter.distance} away</span>
                      <span className="text-border">|</span>
                      <span>{shelter.address}</span>
                    </div>
                  </div>
                  <AvailabilityBadge status={shelter.availability} />
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {shelter.services.map((service) => (
                    <span
                      key={service}
                      className="px-2.5 py-0.5 rounded-full bg-bg-muted text-text-secondary text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                {shelter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {shelter.tags.map((tag) => {
                      const tagInfo = TAG_LABELS[tag];
                      if (!tagInfo) return null;
                      const Icon = tagInfo.icon;
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-haven-purple text-xs font-medium"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {tagInfo.label}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Call button */}
                <a
                  href={`tel:${shelter.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            ))}

            {filteredShelters.length === 0 && (
              <div className="text-center py-8">
                <p className="text-text-secondary">
                  No shelters match your current filters. Try removing a filter or searching a different area.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom hotline */}
        <div className="mt-12 text-center animate-safe-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="p-5 rounded-2xl bg-haven-purple-soft">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-haven-purple" />
              <span className="text-haven-purple text-sm font-medium">Available 24/7</span>
            </div>
            <p className="text-text-secondary text-sm mb-3">
              The National Domestic Violence Hotline can also help you find shelter.
            </p>
            <a
              href="tel:18007997233"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              1-800-799-7233
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
