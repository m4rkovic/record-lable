// Naziv komponente: DashboardUI
import React, { useMemo, useEffect } from 'react';
import { InputField } from '../../shared/InputField';
import { AdminButton } from '../../shared/AdminButton';
import { useData } from '../../../context/DataContext';

// Implementacija DashboardSection (za filtere, statistiku i rezultate)
export const DashboardUI: React.FC = () => {
    const { 
        artists, releases, 
        selectedYear, setSelectedYear, selectedArtistId, setSelectedArtistId, selectedGenre, setSelectedGenre, 
        triggerReport, setTriggerReport, allArtistOptions, 
        users // Uvoz korisnika za mock tablicu
    } = useData();

    // Logika za generisanje lažnog izveštaja na osnovu filtera (premeštena u UI fajl za renderovanje)
    const generateMockReport = (year: string, artistId: number, genre: string) => {
        const baseSales = 1000;
        const yearMultiplier = year === 'SVE GODINE' ? 1.5 : (year === '2024' ? 1.2 : 1.0);
        const artistMultiplier = artistId > 0 ? 1.3 : 1.0;
        const genreMultiplier = genre !== 'SVI ŽANROVI' ? 1.1 : 1.0;
        
        const total = Math.floor(baseSales * yearMultiplier * artistMultiplier * genreMultiplier);
        
        // Mock logika pretrage imena za prikaz rezultata
        const topArtistName = allArtistOptions.find((a: any) => a.id === artistId)?.name || "Senzorika";

        return {
            totalSales: total,
            topArtist: artistId > 0 ? topArtistName : "Senzorika",
            topGenre: genre !== 'SVI ŽANROVI' ? genre : "Industrial Techno",
            avgMonthly: Math.floor(total / 12),
        };
    };
    
    const uniqueYears = useMemo(() => Array.from(new Set(releases.map((r: any) => r.year.toString()))).sort().reverse(), [releases]);
    const uniqueGenres = useMemo(() => Array.from(new Set(artists.map((a: any) => a.genre))).sort(), [artists]);
    
    // Logika koja se pokreće klikom na dugme "GENERISI IZVEŠTAJ"
    const report = useMemo(() => {
        if (!triggerReport) return null;
        return generateMockReport(selectedYear, selectedArtistId, selectedGenre);
    }, [releases, artists, selectedYear, selectedArtistId, selectedGenre, triggerReport]);
    
    // Resetuj triggerReport nakon generisanja
    useEffect(() => {
        if (triggerReport) {
            setTriggerReport(false);
        }
    }, [report]);

    return (
        <div className='space-y-4'>
          <h2 className="text-3xl font-mono text-black border-b-4 border-red-600 pb-1 inline-block">PREGLED STATISTIKE</h2>
          <div className="p-4 border-4 border-black bg-gray-100">
              <h3 className="text-xl font-mono text-black border-b border-black pb-1 mb-4">IZABERITE PARAMETRE IZVEŠTAJA:</h3>
              
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                  <InputField label="GODINA:" type="select" options={['SVE GODINE', ...uniqueYears]} value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} />
                  <InputField label="IZVOĐAČ/BEND:" type="select" options={['SVI IZVOĐAČI', ...allArtistOptions.map((a: any) => a.name)]} value={selectedArtistId} onChange={(e) => setSelectedArtistId(parseInt(e.target.value) || 0)} />
                  <InputField label="ŽANR:" type="select" options={['SVI ŽANROVI', ...uniqueGenres]} value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} />
                  <InputField label="RASPOREĐIVANJE:" type="select" options={['PRODAJA / PREGLEDI']} value="PRODAJA / PREGLEDI" onChange={() => {}} />
              </div>
              
              <div className="flex justify-end pt-4 border-t border-black">
                  <AdminButton onClick={() => setTriggerReport(true)} color="red">GENERIŠI IZVEŠTAJ</AdminButton>
              </div>
          </div>
          
          {/* Rezultati Statističkog Izveštaja (RENDER TEK NAKON KLIKA) */}
          <div className='p-4 border border-black bg-white'>
            <h3 className="text-xl font-mono text-black border-b border-black pb-1 mb-4">DETALJAN IZVEŠTAJ</h3>
            {report ? (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 font-mono'>
                    <div className='p-3 border border-gray-400 bg-lime-100'><div className='text-xs text-gray-600'>Ukupna Metrika</div><div className='text-2xl font-bold text-black'>{report.totalSales}</div></div>
                    <div className='p-3 border border-gray-400 bg-lime-100'><div className='text-xs text-gray-600'>Prosečno Mesečno</div><div className='text-2xl font-bold text-black'>{report.avgMonthly}</div></div>
                    <div className='p-3 border border-gray-400 bg-lime-100'><div className='text-xs text-gray-600'>Top Izvođač</div><div className='text-lg font-bold text-red-600'>{report.topArtist}</div></div>
                    <div className='p-3 border border-gray-400 bg-lime-100'><div className='text-xs text-gray-600'>Top Žanr</div><div className='text-lg font-bold text-red-600'>{report.topGenre}</div></div>
                </div>
            ) : (
                <p className="font-mono text-gray-600">Odaberite filtere i kliknite na "Generiši Izveštaj".</p>
            )}
          </div>
          
          {/* Mock Sekcija Korisnika unutar Dashboarda */}
          <div className="space-y-4 pt-8">
            <h3 className="text-xl font-mono text-black border-b border-black pb-1 mb-4">AKTIVNI KORISNICI (MOCK)</h3>
            <table className="w-full text-left font-mono border-collapse border border-black">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-2 border-r border-gray-700">ID</th>
                  <th className="p-2 border-r border-gray-700">IME</th>
                  <th className="p-2 border-r border-gray-700">ROLA</th>
                  <th className="p-2">ZADNJA PRIJAVA</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-black odd:bg-gray-100 even:bg-white hover:bg-lime-100 transition">
                    <td className="p-2 border-r border-black text-red-600 font-bold">{user.id}</td>
                    <td className="p-2 border-r border-black text-gray-800">{user.name}</td>
                    <td className="p-2 border-r border-black">
                      <span className={`px-2 py-0.5 text-xs font-bold ${user.role === 'ADMIN' ? 'bg-red-600 text-white' : 'bg-gray-400 text-black'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-2 text-sm text-gray-600">2025-11-28</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
};