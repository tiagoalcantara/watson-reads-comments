interface IAnalyses {
    usage: { text_characters: number; features: number; text_units: number };
    language: string;
    keywords: { text: string; relevance: number; count: number }[];
    entities: { type: string; text: string; relevance: number; count: number }[];
    concepts: { text: string; relevante: number }[];
}

export default IAnalyses;
