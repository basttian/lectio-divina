
import React from 'react';
import { Step } from '../types';

interface NavigationProps {
    currentStep: Step;
    onBack: () => void;
    onNext: () => void;
    isLoading: boolean;
    isNextDisabled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentStep, onBack, onNext, isLoading, isNextDisabled }) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <button
                onClick={onBack}
                disabled={currentStep === Step.Lectio || isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
            >
                Atrás
            </button>
            {currentStep < Step.Contemplatio ? (
                <button
                    onClick={onNext}
                    disabled={isNextDisabled || isLoading}
                    className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
                >
                    {isLoading ? 'Cargando...' : 'Siguiente'}
                    {!isLoading && (
                        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            ) : (
                <div className="px-6 py-2 text-sm font-medium text-gray-500">
                    Fin de la Lectio
                </div>
            )}
        </div>
    );
};

export default Navigation;
