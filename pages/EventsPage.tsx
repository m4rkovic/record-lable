// Naziv komponente: EventsPage
import React, { useMemo, useState } from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { MOCK_EVENTS } from '../data/mockData';
import type { PathName, Event } from '../data/types'; 

// Simulišemo Link i useNavigate hook
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

// --- LOKALNA KOMPONENTA: KARTICA DOGAĐAJA ---
const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
    // Generiše boju na osnovu tipa događaja (za brutalistički stil)
    const cardColor = event.type === 'Live' ? 'bg-red-800' : (event.type === 'Festival' ? 'bg-yellow-600' : 'bg-gray-800');
    
    // Generisanje mock URL-a za sliku
    const imgColor = event.type === 'Live' ? 'FF0000' : (event.type === 'Festival' ? 'FFFF00' : '000000');
    const imgUrl = `https://placehold.co/600x400/${imgColor}/FFFFFF?text=EVENT+${event.id}`;
    
    return (
        <Link 
            to={`/dogadjaji/${event.id}` as PathName}
            className={`
                block border-4 border-black shadow-lg transition duration-300 transform group
                hover:shadow-red-600/50 hover:-translate-y-1 
                ${cardColor}
                ${index % 2 !== 0 ? 'md:mt-8' : ''} // Asimetrija
            `}
        >
            <div className="relative overflow-hidden">
                 <img 
                    src={imgUrl} 
                    alt={event.title} 
                    className="w-full h-auto object-cover border-b-4 border-black group-hover:scale-[1.05] transition duration-500"
                />
                <div className="absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full group-hover:bg-opacity-10 transition duration-300"></div>
            </div>

            <div className="p-4 text-white font-mono">
                <h3 className="text-3xl font-extrabold mb-1">{event.title.toUpperCase()}</h3>
                <p className="text-sm border-b border-white border-opacity-30 pb-2 mb-2">
                    {event.date} / LOKACIJA: {event.location}
                </p>
                <div className="flex justify-between items-center mt-3">
                    <span className={`px-2 py-0.5 text-xs font-bold text-black ${event.type === 'Live' ? 'bg-yellow-400' : 'bg-red-600 text-white'}`}>
                        {event.type.toUpperCase()}
                    </span>
                    <span className="text-sm font-bold hover:text-yellow-400">
                        DETALJI {'>'}
                    </span>
                </div>
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
    
    // Paginacija
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Broj događaja po stranici

    // Koristimo MOCK_EVENTS
    const events: Event[] = MOCK_EVENTS as Event[]; 

    // --- IZVEDENI PODACI ZA FILTERE ---
    const uniqueTypes = useMemo(() => Array.from(new Set(events.map(e => e.type))).sort(), [events]);
    
    // Izvlačenje godina iz datuma (YYYY-MM-DD)
    const uniqueYears = useMemo(() => {
        const years = events.map(e => e.date.split('-')[0]);
        return Array.from(new Set(years)).sort().reverse();
    }, [events]);

    const months = [
        { value: '01', label: 'JANUAR' }, { value: '02', label: 'FEBRUAR' }, { value: '03', label: 'MART' },
        { value: '04', label: 'APRIL' }, { value: '05', label: 'MAJ' }, { value: '06', label: 'JUN' },
        { value: '07', label: 'JUL' }, { value: '08', label: 'AVGUST' }, { value: '09', label: 'SEPTEMBAR' },
        { value: '10', label: 'OKTOBAR' }, { value: '11', label: 'NOVEMBAR' }, { value: '12', label: 'DECEMBAR' }
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

    // --- PAGINACIJA LOGIKA ---
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    
    const paginatedEvents = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredEvents.slice(start, start + itemsPerPage);
    }, [filteredEvents, currentPage]);

    // Reset paginacije kad se promeni filter
    const handleFilterChange = (setter: (val: string) => void, value: string) => {
        setter(value);
        setCurrentPage(1);
    };


    return (
        <section className="min-h-screen pt-12 pb-20 bg-gray-900 text-white px-4">
            <div className="max-w-7xl mx-auto">
                <SectionTitle title="DOGAĐAJI I NASTUPI" color="border-red-600 bg-yellow-400 text-black" skew={true} />

                {/* --- FILTER BAR --- */}
                <div className="mb-12 p-6 border-4 border-white bg-gray-800 shadow-xl">
                    
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="PRETRAŽI PO NASLOVU ILI LOKACIJI..."
                        value={searchTerm}
                        onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
                        className="w-full p-3 border-2 border-red-600 bg-black text-yellow-400 font-mono text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-6"
                    />

                    {/* Dropdowns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* Tip/Žanr */}
                        <div className="flex flex-col">
                            <label className="text-xs font-mono text-gray-400 mb-1">TIP DOGAĐAJA:</label>
                            <select 
                                value={selectedType}
                                onChange={(e) => handleFilterChange(setSelectedType, e.target.value)}
                                className="p-2 border-2 border-white bg-black text-white font-mono focus:border-yellow-400"
                            >
                                <option value="">SVI TIPOVI</option>
                                {uniqueTypes.map(type => (
                                    <option key={type} value={type}>{type.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>

                        {/* Godina */}
                        <div className="flex flex-col">
                            <label className="text-xs font-mono text-gray-400 mb-1">GODINA:</label>
                            <select 
                                value={selectedYear}
                                onChange={(e) => handleFilterChange(setSelectedYear, e.target.value)}
                                className="p-2 border-2 border-white bg-black text-white font-mono focus:border-yellow-400"
                            >
                                <option value="">SVE GODINE</option>
                                {uniqueYears.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        {/* Mesec */}
                        <div className="flex flex-col">
                            <label className="text-xs font-mono text-gray-400 mb-1">MESEC:</label>
                            <select 
                                value={selectedMonth}
                                onChange={(e) => handleFilterChange(setSelectedMonth, e.target.value)}
                                className="p-2 border-2 border-white bg-black text-white font-mono focus:border-yellow-400"
                            >
                                <option value="">SVI MESECI</option>
                                {months.map(m => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 text-right font-mono text-sm text-gray-500">
                        REZULTATA: {filteredEvents.length}
                    </div>
                </div>

                {/* --- LISTA DOGAĐAJA --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {paginatedEvents.length > 0 ? (
                        paginatedEvents.map((event, index) => (
                            <EventCard key={event.id} event={event} index={index} />
                        ))
                    ) : (
                         <div className="col-span-full text-center p-12 border-4 border-red-600 bg-black">
                            <p className="text-2xl font-mono text-red-600">NEMA REZULTATA</p>
                            <p className="text-lg font-serif mt-2 text-gray-400">Promenite filtere pretrage.</p>
                        </div>
                    )}
                </div>

                {/* --- PAGINACIJA KONTROLE --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 font-mono">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 border-2 ${currentPage === 1 ? 'border-gray-700 text-gray-700 cursor-not-allowed' : 'border-white text-white hover:bg-white hover:text-black'}`}
                        >
                            {'<'} PRETHODNA
                        </button>
                        
                        <span className="text-yellow-400 font-bold">
                            STRANA {currentPage} / {totalPages}
                        </span>

                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 border-2 ${currentPage === totalPages ? 'border-gray-700 text-gray-700 cursor-not-allowed' : 'border-white text-white hover:bg-white hover:text-black'}`}
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