'use client';

import { useState } from 'react';
import {
  Search, Home, Scale, HeartHandshake, DollarSign, Baby, Stethoscope, ArrowLeft, ExternalLink, Phone,
} from 'lucide-react';
import Link from 'next/link';

type Category = 'All' | 'Shelters' | 'Legal Aid' | 'Counseling' | 'Financial' | "Children's Services" | 'Healthcare';

interface Resource {
  name: string;
  category: Category;
  phone: string;
  website: string;
  description: string;
}

const categories: { label: Category; icon: typeof Home }[] = [
  { label: 'All', icon: Search },
  { label: 'Shelters', icon: Home },
  { label: 'Legal Aid', icon: Scale },
  { label: 'Counseling', icon: HeartHandshake },
  { label: 'Financial', icon: DollarSign },
  { label: "Children's Services", icon: Baby },
  { label: 'Healthcare', icon: Stethoscope },
];

const resources: Resource[] = [
  // Shelters
  {
    name: 'National Network to End Domestic Violence',
    category: 'Shelters',
    phone: '1-202-543-5566',
    website: 'https://nnedv.org',
    description: 'National advocacy organization working to end domestic violence, connecting survivors to local shelter programs across all 50 states.',
  },
  {
    name: 'National Domestic Violence Hotline',
    category: 'Shelters',
    phone: '1-800-799-7233',
    website: 'https://www.thehotline.org',
    description: '24/7 confidential support for survivors. Can connect you to local shelters, safety planning, and resources in your area.',
  },
  {
    name: 'DomesticShelters.org',
    category: 'Shelters',
    phone: '1-800-799-7233',
    website: 'https://www.domesticshelters.org',
    description: 'Comprehensive searchable database of domestic violence shelters and programs across the United States and Canada.',
  },
  {
    name: 'Safe Horizon',
    category: 'Shelters',
    phone: '1-800-621-4673',
    website: 'https://www.safehorizon.org',
    description: 'Largest victim services agency in the US. Provides shelter, counseling, legal services, and advocacy to survivors of violence.',
  },
  {
    name: 'National Indigenous Women\'s Resource Center',
    category: 'Shelters',
    phone: '1-855-649-7299',
    website: 'https://www.niwrc.org',
    description: 'Dedicated to ending violence against Native women. Culturally specific shelter referrals and support services.',
  },
  // Legal Aid
  {
    name: 'WomensLaw.org',
    category: 'Legal Aid',
    phone: '1-800-799-7233',
    website: 'https://www.womenslaw.org',
    description: 'Free legal information for survivors of domestic violence. State-specific laws, court preparation guides, and email hotline for legal questions.',
  },
  {
    name: 'National Legal Aid & Defender Association',
    category: 'Legal Aid',
    phone: '1-202-452-0620',
    website: 'https://www.nlada.org',
    description: 'Connects low-income individuals with free civil legal aid. Can help with protective orders, custody, divorce, and housing.',
  },
  {
    name: 'Legal Aid Society',
    category: 'Legal Aid',
    phone: '1-212-577-3300',
    website: 'https://www.legalaidnyc.org',
    description: 'Free legal services for those who cannot afford an attorney. Specializes in family law, domestic violence cases, and immigration.',
  },
  {
    name: 'American Bar Association — Commission on Domestic Violence',
    category: 'Legal Aid',
    phone: '1-202-662-1000',
    website: 'https://www.americanbar.org/groups/domestic_violence/',
    description: 'Resources for understanding your legal rights, finding pro bono attorneys, and navigating the court system as a survivor.',
  },
  {
    name: 'National Immigrant Women\'s Advocacy Project',
    category: 'Legal Aid',
    phone: '1-202-274-4457',
    website: 'https://niwaplibrary.wcl.american.edu',
    description: 'Legal resources specifically for immigrant survivors, including VAWA self-petition information, U-visa guidance, and T-visa assistance.',
  },
  // Counseling
  {
    name: 'National Alliance on Mental Illness (NAMI)',
    category: 'Counseling',
    phone: '1-800-950-6264',
    website: 'https://www.nami.org',
    description: 'Free mental health support, education, and advocacy. Helpline provides referrals to local counseling and support groups.',
  },
  {
    name: 'RAINN (Rape, Abuse & Incest National Network)',
    category: 'Counseling',
    phone: '1-800-656-4673',
    website: 'https://www.rainn.org',
    description: '24/7 confidential support for survivors of sexual violence. Free online chat and phone hotline connected to local providers.',
  },
  {
    name: 'Crisis Text Line',
    category: 'Counseling',
    phone: 'Text HOME to 741741',
    website: 'https://www.crisistextline.org',
    description: 'Free 24/7 text-based counseling for anyone in crisis. Text HOME to 741741 to connect with a trained crisis counselor.',
  },
  {
    name: 'Psychology Today — Therapist Finder',
    category: 'Counseling',
    phone: '1-800-799-7233',
    website: 'https://www.psychologytoday.com/us/therapists/domestic-violence',
    description: 'Searchable directory of therapists specializing in domestic violence, PTSD, and trauma recovery. Filter by insurance, location, and specialty.',
  },
  {
    name: 'Futures Without Violence',
    category: 'Counseling',
    phone: '1-415-678-5500',
    website: 'https://www.futureswithoutviolence.org',
    description: 'Health-focused programs connecting survivors to trauma-informed counseling, support groups, and healing resources.',
  },
  // Financial
  {
    name: 'National Endowment for Financial Education',
    category: 'Financial',
    phone: '1-303-741-6333',
    website: 'https://www.nefe.org',
    description: 'Free financial literacy resources, budgeting tools, and planning guides for individuals rebuilding financial independence.',
  },
  {
    name: 'Allstate Foundation — Moving Ahead',
    category: 'Financial',
    phone: '1-800-799-7233',
    website: 'https://www.allstatefoundation.org/domestic-violence',
    description: 'Financial empowerment curriculum designed specifically for domestic violence survivors. Free resources on building credit, saving, and financial safety.',
  },
  {
    name: 'FreeFrom',
    category: 'Financial',
    phone: '1-424-409-3285',
    website: 'https://www.freefrom.org',
    description: 'Dedicated to financial security for survivors. Offers cash assistance, financial planning, compensation fund navigation, and policy advocacy.',
  },
  {
    name: 'National Foundation for Credit Counseling',
    category: 'Financial',
    phone: '1-800-388-2227',
    website: 'https://www.nfcc.org',
    description: 'Free and low-cost financial counseling, debt management plans, and credit rebuilding resources for individuals in financial distress.',
  },
  // Children's Services
  {
    name: 'National Child Traumatic Stress Network',
    category: "Children's Services",
    phone: '1-310-235-2633',
    website: 'https://www.nctsn.org',
    description: 'Resources for children who have witnessed or experienced domestic violence. Trauma-informed care guides and provider directories.',
  },
  {
    name: 'Childhelp National Child Abuse Hotline',
    category: "Children's Services",
    phone: '1-800-422-4453',
    website: 'https://www.childhelp.org',
    description: '24/7 hotline for reporting child abuse and getting help. Professional crisis counselors provide intervention, information, and referrals.',
  },
  {
    name: 'National Center for Missing & Exploited Children',
    category: "Children's Services",
    phone: '1-800-843-5678',
    website: 'https://www.missingkids.org',
    description: 'Resources for parents concerned about child safety during domestic violence situations. Help with custody issues and child recovery.',
  },
  {
    name: 'Children\'s Defense Fund',
    category: "Children's Services",
    phone: '1-800-233-1200',
    website: 'https://www.childrensdefense.org',
    description: 'Advocacy for children in poverty and crisis. Resources for healthcare, education, housing, and safety for children of survivors.',
  },
  // Healthcare
  {
    name: 'Office on Women\'s Health — HHS',
    category: 'Healthcare',
    phone: '1-800-994-9662',
    website: 'https://www.womenshealth.gov',
    description: 'Federal resource for women\'s health information. Helpline connects survivors to healthcare services, including reproductive health and mental health.',
  },
  {
    name: 'Planned Parenthood',
    category: 'Healthcare',
    phone: '1-800-230-7526',
    website: 'https://www.plannedparenthood.org',
    description: 'Confidential healthcare services including reproductive health, STI testing, and counseling. Trained staff can screen for domestic violence.',
  },
  {
    name: 'SAMHSA National Helpline',
    category: 'Healthcare',
    phone: '1-800-662-4357',
    website: 'https://www.samhsa.gov/find-help/national-helpline',
    description: 'Free 24/7 treatment referral service for substance abuse and mental health. Confidential, available in English and Spanish.',
  },
  {
    name: 'National Health Resource Center on Domestic Violence',
    category: 'Healthcare',
    phone: '1-888-792-2873',
    website: 'https://ipvhealthpartners.org',
    description: 'Connects survivors with healthcare providers trained in domestic violence response. Resources for documenting injuries and accessing forensic exams.',
  },
  {
    name: 'Suicide & Crisis Lifeline',
    category: 'Healthcare',
    phone: '988',
    website: 'https://988lifeline.org',
    description: 'Call or text 988 for free, confidential support 24/7. Trained counselors for anyone experiencing suicidal thoughts, emotional distress, or crisis.',
  },
];

