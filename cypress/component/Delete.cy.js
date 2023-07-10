import React from 'react';
import Delete from "../../src/components/Delete";

describe ('delete job end to end test', () => {
    it('should call the onClick event handler on submit', () => {
        // Set up event handler spy
        cy.intercept('DELETE', 'http://localhost:5000/api/jobs/1', {
            statusCode: 200,
            body: { success: true },
        }).as('deleteJob');

        // Mount the component with the spy as the onClick prop
        cy.mount(<Delete id={1} />);

        // Perform actions
        cy.get('[data-testid="delete-button"]').should('be.visible').click();
        //alert
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Job deleted successfully');
        });
        // Check the spy
        cy.wait('@deleteJob').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });




    })
})