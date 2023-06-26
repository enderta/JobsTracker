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
    let tkn = ""
    let id = ""
    it("API login", () => {
        // eslint-disable-next-line no-undef

        // eslint-disable-next-line no-undef
        cy.request({
            method: 'POST',
            url: 'http://localhost:5000/api/users/login',
            body: {
                "email": "et2@gmail.com",
                "password": "pistol"
            }
        }).then((res) => {
            expect(res.body.message).equal("User et2 logged in successfully")
            tkn = res.body.token
            id = res.body.userId
        })
        // eslint-disable-next-line no-undef


    })
    it("api delete", () => {
        // eslint-disable-next-line no-undef
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:5000/api/users/' + id,
            headers: {
                authorization: tkn
            }
        }).then((res) => {
            expect(res.body.message).equal("User deleted")
        })
    })

})