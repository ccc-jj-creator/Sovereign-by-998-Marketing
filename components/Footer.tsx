import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/10 bg-black px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>&copy; 2024 Sovereign Wealth Systems | A Division of 998 Marketing LLC. All Rights Reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Earnings Disclaimer</a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;