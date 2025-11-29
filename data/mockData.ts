// Naziv komponente: Mock Data
import type { Artist, Release } from './types';

// Mock podaci su prošireni sa placeholder slikama i bojama
export const MOCK_ARTISTS: Artist[] = [
  { 
    id: 1, 
    name: 'Senzorika', 
    genre: 'Industrial Techno', 
    since: 2021,
    bio: 'Senzorika kreira neumoljivi, sirovi industrijski techno, fokusirajući se na repetitivne ritmove i teksturalne distorzije. Njena muzika je istraživanje urbanog propadanja i digitalne otuđenosti. Njihov zvuk je definisan oštrim udarcima, metalnim teksturama i teškom atmosferom.',
    members: 'Solo projekat (Lena Petrović)',
    origin: 'Novi Sad, Srbija',
    tags: ['Noise', 'EBM', 'Ritam', 'Distortion'],
  },
  { 
    id: 2, 
    name: 'Baza 03', 
    genre: 'Experimental Jazz', 
    since: 2018,
    bio: 'Kolektiv Baza 03 spaja slobodnu improvizaciju džeza sa bučnom elektronikom. Oni teže ka stvaranju zvučnih pejzaža koji su istovremeno haotični i meditativni, odbijajući klasične muzičke strukture. Svaki nastup je unikatan performans.',
    members: 'Trio (Bubanj, Saksofon, Modularni Synth)',
    origin: 'Zagreb, Hrvatska',
    tags: ['Improvizacija', 'Free Jazz', 'Modular'],
  },
  { 
    id: 3, 
    name: 'Vortex Unit', 
    genre: 'Drone Ambient', 
    since: 2023,
    bio: 'Vortex Unit koristi produžene tonove i minimalne varijacije kako bi stvorio duboko imerzivne drone ambijente. Njihova izdanja su namenjena slušanju u mraku i tišini, služeći kao zvučni portali. Njihova ambicija je da istraže granice ljudske percepcije zvuka.',
    members: 'Duo (Miodrag i Ana)',
    origin: 'Sarajevo, Bosna i Hercegovina',
    tags: ['Drone', 'Minimalizam', 'Ambient'],
  },
  { 
    id: 4, 
    name: 'Sky Hook', 
    genre: 'Drone Ambient', 
    since: 2025,
    bio: 'Sky Hook koristi produžene tonove i minimalne varijacije kako bi stvorio duboko imerzivne drone ambijente. Njihova izdanja su namenjena slušanju u mraku i tišini, služeći kao zvučni portali. Njihova ambicija je da istraže granice ljudske percepcije zvuka.',
    members: 'John doe, Jane Doe, John SMith',
    origin: 'Nis, Srbija',
    tags: ['Drone', 'Minimalizam', 'Ambient'],
  },
];

export const MOCK_RELEASES: Release[] = [
  { id: 101, artist: 'Senzorika', artistId: 1, title: 'Decay Pattern', format: 'LP', year: 2024, coverUrl: 'https://placehold.co/400x400/FF4500/000000?text=Senzorika+Decay', colorClass: 'bg-red-800' },
  { id: 102, artist: 'Baza 03', artistId: 2, title: 'Eho (Live)', format: 'EP', year: 2023, coverUrl: 'https://placehold.co/400x400/FFD700/000000?text=Baza+Eho', colorClass: 'bg-yellow-600' },
  { id: 103, artist: 'Vortex Unit', artistId: 3, title: 'Signal Loss', format: 'Single', year: 2024, coverUrl: 'https://placehold.co/400x400/4B0082/FFFFFF?text=Vortex+Signal', colorClass: 'bg-indigo-900' },
  { id: 104, artist: 'Senzorika', artistId: 1, title: 'Phase Shift', format: 'Single', year: 2023, coverUrl: 'https://placehold.co/400x400/8B0000/FFFFFF?text=Senzorika+Shift', colorClass: 'bg-red-900' },
];

// Mock podaci za članke sa referencama na izvođače
export const MOCK_ARTICLES = [
  { id: 1, title: 'Analiza Zvuka: Tehnike Dron Proizvodnje', date: '2024.10.20', snippet: 'Duboki uvid u minimalne varijacije frekvencije i snagu produženog tona u ambient muzici. Kako postići maksimalnu tenziju minimalnim sredstvima.', artistId: 3, content: 'Puni sadržaj članka o Dronu.' }, // Vortex Unit
  { id: 2, title: 'Intervju: Senzorika o Ritmu i Industriji', date: '2024.09.15', snippet: 'Razgovor o nekonvencionalnim metodama snimanja industrijskog techna, korišćenju analognih mašina i borbi protiv digitalne sterilnosti.', artistId: 1, content: 'Puni sadržaj intervjua sa Senzorikom.' }, // Senzorika
  { id: 3, title: 'Osvrt: Globalni Trendovi u Eksperimentalnom Džezu', date: '2024.08.01', snippet: 'Spajanje džeza sa bukom i free-form elektronikom. Primeri sa Baza 03 kolektivom.', artistId: 2, content: 'Puni sadržaj osvrta na eksperimentalni džez.' }, // Baza 03
  { id: 4, title: 'Izdavačka Etika: Fizička Izdana kao Manifest', date: '2024.07.10', snippet: 'Zašto je u eri streaminga opipljivi medij bitan.', artistId: 0, content: 'Puni sadržaj o etici izdavanja.' }, // Opšti
];

// DODATO: Mock podaci za korisnike
export const MOCK_USERS = [
  { id: 1, name: 'Admin User', role: 'ADMIN', lastLogin: '2025-11-28' },
  { id: 2, name: 'Demo User', role: 'USER', lastLogin: '2025-11-20' },
  { id: 3, name: 'Press Contact', role: 'PRESS', lastLogin: '2025-11-15' },
];