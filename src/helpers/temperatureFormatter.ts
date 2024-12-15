export default function formatTemperature(temperature: number) {
  if (temperature === undefined) return 'N/A';

  const formatter = new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return `${formatter.format(temperature)}°C`;
}
