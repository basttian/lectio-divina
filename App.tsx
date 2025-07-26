
import React, { useState, useCallback, useEffect } from 'react';
import { getBiblePassage, getDailyPassage, getMeditatioReflections, getOratioSuggestion, getContemplatioQuote } from './services/geminiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Step, LectioData } from './types';
import { STEPS } from './constants';
import Header from './components/Header';
import Stepper from './components/Stepper';
import LectioStep from './components/LectioStep';
import MeditatioStep from './components/MeditatioStep';
import OratioStep from './components/OratioStep';
import ContemplatioStep from './components/ContemplatioStep';
import Navigation from './components/Navigation';
import ResourcesModal from './components/ResourcesModal';

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>('lectio-divina-dark-mode', false);
    const [currentStep, setCurrentStep] = useLocalStorage<Step>('lectio-divina-current-step', Step.Lectio);
    const [lectioData, setLectioData] = useLocalStorage<LectioData>('lectio-divina-data', {
        passageRef: '',
        passageText: '',
        meditatio: null,
        oratioSuggestion: '',
        contemplatioQuote: ''
    });
    const [notes, setNotes] = useLocalStorage<Record<Step, string>>('lectio-divina-notes', {
        [Step.Lectio]: '',
        [Step.Meditatio]: '',
        [Step.Oratio]: '',
        [Step.Contemplatio]: ''
    });
    const [prayer, setPrayer] = useLocalStorage<string>('lectio-divina-prayer', '');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showResources, setShowResources] = useState<boolean>(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    const handleNoteChange = (step: Step, value: string) => {
        setNotes(prev => ({ ...prev, [step]: value }));
    };

    const resetError = () => setError(null);

    const fetchAndSetPassage = useCallback(async (passageGetter: () => Promise<string>) => {
        setIsLoading(true);
        resetError();
        try {
            const passage = await passageGetter();
            const passageRef = passage.split('\n')[0]; // Assume first line is reference
            setLectioData({
                passageRef: passageRef,
                passageText: passage,
                meditatio: null,
                oratioSuggestion: '',
                contemplatioQuote: ''
            });
            setCurrentStep(Step.Lectio);
        } catch (e) {
            console.error(e);
            setError('No se pudo obtener el pasaje. Por favor, inténtelo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    }, [setLectioData, setCurrentStep]);

    const handleGetPassage = (ref: string) => fetchAndSetPassage(() => getBiblePassage(ref));
    const handleGetDailyPassage = () => fetchAndSetPassage(getDailyPassage);

    const handleNext = useCallback(async () => {
        if (currentStep === Step.Contemplatio) return;
        const nextStep = currentStep + 1;
        setIsLoading(true);
        resetError();
        try {
            if (nextStep === Step.Meditatio && !lectioData.meditatio) {
                const meditatioContent = await getMeditatioReflections(lectioData.passageText);
                setLectioData(prev => ({ ...prev, meditatio: meditatioContent }));
            }
            if (nextStep === Step.Oratio && !lectioData.oratioSuggestion) {
                 const oratioSugg = await getOratioSuggestion(lectioData.passageText);
                 setLectioData(prev => ({ ...prev, oratioSuggestion: oratioSugg }));
            }
            if (nextStep === Step.Contemplatio && !lectioData.contemplatioQuote) {
                const quote = await getContemplatioQuote();
                setLectioData(prev => ({ ...prev, contemplatioQuote: quote }));
            }
            setCurrentStep(nextStep);
        } catch (e) {
            console.error(e);
            setError(`Error al preparar la etapa de ${STEPS[nextStep].name}. Por favor, intente de nuevo.`);
        } finally {
            setIsLoading(false);
        }
    }, [currentStep, lectioData, setLectioData, setCurrentStep]);

    const handleBack = () => {
        if (currentStep > Step.Lectio) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const restart = () => {
        if(window.confirm('¿Estás seguro de que quieres reiniciar? Se borrará todo tu progreso actual.')) {
            setLectioData({ passageRef: '', passageText: '', meditatio: null, oratioSuggestion: '', contemplatioQuote: '' });
            setNotes({ [Step.Lectio]: '', [Step.Meditatio]: '', [Step.Oratio]: '', [Step.Contemplatio]: '' });
            setPrayer('');
            setCurrentStep(Step.Lectio);
            setError(null);
        }
    };
    
    const renderStepContent = () => {
        switch (currentStep) {
            case Step.Lectio:
                return <LectioStep 
                            onGetPassage={handleGetPassage} 
                            onGetDailyPassage={handleGetDailyPassage}
                            passageText={lectioData.passageText}
                            note={notes[Step.Lectio]}
                            onNoteChange={(val) => handleNoteChange(Step.Lectio, val)}
                            isLoading={isLoading}
                        />;
            case Step.Meditatio:
                return <MeditatioStep 
                            meditatio={lectioData.meditatio}
                            note={notes[Step.Meditatio]}
                            onNoteChange={(val) => handleNoteChange(Step.Meditatio, val)}
                            isLoading={isLoading}
                        />;
            case Step.Oratio:
                return <OratioStep 
                            prayer={prayer}
                            onPrayerChange={setPrayer}
                            suggestion={lectioData.oratioSuggestion}
                            passageText={lectioData.passageText}
                            note={notes[Step.Oratio]}
                            onNoteChange={(val) => handleNoteChange(Step.Oratio, val)}
                            isLoading={isLoading}
                        />;
            case Step.Contemplatio:
                return <ContemplatioStep 
                            quote={lectioData.contemplatioQuote}
                            note={notes[Step.Contemplatio]}
                            onNoteChange={(val) => handleNoteChange(Step.Contemplatio, val)}
                        />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-serif transition-colors duration-300">
            <Header 
                darkMode={darkMode} 
                toggleDarkMode={() => setDarkMode(!darkMode)} 
                onShowResources={() => setShowResources(true)}
                onRestart={restart}
            />
            <main className="container mx-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
                    <div className="p-6 md:p-8">
                        <Stepper currentStep={currentStep} steps={STEPS} />
                    </div>
                    
                    <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
                                <p className="font-bold">Error</p>
                                <p>{error}</p>
                                <button onClick={resetError} className="mt-2 text-sm font-semibold hover:underline">Descartar</button>
                            </div>
                        )}
                        <div className="step-content">
                            {renderStepContent()}
                        </div>
                    </div>

                    <Navigation 
                        currentStep={currentStep}
                        onBack={handleBack}
                        onNext={handleNext}
                        isLoading={isLoading}
                        isNextDisabled={currentStep === Step.Lectio && !lectioData.passageText}
                    />
                </div>
            </main>
            <ResourcesModal isOpen={showResources} onClose={() => setShowResources(false)} />
        </div>
    );
};

export default App;
