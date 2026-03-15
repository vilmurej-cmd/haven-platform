'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Baby,
  Users,
  AlertTriangle,
  Phone,
  MessageSquare,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';

/* ────────────────────────────────────────────────────────
   Age-appropriate guide data
   ──────────────────────────────────────────────────────── */

interface AgeGuide {
  id: string;
  ageRange: string;
  label: string;
  whatTheyUnderstand: string[];
  whatToSay: string[];
  whatNotToSay: string[];
}

const AGE_GUIDES: AgeGuide[] = [
  {
    id: 'toddlers',
    ageRange: '0-5 years',
    label: 'Toddlers & Young Children',
    whatTheyUnderstand: [
      'They feel tension, fear, and sadness even if they cannot name it',
      'They may not understand what is happening, but they know something is wrong',
      'They look to you for cues about how to feel -- if you are calm, they will feel safer',
    ],
    whatToSay: [
      '"We are going on a trip to stay safe. I will be with you the whole time."',
      '"Sometimes grownups have big problems, but it is never your fault."',
      '"I love you and I am going to keep you safe."',
      '"You did nothing wrong. This is not because of anything you did."',
    ],
    whatNotToSay: [
      'Do not say negative things about their other parent -- young children internalize this as being about themselves',
      'Do not promise things you cannot guarantee, like "We will be back home soon"',
      'Do not burden them with details they are too young to process',
    ],
  },
  {
    id: 'school',
    ageRange: '6-12 years',
    label: 'School-Age Children',
    whatTheyUnderstand: [
      'They understand more than you think and may already be aware of the abuse',
      'They may feel responsible for protecting you or their siblings',
      'They may be experiencing their own fear, anger, confusion, or guilt',
      'They may be keeping secrets to protect you or themselves',
    ],
    whatToSay: [
      '"What is happening at home is not okay, and it is not your fault."',
      '"I am making a plan to keep our family safe. I need your help with some things."',
      '"You are allowed to feel scared, angry, or sad. All of those feelings are okay."',
      '"If anything happens, here is what I need you to do..." (give clear, simple instructions)',
      '"There are adults who can help us. We are not alone."',
    ],
    whatNotToSay: [
      'Do not ask them to spy on or report about the other parent',
      'Do not make them your confidant or emotional support -- they are still children',
      'Do not say "Everything is fine" when they can see it is not -- this teaches them not to trust their own perceptions',
    ],
  },
  {
    id: 'teens',
    ageRange: '13-18 years',
    label: 'Teenagers',
    whatTheyUnderstand: [
      'They likely understand the situation clearly and may have opinions about what should happen',
      'They may feel angry at the abuser, at you for staying, or at the world',
      'They may try to intervene physically, which puts them in danger',
      'They are forming their own ideas about relationships -- what they see now will shape what they accept later',
    ],
    whatToSay: [
      '"I want to be honest with you about what is happening. You deserve the truth."',
      '"I am working on a plan to keep us safe, and I would like your input on some parts."',
      '"What you are feeling is completely valid. This situation is not fair to you."',
      '"It is never okay for someone to treat another person this way -- in any relationship."',
      '"I do not want you to try to protect me. Your safety matters most to me."',
    ],
    whatNotToSay: [
      'Do not dismiss their anger or tell them to "just deal with it"',
      'Do not expect them to be the adult or take on your emotional burden',
      'Do not prevent them from having their own feelings about the situation, even if those feelings are directed at you',
    ],
  },
];

/* ────────────────────────────────────────────────────────
   Behavioral signs
   ──────────────────────────────────────────────────────── */

