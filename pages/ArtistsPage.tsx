// Naziv komponente: ArtistsPage
import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import FilterControls from '../components/shared/FilterControls'; // NOVI UVOZ
import { MOCK_ARTISTS } from '../data/mockData';
import type { Artist, PathName } from '../data/types';
// U pravom projektu: import { Link } from 'react-router-dom';
const Link: React.FC<React.PropsWithChildren<{ to: string, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

// Lokalna komponenta za karticu izvođača
const ArtistCard: React.FC<{ artist: Artist; index: number }> = ({ artist, index }) => (
  <Link 
    to={`/izvodjaci/${artist.id}` as PathName} // Dinamička ruta na detalje
    className={`
      p-8 border-4 border-white bg-black shadow-lg relative transition duration-500 
      hover:shadow-red-600/50 hover:bg-gray-800 cursor-pointer block 
      ${index % 2 === 0 ? 'lg:mr-16' : 'lg:ml-16'} // Asimetrija
    `}
  >
    <div className="flex justify-between items-start mb-4 border-b-2 border-red-600 pb-2">
      <h3 className="text-5xl font-mono font-bold text-yellow-400">{artist.name.toUpperCase()}</h3>
      <span className="text-xl font-mono text-gray-400">OD {artist.since}</span>
    </div>
    
    <p className="text-xl font-serif italic mb-4">{artist.genre.toUpperCase()}</p>
    <p className="font-serif text-lg mb-6 leading-relaxed">
      {artist.bio}
    </p>

    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-red-600 text-white font-mono text-sm border-2 border-white hover:bg-red-800 transition">
        SLUŠAJ
      </button>
      <button className="px-3 py-1 bg-white text-black font-mono text-sm border-2 border-black hover:bg-yellow-400 transition">
        DETALJI {'>'}
      </button>
    </div>
  </Link>
);

// Stranica koja prikazuje sve izvođače
const ArtistsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Generiši listu jedinstvenih žanrova za filter
  const uniqueGenres = useMemo(() => {
    const genres = MOCK_ARTISTS.map(a => a.genre);
    return Array.from(new Set(genres)).sort();
  }, []);

  // Filtriraj listu izvođača
  const filteredArtists = useMemo(() => {
    return MOCK_ARTISTS.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === '' || artist.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-900 text-white px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="SVI IZVOĐAČI" color="border-red-600 bg-yellow-400 text-black" skew={true} />

        {/* Filteri i Pretraga */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilter={selectedGenre}
          setSelectedFilter={setSelectedGenre}
          filterOptions={uniqueGenres}
          placeholder="PRETRAŽI PO IMENU IZVOĐAČA..."
          filterLabel="ŽANR"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist, index) => (
              <ArtistCard key={artist.id} artist={artist} index={index} />
            ))
          ) : (
            <div className="col-span-1 lg:col-span-2 text-center p-12 border-4 border-red-600 bg-black">
              <p className="text-2xl font-mono text-red-600">NEMA REZULTATA</p>
              <p className="text-lg font-serif mt-2 text-gray-400">Pokušajte sa drugim žanrom ili terminom za pretragu.</p>
            </div>
          )}
          
          <div className="col-span-1 lg:col-span-2 p-6 mt-12 bg-red-600 text-white font-mono text-center border-4 border-white transform rotate-1">
            <p className="text-2xl">TRAŽIMO NOVE ZVUKOVE. JAVITE SE.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtistsPage;