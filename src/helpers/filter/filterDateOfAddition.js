/* eslint-disable implicit-arrow-linebreak */
export default function foo(items, filterInfo) {
  console.log('items: ', items);
  console.log('filterInfo: ', filterInfo);

  const dateAdditionFrom = filterInfo?.dateAdditionFrom ?? null;
  const dateAdditionTo = filterInfo?.dateAdditionTo ?? null;

  console.log('dateAdditionFrom: ', dateAdditionFrom);
  console.log('dateAdditionTo: ', dateAdditionTo);

  let selectedItems;

  //* возвращаем items если нет ни того, ни другого
  if (!dateAdditionFrom && !dateAdditionTo) return items;

  if (dateAdditionFrom && dateAdditionTo) {
    selectedItems = items.filter(
      (item) =>
        new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime() &&
        new Date(item.dateOfAddition) <= new Date(dateAdditionTo).getTime()
    );
  }
  if (!dateAdditionFrom && dateAdditionTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfAddition) <= new Date(dateAdditionTo).getTime()
    );
  }

  if (dateAdditionFrom && !dateAdditionTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime()
    );
  }

  return selectedItems;
}
