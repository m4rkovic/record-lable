// Naziv komponente: AdminPanelPage (GLAVNI KONTROLER I RUTIRANJE)
// TEMA: CLEAN DIGITAL BRUTALISM
import React, { useState, useMemo } from 'react';
// Uvoz shared komponenti
import { AdminButton } from '../components/shared/AdminButton';
import { InputField } from '../components/shared/InputField';
// Uvoz admin komponenti
import { AdminSidebar } from '../components/admin/Sidebar';
import { ViewControls } from '../components/admin/ViewControls';
import { EntityForm } from '../components/admin/modals/EntityForm';
import { BaseModal } from '../components/admin/modals/BaseModal';
import { PaginationControls } from '../components/admin/PaginationControls'; 
// Uvoz admin sekcija
import { CrudSectionTemplate } from '../components/admin/sections/CrudSectionTemplate';
import { DashboardUI } from '../components/admin/sections/DashboardUI';
import { UsersTable } from '../components/admin/sections/UsersTable';
import { SettingsSection } from '../components/admin/sections/SettingsSection';


// Uvoz Data Context-a
// NAPOMENA: Preuzeli smo EntityType i ViewMode iz DataContext.tsx
import { useData, DataProvider, EntityType, ViewMode } from '../context/DataContext';

// Uvoz tipova iz Data Context-a ili globalnog tip fajla
import type { Artist, Release } from '../data/types';


export type CurrentSection = 'dashboard' | 'artists' | 'releases' | 'articles' | 'users' | 'settings';

// AdminPanelInner komponenta koja koristi Context
const AdminPanelInner: React.FC = () => {
  // --- LOKALNO STANJE ZA RUTIRANJE (JEDINO ŠTO OSTAJE LOKALNO) ---
  const [currentSection, setCurrentSection] = useState<CurrentSection>('dashboard');
  
  // --- GLOBALNO STANJE IZ DATA CONTEXTA ---
  // Sva stanja za podatke, CRUD logiku, pretragu i paginaciju sada dolaze iz useData hooka
  const {
      // Podaci
      artists, releases, articles, users,
      // Admin UI Stanje
      searchTerm, currentPage, itemsPerPage, viewMode, setSearchTerm, setCurrentPage, setItemsPerPage, setViewMode, resetPagination,
      // Dashboard Stanje
      selectedYear, setSelectedYear, selectedArtistId, setSelectedArtistId, selectedGenre, setSelectedGenre, triggerReport, setTriggerReport,
      // CRUD Funkcije
      handleEdit, handleDelete, handleSave, handleCreateNew, filterAndPaginate,
      // Modal Stanje
      isModalOpen, editingArtist, editingRelease, editingArticle, setIsModalOpen, setEditingArtist, setEditingRelease, setEditingArticle,
      // Izvedeni podaci
      allArtistOptions
  } = useData();

  // --- LOGIKA ZA PRETRAGU ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
  };
  
  // --- RENDERING SEKCIJA (AGREGACIJA LOGIKE) ---

  const ArtistsCrudSection: React.FC = () => {
    // Koristi filterAndPaginate funkciju iz konteksta
    const { filtered, paginated } = useMemo(() => filterAndPaginate(artists, ['name', 'genre', 'members', 'origin']), [artists, searchTerm, itemsPerPage, currentPage, filterAndPaginate]);
    return (<CrudSectionTemplate title="IZVOĐAČI" dataCount={artists.length} paginated={paginated} filteredLength={filtered.length} entityType="artists" viewMode={viewMode} setViewMode={setViewMode} searchTerm={searchTerm} handleSearchChange={handleSearchChange} handleCreateNew={handleCreateNew} handleEdit={handleEdit} handleDelete={handleDelete} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} setSearchTerm={setSearchTerm} />); 
  };
  
  const ReleasesCrudSection: React.FC = () => {
    // Koristi filterAndPaginate funkciju iz konteksta
    const { filtered, paginated } = useMemo(() => filterAndPaginate(releases, ['title', 'artist', 'format', 'year']), [releases, searchTerm, itemsPerPage, currentPage, filterAndPaginate]);
    return (<CrudSectionTemplate title="IZDANJA" dataCount={releases.length} paginated={paginated} filteredLength={filtered.length} entityType="releases" viewMode={viewMode} setViewMode={setViewMode} searchTerm={searchTerm} handleSearchChange={handleSearchChange} handleCreateNew={handleCreateNew} handleEdit={handleEdit} handleDelete={handleDelete} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} setSearchTerm={setSearchTerm} />); 
  };

  const ArticlesCrudSection: React.FC = () => {
    // Koristi filterAndPaginate funkciju iz konteksta
    const { filtered, paginated } = useMemo(() => filterAndPaginate(articles, ['title', 'snippet', 'tags', 'date']), [articles, searchTerm, itemsPerPage, currentPage, filterAndPaginate]);
    return (<CrudSectionTemplate title="ČLANCI" dataCount={articles.length} paginated={paginated} filteredLength={filtered.length} entityType="articles" viewMode={viewMode} setViewMode={setViewMode} searchTerm={searchTerm} handleSearchChange={handleSearchChange} handleCreateNew={handleCreateNew} handleEdit={handleEdit} handleDelete={handleDelete} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} setSearchTerm={setSearchTerm} />); 
  };


  // --- GLAVNI MODAL RENDER ---
  const renderFormModal = () => {
    const currentEntity = editingArtist || editingRelease || editingArticle;
    const entityType = editingArtist ? 'artists' : (editingRelease ? 'releases' : 'articles');

    return (
        <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {currentEntity && (
                <EntityForm 
                    entity={currentEntity}
                    entityType={entityType as EntityType} // Eksplicitni cast nakon provere
                    allArtistOptions={allArtistOptions}
                    handleSave={handleSave}
                    setEntity={
                        entityType === 'artists' ? setEditingArtist :
                        entityType === 'releases' ? setEditingRelease :
                        setEditingArticle
                    }
                    setIsModalOpen={() => setIsModalOpen(false)}
                />
            )}
        </BaseModal>
    );
  };
  
  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardUI 
            selectedYear={selectedYear} setSelectedYear={setSelectedYear} 
            selectedArtistId={selectedArtistId} setSelectedArtistId={setSelectedArtistId} 
            selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} 
            triggerReport={triggerReport} setTriggerReport={setTriggerReport} 
            allArtistOptions={allArtistOptions} releases={releases} artists={artists}
        />;
      case 'artists':
        return <ArtistsCrudSection />;
      case 'releases':
        return <ReleasesCrudSection />;
      case 'articles':
        return <ArticlesCrudSection />;
      case 'users':
        // Prosleđujemo mock users iz konteksta
        return <UsersTable users={users} />; 
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardUI 
            selectedYear={selectedYear} setSelectedYear={setSelectedYear} 
            selectedArtistId={selectedArtistId} setSelectedArtistId={setSelectedArtistId} 
            selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} 
            triggerReport={triggerReport} setTriggerReport={setTriggerReport} 
            allArtistOptions={allArtistOptions} releases={releases} artists={artists}
        />;
    }
  };

  return (
    // GLAVNI WRAPPER: Uklanjam p-4 iz spoljnjeg diva.
    <div className="min-h-screen bg-gray-300 text-gray-800 font-mono"> 
      {/* Gornja Crna Traka (simulira deo front-end Header-a) */}
      <div className="bg-black text-white p-2 border-b-4 border-red-600 max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold ml-4">VOID ADMIN PANEL</h1>
      </div>
      
      {/* GLAVNI FLEX KONTEJNER: FIX (Finalna verzija) -- Dodajemo mt-16 za razmak od fiksnog Header-a. */}
      <div className="flex max-w-7xl mx-auto mt-16" style={{ minHeight: 'calc(100vh - 64px)' }}> 
        
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <AdminSidebar currentSection={currentSection} setCurrentSection={setCurrentSection} resetPagination={resetPagination} />
        </div>
        
        {/* Glavni Sadržaj */}
        <div className="flex-grow p-8 bg-white border-l-4 border-black">
          {renderContent()}
        </div>

      </div>
      
      {renderFormModal()}
    </div>
  );
};

