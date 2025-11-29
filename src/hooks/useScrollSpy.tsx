// Naziv komponente: useScrollSpy Hook
import React, { useState, useEffect } from 'react';

// Sekcije na HomePage koje želimo da pratimo
const HOMEPAGE_SECTIONS = ['#hero', '#izdanja', '#clanci', '#o-nama', '#kontakt'];
const HEADER_OFFSET = 64; // Visina fiksiranog header-a (cca h-16 tailwind)

/**
 * Custom Hook za praćenje trenutno vidljive sekcije na ekranu
 * u odnosu na vertikalni scroll položaj.
 * * @returns activeSectionId - ID trenutno aktivne sekcije (npr. '#izdanja').
 */
export const useScrollSpy = (): string => {
    const [activeSectionId, setActiveSectionId] = useState('');

    useEffect(() => {
        // Mapa elemenata i njihovih pozicija
        const elementMap = HOMEPAGE_SECTIONS.map(id => ({
            id: id,
            element: document.querySelector(id),
        }));

        const handleScroll = () => {
            let foundSection = '';
            
            // Trenutna pozicija skrola (plus ofset za fiksirani header)
            const scrollPosition = window.scrollY + HEADER_OFFSET;

            // Prolazimo kroz sve sekcije od dna ka vrhu
            for (let i = elementMap.length - 1; i >= 0; i--) {
                const item = elementMap[i];
                if (item.element) {
                    const top = item.element.getBoundingClientRect().top + window.scrollY;
                    
                    // Ako je pozicija skrola prešla vrh sekcije (sa malim offsetom od 10px)
                    if (scrollPosition >= top - 10) {
                        foundSection = item.id;
                        break;
                    }
                }
            }

            // Ako smo na samom vrhu, forsiramo #hero
            if (window.scrollY < HEADER_OFFSET / 2) {
                foundSection = '#hero';
            }

            // Ažuriraj stanje samo ako se sekcija promenila
            if (foundSection && foundSection !== activeSectionId) {
                setActiveSectionId(foundSection);
            }
        };

        // Podesi event listener
        window.addEventListener('scroll', handleScroll);
        // Pokreni odmah nakon mount-a da se inicijalizuje #hero
        handleScroll(); 

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeSectionId]); // Zavisnost: activeSectionId se menja -> pokreće useMemo

    return activeSectionId;
};