describe("Unauthenticated", () => {
  it("should redirect into /signin ", () => {
    cy.visit("http://localhost:3000/invite");
    cy.url().should("be.equal", "http://localhost:3000/signin");
  });
});

describe("Authenticated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signi");

    cy.get("input").type("alice");
    cy.get("button").click();

    cy.url().should("equal", "http://localhost:3000/invite");
  });

  it("should render page", () => {
    cy.contains("Hey Alice 👋");
  });

  it("should copy the connection string", () => {
    cy.get("main > section > p").click();

    cy.window()
      .its("navigator.clipboard")
      .invoke("readText")
      .then((text) => {
        cy.log(text);
        cy.get("main > section > p").invoke("text").should("equal", text);
      });
  });

  it("should logout", () => {
    cy.get("header > a").click();
    cy.url().should("be.equal", "http://localhost:3000/signin");
  });
});

export {};
