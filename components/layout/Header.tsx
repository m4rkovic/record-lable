// Naziv komponente: Header
import React, { useState, useEffect } from 'react';
import type { PathName } from '../../data/types';

// Simulišemo Link komponentu
const Link: React.FC<React.PropsWithChildren<{ 
  to: PathName; 
  className?: string; 
  onClick?: (e: React.MouseEvent) => void; 
  children: React.ReactNode 
}>> = ({ to, children, className, onClick }) => (
  <a href={`#${to}`} className={className} onClick={onClick}>{children}</a> 
);

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detekcija skrola za "shrink" efekat
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper za zatvaranje menija i navigaciju
  const handleNavClick = (path: PathName) => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    window.location.hash = path;
    window.scrollTo(0, 0);
  };

  // Trenutna putanja za aktivno stanje
  const getCurrentPath = () => {
    const hash = window.location.hash.substring(1) || '/';
    // Logika za dinamičke rute (npr. /izvodjaci/1 -> /izvodjaci)
    const baseRoute = hash.startsWith('izvodjaci/') || hash.startsWith('izdanja/') || hash.startsWith('clanci/') || hash.startsWith('dogadjaji/') 
        ? hash.split('/')[0] 
        : hash;
    
    return baseRoute.startsWith('/') ? baseRoute : '/' + baseRoute;
  };
  const currentPath = getCurrentPath();

  // Glavni Linkovi
  const mainLinks: { name: string; path: PathName }[] = [
    { name: 'POČETNA', path: '/' },
    { name: 'IZVOĐAČI', path: '/izvodjaci' },
    { name: 'IZDANJA', path: '/izdanja' },
    { name: 'ČLANCI', path: '/clanci' },
    { name: 'DOGAĐAJI', path: '/dogadjaji' },
    { name: 'O NAMA', path: '/o-nama' },
    { name: 'KONTAKT', path: '/kontakt' },
  ];

  // Dropdown Linkovi
  const dropdownLinks: { name: string; path: PathName }[] = [
    { name: 'PODCAST', path: '/podcast' },
    { name: 'INTERESANTNO', path: '/interesantno' },
    { name: 'ADMIN', path: '/admin' },
  ];

  const isActive = (path: PathName) => {
      if (path === '/') return currentPath === '/';
      return currentPath.startsWith(path);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 bg-black text-white border-b-4 border-white transition-all duration-300 ease-in-out z-[100] ${
        scrolled ? 'py-2 shadow-xl' : 'py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center relative">
        
        {/* --- LOGO --- */}
        <Link to="/" onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}>
          <div className={`font-black font-mono leading-none flex items-center gap-2 group transition-all duration-300 ${
            scrolled ? 'scale-90 origin-left' : 'scale-100'
          }`}>
            <div className="bg-red-600 text-white border-2 border-white px-2 py-1 transform group-hover:-rotate-6 transition-transform">
              VOID
            </div>
            <div className="text-white tracking-[0.2em] group-hover:text-yellow-400 transition-colors">
              SOUND
            </div>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGACIJA --- */}
        <nav className="hidden xl:flex items-center gap-1">
          {mainLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
              className={`
                relative overflow-hidden font-mono font-bold text-sm px-4 py-2 border-2 border-transparent transition-all duration-200
                group
                ${isActive(link.path) 
                    ? 'text-black bg-yellow-400 border-yellow-400' 
                    : 'text-white hover:border-white hover:text-white'
                }
              `}
            >
              <span className="relative z-10">{link.name}</span>
              {/* Hover Fill Effect */}
              {!isActive(link.path) && (
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-0 mix-blend-difference"></div>
              )}
            </Link>
          ))}

          {/* --- DROPDOWN MENI (VIŠE) --- */}
          <div className="relative group ml-2">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                font-mono font-bold text-sm px-4 py-2 border-2 transition-all flex items-center gap-2
                ${isDropdownOpen 
                    ? 'bg-white text-black border-white' 
                    : 'text-white border-gray-600 hover:border-white'
                }
              `}
            >
              VIŠE <span className={`text-[10px] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Dropdown Content */}
            <div className={`absolute right-0 top-full mt-4 w-56 bg-black border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] overflow-hidden transition-all duration-200 origin-top-right ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              {dropdownLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                  className="block w-full text-left px-4 py-3 font-mono font-bold text-white hover:bg-red-600 hover:text-white border-b border-gray-800 last:border-0 transition-colors relative group"
                >
                  <span className="relative z-10 flex justify-between items-center">
                      {link.name}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* --- MOBILE MENU DUGME --- */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="xl:hidden p-2 border-2 border-white text-white hover:bg-white hover:text-black transition-colors z-50 relative"
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
             {/* Hamburger Animacija */}
            <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2 top-0 absolute' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bottom-0 absolute' : ''}`}></span>
          </div>
        </button>

      </div>

      {/* --- MOBILE MENI (Full Screen Overlay) --- */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-all duration-500 flex flex-col justify-center px-8 ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}`}>
          <div className="flex flex-col gap-2 max-w-md mx-auto w-full">
            {[...mainLinks, ...dropdownLinks].map((link, index) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                className={`
                  text-3xl md:text-5xl font-black font-mono uppercase py-2 border-b border-gray-800 hover:text-transparent hover:stroke-text transition-all duration-300 hover:pl-4
                  ${isActive(link.path) ? 'text-yellow-400 border-yellow-400' : 'text-white'}
                `}
                // Stagger animation delay za linkove
                // style={{ transitionDelay: `${index * 50}ms` }} 
              >
                <span className="text-xs font-normal text-gray-500 mr-4 align-middle">0{index + 1}</span>
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="absolute bottom-8 left-0 w-full text-center">
              <p className="font-mono text-xs text-gray-500">VOID SOUND SYSTEM v2.0</p>
          </div>
      </div>
    </header>
  );
};

export default Header;

// // Naziv komponente: Header
// import React, { useState, useEffect } from 'react';
// import type { PathName } from '../../data/types'; 
// // Uklonjen je uvoz useScrollSpy

// // Simulišemo Link komponentu iz react-router-dom za ovo okruženje
// const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, onClick?: (e: React.MouseEvent) => void, children: React.ReactNode }>> = ({ to, children, className, onClick }) => (
//   <a href={`#${to}`} className={className} onClick={onClick}>{children}</a> // Koristimo hash za simulaciju rute
// );

