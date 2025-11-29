// Naziv komponente: CrudSectionTemplate
import React from 'react';
import { AdminButton } from '../../shared/AdminButton';
import { ViewControls } from '../ViewControls';
import { PaginationControls } from '../PaginationControls';
import { EntityType, ViewMode } from '../../../context/DataContext'; // Uvoz iz DataContext
import { useData } from '../../../context/DataContext';

interface CrudSectionTemplateProps {
    title: string;
    dataCount: number;
    paginated: any[];
    filteredLength: number;
    entityType: EntityType;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    searchTerm: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCreateNew: (type: EntityType) => void;
    handleEdit: (item: any, type: EntityType) => void;
    handleDelete: (id: number, type: EntityType) => void;
    itemsPerPage: number;
    setItemsPerPage: (num: number) => void;
    currentPage: number;
    setCurrentPage: (num: number) => void;
    setSearchTerm: (term: string) => void; 
}

export const CrudSectionTemplate: React.FC<CrudSectionTemplateProps> = ({
    title, dataCount, paginated, filteredLength, entityType, viewMode, setViewMode, searchTerm, handleSearchChange, handleCreateNew, handleEdit, handleDelete, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, setSearchTerm
}) => {
    
    // --- POMOĆNE FUNKCIJE ZA RENDEROVANJE ---
    
    const renderTableHeaders = () => {
      if (entityType === 'artists') return ['ID', 'IME', 'ŽANR', 'AKCIJE'];
      if (entityType === 'releases') return ['COVER', 'NASLOV', 'AUTOR', 'FORMAT', 'AKCIJE'];
      if (entityType === 'articles') return ['ID', 'NASLOV', 'AUTOR ID', 'DATUM', 'AKCIJE'];
      return [];
    };

    const renderTableRow = (item: any) => {
        const ArtistRow = () => (<><td className="p-2 border-r border-black text-red-600 font-bold">{item.id}</td><td className="p-2 border-r border-black text-gray-800">{item.name}</td><td className="p-2 border-r border-black text-lime-600">{item.genre}</td></>);
        const ReleaseRow = () => (<><td className="p-2 border-r border-black w-12"><img src={item.coverUrl} alt={item.title} className="w-8 h-8 object-cover border border-black" /></td><td className="p-2 border-r border-black text-gray-800">{item.title}</td><td className="p-2 border-r border-black text-lime-600">{item.artist}</td><td className="p-2 border-r border-black">{item.format}</td></>);
        const ArticleRow = () => (<><td className="p-2 border-r border-black text-red-600 font-bold">{item.id}</td><td className="p-2 border-r border-black text-gray-800">{item.title}</td><td className="p-2 border-r border-black text-lime-600">{item.artistId}</td><td className="p-2 border-r border-black">{item.date}</td></>);

        return (
            <tr key={item.id} className="border-b border-black odd:bg-gray-100 even:bg-white hover:bg-lime-100 transition">
                {(entityType === 'artists' && <ArtistRow />)}
                {(entityType === 'releases' && <ReleaseRow />)}
                {(entityType === 'articles' && <ArticleRow />)}
                <td className="p-2 flex space-x-2">
                    <AdminButton onClick={() => handleEdit(item, entityType)} color="gray" small>EDIT</AdminButton>
                    <AdminButton onClick={() => handleDelete(item.id, entityType)} color="red" small>DELETE</AdminButton>
                </td>
            </tr>
        );
      };
      
      const renderGridItem = (item: any) => {
        if (entityType === 'artists') return (
            <div key={item.id} className="p-3 border border-black bg-white shadow-none">
                <h3 className="text-xl font-mono text-black mb-1">{item.name.toUpperCase()}</h3>
                <p className="text-sm font-serif italic text-gray-600 mb-3">{item.genre} | Od {item.since}</p>
                <div className="flex space-x-2 mt-4">
                    <AdminButton onClick={() => handleEdit(item, entityType)} color="gray" small>EDIT</AdminButton>
                    <AdminButton onClick={() => handleDelete(item.id, entityType)} color="red" small>DELETE</AdminButton>
                </div>
            </div>
        );
        if (entityType === 'releases') return (
            <div key={item.id} className="border border-black bg-white shadow-none">
                <img src={item.coverUrl} alt={item.title} className="w-full h-auto border-b border-black" />
                <div className='p-2'>
                    <h3 className="text-sm font-mono text-gray-800 truncate leading-tight">{item.title}</h3>
                    <p className="text-xs font-serif italic text-lime-600 mt-0.5">{item.artist}</p>
                </div>
                <div className="flex justify-between p-2 border-t border-black">
                    <AdminButton onClick={() => handleEdit(item, entityType)} color="gray" small>EDIT</AdminButton>
                    <AdminButton onClick={() => handleDelete(item.id, entityType)} color="red" small>DELETE</AdminButton>
                </div>
            </div>
        );
        if (entityType === 'articles') return (
            <div key={item.id} className="p-3 border border-black bg-white flex justify-between items-center shadow-none">
                <div>
                    <h3 className="text-xl font-mono text-red-600 mb-1">{item.title.toUpperCase()}</h3>
                    <p className="text-sm font-serif italic text-gray-600">Autor ID: {item.artistId} | {item.date}</p>
                </div>
                <div className="flex space-x-2">
                    <AdminButton onClick={() => handleEdit(item, entityType)} color="gray" small>EDIT</AdminButton>
                    <AdminButton onClick={() => handleDelete(item.id, entityType)} color="red" small>DELETE</AdminButton>
                </div>
            </div>
        );
      };


    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b-4 border-black pb-2">
                <h2 className="text-3xl font-mono text-black">{title} ({dataCount})</h2>
                <div className='flex space-x-4 items-center'>
                    <ViewControls 
                        entityType={entityType} 
                        viewMode={viewMode} 
                        setViewMode={setViewMode} 
                        handleCreateNew={handleCreateNew} 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                        setCurrentPage={setCurrentPage} 
                    />
                </div>
            </div>
            
            {/* Search Input (Mora da bude ovde za stabilan fokus) */}
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearchChange} 
                placeholder={`PRETRAŽI (${title})...`} 
                className="w-full p-2 border-2 border-black bg-white text-gray-800 font-mono focus:border-lime-600" 
            />

            {filteredLength > 0 ? (
                <>
                    {viewMode === 'grid' ? (
                        <div className={`
                            border border-black p-2 bg-gray-100
                            ${entityType === 'articles' ? 'space-y-2' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'}
                        `}>
                            {paginated.map(renderGridItem)}
                        </div>
                    ) : (
                        <table className="w-full text-left font-mono border-collapse border border-black">
                            <thead className="bg-gray-200 text-black border-b-2 border-black">
                                <tr>
                                    {renderTableHeaders().map(header => <th key={header} className="p-2 border-r border-black">{header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(renderTableRow)}
                            </tbody>
                        </table>
                    )}
                    <PaginationControls totalItems={dataCount} filteredLength={filteredLength} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
            ) : (
                <div className="p-4 border-2 border-red-600 bg-gray-100 text-center font-mono">Nema entiteta koji odgovaraju pretrazi.</div>
            )}
        </div>
    );
};