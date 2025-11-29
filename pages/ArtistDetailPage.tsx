// Naziv komponente: ArtistDetailPage
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import ReleaseItem from '../components/releases/ReleaseItem';
import { MOCK_ARTISTS, MOCK_RELEASES, MOCK_ARTICLES } from '../data/mockData';
import type { Artist } from '../data/types';
// U pravom projektu: import { Link } from 'react-router-dom';
const Link: React.FC<React.PropsWithChildren<{ to: string, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

interface ArtistDetailPageProps {
    artistId: number;
}

const ArtistDetailPage: React.FC<ArtistDetailPageProps> = ({ artistId }) => {
    // 1. Pronađi izvođača
    const artist = MOCK_ARTISTS.find(a => a.id === artistId);

    // 2. Obrada 404
    if (!artist) {
        return (
            <section className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <SectionTitle title="IZVOĐAČ NIJE PRONAĐEN" color="border-red-600 bg-yellow-400 text-black" skew={true} />
                <p className="text-xl font-serif text-gray-400 mb-8">Traženi kod izvođača ({artistId}) ne postoji u našem katalogu.</p>
                <Link to="/izvodjaci" className="inline-block px-6 py-3 bg-red-600 text-white font-mono text-lg border-2 border-white hover:bg-yellow-400 hover:text-black transition duration-300">
                    NAZAD NA LISTU IZVOĐAČA
                </Link>
            </section>
        );
    }
    
    // 3. Pronađi povezana izdanja i članke
    const artistReleases = MOCK_RELEASES.filter(r => r.artist === artist.name);
    const relatedArticles = MOCK_ARTICLES.filter(a => a.artistId === artist.id);

    // Placeholder slika za baner (dinamička boja na osnovu prvog taga)
    const bannerColor = artist.tags[0] === 'Noise' ? '8B0000' : (artist.tags[0] === 'Improvizacija' ? 'FFD700' : '4B0082');
    const bannerUrl = `https://placehold.co/1200x300/${bannerColor}/FFFFFF?text=${artist.name.toUpperCase()}+${artist.genre.toUpperCase()}`;

    return (
        <section className="min-h-screen pt-20 bg-gray-900 text-white">
            
            {/* Naslovna Sekcija/Baner */}
            <div className="w-full h-80 bg-cover bg-center relative border-b-4 border-yellow-400" 
                 style={{ backgroundImage: `url(${bannerUrl})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <h1 className="text-7xl md:text-9xl font-extrabold font-mono text-white tracking-tighter mix-blend-difference">
                        {artist.name.toUpperCase()}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-8">
                
                {/* 1. Glavne Informacije i Biografija */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                    {/* Blok Biografija (2/3 širine) */}
                    <div className="lg:col-span-2 p-6 border-4 border-white bg-gray-800 shadow-xl">
                        <h2 className="text-4xl font-mono font-bold mb-4 text-yellow-400">BIOGRAFIJA</h2>
                        <p className="text-xl font-serif italic mb-4 text-red-400">{artist.genre.toUpperCase()} | Od {artist.since}</p>
                        <p className="font-serif text-lg leading-relaxed">{artist.bio}</p>

                        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white border-opacity-30">
                            {artist.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-red-600 text-white font-mono text-sm border-2 border-white transform skew-x-3">{tag.toUpperCase()}</span>
                            ))}
                        </div>
                    </div>
                    
                    {/* Blok Detalja (1/3 širine) */}
                    <div className="lg:col-span-1 p-6 border-4 border-red-600 bg-black shadow-xl h-fit transform -skew-y-1">
                        <h2 className="text-4xl font-mono font-bold mb-4 text-red-600">DETALJI</h2>
                        <p className="font-mono text-sm border-b border-gray-700 py-2">
                            <span className="text-yellow-400 font-extrabold mr-2">ČLANOVI:</span> {artist.members}
                        </p>
                        <p className="font-mono text-sm border-b border-gray-700 py-2">
                            <span className="text-yellow-400 font-extrabold mr-2">POREKLO:</span> {artist.origin}
                        </p>
                        <p className="font-mono text-sm py-2">
                            <span className="text-yellow-400 font-extrabold mr-2">PRVI NASTUP:</span> {artist.since}
                        </p>
                        <button className="mt-6 w-full py-2 bg-yellow-400 text-black font-extrabold border-2 border-black hover:bg-red-600 hover:text-white transition">
                            PRATI IZVOĐAČA
                        </button>
                    </div>
                </div>

                {/* 2. Povezana Izdanja */}
                <div className="mt-16">
                    <SectionTitle title="IZDANJA IZVOĐAČA" color="border-red-600 bg-gray-900" skew={true} />
                    {artistReleases.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {artistReleases.map((release) => (
                                // Koristimo ReleaseItem 
                                <div key={release.id} className="w-full">
                                    <ReleaseItem release={release as any} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center font-mono text-xl text-gray-500 p-8 border-2 border-gray-700">NEMA AKTIVNIH IZDANJA U KATALOGU.</p>
                    )}
                </div>

                {/* 3. Povezani Članci */}
                <div className="mt-16">
                    <SectionTitle title="POVEZANI ČLANCI" color="border-yellow-400 bg-gray-900" skew={false} />
                    {relatedArticles.length > 0 ? (
                        <div className="space-y-4 max-w-4xl mx-auto">
                            {relatedArticles.map((article) => (
                                <a 
                                    key={article.id}
                                    href={`#clanci`} // U realnom ruteru: to="/clanci/${article.id}"
                                    className="block p-4 border-2 border-white bg-gray-800 hover:bg-red-600 transition duration-200 font-mono flex justify-between items-center"
                                >
                                    <span className="text-xl font-bold">{article.title.toUpperCase()}</span>
                                    <span className="text-sm text-yellow-400">{article.date}</span>
                                </a>
                            ))}
                        </div>
                    ) : (
                         <p className="text-center font-mono text-xl text-gray-500 p-8 border-2 border-gray-700">NEMA POVEZANIH ČLANAKA.</p>
                    )}
                </div>

                {/* Navigacija nazad */}
                <div className="mt-12 text-center">
                     <Link to="/izvodjaci" className="inline-block px-6 py-3 bg-black text-yellow-400 font-mono text-lg border-2 border-yellow-400 hover:bg-red-600 hover:text-white transition duration-300">
                        {'<'} NAZAD NA SVE IZVOĐAČE
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ArtistDetailPage;