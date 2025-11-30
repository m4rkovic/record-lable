// Naziv komponente: ReleaseItem
import React, { useState } from 'react';
import type { Release, PathName } from '../../data/types'; 

// Link simulacija
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

interface ExtendedRelease extends Release {
  coverUrl: string;
  colorClass: string;
}

const ReleaseItem: React.FC<{ release: ExtendedRelease }> = ({ release }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mapiranje boja za border/tekst na osnovu klase pozadine
  const getAccentColor = () => {
     if (release.colorClass.includes('red')) return 'text-red-500 border-red-500';
     if (release.colorClass.includes('yellow')) return 'text-yellow-400 border-yellow-400';
     if (release.colorClass.includes('indigo')) return 'text-indigo-400 border-indigo-400';
     return 'text-white border-white';
  };

  const accentClass = getAccentColor();

  return (
    <div 
      className="relative w-full group cursor-pointer perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pozadinski "Shadow" blok za 3D efekat */}
      <div className={`absolute top-2 left-2 w-full h-full border-2 ${accentClass} bg-transparent z-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2`}></div>

      {/* Glavna Kartica */}
      <div className={`relative z-10 w-full h-full border-2 border-black ${release.colorClass} p-6 flex flex-col justify-between min-h-[320px] transition-transform duration-300 group-hover:-translate-y-1`}>
        
        {/* Header kartice */}
        <div className="flex justify-between items-start border-b-2 border-black/20 pb-4 mb-4">
            <span className="font-mono text-xs font-bold bg-black text-white px-2 py-1">
                {release.id}
            </span>
            <span className="font-mono text-xl font-extrabold text-black/80 group-hover:text-white transition-colors">
                {release.year}
            </span>
        </div>

        {/* Sadržaj (Naslov i Izvođač) */}
        <div className="relative z-20">
            <h3 className="text-4xl md:text-5xl font-extrabold leading-none text-black mb-2 tracking-tighter group-hover:text-white transition-colors break-words">
                {release.title.toUpperCase()}
            </h3>
            <p className="font-mono text-lg font-bold text-black/70 group-hover:text-white transition-colors">
                {release.artist}
            </p>
        </div>

        {/* Footer kartice (Format i Akcija) */}
        <div className="mt-6 flex justify-between items-end">
            <div className="flex flex-col">
                <span className="text-[0.6rem] font-mono uppercase text-black/60 mb-1">FORMAT</span>
                <span className="text-2xl font-black text-black border-2 border-black px-2 bg-white/20 backdrop-blur-sm">
                    {release.format}
                </span>
            </div>
            
            {/* Dugme koje se pojavljuje na hover */}
            <div className={`transform transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <Link to={`/izdanja/${release.id}` as PathName} className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-white hover:text-black transition-colors border-2 border-black">
                    SLUŠAJ 
                </Link>
            </div>
        </div>

        {/* Slika koja se pojavljuje kao overlay na hover (opciono, ako želiš onaj 'reveal' efekat) */}
        <div 
            className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-500 ease-out pointer-events-none mix-blend-multiply ${isHovered ? 'opacity-20' : 'opacity-0'}`}
            style={{ 
                backgroundImage: `url(${release.coverUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                filter: 'grayscale(100%) contrast(120%)' 
            }}
        ></div>
      </div>
    </div>
  );
};

export default ReleaseItem;