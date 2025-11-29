// Naziv komponente: AdminButton
import React from 'react';

export const AdminButton: React.FC<React.PropsWithChildren<{ 
  onClick: (e?: React.MouseEvent) => void, 
  color: 'accent' | 'red' | 'gray', 
  small?: boolean, 
  isSubmit?: boolean 
}>> = ({ onClick, children, color, small, isSubmit = false }) => {
  const colorClasses = {
    // Akcenat: Lime (žuto-zelena)
    accent: 'bg-lime-600 hover:bg-lime-700 text-black border-black', 
    red: 'bg-red-600 hover:bg-red-700 text-white border-black',
    // Siva (primarni za Edit/Delete)
    gray: 'bg-gray-300 hover:bg-gray-400 text-black border-black',
  };

  return (
    <button
      onClick={onClick as any}
      type={isSubmit ? 'submit' : 'button'}
      className={`
        ${small ? 'text-xs px-2 py-0.5' : 'text-sm px-4 py-2 w-full'}
        ${colorClasses[color]}
        font-mono border transition duration-150 shadow-none
      `}
    >
      {children}
    </button>
  );
};