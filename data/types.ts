// Definicija strukture podataka za Izvođača
export interface Artist {
  id: number;
  name: string;
  genre: string;
  since: number;
  bio: string;
  members: string; 
  origin: string;
  tags: string[];
}

// Definicija strukture podataka za Izdanje
export interface Release {
  id: number;
  artist: string;
  artistId: number; // Veza ka Artistu
  title: string;
  format: 'LP' | 'EP' | 'Single';
  year: number;
  coverUrl: string;
  colorClass: string;
}

// Definicija strukture podataka za Događaj
export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  type: 'Live' | 'Festival' | 'Improvizacija'; 
  description: string;
  artists: string[]; // Izvođači koji učestvuju
}

// Definicija strukture podataka za Korisnika (za Admin Panel)
export interface User {
  id: number;
  name: string;
  role: 'ADMIN' | 'USER' | 'PRESS';
  lastLogin: string;
}

// Definicija putanja (ruta) za rutiranje
// Sadrži statičke rute (string) i dinamičke putanje
export type PathName = 
  '/' | 
  '/izvodjaci' | 
  '/izdanja' | 
  '/clanci' | 
  '/o-nama' | 
  '/kontakt' | 
  '/admin' |
  '/dogadjaji' | // Nova ruta
  '/podcast' | 
  '/interesantno' |
  `/izvodjaci/${string}` | // Dinamička ruta
  `/izdanja/${string}` |
  `/clanci/${string}` |
  `/dogadjaji/${string}`;