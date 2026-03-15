import { NextResponse } from 'next/server';

interface AgeGuidance {
  ageGroup: string;
  title: string;
  forChild: string[];
  forParent: string[];
  signs: string[];
  resources: string[];
}

const GUIDANCE: Record<string, AgeGuidance> = {
  'child': {
    ageGroup: 'Ages 5-10',
    title: 'For Young Children',
    forChild: [
      'What is happening at home is not your fault.',
      'It is never okay for someone to hurt someone else.',
      'You are allowed to feel scared, sad, or angry. All of your feelings are okay.',
      'There are safe grown-ups who can help you — a teacher, a school counselor, a neighbor.',
      'If you feel unsafe, you can call 911. That is what it is there for.',
      'You are brave. Asking for help is the bravest thing you can do.',
    ],
    forParent: [
      'Use simple, honest language: "Sometimes grown-ups make bad choices. That is not your fault."',
      'Do not ask children to keep secrets about the abuse.',
      'Maintain routines as much as possible — bedtime, meals, school.',
      'Let them express feelings through drawing, play, or storytelling.',
      'Reassure them repeatedly: "I love you. I will keep you safe."',
      'Avoid speaking negatively about the other parent in front of the child.',
      'Consider play therapy — many shelters offer it free.',
    ],
    signs: [
      'Regression (bed-wetting, thumb-sucking, baby talk)',
      'Clinginess or separation anxiety',
      'Sleep disturbances or nightmares',
      'Aggression or acting out',
      'Withdrawal or excessive quietness',
      'Stomachaches or headaches with no medical cause',
    ],
    resources: [
      'Childhelp National Child Abuse Hotline: 1-800-422-4453',
      'Your school counselor',
      'Local shelter children\'s programs',
    ],
  },
  'preteen': {
    ageGroup: 'Ages 11-13',
    title: 'For Preteens',
    forChild: [
      'What is happening at home is not your fault. It never was.',
      'You did not cause this, and you cannot fix it. That is not your job.',
      'Your feelings — anger, sadness, confusion, shame — are all normal and valid.',
      'You deserve to feel safe. Everyone does.',
      'There are people who specialize in helping families like yours.',
      'It is okay to love someone and also know that their behavior is wrong.',
      'You can talk to a trusted adult — a teacher, counselor, coach, or relative.',
      'If you or someone in your home is in danger, call 911.',
    ],
    forParent: [
      'Preteens understand more than you think. Be honest in age-appropriate ways.',
      'Validate their feelings: "It makes sense that you feel that way."',
      'Do not put them in the middle or ask them to choose sides.',
      'Watch for changes in grades, friendships, or behavior.',
      'They may feel responsible for protecting you — remind them that is not their job.',
      'Consider individual counseling for them.',
      'Maintain boundaries around technology — abusers sometimes monitor through children\'s devices.',
    ],
    signs: [
      'Decline in school performance',
      'Withdrawal from friends or activities',
      'Anger outbursts or defiance',
      'Anxiety or depression symptoms',
      'Taking on a caretaker role (parentification)',
      'Self-harm or talk of self-harm',
    ],
    resources: [
      'Crisis Text Line: Text HOME to 741741',
      'Childhelp: 1-800-422-4453',
      'School counselor',
      'Teen Line: 1-800-852-8336',
    ],
  },
  'teen': {
    ageGroup: 'Ages 14-17',
    title: 'For Teens',
    forChild: [
      'What is happening is not okay, and it is not your fault.',
      'You are not responsible for your parent\'s behavior or your other parent\'s safety.',
      'Your anger is valid. Your sadness is valid. Your confusion is valid.',
      'Healthy relationships do not involve control, fear, or violence.',
      'You deserve a future free from this. And you can have it.',
      'If you are in a relationship that feels controlling or scary, that counts too.',
      'There are people who understand exactly what you are going through.',
      'You can call or text for help confidentially — no one has to know.',
    ],
    forParent: [
      'Teens may mirror abusive behavior or become overly protective of you. Both are trauma responses.',
      'Be honest: "This is domestic violence. It is not normal, and we deserve better."',
      'Watch for dating violence in their own relationships — children of DV are at higher risk.',
      'Do not be afraid to discuss healthy relationship patterns openly.',
      'Respect their need for privacy and processing time.',
      'Help them build a safety plan of their own.',
      'If they are angry at you for staying — that is normal. Do not take it personally.',
      'Family therapy (when safe) can help rebuild trust.',
    ],
    signs: [
      'Substance use',
      'Risky or self-destructive behavior',
      'Controlling behavior in their own relationships',
      'Depression, anxiety, or PTSD symptoms',
      'Running away or truancy',
      'Extreme protectiveness of siblings or parent',
      'Normalizing violence or controlling behavior',
    ],
    resources: [
      'Teen Dating Violence Hotline: 1-866-331-9474',
      'Crisis Text Line: Text HOME to 741741',
      'Love Is Respect: loveisrespect.org',
      'Teen Line: 1-800-852-8336 (6pm-10pm PT)',
      'National Suicide Prevention Lifeline: 988',
    ],
  },
};

export async function POST(request: Request) {
  try {
    const { ageGroup, situation } = await request.json();

    const key = ageGroup || 'child';
    const guidance = GUIDANCE[key] || GUIDANCE['child'];

    return NextResponse.json({
      ...guidance,
      situation: situation || null,
      note: 'Every child and situation is different. If a child is in immediate danger, call 911. For ongoing support, contact the Childhelp National Child Abuse Hotline at 1-800-422-4453.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. If a child is in danger, call 911.' },
      { status: 500 }
    );
  }
}
