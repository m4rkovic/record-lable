// Naziv komponente: DataContext (Globalni State Management)
// Svrha: Izolacija svih podataka, CRUD operacija, pretrage i paginacije iz AdminPanelPage,
// čime se priprema aplikacija za Next.js API integraciju.
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { MOCK_ARTISTS, MOCK_RELEASES, MOCK_ARTICLES, MOCK_USERS } from '../data/mockData';
import type { Artist, Release } from '../data/types';

// --- TIPOVI (Premešteni iz AdminPanelPage) ---
export type EntityType = 'artists' | 'releases' | 'articles';
export type ViewMode = 'grid' | 'list';

// Tipovi za inicijalne objekte
const initialNewArtist: Artist = { id: Date.now(), name: '', genre: '', since: new Date().getFullYear(), bio: '', members: '', origin: '', tags: [] };
const initialNewRelease: Release = { id: Date.now(), artist: '', artistId: 0, title: '', format: 'LP', year: new Date().getFullYear(), coverUrl: 'https://placehold.co/400x400/000000/FFFFFF?text=NEW+COVER', colorClass: 'bg-gray-800' };
const initialNewArticle = { id: Date.now(), title: '', date: new Date().toISOString().substring(0, 10), snippet: '', artistId: 0, content: 'Pišite sadržaj ovde (možete koristiti HTML ili Markdown).', tags: '', };

// --- INTERFEJS ZA KONTEKST ---
interface DataContextProps {
  artists: Artist[];
  releases: Release[];
  articles: any[];
  users: any[];
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
  viewMode: ViewMode;
  selectedYear: string;
  selectedArtistId: number;
  selectedGenre: string;
  triggerReport: boolean;
  
  allArtistOptions: { id: number; name: string; genre: string }[];
  
  // Funkcije za promenu stanja
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  setViewMode: (mode: ViewMode) => void;
  resetPagination: () => void;
  
  // Dashboard filteri
  setSelectedYear: (year: string) => void;
  setSelectedArtistId: (id: number) => void;
  setSelectedGenre: (genre: string) => void;
  setTriggerReport: (trigger: boolean) => void;
  
  // CRUD Funkcije (U buducnosti ce se menjati da pozivaju Next.js API rute)
  handleEdit: (entity: any, type: EntityType) => void;
  handleDelete: (id: number, type: EntityType) => void;
  handleSave: (entity: any, type: EntityType) => void;
  handleCreateNew: (type: EntityType) => void;
  filterAndPaginate: (data: any[], searchKeys: string[]) => { filtered: any[]; paginated: any[] };

  // Modal Stanje
  isModalOpen: boolean;
  editingArtist: Artist | null;
  editingRelease: Release | null;
  editingArticle: any | null;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingArtist: (a: Artist | null) => void;
  setEditingRelease: (r: Release | null) => void;
  setEditingArticle: (a: any | null) => void;
}

// Inicijalna (default) vrednost konteksta
const DataContext = createContext<DataContextProps | undefined>(undefined);

// Hook za lakše korišćenje konteksta
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData mora biti korišćen unutar DataProvider-a');
  }
  return context;
};

