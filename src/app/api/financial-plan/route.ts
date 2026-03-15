import { NextResponse } from 'next/server';

const DEMO_GUIDANCE = `**Building Financial Independence**

Financial abuse is one of the most common — and least recognized — forms of domestic violence. Taking control of your finances is one of the most powerful steps toward freedom.

**Immediate Steps:**
- Open a bank account in your name only, at a different bank than your partner uses
- Start a P.O. Box for mail (bank statements, legal documents)
- Request a free credit report at annualcreditreport.com — check for accounts you did not open
- Begin saving any amount you can, even small amounts
- Keep cash in a safe location outside your home

**Know Your Financial Picture:**
- List all income sources (yours and shared)
- List all debts and monthly expenses
- Photograph or copy financial documents (tax returns, bank statements, investment accounts, property deeds)
- Know the balances of all shared accounts
- Document any assets (cars, property, valuables)

**Building Independence:**
- Contact your local workforce center for job training and placement help
- Many shelters offer financial literacy classes
- Apply for emergency assistance: TANF, SNAP, WIC, Medicaid
- Legal Aid can help with financial matters in divorce (lawhelp.org)
- Some banks offer "safe account" programs for DV survivors

**Protecting Yourself:**
- Change passwords on all financial accounts (use a device they cannot access)
- Set up account alerts for withdrawals and purchases
- If you have a joint credit card, document the balance before leaving
- Consider a credit freeze if you suspect identity theft
- Keep financial planning private — do not discuss it with your abuser

**Free Resources:**
- National DV Hotline Financial Advocacy: 1-800-799-7233
- Benefits.gov — check what assistance you qualify for
- 211.org — local financial assistance programs
- IRS Volunteer Income Tax Assistance (VITA) — free tax help

**Remember:** Financial independence takes time. Every small step counts. You do not have to do it all at once.`;

export async function POST(request: Request) {
  try {
    const { situation } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && situation) {
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
                  'You are a compassionate financial advocate for domestic violence survivors. Help them build financial independence. Be practical, warm, and empowering. Never judgmental. Understand that financial abuse is a real form of domestic violence. Always include free resources and the National DV Hotline (1-800-799-7233).',
              },
              {
                role: 'user',
                content: `Help me with financial planning for my situation: ${situation}. Provide practical, actionable steps I can take to build financial independence.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        });

        const result = await response.json();
        const content = result.choices?.[0]?.message?.content;

        if (content) {
          return NextResponse.json({ guidance: content, source: 'ai' });
        }
      } catch {
        // Fall through to demo data
      }
    }

    return NextResponse.json({ guidance: DEMO_GUIDANCE, source: 'demo' });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. If you need help, call 1-800-799-7233.' },
      { status: 500 }
    );
  }
}
