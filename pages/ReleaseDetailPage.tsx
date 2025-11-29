// Naziv komponente: ReleaseDetailPage
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { MOCK_ARTISTS, MOCK_RELEASES } from '../data/mockData';
// U pravom projektu: import { Link } from 'react-router-dom';
const Link: React.FC<React.PropsWithChildren<{ to: string, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

interface ReleaseDetailPageProps {
    releaseId: number;
}

const ReleaseDetailPage: React.FC<ReleaseDetailPageProps> = ({ releaseId }) => {
    const release = MOCK_RELEASES.find(r => r.id === releaseId);
    
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

    const artist = MOCK_ARTISTS.find(a => a.id === release.artistId);
    const artistName = artist ? artist.name : 'Nepoznat Izvođač';

    return (
        <section className="min-h-screen pt-20 pb-20 bg-gray-900 text-white">
            
            {/* Baner */}
            <div className={`w-full h-40 flex items-center justify-center relative border-b-4 border-yellow-400 ${release.colorClass}`}>
                <h1 className="text-5xl md:text-6xl font-extrabold font-mono text-white tracking-tighter mix-blend-overlay">
                    {release.title.toUpperCase()}
                </h1>
            </div>

            <div className="max-w-6xl mx-auto p-4 md:p-8">
                
                {/* Detalji izdanja i Cover */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                    
                    {/* Cover (1/3) */}
                    <div className="lg:col-span-1 border-4 border-white shadow-xl">
                        <img src={release.coverUrl} alt={`Cover for ${release.title}`} className="w-full object-cover" />
                        <div className="p-4 bg-black text-center font-mono text-sm border-t-4 border-red-600">
                            FORMAT: {release.format} | GODINA: {release.year}
                        </div>
                    </div>

                    {/* Informacije i Link na Autora (2/3) */}
                    <div className="lg:col-span-2 p-6 border-4 border-red-600 bg-black shadow-xl h-fit">
                        <h2 className="text-4xl font-mono font-bold mb-4 text-red-600">IZDANJE DETALJI</h2>
                        
                        <p className="font-mono text-lg mb-4">
                            IZVOĐAČ: 
                            <Link to={`/izvodjaci/${release.artistId}`} className="text-yellow-400 font-extrabold border-b-2 border-yellow-400 ml-2 hover:text-white transition">
                                {artistName.toUpperCase()}
                            </Link>
                        </p>

                        <p className="font-serif text-lg leading-relaxed mt-6 p-4 border-2 border-white bg-gray-800">
                            {/* Mock opis */}
                            Ovo izdanje predstavlja ključni momenat u karijeri {artistName}. Snimljeno uživo, ono hvata sirovu energiju i neponovljivu disonancu koja definiše etiketu Void Sound. Dominantni su repetitivni ritmovi i duboki ambient pejzaži.
                        </p>
                        
                        <div className="mt-8 flex gap-4">
                            <button className="px-6 py-2 bg-yellow-400 text-black font-extrabold border-2 border-black hover:bg-red-600 hover:text-white transition">
                                KUPITE FIZIČKO IZDANJE
                            </button>
                             <button className="px-6 py-2 bg-red-600 text-white font-extrabold border-2 border-white hover:bg-yellow-400 hover:text-black transition">
                                STREAM / PRESLUŠAJTE
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Sekcija Srodna izdanja (Placeholder) */}
                 <div className="mt-16">
                    <SectionTitle title="DRUGA IZDANJA AUTORA" color="border-yellow-400 bg-gray-900" skew={false} />
                    <p className="text-center font-mono text-xl text-gray-500 p-8 border-2 border-gray-700">Implementacija u toku.</p>
                </div>

                {/* Navigacija nazad */}
                <div className="mt-12 text-center">
                     <Link to="/izdanja" className="inline-block px-6 py-3 bg-black text-yellow-400 font-mono text-lg border-2 border-yellow-400 hover:bg-red-600 hover:text-white transition duration-300">
                        {'<'} NAZAD NA KATALOG
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ReleaseDetailPage;