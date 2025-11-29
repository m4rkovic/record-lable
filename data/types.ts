// Definira strukturu podataka za Izvođača
export interface Artist {
  id: number;
  name: string;
  genre: string;
  since: number;
  bio: string;
  members: string; // Dodati novi detalji
  origin: string;
  tags: string[];
}

// Definira strukturu podataka za Izdanje
export interface Release {
  id: number;
  artist: string;
  title: string;
  format: 'LP' | 'EP' | 'Single';
  year: number;
  coverUrl: string;
  colorClass: string;
}

// Nazivi putanja (ruta) za rutiranje
// Dodata dinamička ruta za detalje izvođača
export type PathName = '/' | '/izvodjaci' | '/izdanja' | '/clanci' | '/o-nama' | '/kontakt' | `/izvodjaci/${string}` | '/admin';