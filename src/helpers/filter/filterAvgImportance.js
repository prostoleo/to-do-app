export default function foo(items, filterInfo) {
  const impFrom = filterInfo?.impFrom ?? null;
  const impTo = filterInfo?.impTo ?? null;

  if (!impFrom && !impTo) return items;

  let selectedItems;

  if (impFrom && impTo) {
    selectedItems = items?.filter((g) => g.avgImportance >= +impFrom && g.avgImportance <= +impTo);
  }

  if (impFrom) {
    selectedItems = items?.filter((g) => g.avgImportance >= +impFrom);
  }

  if (impTo) {
    selectedItems = items?.filter((g) => g.avgImportance <= +impTo);
  }

  return selectedItems;
}
