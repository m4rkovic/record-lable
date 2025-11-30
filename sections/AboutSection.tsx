// Naziv komponente: AboutSection
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { useData } from '../context/DataContext'; 
import type { PathName } from '../data/types';

// Simulišemo Link
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

const AboutSection: React.FC = () => {
  // Vučemo prave podatke za statistiku
  const { artists, releases, articles } = useData();

  return (
    <section id="o-nama" className="bg-white text-black py-24 px-4 min-h-screen relative overflow-hidden">
      
      {/* Dekorativna pozadina - Tehnički crtež mreža */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEVA KOLONA - NASLOV I MANIFEST (5/12) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                    <SectionTitle title="KOLEKTIV" color="bg-black text-white border-none px-2" skew={false} />
                    
                    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mt-6 mb-8 leading-none">
                        MI NE <span className="text-red-600">IZDAJEMO</span>. <br/>
                        MI <span className="text-red-600">PROVOCIRAMO</span>.
                    </h2>
                    
                    <div className="p-6 border-l-8 border-red-600 bg-gray-100 shadow-lg">
                        <p className="font-serif text-xl leading-relaxed text-gray-900 font-medium">
                            "Void Sound nije samo platforma. To je otpor algoritamskoj muzici. 
                            U svetu savršenih plejlista, mi smo greška u sistemu koju ne možete ignorisati."
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 lg:mt-0">
                    <p className="font-mono text-sm text-gray-500 mb-4 uppercase tracking-widest">Želiš da nam se pridružiš?</p>
                    <Link to="/kontakt" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg font-mono font-bold text-white bg-black hover:bg-red-600 transition-colors border-4 border-transparent hover:border-black">
                        POŠALJI DEMO MATERIJAL →
                    </Link>
                </div>
            </div>

            {/* DESNA KOLONA - STATISTIKA I INFOGRAFIK (7/12) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
                
                {/* Glavni Info Blok */}
                <div className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] relative">
                    <div className="absolute -top-3 -right-3 bg-yellow-400 px-4 py-1 font-mono text-sm font-bold border-2 border-black transform rotate-3">
                        EST. 2021
                    </div>

                    <h3 className="text-2xl font-mono font-bold border-b-2 border-black pb-4 mb-6">
                        OPERATIVNI PODACI
                    </h3>

                    <div className="grid grid-cols-2 gap-8">
                        {/* Stat 1 */}
                        <div className="flex flex-col">
                            <span className="text-6xl font-black text-black">{artists.length}</span>
                            <span className="font-mono text-sm text-gray-500 mt-2 uppercase">Aktivnih Izvođača</span>
                        </div>
                         {/* Stat 2 */}
                         <div className="flex flex-col">
                            <span className="text-6xl font-black text-black">{releases.length}</span>
                            <span className="font-mono text-sm text-gray-500 mt-2 uppercase">Fizičkih Izdanja</span>
                        </div>
                        {/* Stat 3 */}
                        <div className="flex flex-col">
                            <span className="text-6xl font-black text-black">{articles.length}</span>
                            <span className="font-mono text-sm text-gray-500 mt-2 uppercase">Objavljenih Tekstova</span>
                        </div>
                        {/* Stat 4 */}
                         <div className="flex flex-col justify-end">
                            <div className="h-4 w-full bg-gray-200 overflow-hidden">
                                <div className="h-full bg-red-600 w-3/4 animate-pulse"></div>
                            </div>
                            <span className="font-mono text-xs text-gray-500 mt-2">KAPACITET STUDIJA: 75%</span>
                        </div>
                    </div>
                </div>

                {/* Dodatni Tekstualni Blok (Filozofija) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                    <div className="border-2 border-gray-200 p-4 hover:border-black transition-colors">
                        <h4 className="font-bold text-red-600 mb-2">// ANALOGNI PURIZAM</h4>
                        <p className="text-gray-600">
                            Verujemo u šum trake i toplinu vinila. Svako izdanje prolazi kroz analogni mastering proces.
                        </p>
                    </div>
                    <div className="border-2 border-gray-200 p-4 hover:border-black transition-colors">
                        <h4 className="font-bold text-red-600 mb-2">// VIZUELNI IDENTITET</h4>
                        <p className="text-gray-600">
                            Pakovanje je deo umetničkog dela. Brutalizam nije stil, to je naš način komunikacije bez filtera.
                        </p>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;