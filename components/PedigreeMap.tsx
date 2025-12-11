import React from 'react';

const PedigreeMap: React.FC = () => {
  // Simple CSS-based map representation
  return (
    <section id="pedigree" className="py-24 bg-wealth-black relative border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Institutional Reach.</h2>
                    <p className="text-gray-400 text-lg">
                        We engineered the creative infrastructure for the industry's loudest voices. Now, we bring that same institutional standard to your private practice.
                    </p>
                </div>
                <div className="flex gap-4 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-wealth-gold rounded-full"></span>
                        Active Systems
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                        Target Markets
                    </div>
                </div>
            </div>

            <div className="relative w-full aspect-[2/1] bg-wealth-charcoal border border-white/10 p-8 overflow-hidden group">
                {/* Abstract Map Background */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center bg-no-repeat grayscale invert"></div>
                
                {/* Scanning Line */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wealth-gold/5 to-transparent h-[20%] w-full animate-[scan_4s_linear_infinite] pointer-events-none"></div>

                {/* Nodes */}
                <div className="absolute top-[30%] left-[20%]"> {/* NY */}
                     <div className="w-3 h-3 bg-wealth-gold rounded-full animate-ping absolute"></div>
                     <div className="w-3 h-3 bg-wealth-gold rounded-full relative"></div>
                     <div className="absolute top-4 left-4 text-[10px] text-white bg-black/80 px-2 py-1 border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">New York: Active</div>
                </div>

                <div className="absolute top-[35%] left-[15%]"> {/* LA */}
                     <div className="w-2 h-2 bg-wealth-gold rounded-full animate-pulse absolute" style={{animationDelay: '1s'}}></div>
                     <div className="w-2 h-2 bg-wealth-gold rounded-full relative"></div>
                </div>

                <div className="absolute top-[25%] left-[48%]"> {/* London */}
                     <div className="w-3 h-3 bg-wealth-gold rounded-full animate-ping absolute" style={{animationDelay: '2s'}}></div>
                     <div className="w-3 h-3 bg-wealth-gold rounded-full relative"></div>
                     <div className="absolute top-4 left-4 text-[10px] text-white bg-black/80 px-2 py-1 border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">London: Active</div>
                </div>

                <div className="absolute top-[40%] left-[80%]"> {/* Tokyo */}
                     <div className="w-2 h-2 bg-white/50 rounded-full absolute"></div>
                </div>
                
                <div className="absolute top-[70%] left-[85%]"> {/* Sydney */}
                     <div className="w-2 h-2 bg-white/50 rounded-full absolute"></div>
                </div>
                
                <div className="absolute top-[60%] left-[30%]"> {/* Brazil */}
                     <div className="w-2 h-2 bg-white/50 rounded-full absolute"></div>
                </div>
            </div>
            
            <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
                Visual representation of market reach.
            </p>
        </div>
        
        <style>{`
            @keyframes scan {
                0% { transform: translateY(-100%); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateY(500%); opacity: 0; }
            }
        `}</style>
    </section>
  );
};

export default PedigreeMap;