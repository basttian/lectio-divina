
import { Step, StepConfig } from './types';
import { BookOpenIcon, LightBulbIcon, HeartIcon, SparklesIcon } from './components/IconComponents';

export const STEPS: Record<Step, StepConfig & { icon: React.FC<React.SVGProps<SVGSVGElement>> }> = {
    [Step.Lectio]: {
        name: 'Lectio',
        description: 'Lectura',
        icon: BookOpenIcon,
    },
    [Step.Meditatio]: {
        name: 'Meditatio',
        description: 'Meditación',
        icon: LightBulbIcon,
    },
    [Step.Oratio]: {
        name: 'Oratio',
        description: 'Oración',
        icon: HeartIcon,
    },
    [Step.Contemplatio]: {
        name: 'Contemplatio',
        description: 'Contemplación',
        icon: SparklesIcon,
    },
};

export const RESOURCE_LINKS = [
    { name: "Vatican.va", url: "https://www.vatican.va/content/vatican/es.html", description: "Sitio oficial de la Santa Sede." },
    { name: "Catecismo de la Iglesia Católica", url: "https://www.vatican.va/archive/catechism_sp/index_sp.html", description: "Compendio oficial de la doctrina católica." },
    { name: "USCCB (Conferencia de Obispos Católicos de EE. UU.)", url: "https://www.usccb.org/es/bible/daily-bible-reading", description: "Lecturas diarias y recursos bíblicos." },
    { name: "ACI Prensa", url: "https://www.aciprensa.com/", description: "Agencia de noticias católica en español." },
];
