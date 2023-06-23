
describe('api testing', () => {
    it('amazon web testing', () => {
        // eslint-disable-next-line no-undef
        browser.url('https://www.amazon.com/');
        // eslint-disable-next-line no-undef
        const title = browser.getTitle();
        console.log(title);
        expect(title).to.equal('Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more');
    });
});