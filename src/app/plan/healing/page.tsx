'use client';

import { ArrowLeft, Heart, Brain, Flower2, Baby, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function HealingPage() {
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
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-haven-green/20 flex items-center justify-center mx-auto mb-4">
            <Flower2 className="w-7 h-7 text-haven-green" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
            Healing
          </h1>
          <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
            You survived something that tried to break you. Now comes the part where you put yourself back together -- gently, at your own pace, in your own way.
          </p>
        </div>

        {/* ── Trauma Recovery ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">Trauma Recovery</h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">What PTSD Looks Like After Domestic Violence</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                If you are experiencing any of these, you are not going crazy. Your brain is trying to protect you from something it learned was dangerous. These are normal responses to abnormal experiences:
              </p>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>Hypervigilance</strong> -- Always scanning for danger. Jumping at sounds. Sitting with your back to the wall. Watching doors.</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>Nightmares</strong> -- Reliving what happened while you sleep. Waking up in a panic. Afraid to fall asleep.</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>Flashbacks</strong> -- Suddenly feeling like it is happening again. A smell, a sound, a tone of voice can transport you back.</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>Flinching</strong> -- Your body remembers even when your mind tries to forget. Flinching at sudden movements or raised hands.</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>Difficulty trusting</strong> -- Struggling to believe that someone could be kind without wanting something. Second-guessing everyone.</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>Emotional numbness</strong> -- Feeling disconnected from yourself, like you are watching your life from outside your body.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-haven-green/10 border border-haven-green/30 text-center">
              <p className="font-serif text-lg text-text-primary leading-relaxed font-medium">
                These are normal responses to abnormal experiences. You are not broken. You are healing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Finding a Therapist</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                A therapist who specializes in trauma and domestic violence can make an enormous difference. You do not have to do this alone.
              </p>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>SAMHSA National Helpline</strong> (1-800-662-4357) -- Free referrals, 24/7, in English and Spanish</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Ask specifically for therapists trained in <strong>EMDR</strong> or <strong>trauma-focused CBT</strong> -- these approaches are especially effective for DV survivors</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Many therapists offer sliding-scale fees. DV organizations often provide free counseling</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Online therapy is an option if leaving the house feels overwhelming right now</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Support Groups</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                There is something powerful about being in a room -- physical or virtual -- with people who understand what you have been through without you having to explain it.
              </p>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>In-person groups:</strong> Ask your local DV shelter or organization. Many run weekly survivor groups at no cost</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>Online groups:</strong> DV organizations and mental health platforms offer virtual support groups you can join from anywhere</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> <strong>National DV Hotline</strong> (1-800-799-7233) can connect you with groups in your area</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Self-Care Practices ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-rose/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-haven-rose" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">Self-Care Practices</h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">Grounding: The 5-4-3-2-1 Exercise</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                When anxiety or a flashback pulls you out of the present moment, this exercise brings you back. Do it slowly. There is no rush.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                  <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">5</span>
                  <p className="text-text-secondary text-sm leading-relaxed"><strong className="text-text-primary">See:</strong> Name five things you can see right now. The edge of a table. The color of the wall. Sunlight on the floor.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                  <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">4</span>
                  <p className="text-text-secondary text-sm leading-relaxed"><strong className="text-text-primary">Touch:</strong> Name four things you can physically feel. Your feet on the ground. The fabric of your clothes. The air on your skin.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                  <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">3</span>
                  <p className="text-text-secondary text-sm leading-relaxed"><strong className="text-text-primary">Hear:</strong> Name three things you can hear. A clock ticking. Birds outside. Your own breathing.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                  <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">2</span>
                  <p className="text-text-secondary text-sm leading-relaxed"><strong className="text-text-primary">Smell:</strong> Name two things you can smell. Coffee. Fresh air. Soap on your hands.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-xl bg-bg-safe">
                  <span className="w-8 h-8 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-haven-purple font-bold text-sm">1</span>
                  <p className="text-text-secondary text-sm leading-relaxed"><strong className="text-text-primary">Taste:</strong> Name one thing you can taste. Water. Toothpaste. The inside of your mouth.</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mt-3 italic">
                You are here. You are now. You are safe.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">Breathing: The 4-7-8 Pattern</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                This breathing pattern activates your body&apos;s natural calming response. It tells your nervous system that you are safe.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 rounded-xl bg-haven-green/5 border border-haven-green/20">
                  <span className="text-haven-green font-bold text-lg flex-shrink-0 w-8 text-center">4</span>
                  <p className="text-text-secondary text-sm leading-relaxed"><strong className="text-text-primary">Breathe in</strong> through your nose for 4 seconds. Feel your belly expand.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-xl bg-haven-green/5 border border-haven-green/20">
                  <span className="text-haven-green font-bold text-lg flex-shrink-0 w-8 text-center">7</span>
                  <p className="text-text-secondary text-sm leading-relaxed"><strong className="text-text-primary">Hold</strong> your breath gently for 7 seconds. You are still. You are calm.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-xl bg-haven-green/5 border border-haven-green/20">
                  <span className="text-haven-green font-bold text-lg flex-shrink-0 w-8 text-center">8</span>
                  <p className="text-text-secondary text-sm leading-relaxed"><strong className="text-text-primary">Breathe out</strong> slowly through your mouth for 8 seconds. Let everything go.</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mt-3">
                Repeat 3-4 times, or as many times as you need. There is no wrong way to breathe.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">Journaling Prompts</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Writing can help you process what you have been through and reconnect with who you are becoming. You do not have to write a lot. Even one sentence is enough.
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-haven-purple-soft/30 border border-haven-purple/10">
                  <p className="text-text-primary text-sm italic font-serif">&quot;Today I felt safe when...&quot;</p>
                </div>
                <div className="p-3 rounded-xl bg-haven-purple-soft/30 border border-haven-purple/10">
                  <p className="text-text-primary text-sm italic font-serif">&quot;I am proud of myself for...&quot;</p>
                </div>
                <div className="p-3 rounded-xl bg-haven-purple-soft/30 border border-haven-purple/10">
                  <p className="text-text-primary text-sm italic font-serif">&quot;Something beautiful I noticed today...&quot;</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-haven-purple-soft/50 border border-haven-purple/10 text-center">
              <p className="font-serif text-lg text-text-primary leading-relaxed font-medium">
                Healing is not linear. Some days will be harder than others. That&apos;s okay.
              </p>
              <p className="text-text-secondary text-sm mt-2">
                A hard day does not erase your progress. It just means you are still processing. And that takes courage.
              </p>
            </div>
          </div>
        </section>

        {/* ── For Your Children ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-rose/20 flex items-center justify-center flex-shrink-0">
              <Baby className="w-5 h-5 text-haven-rose" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">For Your Children</h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Play Therapy</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Children often process trauma through play rather than words. A play therapist uses games, art, and storytelling to help children express what they cannot say out loud. Many DV organizations offer free children&apos;s therapy, or can refer you to therapists who specialize in working with children who have witnessed domestic violence. Ask your shelter advocate or school counselor.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border">
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Creating Stability</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                After the chaos of abuse, children crave predictability. Even small routines can be deeply healing:
              </p>
              <ul className="space-y-2 text-text-secondary text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Consistent bedtimes and mealtimes, even when everything else feels uncertain</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> A special bedtime routine -- a story, a song, telling them three things you love about them</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Letting them keep something familiar -- a blanket, a toy, a book -- from their old life</li>
                <li className="flex gap-2"><span className="text-haven-purple font-bold mt-0.5">-</span> Saying &quot;I love you&quot; every single day. They need to hear it more than you know.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-haven-green/10 border border-haven-green/30 text-center">
              <p className="font-serif text-lg text-text-primary leading-relaxed font-medium">
                Your children are resilient. And so are you.
              </p>
              <p className="text-text-secondary text-sm mt-2">
                The fact that you are reading this page means you are already doing everything you can. That matters more than you know.
              </p>
            </div>
          </div>
        </section>

        {/* ── Connection to Other Platforms ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">More Ways to Heal</h2>
          </div>

          <div className="space-y-4">
            <a
              href="https://harmonymusic.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-2xl bg-white border border-border hover:border-haven-purple/20 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-5 h-5 text-haven-purple" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-semibold text-text-primary">HARMONY</h3>
                    <ExternalLink className="w-4 h-4 text-text-muted" />
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mt-1">
                    Describe what you are feeling and let music hold that moment. Sometimes words are not enough, but a melody can carry what your heart cannot say.
                  </p>
                  <span className="inline-block mt-2 text-haven-purple text-xs font-medium">harmonymusic.ai</span>
                </div>
              </div>
            </a>

            <a
              href="https://clarityhealth.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-2xl bg-white border border-border hover:border-haven-purple/20 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-haven-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-haven-green" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-semibold text-text-primary">CLARITY</h3>
                    <ExternalLink className="w-4 h-4 text-text-muted" />
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mt-1">
                    Understand medical concerns after abuse. If you have injuries, pain, or health questions you have been afraid to ask about, Clarity can help you understand what you are experiencing and when to seek care.
                  </p>
                  <span className="inline-block mt-2 text-haven-purple text-xs font-medium">clarityhealth.ai</span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Bottom */}
        <div className="text-center py-10 border-t border-border-light">
          <Flower2 className="w-6 h-6 text-haven-green mx-auto mb-4" />
          <p className="font-serif text-xl text-text-primary leading-relaxed font-medium max-w-md mx-auto">
            You survived. That is not a small thing. That is everything.
          </p>
        </div>
      </div>
    </div>
  );
}
