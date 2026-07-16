import { Subject } from '../Subject';

/**
 * MathSubject — Môn Toán - Thuộc khối: A (Toán-Lý-Hóa), A1 (Toán-Lý-Anh), D (Toán-Văn-Anh)
 */
export class MathSubject extends Subject {
  readonly key = 'toan';
  readonly label = 'Toán';

  isCoreSubjectFor(group: string): boolean {
    return ['A', 'A1', 'D'].includes(group.toUpperCase());
  }
}
