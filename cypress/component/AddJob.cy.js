import React from 'react';

import AddJobs from "../../src/components/AddJobs";

describe('add job end to end test', () => {
    it('should call the onClick event handler on submit', () => {
        // Set up event handler spy


        // Mount the component with the spy as the onClick prop
        cy.mount(<AddJobs show={true}  />);

        // Perform actions
        cy.get('[data-testid="Enter Title"]').should('be.visible').type('Job Title');
        cy.get('[data-testid="Enter Company"]').should('be.visible').type('Company Name');
        cy.get('[data-testid="Enter Location"]').should('be.visible').type('Location');
        cy.get('[data-testid="Enter Description"]').should('be.visible').type('Description');
        cy.get('[data-testid="Enter Requirements"]').should('be.visible').type('Requirements');

        // Submit the form
        cy.get('[data-testid="submit-button"]').should('be.visible').click();

        // Check the spy

    });
});
