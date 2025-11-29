// Naziv komponente: SettingsSection
import React from 'react';

// Komponenta za PODEŠAVANJA SISTEMA
export const SettingsSection: React.FC = () => (
    <div className='p-8 border border-black bg-gray-100'>
        <h2 className='text-3xl font-mono text-black border-b-4 border-red-600 pb-1 inline-block'>PODEŠAVANJA SISTEMA</h2>
        <p className='mt-4 font-serif text-gray-700'>Ova KURCEVA sekcija je rezervisana za buduća globalna podešavanja (API ključevi, backup, teme, itd.).</p>
    </div>
);