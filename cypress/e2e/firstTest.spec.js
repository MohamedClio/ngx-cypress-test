/// <reference types="cypress" />
import { onDatePickerPage } from "../support/page_objects/datePickerPage";
import { onSmartTablesPage } from "../support/page_objects/smartTablesPage";
describe("First test suite using cypress", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[title="Forms"]').click();
    cy.contains("Form Layouts").click();
  });
  it("First test case", () => {
    cy.get('[data-cy="imputEmail1"]').type("herrmclio@gmail.com");
  });

  it("finding web elements", () => {
    // cy.get(
    //   'button[class="appearance-filled size-medium status-primary shape-rectangle transitions"]'
    // )
    //   .eq(2)
    //   .click();

    cy.contains('[status="warning"]', "Sign in");
    cy.contains("nb-card", "Horizontal form").find("button");
    cy.contains("nb-card", "Block form").find("button");
    // same as:
    cy.contains("nb-card", "Block form").contains("Submit");
    cy.get("#inputEmail3")
      .parents("nb-card")
      .find("button")
      .should("contain", "Sign in")
      .parents("nb-card")
      .find(".custom-checkbox")
      .click();
  });

  it("Saving subject of the command", () => {
    cy.contains("nb-card", "Basic form")
      .find('[for="exampleInputEmail1"]')
      .should("contain", "Email address");
    cy.contains("nb-card", "Basic form")
      .find('[for="exampleInputPassword1"]')
      .should("contain", "Password");

    //instead of repeating the code above, we can use the following:
    // method number 1:
    cy.contains("nb-card", "Basic form").as("basicForm");
    cy.get("@basicForm")
      .find('[for="exampleInputEmail1"]')
      .should("contain", "Email address");
    cy.get("@basicForm")
      .find('[for="exampleInputPassword1"]')
      .should("contain", "Password");
    // method number 2:
    cy.contains("nb-card", "Basic form").then((basicForm) => {
      cy.wrap(basicForm)
        .find('[for="exampleInputEmail1"]')
        .should("contain", "Email address");
      cy.wrap(basicForm)
        .find('[for="exampleInputPassword1"]')
        .should("contain", "Password");
    });
    //but we can not just use the following:
    //const basicForm = cy.contains("nb-card", "Basic form");
    //because cypress runs asynchronously
  });
  it("Extracting text values", () => {
    //1 get the element:
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");
    //2 extracting the text and asserting it:
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      cy.wrap(labelText).should("contain", "Email address");
    });
    //3 using invoke method:
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .as("textLabel")
      .should("contain", "Email address");
    //4 using attributes:
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });
    //5  using props:
    cy.get("#exampleInputEmail1").type("herrmclio@gmail.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("equal", "herrmclio@gmail.com");
  });

  it("radio button", () => {
    cy.contains("nb-card", "Using the Grid")
      .find("[type='radio']")
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(1).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
      });
  });
});

describe("another test suite", () => {
  it("date picker test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
    // cy.contains("nb-card", "Common Datepicker")
    //   .find('[placeholder="Form Picker"]')
    //   .click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateAssert = onDatePickerPage.selectDayFromCurrent(800);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
        //cy.wrap(input).should("have.value", "Mar 27, 2025");
      });
  });
  it("drop down menu", () => {
    cy.visit("/");
    //1
    cy.get(".select-button").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should("contain", "Dark");
    //2
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();
        //const itemindex = listItem.index();
        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });
  it("tables", () => {
    //1
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("44");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "44");
      });
    //2
    cy.get("th").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((insertRow) => {
        cy.wrap(insertRow).find('[placeholder="First Name"]').type("Mohamed");
        cy.wrap(insertRow).find('[placeholder="Last Name"]').type("Clio");
        cy.wrap(insertRow).find('[placeholder="E-mail"]').type("test@test.com");
        cy.wrap(insertRow).find('[placeholder="Age"]').type("35");
        cy.wrap(insertRow).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((firstRow) => {
        cy.wrap(firstRow).eq(2).should("contain", "Mohamed");
        cy.wrap(firstRow).eq(3).should("contain", "Clio");
        cy.wrap(firstRow).eq(5).should("contain", "test@test.com");
        cy.wrap(firstRow).eq(6).should("contain", "35");
      });
  });
  //3 get each row validation

  it("validate filter", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
    onSmartTablesPage.SmartFilterFunction("Age", 20);
    onSmartTablesPage.SmartFilterFunction("Age", 46);
    onSmartTablesPage.SmartFilterFunction("First Name", "Mark");
    onSmartTablesPage.SmartFilterFunction("E-mail", "jack@yandex.ru");
    onSmartTablesPage.SmartFilterFunction("Last Name", "Snow");
  });
  // it.only("validate filter", () => {
  //onSmartTablesPage.SmartFilterFunction(filter, val) {
  //     /*you can use any of the following filters: Age   E-mail   Username   First Name   Last Name  ID  */
  //     cy.get("thead tr").find(`[placeholder="${filter}"]`).clear().type(val);
  //     cy.wait(500);
  //     cy.get("tbody tr").each((rowdata) => {
  //       switch (filter) {
  //         case "Age":
  //           cy.wrap(rowdata).find("td").eq(6).should("contain", val);
  //           break;
  //         case "E-mail":
  //           cy.wrap(rowdata).find("td").eq(5).should("contain", val);
  //           break;
  //         case "Username":
  //           cy.wrap(rowdata).find("td").eq(4).should("contain", val);
  //           break;
  //         case "Last Name":
  //           cy.wrap(rowdata).find("td").eq(3).should("contain", val);
  //           break;
  //         case "First Name":
  //           cy.wrap(rowdata).find("td").eq(2).should("contain", val);
  //           break;
  //         default:
  //           cy.wrap(rowdata).should("contain", "No data found");
  //       }
  //     });
  //     cy.get("thead tr").find(`[placeholder="${filter}"]`).clear();
  //   }
  //   cy.visit("/");
  //   cy.contains("Tables & Data").click();
  //   cy.contains("Smart Table").click();
  // onSmartTablesPage.SmartFilterFunction("Age", 20);
  // onSmartTablesPage.SmartFilterFunction("First Name", "Mark");
  // onSmartTablesPage.SmartFilterFunction("E-mail", "jack@yandex.ru");
  // onSmartTablesPage.SmartFilterFunction("Last Name", "Snow");
  // onSmartTablesPage.SmartFilterFunction("Age", 202);
  // });
  it("popUps", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();
    cy.contains("Warning").click();
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });
  it("window popup", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1
    // cy.get("tbody tr").first().find(".nb-trash").click();
    // cy.on("window:confirm", (confirm) => {
    //   expect(confirm).to.equal("Are you sure you want to delete?");
    // });
    //2
    // cy.get("tbody tr").first().find(".nb-trash").click();
    // cy.on("window:confirm", () => false);
    //3
    const stub = cy.stub();
    cy.on("window:confirm", stub);
    cy.get("tbody tr")
      .first()
      .find(".nb-trash")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Are you sure you want to delete?"
        );
      });
  });
});
