import scrapperRobot from './robots/scrapper';
import nluRobot from './robots/nlu';
import inputRobot from './robots/input';

async function start() {
    const youtubeUrl = inputRobot();

    try {
        const commentsAsOneString = await scrapperRobot(youtubeUrl);
        await nluRobot(commentsAsOneString);
    } catch (err) {
        console.log(err);
    }
}

start();
