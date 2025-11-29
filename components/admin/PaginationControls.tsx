// Naziv komponente: PaginationControls
import React from 'react';
import { AdminButton } from '../shared/AdminButton'; // Koristi AdminButton
import { EntityType, ViewMode } from '../../pages/AdminPanelPage'; // Uvoz tipova

interface PaginationControlsProps {
    totalItems: number; // Ukupan broj stavki pre filtriranja
    filteredLength: number; // Broj stavki nakon filtriranja
    itemsPerPage: number;
    setItemsPerPage: (num: number) => void;
    currentPage: number;
    setCurrentPage: (num: number | ((prev: number) => number)) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ 
    totalItems, 
    itemsPerPage, 
    setItemsPerPage, 
    currentPage, 
    setCurrentPage, 
    filteredLength 
}) => {
    const totalPages = Math.ceil(filteredLength / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const perPageOptions = [5, 10, 25, 50]; 

    return (
      <div className="flex justify-between items-center mt-4 border-t border-black pt-3">
        {/* Kontrola Broja Stranica po View-u */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-mono text-gray-700">Prikaži:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1); // Resetuj na prvu stranicu pri promeni veličine
            }}
            className="p-1 border border-black bg-white text-sm font-mono focus:border-lime-600 appearance-none"
          >
            {perPageOptions.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span className="text-sm font-mono text-gray-700">({filteredLength} filtrirano / {totalItems} ukupno)</span>
        </div>

        {/* Kontrola Paginacije */}
        <div className="flex space-x-1">
          <AdminButton onClick={() => setCurrentPage(1)} color="gray" small>{'|<'}</AdminButton>
          <AdminButton onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} color="gray" small>{'<'}</AdminButton>
          
          <div className='flex space-x-1'>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-2 py-0.5 text-sm font-mono border border-black transition ${number === currentPage ? 'bg-black text-lime-600' : 'bg-white text-gray-800 hover:bg-gray-300'}`}
              >
                {number}
              </button>
            )).slice(currentPage > 3 ? currentPage - 3 : 0, currentPage + 2)} {/* Prikazuje do 5 brojeva stranica oko trenutne */}
          </div>
          
          <AdminButton onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} color="gray" small>{'>'}</AdminButton>
          <AdminButton onClick={() => setCurrentPage(totalPages)} color="gray" small>{'>|'}</AdminButton>
        </div>
      </div>
    );
};