const BEHAVIORAL_SIGNS = [
  {
    ageGroup: 'Young Children',
    signs: [
      'Regression (bedwetting, thumb-sucking, clinging)',
      'Frequent stomachaches or headaches',
      'Difficulty sleeping or nightmares',
      'Excessive crying or fearfulness',
      'Aggression toward other children or animals',
      'Withdrawal or refusal to speak',
    ],
  },
  {
    ageGroup: 'School-Age Children',
    signs: [
      'Declining grades or difficulty concentrating',
      'Acting out at school or becoming withdrawn',
      'Anxiety about being away from the non-abusive parent',
      'Taking on a caretaker role with siblings',
      'Blaming themselves for the violence',
      'Physical complaints with no medical cause',
    ],
  },
  {
    ageGroup: 'Teenagers',
    signs: [
      'Substance use or risky behavior',
      'Running away or staying away from home',
      'Depression, anxiety, or self-harm',
      'Difficulty with trust or healthy relationships',
      'Normalizing violence in their own relationships',
      'Extreme anger or emotional shutdown',
      'Dropping out of activities they used to enjoy',
    ],
  },
];

/* ────────────────────────────────────────────────────────
   Teen dating violence warning signs
   ──────────────────────────────────────────────────────── */

const TEEN_DATING_SIGNS = [
  'Their partner checks their phone constantly or demands passwords',
  'Their partner tells them what to wear or who they can be friends with',
  'They seem afraid of making their partner angry',
  'They have unexplained injuries or make excuses for bruises',
  'They have become isolated from friends and family',
  'Their partner puts them down, calls them names, or humiliates them in front of others',
  'They are pressured into sexual activity',
  'Their partner threatens to hurt themselves if the teen tries to break up',
  'Their mood or behavior changes dramatically after getting into the relationship',
  'They apologize for their partner\'s behavior or say "It was my fault"',
];

/* ────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────── */