// AdminPanelPage komponenta omotana DataProvider-om. 
// NAPOMENA: U stvarnoj Next.js aplikaciji, DataProvider bi trebalo da ide u _app.tsx
const AdminPanelPage: React.FC = () => (
    <DataProvider>
        <AdminPanelInner />
    </DataProvider>
);

export default AdminPanelPage;

// // Naziv komponente: AdminPanelPage (MONOLITNA KOMPONENTA ZA ADMINISTRACIJU)
// // TEMA: CLEAN DIGITAL BRUTALISM (Svetla paleta, fokus na Grid i tipografiju)
// import React, { useState, useMemo } from 'react';
// import SectionTitle from '../components/shared/SectionTitle';
// import { MOCK_ARTISTS, MOCK_RELEASES, MOCK_ARTICLES } from '../data/mockData';
// import type { Artist, Release } from '../data/types';

// // Mock podaci za korisnike
// const MOCK_USERS = [
//   { id: 1, name: 'Admin User', role: 'ADMIN', lastLogin: '2025-11-28' },
//   { id: 2, name: 'Demo User', role: 'USER', lastLogin: '2025-11-20' },
//   { id: 3, name: 'Press Contact', role: 'PRESS', lastLogin: '2025-11-15' },
// ];

// type CurrentSection = 'dashboard' | 'artists' | 'releases' | 'articles' | 'users' | 'settings';
// type EntityType = 'artists' | 'releases' | 'articles';
// type ViewMode = 'grid' | 'list'; // NOVI TIP ZA PRIKAZ

// // Inicijalno prazan obrazac za novog izvođača
// const initialNewArtist: Artist = {
//   id: Date.now(),
//   name: '',
//   genre: '',
//   since: new Date().getFullYear(),
//   bio: '',
//   members: '',
//   origin: '',
//   tags: [],
// };

// // Inicijalno prazan obrazac za novo izdanje
// const initialNewRelease: Release = {
//   id: Date.now(),
//   artist: '',
//   artistId: 0,
//   title: '',
//   format: 'LP',
//   year: new Date().getFullYear(),
//   coverUrl: 'https://placehold.co/400x400/000000/FFFFFF?text=NEW+COVER',
//   colorClass: 'bg-gray-800',
// };

// // Inicijalno prazan obrazac za novi članak
// const initialNewArticle = {
//   id: Date.now(),
//   title: '',
//   date: new Date().toISOString().substring(0, 10),
//   snippet: '',
//   artistId: 0,
//   content: 'Pišite sadržaj ovde (možete koristiti HTML ili Markdown).',
//   tags: '', // Dodato polje za tagove
// };

// const AdminPanelPage: React.FC = () => {
//   const [currentSection, setCurrentSection] = useState<CurrentSection>('dashboard');
//   const [viewMode, setViewMode] = useState<ViewMode>('grid'); // NOVO STANJE ZA PRIKAZ
  
//   // Stanja za Paginaciju i Pretragu (Univerzalna za sve sekcije)
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10); 
  
//   // Stanje za entitete (simulacija)
//   const [artists, setArtists] = useState<Artist[]>(MOCK_ARTISTS);
//   const [releases, setReleases] = useState<Release[]>(MOCK_RELEASES);
//   const [articles, setArticles] = useState(MOCK_ARTICLES);
  
//   // Stanje za forme (CRUD)
//   const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
//   const [editingRelease, setEditingRelease] = useState<Release | null>(null);
//   const [editingArticle, setEditingArticle] = useState<any | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // FIX: useMemo je premješten na vrh komponente (važno za Hooks pravila)
//   const allArtistOptions = useMemo(() => artists.map(a => ({ id: a.id, name: a.name, genre: a.genre })), [artists]);

//   // --- LOGIKA GENERIČKOG CRUD-a (Simulacija) ---
  
