/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
export default function foo(
  items,
  { dateAdditionFrom, dateAdditionTo, dateEndingFrom, dateEndingTo }
) {
  let selectedItems = null;

  //* если есть поля impFrom или impTo - то фильтрцем по важности (конверитуря в числа!)

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
  }

  if (dateAdditionFrom && !dateAdditionTo) {
    selectedItems = selectedItems
      ? selectedItems.filter(
          (item) => new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime()
        )
      : items.filter(
          (item) => new Date(item.dateOfAddition).getTime() >= new Date(dateAdditionFrom).getTime()
        );
  }

  if (!dateAdditionFrom && dateAdditionTo) {
    selectedItems = selectedItems
      ? items.filter(
          (item) => new Date(item.dateOfAddition).getTime() <= new Date(dateAdditionTo).getTime()
        )
      : items.filter(
          (item) => new Date(item.dateOfAddition).getTime() <= new Date(dateAdditionTo).getTime()
        );
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
  }

  if (dateEndingFrom && !dateEndingTo) {
    selectedItems = selectedItems
      ? selectedItems.filter(
          (item) => new Date(item.dateOfEnding).getTime() >= new Date(dateEndingFrom).getTime()
        )
      : items.filter(
          (item) => new Date(item.dateOfEnding).getTime() >= new Date(dateEndingFrom).getTime()
        );
  }

  if (!dateEndingFrom && dateEndingTo) {
    selectedItems = items.filter(
      (item) => new Date(item.dateOfEnding).getTime() <= new Date(dateEndingTo).getTime()
    );
  }

  return selectedItems;
}
