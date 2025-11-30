// Naziv komponente: EventDetailPage
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { MOCK_EVENTS, MOCK_ARTISTS } from '../data/mockData';
import type { PathName } from '../data/types'; 

// Simulišemo Link komponentu
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

interface EventDetailPageProps {
    eventId: number;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ eventId }) => {
    const event = MOCK_EVENTS.find(e => e.id === eventId);

    if (!event) {
        return (
            <section className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <SectionTitle title="DOGAĐAJ NIJE PRONAĐEN" color="border-red-600 bg-yellow-400 text-black" skew={true} />
                <Link to="/dogadjaji" className="inline-block px-6 py-3 bg-red-600 text-white font-mono text-lg border-2 border-white hover:bg-yellow-400 hover:text-black transition duration-300">
                    NAZAD NA LISTU
                </Link>
            </section>
        );
    }
    
    // Generisanje banner slike (boja zavisi od tipa)
    const typeColor = event.type === 'Live' ? '8B0000' : (event.type === 'Festival' ? 'B8860B' : '333333');
    const bannerUrl = `https://placehold.co/1920x600/${typeColor}/FFFFFF?text=${event.title.toUpperCase()}+BANNER`;

    // Pronalaženje artist objekata za lineup
    const lineupArtists = MOCK_ARTISTS.filter(a => event.artists.includes(a.name));

    return (
        <section className="min-h-screen pt-16 pb-20 bg-white text-black">
            
            {/* --- HERO BANER SEKCIJA --- */}
            <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden border-b-8 border-black">
                <div 
                    className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
                    style={{ backgroundImage: `url(${bannerUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 flex flex-col items-start">
                    <div className="bg-red-600 text-white font-mono font-bold px-4 py-1 text-sm mb-4 transform -skew-x-12 inline-block shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                        {event.type.toUpperCase()} // KATEGORIJA
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
                        {event.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEVA KOLONA: INFO TICKET (4/12) --- */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        <div className="bg-yellow-400 p-6 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] sticky top-24">
                            <h3 className="font-black text-2xl border-b-4 border-black pb-2 mb-4 uppercase">PODACI O DOGAĐAJU</h3>
                            
                            <div className="space-y-4 font-mono">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-red-600 uppercase">Datum</span>
                                    <span className="text-2xl font-bold">{event.date}</span>
                                </div>
                                <div className="flex flex-col border-t-2 border-black/20 pt-2">
                                    <span className="text-xs font-bold text-red-600 uppercase">Vreme</span>
                                    <span className="text-xl font-bold">{event.time}</span>
                                </div>
                                <div className="flex flex-col border-t-2 border-black/20 pt-2">
                                    <span className="text-xs font-bold text-red-600 uppercase">Lokacija</span>
                                    <span className="text-xl font-bold leading-tight">{event.location}</span>
                                </div>
                                 <div className="flex flex-col border-t-2 border-black/20 pt-2">
                                    <span className="text-xs font-bold text-red-600 uppercase">Lineup</span>
                                    <ul className="mt-1 space-y-1">
                                        {event.artists.map(artist => (
                                            <li key={artist} className="text-lg font-bold">→ {artist}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t-4 border-black text-center">
                                <button className="w-full bg-black text-white font-mono font-bold py-4 text-lg hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all uppercase">
                                    Kupi Ulaznicu
                                </button>
                                <p className="mt-2 text-xs font-mono text-black/60">Dostupno još: 42/200</p>
                            </div>
                        </div>
                    </div>

                    {/* --- DESNA KOLONA: SADRŽAJ (8/12) --- */}
                    <div className="lg:col-span-8 order-1 lg:order-2 bg-white pt-12 lg:pt-0">
                        
                        {/* Opis */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-black mb-6 uppercase border-l-8 border-red-600 pl-4">Opis i Koncept</h2>
                            <p className="font-serif text-xl leading-relaxed text-gray-800">
                                {event.description}
                            </p>
                            <p className="font-serif text-lg leading-relaxed text-gray-600 mt-4">
                                Ovaj događaj predstavlja kulminaciju višemesečnog rada na dekonstrukciji zvuka. 
                                Očekujte imerzivno audio-vizuelno iskustvo koje briše granice između izvođača i publike.
                                Prostor će biti transformisan specijalnim instalacijama svetla i dima.
                            </p>
                        </div>

                        {/* Lineup Grid (Linkovi ka artistima) */}
                        <div className="mb-16">
                            <SectionTitle title="LINEUP / IZVOĐAČI" color="bg-black text-white px-2 border-none inline-block" skew={false} />
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                {lineupArtists.map(artist => (
                                    <Link 
                                        key={artist.id} 
                                        to={`/izvodjaci/${artist.id}` as PathName}
                                        className="flex items-center border-2 border-black p-4 hover:bg-black hover:text-white transition-colors group"
                                    >
                                        <img 
                                            src={artist.imageUrl} 
                                            alt={artist.name} 
                                            className="w-16 h-16 object-cover border border-black mr-4 grayscale group-hover:grayscale-0"
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=X'; }}
                                        />
                                        <div>
                                            <h4 className="font-black text-xl uppercase">{artist.name}</h4>
                                            <span className="text-xs font-mono text-red-600 group-hover:text-yellow-400">{artist.genre}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Galerija (Mock) */}
                        <div>
                            <h3 className="font-mono font-bold text-gray-400 mb-4 uppercase tracking-widest">Arhiva Prošlih Događaja</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-video bg-gray-200 overflow-hidden relative group">
                                        <img 
                                            src={`https://placehold.co/400x300/333/FFF?text=FOTO+${i}`} 
                                            alt="Gallery" 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-16 border-t-2 border-gray-200 pt-8 text-center">
                             <Link to="/dogadjaji" className="font-mono text-gray-500 hover:text-black transition-colors uppercase tracking-widest border-b border-transparent hover:border-black pb-1">
                                ← Povratak na listu događaja
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default EventDetailPage;