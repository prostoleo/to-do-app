export default function foo(id) {
  const indexOfFirstDash = id.indexOf('-');
  const endOfId = id.slice(indexOfFirstDash + 1);

  const propName = endOfId
    .split('-')
    .map((word, i) => (i >= 1 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .filter((wordCleared) => wordCleared !== '')
    .join('');

  return propName;
}
