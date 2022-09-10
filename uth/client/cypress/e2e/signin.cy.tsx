describe("SignIn", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("try to login without username", () => {
    cy.get("button").click();
    cy.get("form > div > div > span").contains(/^$|\s+/);
  });

  it("try to login with username", () => {
    cy.get("input").type("alice");
    cy.get("button").click();

    cy.url().should("be.equal", "http://localhost:3000/invite");
  });
});

export {};
