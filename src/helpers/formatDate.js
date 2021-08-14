export default function formatDate(date) {
  const realDate = new Date(date);
  const locale = navigator.language;

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };

  return new Intl.DateTimeFormat(locale, options).format(realDate);
}
