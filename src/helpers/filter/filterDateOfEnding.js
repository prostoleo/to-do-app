/* eslint-disable implicit-arrow-linebreak */
export default function foo(items, filterInfo) {
  console.log('items: ', items);
  console.log('filterInfo: ', filterInfo);

  const dateEndingFrom = filterInfo?.dateEndingFrom ?? null;
  const dateEndingTo = filterInfo?.dateEndingTo ?? null;

  console.log('dateEndingFrom: ', dateEndingFrom);
  console.log('dateEndingTo: ', dateEndingTo);

  let selectedItems;

  //* возвращаем items если нет ни того, ни другого
  if (!dateEndingFrom && !dateEndingTo) return items;

  if (dateEndingFrom && dateEndingTo) {
    selectedItems = items.filter(
      (item) =>
        new Date(item.dateOfEnding).getTime() >= new Date(dateEndingFrom).getTime() &&
        new Date(item.dateOfEnding) <= new Date(dateEndingTo).getTime()
    );
  }
  if (!dateEndingFrom && dateEndingTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfEnding) <= new Date(dateEndingTo).getTime()
    );
  }

  if (dateEndingFrom && !dateEndingTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfEnding).getTime() >= new Date(dateEndingFrom).getTime()
    );
  }

  return selectedItems;
}
