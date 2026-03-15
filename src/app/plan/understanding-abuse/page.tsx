'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  AlertTriangle,
  Eye,
  Ban,
  DollarSign,
  Smartphone,
  Lock,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Shield,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

/* ────────────────────────────────────────────────────────
   Abuse type data
   ──────────────────────────────────────────────────────── */

interface AbuseType {
  id: string;
  label: string;
  icon: typeof Heart;
  color: string;
  definition: string;
  warningSigns: string[];
  examples: string[];
}

const ABUSE_TYPES: AbuseType[] = [
  {
    id: 'physical',
    label: 'Physical Abuse',
    icon: AlertTriangle,
    color: 'text-haven-emergency',
    definition:
      'Physical abuse is any intentional use of physical force to cause harm, injury, or intimidation. It does not have to leave a mark to be abuse.',
    warningSigns: [
      'Hitting, slapping, punching, kicking, or choking',
      'Throwing objects at you or near you',
      'Grabbing, pushing, or restraining you',
      'Pulling your hair or dragging you',
      'Using weapons or threatening to use them',
      'Driving recklessly to scare you',
      'Blocking you from leaving a room',
    ],
    examples: [
      'Slamming you against a wall during an argument',
      'Squeezing your arm hard enough to leave bruises',
      'Throwing a plate at the wall near your head',
      'Holding you down so you cannot move',
      'Punching holes in walls to intimidate you',
    ],
  },
  {
    id: 'emotional',
    label: 'Emotional & Psychological Abuse',
    icon: Eye,
    color: 'text-haven-purple',
    definition:
      'Emotional abuse is a pattern of behavior that attacks your self-worth, mental health, and sense of reality. It can be harder to recognize than physical abuse, but it is just as damaging.',
    warningSigns: [
      'Constant criticism, name-calling, or belittling',
      'Telling you that you are crazy, stupid, or worthless',
      'Gaslighting -- denying things that happened or twisting reality',
      'Blaming you for their abusive behavior',
      'Giving you the silent treatment as punishment',
      'Threatening to hurt themselves if you leave',
      'Humiliating you in front of others',
      'Making you feel like you cannot do anything right',
    ],
    examples: [
      'Saying "No one else would ever love you"',
      'Telling you an argument that happened did not happen',
      'Mocking you when you cry or express feelings',
      'Saying "You made me do this" after hurting you',
      'Telling your children or family that you are a bad parent',
    ],
  },
  {
    id: 'sexual',
    label: 'Sexual Abuse',
    icon: Ban,
    color: 'text-haven-emergency',
    definition:
      'Sexual abuse is any sexual act or behavior that is forced, coerced, or happens without your full and free consent. Being in a relationship or married does not give anyone the right to your body.',
    warningSigns: [
      'Forcing or pressuring you into sexual acts',
      'Ignoring when you say no or withdraw consent',
      'Making you feel guilty for not wanting sex',
      'Treating you as a sexual object',
      'Sabotaging birth control or refusing to use protection',
      'Threatening to share intimate photos',
      'Using sex as a weapon or punishment',
    ],
    examples: [
      'Pressuring you until you give in out of fear',
      'Having sex with you while you are asleep or incapacitated',
      'Threatening consequences if you refuse',
      'Poking holes in condoms or hiding birth control pills',
      'Filming sexual acts without your knowledge or consent',
    ],
  },
  {
    id: 'financial',
    label: 'Financial Abuse',
    icon: DollarSign,
    color: 'text-haven-gold',
    definition:
      'Financial abuse is when your partner controls your access to money and financial resources to maintain power over you. It is one of the most common and least recognized forms of abuse, and one of the biggest barriers to leaving.',
    warningSigns: [
      'Controlling all the money and giving you an "allowance"',
      'Preventing you from working or sabotaging your job',
      'Monitoring every purchase you make',
      'Putting all bills and debts in your name',
      'Hiding assets or financial information from you',
      'Refusing to let you access bank accounts',
      'Taking your paycheck or government benefits',
    ],
    examples: [
      'Demanding receipts for every dollar you spend',
      'Calling your workplace repeatedly to get you fired',
      'Opening credit cards in your name without your knowledge',
      'Refusing to pay bills and blaming you for the debt',
      'Threatening to cut you off financially if you leave',
    ],
  },
  {
    id: 'digital',
    label: 'Digital & Technology Abuse',
    icon: Smartphone,
    color: 'text-haven-blue',
    definition:
      'Digital abuse uses technology to monitor, control, intimidate, or harass. As our lives become more connected, this form of abuse is growing rapidly.',
    warningSigns: [
      'Monitoring your phone, email, or social media',
      'Demanding your passwords',
      'Using GPS or spyware to track your location',
      'Sending threatening or harassing messages',
      'Posting embarrassing photos or information about you online',
      'Controlling who you can follow or be friends with online',
      'Going through your phone or reading your messages without permission',
    ],
    examples: [
      'Installing tracking apps on your phone without consent',
      'Reading your text messages and interrogating you about them',
      'Creating fake social media profiles to monitor you',
      'Threatening to share private photos or videos',
      'Showing up places they should not know you were going',
    ],
  },
  {
    id: 'coercive',
    label: 'Coercive Control',
    icon: Lock,
    color: 'text-text-primary',
    definition:
      'Coercive control is a pattern of behavior that seeks to take away your liberty, freedom, and sense of self. It is the overarching strategy that ties all forms of abuse together -- creating a prison without walls.',
    warningSigns: [
      'Isolating you from family and friends',
      'Controlling where you go, who you see, and what you wear',
      'Making all decisions for you',
      'Creating rules and punishing you for breaking them',
      'Monitoring your daily routine obsessively',
      'Using children or pets as leverage',
      'Making you dependent on them for everything',
      'Alternating between extreme affection and cruelty',
    ],
    examples: [
      'Telling you that you cannot visit your sister anymore',
      'Timing how long you take at the grocery store',
      'Choosing your clothes and criticizing what you pick',
      'Moving you to a new city away from your support system',
      'Saying "If you leave, you will never see the kids again"',
    ],
  },
];

