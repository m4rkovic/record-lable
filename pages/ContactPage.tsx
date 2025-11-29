// Naziv komponente: ContactPage
import React, { useState } from 'react';
import SectionTitle from '../components/shared/SectionTitle';

// Stranica za Kontakt (sa izmenjenim layout-om)
const ContactPage: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('PORUKA POSLATA. HVALA NA INTERESOVANJU. ČEKAJTE POVRATNU INFORMACIJU.');
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 bg-yellow-400 text-black px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Kontakt Forma - Kolona 1/2 */}
        <div className="lg:col-span-2 p-8 border-4 border-black shadow-2xl bg-white h-fit">
          <SectionTitle title="INICIJATIVA / KONTAKT" color="border-black bg-yellow-400" skew={false} />
          
          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            <input
              type="text"
              placeholder="IME I PREZIME / NAZIV ORGANIZACIJE"
              required
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-red-600 bg-gray-200"
            />
            <input
              type="email"
              placeholder="E-MAIL ADRESA"
              required
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-red-600 bg-gray-200"
            />
            <textarea
              placeholder="PORUKA / PREDLOG SARADNJE (SIROV MATERIJAL, DEMO LINK, PREDLOG ARTIKLA)"
              rows={8}
              required
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-red-600 bg-gray-200"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-black text-yellow-400 font-extrabold border-2 border-black hover:bg-red-800 hover:text-white transition duration-150"
            >
              POŠALJI NEFILTRIRANI ZVUK
            </button>
          </form>
          {message && (
            <div className="mt-6 p-4 border-2 border-red-600 bg-black text-yellow-400 font-mono text-center">
              {message}
            </div>
          )}
        </div>
        
        {/* Info Blok - Kolona 3 */}
        <div className="p-8 border-4 border-red-600 bg-black text-yellow-400 shadow-2xl h-fit transform -rotate-1 lg:rotate-2">
            <h4 className="text-3xl font-mono font-extrabold border-b-2 border-yellow-400 pb-2 mb-4 text-white">OPŠTE INFORMACIJE</h4>
            <p className="font-mono mb-6">
                Zbog prirode našeg rada, ne pružamo telefonsku podršku. Sva komunikacija se odvija elektronski.
            </p>
            
            <h5 className="text-xl font-mono text-white mt-6 mb-2">LOKACIJA (Samo za poštu):</h5>
            <p className="font-mono">
                VOID SOUND <br/>
                Postfach 030303<br/>
                11000 Beograd, Srbija
            </p>
            
            <h5 className="text-xl font-mono text-white mt-6 mb-2">EMAIL (Upiti za štampu):</h5>
            <p className="font-mono">
                press@voidsound.com
            </p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;