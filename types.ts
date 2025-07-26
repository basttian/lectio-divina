
export enum Step {
    Lectio = 0,
    Meditatio = 1,
    Oratio = 2,
    Contemplatio = 3,
}

export interface StepConfig {
    name: string;
    description: string;
}

export interface MeditatioContent {
    catechism: string;
    doctors: {
        name: string;
        quote: string;
    }[];
    catenaAurea: string;
    guidingQuestions: string[];
}

export interface LectioData {
    passageRef: string;
    passageText: string;
    meditatio: MeditatioContent | null;
    oratioSuggestion: string;
    contemplatioQuote: string;
}
