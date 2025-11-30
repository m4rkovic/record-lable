// Naziv komponente: AboutPage
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import { useData } from '../context/DataContext'; // Koristimo podatke za statistiku
import type { PathName } from '../data/types';

// Simulišemo Link
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

const AboutPage: React.FC = () => {
  const { artists, releases, articles } = useData();

  return (
    <section className="min-h-screen pt-32 pb-20 bg-white text-black px-4 border-t-8 border-black">
      
      {/* Pozadinski Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- ZAGLAVLJE --- */}
        <div className="mb-20">
            <SectionTitle title="O NAMA / DOSIJE" color="bg-black text-white border-none px-4 inline-block" skew={false} />
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mt-6 leading-none uppercase">
                MI NISMO <span className="text-red-600">IZDAVAČKA KUĆA</span>. <br/>
                MI SMO <span className="text-red-600">FILTER</span>.
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- LEVA KOLONA: MANIFEST (7/12) --- */}
            <div className="lg:col-span-7 space-y-12">
                
                {/* Manifest Blok */}
                <div className="p-8 border-l-8 border-black bg-gray-100">
                    <h3 className="text-2xl font-mono font-bold mb-4 border-b-2 border-black pb-2">01 // MISIJA</h3>
                    <p className="font-serif text-xl leading-relaxed text-gray-900">
                        "U eri algoritamske muzike i savršenih plejlista, Void Sound postoji kao greška u sistemu. 
                        Naš fokus je na sirovom audio iskustvu, namernoj nesavršenosti i teksturi zvuka koja odbija 
                        uglađenu komercijalizaciju. Verujemo u inherentnu vrednost zvuka izvan konvencionalne melodije."
                    </p>
                </div>

                <div className="p-8 border-l-8 border-red-600 bg-black text-white">
                    <h3 className="text-2xl font-mono font-bold mb-4 border-b-2 border-red-600 pb-2 text-yellow-400">02 // ANALOGNI PURIZAM</h3>
                    <p className="font-mono text-lg leading-relaxed">
                        Svako izdanje prolazi kroz analogni mastering proces. Verujemo u fizičke medije kao jedine prave arhive.
                        Digitalno je prolazno, vinil i kaseta su večni.
                    </p>
                </div>

                {/* Timeline Log */}
                <div className="font-mono text-sm border-2 border-black p-4">
                    <h4 className="font-bold border-b border-black mb-2">SISTEMSKI LOG: ISTORIJA</h4>
                    <ul className="space-y-2">
                        <li className="flex"><span className="w-24 text-gray-500">2025-11</span> <span>Pokretanje Void Sound v2.0 platforme.</span></li>
                        <li className="flex"><span className="w-24 text-gray-500">2023-05</span> <span>Prvo međunarodno izdanje (Vortex Unit).</span></li>
                        <li className="flex"><span className="w-24 text-gray-500">2021-09</span> <span>Formiranje kolektiva u Novom Sadu.</span></li>
                        <li className="flex"><span className="w-24 text-gray-500">2018-01</span> <span>Inicijalni koncept i prvi demo snimci.</span></li>
                    </ul>
                </div>

            </div>

            {/* --- DESNA KOLONA: STATISTIKA I TIM (5/12) --- */}
            <div className="lg:col-span-5 flex flex-col gap-8">
                
                {/* Statistički Panel */}
                <div className="border-4 border-black p-6 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-mono font-bold border-b-2 border-black pb-2 mb-6 uppercase">
                        Baza Podataka
                    </h3>
                    <div className="grid grid-cols-2 gap-6 text-center">
                        <div className="border-2 border-gray-200 p-4">
                            <span className="block text-5xl font-black text-red-600">{artists.length}</span>
                            <span className="text-xs font-mono uppercase text-gray-500">Aktivnih Jedinica</span>
                        </div>
                        <div className="border-2 border-gray-200 p-4">
                            <span className="block text-5xl font-black text-black">{releases.length}</span>
                            <span className="text-xs font-mono uppercase text-gray-500">Kataloških Brojeva</span>
                        </div>
                         <div className="border-2 border-gray-200 p-4">
                            <span className="block text-5xl font-black text-black">{articles.length}</span>
                            <span className="text-xs font-mono uppercase text-gray-500">Dokumenata</span>
                        </div>
                        <div className="border-2 border-gray-200 p-4 flex items-center justify-center bg-black text-yellow-400 font-mono font-bold text-xl">
                            EST. 2021
                        </div>
                    </div>
                </div>

                {/* Kontakt CTA */}
                <div className="bg-yellow-400 p-8 border-4 border-black text-center transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <h4 className="text-2xl font-black mb-4 uppercase">Želiš da se pridružiš?</h4>
                    <p className="font-mono text-sm mb-6">Tražimo novi zvuk. Ako misliš da pripadaš ovde, pošalji nam demo.</p>
                    <Link to="/kontakt" className="inline-block bg-black text-white font-mono font-bold py-3 px-8 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors">
                        POŠALJI MATERIJAL
                    </Link>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;