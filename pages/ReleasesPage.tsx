// Naziv komponente: ReleasesPage
import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import FilterControls from '../components/shared/FilterControls';
import { useData } from '../context/DataContext';
import type { Release, PathName } from '../data/types';

const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

// --- LOKALNA KOMPONENTA: RELEASE KARTICA (Profi Dizajn) ---
// Dizajnirana slično kao ArtistCard: Slika dominira, podaci su jasni i čitljivi
const ReleaseCard: React.FC<{ release: Release; index: number }> = ({ release, index }) => (
  <Link 
    to={`/izdanja/${release.id}` as PathName}
    className={`
      block relative group perspective-1000
      ${index % 2 !== 0 ? 'lg:mt-16' : 'lg:mt-0'} // Asimetrični "stagger" efekat
    `}
  >
     {/* Pozadinski element za dubinu */}
    <div className="absolute top-2 left-2 w-full h-full border-4 border-gray-400 bg-transparent z-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-red-600"></div>

    {/* Glavni Kontejner */}
    <div className={`relative z-10 border-4 border-black bg-white p-0 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1`}>
        
        {/* COVER SLIKA - DOMINANTNA */}
        <div className="w-full aspect-square relative overflow-hidden border-b-4 border-black group-hover:border-red-600 transition-colors">
             {/* Status Bar preko slike */}
            <div className="absolute top-0 left-0 w-full bg-black/80 text-white p-2 flex justify-between items-center font-mono text-xs z-20 backdrop-blur-sm">
                <span>CAT.NO: {release.id}</span>
                <span className="text-yellow-400 font-bold">{release.year}</span>
            </div>

            <img 
                src={release.coverUrl} 
                alt={release.title} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:contrast-125"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback ako slika ne postoji
                    target.src = 'https://placehold.co/600x600/000000/FFFFFF?text=NO+COVER';
                }}
            />
            
            {/* Overlay na hover */}
            <div className={`absolute inset-0 ${release.colorClass} mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-300`}></div>
        </div>

        {/* Podaci ispod slike */}
        <div className="p-5 flex flex-col relative bg-white">
            <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">
                {release.artist}
            </h4>
            
            <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-4 group-hover:text-red-600 transition-colors line-clamp-2 min-h-[3rem]">
                {release.title}
            </h3>

            {/* Tehnički Podaci */}
            <div className="font-mono text-xs text-black border-t-2 border-gray-200 pt-3 mt-auto flex justify-between items-center group-hover:border-red-600 transition-colors">
                <span className="bg-black text-white px-2 py-0.5 font-bold">
                    {release.format}
                </span>
                <span className="font-bold text-gray-400 group-hover:text-black transition-colors">
                   DETALJI
                </span>
            </div>
        </div>
    </div>
  </Link>
);


// --- GLAVNA STRANICA ---
const ReleasesPage: React.FC = () => {
  const { releases } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  // Generiši listu jedinstvenih formata
  const uniqueFormats = useMemo(() => {
    const formats = releases.map(r => r.format);
    return Array.from(new Set(formats)).sort();
  }, [releases]);

  // Filtriraj listu izdanja
  const filteredReleases = useMemo(() => {
    return releases.filter(release => {
      const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            release.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFormat = selectedFormat === '' || release.format === selectedFormat;
      return matchesSearch && matchesFormat;
    });
  }, [releases, searchTerm, selectedFormat]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-100 text-black px-4 border-t-8 border-yellow-400">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16">
             <SectionTitle title="KOMPLETAN KATALOG" color="bg-black text-yellow-400 border-none px-4 inline-block" skew={false} />
             <p className="mt-4 font-mono text-gray-500 max-w-2xl">
                Arhiva svih zvučnih zapisa objavljenih pod Void Sound etiketom. 
                Fizička izdanja su limitirana. Digitalni zapisi su večni.
             </p>
        </div>

        <div className="mb-16">
            <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedFilter={selectedFormat}
            setSelectedFilter={setSelectedFormat}
            filterOptions={uniqueFormats}
            placeholder="PRETRAŽI PO NASLOVU ILI IZVOĐAČU..."
            filterLabel="FILTRIRAJ PO FORMATU"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
          {filteredReleases.length > 0 ? (
            filteredReleases.map((release, index) => (
              <ReleaseCard key={release.id} release={release} index={index} />
            ))
          ) : (
            <div className="col-span-full p-12 border-4 border-dashed border-gray-400 text-center">
              <p className="text-2xl font-mono text-gray-400 uppercase">Nema izdanja u katalogu.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedFormat('');}}
                className="mt-4 text-red-600 font-bold underline hover:no-underline"
              >
                RESETUJ FILTERE
              </button>
            </div>
          )}
        </div>
        
        {/* Statistika u dnu */}
        <div className="mt-24 pt-8 border-t-4 border-black flex justify-between items-center font-mono text-xs md:text-sm text-gray-500">
            <span>KATALOŠKI BROJEVI: {releases.length}</span>
            <span>DISTRIBUCIJA: GLOBALNA</span>
        </div>

      </div>
    </section>
  );
}

