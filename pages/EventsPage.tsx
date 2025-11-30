// Naziv komponente: EventsPage
import React, { useMemo, useState } from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { MOCK_EVENTS } from '../data/mockData';
import type { PathName, Event } from '../data/types'; 

// Simulišemo Link
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

// --- LOKALNA KOMPONENTA: EVENT KARTICA (REDIZAJNIRANA) ---
const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
    // Generisanje boja i slike
    const typeColor = event.type === 'Live' ? 'bg-red-600' : (event.type === 'Festival' ? 'bg-yellow-400' : 'bg-gray-800');
    const textColor = event.type === 'Festival' ? 'text-black' : 'text-white';
    
    // Banner slika (koristimo tip za boju)
    const bannerColor = event.type === 'Live' ? '8B0000' : (event.type === 'Festival' ? 'B8860B' : '333333');
    const imgUrl = `https://placehold.co/600x400/${bannerColor}/FFFFFF?text=EVENT`;
    
    return (
        <Link 
            to={`/dogadjaji/${event.id}` as PathName}
            className={`
                block group relative overflow-hidden border-4 border-black bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                ${index % 2 !== 0 ? 'md:mt-12' : ''} // Asimetrija
            `}
        >
            {/* Header kartice: Datum i Tip */}
            <div className="flex justify-between items-stretch border-b-4 border-black">
                <div className="bg-black text-white p-3 font-mono text-center min-w-[80px] flex flex-col justify-center">
                    <span className="text-2xl font-black leading-none">{event.date.split('-')[2]}</span>
                    <span className="text-xs uppercase">{event.date.split('-')[1]}</span>
                </div>
                <div className={`flex-grow flex items-center justify-center font-black uppercase tracking-widest ${typeColor} ${textColor}`}>
                    {event.type}
                </div>
            </div>

            {/* Slika */}
            <div className="relative aspect-video overflow-hidden border-b-4 border-black">
                 <img 
                    src={imgUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>

            {/* Telo kartice */}
            <div className="p-6">
                <h3 className="text-3xl font-black uppercase leading-none mb-4 group-hover:text-red-600 transition-colors line-clamp-2">
                    {event.title}
                </h3>
                
                <div className="space-y-2 font-mono text-sm text-gray-600 border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between">
                        <span className="font-bold">VREME:</span>
                        <span>{event.time}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold">LOKACIJA:</span>
                        <span className="text-right max-w-[60%] truncate">{event.location}</span>
                    </div>
                </div>
            </div>

            {/* Footer Akcija */}
            <div className="bg-black text-white p-3 text-center font-mono font-bold group-hover:bg-red-600 transition-colors">
                DETALJI I ULAZNICE →
            </div>
        </Link>
    );
};


