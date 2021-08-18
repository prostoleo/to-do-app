export default function (selectedOnQuery, key, isTasks = false) {
  if (key.includes('downName')) {
    const sorted = selectedOnQuery.slice().sort((a, b) => b.title.localeCompare(a.title));

    return sorted;
  }
  if (key.includes('upName')) {
    const sorted = selectedOnQuery.slice().sort((a, b) => a.title.localeCompare(b.title));

    return sorted;
  }
  if (key.includes('downDateAddition')) {
    const sorted = selectedOnQuery
      .slice()
      .sort((a, b) => new Date(b.dateOfAddition).getTime() - new Date(a.dateOfAddition).getTime());

    return sorted;
  }
  if (key.includes('upDateAddition')) {
    const sorted = selectedOnQuery
      .slice()
      .sort((a, b) => new Date(a.dateOfAddition).getTime() - new Date(b.dateOfAddition).getTime());

    return sorted;
  }
  if (isTasks && key.includes('downDateEnding')) {
    const sorted = selectedOnQuery
      .slice()
      .sort((a, b) => new Date(b.dateOfEnding).getTime() - new Date(a.dateOfEnding).getTime());

    return sorted;
  }
  if (isTasks && key.includes('upDateEnding')) {
    const sorted = selectedOnQuery
      .slice()
      .sort((a, b) => new Date(a.dateOfEnding).getTime() - new Date(b.dateOfEnding).getTime());

    return sorted;
  }
  if (key.includes('downImportance')) {
    const sorted = selectedOnQuery.slice().sort((a, b) => {
      /* return isTasks ? b.importance - a.importance : b.avgImportance - a.avgImportance; */

      if (isTasks) {
        return b.importance - a.importance;
      }

      return b.avgImportance - a.avgImportance;
    });

    return sorted;
  }
  if (key.includes('upImportance')) {
    const sorted = selectedOnQuery.slice().sort((a, b) => {
      /* return isTasks ? b.importance - a.importance : b.avgImportance - a.avgImportance; */

      if (isTasks) {
        return a.importance - b.importance;
      }

      return a.avgImportance - b.avgImportance;
    });

    return sorted;
  }

  return selectedOnQuery;
}
