import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import AIAudit from './components/AIAudit';
import CostOfInaction from './components/CostOfInaction';
import PedigreeMap from './components/PedigreeMap';
import LiveTicker from './components/LiveTicker';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';
import FormModal from './components/FormModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-wealth-black text-white min-h-screen font-sans pb-10">
      <Navbar onApplyClick={openModal} />
      <Hero onApplyClick={openModal} />
      
      {/* Social Proof */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs text-center font-bold tracking-[0.2em] text-gray-600 uppercase mb-8">
            Deploying Capital Across Global Networks
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
                <span className="text-xl font-serif font-bold text-gray-400">LINKEDIN</span>
                <span className="text-xl font-serif font-bold text-gray-400">YOUTUBE</span>
                <span className="text-xl font-serif font-bold text-gray-400">GOOGLE</span>
                <span className="text-xl font-serif font-bold text-gray-400">META</span>
                <span className="text-xl font-serif font-bold text-gray-400">PROGRAMMATIC</span>
            </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-24 px-6 bg-wealth-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
            <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-wealth-gold uppercase mb-4">The Problem</h3>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">
                The "Hope Marketing" <br /> Era is Over.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
                Most financial advisors rely on a broken tripod of growth: Seminars, Cold Calling, and Passive Referrals. 
                In a digital-first economy, high-net-worth individuals ignore noise. They seek authority.
            </p>
            <p className="text-gray-400 leading-relaxed">
                If you cannot predictably buy a meeting with a qualified investor for a known cost, you do not have a business. You have a job.
            </p>
            </div>
            <div className="space-y-8">
                {[
                    { title: "Inconsistent Deal Flow", desc: "Feast or famine cycles that prevent hiring and scaling." },
                    { title: "Unqualified Prospects", desc: "Wasting hours on coffee meetings with people who have no assets to manage." },
                    { title: "No Differentiation", desc: "Sounding exactly like every other 'fiduciary' in your zip code." }
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
      <Footer />
      <LiveTicker />

      {/* Form Modal */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;