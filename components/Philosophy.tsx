import React from 'react';
import { ShieldAlert, Filter, Building2 } from 'lucide-react';

const Philosophy: React.FC = () => {
  const cards = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Asset-Class Creative",
      desc: "We produce broadcast-quality media assets that position your firm alongside hedge funds and private banks, not local insurance salesmen."
    },
    {
      icon: <Filter className="w-8 h-8" />,
      title: "The Sovereign Filter",
      desc: "Our aesthetic is designed to repel 'tire kickers' and exclusively attract high-net-worth individuals who value premium service."
    },
    {
      icon: <ShieldAlert className="w-8 h-8" />,
      title: "Institutional Authority",
      desc: "We leverage the same visual psychology used by global financial institutions to build instant trust before you ever speak to the prospect."
    }
  ];

  return (
    <section className="py-24 bg-white text-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">The Philosophy</h3>
          <h2 className="text-4xl md:text-6xl font-serif font-medium">
            Wealth Repellent.
          </h2>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl leading-relaxed">
            Cheap ads attract cheap leads. To attract a $5M client, your marketing must look as expensive as your advice. We don't just "run ads"—we install institutional-grade creative infrastructure.
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