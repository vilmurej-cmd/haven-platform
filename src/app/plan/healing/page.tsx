'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Heart,
  Brain,
  Flower2,
  Sparkles,
  RefreshCw,
  Users,
  Search,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

/* ────────────────────────────────────────────────────────
   Trauma responses
   ──────────────────────────────────────────────────────── */

const TRAUMA_RESPONSES = [
  {
    name: 'Fight',
    description:
      'Your body goes into defense mode. You may feel intense anger, the urge to argue back, or a need to regain control. After leaving, this can show up as irritability, difficulty letting things go, or feeling combative even in safe situations.',
  },
  {
    name: 'Flight',
    description:
      'Your instinct is to escape. You may feel restless, anxious, unable to sit still, or constantly planning your next move. After leaving, this can show up as difficulty settling into a new place, always feeling like you need to run, or trouble being present.',
  },
  {
    name: 'Freeze',
    description:
      'Your body shuts down to protect itself. You may feel numb, disconnected, unable to think clearly or make decisions. After leaving, this can show up as feeling stuck, overwhelmed by simple tasks, or watching life happen around you without feeling part of it.',
  },
  {
    name: 'Fawn',
    description:
      'You try to please and appease to stay safe. You put others first, agree with everything, avoid conflict at all costs. After leaving, this can show up as difficulty saying no, people-pleasing, losing yourself in others\' needs, or not knowing what you actually want.',
  },
];

/* ────────────────────────────────────────────────────────
   Grounding exercise steps
   ──────────────────────────────────────────────────────── */

const GROUNDING_STEPS = [
  {
    count: 5,
    sense: 'See',
    prompt: 'Name five things you can see right now. The edge of a table. The color of the wall. Sunlight on the floor.',
  },
  {
    count: 4,
    sense: 'Touch',
    prompt: 'Name four things you can physically feel. Your feet on the ground. The fabric of your clothes. The air on your skin.',
  },
  {
    count: 3,
    sense: 'Hear',
    prompt: 'Name three things you can hear. A clock ticking. Birds outside. Your own breathing.',
  },
  {
    count: 2,
    sense: 'Smell',
    prompt: 'Name two things you can smell. Coffee. Fresh air. Soap on your hands.',
  },
  {
    count: 1,
    sense: 'Taste',
    prompt: 'Name one thing you can taste. Water. Toothpaste. The inside of your mouth.',
  },
];

/* ────────────────────────────────────────────────────────
   Journaling prompts
   ──────────────────────────────────────────────────────── */

const JOURNALING_PROMPTS = [
  'Today I felt safe when...',
  'I am proud of myself for...',
  'Something beautiful I noticed today...',
  'A boundary I set that felt good...',
  'Something I want to reclaim about myself...',
  'A moment this week when I felt strong...',
  'If I could tell my past self one thing, it would be...',
  'What does freedom feel like to me?',
  'Three things I am grateful for today...',
  'A kind thing I did for myself recently...',
];

/* ────────────────────────────────────────────────────────
   Affirmations
   ──────────────────────────────────────────────────────── */

const AFFIRMATIONS = [
  'I am worthy of love and respect.',
  'What happened to me was not my fault.',
  'I am stronger than I know.',
  'I deserve to take up space in this world.',
  'My feelings are valid and they matter.',
  'I am allowed to set boundaries without guilt.',
  'I am rebuilding my life on my own terms.',
  'I am not defined by what was done to me.',
  'Every day I am becoming more myself.',
  'I deserve peace, joy, and safety.',
  'I am allowed to heal at my own pace.',
  'My past does not determine my future.',
  'I am enough, exactly as I am.',
  'I trust myself to make good decisions.',
  'I am worthy of gentle, kind love.',
];

/* ────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────── */

