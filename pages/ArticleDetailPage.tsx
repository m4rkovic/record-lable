// Naziv komponente: ArticleDetailPage
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { MOCK_ARTICLES, MOCK_ARTISTS } from '../data/mockData';
// U pravom projektu: import { Link } from 'react-router-dom';
const Link: React.FC<React.PropsWithChildren<{ to: string, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

interface ArticleDetailPageProps {
    articleId: number;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articleId }) => {
    const article = MOCK_ARTICLES.find(a => a.id === articleId);
    
    if (!article) {
        return (
            <section className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <SectionTitle title="ČLANAK NIJE PRONAĐEN" color="border-red-600 bg-yellow-400 text-black" skew={true} />
                <Link to="/clanci" className="inline-block px-6 py-3 bg-red-600 text-white font-mono text-lg border-2 border-white hover:bg-yellow-400 hover:text-black transition duration-300">
                    NAZAD NA ARHIVU
                </Link>
            </section>
        );
    }

    const artist = MOCK_ARTISTS.find(a => a.id === article.artistId);
    const artistName = artist ? artist.name : 'VOID SOUND Redakcija';

    return (
        <section className="min-h-screen pt-32 pb-20 bg-gray-100 text-black px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Header članka */}
                <div className="mb-10 p-6 border-4 border-black bg-white shadow-xl transform skew-y-1">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-mono text-red-600 mb-3">
                        {article.title.toUpperCase()}
                    </h1>
                    <p className="text-lg font-mono text-gray-700">
                        DATUM: {article.date} | AUTOR: 
                        {artist ? (
                            <Link to={`/izvodjaci/${artist.id}`} className="font-extrabold text-black border-b border-red-600 ml-1 hover:text-red-600 transition">
                                {artistName.toUpperCase()}
                            </Link>
                        ) : (
                            <span className="ml-1">{artistName}</span>
                        )}
                    </p>
                </div>

                {/* Sadržaj članka */}
                <div className="font-serif text-lg leading-relaxed space-y-6">
                    <p className="bg-yellow-400 p-4 border-l-4 border-black italic font-bold">
                        {article.snippet}
                    </p>
                    
                    <p>
                        U svetu savremene muzike, pojam zvuka često biva sveden na svoju komercijalnu vrednost. Međutim, izdanja poput onih iz Void Sound etikete insistiraju na povratku sirovom iskustvu. Teksture, disonance i produženi tonovi ponovo postaju primarni fokus, a ne samo dodaci.
                    </p>
                    
                    <h3 className="text-2xl font-mono text-red-600 border-b-2 border-black pb-1 mt-8">Tehnike dekonstrukcije zvuka</h3>
                    
                    <p>
                        Analiza dekonstrukcije koju primenjuje {artistName} otkriva sistematsko odbijanje klasične harmonije. Koristeći custom-made modularne sintezatore, zvuk se tretira kao fizički entitet koji se namerno narušava pre nego što dosegne finalni master.
                    </p>
                    
                    <p className="p-4 border-4 border-black font-mono text-sm bg-gray-200">
                        NAPOMENA REDAKCIJE: Uvek preporučujemo preslušavanje uz slušalice visokog kvaliteta.
                    </p>
                </div>

                {/* Navigacija nazad */}
                <div className="mt-12 text-center">
                     <Link to="/clanci" className="inline-block px-6 py-3 bg-black text-yellow-400 font-mono text-lg border-2 border-yellow-400 hover:bg-red-600 hover:text-white transition duration-300">
                        {'<'} NAZAD NA SVE ČLANKE
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default ArticleDetailPage;