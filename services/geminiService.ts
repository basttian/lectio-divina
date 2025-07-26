
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { MeditatioContent } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

// Helper to safely parse JSON
const parseJsonResponse = <T,>(text: string, fallback: T): T => {
    try {
        // Find the start and end of the JSON block
        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}');
        if (startIndex === -1 || endIndex === -1) {
            throw new Error("No JSON object found in the response.");
        }
        const jsonString = text.substring(startIndex, endIndex + 1);
        return JSON.parse(jsonString) as T;
    } catch (error) {
        console.error("Error parsing JSON response:", error);
        console.error("Original text:", text);
        return fallback;
    }
}

export const getBiblePassage = async (passageRef: string): Promise<string> => {
    const prompt = `Por favor, proporciona el texto completo del pasaje bíblico "${passageRef}" según la versión de la Biblia de Jerusalén o la Nueva Biblia Americana (NABRE). La respuesta debe contener únicamente el texto del pasaje, con la referencia en la primera línea.`;
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt
    });
    return response.text;
};

export const getDailyPassage = async (): Promise<string> => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const prompt = `Por favor, proporciona la lectura del Evangelio para hoy, ${today}, según el calendario litúrgico católico romano. La respuesta debe contener únicamente el texto del pasaje, con la referencia y el título del Evangelio del día en la primera línea. Utiliza la versión de la Biblia de Jerusalén o la Nueva Biblia Americana (NABRE).`;
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt
    });
    return response.text;
};

export const getMeditatioReflections = async (passageText: string): Promise<MeditatioContent> => {
    const response = await ai.models.generateContent({
        model,
        contents: `Analiza el siguiente pasaje bíblico para una Lectio Divina católica:\n\n---\n${passageText}\n---\n\nGenera una respuesta JSON con reflexiones de fuentes católicas autorizadas. La respuesta debe seguir este esquema:`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    catechism: {
                        type: Type.STRING,
                        description: "Una reflexión que conecte el pasaje con un párrafo relevante del Catecismo de la Iglesia Católica. Cita el número del párrafo."
                    },
                    doctors: {
                        type: Type.ARRAY,
                        description: "Dos citas o reflexiones breves de Doctores de la Iglesia (como San Agustín, Santa Teresa de Ávila, San Juan de la Cruz, etc.) sobre este pasaje.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Nombre del Doctor de la Iglesia." },
                                quote: { type: Type.STRING, description: "La cita o reflexión." }
                            }
                        }
                    },
                    catenaAurea: {
                        type: Type.STRING,
                        description: "Una breve reflexión inspirada en la Catena Aurea de Santo Tomás de Aquino, citando a un Padre de la Iglesia relevante para este pasaje."
                    },
                    guidingQuestions: {
                        type: Type.ARRAY,
                        description: "Tres preguntas guiadas para la meditación personal sobre el pasaje (ej. '¿Qué me dice Dios aquí?', '¿Cómo se aplica esto a mi vida?').",
                        items: {
                            type: Type.STRING
                        }
                    }
                },
                required: ["catechism", "doctors", "catenaAurea", "guidingQuestions"]
            }
        }
    });

    return parseJsonResponse<MeditatioContent>(response.text, {
        catechism: "No se pudo generar la reflexión del Catecismo.",
        doctors: [{ name: "Error", quote: "No se pudieron generar las reflexiones de los Doctores." }],
        catenaAurea: "No se pudo generar la reflexión de la Catena Aurea.",
        guidingQuestions: ["Intente reflexionar sobre el pasaje usted mismo."]
    });
};

export const getOratioSuggestion = async (passageText: string): Promise<string> => {
    const prompt = `Basado en el siguiente pasaje bíblico:\n\n---\n${passageText}\n---\n\nEscribe una oración modelo breve (3-4 frases) para la etapa de Oratio en la Lectio Divina. La oración debe ser personal, dirigida a Dios, e inspirada directamente por los temas y sentimientos del pasaje.`;
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt
    });
    return response.text;
};

export const getContemplatioQuote = async (): Promise<string> => {
    const prompt = `Proporciona una única cita inspiradora y breve (1-2 frases) de un místico católico (como San Juan de la Cruz, Santa Teresa de Ávila, Santa Teresita de Lisieux) que invite al silencio y la contemplación de Dios. La respuesta debe ser solo la cita y el nombre del santo.`;
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text;
};
