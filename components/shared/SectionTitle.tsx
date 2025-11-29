// Naziv komponente: SectionTitle
import React from 'react';

// Reusable komponenta za brutalističke naslove sekcija
const SectionTitle: React.FC<{ title: string; color: string; skew: boolean }> = ({ title, color, skew }) => (
  <h3 className={`text-6xl font-mono font-extrabold mb-16 border-b-4 pb-2 inline-block px-4 ${color} ${skew ? 'transform -skew-x-3' : 'ml-4 md:ml-0'}`}>
    {title.toUpperCase()}
  </h3>
);

export default SectionTitle;