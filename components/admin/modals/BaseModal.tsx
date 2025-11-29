// Naziv komponente: BaseModal
import React from 'react';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        // Modal Overlay
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 border-4 border-black max-w-lg w-full shadow-2xl">
                {children}
            </div>
        </div>
    );
};