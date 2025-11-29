// Naziv komponente: ReleaseItem
import React from 'react';
import type { Release } from '../../data/types'; 
// U pravom projektu: import { Link } from 'react-router-dom';
const Link: React.FC<React.PropsWithChildren<{ to: string, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

// Proširenje Release interfejsa za coverUrl i colorClass (iako smo to uradili u mockData, TypeScript bi zahtevao da bude ovde)
interface ExtendedRelease extends Release {
  coverUrl: string;
  colorClass: string;
}

// Kartica za prikaz pojedinačnog izdanja (za grid)
const ReleaseItem: React.FC<{ release: ExtendedRelease }> = ({ release }) => (
  <Link 
    to={`/izdanja/${release.id}`} // Link za detalje izdanja
    className={`
      flex flex-col border-4 border-white shadow-lg transition duration-300 transform 
      hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/50 
      group cursor-pointer block
      ${release.colorClass} // Boja se sada koristi za pozadinu
    `}
  >
    {/* Sekcija Slike/Covera */}
    <div className="aspect-square w-full overflow-hidden relative border-b-4 border-white">
      {/* Placeholder slika sa URL-om. U realnoj aplikaciji bi ovde bila slika iz /assets */}
      <img 
        src={release.coverUrl} 
        alt={`Cover art for ${release.title}`} 
        className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.05]"
        onError={(e) => { 
          // Fallback u slučaju greške pri učitavanju slike
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = `https://placehold.co/400x400/000000/FFFFFF?text=NO+IMAGE+ERR`; 
        }}
      />
      {/* Hover overlay za brutalistički efekat */}
      <div className="absolute inset-0 bg-black opacity-0 transition duration-300 group-hover:opacity-20"></div>
    </div>
    
    {/* Sekcija Detalja */}
    <div className="p-4 flex flex-col justify-between font-mono text-white">
      {/* LINK NA IZVOĐAČA */}
      <Link to={`/izvodjaci/${release.artistId}`} className="text-sm tracking-wider opacity-80 hover:text-red-600 transition">
        {release.artist.toUpperCase()}
      </Link>
      
      <h4 className="text-2xl font-bold truncate mt-1 leading-tight">{release.title.toUpperCase()}</h4>
      
      <div className="mt-4 flex justify-between items-center border-t-2 border-white pt-2">
        <span className="inline-block px-2 py-0.5 text-xs bg-yellow-400 text-black font-extrabold">
          {release.format}
        </span>
        <span className="text-xl font-bold text-yellow-400">{release.year}</span>
      </div>
    </div>
  </Link>
);

export default ReleaseItem;