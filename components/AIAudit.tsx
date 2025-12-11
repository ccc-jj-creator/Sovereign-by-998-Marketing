import React, { useState } from 'react';
import { generateHooks, roastPositioning, HookResult, RoastResult } from '../services/geminiService';

const AIAudit: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState('');
  const [pitch, setPitch] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [hookResults, setHookResults] = useState<HookResult[] | null>(null);
  const [roastResults, setRoastResults] = useState<RoastResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche || !goal || !pitch) return;
    
    setLoading(true);
    setError('');
    setHookResults(null);
    setRoastResults(null);
    
    try {
      const [hooks, roast] = await Promise.all([
        generateHooks(niche, goal),
        roastPositioning(pitch)
      ]);
      setHookResults(hooks);
      setRoastResults(roast);
    } catch (err) {
      setError('Analysis failed. Please ensure API Key is valid and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Simple visual calculation for the chart
  const userScore = roastResults ? roastResults.score : 20;

  return (
    <section id="audit" className="py-24 bg-wealth-charcoal relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/40 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Input Side */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg className="text-wealth-gold w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 21h4"/><path d="M17 3h4"/></svg>
              <span className="text-xs font-bold tracking-[0.2em] text-wealth-gold uppercase">
                AI Value Analysis
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              Does your offer <span className="italic text-gray-500">resonate</span> with the 1%?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Most advisors fail because they sound like everyone else. 
              Use our proprietary AI model (powered by Gemini) to audit your niche and generate 
              high-net-worth messaging instantly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Target Niche
                </label>
                <input 
                  type="text" 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="Ex: Tech Founders exiting via IPO"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                  AUM Growth Goal
                </label>
                <input 
                  type="text" 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="Ex: $50M in 12 months"
                  required
                />
              </div>

               <div>
                   <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Current Headline / Value Proposition</label>
                   <textarea 
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                      className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold focus:outline-none transition-colors placeholder-gray-700 min-h-[100px]"
                      placeholder="Ex: We provide comprehensive fiduciary financial planning services to help you reach your goals..."
                      required
                   />
                </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto py-4 px-8 text-sm font-semibold tracking-widest uppercase transition-all duration-300 bg-white text-black hover:bg-wealth-gold hover:text-white border border-transparent flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Generate Authority Hooks'}
                {!loading && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                )}
              </button>
            </form>
          </div>

          {/* Results Side */}
          <div className="bg-wealth-black border border-white/5 p-8 min-h-[500px] flex flex-col justify-center relative">
            
            {/* Idle State */}
            {!loading && !hookResults && !roastResults && !error && (
              <div className="text-center text-gray-600">
                <p className="text-sm tracking-widest uppercase">Waiting for input...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center text-red-400 flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Combined Results State */}
            {(hookResults || roastResults) && (
              <div className="space-y-8 w-full">
                
                {/* ROAST SECTION */}
                {roastResults && (
                    <div className="border-b border-white/10 pb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold tracking-widest text-white uppercase">Positioning Audit</h3>
                            <div className={`px-3 py-1 text-xs font-bold border ${roastResults.score > 50 ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                                SCORE: {roastResults.score}/100
                            </div>
                        </div>
                        <div className="bg-red-900/10 border-l-2 border-red-500/50 p-4 mb-4">
                            <p className="text-white text-md font-serif italic">"{roastResults.critique}"</p>
                        </div>
                        <p className="text-xs text-wealth-gold uppercase tracking-widest mb-2">Sovereign Rewrite</p>
                        <div className="bg-wealth-gold/5 border-l-2 border-wealth-gold p-4">
                             <p className="text-white text-md font-medium">"{roastResults.rewrite}"</p>
                        </div>
                    </div>
                )}

                {/* VISUAL CHART (CSS BASED) */}
                <div className="py-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Luxury Perception Gap</p>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Your Current Positioning</span>
                                <span>{userScore}/100</span>
                            </div>
                            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-gray-500 h-full transition-all duration-1000" style={{ width: `${userScore}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span className="text-wealth-gold">Sovereign Standard</span>
                                <span className="text-wealth-gold">98/100</span>
                            </div>
                            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-wealth-gold h-full transition-all duration-1000" style={{ width: '98%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HOOKS SECTION */}
                {hookResults && (
                    <div className="space-y-6">
                         <div className="flex justify-between items-end">
                            <h3 className="text-sm font-bold tracking-widest text-white uppercase">
                                Exclusive Market Angles
                            </h3>
                         </div>
                        {hookResults.map((hook, idx) => (
                            <div key={idx} className="group border-l-2 border-white/10 hover:border-wealth-gold pl-4 transition-all duration-300 cursor-default">
                                <h4 className="text-lg text-white font-medium mb-1 group-hover:text-wealth-gold transition-colors">"{hook.headline}"</h4>
                                <p className="text-sm text-gray-400 mb-2">{hook.subheadline}</p>
                                <p className="text-xs text-gray-600 italic">Strategy: {hook.rationale}</p>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            )}
            
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 bg-wealth-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                    <div className="w-8 h-8 border-2 border-wealth-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xs text-wealth-gold uppercase tracking-widest">Running Sovereign Analysis...</p>
                </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIAudit;