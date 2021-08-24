/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
export default function foo(
  items,
  {
    dateAdditionFrom,
    dateAdditionTo,
    dateEndingFrom,
    dateEndingTo,
    impFrom,
    impTo,
    onlyDone,
    onlyUndone
  },
  isGroups = false
) {
  console.log('items: ', items);
  console.log({
    dateAdditionFrom,
    dateAdditionTo,
    impFrom,
    impTo
  });

  let selectedItems = null;

  //* если есть поля impFrom или impTo - то фильтрцем по важности (конверитуря в числа!)
  if (impFrom || impTo) {
    impFrom = impFrom ?? 1;
    impTo = impTo ?? 10;

    selectedItems = isGroups
      ? items.filter((item) => item.avgImportance >= +impFrom && item.avgImportance <= +impTo)
      : items.filter((item) => item.importance >= +impFrom && item.importance <= +impTo);
    console.log('selectedItems: ', selectedItems);
  }

  //* если выбран показать только выполненные / невыполненные задания
  if (onlyDone || onlyUndone) {
    selectedItems = onlyDone
      ? items.filter((item) => item.done === true)
      : items.filter((item) => item.done === false);
  }

  if (!onlyDone && !onlyUndone) {
    console.log('возвращаем все');
    selectedItems = items;
  }

  if (dateAdditionFrom && dateAdditionTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime() &&
        new Date(item.dateOfAddition) <= new Date(dateAdditionTo).getTime()
    );
    console.log('selectedItems: ', selectedItems);
  }

  if (dateAdditionFrom && !dateAdditionTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime()
    );
    console.log('selectedItems: ', selectedItems);
  }

  if (!dateAdditionFrom && dateAdditionTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfAddition).getTime() <= new Date(dateAdditionTo).getTime()
    );
    console.log('selectedItems: ', selectedItems);
  }

  if (dateEndingFrom && dateEndingTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfEnding).getTime() >= new Date(dateEndingFrom).getTime() &&
        new Date(item.dateOfEnding) <= new Date(dateEndingTo).getTime()
    );
    console.log('selectedItems: ', selectedItems);
  }

  if (dateEndingFrom && !dateEndingTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfEnding).getTime() >= new Date(dateEndingFrom).getTime()
    );
    console.log('selectedItems: ', selectedItems);
  }

  if (!dateEndingFrom && dateEndingTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfEnding).getTime() <= new Date(dateEndingTo).getTime()
    );
    console.log('selectedItems: ', selectedItems);
  }

  return selectedItems;
}
