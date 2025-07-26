
import React from 'react';
import { SunIcon, MoonIcon, RefreshIcon, CollectionIcon } from './IconComponents';

interface HeaderProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    onShowResources: () => void;
    onRestart: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, onShowResources, onRestart }) => {
    return (
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10 shadow-md transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                        Lectio Divina Interactiva
                    </h1>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={onRestart}
                            title="Reiniciar Sesión"
                            className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition"
                        >
                           <RefreshIcon className="h-5 w-5" />
                        </button>
                         <button
                            onClick={onShowResources}
                            title="Recursos"
                            className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition"
                        >
                           <CollectionIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            title={darkMode ? "Modo Claro" : "Modo Oscuro"}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition"
                        >
                            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
