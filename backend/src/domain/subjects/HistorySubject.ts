import { Subject } from '../Subject';

/**
 * HistorySubject — Môn Lịch sử
 * Thuộc khối: C (Văn-Sử-Địa)
 */
export class HistorySubject extends Subject {
  readonly key   = 'lich_su';
  readonly label = 'Lịch sử';

  isCoreSubjectFor(group: string): boolean {
    return ['C'].includes(group.toUpperCase());
  }
}
