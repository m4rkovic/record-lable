// Naziv komponente: ReleaseItem
import React, { useState } from 'react';
import type { Release, PathName } from '../../data/types'; 

// Simulišemo Link i useNavigate hook
const Link: React.FC<React.PropsWithChildren<{ to: PathName, className?: string, onClick?: (e: React.MouseEvent) => void, children: React.ReactNode }>> = ({ to, children, className, onClick }) => (
  <a href={`#${to}`} className={className} onClick={onClick}>{children}</a> 
);
const useNavigate = () => {
    return (path: PathName) => {
        window.location.hash = path;
    };
};


// Proširenje Release interfejsa za coverUrl i colorClass
interface ExtendedRelease extends Release {
  coverUrl: string;
  colorClass: string;
}

// Brutalist Placeholder za slike
const BrokenImagePlaceholder: React.FC = () => (
    <div className="flex items-center justify-center w-full h-full bg-gray-600 text-white font-mono text-xs p-2">
        <span className="text-center transform rotate-1 skew-x-1">ERR: SIGNAL LOSS</span>
    </div>
);

// Kartica za prikaz pojedinačnog izdanja (za grid)
const ReleaseItem: React.FC<{ release: ExtendedRelease }> = ({ release }) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleCardClick = () => {
        navigate(`/izdanja/${release.id}` as PathName);
    };

    return (
        <div
            onClick={handleCardClick}
            className={`
                flex flex-col border-4 border-white shadow-lg transition duration-300 transform 
                hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/50 
                group cursor-pointer block
                ${release.colorClass} 
            `}
        >
            {/* Sekcija Slike/Covera */}
            <div className="aspect-square w-full overflow-hidden relative border-b-4 border-white">
                
                {(!imageLoaded || imageError) && <BrokenImagePlaceholder />}
                
                <img 
                    src={release.coverUrl} 
                    alt={`Cover art for ${release.title}`} 
                    className={`w-full h-full object-cover transition duration-500 group-hover:scale-[1.05] ${imageLoaded && !imageError ? 'block' : 'hidden'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                />
                
                {/* Hover overlay za brutalistički efekat */}
                <div className="absolute inset-0 bg-black opacity-0 transition duration-300 group-hover:opacity-20"></div>
            </div>
            
            {/* Sekcija Detalja */}
            <div className="p-4 flex flex-col justify-between font-mono text-white">
                <Link 
                    to={`/izvodjaci/${release.artistId}` as PathName} 
                    className="text-sm tracking-wider opacity-80 hover:text-red-600 transition"
                    onClick={(e) => { e.stopPropagation(); }} 
                >
                    {release.artist.toUpperCase()}
                </Link>
                
                <h4 className="text-2xl font-bold truncate mt-1 leading-tight">{release.title.toUpperCase()}</h4>
                
                <div className="mt-4 flex justify-between items-center border-t-2 border-white pt-2">
                    <span className="inline-block px-2 py-0.5 text-xs bg-yellow-400 text-black font-extrabold">
                        {release.format}
                    </span>
                    <span className="text-xl font-bold text-yellow-400">{release.year}</span>
                </div>
            </div>
        </div>
    );
};

export default ReleaseItem;