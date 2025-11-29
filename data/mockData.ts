// Naziv komponente: Mock Data
import type { Artist, Release, Event } from './types';

// Mock podaci su prošireni sa placeholder slikama i bojama

// --- MOCK ARTISTS (10) ---
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
    bio: 'Kolektiv Baza 03 spaja slobodnu improvizaciju džeza sa bučnom elektronikom. Oni teže ka stvaranju zvučnih pejzaža koji su istovremeno haotični i meditativni, odbijajući klasične muzičke strukture.',
    members: 'Trio (Bubanj, Saksofon, Modularni Synth)',
    origin: 'Zagreb, Hrvatska',
    tags: ['Improvizacija', 'Free Jazz', 'Modular'],
  },
  { 
    id: 3, 
    name: 'Vortex Unit', 
    genre: 'Drone Ambient', 
    since: 2023,
    bio: 'Vortex Unit koristi produžene tonove i minimalne varijacije kako bi stvorio duboko imerzivne drone ambijente. Njihova izdanja su namenjena slušanju u mraku i tišini, služeći kao zvučni portali.',
    members: 'Duo (Miodrag i Ana)',
    origin: 'Sarajevo, Bosna i Hercegovina',
    tags: ['Drone', 'Minimalizam', 'Ambient'],
  },
  { 
    id: 4, 
    name: 'Sky Hook', 
    genre: 'Industrial Techno', 
    since: 2025,
    bio: 'Sky Hook je mlađi projekat fokusiran na teške, složene poliritmičke strukture industrijskog techna, sa jakim uticajem EBM-a. Često koristi vokale kroz distorziju.',
    members: 'Solo projekat (Marko Savić)',
    origin: 'Niš, Srbija',
    tags: ['EBM', 'Ritam', 'Poliritam'],
  },
  { 
    id: 5, 
    name: 'Digitalna Pustinja', 
    genre: 'Ambient Noise', 
    since: 2022,
    bio: 'Istraživanje digitalne dekompozicije i šuma. Koristi isključivo softverske alate za generisanje buke i atmosfere.',
    members: 'Duo (Tijana i Nikola)',
    origin: 'Split, Hrvatska',
    tags: ['Noise', 'Digital', 'Glitch'],
  },
  { 
    id: 6, 
    name: 'Crna Mašina', 
    genre: 'Experimental Jazz', 
    since: 2019,
    bio: 'Spajanje organskog zvuka trube sa ranom modularnom sintezom, kreirajući mračne i nepredvidive melodijske linije.',
    members: 'Kvartet',
    origin: 'Ljubljana, Slovenija',
    tags: ['Free Jazz', 'Modular', 'Improvizacija'],
  },
  { 
    id: 7, 
    name: '0 KANAL', 
    genre: 'Drone Ambient', 
    since: 2024,
    bio: 'Fokusiran na ekstremni minimalizam i statičke harmonije. Njegov zvuk je terapija za one koji prihvataju buku.',
    members: 'Solo projekat (Jovan Ristić)',
    origin: 'Skoplje, Severna Makedonija',
    tags: ['Minimalizam', 'Drone', 'Harmonija'],
  },
  { 
    id: 8, 
    name: 'Reaktor', 
    genre: 'Industrial Techno', 
    since: 2017,
    bio: 'Veterani etikete. Poznati po agresivnim live nastupima i teškim, analognim setovima.',
    members: 'Solo projekat (Aleksandra V.)',
    origin: 'Beograd, Srbija',
    tags: ['Ritam', 'Analogno', 'Noise'],
  },
  { 
    id: 9, 
    name: 'Tajna Vrata', 
    genre: 'Experimental Jazz', 
    since: 2020,
    bio: 'Mistični projekat fokusiran na tihe improvizacije i mikrotonalne promene u kontekstu tišine.',
    members: 'Duo',
    origin: 'Rijeka, Hrvatska',
    tags: ['Tišina', 'Improvizacija', 'Jazz'],
  },
  { 
    id: 10, 
    name: 'Echo Chamber', 
    genre: 'Ambient Noise', 
    since: 2023,
    bio: 'Koristeći efekte odjeka i reverb-a, stvara zvučne prostore klaustrofobične atmosfere.',
    members: 'Solo projekat (Ana Marija)',
    origin: 'Podgorica, Crna Gora',
    tags: ['Ambient', 'Glitch', 'Noise'],
  },
];

