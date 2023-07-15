import React from 'react';

import AddJobs from "../../src/components/jobtracker/AddJobs";

describe('add job end to end test', () => {
    it('should call the onClick event handler on submit', () => {
        // Set up event handler spy

    cy.intercept('POST', 'http://localhost:5000/api/jobs', {
            statusCode: 200,
            body: { success: true },
        }).as('addJob');
        //alert
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Job added successfully');
        }
        );

        // Mount the component with the spy as the onClick prop
        // eslint-disable-next-line no-undef
        cy.mount(<AddJobs show={true}  />);

        // Perform actions
        cy.get('[data-testid="Enter Title"]').should('be.visible').type('Job Title');
        cy.get('[data-testid="Enter Company"]').should('be.visible').type('Company Name');
        cy.get('[data-testid="Enter Location"]').should('be.visible').type('Location');
        cy.get('[data-testid="Enter Description"]').should('be.visible').type('Description');
        cy.get('[data-testid="Enter Requirements"]').should('be.visible').type('Requirements');

        // Submit the form
        cy.get('[data-testid="submit-button"]').should('be.visible').click();

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Job added successfully');
        });
        // Check the spy
        cy.wait('@addJob').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

    });
});
