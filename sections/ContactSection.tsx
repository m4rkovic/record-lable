// Naziv komponente: ContactSection
import React, { useState } from 'react';

// Sekcija za Kontakt i Prijave (sa simuliranom validacijom)
const ContactSection: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('PORUKA POSLATA. HVALA NA INTERESOVANJU. ČEKAJTE POVRATNU INFORMACIJU.');
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <section id="kontakt" className="bg-yellow-400 text-black py-20 px-4">
      <div className="max-w-xl mx-auto p-8 border-4 border-black shadow-2xl bg-white">
        <h3 className="text-5xl font-mono font-extrabold mb-8 border-b-4 border-black pb-2">
          KONTAKT / INICIJATIVA
        </h3>
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
            placeholder="PORUKA / PREDLOG SARADNJE"
            rows={6}
            required
            className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-red-600 bg-gray-200"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-black text-yellow-400 font-extrabold border-2 border-black hover:bg-red-800 transition duration-150"
          >
            POŠALJI
          </button>
        </form>
        {message && (
          <div className="mt-6 p-4 border-2 border-red-600 bg-black text-yellow-400 font-mono text-center">
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;