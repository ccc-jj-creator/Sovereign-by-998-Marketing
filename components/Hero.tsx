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
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* 1. Grain Texture (SVG Noise) - Adds 'film' quality */}
        <div className="absolute inset-0 opacity-[0.03] z-20 mix-blend-overlay">
            <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
                <filter id='noiseFilter'>
                    <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>
                </filter>
                <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
            </svg>
        </div>

        {/* 2. Dark Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-wealth-black via-[#0a0a0a] to-[#111]"></div>

        {/* 3. Animated Gold Nebulas */}
        <div 
            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-wealth-gold/10 rounded-full blur-[120px] animate-pulse-glow mix-blend-screen"
            style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        ></div>
        <div 
            className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#4a4a4a]/20 rounded-full blur-[100px] animate-pulse-glow"
             style={{ animationDelay: '2s', transform: `translateY(${-offsetY * 0.1}px)` }}
        ></div>

        {/* 4. Perspective Grid (CSS) */}
        <div 
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
                transformOrigin: 'top center',
                maskImage: 'linear-gradient(to bottom, transparent, black 40%, transparent)'
            }}
        ></div>
        
        {/* 5. Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] z-10"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full mt-12 md:mt-0">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          
          <div className="inline-flex items-center space-x-3 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="h-[1px] w-8 bg-wealth-gold"></div>
            <span className="text-wealth-gold text-xs font-bold tracking-[0.3em] uppercase">Private Wealth Infrastructure</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-medium leading-[0.95] tracking-tight text-white mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            WE SCALE <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">PRACTICES.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 animate-fade-in opacity-0 md:border-l border-wealth-gold md:pl-8 mx-auto md:mx-0 text-left" style={{ animationDelay: '0.5s' }}>
            Stop chasing referrals. We install the <span className="text-white font-medium">Sovereign Client Acquisition System™</span> into your firm to predictably add $10M-$50M in AUM within 90 days.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 animate-fade-in opacity-0 justify-center md:justify-start" style={{ animationDelay: '0.7s' }}>
            <button 
              onClick={() => scrollTo('contact')}
              className="relative px-10 py-5 bg-wealth-gold text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
            >
              Book Strategy Session
            </button>
            
            <button 
              onClick={() => scrollTo('pedigree')}
              className="px-10 py-5 bg-transparent border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              View Market Pedigree
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;