export default function HealingPage() {
  const [groundingStep, setGroundingStep] = useState(0);
  const [groundingActive, setGroundingActive] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const breathIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Breathing exercise
  useEffect(() => {
    if (!breathingActive) {
      if (breathIntervalRef.current) {
        clearInterval(breathIntervalRef.current);
        breathIntervalRef.current = null;
      }
      return;
    }

    let phase: 'inhale' | 'hold' | 'exhale' = 'inhale';
    let seconds = 0;
    setBreathPhase('inhale');
    setBreathCount(4);

    breathIntervalRef.current = setInterval(() => {
      seconds++;

      if (phase === 'inhale') {
        const remaining = 4 - seconds;
        setBreathCount(remaining > 0 ? remaining : 0);
        if (seconds >= 4) {
          phase = 'hold';
          seconds = 0;
          setBreathPhase('hold');
          setBreathCount(7);
        }
      } else if (phase === 'hold') {
        const remaining = 7 - seconds;
        setBreathCount(remaining > 0 ? remaining : 0);
        if (seconds >= 7) {
          phase = 'exhale';
          seconds = 0;
          setBreathPhase('exhale');
          setBreathCount(8);
        }
      } else if (phase === 'exhale') {
        const remaining = 8 - seconds;
        setBreathCount(remaining > 0 ? remaining : 0);
        if (seconds >= 8) {
          phase = 'inhale';
          seconds = 0;
          setBreathPhase('inhale');
          setBreathCount(4);
        }
      }
    }, 1000);

    return () => {
      if (breathIntervalRef.current) {
        clearInterval(breathIntervalRef.current);
      }
    };
  }, [breathingActive]);

  function nextAffirmation() {
    setAffirmationIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
  }

  function startGrounding() {
    setGroundingActive(true);
    setGroundingStep(0);
  }

  function nextGroundingStep() {
    if (groundingStep < GROUNDING_STEPS.length - 1) {
      setGroundingStep((s) => s + 1);
    } else {
      setGroundingActive(false);
      setGroundingStep(0);
    }
  }

  const breathCircleSize =
    breathPhase === 'inhale'
      ? 'w-40 h-40 sm:w-48 sm:h-48'
      : breathPhase === 'hold'
      ? 'w-40 h-40 sm:w-48 sm:h-48'
      : 'w-24 h-24 sm:w-28 sm:h-28';

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
          <div className="w-14 h-14 rounded-full bg-haven-green/20 flex items-center justify-center mx-auto mb-4">
            <Flower2 className="w-7 h-7 text-haven-green" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Healing &amp; Recovery
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            You survived something that tried to break you. Now comes the part where you put
            yourself back together -- gently, at your own pace, in your own way.
          </p>
        </div>

        {/* ── Healing Is Not Linear ── */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-haven-green/10 border border-haven-green/30 text-center">
            <Flower2 className="w-8 h-8 text-haven-green mx-auto mb-3" />
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-3">
              Healing Is Not Linear
            </h2>
            <div className="space-y-3 text-text-secondary text-sm leading-relaxed max-w-lg mx-auto">
              <p>
                Some days you will feel strong and free. Other days the weight of what happened
                will press down on you again. Both of those days are part of healing.
              </p>
              <p>
                A hard day does not erase your progress. It does not mean you are going
                backwards. It means you are still processing, and that takes courage.
              </p>
              <p className="font-medium text-text-primary font-serif text-base">
                Be patient with yourself. You are doing something incredibly hard, and you are
                doing it.
              </p>
            </div>
          </div>
        </section>

        {/* ── Trauma Responses ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Trauma Responses
            </h2>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            Your nervous system learned to protect you during the abuse. These survival
            responses may continue even after you are safe. Understanding them helps you
            recognize that you are not broken -- your body is doing what it was trained to do.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRAUMA_RESPONSES.map((response) => (
              <div
                key={response.name}
                className="p-5 rounded-2xl bg-white border border-border"
              >
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                  {response.name}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {response.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-haven-purple-soft/50 border border-haven-purple/10">
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong className="text-text-primary">All of these responses are normal.</strong>{' '}
              None of them are character flaws. They are survival strategies that kept you alive.
              With time, safety, and support, your nervous system can learn that it does not need
              to be on high alert anymore.
            </p>
          </div>
        </section>

        {/* ── Self-Care: Grounding ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Self-Care Practices
            </h2>
          </div>

          {/* 5-4-3-2-1 Grounding */}
          <div className="p-5 rounded-2xl bg-white border border-border mb-5">
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
              Grounding: The 5-4-3-2-1 Exercise
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              When anxiety or a flashback pulls you out of the present moment, this exercise
              brings you back. It reconnects you to the here and now.
            </p>

            {!groundingActive ? (
              <>
                <div className="space-y-3 mb-4">
                  {GROUNDING_STEPS.map((step) => (
                    <div
                      key={step.count}
                      className="flex gap-3 p-3 rounded-xl bg-bg-safe"
                    >
                      <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">
                        {step.count}
                      </span>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        <strong className="text-text-primary">{step.sense}:</strong>{' '}
                        {step.prompt}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={startGrounding}
                  className="w-full px-5 py-3 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors min-h-[48px]"
                >
                  Start Guided Exercise
                </button>
              </>
            ) : (
              <div className="text-center animate-safe-fade-in">
                <div className="w-16 h-16 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
                  <span className="text-haven-purple font-bold text-2xl">
                    {GROUNDING_STEPS[groundingStep].count}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-semibold text-text-primary mb-2">
                  {GROUNDING_STEPS[groundingStep].sense}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-md mx-auto">
                  {GROUNDING_STEPS[groundingStep].prompt}
                </p>
                <p className="text-text-muted text-xs mb-4">
                  Take your time. There is no rush.
                </p>
                <button
                  onClick={nextGroundingStep}
                  className="px-6 py-3 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors min-h-[48px]"
                >
                  {groundingStep < GROUNDING_STEPS.length - 1
                    ? 'Next'
                    : 'You are here. You are safe.'}
                </button>
              </div>
            )}
          </div>

          {/* Breathing Exercise */}
          <div className="p-5 rounded-2xl bg-white border border-border mb-5">
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
              Breathing: The 4-7-8 Pattern
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              This breathing pattern activates your body&apos;s natural calming response. It
              tells your nervous system that you are safe.
            </p>

            {!breathingActive ? (
              <button
                onClick={() => setBreathingActive(true)}
                className="w-full px-5 py-3 rounded-xl bg-haven-green text-white text-sm font-medium hover:bg-haven-green/90 transition-colors min-h-[48px]"
              >
                Start Breathing Exercise
              </button>
            ) : (
              <div className="text-center animate-safe-fade-in">
                <div className="flex items-center justify-center mb-4" style={{ minHeight: '200px' }}>
                  <div
                    className={`${breathCircleSize} rounded-full bg-haven-green/20 border-4 border-haven-green flex items-center justify-center transition-all duration-1000 ease-in-out`}
                  >
                    <div className="text-center">
                      <span className="block text-haven-green font-bold text-3xl">
                        {breathCount}
                      </span>
                      <span className="block text-haven-green text-sm font-medium capitalize">
                        {breathPhase === 'inhale'
                          ? 'Breathe in'
                          : breathPhase === 'hold'
                          ? 'Hold'
                          : 'Breathe out'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setBreathingActive(false)}
                  className="px-6 py-3 rounded-xl bg-white border border-border text-text-secondary text-sm font-medium hover:border-haven-purple/20 transition-colors min-h-[48px]"
                >
                  Stop
                </button>
              </div>
            )}
          </div>

          {/* Journaling Prompts */}
          <div className="p-5 rounded-2xl bg-white border border-border">
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
              Journaling Prompts
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Writing can help you process what you have been through and reconnect with who you
              are becoming. You do not have to write a lot. Even one sentence is enough.
            </p>
            <div className="space-y-3">
              {JOURNALING_PROMPTS.map((prompt) => (
                <div
                  key={prompt}
                  className="p-3 rounded-xl bg-haven-purple-soft/30 border border-haven-purple/10"
                >
                  <p className="text-text-primary text-sm italic font-serif">
                    &ldquo;{prompt}&rdquo;
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-bg-safe border border-border">
              <p className="text-text-muted text-xs leading-relaxed">
                HAVEN has an encrypted journal feature available on the{' '}
                <Link href="/plan" className="text-haven-purple hover:underline">
                  Safety Plan
                </Link>{' '}
                page where you can write privately.
              </p>
            </div>
          </div>
        </section>

        {/* ── Finding a Therapist ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Finding a Therapist
            </h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                What to Look For
              </h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Experience with domestic violence and trauma survivors
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Training in <strong>EMDR</strong> (Eye Movement Desensitization and
                  Reprocessing) or <strong>trauma-focused CBT</strong> -- these are especially
                  effective for DV survivors
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Someone who makes you feel safe and believed, not judged
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  A therapist who understands power dynamics and does not suggest couples
                  counseling with an abuser
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                Questions to Ask
              </h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  &ldquo;Do you have experience working with domestic violence survivors?&rdquo;
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  &ldquo;What is your approach to trauma therapy?&rdquo;
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  &ldquo;Do you offer a sliding scale or reduced fees?&rdquo;
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  &ldquo;Can I do sessions online or by phone?&rdquo;
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  &ldquo;How do you handle confidentiality and safety concerns?&rdquo;
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                Sliding-Scale &amp; Free Options
              </h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  <strong>SAMHSA National Helpline</strong> (1-800-662-4357) -- free referrals,
                  24/7
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Many DV organizations offer free counseling for survivors
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Community mental health centers often have sliding-scale fees based on income
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  If you have Medicaid, therapy is covered at no cost
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-bold mt-0.5">-</span>
                  Online therapy platforms often cost less than in-person sessions
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Support Groups ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Support Groups
            </h2>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            There is something powerful about being in a room -- physical or virtual -- with
            people who understand what you have been through without you having to explain it.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                In-Person Groups
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Ask your local DV shelter or organization about weekly survivor support groups.
                Many are free, led by trained facilitators, and provide childcare. The National
                DV Hotline (1-800-799-7233) can connect you with groups in your area.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                Online Groups
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                If leaving the house feels overwhelming or unsafe, virtual support groups let you
                connect from anywhere. DV organizations and mental health platforms offer
                moderated online groups where you can share, listen, and feel less alone.
              </p>
            </div>
          </div>
        </section>

        {/* ── Reclaiming Your Identity ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Reclaiming Your Identity
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border mb-5">
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              Abuse strips away your sense of self. Your abuser told you who you were, what you
              were worth, and what you deserved. Those were lies.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              Reclaiming your identity means rediscovering the person you were before the abuse
              and the person you are becoming after it. It is a process, not a destination.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                Reconnect with things you used to enjoy before the relationship
              </li>
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                Try something new -- a class, a hobby, a walk in a place you choose
              </li>
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                Practice making small decisions for yourself: what to eat, what to watch, when
                to sleep
              </li>
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                Spend time with people who see you clearly and reflect back who you really are
              </li>
              <li className="flex gap-2">
                <span className="text-haven-purple font-bold mt-0.5">-</span>
                Notice moments when you feel like yourself -- hold onto those
              </li>
            </ul>
          </div>
        </section>

        {/* ── Affirmations ── */}
        <section className="mb-12">
          <div className="p-6 rounded-2xl bg-haven-purple-soft border border-haven-purple/20 text-center">
            <Heart className="w-8 h-8 text-haven-purple mx-auto mb-4" />
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-1">
              Affirmation
            </h2>
            <p className="text-text-muted text-xs mb-4">
              Click to see a new one
            </p>

            <div className="min-h-[80px] flex items-center justify-center mb-4">
              <p className="font-serif text-xl sm:text-2xl text-text-primary leading-relaxed italic max-w-md">
                &ldquo;{AFFIRMATIONS[affirmationIndex]}&rdquo;
              </p>
            </div>

            <button
              onClick={nextAffirmation}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-haven-purple text-white text-sm font-medium hover:bg-haven-purple/90 transition-colors min-h-[48px]"
            >
              <RefreshCw className="w-4 h-4" />
              Another One
            </button>
          </div>
        </section>

        {/* Bottom */}
        <div className="text-center py-8 border-t border-border-light">
          <Flower2 className="w-6 h-6 text-haven-green mx-auto mb-4" />
          <p className="font-serif text-xl text-text-primary leading-relaxed font-medium max-w-md mx-auto">
            You survived. That is not a small thing. That is everything.
          </p>
        </div>
      </div>
    </div>
  );
}
