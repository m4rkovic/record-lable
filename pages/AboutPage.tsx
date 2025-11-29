// Naziv komponente: AboutPage
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
// U pravom projektu: import { Link } from 'react-router-dom';
const Link: React.FC<React.PropsWithChildren<{ to: string }>> = ({ to, children }) => (
  <a href={`#${to}`}>{children}</a> 
);

// Stranica 'O Nama' sa detaljnim manifestom - AŽURIRAN, ČISTI KONCEPT
const AboutPage: React.FC = () => {
  const focusAreas = [
    { title: "Audio Kvalitet", description: "Posvećeni smo najvišim standardima zvučnog inženjeringa, od masteringa do finalnog vinil otiska." },
    { title: "Vizuelni Identitet", description: "Svako izdanje je dizajnerski projekat. Radimo sa umetnicima koji razumeju brutalizam i kontrast." },
    { title: "Nezavisni Glas", description: "Naša kuća je platforma za nekonvencionalne umetnike koji traže punu kreativnu kontrolu." },
    { title: "Fizički Medij", description: "Verujemo u opipljivo. CD-ovi, vinili i kasete su primarni fokus, a ne samo dodatak digitalnom izdanju." },
  ];

  return (
    // Pozadina ostaje žuta (kao Kontakt)
    <section className="min-h-screen pt-32 pb-20 bg-yellow-400 text-black px-4">
      <div className="max-w-6xl mx-auto">
        {/* Naslov koristi čistiji, crno-beli kontrast */}
        <SectionTitle title="O NAMA / MISIJA" color="border-black bg-white text-black" skew={false} />
        
        <div className="space-y-10 p-8 border-4 border-black bg-white shadow-2xl">
          
          {/* Uvodna/Misionarska Izjava */}
          <p className="text-3xl font-serif italic border-l-8 border-red-600 pl-6 mb-10">
            "VOID SOUND je izdavačka kuća fokusirana na graničnu i nekonvencionalnu muziku, služeći kao most između avangardnog zvuka i publike koja zahteva autentičnost i beskompromisni kvalitet."
          </p>
          
          <h3 className="text-2xl font-mono text-black border-b-2 border-black pb-2 mt-12">NAŠ FOKUS I VREDNOSTI</h3>
          
          {/* Čist Grid Layout za Ključne Vrednosti */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {focusAreas.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 border-2 border-black bg-gray-100 ${
                    index % 2 !== 0 ? 'md:mt-4' : '' // Mala asimetrija
                }`}
              >
                <h4 className="text-xl font-mono font-bold text-red-600 mb-2">{item.title.toUpperCase()}</h4>
                <p className="font-serif text-base">{item.description}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-mono text-black border-b-2 border-black pb-2 mt-12">ISTORIJA I INICIJATIVA</h3>
          <p className="font-serif text-lg">
            Osnovani 2018. godine kao kustoski kolektiv, brzo smo evoluirali u punopravnu izdavačku kuću. Naš cilj je uvek bio isti: pružiti transparentnu i poštenu platformu umetnicima. Pozivamo na saradnju sve koji dele našu strast prema eksperimentu i sirovom zvuku.
          </p>
          
          <Link to="/kontakt">
            <p className="font-mono text-center text-sm pt-4 border-t-2 border-black mt-8 hover:text-red-600 transition duration-150 cursor-pointer">
              ZAPOČNITE SARADNJU SA NAMA {'>'}{'>'}{'>'}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;