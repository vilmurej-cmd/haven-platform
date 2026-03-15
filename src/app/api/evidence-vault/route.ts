import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

interface EvidenceEntry {
  date: string;
  type: string;
  description: string;
  evidence?: string;
}

function buildDemoResponse(entries: EvidenceEntry[]) {
  const sorted = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const timeline = sorted.map((entry, i) => ({
    order: i + 1,
    date: entry.date,
    type: entry.type,
    summary: entry.description,
    hasEvidence: !!entry.evidence,
  }));

  const grouped: Record<string, EvidenceEntry[]> = {};
  for (const entry of entries) {
    const type = entry.type || 'Other';
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(entry);
  }

  const categorySummaries = Object.entries(grouped).map(([type, items]) =>
    `${type}: ${items.length} documented incident${items.length > 1 ? 's' : ''} — ${items.map(e => e.description).join('; ')}`
  );

  const summary = [
    'EVIDENCE DOCUMENTATION SUMMARY',
    '================================',
    '',
    `Total documented incidents: ${entries.length}`,
    `Date range: ${sorted[0]?.date || 'N/A'} to ${sorted[sorted.length - 1]?.date || 'N/A'}`,
    `Categories: ${Object.keys(grouped).join(', ')}`,
    '',
    'CATEGORIZED EVIDENCE:',
    ...categorySummaries.map(s => `• ${s}`),
    '',
    'TIMELINE:',
    ...timeline.map(t => `${t.order}. [${t.date}] ${t.type}: ${t.summary}${t.hasEvidence ? ' (evidence attached)' : ''}`),
  ].join('\n');

  const recommendations = [
    'Keep all documentation in a secure location outside your home — consider a trusted friend, family member, or cloud storage with a separate account.',
    'Take timestamped photos and screenshots when it is safe to do so. Metadata (date, time, location) strengthens evidence.',
    'Save all relevant text messages, emails, and voicemails. Take screenshots with visible timestamps.',
    'If you have visible injuries, photograph them and seek medical attention — medical records serve as independent documentation.',
    'Consider requesting a protective order. The documented pattern of behavior strengthens your case.',
    'Share this evidence summary with a domestic violence advocate or attorney before taking legal action.',
  ];

  return { summary, timeline, recommendations };
}

export async function POST(request: NextRequest) {
  try {
    const { entries } = await request.json();

    if (!entries || !Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one evidence entry.' },
        { status: 400 }
      );
    }

    if (process.env.OPENAI_API_KEY) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a legal documentation assistant helping a domestic violence survivor organize evidence. Given these evidence entries, create a formatted legal-ready document summary with timeline, categorized evidence, and recommendations for a lawyer. Be thorough, compassionate, and professional. Return JSON with three fields: "summary" (string — formatted document), "timeline" (array of objects with order, date, type, summary, hasEvidence), "recommendations" (array of strings). Return ONLY valid JSON, no markdown.',
            },
            {
              role: 'user',
              content: `Organize these evidence entries into a legal-ready document:\n\n${JSON.stringify(entries, null, 2)}`,
            },
          ],
          temperature: 0.4,
          max_tokens: 2500,
        });

        const content = completion.choices?.[0]?.message?.content;
        if (content) {
          const result = JSON.parse(content);
          return NextResponse.json({
            summary: result.summary,
            timeline: result.timeline,
            recommendations: result.recommendations,
            source: 'ai',
          });
        }
      } catch {
        // Fall through to demo data
      }
    }

    const demo = buildDemoResponse(entries);
    return NextResponse.json({
      summary: demo.summary,
      timeline: demo.timeline,
      recommendations: demo.recommendations,
      source: 'demo',
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Your evidence entries remain stored locally and are safe.' },
      { status: 500 }
    );
  }
}
