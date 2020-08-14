import puppeteer from 'puppeteer';
import fs from 'fs';

async function scrapperRobot(youtubeUrl: string): Promise<string> {
    const WAIT_TIME = 700;
    const SCROLL_QUANTITY = 30;

    console.log(`[scrapperRobot] Iniciando...`);
    try {
        const { page, browser } = await startRobot(youtubeUrl);
        await scrollDown(page);
        const comments = await getComments(page);
        await finishRobot(page, browser);
        console.log(`[scrapperRobot] Finalizado com sucesso`);

        return Promise.resolve(comments);
    } catch (err) {
        console.log(`[scrapperRobot] Finalizado com falhas`);
        console.log(err);
        return Promise.reject();
    }

    async function startRobot(youtubeUrl: string): Promise<{ page: puppeteer.Page; browser: puppeteer.Browser }> {
        try {
            const browser = await puppeteer.launch({
                ignoreDefaultArgs: ['--disable-extensions'],
                headless: true,
            });
            const page = await browser.newPage();
            await page.goto(youtubeUrl, { waitUntil: 'load' });
            await page.waitFor('h1.title', { timeout: 5000 });

            console.log("[scrapperRobot] Sucesso no método 'startRobot'");
            return Promise.resolve({
                page,
                browser,
            });
        } catch (err) {
            console.log("[scrapperRobot] Erro no método 'startRobot'");

            return Promise.reject(err);
        }
    }

    async function scrollDown(page: puppeteer.Page): Promise<void> {
        console.log(`[scrapperRobot] Iniciando método 'scrollDown'`);
        try {
            for (let i = 0; i < SCROLL_QUANTITY; i++) {
                console.log(`[scrapperRobot] Scroll ${i + 1}/${SCROLL_QUANTITY}...`);

                await page.waitFor(WAIT_TIME);

                await page.evaluate(() => {
                    window.scrollBy(0, window.innerHeight);
                });
            }

            await page.waitFor(WAIT_TIME);
            console.log("[scrapperRobot] Sucesso no método 'scrollDown'.");
            return Promise.resolve();
        } catch (err) {
            console.log("[scrapperRobot] Erro no método 'scrollDown'.");

            return Promise.reject(err);
        }
    }

    async function getComments(page: puppeteer.Page): Promise<string> {
        console.log(`[scrapperRobot] Iniciando método 'getComments'`);
        const selector = 'yt-formatted-string#content-text';

        try {
            const comments = await page.$$eval(selector, (comments) => comments.map((comment) => comment.textContent));

            console.log(`[scrapperRobot] Total de ${comments.length} comentários coletados.`);

            await fs.writeFile('comments.json', JSON.stringify(comments, null, 2), () => {
                console.log("[scrapperRobot] Arquivo 'comments.json' criado");
            });

            console.log("[scrapperRobot] Sucesso no método 'getComments'");
            return Promise.resolve(comments.join('\n'));
        } catch (err) {
            console.log("[scrapperRobot] Erro no método 'getComments'");
            return Promise.reject(err);
        }
    }

    async function finishRobot(page: puppeteer.Page, browser: puppeteer.Browser) {
        console.log('[scrapperRobot] Finalizando...');

        await page.close();
        await browser.close();
    }
}

export default scrapperRobot;
