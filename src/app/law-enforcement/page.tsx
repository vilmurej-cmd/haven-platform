import { Shield, ClipboardCheck, Camera, MessageSquare, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function LawEnforcementPage() {
  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <a
        href="/"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-haven-purple text-sm mb-8 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to safety
      </a>

      {/* Header */}
      <div className="text-center mb-12 animate-safe-fade-in">
        <div className="w-16 h-16 rounded-full bg-haven-purple-soft flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-haven-purple" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
          Law Enforcement Resources
        </h1>
        <p className="text-text-secondary text-base max-w-xl mx-auto leading-relaxed">
          Tools and protocols for officers responding to domestic violence calls.
          When an officer asks the right questions, lives are saved.
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Lethality Assessment Protocol */}
        <section
          className="p-6 rounded-2xl bg-white border border-border-light border-l-4 border-l-haven-purple animate-safe-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <ClipboardCheck className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              Lethality Assessment Protocol (LAP)
            </h2>
          </div>

          <p className="text-text-secondary text-base leading-relaxed mb-5">
            The Lethality Assessment Protocol is an evidence-based screening tool used by first
            responders at the scene of a domestic violence incident. Developed by the Maryland
            Network Against Domestic Violence, the LAP helps officers identify victims who are
            at the highest risk of being killed by their intimate partner.
          </p>

          <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
            Key Screening Questions
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            Ask these questions of the victim privately, away from the offender. Explain that
            these questions are designed to help assess their safety.
          </p>

          <ol className="space-y-2 text-text-secondary text-base leading-relaxed mb-5">
            {[
              'Has the offender ever used a weapon against you or threatened you with a weapon?',
              'Has the offender threatened to kill you or your children?',
              'Do you think the offender might try to kill you?',
              'Does the offender have a gun or can they get one easily?',
              'Has the offender ever tried to choke (strangle) you?',
              'Is the offender violently or constantly jealous? For example, "If I can\'t have you, no one can."',
              'Have you left or separated from the offender after living together or being married?',
              'Is the offender unemployed?',
              'Has the offender ever tried to kill themselves?',
              'Do you have a child that the offender knows is not theirs?',
              'Does the offender follow or spy on you or leave threatening messages?',
            ].map((question, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0 text-xs font-bold text-haven-purple mt-0.5">
                  {i + 1}
                </span>
                <span>{question}</span>
              </li>
            ))}
          </ol>

          <div className="p-4 rounded-xl bg-haven-warm border border-haven-gold/20">
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong>Protocol:</strong> If the victim answers &ldquo;yes&rdquo; to any of the first three
              questions, or &ldquo;yes&rdquo; to four or more of the remaining questions, the victim is
              at high risk. Offer an immediate phone call to the local domestic violence hotline
              with the victim present. Encourage (do not force) connection with an advocate.
            </p>
          </div>
        </section>

        {/* Evidence Documentation */}
        <section
          className="p-6 rounded-2xl bg-white border border-border-light border-l-4 border-l-haven-purple animate-safe-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <Camera className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              Evidence Documentation Standards
            </h2>
          </div>

          <p className="text-text-secondary text-base leading-relaxed mb-4">
            Thorough evidence documentation at the scene is critical for prosecution and for
            the victim&apos;s safety. Even if the victim does not wish to press charges at the time
            of the incident, well-documented evidence can be invaluable later.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-base font-semibold text-text-primary mb-2">
                Photographs
              </h3>
              <ul className="space-y-1.5 text-text-secondary text-base leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Photograph all visible injuries from multiple angles with a scale reference</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Document the scene: overturned furniture, broken objects, damaged walls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Photograph the victim&apos;s overall appearance (torn clothing, disheveled hair)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Request follow-up photographs 24&ndash;72 hours later (bruises become more visible)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-base font-semibold text-text-primary mb-2">
                Written Report
              </h3>
              <ul className="space-y-1.5 text-text-secondary text-base leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Record the victim&apos;s statement in their own words, using direct quotes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Note the victim&apos;s emotional state and demeanor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Document the offender&apos;s statements and behavior upon arrival</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Note the presence of children and their condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Record all witness statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-purple mt-2.5 flex-shrink-0" />
                  <span>Document prior calls to the same address</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Officer Communication */}
        <section
          className="p-6 rounded-2xl bg-white border border-border-light border-l-4 border-l-haven-purple animate-safe-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-haven-purple-soft flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-haven-purple" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              Communicating with Victims
            </h2>
          </div>

          <div className="space-y-4 text-text-secondary text-base leading-relaxed">
            <p>
              The way an officer communicates with a domestic violence victim can significantly
              impact their willingness to seek help and cooperate with investigations.
            </p>

            <div>
              <h3 className="font-serif text-base font-semibold text-text-primary mb-2">Do:</h3>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-green mt-2.5 flex-shrink-0" />
                  <span>Separate the victim from the offender before interviewing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-green mt-2.5 flex-shrink-0" />
                  <span>Speak calmly and use the victim&apos;s name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-green mt-2.5 flex-shrink-0" />
                  <span>Say: &ldquo;You did the right thing by calling. This is not your fault.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-green mt-2.5 flex-shrink-0" />
                  <span>Provide information about local shelters and the National DV Hotline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-green mt-2.5 flex-shrink-0" />
                  <span>Ask if there are firearms in the home</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-base font-semibold text-text-primary mb-2">Do not:</h3>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-emergency mt-2.5 flex-shrink-0" />
                  <span>Ask &ldquo;Why don&apos;t you just leave?&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-emergency mt-2.5 flex-shrink-0" />
                  <span>Minimize the situation or suggest &ldquo;it takes two&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-emergency mt-2.5 flex-shrink-0" />
                  <span>Blame the victim for the abuse or for calling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-emergency mt-2.5 flex-shrink-0" />
                  <span>Promise outcomes you cannot guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-emergency mt-2.5 flex-shrink-0" />
                  <span>Discuss the case in front of the offender or children</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Strangulation Warning */}
        <section
          className="p-6 rounded-2xl bg-haven-rose/10 border border-haven-rose/30 animate-safe-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-haven-emergency/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-haven-emergency" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-text-primary">
              Strangulation: The Most Critical Indicator
            </h2>
          </div>
          <div className="space-y-3 text-text-secondary text-base leading-relaxed">
            <p>
              <strong>A victim who has been strangled is 750% more likely to be killed by their
              abuser.</strong> Strangulation is the single most significant predictor of future
              lethality in domestic violence cases.
            </p>
            <p>
              Strangulation may leave little or no visible evidence. Look for: petechiae (red
              spots) in the eyes or face, raspy or changed voice, difficulty swallowing, neck
              pain, or the victim holding their neck.
            </p>
            <p>
              <strong>Always recommend medical evaluation after strangulation.</strong> Internal
              injuries may not be apparent but can be life-threatening hours or days later.
            </p>
          </div>
        </section>

        {/* Closing */}
        <div
          className="text-center pb-4 animate-safe-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="p-6 rounded-2xl bg-haven-purple-soft border border-haven-purple/20 mb-6">
            <p className="text-text-primary text-base leading-relaxed font-medium">
              Domestic violence is the single largest category of calls to law enforcement in the
              United States. Officers who understand these dynamics save lives.
            </p>
          </div>
          <p className="text-text-muted text-sm max-w-lg mx-auto leading-relaxed">
            National DV Hotline for referrals and consultation: 1-800-799-7233
          </p>
        </div>
      </div>
    </div>
  );
}
