/* eslint-disable consistent-return */
export default function foo(id, sortInfo, isTasks = false) {
  const newSortInfo = { ...sortInfo };

  if (id.includes('up_name')) {
    newSortInfo.upName = true;
    return newSortInfo;
  }
  if (id.includes('down_name')) {
    newSortInfo.downName = true;
    return newSortInfo;
  }
  if (id.includes('down_date-addition')) {
    newSortInfo.downDateAddition = true;
    return newSortInfo;
  }
  if (id.includes('up_date-addition')) {
    newSortInfo.upDateAddition = true;
    return newSortInfo;
  }
  if (isTasks && id.includes('down_date-ending')) {
    newSortInfo.downDateEnding = true;
    return newSortInfo;
  }
  if (isTasks && id.includes('up_date-ending')) {
    newSortInfo.upDateEnding = true;
    return newSortInfo;
  }
  if (id.includes('down_imp')) {
    newSortInfo.downImportance = true;
    return newSortInfo;
  }
  if (id.includes('up_imp')) {
    newSortInfo.upImportance = true;
    return newSortInfo;
  }

  return newSortInfo;
}
