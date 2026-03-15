import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

interface Shelter {
  name: string;
  address: string;
  phone: string;
  services: string[];
  distance: string;
}

const DEMO_SHELTERS: Shelter[] = [
  {
    name: 'Safe Harbor Women\'s Shelter',
    address: 'Confidential Location — call for intake',
    phone: '(555) 234-5678',
    services: ['Emergency housing', '24/7 advocacy', 'Legal assistance', 'Children\'s program', 'Pet-friendly'],
    distance: '2.3 miles',
  },
  {
    name: 'Hope House Family Center',
    address: 'Confidential Location — call for intake',
    phone: '(555) 345-6789',
    services: ['Family housing', 'Counseling', 'Job training', 'Financial literacy', 'Childcare'],
    distance: '4.1 miles',
  },
  {
    name: 'New Beginnings Transitional Living',
    address: 'Confidential Location — call for intake',
    phone: '(555) 456-7890',
    services: ['Transitional housing (up to 2 years)', 'Career counseling', 'Education support', 'Mental health services'],
    distance: '5.8 miles',
  },
  {
    name: 'Community Crisis Center',
    address: '1200 Community Blvd (public location)',
    phone: '(555) 567-8901',
    services: ['Crisis intervention', 'Safety planning', 'Court advocacy', 'Support groups', 'Bilingual services'],
    distance: '7.2 miles',
  },
  {
    name: 'Sunrise Recovery Shelter',
    address: 'Confidential Location — call for intake',
    phone: '(555) 678-9012',
    services: ['Trauma-focused care', 'Substance abuse support', 'PTSD treatment', 'Art therapy', 'Yoga and wellness'],
    distance: '9.5 miles',
  },
];

export async function POST(request: NextRequest) {
  try {
    const { location, radius } = await request.json();

    if (process.env.OPENAI_API_KEY) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a domestic violence shelter finder. Given the location, provide 5 nearby shelters with name, address, phone, services, distance. Format as JSON array. Each object should have: name (string), address (string), phone (string), services (string array), distance (string). Use realistic but fictional data. Keep shelter addresses confidential where appropriate. Return ONLY the JSON array, no markdown.',
            },
            {
              role: 'user',
              content: `Find 5 domestic violence shelters near: ${location}${radius ? `, within ${radius} miles` : ''}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        });

        const content = completion.choices?.[0]?.message?.content;
        if (content) {
          const shelters = JSON.parse(content);
          return NextResponse.json({
            shelters,
            location: location || 'your area',
            source: 'ai',
            note: 'Shelter addresses are kept confidential for safety. Call ahead for intake information. If no shelter is available, call the National DV Hotline (1-800-799-7233).',
          });
        }
      } catch {
        // Fall through to demo data
      }
    }

    return NextResponse.json({
      shelters: DEMO_SHELTERS,
      location: location || 'your area',
      source: 'demo',
      note: 'Shelter addresses are kept confidential for safety. Call ahead for intake information. If no shelter is available, call the National DV Hotline (1-800-799-7233).',
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Call the National DV Hotline at 1-800-799-7233 for shelter assistance.' },
      { status: 500 }
    );
  }
}
