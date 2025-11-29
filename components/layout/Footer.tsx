// Naziv komponente: Footer
import React from 'react';
import type { PathName } from '../../data/types'; 

// Simulišemo Link komponentu iz react-router-dom za ovo okruženje
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, onClick?: () => void, children: React.ReactNode }>> = ({ to, children, className, onClick }) => (
  <a href={`#${to}`} className={className} onClick={onClick}>{children}</a> 
);

// Footer komponenta - MASIVNIJI, BRUTALISTIČKI DIZAJN
const Footer: React.FC = () => {
    // Funkcija za navigaciju (samo menja hash)
    const handleLinkClick = (path: PathName) => {
        window.location.hash = path;
    };

  const links: { name: string, path: PathName }[] = [
    { name: 'POČETNA', path: '/' as PathName },
    { name: 'IZVOĐAČI', path: '/izvodjaci' as PathName },
    { name: 'IZDANJA', path: '/izdanja' as PathName },
    { name: 'ČLANCI', path: '/clanci' as PathName },
    { name: 'DOGAĐAJI', path: '/dogadjaji' as PathName }, // NOVO
    { name: 'O NAMA', path: '/o-nama' as PathName },
    { name: 'KONTAKT', path: '/kontakt' as PathName },
  ];

  const extraLinks: { name: string, path: PathName }[] = [
      { name: 'PODCAST', path: '/podcast' as PathName },
      { name: 'INTERESANTNO', path: '/interesantno' as PathName },
      { name: 'ADMIN PANEL', path: '/admin' as PathName },
  ];

  return (
    <footer className="bg-black text-white px-4 pt-16 border-t-4 border-yellow-400 mt-auto">
      <div className="max-w-7xl mx-auto pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b-2 border-white pb-10">

          {/* Kolona 1: Glavna Navigacija */}
          <div className="border-l-4 border-red-600 pl-4">
            <h4 className="text-xl font-extrabold font-mono mb-4 text-yellow-400">BRZE RUTE</h4>
            <nav className="flex flex-col space-y-2">
              {links.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className="text-lg font-mono tracking-wider hover:text-red-600 transition duration-150 text-left"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Kolona 2: Info/Kontakt Detalji + Extra Linkovi */}
          <div className="border-l-4 border-white pl-4 flex flex-col justify-between">
            <div>
                <h4 className="text-xl font-extrabold font-mono mb-4 text-yellow-400">INICIJATIVA I UPITI</h4>
                <div className="space-y-4 font-serif text-sm mb-8">
                <p>
                    EMAIL (Upiti za demo): <br />
                    <a href="mailto:demo@voidsound.com" className="hover:text-red-600 border-b border-white hover:border-red-600">
                    demo@voidsound.com
                    </a>
                </p>
                <p>
                    EMAIL (Opšti upiti): <br />
                    <a href="mailto:info@voidsound.com" className="hover:text-red-600 border-b border-white hover:border-red-600">
                    info@voidsound.com
                    </a>
                </p>
                </div>
            </div>

            <div>
                <h4 className="text-xl font-extrabold font-mono mb-2 text-yellow-400">VIŠE SADRŽAJA</h4>
                <nav className="flex flex-col space-y-2">
                    {extraLinks.map((link) => (
                        <button
                        key={link.path}
                        onClick={() => handleLinkClick(link.path)}
                        className="text-base font-mono tracking-wider text-gray-400 hover:text-white transition duration-150 text-left"
                        >
                        {link.name}
                        </button>
                    ))}
                </nav>
            </div>
          </div>

          {/* Kolona 3: Manifest Blok / Motto */}
          <div className="p-4 border-4 border-red-600 bg-gray-900 shadow-xl transform skew-y-1 h-fit">
            <h4 className="text-2xl font-mono font-extrabold text-red-600 mb-2">VOID SOUND</h4>
            <p className="font-serif italic text-base mb-4">
              "Zvuk se ne prilagođava. On proždire. Brutalizam je naša jedina ideologija."
            </p>
             <p className="pt-2 border-t border-gray-700 font-mono text-xs text-gray-400 mb-4">
                LOKACIJA: REGION / STATUS: AKTIVAN
              </p>
            <button className="w-full px-3 py-2 bg-yellow-400 text-black font-mono text-sm border-2 border-black hover:bg-red-600 hover:text-white transition duration-150 font-bold">
                PRONAĐITE NAS NA BANDCAMP-u
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Podnožje */}
      <div className="py-4 text-center border-t-2 border-gray-700">
        <p className="text-xs font-mono text-gray-400">&copy; {new Date().getFullYear()} VOID SOUND. SVA PRAVA ZADRŽANA.</p>
      </div>
    </footer>
  );
};

export default Footer;