import { Subject } from '../Subject';

/**
 * ChemistrySubject — Môn Hóa học
 * Thuộc khối: A (Toán-Lý-Hóa), B (Toán-Hóa-Sinh)
 */
export class ChemistrySubject extends Subject {
  readonly key   = 'hoa_hoc';
  readonly label = 'Hóa học';

  isCoreSubjectFor(group: string): boolean {
    return ['A', 'B'].includes(group.toUpperCase());
  }
}
