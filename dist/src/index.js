"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrapper_1 = require("./robots/scrapper");
const nlu_1 = require("./robots/nlu");
const input_1 = require("./robots/input");
const analyze_1 = require("./robots/analyze");
async function start() {
    const youtubeUrl = input_1.default();
    try {
        const commentsAsOneString = await scrapper_1.default(youtubeUrl);
        const analysesResult = await nlu_1.default(commentsAsOneString);
        const textOutput = analyze_1.default(analysesResult);
        console.log(textOutput);
    }
    catch (err) {
        console.log(err);
    }
}
start();
