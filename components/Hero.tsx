import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wealth-gold/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-5xl">
          <div className="inline-flex items-center space-x-2 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <span className="w-12 h-[1px] bg-wealth-gold"></span>
            <span className="text-wealth-gold text-xs font-bold tracking-[0.3em] uppercase">Institutional Grade Systems</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.9] tracking-tight text-white mb-10 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            WE SCALE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">WEALTH.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 border-l border-wealth-gold pl-6 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            Stop chasing referrals. We install the <span className="text-white font-medium">Sovereign Client Acquisition System™</span> into your firm to predictably add $10M-$50M in AUM within 90 days.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => scrollTo('contact')}
              className="group relative px-8 py-4 bg-white text-black text-sm font-semibold tracking-widest uppercase overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book Strategy Session</span>
              <div className="absolute inset-0 bg-wealth-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left"></div>
            </button>
            
            <button 
              onClick={() => scrollTo('pedigree')}
              className="group px-8 py-4 bg-transparent border border-white text-white text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
            >
              View Market Pedigree
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;