export default function NetworkPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter((r) => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to safety
      </Link>

      <div className="max-w-3xl mx-auto w-full animate-safe-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Resource Network
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            National organizations ready to help. Every phone number connects you to someone who cares.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 animate-safe-fade-in" style={{ animationDelay: '0.1s' }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search organizations, services, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:border-haven-purple focus:ring-1 focus:ring-haven-purple outline-none text-base"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 animate-safe-fade-in" style={{ animationDelay: '0.15s' }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-haven-purple text-white shadow-sm'
                    : 'bg-white border border-border text-text-secondary hover:border-haven-purple/30 hover:text-haven-purple'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-text-muted text-sm mb-4">
          {filteredResources.length} {filteredResources.length === 1 ? 'organization' : 'organizations'} found
        </p>

        {/* Resource cards */}
        <div className="space-y-4 mb-10">
          {filteredResources.map((resource, i) => {
            const catMeta = categories.find((c) => c.label === resource.category);
            const CatIcon = catMeta?.icon || Home;
            return (
              <div
                key={resource.name}
                className="bg-white rounded-2xl border border-border p-5 sm:p-6 hover:border-haven-purple/20 hover:shadow-sm transition-all animate-safe-fade-in"
                style={{ animationDelay: `${0.2 + i * 0.03}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CatIcon className="w-5 h-5 text-haven-purple" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-serif text-lg font-semibold text-text-primary leading-snug">
                        {resource.name}
                      </h3>
                      <span className="text-xs text-text-muted bg-bg-muted px-2 py-1 rounded-full flex-shrink-0 mt-0.5">
                        {resource.category}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {resource.phone.startsWith('1-') || resource.phone === '988' || resource.phone.startsWith('Text') ? (
                        <a
                          href={resource.phone.startsWith('Text') ? undefined : `tel:${resource.phone.replace(/[^0-9]/g, '')}`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-haven-purple-soft text-haven-purple text-sm font-medium hover:bg-haven-purple/15 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {resource.phone}
                        </a>
                      ) : null}
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-haven-purple text-sm hover:underline"
                      >
                        Visit website <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted text-base">
              No organizations found matching your search. Try a different term or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
