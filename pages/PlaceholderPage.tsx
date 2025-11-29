// Naziv komponente: PlaceholderPage
import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
// U pravom projektu: import { Link } from 'react-router-dom';
const Link: React.FC<React.PropsWithChildren<{ to: string }>> = ({ to, children }) => (
  <a href={`#${to}`}>{children}</a> 
);

// Generička stranica za rute koje još nisu implementirane
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <section className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-900 text-white p-4">
    <SectionTitle title={title} color="border-red-600 bg-yellow-400 text-black" skew={true} />
    <p className="text-xl font-serif text-gray-400 mb-8">Ova stranica je u izradi. Brutalizam zahteva strpljenje.</p>
    <Link to="/">
      <button 
        className="px-6 py-3 bg-red-600 text-white font-mono text-lg border-2 border-white hover:bg-yellow-400 hover:text-black transition duration-300"
      >
        NAZAD NA POČETNU
      </button>
    </Link>
  </section>
);

export default PlaceholderPage;