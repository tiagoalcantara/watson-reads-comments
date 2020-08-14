import nluCredentials from '../../credentials/nlu';
import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

import * as fs from 'fs';

async function nluRobot(commentsAsOneString: string): Promise<void> {
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2019-07-12',
        authenticator: new IamAuthenticator({
            apikey: nluCredentials.API_KEY,
        }),
        url: nluCredentials.API_URL,
    });

    const analyzeParams = {
        text: commentsAsOneString,
        features: {
            entities: {
                limit: 3,
            },
            keywords: {
                limit: 5,
            },
            concepts: {
                limit: 1,
            },
        },
    };

    console.log('[nluRobot] Iniciando análise...');
    try {
        const analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams);

        await fs.writeFile('analyses.json', JSON.stringify(analysisResults, null, 2), () => {
            console.log("[nluRobot] Arquivo 'analyses.json' criado");
        });
    } catch (err) {
        console.log('[nluRobot] Erro na análise');
    }

    console.log('[nluRobot] Finalizado.');
}

export default nluRobot;
