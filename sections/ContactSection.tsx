// Naziv komponente: ContactSection
import React, { useState } from 'react';
import SectionTitle from '../components/shared/SectionTitle';

const ContactSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulacija slanja
    setTimeout(() => {
        setMessage('SIGNAL PRIMLJEN. OČEKUJTE ODGOVOR NA FREKVENCIJI.');
        setIsSubmitting(false);
        setTimeout(() => setMessage(''), 5000);
    }, 1500);
  };

  return (
    <section id="kontakt" className="bg-yellow-400 text-black py-24 px-4 min-h-screen relative flex items-center">
      
      {/* Dekorativni background noise/pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
            
            {/* LEVA STRANA - INFO I KONTEKST (Crna) */}
            <div className="bg-black text-white p-8 md:p-16 flex flex-col justify-between min-h-[600px] border-4 border-black">
                <div>
                    <SectionTitle title="KONTAKT" color="bg-yellow-400 text-black border-none px-2 mb-8 inline-block" skew={false} />
                    
                    <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8 leading-tight">
                        POŠALJI NAM <br/>
                        <span className="text-red-600">SIROVI MATERIJAL</span>.
                    </h3>
                    
                    <div className="space-y-8 font-mono text-sm md:text-base text-gray-400">
                        <div className="border-l-2 border-red-600 pl-4">
                            <p className="text-white font-bold mb-1">DEMO MATERIJALI:</p>
                            <p>Prihvatamo samo Soundcloud/Bandcamp linkove. Ne šaljite MP3 fajlove direktno.</p>
                        </div>
                        
                        <div className="border-l-2 border-red-600 pl-4">
                            <p className="text-white font-bold mb-1">BOOKING:</p>
                            <p>Otvoreni smo za showcase nastupe u industrijskim prostorima.</p>
                        </div>

                        <div className="border-l-2 border-red-600 pl-4">
                            <p className="text-white font-bold mb-1">LOKACIJA:</p>
                            <p>Novi Sad / Beograd / Internet</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-end font-mono text-xs">
                    <span>STATUS: ONLINE</span>
                    <span>LAT: 44.7866 / LON: 20.4489</span>
                </div>
            </div>

            {/* DESNA STRANA - FORMA (Bela) */}
            <div className="bg-white p-8 md:p-16 border-4 border-l-0 border-black relative">
                
                {/* Ukrasni "Ticket" broj */}
                <div className="absolute top-4 right-4 font-mono text-xs text-gray-400 border border-gray-300 px-2 py-1 transform rotate-90 origin-top-right">
                    REQ-ID: {Math.floor(Math.random() * 10000)}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative">
                    
                    <div className="relative group">
                        <label className="block font-mono text-xs font-bold text-gray-500 mb-2 uppercase group-focus-within:text-red-600 transition-colors">Identitet (Ime / Org)</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border-b-4 border-gray-300 p-4 font-mono text-lg focus:outline-none focus:border-black focus:bg-yellow-50 transition-all placeholder-gray-300"
                            placeholder="UNESITE PODATKE..."
                        />
                    </div>

                    <div className="relative group">
                        <label className="block font-mono text-xs font-bold text-gray-500 mb-2 uppercase group-focus-within:text-red-600 transition-colors">Digitalna Adresa</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-gray-50 border-b-4 border-gray-300 p-4 font-mono text-lg focus:outline-none focus:border-black focus:bg-yellow-50 transition-all placeholder-gray-300"
                            placeholder="EMAIL@PRIMER.COM"
                        />
                    </div>

                    <div className="relative group">
                        <label className="block font-mono text-xs font-bold text-gray-500 mb-2 uppercase group-focus-within:text-red-600 transition-colors">Poruka / Link</label>
                        <textarea
                            rows={4}
                            required
                            className="w-full bg-gray-50 border-b-4 border-gray-300 p-4 font-mono text-lg focus:outline-none focus:border-black focus:bg-yellow-50 transition-all placeholder-gray-300 resize-none"
                            placeholder="OPIŠITE SVOJ PROJEKAT..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white font-mono font-bold text-xl py-6 hover:bg-red-600 transition-colors border-4 border-transparent hover:border-black relative overflow-hidden group"
                    >
                        <span className={`relative z-10 ${isSubmitting ? 'animate-pulse' : ''}`}>
                            {isSubmitting ? 'SLANJE...' : 'INICIRAJ PRENOS →'}
                        </span>
                    </button>
                </form>

                {/* Poruka o uspehu - Overlay */}
                {message && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-20 border-4 border-black animate-fade-in-up">
                        <div className="text-center p-8 border-4 border-red-600 bg-black text-yellow-400 shadow-2xl transform -rotate-2">
                            <h4 className="text-2xl font-bold font-mono mb-2">STATUS: POTVRĐENO</h4>
                            <p className="font-mono text-sm">{message}</p>
                        </div>
                    </div>
                )}

            </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;