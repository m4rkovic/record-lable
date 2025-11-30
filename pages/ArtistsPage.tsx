// Naziv komponente: ArtistsPage
import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import FilterControls from '../components/shared/FilterControls';
import { useData } from '../context/DataContext'; // Koristimo podatke iz konteksta
import type { Artist, PathName } from '../data/types';

// Simulišemo Link
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

// --- LOKALNA KOMPONENTA: ARTIST KARTICA (Redizajnirana) ---
const ArtistCard: React.FC<{ artist: Artist; index: number }> = ({ artist, index }) => (
  <Link 
    to={`/izvodjaci/${artist.id}` as PathName}
    className={`
      block relative group perspective-1000
      ${index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-16'} // Asimetrični "stagger" efekat
    `}
  >
    {/* Pozadinski element za dubinu */}
    <div className="absolute top-2 left-2 w-full h-full border-4 border-gray-300 bg-transparent z-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-red-600"></div>

    {/* Glavni Kontejner */}
    <div className="relative z-10 border-4 border-black bg-white p-0 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        
        {/* Header Kartice - Status Bar */}
        <div className="bg-black text-white p-2 flex justify-between items-center font-mono text-xs border-b-4 border-black">
            <span>ID: {artist.id.toString().padStart(3, '0')}</span>
            <span className="text-green-400 animate-pulse">● ACTIVE</span>
        </div>

        {/* --- PROSTOR ZA SLIKU --- */}
        <div className="w-full aspect-square relative overflow-hidden border-b-4 border-black group-hover:border-red-600 transition-colors">
            <img 
                src={artist.imageUrl} 
                alt={artist.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/600x600/000000/FFFFFF?text=NO+FOTO';
                }}
            />
            {/* Crveni overlay na hover */}
            <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>

        {/* Telo Kartice */}
        <div className="p-6 flex flex-col relative bg-white">
            {/* Veliko Ime */}
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4 mix-blend-hard-light group-hover:text-red-600 transition-colors z-20 break-words">
                {artist.name}
            </h3>

            {/* Tehnički Podaci */}
            <div className="font-mono text-sm space-y-2 border-t-2 border-black pt-4 mb-6 text-gray-600 group-hover:text-black transition-colors relative z-20">
                <div className="flex justify-between">
                    <span className="font-bold">ŽANR:</span>
                    <span>{artist.genre.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold">POREKLO:</span>
                    <span>{artist.origin.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold">FORMIRANO:</span>
                    <span>{artist.since}</span>
                </div>
            </div>

            {/* Akcija (Dugme) */}
            <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-300 group-hover:border-red-600 transition-colors z-20">
                <span className="inline-flex items-center font-bold font-mono text-sm group-hover:translate-x-2 transition-transform">
                    PRISTUP PODACIMA <span className="ml-2 text-xl leading-none">→</span>
                </span>
            </div>
        </div>
    </div>
  </Link>
);

// const ArtistCard: React.FC<{ artist: Artist; index: number }> = ({ artist, index }) => (
//   <Link 
//     to={`/izvodjaci/${artist.id}` as PathName}
//     className={`
//       block relative group perspective-1000
//       ${index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-16'} // Asimetrični "stagger" efekat
//     `}
//   >
//     {/* Pozadinski element za dubinu */}
//     <div className="absolute top-2 left-2 w-full h-full border-4 border-gray-300 bg-transparent z-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-red-600"></div>

//     {/* Glavni Kontejner */}
//     <div className="relative z-10 border-4 border-black bg-white p-0 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        
//         {/* Header Kartice - Status Bar */}
//         <div className="bg-black text-white p-2 flex justify-between items-center font-mono text-xs">
//             <span>ID: {artist.id.toString().padStart(3, '0')}</span>
//             <span className="text-green-400 animate-pulse">● ACTIVE</span>
//         </div>

//         {/* Telo Kartice */}
//         <div className="p-6 flex flex-col h-full relative">
//             {/* Veliko Ime - Prelazi preko ivica */}
//             <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4 mix-blend-hard-light group-hover:text-red-600 transition-colors z-20 break-words">
//                 {artist.name}
//             </h3>

//             {/* Tehnički Podaci */}
//             <div className="font-mono text-sm space-y-2 border-t-2 border-black pt-4 mb-8 text-gray-600 group-hover:text-black transition-colors relative z-20">
//                 <div className="flex justify-between">
//                     <span className="font-bold">ŽANR:</span>
//                     <span>{artist.genre.toUpperCase()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <span className="font-bold">POREKLO:</span>
//                     <span>{artist.origin.toUpperCase()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <span className="font-bold">FORMIRANO:</span>
//                     <span>{artist.since}</span>
//                 </div>
//             </div>

//             {/* "Profilna Slika" (Placeholder Pattern) */}
//             <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none z-10">
//                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M0 100L100 0V100H0Z" fill="currentColor"/>
//                  </svg>
//             </div>

//             {/* Akcija (Dugme) */}
//             <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-300 group-hover:border-red-600 transition-colors z-20">
//                 <span className="inline-flex items-center font-bold font-mono text-sm group-hover:translate-x-2 transition-transform">
//                     PRISTUP PODACIMA <span className="ml-2 text-xl leading-none">→</span>
//                 </span>
//             </div>
//         </div>
        
//         {/* Overlay na hover (Scanline efekat) */}
//         <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity duration-300"></div>
//     </div>
//   </Link>
// );

// --- GLAVNA STRANICA ---
const ArtistsPage: React.FC = () => {
  // Koristimo podatke iz konteksta
  const { artists } = useData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Generiši listu jedinstvenih žanrova za filter
  const uniqueGenres = useMemo(() => {
    const genres = artists.map(a => a.genre);
    return Array.from(new Set(genres)).sort();
  }, [artists]);

  // Filtriraj listu izvođača
  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            artist.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesGenre = selectedGenre === '' || artist.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [artists, searchTerm, selectedGenre]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-100 text-black px-4 border-t-8 border-red-600">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16">
             <SectionTitle title="INDEKS IZVOĐAČA" color="bg-black text-white border-none px-4 inline-block" skew={false} />
             <p className="mt-4 font-mono text-gray-500 max-w-2xl">
                Kompletan registar aktivnih jedinica Void Sound kolektiva. 
                Pristupite pojedinačnim dosijeima za detaljnu diskografiju i biografiju.
             </p>
        </div>

        {/* Filter Sekcija - Stilizovana */}
        <div className="mb-16">
            <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedFilter={selectedGenre}
            setSelectedFilter={setSelectedGenre}
            filterOptions={uniqueGenres}
            placeholder="UNESITE IME ILI TAG..."
            filterLabel="FILTRIRAJ PO ŽANRU"
            />
        </div>

        {/* Grid Izvođača */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist, index) => (
              <ArtistCard key={artist.id} artist={artist} index={index} />
            ))
          ) : (
            <div className="col-span-full p-12 border-4 border-dashed border-gray-400 text-center">
              <p className="text-2xl font-mono text-gray-400 uppercase">Nema rezultata u bazi.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedGenre('');}}
                className="mt-4 text-red-600 font-bold underline hover:no-underline"
              >
                RESETUJ FILTERE
              </button>
            </div>
          )}
          
          {/* Dekorativni Blok (Call to action za nove artiste) */}
          <div className={`
            p-8 border-4 border-black bg-yellow-400 flex flex-col justify-center items-center text-center shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300
            ${filteredArtists.length % 2 !== 0 ? 'lg:mt-16' : ''} // Poravnanje sa gridom
          `}>
            <h3 className="text-3xl font-black mb-4 uppercase">TRAŽIMO NOVI ZVUK</h3>
            <p className="font-mono text-sm mb-6">Da li tvoj projekat pripada ovde?</p>
            <Link to="/kontakt" className="bg-black text-white px-6 py-3 font-bold border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors">
                POŠALJI DEMO
            </Link>
          </div>
        </div>

        {/* Statistika u dnu */}
        <div className="mt-24 pt-8 border-t-4 border-black flex justify-between items-center font-mono text-xs md:text-sm text-gray-500">
            <span>UKUPNO JEDINICA: {artists.length}</span>
            <span>BAZA AŽURIRANA: {new Date().toLocaleDateString()}</span>
        </div>

      </div>
    </section>
  );
}

export default ArtistsPage;