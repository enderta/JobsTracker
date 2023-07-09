import React from 'react';
import AddJobs from "../../src/components/AddJobs";

describe('add job end to end test', () => {
    beforeEach(() => {
        cy.mount(<AddJobs show={true} />);
    });

    it('should add a new job', () => {
        // Set up spy


        // Perform actions
        cy.get('[data-testid="Enter Title"]').should('be.visible').type('Job Title');
        cy.get('[data-testid="Enter Company"]').should('be.visible').type('Company Name');
        cy.get('[data-testid="Enter Location"]').should('be.visible').type('Location');
        cy.get('[data-testid="Enter Description"]').should('be.visible').type('Description');
        cy.get('[data-testid="Enter Requirements"]').should('be.visible').type('Requirements');
        cy.get('[data-testid="submit-button"]').should('be.visible')
            .click();

        // Check the spy

    });
});
