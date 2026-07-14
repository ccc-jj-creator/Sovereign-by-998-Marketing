import React from 'react';

const Philosophy: React.FC = () => {
  const cards = [
    {
      icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
      title: "Zero Fees or Commissions",
      desc: "Traditional sales cost you 6% in agent fees, plus closing costs. We cover all closing costs and charge zero commissions, meaning more money stays in your pocket."
    },
    {
      icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
      title: "We Buy As-Is",
      desc: "Don't spend thousands on a new roof, painting, or staging. We buy properties in their exact current condition. Leave whatever you don't want behind."
    },
    {
      icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>,
      title: "Certainty & Speed",
      desc: "No financing contingencies, no appraisals falling through, no picky buyers. We have the capital to close on your exact timeline, whether that's 7 days or 6 months."
    }
  ];

  return (
    <section className="py-24 bg-white text-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">The Advantage</h3>
          <h2 className="text-4xl md:text-6xl font-serif font-medium">
            A Better Way to Sell.
          </h2>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl leading-relaxed">
            The traditional real estate market is designed to extract fees from sellers while adding months of stress. We cut out the middlemen to provide a seamless, direct transaction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {cards.map((card, idx) => (
            <div key={idx} className="border-t border-black/10 pt-8 group hover:bg-gray-50 transition-colors duration-500 p-4">
              <div className="mb-6 text-wealth-black opacity-80 group-hover:text-wealth-gold-dim transition-colors">
                {card.icon}
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">{card.title}</h4>
              <p className="text-gray-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;