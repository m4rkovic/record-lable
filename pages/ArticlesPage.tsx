// Naziv komponente: ArticlesPage
import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import FilterControls from '../components/shared/FilterControls'; // NOVI UVOZ
import { MOCK_ARTICLES } from '../data/mockData';
// U pravom projektu: import { Link } from 'react-router-dom';
const Link: React.FC<React.PropsWithChildren<{ to: string, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

// Stranica koja prikazuje sve članke
const ArticlesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Generiši listu jedinstvenih godina za filter
  const uniqueYears = useMemo(() => {
    // Uzimamo samo godinu iz datuma (2024.10.20 -> 2024)
    const years = MOCK_ARTICLES.map(a => a.date.substring(0, 4));
    return Array.from(new Set(years)).sort().reverse();
  }, []);

  // Filtriraj listu članaka
  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter(article => {
      const searchLower = searchTerm.toLowerCase();
      
      const matchesSearch = article.title.toLowerCase().includes(searchLower) || 
                            article.snippet.toLowerCase().includes(searchLower);
                            
      const articleYear = article.date.substring(0, 4);
      const matchesYear = selectedYear === '' || articleYear === selectedYear;
      
      return matchesSearch && matchesYear;
    });
  }, [searchTerm, selectedYear]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-100 text-black px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="ARHIVA ČLANAKA" color="border-black bg-white" skew={true} />
        
        {/* Filteri i Pretraga */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilter={selectedYear}
          setSelectedFilter={setSelectedYear}
          filterOptions={uniqueYears}
          placeholder="PRETRAŽI PO NASLOVU ILI SADRŽAJU..."
          filterLabel="GODINA"
        />
        
        <div className="space-y-12">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <Link 
                key={article.id}
                to={`/clanci/${article.id}`} // Link na detalje članka
                className={`
                  p-6 border-4 border-black bg-white shadow-xl transform transition duration-300 block cursor-pointer
                  hover:shadow-red-600/50 hover:bg-gray-200
                  ${index % 2 === 0 ? 'md:ml-0' : 'md:ml-12 lg:ml-24'} // Asimetrija
                `}
              >
                <h3 className="text-3xl font-mono font-bold text-red-600 mb-2">{article.title.toUpperCase()}</h3>
                <p className="text-sm font-mono text-gray-700 border-b-2 border-black pb-2 mb-4">{article.date}</p>
                <p className="font-serif text-lg mb-4">{article.snippet}</p>
                <span className="font-mono text-black border-b-2 border-red-600 hover:text-red-600 transition">
                  ČITAJ VIŠE {'>'}
                </span>
              </Link>
            ))
          ) : (
            <div className="text-center p-12 border-4 border-red-600 bg-white">
              <p className="text-2xl font-mono text-red-600">NEMA REZULTATA</p>
              <p className="text-lg font-serif mt-2 text-gray-700">Nijedan članak ne odgovara kriterijumima pretrage.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <p className="font-mono text-gray-700">PRETHODNA / SLEDEĆA STRANICA</p>
        </div>
      </div>
    </section>
  );
};

export default ArticlesPage;