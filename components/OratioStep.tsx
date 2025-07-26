
import React, { useState } from 'react';
import { getOratioSuggestion } from '../services/geminiService';

interface OratioStepProps {
    prayer: string;
    onPrayerChange: (value: string) => void;
    suggestion: string;
    passageText: string;
    note: string;
    onNoteChange: (value: string) => void;
    isLoading: boolean;
}

const OratioStep: React.FC<OratioStepProps> = ({ prayer, onPrayerChange, suggestion, passageText, note, onNoteChange, isLoading }) => {
    const [localSuggestion, setLocalSuggestion] = useState(suggestion);
    const [isFetchingSuggestion, setIsFetchingSuggestion] = useState(false);

    const handleSuggestPrayer = async () => {
        setIsFetchingSuggestion(true);
        try {
            const newSuggestion = await getOratioSuggestion(passageText);
            setLocalSuggestion(newSuggestion);
        } catch (error) {
            console.error("Error fetching prayer suggestion:", error);
            setLocalSuggestion("No se pudo generar una sugerencia. Por favor, inténtelo de nuevo.");
        } finally {
            setIsFetchingSuggestion(false);
        }
    };
    
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Paso 3: Oratio (Oración)</h2>
                <p className="text-gray-600 dark:text-gray-400">Responde a Dios con tus propias palabras. Háblale desde el corazón sobre lo que has leído y meditado.</p>
            </div>

            {localSuggestion && (
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <h4 className="text-md font-bold text-indigo-700 dark:text-indigo-400 mb-2">Sugerencia de Oración</h4>
                    {isLoading && !suggestion ? 
                        <div className="animate-pulse h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div> :
                        <p className="text-gray-700 dark:text-gray-300 italic">{localSuggestion}</p>
                    }
                </div>
            )}

            <div>
                <div className="flex justify-between items-center">
                    <label htmlFor="oratio-prayer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tu Oración Personal
                    </label>
                    <button
                        onClick={handleSuggestPrayer}
                        disabled={isFetchingSuggestion}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 disabled:opacity-50"
                    >
                        {isFetchingSuggestion ? "Generando..." : "Sugerir oración"}
                    </button>
                </div>
                <textarea
                    id="oratio-prayer"
                    rows={8}
                    value={prayer}
                    onChange={(e) => onPrayerChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Señor, te doy gracias por..."
                />
            </div>
            
            <div>
                <label htmlFor="oratio-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notas de Oración (peticiones, agradecimientos)
                </label>
                <textarea
                    id="oratio-notes"
                    rows={3}
                    value={note}
                    onChange={(e) => onNoteChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Peticiones específicas, sentimientos que surgieron..."
                />
            </div>
        </div>
    );
};

export default OratioStep;
