import { NextResponse } from 'next/server';

const DEMO_GUIDANCE: Record<string, string> = {
  identify: `Start by recognizing the patterns. Abuse can be physical, emotional, financial, or digital. Trust your instincts — if something feels wrong, it is. You deserve to feel safe.\n\nCommon signs include:\n- Controlling who you see or talk to\n- Monitoring your phone, location, or finances\n- Threats, intimidation, or unpredictable anger\n- Making you feel like everything is your fault\n\nYou are not imagining this. Your experience is valid.`,

  documents: `Gather important documents and keep copies in a safe place outside your home. If you can, give copies to someone you trust.\n\nKey documents:\n- ID (driver's license, passport, birth certificate)\n- Social Security card\n- Children's birth certificates and school records\n- Financial records (bank statements, credit cards)\n- Insurance cards and medical records\n- Protective order copies\n- Lease or mortgage documents\n\nIf you cannot take originals, photograph them with your phone.`,

  finances: `Financial independence is one of the most important steps toward safety.\n\n- Open a bank account in your name only at a different bank\n- Start saving even small amounts — every dollar matters\n- Keep cash in a safe place outside the home\n- Know your credit score (annualcreditreport.com is free)\n- Document all shared assets and debts\n- If you work, keep pay stubs in a safe location\n- Research local assistance programs for housing, food, and childcare`,

  escape: `Your escape plan should be practiced and ready, but only activated when it is safe to do so.\n\n- Identify two ways out of every room in your home\n- Pack a go-bag and keep it hidden or with someone you trust\n- Memorize key phone numbers (hotline: 1-800-799-7233)\n- Plan where you will go — shelter, friend, family\n- If you have children, include their essentials\n- Tell one trusted person about your plan\n- Practice the route at different times of day\n- Have a code word with your trusted person that means "call 911"\n\nYour safety is the priority. Not belongings, not appearances.`,

  support: `You do not have to do this alone.\n\n- National DV Hotline: 1-800-799-7233 (24/7, confidential)\n- Crisis Text Line: Text HOME to 741741\n- Local shelters offer free advocacy, legal help, and housing\n- Domestic violence advocates can help you navigate the system\n- Support groups connect you with others who understand\n- Therapy and counseling are often available free through shelters\n\nEvery person who reaches out is taking a brave step. There is no wrong time to ask for help.`,

  default: `You are taking a courageous step by planning ahead. Here are some things to consider:\n\n- Trust your instincts about your safety\n- Identify people you trust who can help\n- Know the National DV Hotline: 1-800-799-7233\n- Document what is happening when it is safe to do so\n- Remember: the abuse is not your fault\n\nHAVEN is here for you, for as long as you need.`,
};

export async function POST(request: Request) {
  try {
    const { step, data } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content:
                  'You are a compassionate domestic violence safety advocate. Help create a personalized safety plan. Be warm, clear, and empowering. Never judgmental. Use simple language.',
              },
              {
                role: 'user',
                content: `Help me with this step of my safety plan: "${step}". ${data ? `Additional context: ${JSON.stringify(data)}` : ''} Provide clear, actionable guidance.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        });

        const result = await response.json();
        const advice = result.choices?.[0]?.message?.content;

        if (advice) {
          return NextResponse.json({ advice, source: 'ai' });
        }
      } catch {
        // Fall through to demo data
      }
    }

    const advice = DEMO_GUIDANCE[step] || DEMO_GUIDANCE.default;
    return NextResponse.json({ advice, source: 'demo' });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. If you are in danger, call 911.' },
      { status: 500 }
    );
  }
}
