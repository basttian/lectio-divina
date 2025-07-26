
import React from 'react';
import { MeditatioContent } from '../types';

interface MeditatioStepProps {
    meditatio: MeditatioContent | null;
    note: string;
    onNoteChange: (value: string) => void;
    isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-6">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
        ))}
    </div>
);

const ReflectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
        <h4 className="text-md font-bold text-indigo-700 dark:text-indigo-400 mb-2">{title}</h4>
        <div className="text-gray-700 dark:text-gray-300 space-y-2">{children}</div>
    </div>
);

const MeditatioStep: React.FC<MeditatioStepProps> = ({ meditatio, note, onNoteChange, isLoading }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Paso 2: Meditatio (Meditación)</h2>
                <p className="text-gray-600 dark:text-gray-400">Reflexiona sobre el pasaje. ¿Qué te está diciendo Dios a través de estas palabras? Considera las reflexiones a continuación.</p>
            </div>

            <div className="space-y-4">
                {isLoading && <LoadingSkeleton />}
                {!isLoading && meditatio && (
                    <>
                        <ReflectionCard title="Del Catecismo de la Iglesia Católica">
                            <p className="italic">{meditatio.catechism}</p>
                        </ReflectionCard>

                        <ReflectionCard title="De los Doctores de la Iglesia">
                            {meditatio.doctors.map((doc, index) => (
                                <blockquote key={index} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1">
                                    <p className="italic">"{doc.quote}"</p>
                                    <footer className="text-right text-sm font-semibold mt-1">— {doc.name}</footer>
                                </blockquote>
                            ))}
                        </ReflectionCard>

                        <ReflectionCard title="De la Catena Aurea">
                            <p className="italic">{meditatio.catenaAurea}</p>
                        </ReflectionCard>

                        <ReflectionCard title="Preguntas para guiar la meditación">
                            <ul className="list-disc list-inside space-y-1">
                                {meditatio.guidingQuestions.map((q, i) => <li key={i}>{q}</li>)}
                            </ul>
                        </ReflectionCard>
                    </>
                )}
                 {!isLoading && !meditatio && (
                    <p className="text-gray-500 dark:text-gray-400 italic">Las reflexiones aparecerán aquí.</p>
                )}
            </div>
            
            <div>
                <label htmlFor="meditatio-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notas de Meditación (tus pensamientos y reflexiones)
                </label>
                <textarea
                    id="meditatio-notes"
                    rows={4}
                    value={note}
                    onChange={(e) => onNoteChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="¿Qué resuena en tu corazón...?"
                />
            </div>
        </div>
    );
};

export default MeditatioStep;
