import React, { useEffect, useState } from 'react';

interface HeroProps {
  onApplyClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
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
      
      {/* --- SOVEREIGN DATA HORIZON BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#020202]">
        
        {/* 1. The Perspective Grid */}
        <div 
            className="absolute inset-0 opacity-20"
            style={{
                transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
                backgroundImage: `
                  linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                height: '250%',
                width: '100%',
                bottom: '-50%',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 100%)'
            }}
        >
            {/* Moving Floor Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wealth-gold/10 to-transparent animate-scan"></div>
        </div>

        {/* 2. Ambient Gold Aurora (Top) */}
        <div className="absolute -top-[20%] left-0 right-0 h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-wealth-gold/20 via-transparent to-transparent blur-[80px]"></div>

        {/* 3. Floating Particles */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="#D4AF37" fillOpacity="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* 4. Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full mt-12 md:mt-0">
        <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
          
          <div className="inline-flex items-center space-x-3 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="h-[1px] w-12 bg-wealth-gold shadow-[0_0_15px_#D4AF37]"></div>
            <span className="text-wealth-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-shadow-gold">Sovereign Architecture</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.9] tracking-tighter text-white mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            WE SCALE <br />
            <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-b from-white via-gray-200 to-gray-600 bg-clip-text text-transparent">PRACTICES.</span>
                <span className="absolute -inset-1 bg-wealth-gold/10 blur-xl -z-10"></span>
            </span>
          </h1>
          
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 md:border-l-2 border-wealth-gold pl-6 mx-auto md:mx-0">
                Stop chasing referrals. We install the <span className="text-white font-medium">Sovereign Client Acquisition System™</span> into your firm to predictably add <span className="text-wealth-gold">$10M-$50M in AUM</span> within 90 days.
              </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 animate-fade-in opacity-0 justify-center md:justify-start" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={onApplyClick}
              className="relative px-10 py-5 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-wealth-gold hover:text-white transition-all duration-300 ease-out shadow-[0_0_30px_rgba(255,255,255,0.15)] group overflow-hidden"
            >
              <span className="relative z-10">Book Strategy Session</span>
              <div className="absolute inset-0 bg-white group-hover:scale-105 transition-transform duration-300"></div>
            </button>
            
            <button 
              onClick={() => scrollTo('pedigree')}
              className="px-10 py-5 bg-transparent border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase hover:border-wealth-gold/50 hover:bg-wealth-gold/5 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 group"
            >
              View Market Pedigree
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 text-wealth-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .text-shadow-gold {
            text-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
        }
      `}</style>
    </header>
  );
};

export default Hero;