export default function foo(items, query) {
  if (!query) return items;

  const selectedOnQuery = items
    .slice()
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  return selectedOnQuery;
}
