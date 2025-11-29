// Naziv komponente: Footer
import React from 'react';
import type { PathName } from '../../data/types'; 

// Simulišemo Link komponentu iz react-router-dom za ovo okruženje
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

// Footer komponenta - MASIVNIJI, BRUTALISTIČKI DIZAJN
const Footer: React.FC = () => {
  const links: { name: string, path: PathName }[] = [
    { name: 'POČETNA', path: '/' },
    { name: 'IZVOĐAČI', path: '/izvodjaci' },
    { name: 'IZDANJA', path: '/izdanja' },
    { name: 'ČLANCI', path: '/clanci' },
    { name: 'O NAMA', path: '/o-nama' },
    { name: 'KONTAKT', path: '/kontakt' },
  ];

  return (
    <footer className="bg-black text-white px-4 pt-16 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b-2 border-white pb-10">

          {/* Kolona 1: Navigacija */}
          <div className="border-l-4 border-red-600 pl-4">
            <h4 className="text-xl font-extrabold font-mono mb-4 text-yellow-400">BRZE RUTE</h4>
            <nav className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-mono tracking-wider hover:text-red-600 transition duration-150"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Kolona 2: Info/Kontakt Detalji */}
          <div className="border-l-4 border-white pl-4">
            <h4 className="text-xl font-extrabold font-mono mb-4 text-yellow-400">INICIJATIVA I UPITI</h4>
            <div className="space-y-4 font-serif text-sm">
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
              <p className="pt-2 border-t border-gray-700">
                LOKACIJA: REGION / STATUS: AKTIVAN
              </p>
            </div>
          </div>

          {/* Kolona 3: Manifest Blok / Motto */}
          <div className="p-4 border-4 border-red-600 bg-gray-900 shadow-xl transform skew-y-1">
            <h4 className="text-2xl font-mono font-extrabold text-red-600 mb-2">VOID SOUND</h4>
            <p className="font-serif italic text-base">
              "Zvuk se ne prilagođava. On proždire. Brutalizam je naša jedina ideologija."
            </p>
            <button className="mt-4 px-3 py-1 bg-yellow-400 text-black font-mono text-sm border-2 border-black hover:bg-red-600 hover:text-white transition duration-150">
                PRONAĐITE NAS NA BANDCAMP-u
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Podnožje */}
      <div className="py-4 text-center border-t-2 border-gray-700">
        <p className="text-xs font-mono text-gray-400">&copy; {new Date().getFullYear()} VOID SOUND. SVA PRAVA ZADRŽANA. | Kod: RAW_OUTPUT v2.3</p>
      </div>
    </footer>
  );
};

export default Footer;