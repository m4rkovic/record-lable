// Naziv komponente: ArticlesSection
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';


// Sekcija za prikaz članaka na HomePage
const ArticlesSection: React.FC = () => {
  const mockArticles = [
    { id: 1, title: 'Analiza Zvuka: Tehnike Dron Proizvodnje', date: '2024.10.20' },
    { id: 2, title: 'Intervju: Senzorika o Ritmu i Industriji', date: '2024.09.15' },
    { id: 3, title: 'Osvrt: Globalni Trendovi u Eksperimentalnom Džezu', date: '2024.08.01' },
  ];

  return (
    <section id="clanci" className="bg-gray-100 text-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="ČLANCI" color="border-black" skew={true} />
        <div className="space-y-2 max-w-3xl mx-auto">
          {mockArticles.map((article) => (
            <a
              key={article.id}
              href="#"
              className="block p-4 border-b-2 border-black flex justify-between items-center transition hover:bg-gray-300 font-mono"
            >
              <span className="text-xl font-semibold">{article.title.toUpperCase()}</span>
              <span className="text-sm text-gray-600 ml-4">{article.date}</span>
            </a>
          ))}
          <div className="text-right pt-4">
            <a href="#" className="text-black font-mono hover:text-red-600 border-b-2 border-black">
              ARHIVA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;