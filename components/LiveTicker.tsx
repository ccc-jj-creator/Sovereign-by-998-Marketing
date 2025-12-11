import React from 'react';

const LiveTicker: React.FC = () => {
  const activities = [
    "New Strategy Session Booked - New York, NY",
    "Market Analysis Generated - Family Office / Miami",
    "Partner Application Received - London, UK",
    "Value Audit Completed - Independent RIA",
    "System Deployed - Dallas, TX",
    "New Strategy Session Booked - Los Angeles, CA",
    "Market Analysis Generated - Hybrid RIA / Chicago",
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-wealth-gold/20 backdrop-blur-md z-40 h-10 flex items-center overflow-hidden pointer-events-none">
      <div className="flex items-center space-x-2 px-4 bg-wealth-gold/10 h-full border-r border-wealth-gold/20 z-10 shrink-0">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-bold tracking-widest text-wealth-gold uppercase whitespace-nowrap">System Active</span>
      </div>
      
      <div className="overflow-hidden flex-1 relative">
         <div className="animate-[slideLeft_30s_linear_infinite] whitespace-nowrap flex items-center">
            {activities.map((activity, index) => (
                <div key={index} className="inline-flex items-center mx-8">
                     <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium font-sans">
                        {activity}
                     </span>
                     <span className="mx-4 text-wealth-gold/30">•</span>
                </div>
            ))}
            {/* Duplicate for seamless loop */}
            {activities.map((activity, index) => (
                <div key={`dup-${index}`} className="inline-flex items-center mx-8">
                     <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium font-sans">
                        {activity}
                     </span>
                     <span className="mx-4 text-wealth-gold/30">•</span>
                </div>
            ))}
         </div>
      </div>
      
      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default LiveTicker;