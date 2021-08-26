/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
export default function foo(
  items,
  // filterInfo,
  {
    dateAdditionFrom,
    dateAdditionTo,
    dateEndingFrom,
    dateEndingTo
    /* impFrom,
    impTo */
    /* onlyDone,
    onlyUndone */
  }
) {
  // isGroups = false
  console.log('items: ', items);
  // console.log('filterInfo: ', filterInfo);
  console.log({
    dateAdditionFrom,
    dateAdditionTo
    /*  impFrom,
    impTo */
    /* onlyDone,
    onlyUndone */
  });

  let selectedItems = null;

  //* если есть поля impFrom или impTo - то фильтрцем по важности (конверитуря в числа!)
  /* if (impFrom || impTo) {
    // const impFrom = filterInfo.impFrom ?? 1;
    // const impTo = filterInfo.impTo ?? 10;
    impFrom = impFrom ?? 1;
    impTo = impTo ?? 10;
    console.log({ impFrom, impTo });

    selectedItems = isGroups
      ? items.filter((item) => +item.avgImportance >= +impFrom && +item.avgImportance <= +impTo)
      : items.filter((item) => +item.importance >= +impFrom && +item.importance <= +impTo);
    console.log('selectedItems: ', selectedItems);
  } */

  //* если выбран показать только выполненные / невыполненные задания
  /* if (onlyDone || onlyUndone) {
    selectedItems = onlyDone
      ? items.filter((item) => item.done === true)
      : items.filter((item) => item.done === false);
    console.log('selectedItems: ', selectedItems);
  } */

  /* if (!isGroups && onlyDone === false && onlyUndone === false) {
    console.log('возвращаем все');
    selectedItems = selectedItems
      ? selectedItems.filter((item) => !item.done || item.done)
      : items.filter((item) => !item.done || item.done);
  } */

  if (dateAdditionFrom && dateAdditionTo) {
    selectedItems = selectedItems
      ? selectedItems.filter(
          (item) =>
            new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime() &&
            new Date(item.dateOfAddition) <= new Date(dateAdditionTo).getTime()
        )
      : items.filter(
          (item) =>
            new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime() &&
            new Date(item.dateOfAddition) <= new Date(dateAdditionTo).getTime()
        );
    console.log('selectedItems: ', selectedItems);
  }

  if (dateAdditionFrom && !dateAdditionTo) {
    selectedItems = selectedItems
      ? selectedItems.filter(
          (item) => new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime()
        )
      : items.filter(
          (item) => new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime()
        );
    console.log('selectedItems: ', selectedItems);
  }

  if (!dateAdditionFrom && dateAdditionTo) {
    selectedItems = selectedItems
      ? items.filter(
          (item) => new Date(item.dateOfAddition).getTime() <= new Date(dateAdditionTo).getTime()
        )
      : items.filter(
          (item) => new Date(item.dateOfAddition).getTime() <= new Date(dateAdditionTo).getTime()
        );
    console.log('selectedItems: ', selectedItems);
  }

  if (dateEndingFrom && dateEndingTo) {
    selectedItems = selectedItems
      ? selectedItems.filter(
          (item) =>
            new Date(item.dateOfEnding).getTime() >= new Date(dateEndingFrom).getTime() &&
            new Date(item.dateOfEnding) <= new Date(dateEndingTo).getTime()
        )
      : items.filter(
          (item) =>
            new Date(item.dateOfEnding).getTime() >= new Date(dateEndingFrom).getTime() &&
            new Date(item.dateOfEnding) <= new Date(dateEndingTo).getTime()
        );
    console.log('selectedItems: ', selectedItems);
  }

  if (dateEndingFrom && !dateEndingTo) {
    selectedItems = selectedItems
      ? selectedItems.filter(
          (item) => new Date(item.dateOfEnding).getTime() >= new Date(dateEndingFrom).getTime()
        )
      : items.filter(
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
  // if (selectedItems)
  // return items;
}
