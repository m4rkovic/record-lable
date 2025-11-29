// Naziv komponente: ReleasesPage
import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import FilterControls from '../components/shared/FilterControls'; // NOVI UVOZ
import ReleaseItem from '../components/releases/ReleaseItem';
import { MOCK_RELEASES } from '../data/mockData';
import type { Release } from '../data/types';

// Stranica koja prikazuje sva izdanja
const ReleasesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  // Generiši listu jedinstvenih formata za filter
  const uniqueFormats = useMemo(() => {
    const formats = MOCK_RELEASES.map(r => r.format);
    return Array.from(new Set(formats)).sort();
  }, []);

  // Filtriraj listu izdanja
  const filteredReleases = useMemo(() => {
    return MOCK_RELEASES.filter(release => {
      const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            release.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFormat = selectedFormat === '' || release.format === selectedFormat;
      return matchesSearch && matchesFormat;
    });
  }, [searchTerm, selectedFormat]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-900 text-white px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="KOMPLETNA IZDANJA" color="border-yellow-400 bg-black text-white" skew={false} />
        
        {/* Filteri i Pretraga */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilter={selectedFormat}
          setSelectedFilter={setSelectedFormat}
          filterOptions={uniqueFormats}
          placeholder="PRETRAŽI PO NASLOVU ILI IZVOĐAČU..."
          filterLabel="FORMAT"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReleases.length > 0 ? (
            filteredReleases.map((release, index) => (
              // Koristimo ReleaseItem komponentu za svaki artikal
              <div 
                key={release.id} 
                className={`border-4 border-red-600 shadow-xl p-4 bg-gray-800 transform transition duration-300 ${
                  index % 3 === 1 ? 'mt-4 md:-mt-8' : '' // Asimetrični pomeraj
                }`}
              >
                <ReleaseItem release={release as any} />
                <div className="mt-4 flex justify-end">
                  <button className="px-3 py-1 bg-red-600 text-white font-mono text-sm border-2 border-white hover:bg-yellow-400 hover:text-black transition duration-150">
                    NARUČI / DOWNLOAD
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-12 border-4 border-red-600 bg-black">
              <p className="text-2xl font-mono text-red-600">NEMA REZULTATA</p>
              <p className="text-lg font-serif mt-2 text-gray-400">Nijedno izdanje ne odgovara kriterijumima pretrage.</p>
            </div>
          )}
        </div>

        <div className="mt-16 p-6 border-2 border-yellow-400 bg-black text-center font-mono text-lg">
          <p>UKUPNO PRIKAZANO ARTIKALA: {filteredReleases.length}</p>
        </div>
      </div>
    </section>
  );
};

export default ReleasesPage;