// Naziv komponente: ArticlesSection
import React from 'react';
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
    <section id="clanci" className="bg-gray-100 text-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="ČLANCI / TEORIJA" color="border-black bg-white text-black" skew={true} />
        
        <div className="space-y-8 max-w-4xl mx-auto">
          {featuredArticles.map((article, index) => (
            <Link 
              key={article.id}
              to={`/clanci/${article.id}` as PathName} // Link na detalje članka
              className={`
                block p-6 border-4 border-black bg-white shadow-xl transform transition duration-300 cursor-pointer group
                hover:shadow-red-600/50 hover:-translate-x-2
                ${index % 2 === 0 ? 'md:ml-0' : 'md:ml-12'} // Asimetrija
              `}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b-2 border-gray-300 pb-2">
                  <h3 className="text-2xl font-mono font-bold text-black group-hover:text-red-600 transition">{article.title.toUpperCase()}</h3>
                  <span className="text-sm font-mono text-gray-500 mt-2 md:mt-0 bg-gray-200 px-2 py-1">{article.date}</span>
              </div>
              
              <p className="font-serif text-lg mb-4 text-gray-800 line-clamp-2">{article.snippet}</p>
              
              <div className="flex justify-between items-center">
                 <div className="flex gap-2">
                    {article.tags && article.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono bg-black text-white px-2 py-0.5 uppercase">{tag}</span>
                    ))}
                 </div>
                 <span className="font-mono text-black border-b-2 border-black group-hover:border-red-600 group-hover:text-red-600 transition">
                    ČITAJ {'>'}
                 </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-right pt-12 max-w-4xl mx-auto">
            <Link to="/clanci" className="text-xl font-mono text-black hover:text-red-600 border-b-4 border-black hover:border-red-600 transition pb-1">
            ARHIVA TEKSTOVA {'>'}
            </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;