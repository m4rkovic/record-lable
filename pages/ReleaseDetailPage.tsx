// Naziv komponente: ReleaseDetailPage
import React, { useMemo } from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { useData } from '../context/DataContext';
import type { PathName } from '../data/types';

// Simulišemo Link komponentu
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

interface ReleaseDetailPageProps {
    releaseId: number;
}

const ReleaseDetailPage: React.FC<ReleaseDetailPageProps> = ({ releaseId }) => {
    // 1. Povlačenje podataka iz konteksta
    const { releases, artists } = useData();
    
    // 2. Pronalaženje izdanja
    const release = useMemo(() => releases.find(r => r.id === releaseId), [releases, releaseId]);
    
    // 3. Obrada 404
    if (!release) {
        return (
            <section className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <SectionTitle title="IZDANJE NIJE PRONAĐENO" color="border-red-600 bg-yellow-400 text-black" skew={true} />
                <Link to="/izdanja" className="inline-block px-6 py-3 bg-red-600 text-white font-mono text-lg border-2 border-white hover:bg-yellow-400 hover:text-black transition duration-300">
                    NAZAD NA KATALOG
                </Link>
            </section>
        );
    }

    // 4. Pronalaženje izvođača
    const artist = artists.find(a => a.id === release.artistId);
    const artistName = artist ? artist.name : 'Nepoznat Izvođač';

    // Generisanje mock opisa ako ne postoji
    const description = `Ovo izdanje predstavlja ključni momenat u karijeri ${artistName}. Snimljeno uživo, ono hvata sirovu energiju i neponovljivu disonancu koja definiše etiketu Void Sound. Dominantni su repetitivni ritmovi i duboki ambient pejzaži koji izazivaju osećaj klaustrofobije i euforije istovremeno.`;

    return (
        <section className="min-h-screen pt-20 pb-20 bg-gray-900 text-white border-t-8 border-yellow-400">
            
            {/* Baner / Header */}
            <div className={`w-full h-64 flex items-center justify-center relative border-b-4 border-yellow-400 overflow-hidden`}>
                 <div className={`absolute inset-0 ${release.colorClass} opacity-30`}></div>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                 
                <h1 className="relative z-10 text-5xl md:text-8xl font-extrabold font-mono text-white tracking-tighter mix-blend-overlay text-center px-4">
                    {release.title.toUpperCase()}
                </h1>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
                    
                    {/* LEVA KOLONA: COVER ART (5/12) */}
                    <div className="lg:col-span-5">
                        <div className="border-4 border-white shadow-[16px_16px_0px_0px_rgba(255,255,0,1)] relative group">
                             {/* Cover Slika */}
                            <img 
                                src={release.coverUrl} 
                                alt={`Cover for ${release.title}`} 
                                className="w-full aspect-square object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://placehold.co/600x600/000000/FFFFFF?text=NO+COVER';
                                }}
                            />
                            
                            {/* Overlay sa tehničkim podacima */}
                            <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 font-mono text-sm font-bold border-b-2 border-r-2 border-white">
                                KAT.BR: {release.id}
                            </div>
                            
                             <div className="absolute bottom-0 right-0 bg-yellow-400 text-black px-3 py-1 font-mono text-sm font-bold border-t-2 border-l-2 border-black">
                                {release.year}
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-4">
                             <button className="w-full py-4 bg-yellow-400 text-black font-mono font-black text-xl border-4 border-transparent hover:border-white hover:bg-black hover:text-white transition-all uppercase tracking-widest">
                                Kupi Fizičko Izdanje
                            </button>
                             <button className="w-full py-3 bg-transparent text-white font-mono font-bold border-4 border-white hover:bg-white hover:text-black transition-all uppercase">
                                Digitalni Download / Stream
                            </button>
                        </div>
                    </div>

                    {/* DESNA KOLONA: INFO I TEKST (7/12) */}
                    <div className="lg:col-span-7 flex flex-col">
                        
                        {/* Header Izvođača */}
                        <div className="mb-8 border-b-4 border-red-600 pb-4">
                            <span className="font-mono text-gray-400 text-sm uppercase tracking-widest">Izvođač / Jedinica</span>
                            <Link 
                                to={`/izvodjaci/${release.artistId}` as PathName} 
                                className="block text-4xl md:text-6xl font-black text-white hover:text-red-600 transition-colors mt-1 uppercase"
                            >
                                {artistName}
                            </Link>
                        </div>

                        {/* Detalji Formata */}
                        <div className="grid grid-cols-2 gap-4 mb-8 font-mono text-sm">
                            <div className="border-2 border-gray-700 p-3">
                                <span className="block text-gray-500 text-xs">FORMAT</span>
                                <span className="block text-xl font-bold text-white">{release.format}</span>
                            </div>
                            <div className="border-2 border-gray-700 p-3">
                                <span className="block text-gray-500 text-xs">STATUS</span>
                                <span className="block text-xl font-bold text-green-400">DOSTUPNO</span>
                            </div>
                        </div>

                        {/* Opis */}
                        <div className="bg-gray-800 border-l-4 border-yellow-400 p-6 mb-8 shadow-lg">
                            <h3 className="font-mono font-bold text-yellow-400 mb-4 border-b border-gray-600 pb-2">// OPIS IZDANJA</h3>
                            <p className="font-serif text-lg leading-relaxed text-gray-300">
                                {description}
                            </p>
                        </div>

                        {/* Tracklist (Mock) */}
                        <div className="mt-auto">
                             <h3 className="font-mono font-bold text-white mb-4 uppercase tracking-widest">Lista Numera</h3>
                             <ul className="font-mono text-sm space-y-2 border-t border-gray-700 pt-4">
                                 <li className="flex justify-between hover:bg-gray-800 p-2 cursor-pointer transition-colors">
                                     <span className="text-gray-400">01</span>
                                     <span className="text-white">Uvod u Ništavilo</span>
                                     <span className="text-gray-500">04:23</span>
                                 </li>
                                 <li className="flex justify-between hover:bg-gray-800 p-2 cursor-pointer transition-colors">
                                     <span className="text-gray-400">02</span>
                                     <span className="text-white font-bold text-red-500">Signal (Hit)</span>
                                     <span className="text-gray-500">05:12</span>
                                 </li>
                                 <li className="flex justify-between hover:bg-gray-800 p-2 cursor-pointer transition-colors">
                                     <span className="text-gray-400">03</span>
                                     <span className="text-white">Repetitivna Greška</span>
                                     <span className="text-gray-500">06:45</span>
                                 </li>
                                  <li className="flex justify-between hover:bg-gray-800 p-2 cursor-pointer transition-colors">
                                     <span className="text-gray-400">04</span>
                                     <span className="text-white">Kraj Prenosa</span>
                                     <span className="text-gray-500">03:10</span>
                                 </li>
                             </ul>
                        </div>

                    </div>
                </div>
                
                {/* Navigacija nazad */}
                <div className="mt-20 pt-8 border-t-2 border-gray-800 text-center">
                     <Link to="/izdanja" className="font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-white pb-1">
                        ← Povratak na kompletan katalog
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ReleaseDetailPage;