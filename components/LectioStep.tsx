
import React, { useState } from 'react';
import { Step } from '../types';

interface LectioStepProps {
    onGetPassage: (ref: string) => void;
    onGetDailyPassage: () => void;
    passageText: string;
    note: string;
    onNoteChange: (value: string) => void;
    isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
    </div>
);

const LectioStep: React.FC<LectioStepProps> = ({ onGetPassage, onGetDailyPassage, passageText, note, onNoteChange, isLoading }) => {
    const [passageRef, setPassageRef] = useState('');

    const handleGetPassageClick = () => {
        if (passageRef.trim()) {
            onGetPassage(passageRef);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Paso 1: Lectio (Lectura)</h2>
                <p className="text-gray-600 dark:text-gray-400">Lea el pasaje lentamente, varias veces. Deje que las palabras resuenen en usted.</p>
            </div>

            <div className="space-y-4 md:flex md:space-y-0 md:space-x-4 md:items-end">
                <div className="flex-grow">
                    <label htmlFor="passage-ref" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ingresar pasaje bíblico (ej. Juan 3:16)
                    </label>
                    <input
                        type="text"
                        id="passage-ref"
                        value={passageRef}
                        onChange={(e) => setPassageRef(e.target.value)}
                        placeholder="Juan 3:16-21"
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled={isLoading}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleGetPassageClick}
                        disabled={!passageRef.trim() || isLoading}
                        className="w-full md:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        Obtener Pasaje
                    </button>
                    <span className="text-gray-500 dark:text-gray-400">o</span>
                    <button
                        onClick={onGetDailyPassage}
                        disabled={isLoading}
                        className="w-full md:w-auto inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        Lectura del Día
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg min-h-[150px]">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Texto del Pasaje</h3>
                {isLoading ? (
                    <LoadingSkeleton />
                ) : passageText ? (
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: passageText.replace(/\n/g, '<br />') }} />
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">Aquí se mostrará el pasaje bíblico.</p>
                )}
            </div>

            <div>
                <label htmlFor="lectio-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notas de Lectura (palabras o frases que te llaman la atención)
                </label>
                <textarea
                    id="lectio-notes"
                    rows={4}
                    value={note}
                    onChange={(e) => onNoteChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Escribe aquí tus reflexiones iniciales..."
                />
            </div>
        </div>
    );
};

export default LectioStep;