// --- GLAVNA KOMPONENTA STRANICE ---
const EventsPage: React.FC = () => {
    // --- STANJA ---
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 

    const events: Event[] = MOCK_EVENTS as Event[]; 

    // --- IZVEDENI PODACI ---
    const uniqueTypes = useMemo(() => Array.from(new Set(events.map(e => e.type))).sort(), [events]);
    const uniqueYears = useMemo(() => {
        const years = events.map(e => e.date.split('-')[0]);
        return Array.from(new Set(years)).sort().reverse();
    }, [events]);

    const months = [
        { value: '01', label: 'JAN' }, { value: '02', label: 'FEB' }, { value: '03', label: 'MAR' },
        { value: '04', label: 'APR' }, { value: '05', label: 'MAJ' }, { value: '06', label: 'JUN' },
        { value: '07', label: 'JUL' }, { value: '08', label: 'AVG' }, { value: '09', label: 'SEP' },
        { value: '10', label: 'OKT' }, { value: '11', label: 'NOV' }, { value: '12', label: 'DEC' }
    ];

    // --- FILTRIRANJE ---
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const eventYear = event.date.split('-')[0];
            const eventMonth = event.date.split('-')[1];

            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  event.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === '' || event.type === selectedType;
            const matchesYear = selectedYear === '' || eventYear === selectedYear;
            const matchesMonth = selectedMonth === '' || eventMonth === selectedMonth;

            return matchesSearch && matchesType && matchesYear && matchesMonth;
        });
    }, [events, searchTerm, selectedType, selectedYear, selectedMonth]);

    // --- PAGINACIJA ---
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const paginatedEvents = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredEvents.slice(start, start + itemsPerPage);
    }, [filteredEvents, currentPage]);

    const handleFilterChange = (setter: (val: string) => void, value: string) => {
        setter(value);
        setCurrentPage(1);
    };

    return (
        <section className="min-h-screen pt-32 pb-20 bg-gray-100 text-black px-4 border-t-8 border-black">
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-16">
                    <SectionTitle title="KALENDAR DOGAĐAJA" color="bg-black text-white border-none px-4 inline-block" skew={false} />
                     <p className="mt-4 font-mono text-gray-500 max-w-2xl">
                        Predstojeći rituali, festivali i okupljanja.
                     </p>
                </div>

                {/* --- FILTER BAR (Kontrolna Tabla) --- */}
                <div className="mb-16 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Search */}
                        <div className="lg:col-span-4">
                             <input
                                type="text"
                                placeholder="PRETRAŽI DOGAĐAJE (NASLOV, LOKACIJA)..."
                                value={searchTerm}
                                onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
                                className="w-full p-3 border-2 border-black bg-gray-100 font-mono text-lg focus:outline-none focus:bg-white focus:border-red-600 transition-colors"
                            />
                        </div>
                        
                        {/* Dropdowns */}
                        <div className="flex flex-col">
                            <label className="font-bold font-mono text-xs mb-1 uppercase text-gray-500">Tip Događaja</label>
                            <select 
                                value={selectedType}
                                onChange={(e) => handleFilterChange(setSelectedType, e.target.value)}
                                className="p-2 border-2 border-black bg-white font-mono focus:outline-none focus:border-red-600"
                            >
                                <option value="">SVI TIPOVI</option>
                                {uniqueTypes.map(type => (<option key={type} value={type}>{type.toUpperCase()}</option>))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold font-mono text-xs mb-1 uppercase text-gray-500">Godina</label>
                            <select 
                                value={selectedYear}
                                onChange={(e) => handleFilterChange(setSelectedYear, e.target.value)}
                                className="p-2 border-2 border-black bg-white font-mono focus:outline-none focus:border-red-600"
                            >
                                <option value="">SVE GODINE</option>
                                {uniqueYears.map(year => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold font-mono text-xs mb-1 uppercase text-gray-500">Mesec</label>
                            <select 
                                value={selectedMonth}
                                onChange={(e) => handleFilterChange(setSelectedMonth, e.target.value)}
                                className="p-2 border-2 border-black bg-white font-mono focus:outline-none focus:border-red-600"
                            >
                                <option value="">SVI MESECI</option>
                                {months.map(m => (<option key={m.value} value={m.value}>{m.label}</option>))}
                            </select>
                        </div>
                        
                        <div className="flex flex-col justify-end">
                            <div className="font-mono text-xs text-right p-2 bg-black text-white">
                                REZULTATA: {filteredEvents.length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- LISTA DOGAĐAJA --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 mb-16">
                    {paginatedEvents.length > 0 ? (
                        paginatedEvents.map((event, index) => (
                            <EventCard key={event.id} event={event} index={index} />
                        ))
                    ) : (
                         <div className="col-span-full p-16 border-4 border-dashed border-gray-400 text-center bg-gray-50">
                            <p className="text-3xl font-black text-gray-300 uppercase">Nema zakazanih događaja.</p>
                            <button onClick={() => {setSearchTerm(''); setSelectedType(''); setSelectedYear(''); setSelectedMonth('');}} className="mt-4 text-red-600 font-bold underline">RESETUJ FILTERE</button>
                        </div>
                    )}
                </div>

                {/* --- PAGINACIJA --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 font-mono border-t-2 border-gray-200 pt-8">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-6 py-2 border-2 font-bold transition-colors ${currentPage === 1 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-black hover:bg-black hover:text-white'}`}
                        >
                            {'<'} PRETHODNA
                        </button>
                        
                        <span className="text-black font-bold text-lg">
                            {currentPage} / {totalPages}
                        </span>

                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-6 py-2 border-2 font-bold transition-colors ${currentPage === totalPages ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-black hover:bg-black hover:text-white'}`}
                        >
                            SLEDEĆA {'>'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventsPage;