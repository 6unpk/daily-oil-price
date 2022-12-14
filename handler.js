const playwright = require('playwright-aws-lambda');

const handler = async (event) => {
    const browser = await playwright.launchChromium();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto('https://www.opinet.co.kr/user/main/mainView.do');
    const average = await page.innerHTML('.ML10 .text-3');
    const lowest = await page.innerHTML('.ML10 p .col-1');
    const highest = await page.innerHTML('.ML10 p .col-2');
  
    return {
        statusCode: 200,
        body: JSON.stringify({
            averagePrice: parseInt(average, 10),
            lowestPrice: parseInt(lowest, 10),
            highest: parseInt(highest, 10)
        })
    }  
}

exports.handler = handler;