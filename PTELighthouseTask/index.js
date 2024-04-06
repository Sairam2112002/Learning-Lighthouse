const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false, args: ["--start-maximized"]});
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    // URIs
    const pteApplicationUri = "http://localhost/";

    // Locators
    const tablesSectionButton = "li.page-item-13 > a";
    const livingRoomTable6 = "div.product-117 h3";
    const addToCartButton = "#primary button";
    const cartSectionButton = "li.page-item-31 > a";
    const placeAnOrderButton = "div.form-buttons > input";
    const companyInputField = "form > div:nth-of-type(2) > div:nth-of-type(2) input";
    const fullNameInputField = "div:nth-of-type(2) > div:nth-of-type(3) input";
    const addressInputField = "div:nth-of-type(2) > div:nth-of-type(4) input";
    const postalCodeInputField = "div:nth-of-type(2) > div:nth-of-type(5) input";
    const cityInputField = "div:nth-of-type(2) > div:nth-of-type(6) input";
    const countryDropdown = "div:nth-of-type(2) > div.dropdown_country select";
    const stateDropdown = "div:nth-of-type(2) > div.dropdown_state select";
    const phoneInputField = "div:nth-of-type(2) > div:nth-of-type(9) input";
    const emailInputField = "div:nth-of-type(2) > div.email input";
    const commentsTextAreaField = "form > div:nth-of-type(2) textarea";
    const finalPlaceOrderButton = "div.cart_button > input";
    
    // Constants
    const countryToSelect = "IN";
    const stateToSelect = "IN_AP";

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
        await Promise.all([
            page.waitForNavigation(),
            page.goto(pteApplicationUri)
        ]);
    }
    await lhFlow.endNavigation();

    // Navigate to "Tables" Section
    await lhFlow.startNavigation();
    { 
        await Promise.all([
            page.waitForNavigation(),
            page.click(tablesSectionButton)
        ]);
    }
    await lhFlow.endNavigation();
    
    // Select a table
    await lhFlow.startNavigation();
    {
        await Promise.all([
            page.waitForNavigation(),
            page.click(livingRoomTable6)
        ]);
    }
    await lhFlow.endNavigation();

    // Add table to Cart
    await lhFlow.startTimespan();
    {
        await Promise.all([page.click(addToCartButton)]);
    }
    await lhFlow.endTimespan();

    // Navigate to Cart Page
    await lhFlow.startNavigation();
    {
        await Promise.all([
            page.waitForNavigation(),
            page.click(cartSectionButton)
        ]);
    }
    await lhFlow.endNavigation();

    // Checkout
    await lhFlow.startNavigation();
    {
        await Promise.all([
            page.waitForNavigation(),
            page.click(placeAnOrderButton)
        ]);
    }
    await lhFlow.endNavigation();

    // Enter required details
    await lhFlow.startTimespan();
    {
        await page.type(companyInputField, "Gryffindor");
        await page.type(fullNameInputField, "Harry Potter");
        await page.type(addressInputField, "Hogwarts");
        await page.type(postalCodeInputField, "P44");
        await page.type(cityInputField, "Hogsmeade");
        await page.select(countryDropdown, countryToSelect);

        await page.waitForSelector(stateDropdown);
        await page.select(stateDropdown, stateToSelect);

        await page.type(phoneInputField, "1234567890");
        await page.type(emailInputField, "hp@gmail.com");
        await page.type(commentsTextAreaField, "No comments");
    }
    await lhFlow.endTimespan();

    // Purchase
    await lhFlow.startNavigation();
    {
        await Promise.all([
            page.waitForNavigation,
            page.click(finalPlaceOrderButton)
        ]);
    }
    await lhFlow.endNavigation();

    // Generate Lighthouse Report
    const lighthouseReport = await lhFlow.generateReport();
    fs.writeFileSync(__dirname + '/lighthouseReport.html', lighthouseReport)

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
