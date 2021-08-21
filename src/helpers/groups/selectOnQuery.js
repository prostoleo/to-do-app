export default function foo(items, query) {
  return items.slice().filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
}
