
import React from 'react';

interface ContemplatioStepProps {
    quote: string;
    note: string;
    onNoteChange: (value: string) => void;
}

const ContemplatioStep: React.FC<ContemplatioStepProps> = ({ quote, note, onNoteChange }) => {
    return (
        <div className="space-y-6 flex flex-col items-center text-center">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Paso 4: Contemplatio (Contemplación)</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Simplemente descansa en la presencia de Dios. No se necesitan palabras. Escucha en el silencio de tu corazón.</p>
            </div>
            
            <div className="w-full max-w-2xl my-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-inner">
                {quote ? (
                    <blockquote className="text-center">
                        <p className="text-xl italic text-gray-700 dark:text-gray-300">"{quote.split('"')[1]}"</p>
                        <footer className="mt-4 text-md font-semibold text-gray-600 dark:text-gray-400">— {quote.split('—')[1]?.trim()}</footer>
                    </blockquote>
                ) : (
                     <div className="animate-pulse h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                )}
            </div>

            <div className="w-full max-w-2xl">
                <label htmlFor="contemplatio-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                    Notas de Contemplación (inspiraciones, mociones interiores)
                </label>
                <textarea
                    id="contemplatio-notes"
                    rows={3}
                    value={note}
                    onChange={(e) => onNoteChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-left"
                    placeholder="Cualquier pensamiento o sentimiento final..."
                />
            </div>
        </div>
    );
};

export default ContemplatioStep;