// --- MOCK RELEASES (10) ---
export const MOCK_RELEASES: Release[] = [
  { id: 101, artist: 'Senzorika', artistId: 1, title: 'Decay Pattern', format: 'LP', year: 2024, coverUrl: 'https://placehold.co/400x400/FF4500/000000?text=Senzorika+Decay', colorClass: 'bg-red-800' },
  { id: 102, artist: 'Baza 03', artistId: 2, title: 'Eho (Live)', format: 'EP', year: 2023, coverUrl: 'https://placehold.co/400x400/FFD700/000000?text=Baza+Eho', colorClass: 'bg-yellow-600' },
  { id: 103, artist: 'Vortex Unit', artistId: 3, title: 'Signal Loss', format: 'Single', year: 2024, coverUrl: 'https://placehold.co/400x400/4B0082/FFFFFF?text=Vortex+Signal', colorClass: 'bg-indigo-900' },
  { id: 104, artist: 'Sky Hook', artistId: 4, title: 'Poliritam Shift', format: 'LP', year: 2025, coverUrl: 'https://placehold.co/400x400/8B0000/FFFFFF?text=Sky+Hook+Shift', colorClass: 'bg-red-900' },
  { id: 105, artist: 'Digitalna Pustinja', artistId: 5, title: 'Dezintegracija', format: 'EP', year: 2024, coverUrl: 'https://placehold.co/400x400/333333/FFFFFF?text=Pustinja+DZT', colorClass: 'bg-gray-700' },
  { id: 106, artist: 'Crna Mašina', artistId: 6, title: 'Monolit (Part I)', format: 'LP', year: 2023, coverUrl: 'https://placehold.co/400x400/222222/FFFFFF?text=Masina+Monolit', colorClass: 'bg-black' },
  { id: 107, artist: '0 KANAL', artistId: 7, title: 'Harmonija Statike', format: 'Single', year: 2024, coverUrl: 'https://placehold.co/400x400/999999/000000?text=Kanal+Statika', colorClass: 'bg-gray-500' },
  { id: 108, artist: 'Reaktor', artistId: 8, title: 'Analogni Bes', format: 'LP', year: 2022, coverUrl: 'https://placehold.co/400x400/CC0000/FFFFFF?text=Reaktor+Bes', colorClass: 'bg-red-700' },
  { id: 109, artist: 'Tajna Vrata', artistId: 9, title: 'Šapat Tišine', format: 'EP', year: 2023, coverUrl: 'https://placehold.co/400x400/111111/FFFFFF?text=Vrata+Sapat', colorClass: 'bg-gray-900' },
  { id: 110, artist: 'Echo Chamber', artistId: 10, title: 'Klaustrofobija', format: 'Single', year: 2025, coverUrl: 'https://placehold.co/400x400/666666/FFFFFF?text=Echo+Klaustro', colorClass: 'bg-gray-600' },
];

