export function generateColumnsBackground(index: number, total = 1) {
  const lightness = Math.round(80 - (index / (total - 1)) * 50);

  return { backgroundColor: `hsla(225, 52%, ${lightness}%, 50%)` };
}