// --- DATA PROVIDER KOMPONENTA ---
export const DataProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // --- Stanje za podatke (kasnije će se puniti iz Next.js API-ja/Baze) ---
  const [artists, setArtists] = useState<Artist[]>(MOCK_ARTISTS);
  const [releases, setReleases] = useState<Release[]>(MOCK_RELEASES);
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const users = MOCK_USERS; // Mock Users ostaje ovde za sada
  
  // --- Stanje za Admin UI (Search, Pagination, View) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // --- Stanje za Dashboard Filteri/Report ---
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedArtistId, setSelectedArtistId] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [triggerReport, setTriggerReport] = useState(false); 
  
  // --- Stanje za Modal/Editovanje ---
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [editingRelease, setEditingRelease] = useState<Release | null>(null);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allArtistOptions = useMemo(() => artists.map(a => ({ id: a.id, name: a.name, genre: a.genre })), [artists]);

  // --- LOGIKA FILTERA I PAGINACIJE ---
  const resetPagination = useCallback(() => {
      setCurrentPage(1);
      setSearchTerm('');
  }, []);
  
  const filterAndPaginate = useCallback((data: any[], searchKeys: string[]) => {
    const filtered = data.filter(item => 
        searchKeys.some(key => {
            const value = item[key];
            const searchableValue = Array.isArray(value) ? value.join(' ') : String(value);

            return searchableValue.toLowerCase().includes(searchTerm.toLowerCase());
        })
    );
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);
    return { filtered, paginated };
  }, [searchTerm, currentPage, itemsPerPage]);


  // --- LOGIKA GENERIČKOG CRUD-a ---
  
  const handleEdit = useCallback((entity: any, type: EntityType) => {
    if (type === 'articles') {
      const articleWithTags = { ...entity, tags: entity.tags ? entity.tags.join(', ') : '', };
      setEditingArticle(articleWithTags);
    } else {
      switch (type) {
        case 'artists': setEditingArtist(entity); break;
        case 'releases': setEditingRelease(entity); break;
      }
    }
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: number, type: EntityType) => {
    // NAPOMENA: U Next.js-u, ovde bi išao fetch poziv ka API ruti, npr: 
    // fetch('/api/deleteEntity', { method: 'POST', body: JSON.stringify({ id, type }) });
    switch (type) {
      case 'artists': setArtists(prev => prev.filter(e => e.id !== id)); break;
      case 'releases': setReleases(prev => prev.filter(e => e.id !== id)); break;
      case 'articles': setArticles(prev => prev.filter(e => e.id !== id)); break;
    }
  }, []);

  const handleSave = useCallback((entity: any, type: EntityType) => {
    // NAPOMENA: U Next.js-u, ovde bi išao fetch poziv ka API ruti, npr: 
    // fetch('/api/saveEntity', { method: 'POST', body: JSON.stringify(entity) });
    let finalEntity = entity;
    
    if (type === 'articles' && typeof entity.tags === 'string') {
      finalEntity = { ...entity, tags: entity.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0), };
    }
    
    const setState = type === 'artists' ? setArtists : (type === 'releases' ? setReleases : setArticles);
    
    setState((prev: any[]) => {
      const index = prev.findIndex(e => e.id === finalEntity.id);
      if (index > -1) {
        return prev.map(e => (e.id === finalEntity.id ? finalEntity : e));
      } else {
        return [...prev, { ...finalEntity, id: Date.now() }];
      }
    });
    setIsModalOpen(false);
    setEditingArtist(null);
    setEditingRelease(null);
    setEditingArticle(null);
  }, []);

  const handleCreateNew = useCallback((type: EntityType) => {
    switch (type) {
      case 'artists': setEditingArtist({...initialNewArtist, id: Date.now()}); break;
      case 'releases': setEditingRelease({...initialNewRelease, id: Date.now()}); break;
      case 'articles': setEditingArticle({...initialNewArticle, id: Date.now()}); break;
    }
    setIsModalOpen(true);
  }, []);

  // --- VREDNOSTI KONTEKSTA ---
  const contextValue: DataContextProps = {
    artists, releases, articles, users,
    searchTerm, currentPage, itemsPerPage, viewMode,
    selectedYear, selectedArtistId, selectedGenre, triggerReport,
    allArtistOptions,
    setSearchTerm, setCurrentPage, setItemsPerPage, setViewMode, resetPagination,
    setSelectedYear, setSelectedArtistId, setSelectedGenre, setTriggerReport,
    handleEdit, handleDelete, handleSave, handleCreateNew,
    filterAndPaginate,
    isModalOpen, editingArtist, editingRelease, editingArticle,
    setIsModalOpen, setEditingArtist, setEditingRelease, setEditingArticle,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};