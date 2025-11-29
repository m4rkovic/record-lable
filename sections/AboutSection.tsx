// Naziv komponente: AboutSection
import React from 'react';

// Sekcija 'O Nama' sa deklarativnim tekstom
const AboutSection: React.FC = () => (
  <section id="o-nama" className="bg-red-800 text-white py-20 px-4 relative overflow-hidden">
    <div className="max-w-4xl mx-auto p-8 border-2 border-white bg-red-900 shadow-xl">
      <h4 className="text-4xl font-mono font-bold mb-6">O NAMA: DEKLARACIJA</h4>
      <p className="mb-4 font-serif text-lg">
        Mi smo kolektiv posvećen objavljivanju nekonvencionalne i granične muzike. U svetu preterane produkcije, naš fokus je na sirovom audio iskustvu, nesavršenosti i teksturi. Verujemo u fizička izdanja kao opipljive objekte, a ne samo kao datoteke. Svako izdanje je artefakt.
      </p>
      <p className="mb-4 font-serif text-lg">
        Naša vizija je da stvorimo platformu za izvođače koji su posvećeni autentičnosti i istraživanju zvuka izvan komercijalnih okvira. Brutalnost u dizajnu i zvuku je naš potpis.
      </p>
      <p className="font-mono text-sm border-t-2 border-white pt-4 mt-6">
        LOKACIJA: REGION / FREKVENCIJA: 440 HZ / STATUS: AKTIVAN.
      </p>
    </div>
  </section>
);

export default AboutSection;