// --- MOCK ARTICLES (10) ---
export const MOCK_ARTICLES = [
  { id: 1, title: 'Analiza Zvuka: Tehnike Dron Proizvodnje', date: '2024.10.20', snippet: 'Duboki uvid u minimalne varijacije frekvencije i snagu produženog tona u ambient muzici. Kako postići maksimalnu tenziju minimalnim sredstvima.', artistId: 3, content: 'Puni sadržaj članka o Dronu.', tags: ['dron', 'analiza', 'minimalizam'] }, // Vortex Unit
  { id: 2, title: 'Intervju: Senzorika o Ritmu i Industriji', date: '2024.09.15', snippet: 'Razgovor o nekonvencionalnim metodama snimanja industrijskog techna, korišćenju analognih mašina i borbi protiv digitalne sterilnosti.', artistId: 1, content: 'Puni sadržaj intervjua sa Senzorikom.', tags: ['intervju', 'techno', 'industrija'] }, // Senzorika
  { id: 3, title: 'Osvrt: Globalni Trendovi u Eksperimentalnom Džezu', date: '2024.08.01', snippet: 'Spajanje džeza sa bukom i free-form elektronikom. Primeri sa Baza 03 kolektivom.', artistId: 2, content: 'Puni sadržaj osvrta na eksperimentalni džez.', tags: ['džez', 'trendovi', 'improvizacija'] }, // Baza 03
  { id: 4, title: 'Izdavačka Etika: Fizička Izdana kao Manifest', date: '2024.07.10', snippet: 'Zašto je u eri streaminga opipljivi medij bitan.', artistId: 0, content: 'Puni sadržaj o etici izdavanja.', tags: ['manifest', 'izdavastvo', 'biznis'] }, // Opšti
  { id: 5, title: 'EBM i Njegov Uticaj na Savremeni Techno', date: '2024.06.05', snippet: 'Analiza povratka EBM elemenata u klupsku scenu. Primeri iz Reaktor i Sky Hook diskografija.', artistId: 4, content: 'Puni sadržaj o EBM-u i techno-u.', tags: ['ebm', 'techno', 'muzika'] }, // Sky Hook
  { id: 6, title: 'Tišina kao Muzika: Tajna Vrata u Fokusu', date: '2023.12.01', snippet: 'Kritička analiza projekta koji koristi tišinu i mikrotonalne promene kao primarni instrument.', artistId: 9, content: 'Puni sadržaj o tišini.', tags: ['kritika', 'tišina', 'ambient'] }, // Tajna Vrata
  { id: 7, title: 'Glitch i Noise: Kako se stvara zvuk Pustinje', date: '2024.05.20', snippet: 'Uvid u produkcione tehnike Digitalne Pustinje i Echo Chambera.', artistId: 5, content: 'Puni sadržaj o glitch tehnikama.', tags: ['glitch', 'noise', 'produkcija'] }, // Digitalna Pustinja
  { id: 8, title: 'Analogni vs Digitalni Rat: Reaktor vs Softver', date: '2023.10.10', snippet: 'Debata o prednostima i manama analogne opreme u kontekstu moderne produkcije.', artistId: 8, content: 'Puni sadržaj o studijskoj opremi.', tags: ['analogno', 'digitalno', 'studio'] }, // Reaktor
  { id: 9, title: 'Budućnost Modularne Sinteze u Džezu', date: '2023.09.01', snippet: 'Intervju sa Crnom Mašinom o integraciji modularnih sistema u free jazz performanse.', artistId: 6, content: 'Puni sadržaj o modularnim sistemima.', tags: ['modular', 'intervju', 'džez'] }, // Crna Mašina
  { id: 10, title: 'Pregled: Najvažniji Dron Albumi 2024.', date: '2024.11.25', snippet: 'Kritički osvrt na najznačajnija dron izdanja etikete ove godine, uključujući 0 KANAL.', artistId: 7, content: 'Puni sadržaj o dron albumima.', tags: ['dron', 'kritika', 'izdanja'] }, // 0 KANAL
];

