
import React from 'react';
import { Step, StepConfig } from '../types';

interface StepperProps {
    currentStep: Step;
    steps: Record<Step, StepConfig & { icon: React.FC<React.SVGProps<SVGSVGElement>> }>;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
    return (
        <nav aria-label="Progreso">
            <ol role="list" className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-8 items-center justify-between">
                {Object.values(steps).map((step, index) => {
                    const isCompleted = currentStep > index;
                    const isCurrent = currentStep === index;
                    const Icon = step.icon;

                    return (
                        <li key={step.name} className="flex-1 w-full sm:w-auto">
                            <div className="flex items-center space-x-2.5">
                                <span className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                                    isCompleted ? 'bg-indigo-600' : 
                                    isCurrent ? 'bg-indigo-600 ring-4 ring-indigo-300 dark:ring-indigo-500/50' : 
                                    'bg-gray-300 dark:bg-gray-600'
                                }`}>
                                    <Icon className={`w-6 h-6 ${isCompleted || isCurrent ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                                </span>
                                <div className="text-left">
                                    <p className={`text-sm font-semibold ${isCompleted || isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {step.name}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{step.description}</p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Stepper;
