// Naziv komponente: Error404
import React from 'react';
import { SectionTitle } from '../components/shared/SectionTitle'; // Pretpostavljeni uvoz

// Simulišemo Link komponentu iz react-router-dom
const Link: React.FC<React.PropsWithChildren<{ to: string, className?: string }>> = ({ to, children, className }) => (
  <a href={`#${to}`} className={className}>{children}</a> 
);

const Error404: React.FC = () => (
  <section className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-900 text-white p-4">
    <div className="p-12 border-4 border-red-600 bg-black text-center shadow-2xl transform skew-y-1">
        <h1 className="text-9xl font-extrabold font-mono text-red-600 mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-mono text-yellow-400 mb-6">RUTA NIJE PRONAĐENA</h2>
        <p className="text-xl font-serif text-gray-400 mb-8">
          Zahtevana frekvencija ne postoji u našem spektru.
        </p>
        <Link to="/" className="inline-block px-6 py-3 bg-red-600 text-white font-mono text-lg border-2 border-white hover:bg-yellow-400 hover:text-black transition duration-300">
            NAZAD NA POČETNU
        </Link>
    </div>
  </section>
);

export default Error404;