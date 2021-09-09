/* eslint-disable implicit-arrow-linebreak */
export default function foo(items, filterInfo) {
  const dateEndingFrom = filterInfo?.dateEndingFrom ?? null;
  const dateEndingTo = filterInfo?.dateEndingTo ?? null;

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
