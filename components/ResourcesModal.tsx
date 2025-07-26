
import React from 'react';
import { RESOURCE_LINKS } from '../constants';
import { XIcon } from './IconComponents';

interface ResourcesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recursos Católicos</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <XIcon className="w-6 h-6"/>
                    </button>
                </div>
                <div className="p-6">
                    <ul className="space-y-4">
                        {RESOURCE_LINKS.map(link => (
                            <li key={link.name} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                                <a 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-lg font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    {link.name}
                                </a>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{link.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResourcesModal;
