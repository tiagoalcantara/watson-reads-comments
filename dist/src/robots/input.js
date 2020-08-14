"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline-sync");
function inputRobot() {
    const url = askForUrl();
    function askForUrl() {
        return readline.question('Insira a url do YouTube: ');
    }
    return url;
}
exports.default = inputRobot;
