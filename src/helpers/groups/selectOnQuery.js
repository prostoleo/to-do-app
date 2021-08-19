export default function (groups, query) {
  return groups
    .slice()
    .filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));
}
