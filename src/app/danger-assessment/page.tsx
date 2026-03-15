'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Phone, Shield, Heart, AlertTriangle, RotateCcw } from 'lucide-react';
import Link from 'next/link';

const QUESTIONS = [
  'Has the physical violence increased in severity over the past year?',
  'Does he own a gun?',
  'Have you left him or separated after living together during the past year?',
  'Is he unemployed?',
  'Has he ever used a weapon against you or threatened you with a weapon?',
  'Does he threaten to kill you?',
  'Has he avoided being arrested for domestic violence?',
  'Do you have a child that is not his?',
  'Has he ever forced you to have sex when you did not wish to do so?',
  'Does he ever try to choke you?',
  'Does he use illegal drugs?',
  'Is he an alcoholic or problem drinker?',
  'Does he control most or all of your daily activities?',
  'Is he violently and constantly jealous of you?',
  'Have you ever been beaten by him while you were pregnant?',
];

interface RiskLevel {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  message: string;
  recommendations: string[];
}

function getRiskLevel(yesCount: number): RiskLevel {
  if (yesCount <= 3) {
    return {
      label: 'Variable Danger',
      color: 'text-green-700',
      bgColor: 'bg-haven-green/15',
      borderColor: 'border-haven-green/40',
      message:
        'Your situation has some risk indicators. Even one sign of violence is serious, and you deserve support. We recommend speaking with an advocate who can help you think through your options.',
      recommendations: [
        'Talk to a domestic violence advocate — they listen without judgment',
        'Create a safety plan, even if you feel safe right now',
        'Save important documents in a place only you can access',
        'Tell someone you trust about your situation',
      ],
    };
  }
  if (yesCount <= 7) {
    return {
      label: 'Increased Danger',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-haven-gold/40',
      message:
        'Your situation shows increased danger. This is not your fault, and you do not have to face this alone. We strongly recommend reaching out to a domestic violence advocate who can help you create a safety plan.',
      recommendations: [
        'Contact the National DV Hotline — they are available 24/7',
        'Create a detailed safety plan with an advocate',
        'Pack an emergency bag with essentials and keep it hidden',
        'Memorize important phone numbers in case your phone is taken',
        'Identify safe places you can go quickly if needed',
      ],
    };
  }
  if (yesCount <= 11) {
    return {
      label: 'Severe Danger',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      message:
        'Your situation indicates severe danger. Please know that this is not your fault. Please contact a domestic violence advocate as soon as it is safe to do so. They can help you create a plan to stay safe.',
      recommendations: [
        'Call the National DV Hotline: 1-800-799-7233',
        'If you are not safe to call, text START to 88788',
        'Work with an advocate on an immediate safety plan',
        'Reach out to a shelter — they can help you with next steps',
        'If you are injured, seek medical attention and tell them what happened',
        'Consider a protective order — an advocate can help with this',
      ],
    };
  }
  return {
    label: 'Extreme Danger',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-haven-emergency/40',
    message:
      'Your situation indicates extreme danger. Your life may be at risk. Please reach out for help right now — you deserve to be safe. If you are in immediate danger, call 911.',
    recommendations: [
      'Call 911 if you are in immediate danger',
      'Call the National DV Hotline: 1-800-799-7233',
      'Go to your nearest shelter or safe place as soon as you can',
      'Tell someone you trust — a friend, family member, coworker, doctor',
      'If you leave, do not tell your partner where you are going',
      'An advocate can help you with a protective order and safety plan',
    ],
  };
}

