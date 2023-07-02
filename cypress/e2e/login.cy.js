///<reference types="cypress"/>
require("cypress-xpath");

describe("register test", () => {
    it.skip("register", () => {
        // eslint-disable-next-line no-undef
        cy.visit("http://localhost:3000/register");
        cy.get('input[name="firstName"]').type("et2");
        cy.get('input[name="email"]').type("et2@gmail.com");
        cy.get('input[name="password"]').type("pistol");
        cy.get('input[name="passwordConfirmation"]').type("pistol");
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/login");
    });
    it.skip("login", () => {
        cy.visit("http://localhost:3000/login");
        cy.get('input[name="email"]').type("et2@gmail.com");
        cy.get('input[name="password"]').type("pistol");
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/home");
        cy.get('#basic-nav-dropdown').click();
        cy.wait(2000);
        cy.get('.dropdown-menu > [role="button"]').click();
        cy.url().should("include", "/home");
    });
    it.skip("quantity control", () => {
        cy.visit("http://localhost:3000");
        cy.xpath('(//div[@class=\'quantity-control\'])[1]//h4').should(
            'contain.text', "1");
        cy.xpath('(//div[@class=\'quantity-control\'])[1]//button[2]').click()
        cy.wait(2000);
        cy.xpath('(//div[@class=\'quantity-control\'])[1]//h4')
            .should('contain.text', "2");
        cy.wait(2000);
        cy.xpath('(//div[@class=\'quantity-control\'])[1]//button[1]')
            .click();
        cy.wait(2000);
        cy.xpath('(//div[@class=\'quantity-control\'])[1]//h4')
            .should('contain.text', "1");
    });
    it("add to cart", () => {
        cy.visit("http://localhost:3000");
        cy.xpath("(//button[.='Add to cart 🛒'])[1]").click();
        //alert
        cy.wait(2000);

        cy.on('window:alert', (str) => {
                expect(str).to.equal('Please login to add to basket')
            }
        )
        //login
        cy.get('#basic-nav-dropdown').click();
        cy.wait(2000);
        cy.xpath('//a[.="Login"]').click();
        cy.url().should("include", "/login");
        cy.get('input[name="email"]').type("et@gmail.com");
        cy.get('input[name="password"]').type("123456");
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/home");
        cy.wait(2000);
        let product =""
        cy.xpath("(//*[@class='card-title h5'])[1]").then(
            ($el) => {
                product = $el.text();
                cy.log(product);
            }
        )
        cy.xpath("(//button[.='Add to cart 🛒'])[1]").click();
        cy.xpath("(//*[@class='card-title h5'])[1]").then(
            ($el) => {
                expect($el.text()).to.equal(product);
            }
        )
        cy.wait(2000);

        //get text from iframe
      /*  cy.get('iframe').then(($iframe) => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body).find('h2').should('contain.text', 'Login')
        })

        //get text from an element
        cy.get('h2').then(($h2) => {
            const txt = $h2.text();
            cy.log(txt);
        })

        //get all elements as array
        let arr = [];
        cy.get('div').then(($div) => {
            arr.push(
                $div.text()
            )
        })
        arr.find((el) => {
            return el.includes('Login')
        })*/
    })
});
