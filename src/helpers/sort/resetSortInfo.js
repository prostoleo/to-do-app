/* eslint-disable indent */
export default function foo(isTasks = false) {
  return isTasks
    ? {
        downName: false,
        upName: false,
        downDateAddition: false,
        upDateAddition: false,
        downDateEnding: false,
        upDateEnding: false,
        downImportance: false,
        upImportance: false
      }
    : {
        downName: false,
        upName: false,
        downDateAddition: false,
        upDateAddition: false,
        downImportance: false,
        upImportance: false
      };
}
