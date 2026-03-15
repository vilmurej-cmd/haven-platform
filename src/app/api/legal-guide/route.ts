import { NextResponse } from 'next/server';

const DEMO_GUIDANCE: Record<string, { title: string; content: string }> = {
  'protective-orders': {
    title: 'Protective Orders (Restraining Orders)',
    content: `A protective order (sometimes called a restraining order) is a court order that legally requires your abuser to stay away from you.\n\n**How to get one:**\n1. Go to your local courthouse — most have a domestic violence clerk or advocate\n2. Fill out a petition describing the abuse (you can ask for help with this)\n3. A judge will review it, often the same day\n4. A temporary order can be issued immediately\n5. A hearing will be scheduled (usually within 2 weeks) for a permanent order\n\n**What it can include:**\n- No contact (calls, texts, social media, in person)\n- Stay-away distance (home, work, school)\n- Temporary custody of children\n- Exclusive use of shared home\n- Surrender of firearms\n\n**Important:**\n- Filing is FREE in every state\n- You do not need a lawyer (but one can help)\n- Violation of a protective order is a crime\n- Keep a copy with you at all times\n- Give copies to your children's school, your workplace, neighbors\n\nCall the National DV Hotline (1-800-799-7233) for help finding your local courthouse and advocates.`,
  },
  custody: {
    title: 'Custody & Children',
    content: `Leaving an abusive situation with children is one of the most difficult decisions a parent faces. Here is what you should know:\n\n**Your rights:**\n- You have the right to take your children to safety\n- Leaving with your children is NOT kidnapping if there is no custody order\n- Courts take domestic violence seriously in custody decisions\n- Many states have laws that consider DV in custody determinations\n\n**Steps to take:**\n1. Document the abuse — dates, incidents, injuries, witnesses\n2. Get a protective order that includes custody provisions\n3. File for custody as soon as possible\n4. Contact a family law attorney (many offer free DV consultations)\n5. Contact Legal Aid in your area for free legal help\n\n**For the children:**\n- Tell them the truth in age-appropriate language: "We are going somewhere safe"\n- Reassure them it is not their fault\n- Keep routines as normal as possible\n- Consider counseling — many shelters offer it free\n\n**Resources:**\n- National DV Hotline: 1-800-799-7233\n- Childhelp National Child Abuse Hotline: 1-800-422-4453\n- Legal Aid: lawhelp.org`,
  },
  immigration: {
    title: 'Immigration & Abuse',
    content: `If you are an immigrant experiencing abuse, you have rights and protections regardless of your immigration status.\n\n**Key protections:**\n\n**VAWA (Violence Against Women Act):**\n- Allows abuse survivors to self-petition for immigration status\n- You do NOT need your abuser's cooperation\n- Available to spouses, children, and parents of abusive U.S. citizens or permanent residents\n- Your abuser will NOT be notified\n\n**U-Visa:**\n- For victims of certain crimes, including domestic violence\n- Available regardless of immigration status\n- Provides work authorization and a path to permanent residency\n- Requires a law enforcement certification\n\n**T-Visa:**\n- For victims of human trafficking\n\n**Important:**\n- Police and courts cannot ask about your immigration status when you report abuse\n- Shelters serve everyone regardless of immigration status\n- Your abuser cannot have you deported by calling immigration\n- Free legal help is available\n\n**Resources:**\n- National Immigrant Women's Advocacy Project (NIWAP)\n- Legal Aid in your area: lawhelp.org\n- National DV Hotline: 1-800-799-7233 (interpreters available in 200+ languages)`,
  },
};

export async function POST(request: Request) {
  try {
    const { state, topic } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && state) {
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
                  'You are a compassionate legal information resource for domestic violence survivors. Provide helpful general legal information. Always clarify you are not providing legal advice and recommend consulting an attorney. Be warm, clear, and empowering. Use simple language.',
              },
              {
                role: 'user',
                content: `Provide legal guidance about "${topic || 'protective orders'}" for someone in ${state}. Include state-specific information if possible. Always include the National DV Hotline number (1-800-799-7233) and recommend Legal Aid (lawhelp.org).`,
              },
            ],
            temperature: 0.5,
            max_tokens: 1200,
          }),
        });

        const result = await response.json();
        const content = result.choices?.[0]?.message?.content;

        if (content) {
          return NextResponse.json({
            title: `${topic || 'Legal Resources'} — ${state}`,
            content,
            source: 'ai',
            disclaimer:
              'This is general legal information, not legal advice. Laws vary by state and situation. Please consult with a qualified attorney or legal aid organization for advice specific to your situation.',
          });
        }
      } catch {
        // Fall through to demo data
      }
    }

    const key = topic || 'protective-orders';
    const guidance = DEMO_GUIDANCE[key] || DEMO_GUIDANCE['protective-orders'];

    return NextResponse.json({
      ...guidance,
      source: 'demo',
      disclaimer:
        'This is general legal information, not legal advice. Laws vary by state and situation. Please consult with a qualified attorney or legal aid organization for advice specific to your situation.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. If you are in danger, call 911.' },
      { status: 500 }
    );
  }
}
