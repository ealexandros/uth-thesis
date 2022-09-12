import { interceptors } from "../interceptors";

describe("Unauthenticated", () => {
  it("should redirect into /signin ", () => {
    cy.visit("http://localhost:3000/invite");
    cy.url().should("be.equal", "http://localhost:3000/signin");
  });
});

describe("Authenticated", () => {
  beforeEach(() => {
    interceptors.signin();
    cy.visit("http://localhost:3000/signin");

    cy.get("input").type("alice");
    cy.get("button").click();

    cy.wait("@signin").then((inter) => {
      expect(inter.response?.statusCode).to.be.equal(200);
    });

    cy.url().should("equal", "http://localhost:3000/invite");
  });

  it("should render page", () => {
    cy.contains("alice");
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
