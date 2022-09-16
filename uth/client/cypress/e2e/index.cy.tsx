describe("Landing", () => {
  it("should redirect into signin page", () => {
    cy.visit("http://localhost:3000/");
    cy.url().should("be.equal", "http://localhost:3000/signin");
  });
});

export {};
