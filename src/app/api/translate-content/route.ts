import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function POST(request: NextRequest) {
  try {
    const { texts, targetLanguage, context } = await request.json();

    if (!texts || typeof texts !== 'object') {
      return NextResponse.json(
        { error: 'Please provide a texts object with key-value pairs to translate.' },
        { status: 400 }
      );
    }

    if (!targetLanguage) {
      return NextResponse.json(
        { error: 'Please provide a targetLanguage.' },
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
              content: `Translate these UI strings to ${targetLanguage}. Context: domestic violence safety platform${context ? ` — ${context}` : ''}. Use compassionate, clear, simple language that a person in crisis can understand quickly. Preserve any HTML tags exactly as they are. Keep brand names unchanged (HAVEN). Keep phone numbers unchanged. Return a JSON object with the same keys as the input, with translated values. Return ONLY valid JSON, no markdown.`,
            },
            {
              role: 'user',
              content: JSON.stringify(texts),
            },
          ],
          temperature: 0.3,
          max_tokens: 2000,
        });

        const content = completion.choices?.[0]?.message?.content;
        if (content) {
          const translations = JSON.parse(content);
          return NextResponse.json({
            translations,
            targetLanguage,
            source: 'ai',
          });
        }
      } catch {
        // Fall through to demo data
      }
    }

    // Demo fallback: return original texts unchanged
    return NextResponse.json({
      translations: texts,
      targetLanguage,
      source: 'demo',
      note: 'Translation unavailable — returning original text. Set OPENAI_API_KEY for AI-powered translation. For immediate help in your language, call the National DV Hotline at 1-800-799-7233 — interpreters available in 200+ languages.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. The National DV Hotline (1-800-799-7233) has interpreters in 200+ languages.' },
      { status: 500 }
    );
  }
}
