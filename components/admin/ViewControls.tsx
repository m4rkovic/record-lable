// Naziv komponente: ViewControls
import React from 'react';
import { AdminButton } from '../shared/AdminButton';
import { EntityType, ViewMode } from '../../pages/AdminPanelPage'; // Uvoz tipa iz roditeljske komponente
import { MOCK_ARTISTS, MOCK_RELEASES, MOCK_ARTICLES } from '../../data/mockData';

interface ViewControlsProps {
    entityType: EntityType;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    handleCreateNew: (type: EntityType) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setCurrentPage: (page: number) => void;
}

export const ViewControls: React.FC<ViewControlsProps> = ({
    entityType,
    viewMode,
    setViewMode,
    handleCreateNew,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
}) => {
    const dataCount = {
        artists: MOCK_ARTISTS.length,
        releases: MOCK_RELEASES.length,
        articles: MOCK_ARTICLES.length,
    }[entityType];

    const entityTitles = {
        artists: 'IZVOĐAČI',
        releases: 'IZDANJA',
        articles: 'ČLANCI',
    };
    
    // Search input sa FIX logikom
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetuj na prvu stranicu pri pretrazi
    };

    // Premeštam Search Input u zasebnu komponentu za FIX fokus
    const SearchInput: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }> = React.memo(({ value, onChange, placeholder }) => (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            // FIX: Dodata funkcija koja se poziva da se re-selektuje element (vrati fokus)
            onBlur={(e) => { e.target.focus(); }}
            className="w-full p-2 border-2 border-black bg-white text-gray-800 font-mono focus:border-lime-600"
        />
    ));


    return (
        <div className='space-y-4'>
            <div className="flex justify-between items-center border-b-4 border-black pb-2">
                <h2 className="text-3xl font-mono text-black">{entityTitles[entityType]} ({dataCount})</h2>
                <div className='flex space-x-4 items-center'>
                    <div className='flex space-x-2 border border-black p-1 bg-gray-100'>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-3 py-1 text-sm font-mono border border-black transition ${viewMode === 'grid' ? 'bg-lime-600 text-black' : 'bg-white text-gray-800 hover:bg-gray-300'}`}
                        >
                            GRID
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1 text-sm font-mono border border-black transition ${viewMode === 'list' ? 'bg-lime-600 text-black' : 'bg-white text-gray-800 hover:bg-gray-300'}`}
                        >
                            LIST
                        </button>
                    </div>
                    <div className='w-32'>
                        <AdminButton onClick={() => handleCreateNew(entityType)} color="accent">+ NOVI</AdminButton>
                    </div>
                </div>
            </div>
            
            {/* Kontrola Pretrage */}
            <SearchInput
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={`PRETRAŽI (${entityType.toUpperCase()})...`}
            />
        </div>
    );
};