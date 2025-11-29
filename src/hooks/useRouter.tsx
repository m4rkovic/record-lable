// Naziv komponente: useRouter Hook (Logika pseudo-routera)
import React, { useState, useEffect, useMemo } from 'react';
import type { PathName } from '../../data/types'; 
// Uvoz svih Page Komponenti
import HomePage from '../../pages/HomePage';
import ArtistsPage from '../../pages/ArtistsPage';
import PlaceholderPage from '../../pages/PlaceholderPage';
import ReleasesPage from '../../pages/ReleasesPage';
import ArticlesPage from '../../pages/ArticlesPage';
import AboutPage from '../../pages/AboutPage';
import ContactPage from '../../pages/ContactPage';
import ArtistDetailPage from '../../pages/ArtistDetailPage';
import ReleaseDetailPage from '../../pages/ReleaseDetailPage';
import ArticleDetailPage from '../../pages/ArticleDetailPage';
import AdminPanelPage from '../../pages/AdminPanelPage';
import Error404 from '../../pages/Error404'; 


// Definicija svih ruta i logike za parsiranje ID-a (IZVUČENO VAN HOOKA RADI STABILNOSTI)
const ROUTES = [
  // STATIČKE RUTE
  { path: '/', element: () => (<HomePage />), title: 'POČETNA' },
  { path: '/izvodjaci', element: () => (<ArtistsPage />), title: 'IZVOĐAČI' },
  { path: '/izdanja', element: () => (<ReleasesPage />), title: 'IZDANJA' }, 
  { path: '/clanci', element: () => (<ArticlesPage />), title: 'ČLANCI' }, 
  { path: '/o-nama', element: () => (<AboutPage />), title: 'O NAMA' }, 
  { path: '/kontakt', element: () => (<ContactPage />), title: 'KONTAKT' }, 
  { path: '/admin', element: () => (<AdminPanelPage />), title: 'ADMIN PANEL' },

  // DINAMIČKE RUTE (KORISTIMO REGEXP ZA PARSOVANJE ID-A)
  { path: /^\/izvodjaci\/(\d+)$/, element: (id) => (<ArtistDetailPage artistId={id!} />), title: 'DETALJI IZVOĐAČA' },
  { path: /^\/izdanja\/(\d+)$/, element: (id) => (<ReleaseDetailPage releaseId={id!} />), title: 'DETALJI IZDANJA' },
  { path: /^\/clanci\/(\d+)$/, element: (id) => (<ArticleDetailPage articleId={id!} />), title: 'DETALJI ČLANKA' },
];

interface RouterState {
  element: JSX.Element;
  currentPath: string;
  isReady: boolean;
}

export const useRouter = (): RouterState => {
  const [currentHash, setCurrentHash] = useState(window.location.hash.substring(1) || '/');
  const [isReady, setIsReady] = useState(false);

  // Efekat za slušanje hash promjena (simulacija navigacije)
  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash.substring(1) || '/';
      setCurrentHash(newHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    setIsReady(true); 
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Prazan niz zavisnosti za inicijalno pokretanje

  // Logika parsovanja rute i pronalaženja elementa
  const elementToRender = useMemo(() => {
    
    for (const route of ROUTES) {
      if (typeof route.path === 'string') {
        // Statičke rute
        if (route.path === currentHash) {
          return route.element();
        }
      } else {
        // Dinamičke rute (RegExp)
        const match = currentHash.match(route.path);
        if (match) {
          const id = parseInt(match[1], 10);
          return route.element(id);
        }
      }
    }
    // 404 stranica
    return <Error404 />;
  }, [currentHash]); // Zavisnost je samo currentHash

  return {
    element: elementToRender,
    currentPath: currentHash,
    isReady: isReady,
  };
};