export default function DangerAssessmentPage() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const yesCount = answers.filter((a) => a === true).length;

  function handleAnswer(answer: boolean) {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleReset() {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setShowResults(false);
  }

  const risk = getRiskLevel(yesCount);

  // Introduction screen
  if (!started) {
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="text-center mb-10 animate-safe-fade-in">
            <div className="w-14 h-14 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-haven-purple" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
              Danger Assessment
            </h1>
            <p className="text-text-secondary text-base max-w-lg mx-auto leading-relaxed">
              This assessment helps you understand the level of danger in your situation. It is based on research by Dr. Jacqueline Campbell and has helped many people see their situation more clearly.
            </p>
          </div>

          <div className="max-w-lg mx-auto space-y-6 animate-safe-fade-in" style={{ animationDelay: '0.15s' }}>
            {/* Privacy notice */}
            <div className="p-5 rounded-2xl bg-haven-green/10 border border-haven-green/30">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-text-primary mb-1">Your privacy is protected</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Your answers are <strong>not saved</strong> anywhere. Nothing is sent to a server. When you close this page, your answers disappear completely.
                  </p>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                How this works
              </h3>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-haven-purple font-medium">1.</span>
                  You will answer 15 yes-or-no questions, one at a time
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-medium">2.</span>
                  Answer honestly — there are no wrong answers
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-medium">3.</span>
                  At the end, you will see your results with recommended next steps
                </li>
                <li className="flex gap-2">
                  <span className="text-haven-purple font-medium">4.</span>
                  You can go back and change any answer
                </li>
              </ul>
            </div>

            {/* Gentle encouragement */}
            <p className="text-text-secondary text-sm text-center leading-relaxed italic font-serif">
              It takes courage to look at your situation honestly. You are already being brave by being here.
            </p>

            <button
              onClick={() => setStarted(true)}
              className="w-full py-4 rounded-2xl bg-haven-purple text-white font-medium text-lg hover:bg-haven-purple/90 transition-colors active:scale-[0.98]"
            >
              Begin Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-safe-fade-in">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-2">
              Your Results
            </h1>
            <p className="text-text-secondary text-base">
              Remember: this is a tool to help you understand your situation, not a diagnosis.
            </p>
          </div>

          {/* Risk level card */}
          <div className={`p-6 rounded-2xl ${risk.bgColor} border ${risk.borderColor} mb-6 animate-safe-fade-in`} style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className={`w-6 h-6 ${risk.color}`} />
              <h2 className={`font-serif text-2xl font-bold ${risk.color}`}>
                {risk.label}
              </h2>
            </div>
            <p className="text-text-primary leading-relaxed mb-1">
              {risk.message}
            </p>
            <p className="text-text-muted text-sm mt-3">
              You answered &ldquo;yes&rdquo; to {yesCount} of {QUESTIONS.length} questions.
            </p>
          </div>

          {/* Recommendations */}
          <div className="p-5 rounded-2xl bg-white border border-border mb-6 animate-safe-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
              Recommended next steps
            </h3>
            <ul className="space-y-3">
              {risk.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-text-secondary text-base leading-relaxed">
                  <Heart className="w-4 h-4 text-haven-rose flex-shrink-0 mt-1.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 mb-8 animate-safe-fade-in" style={{ animationDelay: '0.3s' }}>
            <a
              href="tel:18007997233"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-haven-purple text-white font-medium text-lg hover:bg-haven-purple/90 transition-colors active:scale-[0.98]"
            >
              <Phone className="w-5 h-5" />
              Call the Hotline Now
            </a>
            <p className="text-center text-text-secondary text-sm">
              1-800-799-7233 — or text <strong>START</strong> to <strong>88788</strong>
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-text-secondary hover:bg-bg-muted transition-colors text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Assessment
              </button>
              <Link
                href="/help-now"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-haven-emergency text-haven-emergency hover:bg-red-50 transition-colors text-sm font-medium"
              >
                <Shield className="w-4 h-4" />
                I Need Help Now
              </Link>
            </div>
          </div>

          {/* Privacy reminder */}
          <div className="p-4 rounded-xl bg-haven-green/10 border border-haven-green/30 text-center animate-safe-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm font-medium">Your privacy is protected</span>
            </div>
            <p className="text-text-secondary text-sm">
              This assessment is not stored. When you close this page, your answers disappear.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="min-h-screen px-4 py-6 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="mb-8 animate-safe-fade-in">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="inline-flex items-center gap-1 text-text-secondary hover:text-haven-purple text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-text-muted text-sm">
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-haven-purple transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
          <div className="text-center mb-10 animate-safe-fade-in" key={currentQuestion}>
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
              <span className="text-haven-purple font-medium text-sm">{currentQuestion + 1}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-text-primary leading-snug">
              {QUESTIONS[currentQuestion]}
            </h2>
          </div>

          {/* Answer buttons */}
          <div className="flex gap-4 w-full max-w-xs mx-auto animate-safe-fade-in" style={{ animationDelay: '0.1s' }}>
            <button
              onClick={() => handleAnswer(true)}
              className={`flex-1 py-4 rounded-2xl font-medium text-lg transition-all active:scale-[0.97] ${
                answers[currentQuestion] === true
                  ? 'bg-haven-purple text-white shadow-lg shadow-haven-purple/20'
                  : 'bg-white border-2 border-border text-text-primary hover:border-haven-purple/30 hover:shadow-sm'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className={`flex-1 py-4 rounded-2xl font-medium text-lg transition-all active:scale-[0.97] ${
                answers[currentQuestion] === false
                  ? 'bg-haven-purple text-white shadow-lg shadow-haven-purple/20'
                  : 'bg-white border-2 border-border text-text-primary hover:border-haven-purple/30 hover:shadow-sm'
              }`}
            >
              No
            </button>
          </div>

          {/* Skip note */}
          {currentQuestion > 0 && answers[currentQuestion] !== null && (
            <button
              onClick={() => {
                if (currentQuestion < QUESTIONS.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  setShowResults(true);
                }
              }}
              className="mt-6 inline-flex items-center gap-1 text-haven-purple text-sm font-medium hover:underline"
            >
              Next question
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Bottom reassurance */}
        <div className="text-center py-4">
          <p className="text-text-muted text-xs">
            Your answers are not being saved. Double-tap Escape to leave at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
