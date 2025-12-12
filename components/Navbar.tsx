import React, { useState, useEffect } from 'react';
import { useTypeformModal } from './TypeformModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useTypeformModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-wealth-black/95 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold tracking-tighter text-white cursor-pointer select-none" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          SOVEREIGN<span className="text-wealth-gold">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {['Methodology', 'Pedigree', 'Audit'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-xs font-medium tracking-[0.2em] text-gray-400 hover:text-white transition-colors uppercase"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => openModal('Navbar Desktop')}
            className="px-6 py-2 border border-white/20 text-xs font-medium tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all uppercase"
          >
            Apply Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-wealth-black border-b border-white/10 p-6 flex flex-col space-y-6 md:hidden">
           {['Methodology', 'Pedigree', 'Audit'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-medium tracking-widest text-gray-300 hover:text-white uppercase text-left"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => { openModal('Navbar Mobile'); setIsMobileMenuOpen(false); }}
            className="block text-center py-3 border border-white/20 text-sm font-medium tracking-widest text-white hover:bg-white hover:text-black transition-all uppercase"
          >
            Apply Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