// --- MOCK EVENTS (10) ---
export const MOCK_EVENTS: Event[] = [
    { id: 201, title: 'VOID RITUAL NO. 7', date: '2026-03-15', location: 'Klub Half, Beograd', time: '23:00 - 05:00', type: 'Live', description: 'Noć čistog, nefiltriranog industrijskog techna.', artists: ['Senzorika', 'Noise Dept.'] },
    { id: 202, title: 'DRONSCAPE FESTIVAL', date: '2026-06-20', location: 'Tvrđava, Novi Sad', time: '18:00 - 03:00', type: 'Festival', description: 'Trodnevni festival posvećen ambijentu i dron muzici. Vortex Unit izvodi svoj najnoviji materijal.', artists: ['Vortex Unit', 'Ambient Null'] },
    { id: 203, title: 'FREE FORM JAZZ INVAZIJA', date: '2026-04-10', location: 'Muzej Savremene Umetnosti, Zagreb', time: '20:30', type: 'Improvizacija', description: 'Baza 03 i kolektiv domaćih umetnika istražuju granice zvuka u kontrolisanom haosu.', artists: ['Baza 03', 'Ritam Sekcija X'] },
    { id: 204, title: 'EBM NIGHT: SKY HOOK', date: '2026-05-01', location: 'Depo, Niš', time: '22:00 - 04:00', type: 'Live', description: 'Sky Hook u solo nastupu, premijerno izvođenje pesama sa Poliritam Shift albuma.', artists: ['Sky Hook'] },
    { id: 205, title: 'AMBIENT LAB: Digitalna Pustinja', date: '2026-02-14', location: 'Galerija, Split', time: '20:00', type: 'Live', description: 'Eksperimentalni ambient nastup uz vizuelne instalacije.', artists: ['Digitalna Pustinja'] },
    { id: 206, title: 'MODULAR JAM SESSION', date: '2026-03-25', location: 'Klub K4, Ljubljana', time: '21:00', type: 'Improvizacija', description: 'Otvoreni jam session sa fokusom na eurorack modularne sisteme. Crna Mašina kao domaćin.', artists: ['Crna Mašina', 'Modular Crew'] },
    { id: 207, title: 'LOOP KONFERENCIJA', date: '2026-09-05', location: 'Expo Centar, Beograd', time: '10:00 - 18:00', type: 'Festival', description: 'Regionalna konferencija o muzičkoj produkciji i tehnologiji. 0 KANAL drži predavanje.', artists: ['0 KANAL', 'Razni predavači'] },
    { id: 208, title: 'Tajna Vrata: Koncert Tišine', date: '2026-04-20', location: 'Stara Crkva, Rijeka', time: '19:00', type: 'Improvizacija', description: 'Jedinstveno iskustvo, tihe i hipnotičke improvizacije u akustičnom prostoru.', artists: ['Tajna Vrata'] },
    { id: 209, title: 'REAKTOR: Anniversary Show', date: '2026-10-31', location: 'Exit, Novi Sad', time: '23:30', type: 'Live', description: 'Veliki rođendanski nastup Reaktor-a sa specijalnim pirotehničkim efektima.', artists: ['Reaktor', 'Gosti iznenađenja'] },
    { id: 210, title: 'ECHO CHAMBER: Noć Buke', date: '2026-11-10', location: 'Kino, Podgorica', time: '21:00', type: 'Live', description: 'Domaći noise/ambient performeri u saradnji sa vizuelnim umetnicima.', artists: ['Echo Chamber', 'Local Noise'] },
];

// Mock podaci za korisnike
export const MOCK_USERS = [
  { id: 1, name: 'Admin User', role: 'ADMIN', lastLogin: '2025-11-28' },
  { id: 2, name: 'Demo User', role: 'USER', lastLogin: '2025-11-20' },
  { id: 3, name: 'Press Contact', role: 'PRESS', lastLogin: '2025-11-15' },
  { id: 4, name: 'Tijana K.', role: 'USER', lastLogin: '2025-10-01' },
  { id: 5, name: 'Nikola S.', role: 'USER', lastLogin: '2025-11-11' },
  { id: 6, name: 'Jovan R.', role: 'USER', lastLogin: '2025-11-05' },
  { id: 7, name: 'Marko V.', role: 'PRESS', lastLogin: '2025-10-25' },
  { id: 8, name: 'Lana I.', role: 'USER', lastLogin: '2025-11-22' },
  { id: 9, name: 'Miodrag A.', role: 'USER', lastLogin: '2025-11-27' },
  { id: 10, name: 'Ana T.', role: 'USER', lastLogin: '2025-11-18' },
];