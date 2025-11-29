// Naziv komponente: Header
import React, { useState } from 'react';
import type { PathName } from '../../data/types'; 

// Simulišemo Link komponentu iz react-router-dom za ovo okruženje
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, onClick?: () => void, children: React.ReactNode }>> = ({ to, children, className, onClick }) => (
  <a href={`#${to}`} className={className} onClick={onClick}>{children}</a> // Koristimo hash za simulaciju rute
);


// Header komponenta koja koristi Link
const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Novo stanje

  // Funkcija koja proverava trenutnu hash rutu za isticanje aktivnog linka
  const getCurrentPath = (): PathName => {
    const hash = window.location.hash.substring(1) || '/';
    const validPaths = ['/', '/izvodjaci', '/izdanja', '/clanci', '/o-nama', '/kontakt', '/admin'];
    
    const staticPath = validPaths.find(p => p === hash);
    if (staticPath) return staticPath as PathName;

    // Provera za dinamičke rute (npr. /izvodjaci/1)
    if (hash.startsWith('/izvodjaci/')) return '/izvodjaci' as PathName;
    if (hash.startsWith('/izdanja/')) return '/izdanja' as PathName;
    if (hash.startsWith('/clanci/')) return '/clanci' as PathName;

    return '/' as PathName; // Podrazumevana putanja ako nije pronađena
  };

  const currentPath = getCurrentPath();

  const links: { name: string, path: PathName }[] = [
    { name: 'POČETNA', path: '/' },
    { name: 'IZVOĐAČI', path: '/izvodjaci' },
    { name: 'IZDANJA', path: '/izdanja' },
    { name: 'ČLANCI', path: '/clanci' },
    { name: 'O NAMA', path: '/o-nama' },
    { name: 'KONTAKT', path: '/kontakt' },
    { name: 'ADMIN', path: '/admin' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black text-white p-4 border-b-2 border-white shadow-xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* LOGO: Koristi Link da se vrati na home ('/') */}
        <Link to="/" className="block" onClick={handleLinkClick}>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-widest leading-none bg-red-600 px-2 py-1 border-2 border-white cursor-pointer hover:bg-yellow-400 hover:text-black transition duration-150 transform hover:skew-y-2">
              <span className="block -rotate-1">VOID</span><span className="block ml-4">SOUND</span>
            </h1>
        </Link>
        
        {/* Desktop Navigacija */}
        <nav className="hidden md:flex space-x-0">
          {links.map((link) => {
            const isActive = link.path === currentPath;
            return (
              <div key={link.path} className="relative group"> 
                <Link
                  to={link.path}
                  className={`
                    text-lg font-mono tracking-wider transition duration-100 relative px-6 py-3 border-2 border-transparent
                    block
                    ${isActive 
                      ? 'text-yellow-400 border-yellow-400 bg-gray-800' // Aktivan link sa pozadinom
                      : 'text-white hover:text-yellow-400 hover:bg-red-600 hover:border-white' // Neaktivan link
                    }
                    group-hover:scale-[1.05] group-hover:transform group-hover:skew-x-2 group-hover:translate-x-1
                  `}
                >
                  <span className="transition duration-100 group-hover:block group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    {link.name}
                  </span>
                  
                  {isActive && <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-400"></span>}
                </Link>
              </div>
            );
          })}
        </nav>
        
        {/* Mobile Menu Dugme */}
        <button 
          className="md:hidden text-2xl font-mono text-yellow-400 border border-yellow-400 px-3 py-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? 'ZATVORI' : 'MENU'}
        </button>
      </div>

      {/* Mobile Meni (Prikazuje se uslovno) */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-white shadow-xl">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick} // Zatvara meni nakon klika
              className={`
                block p-3 font-mono text-xl border-b border-gray-800
                ${currentPath === link.path ? 'bg-red-600 text-yellow-400' : 'text-white hover:bg-gray-800'}
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
export default Header;


// // Naziv komponente: Header
// import React from 'react';
// import type { PathName } from '../../data/types'; 

// // Simulišemo Link komponentu iz react-router-dom za ovo okruženje
// const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, children: React.ReactNode }>> = ({ to, children, className }) => (
//   <a href={`#${to}`} className={className}>{children}</a> // Koristimo hash za simulaciju rute
// );


// // Header komponenta koja koristi Link
// const Header: React.FC = () => {
//   // Funkcija koja proverava trenutnu hash rutu za isticanje aktivnog linka
//   const getCurrentPath = (): PathName => {
//     const hash = window.location.hash.substring(1) || '/';
//     // AŽURIRANO: Dodajemo '/admin' i dinamičke rute u proveru
//     const validPaths = ['/', '/izvodjaci', '/izdanja', '/clanci', '/o-nama', '/kontakt', '/admin'];
    
//     const staticPath = validPaths.find(p => p === hash);
//     if (staticPath) return staticPath as PathName;

//     // Provera za dinamičke rute (npr. /izvodjaci/1)
//     if (hash.startsWith('/izvodjaci/')) return '/izvodjaci' as PathName;
//     if (hash.startsWith('/izdanja/')) return '/izdanja' as PathName;
//     if (hash.startsWith('/clanci/')) return '/clanci' as PathName;

//     return '/' as PathName; // Podrazumevana putanja ako nije pronađena
//   };

//   const currentPath = getCurrentPath();

//   const links: { name: string, path: PathName }[] = [
//     { name: 'POČETNA', path: '/' },
//     { name: 'IZVOĐAČI', path: '/izvodjaci' },
//     { name: 'IZDANJA', path: '/izdanja' },
//     { name: 'ČLANCI', path: '/clanci' },
//     { name: 'O NAMA', path: '/o-nama' },
//     { name: 'KONTAKT', path: '/kontakt' },
//     { name: 'ADMIN', path: '/admin' }, // DODAT ADMIN LINK
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-black text-white p-4 border-b-2 border-white shadow-xl">
//       <div className="flex justify-between items-center max-w-7xl mx-auto">
//         {/* LOGO: Koristi Link da se vrati na home ('/') */}
//         <Link to="/" className="block">
//             <h1 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-widest leading-none bg-red-600 px-2 py-1 border-2 border-white cursor-pointer hover:bg-yellow-400 hover:text-black transition duration-150 transform hover:skew-y-2">
//               <span className="block -rotate-1">VOID</span><span className="block ml-4">SOUND</span>
//             </h1>
//         </Link>
//         {/* Navigacioni linkovi */}
//         <nav className="hidden md:flex space-x-0">
//           {links.map((link) => {
//             const isActive = link.path === currentPath;
//             return (
//               // Dodata wrapper div za bolju kontrolu hover transformacije
//               <div key={link.path} className="relative group"> 
//                 <Link
//                   to={link.path}
//                   className={`
//                     text-lg font-mono tracking-wider transition duration-100 relative px-6 py-3 border-2 border-transparent
//                     block
//                     ${isActive 
//                       ? 'text-yellow-400 border-yellow-400 bg-gray-800' // Aktivan link sa pozadinom
//                       : 'text-white hover:text-yellow-400 hover:bg-red-600 hover:border-white' // Neaktivan link
//                     }
                    
//                     // Brutalistički Glitch/Skew efekat na hover (GRUBLJE I JASNJE)
//                     group-hover:scale-[1.05]
//                     group-hover:transform group-hover:skew-x-2 
//                     group-hover:translate-x-1 // Dodat mali pomeraj
//                   `}
//                 >
//                   {/* Tekst koji se pomera unutar linka */}
//                   <span className="transition duration-100 group-hover:block group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
//                     {link.name}
//                   </span>
                  
//                   {/* Linija ispod aktivnog linka */}
//                   {isActive && <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-400"></span>}
//                 </Link>
//               </div>
//             );
//           })}
//         </nav>
//         <div className="md:hidden text-2xl font-mono text-yellow-400">
//           MENU
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
