import { interceptors } from "../interceptors";

describe("Sign In", () => {
  beforeEach(() => {
    interceptors.signin();
    cy.visit("http://localhost:3000/signin");
  });

  it("try to login without username", () => {
    cy.get("button").click();
    cy.get("form > div > div > span").contains(/^$|\s+/);
  });

  it("try to login with invalid username", () => {
    cy.get("input").type("nick");
    cy.get("button").click();

    cy.wait("@signin").then((inter: any) => {
      expect(inter.response?.statusCode).to.be.equal(401);
      expect(inter.response.body.message).to.be.equal("Unauthorized");
    });

    cy.get("form > div > div > span")
      .invoke("text")
      .should("equal", "Unauthorized");
  });

  it("try to login with username", () => {
    cy.get("input").type("alice");
    cy.get("button").click();

    cy.wait("@signin").then((inter) => {
      expect(inter.response?.statusCode).to.be.equal(200);
    });

    cy.url().should("be.equal", "http://localhost:3000/invite");
  });
});

export {};
