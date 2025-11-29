// Naziv komponente: HeroSection
import React from 'react';

// CSS Animacija: pulsirajući crveni shadow
const customStyles = `
@keyframes pulse-glitch {
  0%, 100% { transform: scale(1); opacity: 1; filter: blur(0); }
  50% { transform: scale(1.02) skewX(-0.5deg); opacity: 0.95; filter: blur(0.5px); }
  75% { transform: scale(1.01) skewX(0.5deg); opacity: 0.9; }
}

.hero-glitch-pulse {
  animation: pulse-glitch 4s ease-in-out infinite;
}
`;

const HeroSection: React.FC = () => (
  <section id="hero" className="min-h-screen pt-24 bg-gray-900 flex items-center justify-center relative overflow-hidden">
    <style>{customStyles}</style>
    
    {/* Asimetrični grafički blokovi u pozadini (sa laganom animacijom) */}
    <div className="absolute top-0 right-0 h-full w-2/5 bg-red-800 opacity-20 transform -skew-y-3 origin-top-right md:w-1/3 hero-glitch-pulse"></div>
    <div className="absolute bottom-0 left-0 h-1/4 w-3/5 bg-yellow-400 opacity-20 transform skew-y-3 origin-bottom-left md:w-1/4 hero-glitch-pulse animation-delay-1000"></div>

    <div className="relative z-10 p-8 max-w-4xl mx-auto text-center">
      <h2 className="text-8xl md:text-[10rem] lg:text-[15rem] font-extrabold leading-none text-white font-mono tracking-tighter mix-blend-difference">
        <span className="block text-left -ml-4 md:-ml-8 bg-white text-black px-4 py-2 mb-4 transform -rotate-2">SIROVO</span>
        <span className="block text-right -mr-4 md:-mr-16 text-yellow-400 transform rotate-1 hero-glitch-pulse">IZDAVAŠTVO</span>
      </h2>
      <p className="mt-8 text-xl md:text-2xl text-white font-serif italic max-w-xl mx-auto border-t-2 border-b-2 border-white py-4 bg-black bg-opacity-50">
        Zvuk se ne prilagođava. On proždire.
      </p>
    </div>
  </section>
);

export default HeroSection;