/* ────────────────────────────────────────────────────────
   Self-assessment questions
   ──────────────────────────────────────────────────────── */

const SELF_ASSESSMENT_QUESTIONS = [
  'Does your partner control where you go or who you spend time with?',
  'Are you afraid of your partner?',
  'Does your partner isolate you from family or friends?',
  'Does your partner call you names, put you down, or make you feel worthless?',
  'Does your partner control the money or prevent you from working?',
  'Has your partner ever hit, pushed, choked, or physically hurt you?',
  'Does your partner threaten to hurt you, your children, or your pets?',
  'Does your partner blame you for their anger or abusive behavior?',
  'Do you feel like you are "walking on eggshells" to avoid upsetting them?',
  'Does your partner check your phone, email, or social media without permission?',
  'Has your partner forced or pressured you into sexual acts?',
  'Does your partner deny things that happened or make you question your memory?',
  'Do you feel trapped or like you have no way out?',
];

/* ────────────────────────────────────────────────────────
   Power and Control Wheel sections
   ──────────────────────────────────────────────────────── */

const WHEEL_SECTIONS = [
  {
    title: 'Intimidation',
    description:
      'Making you afraid through looks, actions, or gestures. Smashing things. Destroying your property. Abusing pets. Displaying weapons.',
  },
  {
    title: 'Emotional Abuse',
    description:
      'Putting you down. Making you feel bad about yourself. Calling you names. Making you think you are crazy. Playing mind games. Humiliating you.',
  },
  {
    title: 'Isolation',
    description:
      'Controlling what you do, who you see and talk to, what you read, where you go. Limiting your outside involvement. Using jealousy to justify actions.',
  },
  {
    title: 'Minimizing, Denying, Blaming',
    description:
      'Making light of the abuse and not taking your concerns seriously. Saying the abuse did not happen. Shifting responsibility. Saying you caused it.',
  },
  {
    title: 'Using Children',
    description:
      'Making you feel guilty about the children. Using the children to relay messages. Using visitation to harass you. Threatening to take the children away.',
  },
  {
    title: 'Economic Abuse',
    description:
      'Preventing you from getting or keeping a job. Making you ask for money. Giving you an allowance. Taking your money. Not letting you know about or have access to family income.',
  },
  {
    title: 'Coercion & Threats',
    description:
      'Making or carrying out threats to hurt you. Threatening to leave, to commit suicide, to report you to welfare. Making you drop charges. Making you do illegal things.',
  },
  {
    title: 'Male Privilege',
    description:
      'Treating you like a servant. Making all the big decisions. Acting like the "master of the castle." Being the one to define roles.',
  },
];

