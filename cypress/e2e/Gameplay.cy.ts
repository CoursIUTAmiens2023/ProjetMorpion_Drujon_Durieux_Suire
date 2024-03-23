import "@testing-library/cypress/add-commands"

describe("Gameplay spec", () => {
    it("Match equality and replay", () => {
        cy.visit("/")

        cy.get("button[id='0']").should("exist").click()
        cy.get("button[id='1']").should("exist").click()
        cy.get("button[id='3']").should("exist").click()
        cy.get("button[id='8']").should("exist").click()
        cy.get("button[id='5']").should("exist").click()
        cy.get("button[id='4']").should("exist").click()
        cy.get("button[id='7']").should("exist").click()
        cy.get("button[id='6']").should("exist").click()
        cy.get("button[id='2']").should("exist").click()

        cy.findByText("Match nul").should("exist")

        cy.findByText("Rejouer").click()

        cy.findByText("Prochain joueur : X").should("exist")
    })
    it("Player X wins and replay", () => {
        cy.visit("/")

        cy.get("button[id='0']").should("exist").click()
        cy.get("button[id='4']").should("exist").click()
        cy.get("button[id='1']").should("exist").click()
        cy.get("button[id='5']").should("exist").click()
        cy.get("button[id='2']").should("exist").click()

        cy.get("div").contains("Gagnant:X").should("exist")

        cy.findByText("Rejouer").click()

        cy.findByText("Prochain joueur : X").should("exist")
    })
    it("Player O wins and replay", () => {
        cy.visit("/")

        cy.get("button[id='4']").should("exist").click()
        cy.get("button[id='0']").should("exist").click()
        cy.get("button[id='5']").should("exist").click()
        cy.get("button[id='1']").should("exist").click()
        cy.get("button[id='8']").should("exist").click()
        cy.get("button[id='2']").should("exist").click()

        cy.get("div").contains("Gagnant:O").should("exist")

        cy.findByText("Rejouer").click()

        cy.findByText("Prochain joueur : X").should("exist")
    })
})
