// Naziv komponente: ReleasesSection
import React from 'react';
import ReleaseItem from '../components/releases/ReleaseItem';
import { MOCK_RELEASES } from '../data/mockData';
import type { Release, PathName } from '../data/types';

// Simulišemo Link komponentu
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

interface ExtendedRelease extends Release {
    coverUrl: string;
    colorClass: string;
}

const ReleasesSection: React.FC = () => {
  const featuredReleases = MOCK_RELEASES.slice(0, 4) as ExtendedRelease[];

  return (
    <section id="izdanja" className="bg-black text-white py-32 px-4 min-h-screen relative overflow-hidden">
      
      {/* --- DEKORATIVNI MARQUEE POZADINA --- */}
      <div className="absolute top-10 left-0 w-full overflow-hidden opacity-10 pointer-events-none select-none">
        <div className="whitespace-nowrap animate-marquee">
            <span className="text-[10rem] font-black font-mono text-white mx-4">NOVO IZDANJE //</span>
            <span className="text-[10rem] font-black font-mono text-transparent stroke-text mx-4" style={{ WebkitTextStroke: '2px white' }}>POSLEDNJI ZVUK //</span>
            <span className="text-[10rem] font-black font-mono text-white mx-4">NOVO IZDANJE //</span>
            <span className="text-[10rem] font-black font-mono text-transparent stroke-text mx-4" style={{ WebkitTextStroke: '2px white' }}>POSLEDNJI ZVUK //</span>
        </div>
      </div>

      {/* Dodavanje CSS-a za animaciju marquee-a direktno */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SEKCIJE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b-4 border-white pb-6">
            <div>
                <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-2">
                    IZDANJA
                </h2>
                <p className="text-xl font-mono text-gray-400">Arhiva digitalnog i analognog šuma.</p>
            </div>
            <Link to="/izdanja" className="hidden md:block text-lg font-mono bg-white text-black px-6 py-3 hover:bg-red-600 hover:text-white transition-colors border-2 border-transparent hover:border-white">
                POGLEDAJ KATALOG
            </Link>
        </div>
        
        {/* GRID - MODERNIZOVAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
          {featuredReleases.map((release, index) => (
            <div 
              key={release.id} 
              className={`transform transition-all duration-500 hover:z-20
                ${index % 2 !== 0 ? 'md:translate-y-12' : ''} // Asimetrični 'stagger' efekat
              `}
            >
              <ReleaseItem release={release} /> 
            </div>
          ))}
        </div>
        
        {/* Link za mobilni (dole) */}
        <div className="md:hidden text-center mt-24">
            <Link to="/izdanja" className="inline-block w-full text-center text-xl font-mono bg-white text-black px-6 py-4 font-bold border-4 border-white hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
                POGLEDAJ SVE
            </Link>
        </div>
      </div>
    </section>
  );
};

export default ReleasesSection;