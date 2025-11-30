// Naziv komponente: ArticlesSection
import React, { useState } from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { MOCK_ARTICLES } from '../data/mockData';
import type { PathName } from '../data/types';

// Simulišemo Link komponentu
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

// Sekcija za prikaz članaka na HomePage
const ArticlesSection: React.FC = () => {
  // Prikazujemo samo prva 3 članka
  const featuredArticles = MOCK_ARTICLES.slice(0, 3);

  return (
    <section id="clanci" className="bg-white text-black py-32 px-4 min-h-screen border-t-8 border-black relative">
      
      {/* Dekorativni elementi u pozadini */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l-2 border-black/10 pointer-events-none hidden lg:block"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-6">
             <div>
                <SectionTitle title="TEORIJA / ČLANCI" color="bg-white text-black border-none p-0" skew={false} />
                <p className="text-xl font-mono text-gray-600 mt-4 max-w-xl">
                    Analize, intervjui i manifesti. Dokumentujemo zvuk koji drugi ignorišu.
                </p>
            </div>
            <Link to="/clanci" className="hidden md:block text-lg font-mono bg-black text-white px-6 py-3 hover:bg-red-600 transition-colors border-2 border-transparent">
                ARHIVA TEKSTOVA
            </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        <div className="md:hidden text-center mt-16">
            <Link to="/clanci" className="inline-block w-full text-center text-xl font-mono bg-black text-white px-6 py-4 font-bold hover:bg-red-600 transition-colors">
                POGLEDAJ SVE
            </Link>
        </div>
      </div>
    </section>
  );
};

// Izdvojena komponenta za karticu članka radi čistoće
const ArticleCard: React.FC<{ article: typeof MOCK_ARTICLES[0], index: number }> = ({ article, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            to={`/clanci/${article.id}` as PathName}
            className={`
                group relative block h-full
                ${index === 1 ? 'lg:mt-12' : ''} // Stagger efekt za srednju karticu
            `}
        >
            <div 
                className="h-full border-4 border-black bg-white p-6 flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div>
                    <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-2">
                        <span className="font-mono text-xs font-bold bg-black text-white px-2 py-1">
                            {article.date}
                        </span>
                        <span className="font-mono text-xs font-bold text-red-600">
                            ID: {article.id.toString().padStart(3, '0')}
                        </span>
                    </div>
                    
                    <h3 className="text-3xl font-extrabold leading-tight mb-4 group-hover:text-red-600 transition-colors">
                        {article.title.toUpperCase()}
                    </h3>
                    
                    <p className="font-serif text-lg text-gray-800 line-clamp-3 mb-6">
                        {article.snippet}
                    </p>
                </div>

                <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags && article.tags.map(tag => (
                            <span key={tag} className="text-xs font-mono border border-black px-2 py-0.5 uppercase bg-gray-100">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between border-t-2 border-black pt-4">
                         <span className="font-mono text-sm font-bold uppercase tracking-wider group-hover:underline">
                            Pročitaj više
                         </span>
                         <span className={`text-xl transition-transform duration-300 ${isHovered ? 'translate-x-2 text-red-600' : ''}`}>
                            →
                         </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ArticlesSection;