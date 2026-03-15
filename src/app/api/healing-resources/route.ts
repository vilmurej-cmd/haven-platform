import { NextResponse } from 'next/server';

interface HealingResource {
  title: string;
  description: string;
  guidance: string[];
  resources: string[];
}

const RESOURCES: Record<string, HealingResource> = {
  ptsd: {
    title: 'Healing from Trauma & PTSD',
    description:
      'What you are experiencing is your body and mind trying to protect you. It is a normal response to an abnormal situation. Healing is possible.',
    guidance: [
      'Flashbacks and nightmares are common. They do not mean you are broken — they mean your brain is processing what happened.',
      'Grounding techniques can help during flashbacks: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.',
      'EMDR (Eye Movement Desensitization and Reprocessing) is highly effective for trauma. Many therapists offer it.',
      'Trauma-focused Cognitive Behavioral Therapy (TF-CBT) is evidence-based and widely available.',
      'Your body holds trauma too. Gentle movement — walking, yoga, swimming — can help release it.',
      'Healing is not linear. Bad days do not erase progress.',
      'You survived. That took incredible strength. Give yourself credit for that.',
    ],
    resources: [
      'SAMHSA National Helpline: 1-800-662-4357 (free referrals)',
      'Psychology Today therapist finder: psychologytoday.com (filter by "trauma")',
      'National DV Hotline: 1-800-799-7233 (can connect you with local counseling)',
      'Crisis Text Line: Text HOME to 741741',
      'PTSD Foundation: ptsdusa.org',
    ],
  },
  anxiety: {
    title: 'Managing Anxiety & Hypervigilance',
    description:
      'After living in an unsafe environment, it is normal for your nervous system to stay on high alert. Your body learned to watch for danger. Now it is time to teach it that you are safe.',
    guidance: [
      'Hypervigilance (constantly scanning for threats) is a survival response. It kept you alive. Thank it, then gently remind yourself: "I am safe now."',
      'Deep breathing activates your parasympathetic nervous system. Try box breathing: inhale 4 seconds, hold 4, exhale 4, hold 4.',
      'Progressive muscle relaxation: Tense each muscle group for 5 seconds, then release. Start with your toes and work up.',
      'Limit caffeine and sugar — they can amplify anxiety symptoms.',
      'Create a "safety anchor" — a physical object (a smooth stone, a bracelet) that you can touch to remind yourself you are safe.',
      'Sleep hygiene matters: consistent bedtime, dark room, no screens before bed. Sleep is when your brain heals.',
      'If anxiety is severe, medication can help. There is no shame in that. Talk to a doctor.',
    ],
    resources: [
      'NAMI Helpline: 1-800-950-6264',
      'Anxiety & Depression Association: adaa.org',
      'Calm Harm app (free, for managing distress)',
      'Insight Timer app (free guided meditations)',
      'National DV Hotline: 1-800-799-7233',
    ],
  },
  children: {
    title: 'Helping Children Heal',
    description:
      'Children are resilient, but they need support to process what they have witnessed or experienced. With the right help, they can heal completely.',
    guidance: [
      'Children heal best when they feel safe and loved. Consistency and routine are medicine.',
      'Let them talk about it in their own time. Do not force conversations, but always be available.',
      'Play therapy is highly effective for younger children. They process through play what they cannot express in words.',
      'Normalize their feelings: "It makes sense that you feel angry/sad/scared. I feel that way too sometimes."',
      'Watch for regression (younger behaviors) — this is temporary and normal.',
      'Art, music, and movement help children process trauma when words are not enough.',
      'Model healthy coping: let them see you take deep breaths, ask for help, express feelings safely.',
      'Children need to hear, repeatedly: "This was not your fault. You are safe now. I love you."',
    ],
    resources: [
      'Childhelp: 1-800-422-4453',
      'SAMHSA child/adolescent treatment referral: 1-800-662-4357',
      'National Child Traumatic Stress Network: nctsn.org',
      'Your local shelter children\'s program (most are free)',
      'School counselors can provide referrals',
    ],
  },
  'support-groups': {
    title: 'Support Groups & Community',
    description:
      'There is something powerful about being in a room (or on a call) with people who understand exactly what you have been through. You do not have to explain yourself. They already know.',
    guidance: [
      'Support groups are not therapy — they are community. Both are valuable.',
      'Most shelters run free support groups, even if you are not a resident.',
      'Online support groups are available if in-person feels too difficult right now.',
      'It is okay to just listen at first. You do not have to share until you are ready.',
      'If the first group does not feel right, try another. Finding your people takes time.',
      'Peer advocates — survivors who have been through it — can be incredibly helpful.',
      'Faith-based support is available if that resonates with you. Many religious organizations have DV ministries.',
      'Remember: sharing your story is a choice, not an obligation. Your boundaries matter.',
    ],
    resources: [
      'National DV Hotline: 1-800-799-7233 (can connect you with local groups)',
      'DV support groups on Facebook (search "domestic violence survivors" — private groups available)',
      'SMART Recovery: smartrecovery.org (if substance use is also a concern)',
      'After Silence: aftersilence.org (online support community)',
      'Your local shelter or advocacy center',
    ],
  },
};

export async function POST(request: Request) {
  try {
    const { need } = await request.json();

    const key = need || 'ptsd';
    const resource = RESOURCES[key] || RESOURCES['ptsd'];

    return NextResponse.json({
      ...resource,
      note: 'Healing takes time. There is no rush. You have already survived the hardest part. If you are in crisis, call 988 (Suicide & Crisis Lifeline) or text HOME to 741741.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. If you are in crisis, call 988.' },
      { status: 500 }
    );
  }
}
