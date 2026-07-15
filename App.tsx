import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import AIAudit from './components/AIAudit';
import CostOfInaction from './components/CostOfInaction';
import PedigreeMap from './components/PedigreeMap';
import LiveTicker from './components/LiveTicker';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';
import SMSTerms from './components/SMSTerms';

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname;
    if (path === '/privacy' || path === '/terms' || path === '/contact' || path === '/sms-terms') {
      return path;
    }
    return window.location.hash;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/privacy' || path === '/terms' || path === '/contact' || path === '/sms-terms') {
        setCurrentRoute(path);
      } else {
        setCurrentRoute(window.location.hash);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const renderContent = () => {
    if (currentRoute === '#/privacy' || currentRoute === '/privacy') {
      return <PrivacyPolicy />;
    } else if (currentRoute === '#/terms' || currentRoute === '/terms') {
      return <TermsOfService />;
    } else if (currentRoute === '#/contact' || currentRoute === '/contact') {
      return <Contact />;
    } else if (currentRoute === '#/sms-terms' || currentRoute === '/sms-terms') {
      return <SMSTerms />;
    }

    return (
      <>
        <Hero />
        
        {/* Social Proof */}
        <section className="py-12 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
              <p className="text-xs text-center font-bold tracking-[0.2em] text-gray-600 uppercase mb-8">
              Trusted By Homeowners & Real Estate Professionals
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
                  <span className="text-xl font-serif font-bold text-gray-400">ZILLOW</span>
                  <span className="text-xl font-serif font-bold text-gray-400">REDFIN</span>
                  <span className="text-xl font-serif font-bold text-gray-400">TRULIA</span>
                  <span className="text-xl font-serif font-bold text-gray-400">REALTOR.COM</span>
                  <span className="text-xl font-serif font-bold text-gray-400">TITLE CO.</span>
              </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="py-24 px-6 bg-wealth-black">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
              <div>
              <h3 className="text-xs font-bold tracking-[0.2em] text-wealth-gold uppercase mb-4">The Problem</h3>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">
                  The Traditional <br /> Real Estate Model is Broken.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                  Listing on the MLS means months of uncertainty, dealing with picky buyers, paying 6% in agent commissions, and making expensive repairs just to get an offer.
              </p>
              <p className="text-gray-400 leading-relaxed">
                  We provide a predictable, stress-free alternative. We buy properties directly from you—whether that means an all-cash offer, seller financing, or purchasing subject-to your existing mortgage.
              </p>
              </div>
              <div className="space-y-8">
                  {[
                      { title: "Zero Commissions or Fees", desc: "Keep more of your equity. You pay no agent commissions or hidden closing costs." },
                      { title: "Sell As-Is", desc: "No repairs, no staging, no cleaning. We buy properties in their exact current condition." },
                      { title: "Flexible Closing Timeline", desc: "Need to close in 7 days? Or 60 days? You choose the closing date that works for you." }
                  ].map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                          <div className="w-12 h-[1px] bg-gray-700 mt-3 flex-shrink-0"></div>
                          <div>
                          <h4 className="text-white font-medium text-lg mb-2">{item.title}</h4>
                          <p className="text-gray-500 text-sm">{item.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </section>

        <CostOfInaction />
        <AIAudit />
        <Philosophy />
        <PedigreeMap />
        <ApplicationForm />
      </>
    );
  };

  return (
    <div className="bg-wealth-black text-white min-h-screen font-sans pb-10">
      <Navbar />
      {renderContent()}
      <Footer />
      <LiveTicker />
    </div>
  );
}

export default App;