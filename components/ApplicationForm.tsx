import React, { useState, useEffect, useCallback } from 'react';

interface Question {
  id: string;
  type: 'radio-cards' | 'radio' | 'text' | 'email' | 'tel' | 'checkbox';
  label: string;
  subtitle?: string;
  field: string;
  options?: { value: string; label: string; description?: string }[];
  placeholder?: string;
  required?: boolean;
  condition?: (formData: FormData) => boolean;
}

interface FormData {
  industry: string;
  current_aum: string;
  marketing_budget: string;
  budget_confirmation: string;
  team_structure: string;
  custodian: string;
  lead_preference: string;
  website: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  consent: boolean;
}

const questions: Question[] = [
  {
    id: 'industry',
    type: 'radio-cards',
    label: 'What type of practice do you operate?',
    subtitle: 'This helps us tailor the acquisition strategy to your regulatory environment.',
    field: 'industry',
    required: true,
    options: [
      { value: 'Independent RIA', label: 'Independent RIA' },
      { value: 'Wirehouse', label: 'Wirehouse / Broker-Dealer' },
      { value: 'Hybrid RIA', label: 'Hybrid RIA' },
      { value: 'Family Office', label: 'Family Office' },
      { value: 'Institutional', label: 'Institutional Asset Mgr' },
    ],
  },
  {
    id: 'current_aum',
    type: 'radio-cards',
    label: 'What is your current AUM?',
    subtitle: 'We work exclusively with practices managing $10M+ in assets.',
    field: 'current_aum',
    required: true,
    options: [
      { value: 'Under $10M', label: 'Under $10M' },
      { value: '$10M - $50M', label: '$10M - $50M' },
      { value: '$50M - $100M', label: '$50M - $100M' },
      { value: '$100M - $250M', label: '$100M - $250M' },
      { value: '$250M - $500M', label: '$250M - $500M' },
      { value: '$500M+', label: '$500M+' },
    ],
  },
  {
    id: 'marketing_budget',
    type: 'radio-cards',
    label: 'What monthly capital can you deploy for growth?',
    subtitle: 'Our system requires consistent investment to generate qualified HNW leads.',
    field: 'marketing_budget',
    required: true,
    options: [
      { value: 'Under $3,000', label: 'Under $3,000' },
      { value: '$3,000-$7,000', label: '$3,000-$7,000' },
      { value: '$7,000-$15,000', label: '$7,000-$15,000' },
      { value: '$15,000-$30,000', label: '$15,000-$30,000' },
      { value: '$30,000-$50,000', label: '$30,000-$50,000' },
      { value: '$50,000+', label: '$50,000+' },
    ],
  },
  {
    id: 'budget_confirmation',
    type: 'radio',
    label: 'Capital Requirement Alert',
    subtitle: 'Our Sovereign Client Acquisition System requires a minimum media spend of $3,000/mo. Is this feasible for your firm?',
    field: 'budget_confirmation',
    required: true,
    condition: (formData) => formData.marketing_budget === 'Under $3,000',
    options: [
      { value: 'Yes', label: 'Yes, I can allocate the required capital.' },
      { value: 'No', label: 'No, this is outside my current budget.' },
    ],
  },
  {
    id: 'team_structure',
    type: 'radio-cards',
    label: 'How is your team structured?',
    subtitle: 'This determines the level of operational support we provide.',
    field: 'team_structure',
    required: true,
    options: [
      { value: 'Solo Advisor', label: 'Solo Advisor' },
      { value: 'Team (2-5)', label: 'Team (2-5 Staff)' },
      { value: 'Enterprise (5+)', label: 'Enterprise (5+ Staff)' },
    ],
  },
  {
    id: 'custodian',
    type: 'radio-cards',
    label: 'Who is your primary custodian?',
    subtitle: 'We integrate with all major platforms.',
    field: 'custodian',
    required: true,
    options: [
      { value: 'Charles Schwab', label: 'Charles Schwab' },
      { value: 'Fidelity', label: 'Fidelity' },
      { value: 'Pershing', label: 'Pershing' },
      { value: 'LPL Financial', label: 'LPL Financial' },
      { value: 'Raymond James', label: 'Raymond James' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    id: 'lead_preference',
    type: 'radio',
    label: 'How do you want to acquire clients?',
    subtitle: 'Choose your preferred operational model.',
    field: 'lead_preference',
    required: true,
    options: [
      { value: 'Buy Leads', label: 'Turnkey (Done-For-You)', description: 'I want qualified appointments delivered to my calendar.' },
      { value: 'Own System', label: 'Sovereign (In-House)', description: 'I want to own the marketing infrastructure myself.' },
    ],
  },
  {
    id: 'first_name',
    type: 'text',
    label: "What's your first name?",
    subtitle: "Let's get acquainted.",
    field: 'first_name',
    placeholder: 'John',
    required: true,
  },
  {
    id: 'last_name',
    type: 'text',
    label: "And your last name?",
    field: 'last_name',
    placeholder: 'Doe',
    required: true,
  },
  {
    id: 'email',
    type: 'email',
    label: "What's your work email?",
    subtitle: "We'll send your strategy brief here.",
    field: 'email',
    placeholder: 'john@firm.com',
    required: true,
  },
  {
    id: 'phone',
    type: 'tel',
    label: 'Best phone number to reach you?',
    subtitle: 'For your strategy session scheduling.',
    field: 'phone',
    placeholder: '(555) 123-4567',
    required: true,
  },
  {
    id: 'website',
    type: 'text',
    label: "What's your firm website?",
    subtitle: 'Optional - helps us prepare for your call.',
    field: 'website',
    placeholder: 'www.yourfirm.com',
    required: false,
  },
  {
    id: 'consent',
    type: 'checkbox',
    label: 'One last thing...',
    subtitle: 'I agree to receive communications from Sovereign Wealth Systems. I understand I can unsubscribe at any time.',
    field: 'consent',
    required: true,
  },
];

const ApplicationForm: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    current_aum: '',
    marketing_budget: '',
    budget_confirmation: '',
    team_structure: '',
    custodian: '',
    lead_preference: '',
    website: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const activeQuestions = questions.filter((q) => !q.condition || q.condition(formData));
  const currentQuestion = activeQuestions[currentIndex];
  const totalQuestions = activeQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const isCurrentValid = useCallback(() => {
    if (!currentQuestion) return false;
    const value = formData[currentQuestion.field as keyof FormData];
    if (!currentQuestion.required) return true;
    if (currentQuestion.type === 'checkbox') return value === true;
    if (typeof value === 'string') return value.trim() !== '';
    return false;
  }, [currentQuestion, formData]);

  const isDisqualified = formData.budget_confirmation === 'No';

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    const webhookUrl = 'https://hooks.zapier.com/hooks/catch/25664223/ufar6c4/';
    const isQualified = formData.budget_confirmation !== 'No';

    const payload = {
      ...formData,
      submitted_at: new Date().toISOString(),
      source: 'Sovereign Wealth Systems - Main Form',
      status: isQualified ? 'Qualified' : 'Disqualified',
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Webhook failed', error);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 2000);
  }, [formData]);

  const handleNext = useCallback(() => {
    if (!isCurrentValid() || isDisqualified) return;
    setDirection('forward');
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentIndex, totalQuestions, isCurrentValid, isDisqualified, handleSubmit]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('backward');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionSelect = (field: string, value: string) => {
    handleInputChange(field, value);
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        if (field === 'budget_confirmation' && value === 'No') return;
        setDirection('forward');
        setCurrentIndex((prev) => prev + 1);
      }
    }, 350);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (isCurrentValid() && !isSubmitting && !isDisqualified) {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, isCurrentValid, isSubmitting, isDisqualified]);

  const getRoi = (budget: string) => {
    switch (budget) {
      case '$3,000-$7,000': return { clients: '1-3', aum: '$1M-$3M+' };
      case '$7,000-$15,000': return { clients: '3-7', aum: '$3M-$7M+' };
      case '$15,000-$30,000': return { clients: '7-14', aum: '$7M-$15M+' };
      case '$30,000-$50,000': return { clients: '15-25', aum: '$15M-$25M+' };
      case '$50,000+': return { clients: '25+', aum: '$25M-$50M+' };
      default: return null;
    }
  };

  const roi = getRoi(formData.marketing_budget);

  // Calendar/Success state
  if (isComplete) {
    return (
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-3xl animate-fadeIn">
          <div className="bg-wealth-black border border-white/10 min-h-[600px] flex flex-col">
            <div className="text-center py-8 border-b border-white/10">
              <div className="text-wealth-gold mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif text-white mb-2">Pre-Approval Confirmed</h3>
              <p className="text-gray-400">Select a time for your Strategy Session below.</p>
            </div>
            <div className="flex-grow w-full bg-white/5 relative">
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/7Do59Uva5qszIlIfg6vb"
                style={{ width: '100%', height: '100%', border: 'none', minHeight: '500px' }}
                scrolling="yes"
                title="Calendar"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const animationClass = direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft';

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center px-6 py-20">
      {/* Header */}
      <div className="max-w-3xl mx-auto w-full mb-8 text-center">
        <div className="inline-block bg-wealth-gold/10 border border-wealth-gold text-wealth-gold px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
          Founding Partner Cohort: Open
        </div>
        <h1 className="text-4xl md:text-6xl font-serif mb-4 text-white">
          Apply for Partnership
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          We are selecting 5 Partners to receive our Enterprise-Grade Media Production & Lead Systems at cost.
        </p>
      </div>

      {/* Progress bar */}
      <div className="max-w-3xl mx-auto w-full mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1 bg-white/10 w-full overflow-hidden rounded-full">
          <div
            className="h-full bg-wealth-gold transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question container */}
      <div className="max-w-3xl mx-auto w-full flex-grow">
        <div className="bg-wealth-black/50 border border-white/10 p-8 md:p-12 backdrop-blur-md min-h-[350px] flex flex-col justify-center">
          {currentQuestion && (
            <div key={currentQuestion.id} className={animationClass}>
              <div className="mb-8">
                <h2 className="text-2xl md:text-4xl font-serif text-white mb-3 leading-tight">
                  {currentQuestion.label}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-gray-400 text-base md:text-lg">{currentQuestion.subtitle}</p>
                )}
              </div>

              {/* Radio Cards */}
              {currentQuestion.type === 'radio-cards' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleOptionSelect(currentQuestion.field, option.value)}
                      className={`p-4 md:p-6 border text-left transition-all duration-200 hover:border-wealth-gold/50 hover:scale-[1.02] ${
                        formData[currentQuestion.field as keyof FormData] === option.value
                          ? 'border-wealth-gold bg-wealth-gold/10 text-white scale-[1.02]'
                          : 'border-white/10 bg-wealth-charcoal text-gray-300'
                      }`}
                    >
                      <span className="text-sm md:text-base font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Radio with descriptions */}
              {currentQuestion.type === 'radio' && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleOptionSelect(currentQuestion.field, option.value)}
                      className={`w-full p-5 border text-left transition-all duration-200 flex items-start gap-4 hover:border-wealth-gold/50 ${
                        formData[currentQuestion.field as keyof FormData] === option.value
                          ? 'border-wealth-gold bg-wealth-gold/10'
                          : 'border-white/10 bg-wealth-charcoal'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
                        formData[currentQuestion.field as keyof FormData] === option.value
                          ? 'border-wealth-gold bg-wealth-gold' : 'border-gray-500'
                      }`}>
                        {formData[currentQuestion.field as keyof FormData] === option.value && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-black rounded-full" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-white font-medium block">{option.label}</span>
                        {option.description && (
                          <span className="text-gray-500 text-sm mt-1 block">{option.description}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Text inputs */}
              {(currentQuestion.type === 'text' || currentQuestion.type === 'email' || currentQuestion.type === 'tel') && (
                <div>
                  <input
                    type={currentQuestion.type}
                    value={formData[currentQuestion.field as keyof FormData] as string}
                    onChange={(e) => handleInputChange(currentQuestion.field, e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    autoFocus
                    className="w-full bg-transparent border-b-2 border-white/20 text-white text-2xl md:text-3xl py-4 focus:border-wealth-gold outline-none transition-colors placeholder:text-gray-600"
                  />
                  <p className="text-gray-600 text-sm mt-4">
                    Press <span className="text-gray-400 bg-white/5 px-2 py-1 rounded">Enter ↵</span> to continue
                  </p>
                </div>
              )}

              {/* Checkbox */}
              {currentQuestion.type === 'checkbox' && (
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div
                    className={`w-6 h-6 border-2 flex-shrink-0 mt-1 transition-all flex items-center justify-center ${
                      formData[currentQuestion.field as keyof FormData]
                        ? 'border-wealth-gold bg-wealth-gold' : 'border-gray-500 group-hover:border-gray-400'
                    }`}
                    onClick={() => handleInputChange(currentQuestion.field, !formData[currentQuestion.field as keyof FormData])}
                  >
                    {formData[currentQuestion.field as keyof FormData] && (
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors"
                    onClick={() => handleInputChange(currentQuestion.field, !formData[currentQuestion.field as keyof FormData])}
                  >
                    {currentQuestion.subtitle}
                  </span>
                </label>
              )}

              {/* ROI Panel */}
              {currentQuestion.id === 'marketing_budget' && roi && formData.marketing_budget !== 'Under $3,000' && (
                <div className="mt-6 bg-gradient-to-r from-wealth-charcoal to-black border border-wealth-gold/30 p-5 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-wealth-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-widest text-wealth-gold">Projected Impact</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Est. New HNW Clients</p>
                      <p className="text-2xl text-white font-serif">{roi.clients} <span className="text-sm text-gray-500">/mo</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Potential AUM Growth</p>
                      <p className="text-2xl text-white font-serif">{roi.aum} <span className="text-sm text-gray-500">/yr</span></p>
                    </div>
                  </div>
                </div>
              )}

              {/* Disqualification */}
              {isDisqualified && currentQuestion.id === 'budget_confirmation' && (
                <div className="mt-6 bg-red-900/20 border border-red-900/50 p-6 animate-fadeIn">
                  <h3 className="text-red-400 font-bold mb-2">Application Paused</h3>
                  <p className="text-gray-400 text-sm">
                    Our system requires a minimum investment of $3,000/month in media spend to generate qualified HNW leads.
                    When your budget allows, we'd be happy to continue this conversation.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-3xl mx-auto w-full mt-8 flex justify-between items-center">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            currentIndex === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!isCurrentValid() || isSubmitting || isDisqualified}
          className={`px-8 py-3 text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
            !isCurrentValid() || isDisqualified
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-white text-black hover:bg-wealth-gold hover:text-white'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Verifying...
            </>
          ) : currentIndex === totalQuestions - 1 ? (
            'Submit Application'
          ) : (
            <>
              OK
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.4s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.4s ease-out; }
      `}</style>
    </section>
  );
};

export default ApplicationForm;