// // Header komponenta koja koristi Link
// const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
//   const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
//   const [isShrunk, setIsShrunk] = useState(false); // Zadržavamo shrinking efekat jer je dobar za UX
  
//   // Efekat za praćenje skrola i smanjivanje heade-ra
//   useEffect(() => {
//       const handleScroll = () => {
//           setIsShrunk(window.scrollY > 50);
//       };
      
//       window.addEventListener('scroll', handleScroll);
//       return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Funkcija koja proverava trenutnu hash rutu za isticanje aktivnog linka
//   const getCurrentPath = (): PathName => {
//     const hash = window.location.hash.substring(1) || '/';
    
//     // Provera da li je dinamička ruta
//     if (hash.startsWith('izvodjaci/') || hash.startsWith('izdanja/') || hash.startsWith('clanci/') || hash.startsWith('dogadjaji/')) {
//         const baseRoute = hash.split('/')[0];
//         return `/${baseRoute}` as PathName;
//     }
    
//     // Provera da li je hash samo scroll ID (vraćamo na home)
//     if (hash.startsWith('#')) return '/' as PathName;

//     // Uzimamo statičku rutu
//     return (['/', '/izvodjaci', '/izdanja', '/clanci', '/o-nama', '/kontakt', '/admin', '/dogadjaji', '/podcast', '/interesantno'].find(p => p === hash) || '/') as PathName; 
//   };
  
//   const currentPath = getCurrentPath();

//   // Navigacioni Linkovi - SADA SU SVI STANDARDNE RUTE
//   const links: { name: string, path: PathName, isDropdown?: boolean }[] = [
//     { name: 'POČETNA', path: '/' as PathName },
//     { name: 'IZVOĐAČI', path: '/izvodjaci' as PathName },
//     { name: 'IZDANJA', path: '/izdanja' as PathName },
//     { name: 'ČLANCI', path: '/clanci' as PathName },
//     { name: 'DOGAĐAJI', path: '/dogadjaji' as PathName }, 
//     { name: 'O NAMA', path: '/o-nama' as PathName }, // Vraćeno na standardnu rutu
//     { name: 'KONTAKT', path: '/kontakt' as PathName }, // Vraćeno na standardnu rutu
//     { name: 'VIŠE', path: '/vise' as PathName, isDropdown: true }, 
//     { name: 'ADMIN', path: '/admin' as PathName },
//   ];

//   const dropdownLinks: { name: string, path: PathName }[] = [
//     { name: 'PODCAST', path: '/podcast' as PathName },
//     { name: 'INTERESANTNO', path: '/interesantno' as PathName },
//   ];

