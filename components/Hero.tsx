import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-wealth-black">
      
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 1. Deep Space Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-black"></div>

        {/* 2. The Golden Fog (Top Light) */}
        <div className="absolute top-[-10%] left-0 right-0 h-[800px] opacity-30 bg-[radial-gradient(circle_at_top_center,_var(--tw-gradient-stops))] from-wealth-gold/40 via-transparent to-transparent blur-[100px]"></div>

        {/* 3. The Floor Grid (Perspective) */}
        <div 
            className="absolute inset-0 opacity-[0.07]"
            style={{
                backgroundSize: '40px 40px',
                backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
                transform: 'perspective(1000px) rotateX(60deg) translateY(0px) translateZ(-200px)',
                transformOrigin: 'bottom center',
                maskImage: 'linear-gradient(to bottom, transparent 20%, black 100%)',
                height: '200%', // Extended height for perspective
                bottom: '-50%'
            }}
        ></div>

        {/* 4. Film Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
             <svg className='w-full h-full'>
                <filter id='noise'>
                    <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>
                </filter>
                <rect width='100%' height='100%' filter='url(#noise)'/>
            </svg>
        </div>

      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full mt-12 md:mt-0">
        <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
          
          <div className="inline-flex items-center space-x-3 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="h-[1px] w-12 bg-wealth-gold shadow-[0_0_10px_#D4AF37]"></div>
            <span className="text-wealth-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-shadow-gold">Private Wealth Infrastructure</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.9] tracking-tighter text-white mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            WE SCALE <br />
            <span className="bg-gradient-to-b from-white via-gray-300 to-gray-600 bg-clip-text text-transparent drop-shadow-2xl">PRACTICES.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 animate-fade-in opacity-0 md:border-l border-wealth-gold/50 md:pl-8 mx-auto md:mx-0" style={{ animationDelay: '0.5s' }}>
            Stop chasing referrals. We install the <span className="text-white font-medium border-b border-wealth-gold/30 pb-1">Sovereign Client Acquisition System™</span> into your firm to predictably add $10M-$50M in AUM within 90 days.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 animate-fade-in opacity-0 justify-center md:justify-start" style={{ animationDelay: '0.7s' }}>
            <button 
              onClick={() => scrollTo('contact')}
              className="relative px-10 py-5 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-wealth-gold hover:text-white transition-all duration-500 ease-out shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Book Strategy Session
            </button>
            
            <button 
              onClick={() => scrollTo('pedigree')}
              className="px-10 py-5 bg-transparent border border-white/10 text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/5 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 group"
            >
              View Market Pedigree
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .text-shadow-gold {
            text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }
      `}</style>
    </header>
  );
};

export default Hero;