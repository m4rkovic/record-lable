// Naziv komponente: ReleasesSection
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import ReleaseItem from '../components/releases/ReleaseItem';
import { MOCK_RELEASES } from '../data/mockData';
// U pravom projektu: import { Link } from 'react-router-dom';
const Link: React.FC<React.PropsWithChildren<{ to: string }>> = ({ to, children }) => (
  <a href={`#${to}`}>{children}</a> 
);

// Sekcija za prikaz nekoliko najnovijih izdanja na HomePage (SADA U GRIDU)
const ReleasesSection: React.FC = () => (
  <section id="izdanja" className="bg-black text-white py-20 px-4 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="POSLEDNJA IZDANJA" color="border-yellow-400" skew={false} />
      
      {/* Grid Kontejner sa asimetričnim rasporedom */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_RELEASES.map((release, index) => (
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
            <ReleaseItem release={release as any} /> 
          </div>
        ))}
      </div>
      
      <Link to="/izdanja">
        <p className="text-center mt-12 text-xl font-mono text-red-600 cursor-pointer hover:text-yellow-400 transition duration-150">
          KOMPLETAN KATALOG {'>'}{'>'}{'>'}{'>'}
        </p>
      </Link>
    </div>
  </section>
);

export default ReleasesSection;