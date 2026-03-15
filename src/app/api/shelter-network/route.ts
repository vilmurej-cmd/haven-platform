import { NextRequest, NextResponse } from 'next/server';

interface Organization {
  name: string;
  phone: string;
  website: string;
  description: string;
  category: string;
}

const ORGANIZATIONS: Organization[] = [
  // Shelters
  {
    name: 'National Domestic Violence Hotline',
    phone: '1-800-799-7233',
    website: 'https://www.thehotline.org',
    description: '24/7 confidential support, safety planning, and local shelter referrals for anyone affected by domestic violence.',
    category: 'shelters',
  },
  {
    name: 'National Network to End Domestic Violence (NNEDV)',
    phone: '1-202-543-5566',
    website: 'https://nnedv.org',
    description: 'Advocates for policy change and connects survivors with local programs and shelters across all 50 states.',
    category: 'shelters',
  },
  {
    name: 'StrongHearts Native Helpline',
    phone: '1-844-762-8483',
    website: 'https://strongheartshelpline.org',
    description: 'Culturally appropriate support for Native Americans and Alaska Natives affected by domestic and sexual violence.',
    category: 'shelters',
  },
  {
    name: 'National Coalition Against Domestic Violence (NCADV)',
    phone: '1-303-839-1852',
    website: 'https://ncadv.org',
    description: 'National advocacy organization providing resources, education, and shelter referrals for DV survivors.',
    category: 'shelters',
  },
  {
    name: 'WomensLaw.org Emergency Services',
    phone: '1-800-799-7233',
    website: 'https://www.womenslaw.org/find-help/advocates-and-shelters',
    description: 'State-by-state directory of domestic violence shelters and local advocacy programs.',
    category: 'shelters',
  },
  // Legal
  {
    name: 'National Legal Aid & Defender Association',
    phone: '1-202-452-0620',
    website: 'https://www.nlada.org',
    description: 'Connects low-income individuals with free legal representation for protective orders, custody, and divorce.',
    category: 'legal',
  },
  {
    name: 'WomensLaw.org',
    phone: 'Email hotline available',
    website: 'https://www.womenslaw.org',
    description: 'Free legal information and support for survivors, including state-specific laws on protective orders and custody.',
    category: 'legal',
  },
  {
    name: 'Legal Momentum',
    phone: '1-212-925-6635',
    website: 'https://www.legalmomentum.org',
    description: 'Legal advocacy for women\'s rights including domestic violence cases, employment discrimination, and immigration.',
    category: 'legal',
  },
  {
    name: 'American Bar Association Commission on Domestic Violence',
    phone: '1-202-662-1000',
    website: 'https://www.americanbar.org/groups/domestic_violence/',
    description: 'Pro bono legal resources and attorney referrals for domestic violence survivors nationwide.',
    category: 'legal',
  },
  {
    name: 'National Immigrant Women\'s Advocacy Project',
    phone: '1-202-274-4457',
    website: 'https://niwaplibrary.wcl.american.edu',
    description: 'Legal assistance for immigrant survivors including VAWA self-petitions, U-Visas, and T-Visas.',
    category: 'legal',
  },
  // Counseling
  {
    name: 'National Alliance on Mental Illness (NAMI)',
    phone: '1-800-950-6264',
    website: 'https://www.nami.org',
    description: 'Mental health support, education, and referrals. Free helpline for individuals and families in crisis.',
    category: 'counseling',
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    website: 'https://www.crisistextline.org',
    description: 'Free 24/7 text-based crisis support for anyone in emotional distress. Trained crisis counselors.',
    category: 'counseling',
  },
  {
    name: 'RAINN (Rape, Abuse & Incest National Network)',
    phone: '1-800-656-4673',
    website: 'https://www.rainn.org',
    description: '24/7 sexual assault hotline with free confidential counseling and local referrals.',
    category: 'counseling',
  },
  {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    website: 'https://988lifeline.org',
    description: '24/7 crisis support for anyone in suicidal crisis or emotional distress. Call or text 988.',
    category: 'counseling',
  },
  // Financial
  {
    name: 'Allstate Foundation Moving Ahead',
    phone: 'Online program',
    website: 'https://www.allstatefoundation.org/domestic-violence',
    description: 'Free financial empowerment curriculum designed specifically for domestic violence survivors.',
    category: 'financial',
  },
  {
    name: 'National Endowment for Financial Education',
    phone: '1-303-741-6333',
    website: 'https://www.nefe.org',
    description: 'Financial literacy resources including budgeting tools, credit repair guidance, and economic abuse recovery.',
    category: 'financial',
  },
  {
    name: 'FreeFrom',
    phone: 'Online resources',
    website: 'https://www.freefrom.org',
    description: 'Financial safety and economic justice for survivors. Gift card program, savings matching, and compensation fund.',
    category: 'financial',
  },
  {
    name: 'Dress for Success',
    phone: '1-212-532-1922',
    website: 'https://dressforsuccess.org',
    description: 'Professional attire, career development, and job readiness programs for women rebuilding their lives.',
    category: 'financial',
  },
  // Children
  {
    name: 'Childhelp National Child Abuse Hotline',
    phone: '1-800-422-4453',
    website: 'https://www.childhelp.org',
    description: '24/7 hotline for child abuse reporting, crisis intervention, and referrals to local services.',
    category: 'children',
  },
  {
    name: 'National Child Traumatic Stress Network',
    phone: '1-310-235-2633',
    website: 'https://www.nctsn.org',
    description: 'Resources for children exposed to domestic violence including trauma-focused therapy referrals.',
    category: 'children',
  },
  {
    name: 'Futures Without Violence',
    phone: '1-415-678-5500',
    website: 'https://www.futureswithoutviolence.org',
    description: 'Programs addressing the impact of violence on children, teens, and families. Prevention education.',
    category: 'children',
  },
  {
    name: 'National Center for Missing & Exploited Children',
    phone: '1-800-843-5678',
    website: 'https://www.missingkids.org',
    description: 'Resources for child safety, custody concerns, and cases involving parental abduction.',
    category: 'children',
  },
  // Healthcare
  {
    name: 'Futures Without Violence Health Program',
    phone: '1-415-678-5500',
    website: 'https://www.futureswithoutviolence.org/health',
    description: 'Training healthcare providers to screen for and respond to domestic violence. Patient safety cards.',
    category: 'healthcare',
  },
  {
    name: 'Office on Women\'s Health (HHS)',
    phone: '1-800-994-9662',
    website: 'https://www.womenshealth.gov',
    description: 'Federal health resources for women including domestic violence health impacts and local clinic referrals.',
    category: 'healthcare',
  },
  {
    name: 'National Health Resource Center on Domestic Violence',
    phone: '1-888-792-2873',
    website: 'https://www.futureswithoutviolence.org/health',
    description: 'Health-focused resources for survivors including trauma-informed care and medical documentation guidance.',
    category: 'healthcare',
  },
  {
    name: 'Planned Parenthood',
    phone: '1-800-230-7526',
    website: 'https://www.plannedparenthood.org',
    description: 'Confidential reproductive healthcare, safety assessments, and referrals for survivors of intimate partner violence.',
    category: 'healthcare',
  },
];

const CATEGORIES = [
  { id: 'shelters', label: 'Shelters & Housing', icon: 'home' },
  { id: 'legal', label: 'Legal Assistance', icon: 'scale' },
  { id: 'counseling', label: 'Counseling & Crisis Support', icon: 'heart' },
  { id: 'financial', label: 'Financial Empowerment', icon: 'dollar' },
  { id: 'children', label: 'Children & Family', icon: 'users' },
  { id: 'healthcare', label: 'Healthcare', icon: 'medical' },
];

export async function GET(_request: NextRequest) {
  try {
    return NextResponse.json({
      organizations: ORGANIZATIONS,
      categories: CATEGORIES,
      note: 'If you are in immediate danger, call 911. National DV Hotline: 1-800-799-7233 (24/7).',
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Call the National DV Hotline at 1-800-799-7233.' },
      { status: 500 }
    );
  }
}
