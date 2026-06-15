function randomLetters(count: number): string {
  let result = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < count; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export function generateUID(date: Date): string {
  const yy = pad(date.getFullYear() % 100);
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());

  return `${yy}${randomLetters(4)}${mm}${randomLetters(4)}${dd}${randomLetters(4)}${hh}${randomLetters(4)}${min}${randomLetters(4)}`;
}