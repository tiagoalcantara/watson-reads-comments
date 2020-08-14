"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nlu_1 = require("../../credentials/nlu");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const auth_1 = require("ibm-watson/auth");
const fs = require("fs");
async function nluRobot(commentsAsOneString, createJsonFile = false) {
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2018-11-16',
        authenticator: new auth_1.IamAuthenticator({
            apikey: nlu_1.default.API_KEY,
        }),
        url: nlu_1.default.API_URL,
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
        return Promise.resolve(analysisResults.result);
    }
    catch (err) {
        console.log('[nluRobot] Finalizado com falhas.');
        return Promise.reject(err);
    }
}
exports.default = nluRobot;
