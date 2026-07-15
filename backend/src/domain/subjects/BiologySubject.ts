import { Subject } from '../Subject';

/**
 * BiologySubject — Môn Sinh học
 * Thuộc khối: B (Toán-Hóa-Sinh)
 */
export class BiologySubject extends Subject {
  readonly key   = 'sinh_hoc';
  readonly label = 'Sinh học';

  isCoreSubjectFor(group: string): boolean {
    return ['B'].includes(group.toUpperCase());
  }
}
