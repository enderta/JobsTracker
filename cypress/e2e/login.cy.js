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
    it("login", () => {
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

});
