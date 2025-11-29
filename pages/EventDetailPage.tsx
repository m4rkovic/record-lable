// Naziv komponente: EventDetailPage
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { MOCK_EVENTS } from '../data/mockData';
import type { PathName } from '../data/types'; 

// Simulišemo Link komponentu iz react-router-dom
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

interface EventDetailPageProps {
    eventId: number;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ eventId }) => {
    // 1. Pronađi događaj
    const event = MOCK_EVENTS.find(e => e.id === eventId);

    // 2. Obrada 404
    if (!event) {
        return (
            <section className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <SectionTitle title="DOGAĐAJ NIJE PRONAĐEN" color="border-red-600 bg-yellow-400 text-black" skew={true} />
                <Link to="/dogadjaji" className="inline-block px-6 py-3 bg-red-600 text-white font-mono text-lg border-2 border-white hover:bg-yellow-400 hover:text-black transition duration-300">
                    NAZAD NA LISTU DOGAĐAJA
                </Link>
            </section>
        );
    }
    
    // 3. Prikaz detalja
    
    // Generiše boju banera na osnovu tipa (brutalist crveno/žuto/sivo)
    const typeColor = event.type === 'Live' ? 'FF4500' : (event.type === 'Festival' ? 'FFD700' : '808080');
    const bannerUrl = `https://placehold.co/1200x400/${typeColor}/000000?text=${event.title.toUpperCase()}`;

    return (
        <section className="min-h-screen pt-20 pb-20 bg-gray-900 text-white">
            
            {/* Naslovna Sekcija/Baner */}
            <div className="w-full h-96 bg-cover bg-center relative border-b-4 border-red-600" 
                 style={{ backgroundImage: `url(${bannerUrl})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4">
                    <span className='text-xl font-mono text-yellow-400 mb-2 border border-yellow-400 px-3 py-1'>{event.type.toUpperCase()}</span>
                    <h1 className="text-6xl md:text-8xl font-extrabold font-mono text-white tracking-tighter mix-blend-difference text-center">
                        {event.title.toUpperCase()}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-8">
                
                {/* 1. Detalji i Opis */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                    {/* Blok Detalja (1/3 širine) */}
                    <div className="lg:col-span-1 p-6 border-4 border-red-600 bg-black shadow-xl h-fit transform -skew-y-1">
                        <h2 className="text-4xl font-mono font-bold mb-4 text-red-600">INFO</h2>
                        <p className="font-mono text-sm border-b border-gray-700 py-2">
                            <span className="text-yellow-400 font-extrabold mr-2">DATUM:</span> {event.date}
                        </p>
                        <p className="font-mono text-sm border-b border-gray-700 py-2">
                            <span className="text-yellow-400 font-extrabold mr-2">LOKACIJA:</span> {event.location}
                        </p>
                         <p className="font-mono text-sm py-2">
                            <span className="text-yellow-400 font-extrabold mr-2">VREME:</span> {event.time}
                        </p>
                        <button className="mt-6 w-full py-2 bg-yellow-400 text-black font-extrabold border-2 border-black hover:bg-red-600 hover:text-white transition">
                            REZERVACIJA / ULAZNICE
                        </button>
                    </div>
                    
                    {/* Blok Opis (2/3 širine) */}
                    <div className="lg:col-span-2 p-6 border-4 border-white bg-gray-800 shadow-xl">
                        <h2 className="text-4xl font-mono font-bold mb-4 text-yellow-400">OPIS DOGAĐAJA</h2>
                        <p className="font-serif text-lg leading-relaxed mb-6">
                            {event.description}
                        </p>

                        <h3 className="text-2xl font-mono text-red-600 mt-6 mb-3 border-b border-red-600 pb-1">
                            IZVOĐAČI
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {event.artists.map(artistName => (
                                <span key={artistName} className="px-3 py-1 bg-gray-600 text-white font-mono text-sm border border-white">
                                    {artistName}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Galerija Slika (Simulacija) */}
                <div className="mt-16">
                    <SectionTitle title="VIZUALNI DOKUMENTI" color="border-yellow-400 bg-gray-900" skew={true} />
                    
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {/* Simulišemo 4 slike događaja */}
                        {[1, 2, 3, 4].map(i => (
                            <img 
                                key={i}
                                src={`https://placehold.co/400x300/808080/FFFFFF?text=FOTO+${i}`}
                                alt={`Event photo ${i}`}
                                className="w-full h-auto object-cover border-4 border-white transition duration-300 hover:border-red-600"
                            />
                        ))}
                    </div>
                </div>

                {/* Navigacija nazad */}
                <div className="mt-12 text-center">
                     <Link to="/dogadjaji" className="inline-block px-6 py-3 bg-black text-yellow-400 font-mono text-lg border-2 border-yellow-400 hover:bg-red-600 hover:text-white transition duration-300">
                        {'<'} NAZAD NA SVE DOGAĐAJE
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default EventDetailPage;