export default ReleasesPage;

// // Naziv komponente: ReleasesPage
// import React, { useState, useMemo } from 'react';
// import SectionTitle from '../components/shared/SectionTitle';
// import FilterControls from '../components/shared/FilterControls'; // NOVI UVOZ
// import ReleaseItem from '../components/releases/ReleaseItem';
// import { MOCK_RELEASES } from '../data/mockData';
// import type { Release } from '../data/types';

// // Stranica koja prikazuje sva izdanja
// const ReleasesPage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedFormat, setSelectedFormat] = useState('');

//   // Generiši listu jedinstvenih formata za filter
//   const uniqueFormats = useMemo(() => {
//     const formats = MOCK_RELEASES.map(r => r.format);
//     return Array.from(new Set(formats)).sort();
//   }, []);

//   // Filtriraj listu izdanja
//   const filteredReleases = useMemo(() => {
//     return MOCK_RELEASES.filter(release => {
//       const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             release.artist.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesFormat = selectedFormat === '' || release.format === selectedFormat;
//       return matchesSearch && matchesFormat;
//     });
//   }, [searchTerm, selectedFormat]);

//   return (
//     <section className="min-h-screen pt-32 pb-20 bg-gray-900 text-white px-4">
//       <div className="max-w-7xl mx-auto">
//         <SectionTitle title="KOMPLETNA IZDANJA" color="border-yellow-400 bg-black text-white" skew={false} />
        
//         {/* Filteri i Pretraga */}
//         <FilterControls
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           selectedFilter={selectedFormat}
//           setSelectedFilter={setSelectedFormat}
//           filterOptions={uniqueFormats}
//           placeholder="PRETRAŽI PO NASLOVU ILI IZVOĐAČU..."
//           filterLabel="FORMAT"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredReleases.length > 0 ? (
//             filteredReleases.map((release, index) => (
//               // Koristimo ReleaseItem komponentu za svaki artikal
//               <div 
//                 key={release.id} 
//                 className={`border-4 border-red-600 shadow-xl p-4 bg-gray-800 transform transition duration-300 ${
//                   index % 3 === 1 ? 'mt-4 md:-mt-8' : '' // Asimetrični pomeraj
//                 }`}
//               >
//                 <ReleaseItem release={release as any} />
//                 <div className="mt-4 flex justify-end">
//                   <button className="px-3 py-1 bg-red-600 text-white font-mono text-sm border-2 border-white hover:bg-yellow-400 hover:text-black transition duration-150">
//                     NARUČI / DOWNLOAD
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center p-12 border-4 border-red-600 bg-black">
//               <p className="text-2xl font-mono text-red-600">NEMA REZULTATA</p>
//               <p className="text-lg font-serif mt-2 text-gray-400">Nijedno izdanje ne odgovara kriterijumima pretrage.</p>
//             </div>
//           )}
//         </div>

//         <div className="mt-16 p-6 border-2 border-yellow-400 bg-black text-center font-mono text-lg">
//           <p>UKUPNO PRIKAZANO ARTIKALA: {filteredReleases.length}</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReleasesPage;