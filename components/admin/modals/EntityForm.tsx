// Naziv komponente: EntityForm
import React from 'react';
import { InputField } from '../../shared/InputField';
import { AdminButton } from '../../shared/AdminButton';
import { Artist, Release } from '../../../data/types';
import { EntityType } from '../../../pages/AdminPanelPage';

interface EntityFormProps {
    entity: Artist | Release | any;
    entityType: EntityType;
    allArtistOptions: { id: number, name: string }[];
    handleSave: (entity: any, type: EntityType) => void;
    setEntity: (entity: any) => void;
    setIsModalOpen: (isOpen: boolean) => void;
}

export const EntityForm: React.FC<EntityFormProps> = ({
    entity,
    entityType,
    allArtistOptions,
    handleSave,
    setEntity,
    setIsModalOpen,
}) => {
    const isNew = !entity?.id || entity.id > Date.now() - 1000;
    const isArtist = entityType === 'artists';
    const isRelease = entityType === 'releases';
    const isArticle = entityType === 'articles';
    
    // Generic Change Handler
    const handleChange = (field: string, value: any) => {
        setEntity({ ...entity, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSave(entity, entityType);
    };

    // Render Forms
    let formContent;

    if (isArtist) {
        formContent = (
            <>
                <InputField label="Ime" value={entity.name} onChange={(e) => handleChange('name', e.target.value)} />
                <InputField label="Žanr" value={entity.genre} onChange={(e) => handleChange('genre', e.target.value)} />
                <InputField label="Godina Osnivanja" value={entity.since} onChange={(e) => handleChange('since', parseInt(e.target.value) || new Date().getFullYear())} type="number" />
                <InputField label="Članovi" value={entity.members} onChange={(e) => handleChange('members', e.target.value)} />
                <InputField label="Poreklo" value={entity.origin} onChange={(e) => handleChange('origin', e.target.value)} />
                <InputField label="Tagovi (odvojeni zarezom)" value={entity.tags.join(', ')} onChange={(e) => handleChange('tags', e.target.value.split(',').map(t => t.trim()))} />
                <InputField label="Biografija" value={entity.bio} onChange={(e) => handleChange('bio', e.target.value)} type="textarea" rows={6} />
            </>
        );
    } else if (isRelease) {
        formContent = (
            <>
                <InputField 
                    label="IZVOĐAČ (ID)" 
                    type="select"
                    options={allArtistOptions.map(a => String(a.id))}
                    value={String(entity.artistId)} 
                    onChange={(e) => {
                        const newArtistId = parseInt(e.target.value, 10);
                        const artistName = allArtistOptions.find(a => a.id === newArtistId)?.name || 'Nepoznato';
                        setEntity({ ...entity, artistId: newArtistId, artist: artistName });
                    }} 
                    helper={`Trenutno Ime: ${entity.artist} (ID ${entity.artistId})`}
                />
                <InputField label="Naslov" value={entity.title} onChange={(e) => handleChange('title', e.target.value)} />
                <InputField label="Godina" value={entity.year} onChange={(e) => handleChange('year', parseInt(e.target.value) || new Date().getFullYear())} type="number" />
                <InputField label="Format" value={entity.format} type="select" options={['LP', 'EP', 'Single']} onChange={(e) => handleChange('format', e.target.value)} />
                <InputField label="Cover URL" value={entity.coverUrl} onChange={(e) => handleChange('coverUrl', e.target.value)} />
            </>
        );
    } else if (isArticle) {
        formContent = (
            <>
                <div className='grid grid-cols-2 gap-4'>
                    <InputField label="Naslov" value={entity.title} onChange={(e) => handleChange('title', e.target.value)} />
                    <InputField label="Datum" value={entity.date} onChange={(e) => handleChange('date', e.target.value)} type="date" />
                </div>
                <InputField 
                    label="Autor (Artist ID)" 
                    type="select"
                    options={allArtistOptions.map(a => String(a.id))}
                    value={String(entity.artistId)} 
                    onChange={(e) => handleChange('artistId', parseInt(e.target.value) || 0)} 
                    helper="Povezivanje članka sa izvođačem iz kataloga."
                />
                <InputField label="Tagovi (odvojeni zarezom)" value={entity.tags} onChange={(e) => handleChange('tags', e.target.value)} helper="Npr: techno, intervju, modular" />
                <InputField label="Snippet (Kratak opis)" value={entity.snippet} onChange={(e) => handleChange('snippet', e.target.value)} type="textarea" />
                
                <h4 className="text-xl font-mono text-black mt-6 mb-2 border-b border-gray-400 pb-1">SADRŽAJ ČLANKA (HTML/Markdown)</h4>
                <textarea
                    value={entity.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    className="w-full p-3 border-2 border-black bg-white text-gray-800 font-serif resize-none focus:border-lime-600"
                    rows={15}
                    placeholder="Pišite Markdown ili HTML ovde..."
                />
            </>
        );
    }

    const entityName = isArtist ? 'IZVOĐAČA' : (isRelease ? 'IZDANJE' : 'ČLANAK');

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-3xl font-mono text-black mb-6 border-b-2 border-lime-600 pb-2">{isNew ? `KREIRAJ NOVI ${entityName}` : `UREDI: ${entity.title || entity.name}`}</h3>
            
            {formContent}
            
            <div className="mt-8 flex justify-end space-x-4">
                <AdminButton onClick={() => {}} color="accent" isSubmit>SAČUVAJ IZMENE</AdminButton>
                <AdminButton onClick={() => setIsModalOpen(false)} color="gray">ODUSTANI</AdminButton>
            </div>
        </form>
    );
};