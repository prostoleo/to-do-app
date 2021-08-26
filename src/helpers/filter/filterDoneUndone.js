export default function foo(items, filterInfo) {
  const onlyDone = filterInfo?.onlyDone ?? false;
  const onlyUndone = filterInfo?.onlyUndone ?? false;

  let selectedItems;

  if (!onlyDone && !onlyUndone) return items;

  if (onlyDone) selectedItems = items?.filter((t) => t.done);

  if (onlyUndone) selectedItems = items?.filter((t) => !t.done);

  return selectedItems;
}
