///<reference types="cypress"/>
import React from 'react';
import Filters from "../../src/components/jobtracker/Filters";

describe('filter component test', () => {
    it('should render the filter component', () => {
        cy.mount(
            <Filters
                data={[
                    { id: 1, location: 'London', title: 'React Developer'},
                    { id: 2, location: 'New York', title: 'Node.js Developer'},
                    { id: 3, location: 'Paris' , title: 'Python Developer'}
                ]}
            />);
            cy.get('[data-testid="city-select"]').should('be.visible').select('London');
            cy.get('[data-testid="job-title-select"]').should('be.visible').select('React Developer');




    })
});