
describe('api testing', () => {
    it('amazon web testing', () => {
        // eslint-disable-next-line no-undef
        browser.url('https://www.amazon.com/');
        // eslint-disable-next-line no-undef
        browser.window.fullscreen();
        // eslint-disable-next-line no-undef
        //search for a product
        // eslint-disable-next-line no-undef
       browser.findElement("xpath", "//input[@id='twotabsearchtextbox']")
            .sendKeys("iphone 12 pro max");
        // eslint-disable-next-line no-undef
        browser.findElement("xpath", "//input[@id='nav-search-submit-button']")
            .click();



        const title = browser.getTitle();
        console.log(title);
        //expect(title).to.equal('Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more');
    });
});