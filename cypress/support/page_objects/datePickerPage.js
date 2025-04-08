///<reference types='cypress'/>
function selectDayFromCurrent(days) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  let futureDay = date.getDate();
  let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
  let futureYear = date.getFullYear();
  let dateAssert = `${futureMonth} ${futureDay}, ${futureYear}`;
  cy.get("nb-calendar-navigation")
    .invoke("attr", "ng-reflect-date")
    .then((dateAttribute) => {
      if (
        !dateAttribute.includes(futureMonth) ||
        !dateAttribute.includes(futureYear)
      ) {
        cy.get('[data-name="chevron-right"]').click();
        selectDayFromCurrent(days);
      } else {
        cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();
      }
    });
  return dateAssert;
}
export class datePickerPage {
  commonDatePicker(theDays) {
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateAssert = selectDayFromCurrent(theDays);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
        //cy.wrap(input).should("have.value", "Mar 27, 2025");
      });
  }

  datePickerWithRange(from, to) {
    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const fromDate = selectDayFromCurrent(from);
        const toDate = selectDayFromCurrent(to);
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", `${fromDate} - ${toDate}`);
        //cy.wrap(input).should("have.value", "Mar 27, 2025");
      });
  }
}

export const onDatePickerPage = new datePickerPage();
