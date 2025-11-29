// Naziv komponente: FilterControls
import React from 'react';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  filterOptions: string[]; // Npr. ['LP', 'EP', 'Single'] ili 'Industrial Techno', 'Experimental Jazz', itd.
  placeholder: string; // Placeholder za search input
  filterLabel: string; // Labela za select dropdown
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  filterOptions,
  placeholder,
  filterLabel,
}) => {
  return (
    <div className="p-6 border-4 border-white bg-gray-800 shadow-xl mb-12 transform -skew-y-1">
      
      {/* Search Input (Brutalist Style) */}
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border-2 border-red-600 bg-black text-yellow-400 font-mono text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
      />

      {/* Filter Dropdown (Brutalist Style) */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-mono text-yellow-400 uppercase min-w-[100px]">{filterLabel}:</label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="flex-grow p-3 border-2 border-red-600 bg-black text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none bg-no-repeat bg-[length:1.2rem] bg-[position:right_0.5rem_center] bg-arrow-down"
          style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"white\"><path fill-rule=\"evenodd\" d=\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\" clip-rule=\"evenodd\" /></svg>')" }}
        >
          <option value="">SVI</option>
          {filterOptions.map((option) => (
            <option key={option} value={option}>{option.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <style jsx global>{`
        /* Hack za stilizovanje strelice u select elementu u brutalističkom stilu */
        .bg-arrow-down {
          /* Tailwind ne podržava custom SVG pozadine direktno, stoga koristimo inline style */
        }
      `}</style>
    </div>
  );
};

export default FilterControls;