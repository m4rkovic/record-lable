// Naziv komponente: HeroSection
import React, { useState, useEffect } from 'react';

// Linkovi ka slikama koje ste poslali
const HERO_IMAGES = [
  "https://townsquare.media/site/366/files/2021/06/attachment-metallica_james_hetfield_1992.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89&format=natural",
  "https://i.ebayimg.com/images/g/1y8AAOSw3Chkyp5~/s-l1200.png",
  "https://www.rollingstone.com/wp-content/uploads/2020/12/black-keys-brothers-era.jpg"
];

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Logika za automatsko menjanje slika (svakih 4 sekunde)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-black">
      
      {/* --- BACKGROUND CAROUSEL --- */}
      {HERO_IMAGES.map((imgUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={imgUrl} 
            alt={`Hero slide ${index + 1}`} 
            className="w-full h-full object-cover"
          />
          {/* Overlay da bi tekst bio čitljiviji preko slika */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      ))}

      {/* --- CONTENT OVERLAY --- */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-7xl md:text-[10rem] lg:text-[12rem] font-extrabold leading-none text-white font-mono tracking-tighter mix-blend-overlay filter drop-shadow-lg">
          <span className="block text-left -ml-4 md:-ml-12 transform -rotate-2">SIROVO</span>
          <span className="block text-right -mr-4 md:-mr-24 text-yellow-400 transform rotate-1 opacity-90">IZDAVAŠTVO</span>
        </h2>
        
        <p className="mt-12 text-xl md:text-3xl text-white font-serif italic max-w-2xl mx-auto border-t-4 border-b-4 border-white py-6 bg-black bg-opacity-60 backdrop-blur-sm">
          Zvuk se ne prilagođava. On proždire.
        </p>

        {/* Indikatori (tačkice) za slajdove - Brutalist style */}
        <div className="absolute bottom-10 flex space-x-4">
            {HERO_IMAGES.map((_, index) => (
                <div 
                    key={index}
                    className={`h-4 w-4 border-2 border-white cursor-pointer transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-red-600 scale-125' : 'bg-transparent hover:bg-white'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                ></div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// // Naziv komponente: HeroSection
// import React from 'react';

// // CSS Animacija: pulsirajući crveni shadow
// const customStyles = `
// @keyframes pulse-glitch {
//   0%, 100% { transform: scale(1); opacity: 1; filter: blur(0); }
//   50% { transform: scale(1.02) skewX(-0.5deg); opacity: 0.95; filter: blur(0.5px); }
//   75% { transform: scale(1.01) skewX(0.5deg); opacity: 0.9; }
// }

// .hero-glitch-pulse {
//   animation: pulse-glitch 4s ease-in-out infinite;
// }
// `;

// const HeroSection: React.FC = () => (
//   <section id="hero" className="min-h-screen pt-24 bg-gray-900 flex items-center justify-center relative overflow-hidden">
//     <style>{customStyles}</style>
    
//     {/* Asimetrični grafički blokovi u pozadini (sa laganom animacijom) */}
//     <div className="absolute top-0 right-0 h-full w-2/5 bg-red-800 opacity-20 transform -skew-y-3 origin-top-right md:w-1/3 hero-glitch-pulse"></div>
//     <div className="absolute bottom-0 left-0 h-1/4 w-3/5 bg-yellow-400 opacity-20 transform skew-y-3 origin-bottom-left md:w-1/4 hero-glitch-pulse animation-delay-1000"></div>

//     <div className="relative z-10 p-8 max-w-4xl mx-auto text-center">
//       <h2 className="text-8xl md:text-[10rem] lg:text-[15rem] font-extrabold leading-none text-white font-mono tracking-tighter mix-blend-difference">
//         <span className="block text-left -ml-4 md:-ml-8 bg-white text-black px-4 py-2 mb-4 transform -rotate-2">SIROVO</span>
//         <span className="block text-right -mr-4 md:-mr-16 text-yellow-400 transform rotate-1 hero-glitch-pulse">IZDAVAŠTVO</span>
//       </h2>
//       <p className="mt-8 text-xl md:text-2xl text-white font-serif italic max-w-xl mx-auto border-t-2 border-b-2 border-white py-4 bg-black bg-opacity-50">
//         Zvuk se ne prilagođava. On proždire.
//       </p>
//     </div>
//   </section>
// );

// export default HeroSection;