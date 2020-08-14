import * as readline from 'readline-sync';

function inputRobot(): string {
    const url = askForUrl();

    function askForUrl() {
        return readline.question('Insira a url do YouTube: ');
    }

    return url;
}

export default inputRobot;
