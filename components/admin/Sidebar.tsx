// Naziv komponente: AdminSidebar
import React from 'react';

type CurrentSection = 'dashboard' | 'artists' | 'releases' | 'articles' | 'users' | 'settings';

interface SidebarProps {
    currentSection: CurrentSection;
    setCurrentSection: (section: CurrentSection) => void;
    resetPagination: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ currentSection, setCurrentSection, resetPagination }) => (
    <nav className="bg-white p-4 border-r-4 border-black shadow-none h-full">
      <h3 className="text-xl font-mono text-black mb-8 border-b-2 border-black pb-2 uppercase tracking-widest">
        ADMIN CORE
      </h3>
      <ul className="space-y-1">
        {['dashboard', 'artists', 'releases', 'articles', 'users', 'settings'].map(section => (
          <li key={section}>
            <button
              onClick={() => { setCurrentSection(section as CurrentSection); resetPagination(); }}
              className={`
                w-full text-left p-2 font-mono text-base transition duration-100 border-b border-gray-300
                ${currentSection === section 
                  ? 'bg-lime-600 text-black font-extrabold border-l-4 border-black pl-3' 
                  : 'text-gray-800 hover:bg-gray-100'}
              `}
            >
              {section.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </nav>
);