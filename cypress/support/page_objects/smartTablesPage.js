export class smartTablesPage {
  tableFilterFunction(filter, val) {
    /* You can use any of the following filters: Age   E-mail   Username   First Name   Last Name  ID */
    cy.get("thead tr").find(`[placeholder="${filter}"]`).clear().type(val);
    cy.wait(500);
    cy.get("tbody tr").then((rows) => {
      // Check if only "No data found" exists
      if (
        rows.length === 1 &&
        Cypress.$(rows[0]).text().includes("No data found")
      ) {
        cy.log("No data found, skipping switch case.");
        cy.wrap(rows[0]).should("contain.text", "No data found");
      } else {
        // Otherwise, validate each row normally
        cy.get("tbody tr").each((rowdata) => {
          cy.wrap(rowdata)
            .invoke("text")
            .then((text) => {
              if (text.includes("No data found")) {
                cy.log("Skipping as no valid data rows are found.");
              } else {
                switch (filter) {
                  case "Age":
                    cy.wrap(rowdata).find("td").eq(6).should("contain", val);
                    break;
                  case "E-mail":
                    cy.wrap(rowdata).find("td").eq(5).should("contain", val);
                    break;
                  case "Username":
                    cy.wrap(rowdata).find("td").eq(4).should("contain", val);
                    break;
                  case "Last Name":
                    cy.wrap(rowdata).find("td").eq(3).should("contain", val);
                    break;
                  case "First Name":
                    cy.wrap(rowdata).find("td").eq(2).should("contain", val);
                    break;
                  default:
                    cy.wrap(rowdata).should("contain", "No data found");
                }
              }
            });
        });
      }
    });

    cy.get("thead tr").find(`[placeholder="${filter}"]`).clear();
  }

  tableAddFunction(placeHolder, val) {
    cy.get("th").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((insertRow) => {
        cy.wrap(insertRow).find(`[placeholder="${placeHolder}"]`).type(val);
        cy.wrap(insertRow).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((firstRow) => {
        switch (placeHolder) {
          case "First Name":
            cy.wrap(firstRow).eq(2).should("contain", val);
            break;
          case "Last Name":
            cy.wrap(firstRow).eq(3).should("contain", val);
            break;
          case "E-mail":
            cy.wrap(firstRow).eq(5).should("contain", val);
            break;
          case "Age":
            cy.wrap(firstRow).eq(6).should("contain", val);
            break;
        }
      });
  }
  tablesEditFunction(firstName, oldVal, newVal) {
    cy.get("tbody")
      .contains("tr", firstName)
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow)
          .find(`[placeholder="${oldVal}"]`)
          .clear()
          .type(newVal);
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow)
          .find("td")
          .then((firstRow) => {
            switch (oldVal) {
              case "First Name":
                cy.wrap(firstRow).eq(2).should("contain", newVal);
                break;
              case "Last Name":
                cy.wrap(firstRow).eq(3).should("contain", newVal);
                break;
              case "E-mail":
                cy.wrap(firstRow).eq(5).should("contain", newVal);
                break;
              case "Age":
                cy.wrap(firstRow).eq(6).should("contain", newVal);
                break;
            }
          });
      });
  }
}
export const onSmartTablesPage = new smartTablesPage();