export default function ChildrenResourcesPage() {
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  function toggleGuide(id: string) {
    setExpandedGuide((prev) => (prev === id ? null : id));
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <Link
        href="/plan"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to safety plan
      </Link>

      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10 animate-safe-fade-in">
          <div className="w-14 h-14 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
            <Baby className="w-7 h-7 text-haven-purple" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Children &amp; Teen Resources
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            Your children are affected by what is happening, even when you try to shield them.
            Understanding how to protect them, talk to them, and support them is one of the
            most important things you can do.
          </p>
        </div>

        {/* ── Protecting Your Children ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Protecting Your Children
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border mb-5">
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              Children who witness domestic violence experience trauma, even if they are never
              physically touched. Research shows that witnessing abuse has the same psychological
              impact on children as being directly abused. But here is the good news: your
              relationship with your children is the single most protective factor in their
              recovery.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              You are already doing something brave by seeking information. That tells your
              children -- whether they know it or not -- that they matter.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-haven-green/10 border border-haven-green/30">
            <p className="text-text-primary text-sm font-medium leading-relaxed">
              The most important thing you can tell your children, no matter their age:
            </p>
            <p className="font-serif text-lg text-text-primary leading-relaxed mt-2 italic">
              &ldquo;This is not your fault. Nothing you did caused this. I love you and I am
              going to protect you.&rdquo;
            </p>
          </div>
        </section>

        {/* ── How to Talk to Your Children ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              How to Talk to Your Children
            </h2>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            What you say and how you say it depends on your child&apos;s age. Select an age
            group for specific guidance.
          </p>

          <div className="space-y-3">
            {AGE_GUIDES.map((guide) => {
              const expanded = expandedGuide === guide.id;
              return (
                <div
                  key={guide.id}
                  className="rounded-2xl bg-white border border-border overflow-hidden"
                >
                  <button
                    onClick={() => toggleGuide(guide.id)}
                    className="w-full flex items-center justify-between p-5 text-left min-h-[56px]"
                  >
                    <div>
                      <span className="block font-serif text-lg font-semibold text-text-primary">
                        {guide.label}
                      </span>
                      <span className="block text-text-muted text-sm">{guide.ageRange}</span>
                    </div>
                    {expanded ? (
                      <ChevronUp className="w-5 h-5 text-text-muted flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-muted flex-shrink-0" />
                    )}
                  </button>

                  {expanded && (
                    <div className="px-5 pb-5 space-y-4 animate-safe-fade-in">
                      <div>
                        <h4 className="font-semibold text-text-primary text-sm mb-2">
                          What They Understand
                        </h4>
                        <ul className="space-y-2">
                          {guide.whatTheyUnderstand.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                            >
                              <span className="text-haven-purple font-bold mt-0.5 flex-shrink-0">
                                -
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-haven-green/10 border border-haven-green/30">
                        <h4 className="font-semibold text-text-primary text-sm mb-2">
                          What to Say
                        </h4>
                        <ul className="space-y-2">
                          {guide.whatToSay.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                            >
                              <span className="text-haven-green font-bold mt-0.5 flex-shrink-0">
                                -
                              </span>
                              <span className="italic">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-haven-emergency/5 border border-haven-emergency/20">
                        <h4 className="font-semibold text-text-primary text-sm mb-2">
                          What Not to Say
                        </h4>
                        <ul className="space-y-2">
                          {guide.whatNotToSay.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                            >
                              <span className="text-haven-emergency font-bold mt-0.5 flex-shrink-0">
                                -
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Impact on Children ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Behavioral Signs to Watch For
            </h2>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            Children may not tell you directly that they are struggling. Instead, their behavior
            may change. Here are signs to watch for by age group.
          </p>

          <div className="space-y-5">
            {BEHAVIORAL_SIGNS.map((group) => (
              <div
                key={group.ageGroup}
                className="p-5 rounded-2xl bg-white border border-border"
              >
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                  {group.ageGroup}
                </h3>
                <ul className="space-y-2">
                  {group.signs.map((sign) => (
                    <li
                      key={sign}
                      className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                    >
                      <span className="text-haven-gold font-bold mt-0.5 flex-shrink-0">-</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-haven-purple-soft/50 border border-haven-purple/10">
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong className="text-text-primary">If you notice these signs</strong>, it does
              not mean you have failed as a parent. It means your child is responding to an
              abnormal situation. With safety, stability, and support, children can and do
              recover. Your love and protection are the foundation of that recovery.
            </p>
          </div>
        </section>

        {/* ── Teen Dating Violence ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-emergency/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-haven-emergency" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Teen Dating Violence
            </h2>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            One in three teens will experience some form of abuse in a dating relationship.
            Teens who grow up in homes with domestic violence are at higher risk. Watch for
            these warning signs in your teenager&apos;s relationships.
          </p>

          <div className="p-5 rounded-2xl bg-white border border-border mb-5">
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
              Warning Signs
            </h3>
            <ul className="space-y-2">
              {TEEN_DATING_SIGNS.map((sign) => (
                <li
                  key={sign}
                  className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                >
                  <span className="text-haven-emergency font-bold mt-0.5 flex-shrink-0">-</span>
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-haven-green/10 border border-haven-green/30">
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong className="text-text-primary">If you suspect your teen is in an abusive
              relationship</strong>, approach them with empathy, not judgment. Say: &ldquo;I
              have noticed some things that worry me, and I want you to know that I am here for
              you no matter what.&rdquo; Do not force them to leave the relationship -- this
              often pushes them closer to the abuser. Instead, help them recognize the behavior
              and know that they have options.
            </p>
          </div>
        </section>

        {/* ── Safety Planning with Children ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Safety Planning with Children
            </h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                Code Words
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Teach your children a code word that means &ldquo;go to your safe place&rdquo;
                or &ldquo;we need to leave now.&rdquo; Practice it regularly so it feels natural.
                For young children, make it a game. For older children, explain that it is a
                safety tool. Choose something simple and memorable -- like &ldquo;pineapple&rdquo;
                or &ldquo;thunderstorm.&rdquo;
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                Trusted Adults
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Help your children identify 2-3 trusted adults they can go to for help -- a
                teacher, a neighbor, a family member, a school counselor. Make sure your children
                know their phone numbers or how to reach them. Tell these trusted adults about
                your situation so they are prepared to act quickly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                What to Do If Police Come
              </h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Teach children to go to a specific room and stay there
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Tell them it is okay to talk to police officers -- they are there to help
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Reassure them that calling for help is the right thing to do
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Practice staying calm and keeping younger siblings calm
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Older children should know your full address and how to call 911
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                Safe Places in Your Home
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Identify a room with a lock where children can go if violence starts. Avoid
                rooms with weapons or hard surfaces. Practice having children go to the safe
                room on your code word. If possible, keep a phone in that room. Teach children
                never to get between adults who are fighting.
              </p>
            </div>
          </div>
        </section>

        {/* ── Resources ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Resources
            </h2>
          </div>

          <div className="space-y-3">
            <a
              href="tel:18004224453"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border hover:border-haven-purple/20 transition-all min-h-[56px]"
            >
              <Phone className="w-6 h-6 text-haven-purple flex-shrink-0" />
              <div>
                <span className="block font-serif text-base font-semibold text-text-primary">
                  Childhelp National Hotline
                </span>
                <span className="block text-text-secondary text-sm">
                  1-800-422-4453 (24/7, free, confidential)
                </span>
                <span className="block text-text-muted text-xs mt-0.5">
                  For children and adults concerned about a child
                </span>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border min-h-[56px]">
              <MessageSquare className="w-6 h-6 text-haven-purple flex-shrink-0" />
              <div>
                <span className="block font-serif text-base font-semibold text-text-primary">
                  Crisis Text Line
                </span>
                <span className="block text-text-secondary text-sm">
                  Text HOME to 741741
                </span>
                <span className="block text-text-muted text-xs mt-0.5">
                  Free, 24/7 crisis support via text message
                </span>
              </div>
            </div>

            <a
              href="tel:18007997233"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border hover:border-haven-purple/20 transition-all min-h-[56px]"
            >
              <Phone className="w-6 h-6 text-haven-purple flex-shrink-0" />
              <div>
                <span className="block font-serif text-base font-semibold text-text-primary">
                  National DV Hotline
                </span>
                <span className="block text-text-secondary text-sm">
                  1-800-799-7233 (24/7, free, confidential)
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* ── For Teens ── */}
        <section className="mb-8">
          <div className="p-6 rounded-2xl bg-haven-purple-soft border border-haven-purple/20">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-haven-purple flex-shrink-0" />
              <h2 className="font-serif text-2xl font-semibold text-text-primary">For Teens</h2>
            </div>

            <p className="text-text-primary text-base leading-relaxed font-medium mb-4">
              If someone is hurting you or someone you love, you are not alone and it is not
              your fault.
            </p>

            <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
              <p>
                What is happening in your home is not normal, and you do not have to accept it.
                You did not cause it, and you cannot fix it. But you can get help.
              </p>
              <p>
                You deserve to feel safe. You deserve relationships where no one controls,
                threatens, or hurts you. That is true in your family and in your own
                relationships.
              </p>
              <p>
                Talk to an adult you trust -- a teacher, school counselor, coach, friend&apos;s
                parent, or family member. If you do not feel comfortable talking to someone in
                person, text HOME to 741741 to reach a crisis counselor for free, 24/7. No one
                will judge you.
              </p>
              <p className="font-medium text-text-primary">
                You are brave for reading this. That takes strength.
              </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:18007997233"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors min-h-[48px]"
              >
                <Phone className="w-4 h-4" />
                Call for Help
              </a>
              <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-haven-purple/20 text-haven-purple text-sm font-medium min-h-[48px]">
                <MessageSquare className="w-4 h-4" />
                Text HOME to 741741
              </div>
            </div>
          </div>
        </section>

        {/* Bottom */}
        <div className="text-center py-8 border-t border-border-light">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-haven-purple" />
          </div>
          <p className="font-serif text-lg text-text-primary leading-relaxed italic max-w-md mx-auto">
            Protecting your children starts with protecting yourself. By seeking safety, you are
            giving them the greatest gift a parent can give.
          </p>
        </div>
      </div>
    </div>
  );
}
