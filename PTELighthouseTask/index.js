const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false, args: ["--start-maximized"]});
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    const lhApi = await import('lighthouse');
    const flags = {
        screenEmulation: {
            disabled: true
        }
    }
    const config = lhApi.desktopConfig;
    const lhFlow = await lhApi.startFlow(page, {name: 'PTELighthouseTask', config, flags});
    {
        const {width, height} = await page.evaluate(
            () => {
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                };
            }
        );
        await page.setViewport({width, height});
    }

    // Opening Performance Testing Essentials Application
    await lhFlow.startNavigation();
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        startWaitingForEvents();
        await targetPage.goto('http://localhost/');
        await Promise.all(promises);
    }
    await lhFlow.endNavigation();

    // Navigate to "Tables" Section
    await lhFlow.startNavigation();
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        const tablesElement = "li.page-item-13 > a";
        await targetPage.click(tablesElement);
        await Promise.all(promises);
    }
    await lhFlow.endNavigation();
    
    // Select a table
    await lhFlow.startNavigation();
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('div.product-117 h3'),
            targetPage.locator('::-p-xpath(//*[@id=\\"post-13\\"]/div/div[2]/div[3]/a/h3)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 93.921875,
                y: 23.25,
              },
            });
        await Promise.all(promises);
    }
    await lhFlow.endNavigation();

    // Add table to Cart
    await lhFlow.startTimespan();
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#primary button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"reg_add_117\\"]/button)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 82.015625,
                y: 22.703125,
              },
            });
    }
    await lhFlow.endTimespan();

    // Navigate to Cart Page
    await lhFlow.startNavigation();
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('li.page-item-31 > a'),
            targetPage.locator('::-p-xpath(//*[@id=\\"masthead\\"]/div[1]/div/div[2]/div/ul/li[6]/a)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 18.109375,
                y: 15.453125,
              },
            });
        await Promise.all(promises);
    }
    await lhFlow.endNavigation();

    // Checkout
    await lhFlow.startNavigation();
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('div.form-buttons > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-container\\"]/form/div[2]/input)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 70.40625,
                y: 23.21875,
              },
            });
        await Promise.all(promises);
    }
    await lhFlow.endNavigation();

    // Enter required details and purchase
    await lhFlow.startTimespan();
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('form > div:nth-of-type(2) > div:nth-of-type(2) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[2]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 241,
                y: 28.6875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('form > div:nth-of-type(2) > div:nth-of-type(2) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[2]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .fill('Gryffindor');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(3) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[3]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 54,
                y: 16.703125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(3) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[3]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .fill('H');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('h');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(3) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[3]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .fill('Harry Potter');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(4) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[4]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 67,
                y: 12.703125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(4) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[4]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .fill('Hogwarts');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(5) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[5]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 19,
                y: 12.703125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(5) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[5]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .fill('P44');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(6) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[6]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 38,
                y: 13.703125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(6) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[6]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .fill('Hogsmeade');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div.dropdown_country select'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[7]/div[2]/select)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 159,
                y: 9.703125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div.dropdown_country select'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[7]/div[2]/select)')
        ])
            .setTimeout(timeout)
            .fill('IN');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div.dropdown_state select'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[8]/div[2]/select)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 125,
                y: 10.703125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div.dropdown_state select'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[8]/div[2]/select)')
        ])
            .setTimeout(timeout)
            .fill('IN_AP');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(9) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[9]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 310,
                y: 16.703125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div:nth-of-type(9) input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[9]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .fill('12345678');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div.email input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[10]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 154,
                y: 30.703125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div:nth-of-type(2) > div.email input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[10]/div[2]/span/input)')
        ])
            .setTimeout(timeout)
            .fill('hp@gmail.com');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('form > div:nth-of-type(2) textarea'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[11]/div[2]/textarea)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 133,
                y: 11.71875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('form > div:nth-of-type(2) textarea'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[2]/div[11]/div[2]/textarea)')
        ])
            .setTimeout(timeout)
            .fill('nope.');
    }
    await lhFlow.endTimespan();

    await lhFlow.startNavigation();
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('div.cart_button > input'),
            targetPage.locator('::-p-xpath(//*[@id=\\"shopping-cart-submit-container\\"]/div/div/div/form/div[4]/input)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 123.234375,
                y: 25.671875,
              },
            });
        await Promise.all(promises);
    }
    await lhFlow.endNavigation();

    const lhFlowReport = await lhFlow.generateReport();
    fs.writeFileSync(__dirname + '/flow.report.html', lhFlowReport)

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
