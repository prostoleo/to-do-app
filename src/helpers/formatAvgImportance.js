export default function (selectedTasks) {
  const avg = selectedTasks.reduce((acc, task, _, { length }) => acc + task.importance / length, 0);

  const decimal = avg - Math.floor(avg);

  const check = decimal
    .toFixed(2)
    .split('.')[1][1]
    .includes('0');

  return check ? avg.toFixed(1) : avg.toFixed(2);
}
