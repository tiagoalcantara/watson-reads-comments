"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function analyzeRobot(watsonAnalyses) {
    const response = `
WATSON\n\n
Parece que o vídeo escolhido está no idioma: ${watsonAnalyses.language}
De forma geral, os comentários falam sobre: \n
${getConcepts()}\n
As palavras que achei mais relevantes foram:\n
${getKeyWords()}
As principais entidades que encontrei foram:\n
${getEntities()}
    `;
    return response;
    function getConcepts() {
        let response = ``;
        watsonAnalyses.concepts.forEach((concept) => {
            response += `• ${concept.text}\n`;
        });
        return response;
    }
    function getEntities() {
        let response = ``;
        watsonAnalyses.entities.forEach((entity) => {
            let entityText = `"${entity.text}", que se categoriza como ${getEntityType(entity.type)}. - ${numberToPercentage(entity.relevance)}% de relevância.`;
            if (entity.count > 1) {
                entityText += ` (Aparece ${entity.count} vezes nos comentários.)`;
            }
            entityText += '\n';
            response += entityText;
        });
        return response;
    }
    function getEntityType(type) {
        switch (type) {
            case 'Person':
                return 'Pessoa';
            case 'Organization':
                return 'Organização';
            case 'Number':
                return 'Número';
            case 'Money':
                return 'Dinheiro';
            case 'PhoneNumber':
                return 'Número de telefone';
            case 'Measure':
                return 'Medida';
            case 'Time':
                return 'Data';
            case 'Data':
                return 'Dados';
            case 'Company':
                return 'Companhia';
            case 'Duration':
                return 'Duração';
            case 'Location':
                return 'Local';
            case 'JobTitle':
                return 'Profissão';
            default:
                return type;
        }
    }
    function getKeyWords() {
        let response = '';
        watsonAnalyses.keywords.forEach((keyword) => {
            let keyWordText = `${keyword.text} - ${numberToPercentage(keyword.relevance)}% de relevância.`;
            if (keyword.count > 1) {
                keyWordText += ` (Aparece ${keyword.count} vezes nos comentários.)`;
            }
            keyWordText += '\n';
            response += keyWordText;
        });
        return response;
    }
    function numberToPercentage(number) {
        return (number * 100).toPrecision(3);
    }
}
exports.default = analyzeRobot;
