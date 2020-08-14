import nluCredentials from '../../credentials/nlu';
import * as NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

import * as fs from 'fs';
import IAnalyses from '../interfaces/analyses';

async function nluRobot(commentsAsOneString: string, createJsonFile = false): Promise<IAnalyses> {
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2018-11-16',
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
                limit: 3,
            },
            concepts: {
                limit: 3,
            },
        },
    };

    console.log('[nluRobot] Iniciando análise...');
    try {
        const analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams);

        if (createJsonFile) {
            await fs.writeFile('analyses.json', JSON.stringify(analysisResults, null, 2), () => {
                console.log("[nluRobot] Arquivo 'analyses.json' criado");
            });
        }

        console.log('[nluRobot] Finalizado com sucesso.');

        return Promise.resolve(analysisResults.result as IAnalyses);
    } catch (err) {
        console.log('[nluRobot] Finalizado com falhas.');

        return Promise.reject(err);
    }
}

export default nluRobot;
