export default function foo(items, filterInfo) {
  const impFrom = filterInfo?.impFrom ?? 1;
  const impTo = filterInfo?.impTo ?? 10;

  const selectedItems = items?.filter(
    (g) => g.avgImportance >= +impFrom && g.avgImportance <= +impTo
  );
  console.log('selectedItems: ', selectedItems);

  return selectedItems;
}
