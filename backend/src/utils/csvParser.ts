/**
 * parseScore — chuyển giá trị chuỗi từ CSV thành number | null.
 *
 * Quy tắc:
 *   - Chuỗi rỗng hoặc undefined → null (thí sinh không thi môn đó)
 *   - Số hợp lệ trong [0, 10]   → number
 *   - Giá trị không hợp lệ      → null (không crash seeder)
 */
export function parseScore(value: string | undefined): number | null {
  if (value === undefined || value.trim() === '') return null;

  const num = parseFloat(value.trim());
  if (isNaN(num)) return null;
  if (num < 0 || num > 10) return null; // sanity check

  return num;
}

/**
 * parseString — chuẩn hoá chuỗi, trả null nếu rỗng.
 */
export function parseString(value: string | undefined): string | null {
  if (value === undefined || value.trim() === '') return null;
  return value.trim();
}

/**
 * formatDuration — chuyển milliseconds sang chuỗi dễ đọc.
 * Ví dụ: 125000 → "2m 5s"
 */
export function formatDuration(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
}
