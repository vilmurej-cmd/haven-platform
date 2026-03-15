import { NextResponse } from 'next/server';

interface RiskLevel {
  level: string;
  description: string;
  steps: string[];
}

function assessRisk(yesCount: number, total: number): RiskLevel {
  const ratio = yesCount / Math.max(total, 1);

  if (ratio >= 0.75) {
    return {
      level: 'extreme',
      description:
        'Your answers indicate an extreme level of danger. Your safety is the top priority right now. Please reach out for help immediately.',
      steps: [
        'Call 911 if you are in immediate danger',
        'Call the National DV Hotline: 1-800-799-7233',
        'Go to your nearest shelter or safe location now',
        'Do not confront your abuser about leaving',
        'Tell someone you trust where you are',
        'If you have children, take them with you if it is safe to do so',
      ],
    };
  }

  if (ratio >= 0.5) {
    return {
      level: 'severe',
      description:
        'Your answers indicate a severe level of risk. The situation you are in is dangerous, and it is important to take steps to protect yourself as soon as possible.',
      steps: [
        'Contact the National DV Hotline: 1-800-799-7233',
        'Create a safety plan with an advocate',
        'Pack a go-bag with essentials and keep it hidden or with someone you trust',
        'Memorize important phone numbers',
        'Identify a safe place to go if you need to leave quickly',
        'Document incidents with dates and details when it is safe',
        'Consider obtaining a protective order',
      ],
    };
  }

  if (ratio >= 0.25) {
    return {
      level: 'increased',
      description:
        'Your answers indicate an increased level of risk. While every situation is different, the patterns you describe are concerning and worth taking seriously.',
      steps: [
        'Talk to someone you trust about what is happening',
        'Call the National DV Hotline to talk through your options: 1-800-799-7233',
        'Begin gathering important documents',
        'Learn about protective orders in your state',
        'Start building a safety plan',
        'Know that the abuse is not your fault',
        'Consider meeting with a domestic violence advocate',
      ],
    };
  }

  return {
    level: 'variable',
    description:
      'Your answers suggest a variable level of risk. Even if the danger feels low right now, trust your instincts. If something feels wrong, it matters.',
    steps: [
      'Trust your instincts — they are usually right',
      'The National DV Hotline is always available: 1-800-799-7233',
      'Learn about the warning signs of escalation',
      'Talk to someone you trust about your concerns',
      'Know that you deserve to feel safe in your own home',
      'HAVEN is here for you whenever you need it',
    ],
  };
}

export async function POST(request: Request) {
  try {
    const { answers } = await request.json();

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Invalid input. Expected an array of answers.' },
        { status: 400 }
      );
    }

    const yesCount = answers.filter(Boolean).length;
    const total = answers.length;
    const result = assessRisk(yesCount, total);

    return NextResponse.json({
      yesCount,
      total,
      ...result,
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. If you are in danger, call 911.' },
      { status: 500 }
    );
  }
}
