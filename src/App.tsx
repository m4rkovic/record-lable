// Naziv komponente: App (GLAVNI KONTROLER)
import React from 'react';
// FIX: Ispravne putanje (pretpostavljamo da je App.tsx u src/)
import { useRouter } from './hooks/useRouter'; 
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Glavna Aplikacija
const App: React.FC = () => {
 // Sav posao rutiranja se obavlja unutar useRouter
 const { element: content, isReady } = useRouter();

if (!isReady) {
// Jednostavan placeholder dok se router inicijalizuje
 return (
<div className="min-h-screen bg-black flex items-center justify-center">
<h1 className="text-4xl font-mono text-white border-4 border-yellow-400 p-4 transform skew-x-3">UČITAVANJE...</h1>
 </div>
 );
 }

 return (
 // Dodat je pt-16 da bi se sadržaj spustio ispod fiksnog Header-a
 <div className="min-h-screen bg-black font-mono text-base overflow-x-hidden pt-16"> 
 <Header />
 <main className="mt-0">
 {/* Renderuje element koji je pronašao useRouter */}
 {content}
</main>
 <Footer />
</div>
 );
};

export default App;

// // Naziv komponente: App (Simulacija Routera)
// import React, { useState, useEffect } from 'react';
// import type { PathName } from '../data/types'; 

// // Uvoz Layout Komponenti
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';

// // Uvoz Page Komponenti
// import HomePage from '../pages/HomePage';
// import ArtistsPage from '../pages/ArtistsPage';
// import PlaceholderPage from '../pages/PlaceholderPage';
// import ReleasesPage from '../pages/ReleasesPage';
// import ArticlesPage from '../pages/ArticlesPage';
// import AboutPage from '../pages/AboutPage';
// import ContactPage from '../pages/ContactPage';
// import ArtistDetailPage from '../pages/ArtistDetailPage';
// import ReleaseDetailPage from '../pages/ReleaseDetailPage';
// import ArticleDetailPage from '../pages/ArticleDetailPage';
// import AdminPanelPage from '../pages/AdminPanelPage'; // NOVI UVOZ

// // --- DEFINICIJA RUTA ---
// // Koristimo kombinaciju stringova (za statičke rute) i RegExp (za dinamičke rute)
// const routes: { path: PathName | RegExp, element: (id?: number) => JSX.Element, title: string }[] = [
//   // STATIČKE RUTE
//   { path: '/', element: () => <HomePage />, title: 'POČETNA' },
//   { path: '/izvodjaci', element: () => <ArtistsPage />, title: 'IZVOĐAČI' },
//   { path: '/izdanja', element: () => <ReleasesPage />, title: 'IZDANJA' }, 
//   { path: '/clanci', element: () => <ArticlesPage />, title: 'ČLANCI' }, 
//   { path: '/o-nama', element: () => <AboutPage />, title: 'O NAMA' }, 
//   { path: '/kontakt', element: () => <ContactPage />, title: 'KONTAKT' }, 
//   { path: '/admin', element: () => <AdminPanelPage />, title: 'ADMIN PANEL' }, // NOVA ADMIN RUTA

//   // DINAMIČKE RUTE (KORISTIMO REGEXP ZA PARSOVANJE ID-A)
//   { path: /^\/izvodjaci\/(\d+)$/, element: (id) => <ArtistDetailPage artistId={id!} />, title: 'DETALJI IZVOĐAČA' },
//   { path: /^\/izdanja\/(\d+)$/, element: (id) => <ReleaseDetailPage releaseId={id!} />, title: 'DETALJI IZDANJA' },
//   { path: /^\/clanci\/(\d+)$/, element: (id) => <ArticleDetailPage articleId={id!} />, title: 'DETALJI ČLANKA' },
// ];

// // --- GLAVNA APLIKACIJA SA RUTIRANJEM ---

// const App: React.FC = () => {
//   const [currentHash, setCurrentHash] = useState(window.location.hash.substring(1) || '/');

//   const handleHashChange = () => {
//     const newHash = window.location.hash.substring(1) || '/';
//     setCurrentHash(newHash);
//   };

//   useEffect(() => {
//     window.addEventListener('hashchange', handleHashChange);
//     return () => {
//       window.removeEventListener('hashchange', handleHashChange);
//     };
//   }, []);

//   // --- LOGIKA PARSOVANJA RUTE ---
//   let elementToRender: JSX.Element | null = null;
//   let found = false;

//   for (const route of routes) {
//     if (typeof route.path === 'string') {
//       // Provera za statičke rute
//       if (route.path === currentHash) {
//         elementToRender = route.element();
//         found = true;
//         break;
//       }
//     } else {
//       // Provera za dinamičke rute (RegExp)
//       const match = currentHash.match(route.path);
//       if (match) {
//         const id = parseInt(match[1], 10);
//         elementToRender = route.element(id);
//         found = true;
//         break;
//       }
//     }
//   }

//   // Ako ruta nije pronađena, renderuj 404 stranicu
//   if (!found || !elementToRender) {
//     elementToRender = <PlaceholderPage title="404: RUTA NIJE PRONAĐENA" />;
//   }
  
//   return (
//     <div className="min-h-screen bg-black font-mono text-base overflow-x-hidden">
//       <Header />
//       <main className="mt-0">
//         {elementToRender}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default App;