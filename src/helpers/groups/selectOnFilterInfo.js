/* eslint-disable no-param-reassign */
export default function (groups, {
  dateAdditionFrom, dateAdditionTo, impFrom, impTo
}) {
  console.log('groups: ', groups);
  console.log({
    dateAdditionFrom, dateAdditionTo, impFrom, impTo
  });

  let selectedGroups = null;

  //* если есть поля impFrom или impTo - то фильтрцем по важности (конверитуря в числа!)
  if (impFrom || impTo) {
    impFrom = impFrom ?? 1;
    impTo = impTo ?? 10;

    selectedGroups = groups.filter(
      (g) => g.avgImportance >= +impFrom && g.avgImportance <= +impTo
    );
    console.log('selectedGroups: ', selectedGroups);
  }

  if (dateAdditionFrom && dateAdditionTo) {
    selectedGroups = groups.filter(
      (g) => new Date(g.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime() &&
        new Date(g.dateOfAddition) <= new Date(dateAdditionTo).getTime()
    );
    console.log('selectedGroups: ', selectedGroups);
  }

  if (dateAdditionFrom && !dateAdditionTo) {
    selectedGroups = groups.filter(
      (g) => new Date(g.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime()
    );
    console.log('selectedGroups: ', selectedGroups);
  }

  if (!dateAdditionFrom && dateAdditionTo) {
    selectedGroups = groups.filter(
      (g) => new Date(g.dateOfAddition).getTime() <= new Date(dateAdditionTo).getTime()
    );
    console.log('selectedGroups: ', selectedGroups);
  }

  return selectedGroups;
}
