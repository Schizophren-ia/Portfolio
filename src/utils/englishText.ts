/** Romanize display copy only. Never apply this to URLs, IDs, assets or user input. */
export function withoutVietnameseDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