//   const handleEdit = (entity: any, type: EntityType) => {
//     if (type === 'articles') {
//       const articleWithTags = {
//         ...entity,
//         tags: entity.tags ? entity.tags.join(', ') : '',
//       };
//       setEditingArticle(articleWithTags);
//     } else {
//       switch (type) {
//         case 'artists': setEditingArtist(entity); break;
//         case 'releases': setEditingRelease(entity); break;
//       }
//     }
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id: number, type: EntityType) => {
//     if (confirm(`Da li ste sigurni da želite da obrišete ID: ${id}?`)) { 
//       switch (type) {
//         case 'artists': setArtists(prev => prev.filter(e => e.id !== id)); break;
//         case 'releases': setReleases(prev => prev.filter(e => e.id !== id)); break;
//         case 'articles': setArticles(prev => prev.filter(e => e.id !== id)); break;
//       }
//     }
//   };

//   const handleSave = (entity: any, type: EntityType) => {
//     let finalEntity = entity;
    
//     if (type === 'articles' && entity.tags) {
//       finalEntity = {
//         ...entity,
//         tags: entity.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0),
//       };
//     }
    
//     const setState = type === 'artists' ? setArtists : (type === 'releases' ? setReleases : setArticles);
    
//     setState((prev: any[]) => {
//       const index = prev.findIndex(e => e.id === finalEntity.id);
//       if (index > -1) {
//         return prev.map(e => (e.id === finalEntity.id ? finalEntity : e));
//       } else {
//         return [...prev, { ...finalEntity, id: Date.now() }];
//       }
//     });
//     setIsModalOpen(false);
//     setEditingArtist(null);
//     setEditingRelease(null);
//     setEditingArticle(null);
//   };

//   const handleCreateNew = (type: EntityType) => {
//     switch (type) {
//       case 'artists': setEditingArtist({...initialNewArtist, id: Date.now()}); break;
//       case 'releases': setEditingRelease({...initialNewRelease, id: Date.now()}); break;
//       case 'articles': setEditingArticle({...initialNewArticle, id: Date.now()}); break;
//     }
//     setIsModalOpen(true);
//   };
  
//   // --- POMOĆNE KOMPONENTE I UI ELEMENTI ---
  
//   // Raw Brutalist Dugme (Crno/Belo/Akcenat)
//   const AdminButton: React.FC<React.PropsWithChildren<{ onClick: () => void, color: 'accent' | 'red' | 'gray', small?: boolean, isSubmit?: boolean }>> = ({ onClick, children, color, small, isSubmit = false }) => {
//     const colorClasses = {
//       // Akcenat: Lime (žuto-zelena)
//       accent: 'bg-lime-600 hover:bg-lime-700 text-black border-black', 
//       red: 'bg-red-600 hover:bg-red-700 text-white border-black', // Promenjen border u crni
//       // Siva (primarni za Edit/Delete)
//       gray: 'bg-gray-300 hover:bg-gray-400 text-black border-black',
//     };

//     return (
//       <button
//         onClick={onClick}
//         type={isSubmit ? 'submit' : 'button'}
//         className={`
//           ${small ? 'text-xs px-2 py-0.5' : 'text-sm px-4 py-2 w-full'}
//           ${colorClasses[color]}
//           font-mono border transition duration-150 shadow-none
//         `}
//       >
//         {children}
//       </button>
//     );
//   };
  
//   // Sidebar - Raw Grid Stil
//   const Sidebar: React.FC = () => (
//     <nav className="bg-white p-4 border-r-4 border-black shadow-none h-full"> {/* Svetlija pozadina */}
//       <h3 className="text-xl font-mono text-black mb-8 border-b-2 border-black pb-2 uppercase tracking-widest">
//         ADMIN CORE
//       </h3>
//       <ul className="space-y-1">
//         {['dashboard', 'artists', 'releases', 'articles', 'users', 'settings'].map(section => (
//           <li key={section}>
//             <button
//               onClick={() => { setCurrentSection(section as CurrentSection); setCurrentPage(1); setSearchTerm(''); }} // RESETUJ STANJE
//               className={`
//                 w-full text-left p-2 font-mono text-base transition duration-100 border-b border-gray-300 {/* Suptilniji border */}
//                 ${currentSection === section 
//                   ? 'bg-lime-600 text-black font-extrabold border-l-4 border-black pl-3' 
//                   : 'text-gray-800 hover:bg-gray-100'}
//               `}
//             >
//               {section.toUpperCase()}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );

//   // --- SEKCIJE SADRŽAJA ---

//   const ViewModeToggle: React.FC<{ currentMode: ViewMode, setMode: (mode: ViewMode) => void }> = ({ currentMode, setMode }) => (
//     <div className='flex space-x-2 border border-black p-1 bg-gray-100'> {/* Suptilniji border */}
//       <button
//         onClick={() => setMode('grid')}
//         className={`px-3 py-1 text-sm font-mono border border-black transition ${currentMode === 'grid' ? 'bg-lime-600 text-black' : 'bg-white text-gray-800 hover:bg-gray-300'}`}
//       >
//         GRID
//       </button>
//       <button
//         onClick={() => setMode('list')}
//         className={`px-3 py-1 text-sm font-mono border border-black transition ${currentMode === 'list' ? 'bg-lime-600 text-black' : 'bg-white text-gray-800 hover:bg-gray-300'}`}
//       >
//         LIST
//       </button>
//     </div>
//   );
  
//   const PaginationControls: React.FC<{ totalItems: number, items: any[], entityType: EntityType }> = ({ totalItems, items, entityType }) => {
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
//     // Čuvanje uvek samo 5/10/25/50 opcija, bez obzira na veličinu liste.
//     const perPageOptions = [5, 10, 25, 50]; 

//     return (
//       <div className="flex justify-between items-center mt-4 border-t border-black pt-3">
//         {/* Kontrola Broja Stranica */}
//         <div className="flex items-center space-x-2">
//           <label className="text-sm font-mono text-gray-700">Prikaži:</label>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => {
//               setItemsPerPage(parseInt(e.target.value, 10));
//               setCurrentPage(1); // Resetuj na prvu stranicu pri promeni veličine
//             }}
//             className="p-1 border border-black bg-white text-sm font-mono focus:border-lime-600 appearance-none"
//           >
//             {perPageOptions.map(num => (
//               <option key={num} value={num}>{num}</option>
//             ))}
//           </select>
//           <span className="text-sm font-mono text-gray-700">({totalItems} ukupno)</span>
//         </div>

//         {/* Kontrola Paginacije */}
//         <div className="flex space-x-1">
//           <AdminButton onClick={() => setCurrentPage(1)} color="gray" small>|{'<'}</AdminButton>
//           <AdminButton onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} color="gray" small>{'<'}</AdminButton>
          
//           <div className='flex space-x-1'>
//             {pageNumbers.map(number => (
//               <button
//                 key={number}
//                 onClick={() => setCurrentPage(number)}
//                 className={`px-2 py-0.5 text-sm font-mono border border-black transition ${number === currentPage ? 'bg-black text-lime-600' : 'bg-white text-gray-800 hover:bg-gray-300'}`}
//               >
//                 {number}
//               </button>
//             )).slice(currentPage > 3 ? currentPage - 3 : 0, currentPage + 2)} {/* Prikaz do 5 brojeva stranica */}
//           </div>
          
//           <AdminButton onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} color="gray" small>{'>'}</AdminButton>
//           <AdminButton onClick={() => setCurrentPage(totalPages)} color="gray" small>{'>'}|</AdminButton>
//         </div>
//       </div>
//     );
//   }
  
//   const UsersSection: React.FC = () => (
//     <div className="space-y-4">
//       <h2 className="text-3xl font-mono text-black border-b-4 border-red-600 pb-1 inline-block">PREGLED KORISNIKA</h2>
//       <table className="w-full text-left font-mono border-collapse border border-black">
//         <thead className="bg-black text-white">
//           <tr>
//             <th className="p-3 border-r border-gray-700">ID</th>
//             <th className="p-3 border-r border-gray-700">IME</th>
//             <th className="p-3 border-r border-gray-700">ROLA</th>
//             <th className="p-3">ZADNJA PRIJAVA</th>
//           </tr>
//         </thead>
//         <tbody>
//           {MOCK_USERS.map(user => (
//             <tr key={user.id} className="border-b border-black odd:bg-gray-100 even:bg-white hover:bg-lime-100 transition">
//               <td className="p-3 border-r border-black text-red-600 font-bold">{user.id}</td>
//               <td className="p-3 border-r border-black text-gray-800">{user.name}</td>
//               <td className="p-3 border-r border-black">
//                 <span className={`px-2 py-0.5 text-xs font-bold ${user.role === 'ADMIN' ? 'bg-red-600 text-white' : 'bg-gray-400 text-black'}`}>
//                   {user.role}
//                 </span>
//               </td>
//               <td className="p-3 text-sm text-gray-600">{user.lastLogin}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
  
//   // Generički filter i paginacija za CRUD sekcije
//   const filterAndPaginate = (data: any[], searchKeys: string[]) => {
//     // 1. Filtriranje po terminu pretrage
//     const filtered = data.filter(item => 
//         searchKeys.some(key => {
//             const value = item[key];
//             return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
//         })
//     );
    
//     // 2. Paginacija
//     const start = (currentPage - 1) * itemsPerPage;
//     const paginated = filtered.slice(start, start + itemsPerPage);
    
//     return { filtered, paginated };
//   }
  
//   // Premeštam Search Input u zasebnu komponentu za FIX fokus
//   const SearchInput: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }> = React.memo(({ value, onChange, placeholder }) => (
//     <input
//         type="text"
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         // FIX: Dodata funkcija koja se poziva da se re-selektuje element (vrati fokus)
//         onBlur={(e) => { e.target.focus(); }}
//         className="w-full p-2 border-2 border-black bg-white text-gray-800 font-mono focus:border-lime-600"
//     />
//   ));
  
//   const ArtistsCrudSection: React.FC = () => {
//     const { filtered, paginated } = useMemo(() => filterAndPaginate(artists, ['name', 'genre', 'members', 'origin']), [artists, searchTerm, itemsPerPage, currentPage]);
    
//     // FIX LOGIKA: Sada se searchTerm ažurira bez resetovanja stranice
//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setSearchTerm(e.target.value);
//       setCurrentPage(1); // Ovo je ključno, ali mora biti odvojeno od samog inputa
//     };

//     return (
//       <div className="space-y-4">
//         <div className="flex justify-between items-center border-b-4 border-black pb-2">
//           <h2 className="text-3xl font-mono text-black">IZVOĐAČI ({artists.length})</h2>
//           <div className='flex space-x-4 items-center'>
//               <ViewModeToggle currentMode={viewMode} setMode={setViewMode} />
//               <div className='w-32'>
//                 <AdminButton onClick={() => handleCreateNew('artists')} color="accent">+ NOVI</AdminButton>
//               </div>
//           </div>
//         </div>
        
//         {/* Kontrola Pretrage */}
//         <SearchInput
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="PRETRAŽI (Ime, Žanr, Članovi)..."
//         />
        
//         {paginated.length > 0 ? (
//           <>
//             {viewMode === 'grid' ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border border-black p-2 bg-gray-100">
//                 {paginated.map(artist => (
//                   <div key={artist.id} className="p-3 border border-black bg-white shadow-none">
//                     <h3 className="text-xl font-mono text-black mb-1">{artist.name.toUpperCase()}</h3>
//                     <p className="text-sm font-serif italic text-gray-600 mb-3">{artist.genre} | Od {artist.since}</p>
//                     <div className="flex space-x-2 mt-4">
//                       <AdminButton onClick={() => handleEdit(artist, 'artists')} color="gray" small>EDIT</AdminButton>
//                       <AdminButton onClick={() => handleDelete(artist.id, 'artists')} color="red" small>DELETE</AdminButton>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <table className="w-full text-left font-mono border-collapse border border-black">
//                 <thead className="bg-gray-200 text-black border-b-2 border-black">
//                   <tr>
//                     <th className="p-2 border-r border-black">ID</th>
//                     <th className="p-2 border-r border-black">IME</th>
//                     <th className="p-2 border-r border-black">ŽANR</th>
//                     <th className="p-2">AKCIJE</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginated.map(artist => (
//                     <tr key={artist.id} className="border-b border-gray-300 hover:bg-gray-100 transition">
//                       <td className="p-2 border-r border-black text-red-600 font-bold">{artist.id}</td>
//                       <td className="p-2 border-r border-black">{artist.name}</td>
//                       <td className="p-2 border-r border-black text-lime-600">{artist.genre}</td>
//                       <td className="p-2 flex space-x-2">
//                         <AdminButton onClick={() => handleEdit(artist, 'artists')} color="gray" small>EDIT</AdminButton>
//                         <AdminButton onClick={() => handleDelete(artist.id, 'artists')} color="red" small>DELETE</AdminButton>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//             <PaginationControls totalItems={filtered.length} items={paginated} entityType='artists' />
//           </>
//         ) : (
//           <div className="p-4 border-2 border-red-600 bg-gray-100 text-center font-mono">Nema izvođača koji odgovaraju pretrazi.</div>
//         )}
//       </div>
//     );
//   };
  
//   const ReleasesCrudSection: React.FC = () => {
//     const { filtered, paginated } = useMemo(() => filterAndPaginate(releases, ['title', 'artist', 'format', 'year']), [releases, searchTerm, itemsPerPage, currentPage]);
    
//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setSearchTerm(e.target.value);
//       setCurrentPage(1); 
//     };
    
//     return (
//       <div className='space-y-4'>
//         <div className="flex justify-between items-center border-b-4 border-black pb-2">
//           <h2 className="text-3xl font-mono text-black">IZDANJA ({releases.length})</h2>
//           <div className='flex space-x-4 items-center'>
//               <ViewModeToggle currentMode={viewMode} setMode={setViewMode} />
//               <div className='w-32'>
//                 <AdminButton onClick={() => handleCreateNew('releases')} color="accent">+ NOVO</AdminButton>
//               </div>
//           </div>
//         </div>
        
//         {/* Kontrola Pretrage */}
//         <SearchInput
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="PRETRAŽI (Naslov, Izvođač, Format)..."
//         />

//         {paginated.length > 0 ? (
//           <>
//             {viewMode === 'grid' ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 border border-black p-2 bg-gray-100">
//                 {paginated.map(release => (
//                   <div key={release.id} className="border border-black bg-white shadow-none">
//                     <img src={release.coverUrl} alt={release.title} className="w-full h-auto border-b border-black" />
//                     <div className='p-2'>
//                         <h3 className="text-sm font-mono text-gray-800 truncate leading-tight">{release.title}</h3>
//                         <p className="text-xs font-serif italic text-lime-600 mt-0.5">{release.artist}</p>
//                     </div>
//                     <div className="flex justify-between p-2 border-t border-black">
//                       <AdminButton onClick={() => handleEdit(release, 'releases')} color="gray" small>EDIT</AdminButton>
//                       <AdminButton onClick={() => handleDelete(release.id, 'releases')} color="red" small>DELETE</AdminButton>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <table className="w-full text-left font-mono border-collapse border border-black">
//                 <thead className="bg-gray-200 text-black border-b-2 border-black">
//                   <tr>
//                     <th className="p-2 border-r border-black">COVER</th>
//                     <th className="p-2 border-r border-black">NASLOV</th>
//                     <th className="p-2 border-r border-black">AUTOR</th>
//                     <th className="p-2 border-r border-black">FORMAT</th>
//                     <th className="p-2">AKCIJE</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginated.map(release => (
//                     <tr key={release.id} className="border-b border-gray-300 hover:bg-gray-100 transition">
//                       <td className="p-2 border-r border-black w-12"><img src={release.coverUrl} alt={release.title} className="w-8 h-8 object-cover border border-black" /></td>
//                       <td className="p-2 border-r border-black text-gray-800">{release.title}</td>
//                       <td className="p-2 border-r border-black text-lime-600">{release.artist}</td>
//                       <td className="p-2 border-r border-black">{release.format}</td>
//                       <td className="p-2 flex space-x-2">
//                         <AdminButton onClick={() => handleEdit(release, 'releases')} color="gray" small>EDIT</AdminButton>
//                         <AdminButton onClick={() => handleDelete(release.id, 'releases')} color="red" small>DELETE</AdminButton>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//             <PaginationControls totalItems={filtered.length} items={paginated} entityType='releases' />
//           </>
//         ) : (
//           <div className="p-4 border-2 border-red-600 bg-gray-100 text-center font-mono">Nema izdanja koja odgovaraju pretrazi.</div>
//         )}
//       </div>
//     );
//   };
  
//   const ArticlesCrudSection: React.FC = () => {
//     const { filtered, paginated } = useMemo(() => filterAndPaginate(articles, ['title', 'snippet', 'tags']), [articles, searchTerm, itemsPerPage, currentPage]);
    
//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setSearchTerm(e.target.value);
//       setCurrentPage(1); 
//     };

//     return (
//       <div className='space-y-4'>
//         <div className="flex justify-between items-center border-b-4 border-black pb-2">
//           <h2 className="text-3xl font-mono text-black">ČLANCI ({articles.length})</h2>
//           <div className='flex space-x-4 items-center'>
//               <ViewModeToggle currentMode={viewMode} setMode={setViewMode} />
//               <div className='w-32'>
//                 <AdminButton onClick={() => handleCreateNew('articles')} color="accent">+ NOVI</AdminButton>
//               </div>
//           </div>
//         </div>
        
//         {/* Kontrola Pretrage */}
//         <SearchInput
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="PRETRAŽI (Naslov, Snippet, Tagovi)..."
//         />

//         {paginated.length > 0 ? (
//           <>
//             {viewMode === 'grid' ? (
//               <div className="space-y-2 border border-black p-2 bg-gray-100">
//                 {paginated.map(article => (
//                   <div key={article.id} className="p-3 border border-black bg-white flex justify-between items-center shadow-none">
//                     <div>
//                         <h3 className="text-xl font-mono text-red-600 mb-1">{article.title.toUpperCase()}</h3>
//                         <p className="text-sm font-serif italic text-gray-600">Autor ID: {article.artistId} | {article.date}</p>
//                     </div>
//                     <div className="flex space-x-2">
//                       <AdminButton onClick={() => handleEdit(article, 'articles')} color="gray" small>EDIT</AdminButton>
//                       <AdminButton onClick={() => handleDelete(article.id, 'articles')} color="red" small>DELETE</AdminButton>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <table className="w-full text-left font-mono border-collapse border border-black">
//                 <thead className="bg-gray-200 text-black border-b-2 border-black">
//                   <tr>
//                     <th className="p-2 border-r border-black">ID</th>
//                     <th className="p-2 border-r border-black">NASLOV</th>
//                     <th className="p-2 border-r border-black">AUTOR ID</th>
//                     <th className="p-2 border-r border-black">DATUM</th>
//                     <th className="p-2">AKCIJE</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginated.map(article => (
//                     <tr key={article.id} className="border-b border-gray-300 hover:bg-gray-100 transition">
//                       <td className="p-2 border-r border-black text-red-600 font-bold">{article.id}</td>
//                       <td className="p-2 border-r border-black text-gray-800">{article.title}</td>
//                       <td className="p-2 border-r border-black text-lime-600">{article.artistId}</td>
//                       <td className="p-2 border-r border-black">{article.date}</td>
//                       <td className="p-2 flex space-x-2">
//                         <AdminButton onClick={() => handleEdit(article, 'articles')} color="gray" small>EDIT</AdminButton>
//                         <AdminButton onClick={() => handleDelete(article.id, 'articles')} color="red" small>DELETE</AdminButton>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//             <PaginationControls totalItems={filtered.length} items={paginated} entityType='articles' />
//           </>
//         ) : (
//           <div className="p-4 border-2 border-red-600 bg-gray-100 text-center font-mono">Nema članaka koji odgovaraju pretrazi.</div>
//         )}
//       </div>
//     );
//   };
  
//   // --- IZVEŠTAJI ZA STATISTIKU ---
  
//   const generateMockReport = (year: string, artistId: number, genre: string) => {
//       // Filtriranje izdanja na osnovu prosleđenih parametara
//       const filteredReleasesByParams = releases.filter(r => {
//           const matchesYear = year === '' || r.year.toString() === year;
//           const matchesArtist = artistId === 0 || r.artistId === artistId;
          
//           const artist = artists.find(a => a.id === r.artistId);
//           const matchesGenre = genre === '' || (artist && artist.genre === genre);
          
//           return matchesYear && matchesArtist && matchesGenre;
//       });

//       // 1. TOP 3 Benda u ovom setu
//       const artistSalesMap = new Map<string, number>();
      
//       filteredReleasesByParams.forEach(r => {
//           const salesValue = (Math.floor(Math.random() * 50) + 1);
//           artistSalesMap.set(r.artist, (artistSalesMap.get(r.artist) || 0) + salesValue);
//       });

//       const topBands = Array.from(artistSalesMap.entries())
//           .sort(([, a], [, b]) => b - a)
//           .slice(0, 3)
//           .map(([name, value]) => ({ name, value }));
          
//       const totalUnits = Array.from(artistSalesMap.values()).reduce((sum, v) => sum + v, 0);
//       const topValue = topBands.length > 0 ? topBands[0].value : 0;
      
//       // 2. Simulacija vremenske raspodele
//       const monthlyData = [
//           { month: 'Jan', units: Math.floor(totalUnits * 0.08) },
//           { month: 'Feb', units: Math.floor(totalUnits * 0.12) },
//           { month: 'Mar', units: Math.floor(totalUnits * 0.20) }, // Najjači mesec simulacija
//           { month: 'Apr', units: Math.floor(totalUnits * 0.15) },
//           { month: 'Maj', units: Math.floor(totalUnits * 0.10) },
//           { month: 'Jun', units: Math.floor(totalUnits * 0.10) },
//           { month: 'Jul', units: Math.floor(totalUnits * 0.05) },
//           { month: 'Avg', units: Math.floor(totalUnits * 0.05) },
//           { month: 'Sep', units: Math.floor(totalUnits * 0.05) },
//           { month: 'Okt', units: Math.floor(totalUnits * 0.05) },
//           { month: 'Nov', units: Math.floor(totalUnits * 0.05) },
//           { month: 'Dec', units: Math.floor(totalUnits * 0.10) },
//       ].sort((a, b) => b.units - a.units);


//       return {
//           totalFilteredReleases: filteredReleasesByParams.length,
//           totalUnits,
//           topBands,
//           monthlyData,
//           topValue
//       };
//   }

//   const DashboardSection: React.FC = () => {
//     // Stanje za kontrole filtera
//     const [selectedYear, setSelectedYear] = useState('');
//     const [selectedArtistId, setSelectedArtistId] = useState(0);
//     const [selectedGenre, setSelectedGenre] = useState('');
//     const [triggerReport, setTriggerReport] = useState(false); // Okidač za generisanje izveštaja

//     // Generiše opcije za select
//     const uniqueYears = useMemo(() => Array.from(new Set(releases.map(r => r.year.toString()))).sort().reverse(), [releases]);
//     const uniqueGenres = useMemo(() => Array.from(new Set(artists.map(a => a.genre))).sort(), [artists]);
    
//     // Generiše izveštaj tek kada se pritisne dugme (triggerReport)
//     const report = useMemo(() => {
//         if (!triggerReport) return null;
//         return generateMockReport(selectedYear, selectedArtistId, selectedGenre);
//     }, [releases, artists, selectedYear, selectedArtistId, selectedGenre, triggerReport]);
    
//     // Resetovanje triger-a nakon generisanja
//     React.useEffect(() => {
//         if (triggerReport) {
//             setTriggerReport(false);
//         }
//     }, [report]);


//     return (
//       <div className='space-y-4'>
//         <h2 className="text-3xl font-mono text-black border-b-4 border-red-600 pb-1 inline-block">PREGLED STATISTIKE</h2>
        
//         {/* KONTROLE ZA STATISTIKU - NOVA KONTROLNA TABLA */}
//         <div className="p-4 border-4 border-black bg-gray-100">
//             <h3 className="text-xl font-mono text-black border-b border-black pb-1 mb-4">IZABERITE PARAMETRE IZVEŠTAJA:</h3>
            
//             <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
//                 {/* Filter Godina */}
//                 <div>
//                     <label className="block text-sm font-mono text-gray-700 mb-1">GODINA:</label>
//                     <select
//                         value={selectedYear}
//                         onChange={(e) => setSelectedYear(e.target.value)}
//                         className="p-2 border border-black bg-white text-gray-800 font-mono w-full"
//                     >
//                         <option value="">SVE GODINE</option>
//                         {uniqueYears.map(year => (
//                             <option key={year} value={year}>{year}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Filter Izvođač */}
//                  <div>
//                     <label className="block text-sm font-mono text-gray-700 mb-1">IZVOĐAČ/BEND:</label>
//                     <select
//                         value={selectedArtistId}
//                         onChange={(e) => setSelectedArtistId(parseInt(e.target.value) || 0)}
//                         className="p-2 border border-black bg-white text-gray-800 font-mono w-full"
//                     >
//                         <option value={0}>SVI IZVOĐAČI</option>
//                         {allArtistOptions.map(artist => (
//                             <option key={artist.id} value={artist.id}>{artist.name.toUpperCase()}</option>
//                         ))}
//                     </select>
//                 </div>
                
//                 {/* Filter Žanr */}
//                  <div>
//                     <label className="block text-sm font-mono text-gray-700 mb-1">ŽANR:</label>
//                     <select
//                         value={selectedGenre}
//                         onChange={(e) => setSelectedGenre(e.target.value)}
//                         className="p-2 border border-black bg-white text-gray-800 font-mono w-full"
//                     >
//                         <option value="">SVI ŽANROVI</option>
//                         {uniqueGenres.map(genre => (
//                             <option key={genre} value={genre}>{genre.toUpperCase()}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Kontrola Mesečnog Pregleda (Mock) */}
//                 <div>
//                     <label className="block text-sm font-mono text-gray-700 mb-1">RASPOREĐIVANJE:</label>
//                     <select
//                         // Ova kontrola ne filtrira, već menja vizuelni prikaz u izveštaju
//                         className="p-2 border border-black bg-white text-gray-800 font-mono w-full"
//                     >
//                         <option>PRODAJA / PREGLEDI</option>
//                         <option>ANALITIKA SAJTA</option>
//                     </select>
//                 </div>
//             </div>
            
//             <div className="flex justify-end pt-4 border-t border-black">
//                 <AdminButton onClick={() => setTriggerReport(true)} color="red">
//                     GENERIŠI IZVEŠTAJ
//                 </AdminButton>
//             </div>
//         </div>

//         {/* GLAVNI GRID ZA STATISTIKU - PRIKAZ REZULTATA */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-black bg-gray-100 p-2">
            
//             {!report ? (
//                 // Inicijalna poruka
//                 <div className="p-8 border border-black bg-white col-span-full text-center">
//                     <p className="text-xl font-mono text-gray-600">
//                         {triggerReport ? "GENERISANJE IZVEŠTAJA..." : "PRITISNITE 'GENERIŠI IZVEШТАЈ' ZA PRIKAZ ANALITIKE"}
//                     </p>
//                 </div>
//             ) : (
//                 // Prikaz rezultata
//                 <>
//                     {/* Statistički Blok 1: Top Rezultat */}
//                     <div className="p-4 border border-black bg-white col-span-1 md:col-span-1">
//                         <p className="text-xs font-mono text-gray-600">TOP JEDINICA U FILTRU</p>
//                         <p className="text-3xl font-extrabold font-mono text-red-600 mt-2">{report.topBands.length > 0 ? report.topBands[0].name.toUpperCase() : 'NEMA PODATAKA'}</p>
//                         <p className="text-xl font-mono text-gray-800 mt-1">Prodaja: <span className='text-lime-600'>{report.topValue}</span></p>
//                     </div>
                    
//                     {/* Statistički Blok 2: UKUPAN OBUHVAT FILTERA */}
//                     <div className="p-4 border border-black bg-white col-span-1">
//                         <p className="text-xs font-mono text-gray-600">UKUPAN OBUHVAT FILTERA</p>
//                         <p className="text-3xl font-extrabold font-mono text-black mt-2">{report.totalFilteredReleases} IZDANJA</p>
//                         <p className="text-xl font-mono text-gray-800 mt-1">{report.totalUnits} JEDINICA</p>
//                     </div>

//                     {/* Statistički Blok 3: Najjači Mesec */}
//                     <div className="p-4 border border-black bg-white col-span-1">
//                         <p className="text-xs font-mono text-gray-600">NAJJAČI MESEC (Simulacija)</p>
//                         <p className="text-xl font-extrabold font-mono text-lime-600 mt-2">{report.monthlyData[0].month.toUpperCase()}</p>
//                         <p className="text-sm font-mono text-gray-700 mt-1">{report.monthlyData[0].units} prodatih jedinica</p>
//                     </div>
                    
//                     {/* Blok sa Detaljnim Izveštajem / Grafom (TOP BEND) */}
//                     <div className="p-4 border border-black bg-white col-span-2">
//                         <h3 className="text-xl font-mono text-black border-b border-black pb-1 mb-4">TOP 3 IZVOĐАЧА U IZVEŠTAJU</h3>
//                         {report.topBands.map((item, index) => (
//                             <div key={index} className='p-3 border-b border-gray-300'>
//                                 <p className="text-sm font-mono text-gray-600">{index + 1}. {item.name.toUpperCase()}</p>
//                                 <div className="h-4 mt-1 bg-gray-300">
//                                     <div 
//                                         className='h-full bg-lime-600'
//                                         style={{ width: `${(item.value / report.topValue) * 100}%` }}
//                                     ></div>
//                                 </div>
//                                 <p className="text-xs font-mono text-right mt-1 text-red-600">{item.value} JEDINICA</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Blok sa Mesečnim Rasponom (Graf) */}
//                     <div className="p-4 border border-black bg-white col-span-1">
//                         <h3 className="text-xl font-mono text-black border-b border-black pb-1 mb-4">MESEČNA RASPODELA (Sumirano)</h3>
//                         {report.monthlyData.slice(0, 5).map((item, index) => (
//                              <div key={index} className='flex justify-between font-mono text-sm py-1 border-b border-gray-200'>
//                                 <span className="text-gray-800">{item.month}</span>
//                                 <span className='text-red-600 font-bold'>{item.units}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}

//             {/* Blok za Listu Korisnika (Dugi blok - uvek prisutan) */}
//             <div className="p-4 border border-black bg-white col-span-full">
//                 <h3 className="text-xl font-mono text-black border-b border-black pb-1 mb-2">AKTIVNI KORISNICI (MOCK)</h3>
//                 <div className="flex justify-between font-mono text-xs text-gray-600 border-b border-gray-400 pb-1">
//                     <span>ID</span>
//                     <span>IME</span>
//                     <span>ROLA</span>
//                 </div>
//                 {MOCK_USERS.map(user => (
//                     <div key={user.id} className="flex justify-between font-mono text-sm py-1 border-b border-gray-200">
//                         <span className="text-lime-600 w-1/5">{user.id}</span>
//                         <span className="text-gray-800 w-2/5">{user.name}</span>
//                         <span className={`px-1 py-0.5 text-xs ${user.role === 'ADMIN' ? 'bg-red-600 text-white' : 'bg-gray-400 text-black'}`}>{user.role}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//       </div>
//     );
//   };


//   // --- GLAVNI MODAL ZA FORME (Artist/Release/Article) ---
  
//   const renderFormModal = () => {
//     if (!isModalOpen) return null;

//     const currentEntity = editingArtist || editingRelease || editingArticle;
//     const isNew = !currentEntity?.id || currentEntity.id > Date.now() - 1000; 
//     const entityType = editingArtist ? 'artists' : (editingRelease ? 'releases' : 'articles');

//     // Generic Input component
//     const Input: React.FC<React.PropsWithChildren<{ label: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, type?: string, options?: string[], placeholder?: string, helper?: string }>> = ({ label, value, onChange, type = 'text', options, placeholder, helper }) => (
//       <div className="mb-4">
//         <label className="block text-sm font-mono text-gray-700 mb-1">{label}</label>
//         {type === 'textarea' ? (
//           <textarea
//             value={value as string}
//             onChange={onChange}
//             placeholder={placeholder}
//             className="w-full p-2 border border-black bg-white text-gray-800 font-mono resize-none focus:border-lime-600"
//             rows={4}
//           />
//         ) : type === 'select' && options ? (
//           <select
//             value={value as string | number}
//             onChange={onChange}
//             className="w-full p-2 border border-black bg-white text-gray-800 font-mono appearance-none focus:border-lime-600"
//           >
//             {options.map(opt => (
//               <option key={opt} value={opt}>{opt.toUpperCase()}</option>
//             ))}
//           </select>
//         ) : (
//           <input
//             type={type}
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             className="w-full p-2 border border-black bg-white text-gray-800 font-mono focus:border-lime-600"
//           />
//         )}
//         {helper && <p className="text-xs font-serif text-gray-500 mt-1">{helper}</p>}
//       </div>
//     );
    
//     // RENDER FORMI
//     let formContent;

//     if (editingArtist) {
//       formContent = (
//         <form onSubmit={(e) => { e.preventDefault(); handleSave(editingArtist, 'artists'); }}>
//           <h3 className="text-3xl font-mono text-black mb-6 border-b-2 border-lime-600 pb-2">{isNew ? 'KREIRAJ NOVOG IZVOĐAČA' : `UREDI: ${editingArtist.name}`}</h3>
//           <Input label="Ime" value={editingArtist.name} onChange={(e) => setEditingArtist({...editingArtist, name: e.target.value})} placeholder="Ime izvođača" />
//           <Input label="Žanr" value={editingArtist.genre} onChange={(e) => setEditingArtist({...editingArtist, genre: e.target.value})} placeholder="Industrial Techno, Drone Ambient" />
//           <Input label="Godina Osnivanja" value={editingArtist.since} onChange={(e) => setEditingArtist({...editingArtist, since: parseInt(e.target.value) || new Date().getFullYear()})} type="number" />
//           <Input label="Članovi" value={editingArtist.members} onChange={(e) => setEditingArtist({...editingArtist, members: e.target.value})} />
//           <Input label="Poreklo" value={editingArtist.origin} onChange={(e) => setEditingArtist({...editingArtist, origin: e.target.value})} />
//           <Input label="Tagovi (odvojeni zarezom)" value={editingArtist.tags.join(', ')} onChange={(e) => setEditingArtist({...editingArtist, tags: e.target.value.split(',').map(t => t.trim())})} />
//           <Input label="Biografija" value={editingArtist.bio} onChange={(e) => setEditingArtist({...editingArtist, bio: e.target.value})} type="textarea" />
//         </form>
//       );
//     } else if (editingRelease) {
//         formContent = (
//             <form onSubmit={(e) => { e.preventDefault(); handleSave(editingRelease, 'releases'); }}>
//                 <h3 className="text-3xl font-mono text-black mb-6 border-b-2 border-lime-600 pb-2">{isNew ? 'KREIRAJ NOVO IZDANJE' : `UREDI: ${editingRelease.title}`}</h3>
                
//                 <Input 
//                     label="IZVOĐAČ (ID)" 
//                     type="select"
//                     options={allArtistOptions.map(a => String(a.id))}
//                     value={String(editingRelease.artistId)} 
//                     onChange={(e) => {
//                         const newArtistId = parseInt(e.target.value, 10);
//                         const artistName = allArtistOptions.find(a => a.id === newArtistId)?.name || 'Nepoznato';
//                         setEditingRelease({...editingRelease, artistId: newArtistId, artist: artistName});
//                     }} 
//                     helper={`Trenutno Ime: ${editingRelease.artist} (ID ${editingRelease.artistId})`}
//                 />
                
//                 <Input label="Naslov" value={editingRelease.title} onChange={(e) => setEditingRelease({...editingRelease, title: e.target.value})} placeholder="Decay Pattern, Signal Loss" />
//                 <Input label="Godina" value={editingRelease.year} onChange={(e) => setEditingRelease({...editingRelease, year: parseInt(e.target.value) || new Date().getFullYear()})} type="number" />
//                 <Input label="Format" value={editingRelease.format} type="select" options={['LP', 'EP', 'Single']} onChange={(e) => setEditingRelease({...editingRelease, format: e.target.value as 'LP' | 'EP' | 'Single'})} />
//                 <Input label="Cover URL" value={editingRelease.coverUrl} onChange={(e) => setEditingRelease({...editingRelease, coverUrl: e.target.value})} placeholder="URL slike za naslovnicu" />
//             </form>
//         );
//     } else if (editingArticle) {
//        formContent = (
//         <form onSubmit={(e) => { e.preventDefault(); handleSave(editingArticle, 'articles'); }}>
//           <h3 className="text-3xl font-mono text-black mb-6 border-b-2 border-lime-600 pb-2">{isNew ? 'KREIRAJ NOVI ČLANAK' : `UREDI: ${editingArticle.title}`}</h3>
          
//           <div className='grid grid-cols-2 gap-4'>
//             <Input label="Naslov" value={editingArticle.title} onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})} />
//             <Input label="Datum" value={editingArticle.date} onChange={(e) => setEditingArticle({...editingArticle, date: e.target.value})} type="date" />
//           </div>

//           <Input 
//             label="Autor (Artist ID)" 
//             type="select"
//             options={allArtistOptions.map(a => String(a.id))}
//             value={String(editingArticle.artistId)} 
//             onChange={(e) => setEditingArticle({...editingArticle, artistId: parseInt(e.target.value, 10)})} 
//             helper="Povezivanje članka sa izvođačem iz kataloga."
//           />
//           <Input label="Tagovi (odvojeni zarezom)" value={editingArticle.tags} onChange={(e) => setEditingArticle({...editingArticle, tags: e.target.value})} helper="Npr: techno, intervju, modular" />
//           <Input label="Snippet (Kratak opis)" value={editingArticle.snippet} onChange={(e) => setEditingArticle({...editingArticle, snippet: e.target.value})} type="textarea" />
          
//           <h4 className="text-xl font-mono text-black mt-6 mb-2 border-b border-gray-400 pb-1">SADRŽAJ ČLANKA (HTML/Markdown)</h4>
//           <textarea
//             value={editingArticle.content}
//             onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
//             className="w-full p-3 border-2 border-black bg-white text-gray-800 font-serif resize-none focus:border-lime-600"
//             rows={15}
//             placeholder="Pišite Markdown ili HTML ovde..."
//           />
//         </form>
//       );
//     }

//     const currentFormEntity = editingArtist || editingRelease || editingArticle;

//     return (
//       // Modal Overlay
//       <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
//         <div className="bg-white p-8 border-4 border-black max-w-lg w-full shadow-2xl">
          
//           {formContent}
          
//           <div className="mt-8 flex justify-end space-x-4">
//             <AdminButton onClick={() => handleSave(currentFormEntity, entityType)} color="accent" isSubmit>SAČUVAJ IZMENE</AdminButton>
//             <AdminButton onClick={() => setIsModalOpen(false)} color="gray">ODUSTANI</AdminButton>
//           </div>
//         </div>
//       </div>
//     );
//   };


//   // --- GLAVNI RENDER ZA SVE SEKCIJE ---

//   const renderContent = () => {
//     switch (currentSection) {
//       case 'dashboard': return <DashboardSection />;
//       case 'artists': return <ArtistsCrudSection />;
//       case 'releases': return <ReleasesCrudSection />;
//       case 'articles': return <ArticlesCrudSection />;
//       case 'users': return <UsersSection />;
//       case 'settings': return <div className="text-gray-800 font-mono p-4 border-2 border-black bg-white shadow-xl">PODEŠAVANJA SISTEMA: Konfiguracije se rade na nivou koda.</div>;
//       default: return <DashboardSection />;
//     }
//   };

//   return (
//     // Pozadina promenjena na svetlu SIVU
//     <section className="min-h-screen pt-20 bg-gray-300 text-gray-800">
//       {renderFormModal()}
      
//       <div className="max-w-7xl mx-auto p-4 md:p-8">
//         {/* Naslov u crnom bloku iznad (kako je na slici) */}
//         <div className="bg-black text-white p-3 mb-4 border-4 border-black shadow-xl">
//              <h1 className="text-3xl font-extrabold font-mono tracking-widest leading-none">VOID ADMIN PANEL</h1>
//              <p className="text-xs font-mono text-gray-400 mt-1">LAST UPDATED: {new Date().toLocaleDateString('en-GB')}</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           {/* Sidebar (1/4) - RAW BORDER */}
//           <div className="lg:col-span-1 border-4 border-black">
//             <Sidebar />
//           </div>
          
//           {/* Sadržaj Sekcije (3/4) - RAW BORDER */}
//           <div className="lg:col-span-3 p-6 border-4 border-black bg-white shadow-xl">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AdminPanelPage;