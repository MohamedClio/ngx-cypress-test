function selectGroupMenuItem(groupName) {
  cy.contains("a", groupName).then((menu) => {
    cy.wrap(menu)
      .find(".expand-state g g")
      .invoke("attr", "data-name")
      .then((chevronDirection) => {
        if (chevronDirection.includes("left")) {
          cy.wrap(menu).click();
        }
      });
  });
}

export class navBar {
  formLayoutsPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Form Layouts").click();
  }

  datePickerPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Datepicker").click();
  }
  smartTablesPage() {
    selectGroupMenuItem("Tables & Data");
    cy.contains("Smart Table").click();
  }
  toolTipPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Tooltip").click();
  }
  toasterPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Toastr").click();
  }
}

export const navigateTo = new navBar();