/* ────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────── */

export default function UnderstandingAbusePage() {
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [reflections, setReflections] = useState<Record<number, boolean>>({});

  function toggleType(id: string) {
    setExpandedType((prev) => (prev === id ? null : id));
  }

  function toggleReflection(index: number) {
    setReflections((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  const yesCount = Object.values(reflections).filter(Boolean).length;

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
            <Heart className="w-7 h-7 text-haven-purple" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Understanding Abuse
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            Abuse is not always what it looks like in the movies. It can be quiet, invisible, and
            confusing. Understanding what abuse really is can be the first step toward freedom.
          </p>
        </div>

        {/* ── Types of Abuse ── */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
            Types of Abuse
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            Abuse takes many forms. You may experience one type or several at once. All of them are
            real, all of them are serious, and none of them are your fault.
          </p>

          <div className="space-y-3">
            {ABUSE_TYPES.map((type) => {
              const Icon = type.icon;
              const expanded = expandedType === type.id;
              return (
                <div
                  key={type.id}
                  className="rounded-2xl bg-white border border-border overflow-hidden"
                >
                  <button
                    onClick={() => toggleType(type.id)}
                    className="w-full flex items-center justify-between p-5 text-left min-h-[56px]"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${type.color} flex-shrink-0`} />
                      <span className="font-serif text-lg font-semibold text-text-primary">
                        {type.label}
                      </span>
                    </div>
                    {expanded ? (
                      <ChevronUp className="w-5 h-5 text-text-muted flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-muted flex-shrink-0" />
                    )}
                  </button>

                  {expanded && (
                    <div className="px-5 pb-5 space-y-4 animate-safe-fade-in">
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {type.definition}
                      </p>

                      <div>
                        <h4 className="font-semibold text-text-primary text-sm mb-2">
                          Warning Signs
                        </h4>
                        <ul className="space-y-2">
                          {type.warningSigns.map((sign) => (
                            <li
                              key={sign}
                              className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                            >
                              <span className="text-haven-purple font-bold mt-0.5 flex-shrink-0">
                                -
                              </span>
                              {sign}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-text-primary text-sm mb-2">Examples</h4>
                        <ul className="space-y-2">
                          {type.examples.map((example) => (
                            <li
                              key={example}
                              className="flex gap-2 text-text-secondary text-sm leading-relaxed"
                            >
                              <span className="text-haven-gold font-bold mt-0.5 flex-shrink-0">
                                -
                              </span>
                              {example}
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

        {/* ── Am I Being Abused? ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Am I Being Abused?
            </h2>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            If you are asking yourself this question, that alone is worth paying attention to.
            These reflective questions are not a test and there is no score. They are meant to
            help you see your situation more clearly. Answer honestly -- only you will see this.
          </p>

          <div className="p-4 rounded-xl bg-haven-purple-soft/50 border border-haven-purple/10 mb-5">
            <p className="text-text-muted text-xs text-center">
              Your answers are not saved anywhere. They exist only while this page is open.
            </p>
          </div>

          <button
            onClick={() => setShowAssessment(!showAssessment)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-haven-purple text-white text-base font-medium hover:bg-haven-purple/90 transition-colors mb-4 min-h-[56px]"
          >
            <HelpCircle className="w-5 h-5" />
            {showAssessment ? 'Hide Questions' : 'Start Reflection'}
          </button>

          {showAssessment && (
            <div className="space-y-3 animate-safe-fade-in">
              {SELF_ASSESSMENT_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => toggleReflection(index)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all min-h-[56px] ${
                    reflections[index]
                      ? 'bg-haven-purple-soft border-haven-purple/20'
                      : 'bg-white border-border hover:border-haven-purple/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors ${
                        reflections[index]
                          ? 'bg-haven-purple border-haven-purple'
                          : 'border-border bg-white'
                      }`}
                    >
                      {reflections[index] && (
                        <span className="text-white text-xs font-bold">Yes</span>
                      )}
                    </div>
                    <span className="text-text-primary text-sm leading-relaxed">{question}</span>
                  </div>
                </button>
              ))}

              {yesCount > 0 && (
                <div className="p-5 rounded-2xl bg-haven-emergency/5 border border-haven-emergency/20 mt-4">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-haven-emergency flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-text-primary text-sm font-medium leading-relaxed mb-2">
                        If any of these resonate with you, you may be experiencing abuse.
                      </p>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        You are not alone, and you are not imagining things. What you are
                        experiencing is real, and you deserve to be safe. You do not need to have
                        all the answers right now. But know that help is available whenever you are
                        ready.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── Power and Control Wheel ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              The Power and Control Wheel
            </h2>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            Developed by the Domestic Abuse Intervention Programs in Duluth, Minnesota, the Power
            and Control Wheel shows how different types of abuse work together as a system. Physical
            and sexual violence are on the outer ring, holding everything in place. Inside the
            wheel are the tactics abusers use to maintain power and control.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHEEL_SECTIONS.map((section) => (
              <div
                key={section.title}
                className="p-4 rounded-2xl bg-white border border-border"
              >
                <h4 className="font-serif text-base font-semibold text-text-primary mb-2">
                  {section.title}
                </h4>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-haven-purple-soft/50 border border-haven-purple/10">
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong className="text-text-primary">The pattern matters more than any single
              incident.</strong> Abuse is not a one-time event. It is a pattern of behaviors
              designed to maintain power and control over another person. If you recognize several
              of these tactics in your relationship, that is significant.
            </p>
          </div>
        </section>

        {/* ── It's Not Your Fault ── */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-haven-green/10 border border-haven-green/30 text-center">
            <Heart className="w-8 h-8 text-haven-green mx-auto mb-3" />
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-3">
              It Is Not Your Fault
            </h2>
            <div className="space-y-3 text-text-secondary text-sm leading-relaxed max-w-lg mx-auto text-left">
              <p>
                You did not cause the abuse. You cannot control it. And you cannot cure it.
              </p>
              <p>
                Abusers choose to abuse. No matter what they tell you -- no matter how many
                times they say you provoked them, pushed their buttons, or made them angry --
                violence is a choice they make. You are not responsible for their choices.
              </p>
              <p>
                You do not need to be perfect to deserve safety. You do not need to earn the
                right to be treated with respect. Every human being deserves to live without
                fear in their own home.
              </p>
              <p className="font-medium text-text-primary">
                If you are reading this, you are already showing incredible strength.
              </p>
            </div>
          </div>
        </section>

        {/* ── Next Steps ── */}
        <section className="mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-5">
            What You Can Do Next
          </h2>

          <div className="space-y-3">
            <Link
              href="/danger-assessment"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border hover:border-haven-purple/20 transition-all min-h-[56px]"
            >
              <div className="w-10 h-10 rounded-full bg-haven-emergency/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-haven-emergency" />
              </div>
              <div>
                <span className="block font-serif text-base font-semibold text-text-primary">
                  Danger Assessment
                </span>
                <span className="block text-text-secondary text-sm">
                  A research-based tool to help you understand your level of risk
                </span>
              </div>
            </Link>

            <Link
              href="/help-now"
              className="flex items-center gap-4 p-5 rounded-2xl bg-haven-emergency/5 border border-haven-emergency/20 hover:bg-haven-emergency/10 transition-all min-h-[56px]"
            >
              <div className="w-10 h-10 rounded-full bg-haven-emergency/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-haven-emergency" />
              </div>
              <div>
                <span className="block font-serif text-base font-semibold text-text-primary">
                  Get Help Now
                </span>
                <span className="block text-text-secondary text-sm">
                  Hotlines, shelters, and immediate resources -- available 24/7
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Bottom */}
        <div className="text-center py-8 border-t border-border-light">
          <p className="font-serif text-lg text-text-primary leading-relaxed italic max-w-md mx-auto">
            Naming what is happening to you is one of the bravest things you can do. You are not
            alone.
          </p>
        </div>
      </div>
    </div>
  );
}
