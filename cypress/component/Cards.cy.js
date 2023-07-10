import React from 'react';
import Cards from "../../src/components/Cards";

describe('cards component test', () => {
    it('should test handleCheck function', () => {
        cy.intercept('GET', 'http://localhost:5000/api/jobs', {
            statusCode: 200,
            body: { success: true },
        }).as('getJobs');

        cy.mount(<Cards data={[
            { id: 1, location: 'London', title: 'React Developer', is_applied: false},
            { id: 2, location: 'New York', title: 'Node.js Developer', is_applied: false},
            { id: 3, location: 'Paris' , title: 'Python Developer', is_applied: false}
        ]} />);

        // simulate the network request made by handleCheck function
        cy.intercept('PATCH', 'http://localhost:5000/api/jobs/*', {
            statusCode: 200,
            body: { success: true },
        }).as('patchJob');

        //now find the text element and trigger a click, assuming that text has a class 'job-applied-status'
        cy.get('[cy-data="applied-at"]').first().click();

        // wait for the PATCH request to finish
        cy.wait('@patchJob').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        // verify changes, here assuming that applied job text color changes to 'forestgreen'
        cy.get('[cy-data="applied-at"]').first().should('contain.text', 'Applied At: ');
    });
})
