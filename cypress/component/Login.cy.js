import React from 'react';
import Login from '../../src/components/jobtracker/Login';

describe('Login', () => {
  it("should login the app",()=> {
      cy.intercept('POST', 'http://localhost:5000/api/users/login', {
          statusCode: 200,
          body: {
             success: true,
                token: 'test'
          }
      }).as('login')

      cy.mount(<Login/>)
      cy.get('[data-testid="username"]').type('test')
      cy.get('[data-testid="password"]').type('test')
      cy.get('[data-testid="login"]').click({force: true})
      cy.wait(1000)
      cy.wait('@login').then((interception) => {
          expect(interception.response.statusCode).to.equal(200)
      })

  })

});