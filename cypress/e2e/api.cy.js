//require("cypress-xpath");

describe("API Test", () => {
    it.skip("API register", () => {
        // eslint-disable-next-line no-undef
        cy.request({
            method: 'POST',
            url: 'http://localhost:5000/api/users/register',
            body: {
                "email": "et2@gmail.com",
                "name": "et2",
                "password": "pistol"
            }
        }).then((res) => {
            expect(res.body.message).equal("User et2 registered successfully")
        })

    })

})