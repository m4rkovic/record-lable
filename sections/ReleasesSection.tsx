// Naziv komponente: ReleasesSection
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import ReleaseItem from '../components/releases/ReleaseItem';
import { MOCK_RELEASES } from '../data/mockData';
import type { Release, PathName } from '../data/types';

// Simulišemo Link komponentu (ili uvozimo pravu ako postoji)
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

interface ExtendedRelease extends Release {
    coverUrl: string;
    colorClass: string;
}

// Sekcija za prikaz nekoliko najnovijih izdanja na HomePage (SADA U GRIDU)
const ReleasesSection: React.FC = () => {
  // Uzimamo samo prva 4 izdanja za HomePage
  const featuredReleases = MOCK_RELEASES.slice(0, 4) as ExtendedRelease[];

  return (
    <section id="izdanja" className="bg-black text-white py-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="POSLEDNJA IZDANJA" color="border-yellow-400 bg-black text-white" skew={false} />
        
        {/* Grid Kontejner sa asimetričnim rasporedom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredReleases.map((release, index) => (
            <div 
              key={release.id} 
              // Asimetrični pomeraj: 
              // - Svaki drugi element na mobilnom
              // - Prvi element i treći element na desktopu se pomeraju dole
              className={`
                transform transition duration-300
                ${index % 2 === 1 ? 'mt-4 md:mt-0' : 'mt-0'} 
                ${(index === 0 || index === 2) ? 'lg:mt-6' : ''} 
              `}
            >
              <ReleaseItem release={release} /> 
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <Link to="/izdanja" className="text-xl font-mono text-red-600 cursor-pointer hover:text-yellow-400 transition duration-150 border-b-2 border-red-600 hover:border-yellow-400 pb-1">
            KOMPLETAN KATALOG {'>'}{'>'}{'>'}{'>'}
            </Link>
        </div>
      </div>
    </section>
  );
};

export default ReleasesSection;