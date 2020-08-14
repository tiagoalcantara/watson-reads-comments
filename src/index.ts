import scrapperRobot from './robots/scrapper';
import nluRobot from './robots/nlu';
import inputRobot from './robots/input';
import analyzeRobot from './robots/analyze';

async function start() {
    const youtubeUrl = inputRobot();

    try {
        const commentsAsOneString = await scrapperRobot(youtubeUrl);
        const analysesResult = await nluRobot(commentsAsOneString);
        const textOutput = analyzeRobot(analysesResult);

        console.log(textOutput);
    } catch (err) {
        console.log(err);
    }
}

start();
