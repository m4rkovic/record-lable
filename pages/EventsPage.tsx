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
    // Stanje i mock podaci (ako filteri nisu definisani, koristimo lokalno stanje)
    const [searchTerm, setSearchTerm] = useState('');

    // Koristimo MOCK_EVENTS direktno (trebalo bi da dođe iz Context-a u Next.js-u)
    const events: Event[] = MOCK_EVENTS as Event[];

    const filteredEvents = useMemo(() => {
        return events.filter(event =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [events, searchTerm]);

    const uniqueTypes = useMemo(() => {
        const types = events.map(e => e.type);
        return Array.from(new Set(types)).sort();
    }, [events]);


    return (
        <section className="min-h-screen pt-12 pb-20 bg-gray-900 text-white px-4">
            <div className="max-w-7xl mx-auto">
                <SectionTitle title="DOGAĐAJI I NASTUPI" color="border-red-600 bg-yellow-400 text-black" skew={true} />

                {/* Filteri */}
                <div className="mb-12 p-6 border-4 border-white bg-gray-800 shadow-xl transform skew-y-1">
                    <input
                        type="text"
                        placeholder="PRETRAŽI PO NASLOVU ILI LOKACIJI..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border-2 border-red-600 bg-black text-yellow-400 font-mono text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
                    />
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-600">
                        <span className='text-sm font-mono text-gray-400'>TIP:</span>
                        {uniqueTypes.map(type => (
                            <span key={type} className='px-2 py-0.5 text-xs font-mono bg-gray-600 hover:bg-red-600 transition cursor-pointer'>
                                {type.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <EventCard key={event.id} event={event} index={index} />
                        ))
                    ) : (
                        <div className="col-span-full text-center p-12 border-4 border-red-600 bg-black">
                            <p className="text-2xl font-mono text-red-600">NEMA REZULTATA</p>
                            <p className="text-lg font-serif mt-2 text-gray-400">Trenutno nema događaja koji odgovaraju kriterijumima pretrage.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EventsPage;