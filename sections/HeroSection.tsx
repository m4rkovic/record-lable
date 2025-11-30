// Naziv komponente: HeroSection
import React, { useState, useEffect } from 'react';

// ПУТАЊЕ ДО СЛИКА ИЗ PUBLIC ФОЛДЕРА
const HERO_IMAGES = [
  "/images/hero/img1.jpg",
  "/images/hero/img2.jpg",
  "/images/hero/img3.jpg"
];

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Логика за аутоматско мењање слика (сваких 5 секунди)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
      {/* Додавање CSS анимације директно */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 40px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}
      </style>

      {/* --- ПОЗАДИНСКИ КАРУСЕЛ --- */}
      {HERO_IMAGES.map((imgUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out transform ${
            index === currentImageIndex ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 z-0'
          }`}
        >
          <img
            src={imgUrl}
            alt={`Hero slide ${index + 1}`}
            className="w-full h-full object-cover opacity-80 filter contrast-125"
          />
          {/* Агресивнији overlay за професионалнији изглед */}
          <div className="absolute inset-0 bg-red-900 mix-blend-multiply opacity-50"></div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      ))}

      {/* --- САДРЖАЈ --- */}
      <div className="relative z-20 flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
        {/* Главни Наслов */}
        <h1 className="relative flex flex-col items-center font-extrabold leading-none tracking-tighter select-none">
          <span className="text-[6rem] md:text-[12rem] lg:text-[15rem] text-white font-mono transform -rotate-2 mix-blend-difference drop-shadow-[0_10px_0_rgba(0,0,0,1)]">
            SIROVO
          </span>
          {/* Преклапање другог дела наслова */}
          <span className="text-[6rem] md:text-[12rem] lg:text-[15rem] text-red-600 font-mono transform rotate-1 -mt-10 md:-mt-20 lg:-mt-24 mix-blend-difference drop-shadow-[0_10px_0_rgba(0,0,0,1)] relative z-10">
            IZDAVAŠTVO
          </span>
        </h1>

        {/* Под-наслов као трака */}
        <div className="mt-20 transform -rotate-1">
          <p className="text-lg md:text-2xl text-black bg-yellow-400 font-mono inline-block px-8 py-3 border-4 border-black font-bold shadow-[8px_8px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
            ZVUK SE NE PRILAGOĐAVA. ON PROŽDIRE.
          </p>
        </div>
      </div>

      {/* --- ИНДИКАТОРИ И СКРОЛ --- */}
      <div className="absolute bottom-10 left-0 w-full flex flex-col items-center z-30 space-y-6">
          {/* Индикатори као линије */}
          <div className="flex space-x-3">
              {HERO_IMAGES.map((_, index) => (
                  <button
                      key={index}
                      className={`h-1.5 w-12 transition-all duration-500 ${
                          index === currentImageIndex ? 'bg-red-600 w-16' : 'bg-white/40 hover:bg-white'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Иди на слајд ${index + 1}`}
                  ></button>
              ))}
          </div>

          {/* Скрол индикатор */}
          <div className="animate-bounce cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
      </div>
    </section>
  );
};

export default HeroSection;

// // Naziv komponente: HeroSection
// import React, { useState, useEffect } from 'react';

// // PUTANJE DO SLIKA KOJE SI MI DAO (Moraš ih imati u public/images/hero/)
// const HERO_IMAGES = [
//   "/images/hero/img1.jpg", 
//   "/images/hero/img2.jpg",
//   "/images/hero/img3.jpg" 
// ];

// const HeroSection: React.FC = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Logika za automatsko menjanje slika (svakih 4 sekunde)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section id="hero" className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
      
//       {/* --- POZADINSKI KARUSEL SLIKA --- */}
//       {HERO_IMAGES.map((imgUrl, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${
//             index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
//           }`}
//         >
//           {/* Slika koja se polako zumira (Ken Burns efekat) za profi izgled */}
//           <img 
//             src={imgUrl} 
//             alt={`Hero slide ${index + 1}`} 
//             className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
//                 index === currentImageIndex ? 'scale-110' : 'scale-100'
//             }`}
//           />
          
//           {/* Overlay (Sloj preko slike) da tekst bude čitljiv */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
//         </div>
//       ))}

//       {/* --- SADRŽAJ (TEKST) --- */}
//       <div className="relative z-20 flex flex-col items-center justify-center p-4 text-center">
        
//         {/* Glavni Naslov - Brutalist Stil */}
//         <h1 className="relative font-extrabold leading-none tracking-tighter select-none">
//           <span className="block text-[15vw] md:text-[12rem] text-transparent stroke-text text-white font-mono transform -rotate-2 mix-blend-overlay" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>
//             SIROVO
//           </span>
//           <span className="block text-[12vw] md:text-[10rem] text-yellow-400 font-mono transform rotate-1 -mt-4 md:-mt-12 relative z-10 mix-blend-normal">
//             IZDAVAŠTVO
//           </span>
//         </h1>

//         {/* Pod-naslov / Slogan */}
//         <div className="mt-8 md:mt-12">
//           <p className="text-lg md:text-2xl text-black bg-white font-mono inline-block px-6 py-2 md:px-8 md:py-4 font-bold transform -skew-x-12 shadow-[8px_8px_0px_0px_rgba(255,0,0,1)]">
//             ZVUK SE NE PRILAGOĐAVA. ON PROŽDIRE.
//           </p>
//         </div>

//         {/* Indikatori (Dole) */}
//         <div className="absolute bottom-8 md:bottom-12 flex space-x-3 z-30">
//             {HERO_IMAGES.map((_, index) => (
//                 <button 
//                     key={index}
//                     className={`h-1 md:h-2 transition-all duration-500 ${
//                         index === currentImageIndex ? 'bg-red-600 w-12 md:w-16' : 'bg-white/50 w-6 md:w-8 hover:bg-white'
//                     }`}
//                     onClick={() => setCurrentImageIndex(index)}
//                     aria-label={`Slide ${index + 1}`}
//                 ></button>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;