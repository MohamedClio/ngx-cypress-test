import { onDatePickerPage } from "../support/page_objects/datePickerPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navBar";
import { onSmartTablesPage } from "../support/page_objects/smartTablesPage";

describe("Test with page objects", () => {
  beforeEach("open application", () => {
    cy.openHomePage();
  });

  it("verify navigation accross the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datePickerPage();
    navigateTo.smartTablesPage();
    navigateTo.toasterPage();
    navigateTo.toolTipPage();
  });

  it("should submit Inline and basic form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineForm("ali", "ali@ali.com");
    onFormLayoutsPage.submitBasicForm("sekoseko@seko.seko", "correctPassword");
    navigateTo.datePickerPage();
    onDatePickerPage.commonDatePicker(600);
    onDatePickerPage.datePickerWithRange(5, 10);
    navigateTo.smartTablesPage();
    onSmartTablesPage.tableFilterFunction("Age", "22");
    onSmartTablesPage.tableAddFunction("First Name", "Mark");
    onSmartTablesPage.tablesEditFunction("Jacob", "First Name", "Clio");
  });
});