//   const handleLinkClick = (path: PathName) => {
//     setIsMobileMenuOpen(false);
//     setIsMoreDropdownOpen(false);
//     // Standardno rutiranje (menjanje hash-a)
//     window.location.hash = path;
//     // Skrol na vrh nove stranice
//     window.scrollTo(0, 0);
//   };

//   const getIsActive = (linkPath: PathName): boolean => {
//     if (linkPath === '/vise') {
//         return dropdownLinks.some(link => link.path === currentPath);
//     }
//     return linkPath === currentPath;
//   };
  
//   const handleDropdownToggle = (e: React.MouseEvent) => {
//       e.preventDefault();
//       e.stopPropagation(); 
//       setIsMoreDropdownOpen(prev => !prev);
//   }

//   return (
//     <header 
//         className={`
//             fixed top-0 left-0 w-full z-50 bg-black text-white border-b-2 border-white shadow-xl transition-all duration-300 ease-in-out
//             ${isShrunk ? 'py-2' : 'py-6'} // Smanjuje padding
//         `}
//     >
//       <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
//         {/* LOGO */}
//         <Link to="/" className="block" onClick={() => handleLinkClick('/' as PathName)}>
//             <h1 
//                 className={`
//                     font-extrabold font-mono tracking-widest leading-none bg-red-600 border-2 border-white cursor-pointer hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:skew-y-2
//                     ${isShrunk ? 'text-2xl px-2 py-1' : 'text-4xl px-4 py-2'} // Smanjuje logo
//                 `}
//             >
//               <span className="block -rotate-1">VOID</span><span className="block ml-4">SOUND</span>
//             </h1>
//         </Link>
        
//         {/* Desktop Navigacija */}
//         <nav className="hidden lg:flex space-x-1">
//           {links.map((link) => {
//             const isActive = getIsActive(link.path); 
            
//             return (
//               <div key={link.path} className="relative group"> 
//                 <button
//                   onClick={link.isDropdown ? handleDropdownToggle : () => handleLinkClick(link.path)}
//                   className={`
//                     font-mono tracking-wider transition-all duration-300 relative border-2 border-transparent block
//                     ${isShrunk ? 'text-sm px-3 py-1' : 'text-lg px-5 py-2'} // Smanjuje linkove
//                     ${isActive 
//                       ? 'text-yellow-400 border-yellow-400 bg-gray-800' 
//                       : 'text-white hover:text-yellow-400 hover:bg-red-600 hover:border-white' 
//                     }
//                     group-hover:scale-[1.05] group-hover:transform group-hover:skew-x-2 group-hover:translate-x-1
//                   `}
//                 >
//                   <span className="transition duration-100 group-hover:block group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
//                     {link.name}
//                   </span>
                  
//                   {isActive && <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400"></span>}
//                 </button>
                
//                 {/* Desktop Dropdown Meni */}
//                 {link.isDropdown && isMoreDropdownOpen && (
//                     <div className='absolute top-full right-0 bg-gray-900 border-2 border-white min-w-[200px] shadow-xl z-50 mt-2'>
//                         {dropdownLinks.map(dLink => (
//                             <button
//                                 key={dLink.path}
//                                 onClick={() => handleLinkClick(dLink.path)}
//                                 className={`
//                                     block p-3 font-mono text-base border-b border-gray-800 w-full text-left
//                                     ${dLink.path === currentPath ? 'bg-red-600 text-yellow-400' : 'text-white hover:bg-gray-800'}
//                                 `}
//                             >
//                                 {dLink.name}
//                             </button>
//                         ))}
//                     </div>
//                 )}
//               </div>
//             );
//           })}
//         </nav>
        
//         {/* Mobile Menu Dugme */}
//         <button 
//           className={`
//             lg:hidden font-mono text-yellow-400 border border-yellow-400 transition-all duration-300
//             ${isShrunk ? 'text-lg px-2 py-1' : 'text-2xl px-3 py-2'}
//           `}
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? 'ZATVORI' : 'MENU'}
//         </button>
//       </div>

//       {/* Mobile Meni */}
//       {isMobileMenuOpen && (
//         <nav className="lg:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-white shadow-xl max-h-[80vh] overflow-y-auto">
//           {[...links.filter(l => !l.isDropdown), ...dropdownLinks].map((link) => ( 
//             <button
//               key={link.path}
//               onClick={() => handleLinkClick(link.path)}
//               className={`
//                 block p-4 font-mono text-xl border-b border-gray-800 w-full text-left
//                 ${getIsActive(link.path) ? 'bg-red-600 text-yellow-400' : 'text-white hover:bg-gray-800'}
//               `}
//             >
//               {link.name}
//             </button>
//           ))}
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;
