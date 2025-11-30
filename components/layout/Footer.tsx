// Naziv komponente: Footer
import React from 'react';
import type { PathName } from '../../data/types'; 

// Simulišemo Link komponentu iz react-router-dom za ovo okruženje
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, onClick?: () => void, children: React.ReactNode }>> = ({ to, children, className, onClick }) => (
  <a href={`#${to}`} className={className} onClick={onClick}>{children}</a> 
);

// Footer komponenta - MODERN BRUTALISM
const Footer: React.FC = () => {
    // Funkcija za navigaciju (samo menja hash)
    const handleLinkClick = (path: PathName) => {
        window.location.hash = path;
    };

  const mainLinks: { name: string, path: PathName }[] = [
    { name: 'POČETNA', path: '/' as PathName },
    { name: 'IZVOĐAČI', path: '/izvodjaci' as PathName },
    { name: 'IZDANJA', path: '/izdanja' as PathName },
    { name: 'DOGAĐAJI', path: '/dogadjaji' as PathName },
  ];

  const secondaryLinks: { name: string, path: PathName }[] = [
      { name: 'O NAMA', path: '/o-nama' as PathName },
      { name: 'KONTAKT', path: '/kontakt' as PathName },
      { name: 'ČLANCI', path: '/clanci' as PathName },
      { name: 'ADMIN PANEL', path: '/admin' as PathName },
  ];

  return (
    <footer className="bg-black text-white border-t-8 border-red-600 mt-auto relative overflow-hidden">
      
      {/* Dekorativni background tekst (ogroman, jedva vidljiv) */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden leading-none">
          <span className="text-[20vw] font-black text-white/5 whitespace-nowrap -mb-10 block">VOID SOUND</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-b-4 border-white pb-12 mb-8">

          {/* 1. BRANDING (4/12) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
                <h2 className="text-6xl font-black tracking-tighter mb-4 leading-none">
                    VOID<br/><span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>SOUND</span>
                </h2>
                <p className="font-mono text-gray-400 text-sm mt-4 max-w-xs">
                    Platforma za dokumentovanje i distribuciju nekonvencionalnog zvuka.
                    <br/><br/>
                    <span className="text-red-600 font-bold">EST. 2021 // NOVI SAD</span>
                </p>
            </div>
            
            {/* Socials (Mock) */}
            <div className="flex gap-4 mt-8">
                {['INSTAGRAM', 'BANDCAMP', 'SOUNDCLOUD'].map(social => (
                    <a key={social} href="#" className="border border-white px-3 py-1 font-mono text-xs hover:bg-white hover:text-black transition-colors">
                        {social}
                    </a>
                ))}
            </div>
          </div>

          {/* 2. NAVIGACIJA (4/12) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
                <h4 className="font-mono text-xs text-gray-500 mb-4 border-b border-gray-700 pb-2">INDEX</h4>
                {mainLinks.map(link => (
                    <button
                        key={link.path}
                        onClick={() => handleLinkClick(link.path)}
                        className="text-left font-bold text-xl hover:text-yellow-400 hover:translate-x-2 transition-all"
                    >
                        {link.name}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="font-mono text-xs text-gray-500 mb-4 border-b border-gray-700 pb-2">INFO</h4>
                {secondaryLinks.map(link => (
                    <button
                        key={link.path}
                        onClick={() => handleLinkClick(link.path)}
                        className="text-left font-mono text-sm text-gray-300 hover:text-white hover:underline decoration-red-600 underline-offset-4 transition-all"
                    >
                        {link.name}
                    </button>
                ))}
            </div>
          </div>

          {/* 3. NEWSLETTER (4/12) */}
          <div className="lg:col-span-4 bg-white text-black p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <h4 className="text-2xl font-black mb-2 uppercase">Prijavi se za signal</h4>
            <p className="font-mono text-xs mb-6 text-gray-600">Primaj obaveštenja o novim izdanjima i tajnim lokacijama.</p>
            
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="TVOJ EMAIL..." 
                    className="bg-gray-100 border-2 border-black p-3 font-mono text-sm focus:outline-none focus:border-red-600 placeholder-gray-400"
                />
                <button className="bg-black text-white font-bold py-3 border-2 border-transparent hover:bg-red-600 hover:border-black transition-colors uppercase tracking-widest text-sm">
                    POŠALJI →
                </button>
            </form>
          </div>

        </div>

        {/* SYSTEM STATUS BAR (Dno) */}
        <div className="flex flex-col md:flex-row justify-between items-center font-mono text-xs text-gray-500 gap-4">
            <div className="flex gap-4">
                <span>&copy; {new Date().getFullYear()} VOID SOUND</span>
                <span className="hidden md:inline">|</span>
                <span>SVA PRAVA ZADRŽANA</span>
            </div>
            
            <div className="flex gap-6">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    SYSTEM ONLINE
                </span>
                <span>VERZIJA 2.4.0</span>
                <span>LATENCY: 12ms</span>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;